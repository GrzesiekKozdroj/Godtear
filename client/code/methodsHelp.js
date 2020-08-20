const if_moved_end_it  = (
        name = $('.selectedModel').attr('data-name'),
        side = $('.selectedModel').attr('data-side'),
        actionstaken = $('.selectedModel').attr('data-actionstaken')
    ) => {
    const w = phase === 'white' ? 0 : 2
    $(`[data-name=${name}][data-tenmodel].${side}`).each(function(){
        const speed = $(this).attr('data-speed')
        const speedleft = $(this).attr('data-speedleft')
        const bspeed = Number($(this).attr('data-bspeed'))
        if(Number(speedleft[w]) + bspeed < Number(speed[w])+bspeed  && Number(speedleft[w]) >= 0){
            $(`[data-name=${name}][data-tenmodel].${side}`).each(function(){
                $(this).attr('data-actionstaken', Number(actionstaken) + 1 )
                let left = phase === 'white' ? [-1,speedleft[2]] : [speedleft[0],-1]
                $(this).attr('data-speedleft', left)
            })
            setBoons_Blights($(`[data-name=${name}][data-tenmodel].${side}`),{bspeed:0})
            return false
        }
    })
}
function shayle_takes_action(strng = false){
    if ( $('.selectedModel').data('name') === 'Shayle' ){
        if (strng) add_action_taken(strng)
        $(`[data-tenmodel^="Landslide"][data-side="${$('.selectedModel').data('side')}"]`).attr('data-landstepper',1)
    }
}
const abilTruthChange = (
        abilName = null,
        side = mySide,
        name = $('.selectedModel').data('name')
) => {
    const targetos = (abilName, p = phase) => 
    $('.selectedModel').hasClass('whiteTeam') ? 
    mySkillTrack[name][p][abilName].used = true
    : 
    opoSkillTrack[name][p][abilName].used = true

    if(abilName === "legendary")
        targetos("legendary","util")
    else if (abilName)
        targetos(abilName)

    $('.skilling_declaration').removeClass('skilling_declaration')
    $(`[data-m="${abilName}"].${side}`).removeClass('glow_unused').addClass('usedSkill')
}
const causeOfRetchlings = (skill) => {
    if( skill.length ){
        const { hex, row } = $('.selectedModel').parent('.hexagon').data()
        if( skill[0] !== hex || skill[1] !== row ){
            return false
        } else { return true }
    } else { return skill }
}
const abilTruthRead = (abilName = null, side, name = $('.selectedModel').data('name') ) => {
    const targetos = (abilName, p = phase) => {
        let prod;
        if(side === mySide)
                prod = causeOfRetchlings(  mySkillTrack[name][p][abilName].used )
        else if(side === opoSide)
                prod = causeOfRetchlings( opoSkillTrack[name][p][abilName].used )
        return prod
    }

    if (abilName === "legendary")
        return !targetos("legendary","util")
    else if (typeof abilName === 'string')
        return !targetos(abilName)
    else
        return true
}
const add_action_taken = (
    abilName = false,
    shallI = false, 
    name = $('.selectedModel').attr('data-name'),
    side = $('.selectedModel').attr('data-side')
) => {
        const actionstaken = Number($('.selectedModel').attr('data-actionstaken'))
    if( abilTruthRead(abilName, side, name) && !shallI ){
        $(`[data-name=${name}].${side}[data-tenmodel]`).each(function(){
            $(this).attr('data-actionstaken', (actionstaken + 1) )
        })
    }
    abilTruthChange(abilName,side,name)
}
const check_actions_count = (abilName = false, side = mySide) => {
    return (
        Number( $('.selectedModel:not(".death")').attr('data-actionstaken') ) < 2 && 
        abilTruthRead(abilName,side) ? 
        true : false
    )
}
function checkIfNotMorrigan(target,attriName){
    const bAttri = Number(target.attr(`data-${attriName}`))
    const checkWho = target.data('name') === 'Morrigan' && bAttri > 0 ? 2 : bAttri
    return checkWho
}
function slayerPoints(target){
    if( target.data('type')==="champion" )
        return target.data('stepsgiven') + 1
    else 
        return target.data('stepsgiven')
}
const onHit = (aim, target, weapon, skillName) => {
        const target_dodge = Number(target.attr('data-dodge')) + checkIfNotMorrigan(target,'bdodge')
        aim.splice(0,fearsome() + superiority(target))
        const aim_total = aim.reduce((a,b)=>a+b,0)
        setBoons_Blights($('.selectedModel'),{baim:0})
        setBoons_Blights(target,{bdodge:0})
        animateWeapon(target, weapon)
        const product = aim_total  >= target_dodge
        percentileMarker(target,'dodgeability',!product)
        percentileMarker($('.selectedModel'),'accuracy',product)
        pixkedAtMarker($('.selectedModel'),'favouriteToHit',target)
        displayAnimatedNews({
            dieRoll:aim,
            templateType:'attack',
            rollOutcome:product,
            $victim:target,
            $attacker:$('.selectedModel'),
            skillName,
            skillIcon:'skull'
        })
        return product
}//<--should take $(origin) and reset its baim and take target and reset its bdodge
const doDamage = (hurt, target) => {
    const target_protection = Number(target.attr('data-protection')) + checkIfNotMorrigan(target,'bprotection')
    hurt.splice(0,superiority(target))
    const hurt_total = hurt.reduce((a,b)=>a+b,0)
    const product = hurt_total > target_protection
    const hurtTotal = target_protection - hurt_total
    displayAnimatedNews({
        dieRoll:hurt,
        templateType:'damage',
        rollOutcome:product,
        hurtTotal,
        $victim:target
    })
    setBoons_Blights($('.selectedModel'),{bdamage:0})
    setBoons_Blights(target,{bprotection:0})
    animateDamage(target, (target_protection - hurt_total))
    counterMaker(target,'tankyness',product?target_protection:hurt_total)
        if( product ){
            let target_health = Number(target.attr('data-healthleft'))
            let pain = target_health + hurtTotal
            counterMaker(target, 'woundsSuffered', pain)
            counterMaker($('.selectedModel'), 'dmgCaused', pain)
            target.attr( 'data-healthleft', pain )
            $(`.miniGameCard.${target.data('side')}[data-name="${target.data('name')}"]`)
                .find('.smallCard.health')
                .find('.gameCard_num')
                .removeClass('normal')
                .addClass('blighted')
                .text( Number(target.attr('data-healthleft')) )
            return true
        } else { return false }
}//<--should take $(origin) and reset its bdamage and take target and it bprotection
const animateDamage = (target, pain) => {
    displayAnimatedNews({
        templateType:'pain',
        hurtTotal: pain,
        $victim:target,
        rollOutcome:pain<0?true:false
    })
    if( pain < 0){
        target.addClass('shakeModel')
        target.parent('.hexagon').append(displayDamageRecieved(pain))
        $('.displayDamageRecieved').animate({
            transform:'scale(1.3)',
            opacity:0.5
        }, 770, ()=>{
            $('.displayDamageRecieved').remove()
            setTimeout(()=>target.removeClass('shakeModel'),250)
        })
    }
}
const checkIfStillAlive = (target) => {
    if( Number(target.attr('data-healthleft') ) < 1 ){
        pixkedAtMarker($('.selectedModel'),'killsCount',target)
        forceKill(target)
        return true
    }
}
const forceKill = (target) => {
    target.addClass('death')
    target.attr('data-baim',0)
    target.attr('data-bdamage',0)
    target.attr('data-bprotection',0)
    target.attr('data-bdodge',0)
    target.attr('data-bspeed',0)
    if(target.data('type')==='unit'){
        target.attr('data-healthleft',target.data('health'))
        if(target.data('name')==='Splashlings')
            ripplingScales(target)
        else if ( target.data('name') === 'ColdBones' )
            brainFreeze()
    } else
        target.attr('data-healthleft',0)
    setTimeout(()=>{
        if( target.data('type')==='unit' ){
            rubble(target)
            if(
                graveyard[target.data('side')][target.data('name')] && 
                graveyard[target.data('side')][target.data('name')].length
            )
                graveyard[target.data('side')][target.data('name')] = 
                    [...graveyard[target.data('side')][target.data('name')], target.removeClass('.death').detach()]
            else
                graveyard[target.data('side')][target.data('name')] = [target.removeClass('.death').detach()]
            graveyard[target.data('side')][target.data('name')]
                .sort(function(a, b){
                    return ( Number($(a).data('tenmodel')[$(a).data('tenmodel').length-1]) - 
                             Number($(b).data('tenmodel')[$(a).data('tenmodel').length-1])   )
                })
            } else if( target.data('type')==='champion' ){
                //gotta emit champ death
                if ( myTurn )cancellerName = 'deathMove' //UNTESTEDO
                    if( !$('.deathMove_selected').length ){
                        target.addClass('deathMove_selected')
                        un_glow()
                        highlightHexes({colour:'deathMove',dist:2},target)
                        const { name, side } = target.data()
                        $(`#dummy_contain.${side}`).find('.mini-card-actions').append( dedChamp(name, side) )
                    }else
                        target.addClass('deathMove')
                //resurrect Mournblade
                if(Number($(`[data-name="Mournblade"].${mySide}[data-tenmodel]`).attr('data-healthleft')) === 0 &&
                    target.hasClass(opoSide)){//it should be presented as a option.
                $(`[data-name="Mournblade"].${mySide}[data-tenmodel]`)
                    .attr('data-healthleft',1)
                    .removeClass('death')
                setTimeout(()=>displayAnimatedNews({ 
                    templateType:'info', 
                    $attacker: $(`[data-name="Mournblade"].${mySide}[data-tenmodel]`), 
                    msg2:' rallies' 
                }),700)
                }
        }
    }, 700)
}//<---killed units and champs need to give up their boons and blights, what about resurrected units??
const moveLadder = (target,steps) => {
    const origin = $($('#coin').parent('.ladderBlock')).data('block')
    let direction = 0 //1   <--> 22
    if( target.hasClass('blackTeam') && target.hasClass('smallCard') ){
        direction = mySide === 'left' ? -1 : 1
    } else if( target.hasClass('whiteTeam') && target.hasClass('smallCard') ){
        direction = mySide === 'left' ? 1 : -1
    } else if ( target.hasClass('claimedBanner') && target.hasClass('whiteTeam') ) {
        direction = mySide === 'left' ? -1 : 1
    } else if( target.hasClass('claimedBanner') && target.hasClass('blackTeam') ){
        direction = mySide === 'left' ? 1 : -1
    }
    const calculus = ((.79*km / 17.23 ) - .01*km)
    let adres = origin+steps*direction
    const _L = GAME_SCENARIO.warbandTokens.left
    const R_ = GAME_SCENARIO.warbandTokens.right
    adres = adres <= _L ? (_L + 1) : adres >= R_ ? (R_ - 1) : adres > _L && adres < R_ ? adres : false
    const destination = $(`.block${ adres }`)
    displayAnimatedNews({
        templateType:'points',
        steps,
        $victim:$('.selectedModel')
    })
    counterMaker(target,'stepsEarned',steps)
    if( adres )
        $('#coin')
            .css('right',`${(steps * direction * calculus)}px`)
            .detach()
            .appendTo(destination)
            .animate({
                left: 0
                }, 500, ()=>{
                $('#coin').removeAttr('style').finish()//.detach().appendTo(destination)
            })
}
const extractBoons_Blights = (origin) => {
    const baim = Number(origin.attr('data-baim'))
    const bdamage = Number(origin.attr('data-bdamage'))
    const bspeed = Number(origin.attr('data-bspeed'))
    const bdodge = Number(origin.attr('data-bdodge'))
    const bprotection = Number(origin.attr('data-bprotection'))
    const healthleft = Number(origin.attr('data-healthleft'))
    return { baim, bdamage, bspeed, bdodge, bprotection, healthleft }
}
const setBoons_Blights = (origin,props,local = false, {N , I} = false)=>{//$(), {baim:-1}
    let subject = local !== 'local' ? 
        $(`[data-name="${origin.data('name')}"][data-side="${origin.data('side')}"][data-tenmodel]`) : origin
    displayAnimatedNews({
        $attacker:$(subject[0]),
        templateType:'boons',
        blights:props,
        skillIcon:I, skillName:N
    })
    for(let key in props){
        let boon_blight = props[key]
            subject.each(function(){
                if( boon_blight <= 1 && boon_blight >= -1 && ( !$(this).hasClass('death') || boon_blight === 0 ) ){
                    $(this).attr(`data-${key}`,boon_blight) 
                    let val = $(this).attr(`data-${[...key].slice(1).join('')}`)
                   // if(val){
                        if (key === 'bspeed'){
                            const v = [...val]
                            val = phase === 'white' ? Number(v[0]) : Number(v[2])
                        } else val = Number(val)
                        styleStats(val,boon_blight,key,$(this))
                  //  }
                }
            })
    }
}
function styleStats(a,b,key,thiz){
    if(b===1||b===-1){
        let tyjp = b>0?'booned':'blighted'
        $(`#game_card-big[data-name="${thiz.data('name')}"].${thiz.data('side')}`)
            .find('.offset-'+[...key].slice(1).join(''))
            .removeClass('normal blighted booned')
            .addClass(tyjp)
            .find('.gameCard_num')
            .text(a+b)

        thiz.find(`.${key}-dum`).addClass(`${key} ${tyjp}`)

        $(`[data-name="${thiz.data('name')}"].miniGameCard.${thiz.data('side')}`)
            .find('.'+[...key].slice(1).join(''))
            .addClass(`glow_BB_card ${tyjp}`)
            .find('.gameCard_num')
            .addClass(tyjp)
            .text(a+b)

        if(key==='baim')
            $(`[data-name="${thiz.data('name')}"].miniGameCard.${thiz.data('side')}`)
                .find('.skill[data-aim]')
                .each(function(){
                    if( !$(this).children('.aimBoon').length && !$(this).children('.aimBlight').length)
                    $(this).prepend(b>0?aimBoon:aimBlight)
                    $(this)
                        .children('.gameCard_name')
                        .removeClass('booned blighted normal')
                        .addClass(b>0?'booned':b<0?'blighted':'normal')
                })
        if(key==='bdamage')
        $(`[data-name="${thiz.data('name')}"].miniGameCard.${thiz.data('side')}`)
            .find('.skill[data-hurt]')
            .each(function(){
                if( !$(this).children('.damageBoon').length && !$(this).children('.damageBlight').length)
                $(this).prepend(b>0?damageBoon:damageBlight)
                $(this)
                    .children('.gameCard_name')
                    .removeClass('booned blighted normal')
                    .addClass(b>0?'booned':b<0?'blighted':'normal')
            })

    }else if(b==0){
        thiz.find(`.${key}-dum`).removeClass(`${key} booned blighted`)
        $(`.miniGameCard.${thiz.data('side')}[data-name="${thiz.data('name')}"]`)
            .find('.'+[...key].slice(1).join(''))
            .removeClass('glow_BB_card booned blighted')
            .find('.gameCard_num')
            .removeClass('booned blighted')
            .text(a)
        
        $(`#game_card-big[data-name="${thiz.data('name')}"].${thiz.data('side')}`)
            .find('.offset-'+[...key].slice(1).join(''))
            .removeClass('normal blighted booned')
            .find('.gameCard_num')
            .removeClass('booned blighted')
            .text(a)

        $(`[data-name="${thiz.data('name')}"].miniGameCard.${thiz.data('side')}`)
        .find('.skill')
        .each(function(){
            $(this).children(`.${[...key].slice(1).join('')}Boon`).remove()
            $(this).children(`.${[...key].slice(1).join('')}Blight`).remove()
        })
    }
}
const placeMark = ({hex, row, multiInfo, target, key}) => {
    target.addClass('destined_for_DOOM')
    target.attr('data-DOOMqueue', key)
    $('body').append(multi_choice_info_panel(multiInfo))
}
const tellMeDistance = (origin,target) => {//IT GIVES FALSE MEASUREMENTS OFTENTIMES
    //origin and taget expect two objects: {hex, row}{hex:7,row:8},{hex:6,row:9}=1
    const oh = origin.hex, or = origin.row//oh = 7 or = 9
    const th = target.hex, tr = target.row// th=5 tr = 10
    const hexes = Math.abs(oh - th)//2
    const rows  = Math.abs(tr - or)//1
    const hfloored = Math.floor(hexes/2)// floor:  1  |  ceil: 1
    const rfloored = Math.floor(rows/2)//   floor:  0  |  ceil: 1        ||floor on or odd
    const plusOne = or%2===0 && tr%2!==0 && oh>th && or!==tr ? 1 : 
                    or%2!==0 && tr%2==0 && oh<th && or!==tr ? 1 : 
                    0
    return hexes < rows ? hfloored + rows + plusOne : rfloored + hexes + plusOne// 0 < 0 ? 1 OR 1 | 1 < 1 ? 2 OR 2
}
const highlight_closest_path = (a,b,way='towards') => {//UTTER FAILURE, MOSTLY BECAUSE OF THE ABOVE FUNCTION
    const A_B = tellMeDistance(a,b)//expects data objects {hex, row}
    $('.hexagon[data-glow]').each(function(){
        const thiz = $(this).data()
        const A_T = tellMeDistance(a,thiz)
        const B_T = tellMeDistance(b, thiz)
        if( way === 'towards' ? A_T + B_T > A_B : A_T + B_T <  A_B ) {
            $(this).removeAttr('data-glow')
            $(this).children().removeAttr('data-glow')
        }
    })
    const $a = $(`.hex_${a.hex}_in_row_${a.row}`)
    const $b = $(`.hex_${b.hex}_in_row_${b.row}`)
    $a.removeAttr('data-glow')
    $a.children().removeAttr('data-glow')
    $b.removeAttr('data-glow')
    $b.children().removeAttr('data-glow')
}
const highlightDirectPaths = ( { origin, distance, colour } ) => {
    //origin:$(this).parent('.hexagon).data(), number, i.e. 'greenGlow
    const h = origin.hex
    const r = origin.row

    if(distance >= 2){
        $(`.hex_${h - 2}_in_row_${r}`).attr('data-glow',colour+1)
        $(`.hex_${h + 2}_in_row_${r}`).attr('data-glow',colour+4)
    }
    if (distance >= 3){
        $(`.hex_${h - 3}_in_row_${r}`).attr('data-glow',colour+1)
        $(`.hex_${h + 3}_in_row_${r}`).attr('data-glow',colour+4)
    }
    $(`.hex_${h - 1}_in_row_${r}`).attr('data-glow',colour+1)
    $(`.hex_${h + 1}_in_row_${r}`).attr('data-glow',colour+4)
    $(`.hex_${h + 1}_in_row_${r - 2}`).attr('data-glow',colour+3)
    $(`.hex_${h - 1}_in_row_${r - 2}`).attr('data-glow',colour+2)
    $(`.hex_${h - 1}_in_row_${r + 2}`).attr('data-glow',colour+6)
    $(`.hex_${h + 1}_in_row_${r + 2}`).attr('data-glow',colour+5)
    if(r%2!==0)
    {
        if (distance >= 3 ){
            $(`.hex_${h + 1}_in_row_${r + 3}`).attr('data-glow',colour+5)
            $(`.hex_${h - 2}_in_row_${r + 3}`).attr('data-glow',colour+6)
            $(`.hex_${h - 2}_in_row_${r - 3}`).attr('data-glow',colour+2)
            $(`.hex_${h + 1}_in_row_${r - 3}`).attr('data-glow',colour+3)
        }
        $(`.hex_${h}_in_row_${r - 1}`).attr('data-glow',colour+3)
        $(`.hex_${h - 1}_in_row_${r - 1}`).attr('data-glow',colour+2)
        $(`.hex_${h - 1}_in_row_${r + 1}`).attr('data-glow',colour+6)
        $(`.hex_${h}_in_row_${r + 1}`).attr('data-glow',colour+5)
    }
    if(r%2===0)
    {
        if(distance >= 3 ){
            $(`.hex_${h + 2}_in_row_${r + 3}`).attr('data-glow',colour+5)
            $(`.hex_${h - 1}_in_row_${r + 3}`).attr('data-glow',colour+6)
            $(`.hex_${h - 1}_in_row_${r - 3}`).attr('data-glow',colour+2)
            $(`.hex_${h + 2}_in_row_${r - 3}`).attr('data-glow',colour+3)
        }
        $(`.hex_${h}_in_row_${r - 1}`).attr('data-glow',colour+2)
        $(`.hex_${h}_in_row_${r + 1}`).attr('data-glow',colour+6)
        $(`.hex_${h + 1}_in_row_${r - 1}`).attr('data-glow',colour+3)
        $(`.hex_${h + 1}_in_row_${r + 1}`).attr('data-glow',colour+5)
    }
    $(`[data-glow^="${colour}"`).children('.top').attr('data-glow',colour)
    $(`[data-glow^="${colour}"`).children('.bottom').attr('data-glow',colour)
}
function extraMover(methodName,thiz,moveType,rules='empty string'){//<----needs another props: conditions to be considered
    const className = ( '.' + methodName + '_selected' )
    const $model = $(className)
    const checker = { $model, $destination: thiz, rules } 
    //---------to--work--with----------
    const eligible_to_move = 
        moveType === 'walk' ? 
            standardWalk(checker) : 
        moveType === 'push' ? 
            standardPush(checker) : 
        moveType === 'bannerWalk' ? 
            validateBannerPlacement(checker) :
        moveType === 'push avalanche' ? 
            validateAvalanchePlacement() :
        false
    //---------------------------------
    if($model.length && myTurn && eligible_to_move ){//tioed to a bug with IllKillYouAll
        const h = thiz.data('hex')
        const r = thiz.data('row')
        const klass = { 
            h:$('.'+methodName+'_selected').parent('.hexagon').data('hex'), 
            r:$('.'+methodName+'_selected').parent('.hexagon').data('row'),
            className
        }
        if(h !== klass.h || r !==klass.r){
            makeAnim( $('.'+methodName+'_selected'), thiz, _m_[methodName] )
            socket.emit('forceMove',{h:h, r:r, klass, callback:methodName})
        }
    }
}
function bannerWarden(origin){
    return origin.parent('.hexagon').hasClass('objectiveGlow') ? 2 : 0
}
function leave_only_selected_path(){
    $('[data-glow].hexagon').each(function(){
        if( $(this).attr('data-glow') === chosenGlows ){
            $(this).attr('data-glow','straitPaths')
            $(this).children('.top').attr('data-glow','straitPaths')
            $(this).children('.bottom').attr('data-glow','straitPaths')
        } else {
            $(this).removeAttr('data-glow')
            $(this).children('.top').removeAttr('data-glow')
            $(this).children('.bottom').removeAttr('data-glow')
        }
    })
}
function rallyActionDeclaration({ unitname, side, type, name, dist = 1 },glowType = 'recruitGlow'){
    const { hex, row } = $(`[data-name="${unitname}"].${side}`).parent('.hexagon').data()
    river = [unitname,side,type,name]
    if(name==="Retchlings"){
        $(`[data-tenmodel^="${name}"].${side}`).each(function(){
            const h = $(this).parent('.hexagon').data('hex')
            const r = $(this).parent('.hexagon').data('row')
            highlightHexes({colour:glowType,dist},$(this))
            socket.emit('HH', {color:glowType,dist, hex:h, row:r, river, n:nickName})
        })
    }
    if (glowType==='callTotems') 
        un_glow()
    if(glowType==='lifeTrade')
        lifeTradeRaise()
    else if ( glowType.includes(`rockFormation`) )
        socket.emit('rolloSkill', { socksMethod: 'rockFormation1', key: side })//<--make that skill
    else if( myTurn ){
        highlightHexes({colour:glowType,dist},$(`[data-name="${unitname}"].${side}`))
        //commented out once again: newSpew and graspingDead
        //above was commented out but it cannot work without it
        //if ( !$(`[data-glow="${glowType}"]`).length )prevented me from sending river through server
        socket.emit('HH', {color:glowType, dist, hex, row, river, n:nickName})
    }//these brackets were not here before
    if(name==="Retchlings"){
        $(`[data-tenmodel^="${name}"].${side}`).each(function(){
            const h = $(this).parent('.hexagon').data('hex')
            const r = $(this).parent('.hexagon').data('row')
            highlightHexes({colour:glowType,dist},$(this))
            socket.emit('HH', {color:glowType,dist, hex:h, row:r, river, n:nickName})
        })
    }
    cancellerName = 'rallied'
}
function blights_spew_declaration ({origin, abilName}){
    const { baim } = extractBoons_Blights(origin)
    $(`[data-name="Retchlings"].${mySide}`).each(function(){
        highlightHexes({colour:'redGlow',dist:1},$(this))
    })
    $('[data-glow="redGlow"]').each(function(){
        if( $(this).children('.smallCard.blackTeam').length  ){
            const { hex, row } = $(this).data()
            socket.emit('rolloSkill',{ aim: (4 + baim), hurt:0, socksMethod:abilName, hex, row })
        }
    })
    un_glow()
    current_ability_method = null
    add_action_taken()
     
}
function blights_spew_recieved({o, blight, m}){
    const { aim, hex, row } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        un_glow()
        add_action_taken(m)
        if( onHit(aim, target,'spell',m) ){
            setBoons_Blights(target,{[blight]:-1},0,{N:m,I:'skull'})
        }
    }
    current_ability_method = null
}
function healLife(target, h = 2){
    for(let oi = 0; oi < h; oi++){
        if(  Number( target.attr('data-healthleft') ) < Number( target.attr('data-health') )  ){
            const currentWounds = Number(target.attr('data-healthleft')) + 1
            target.attr('data-healthleft', currentWounds)
        }
    }
    displayAnimatedNews({
        templateType:'info', 
        $attacker:target,
        skillName: 'Heal Life',
        skillIcon:'self',
        msg2:`: ${h} wound${h>2?"s":''}`
    })
    let style =  ( Number(target.attr('data-healthleft') ) < target.data('health') ) ? 0 : 1
    $(`.miniGameCard.${target.data('side')}[data-name="${target.data('name')}"]`)
        .find('.smallCard.health')
        .find('.gameCard_num')
        .removeClass(style?'normal':'blighted')
        .addClass(style?'blighted':'normal')
        .text( Number(target.attr('data-healthleft')) )
}
function march (string, targetHex, thizModel = $('.selectedModel'), dist=1 ){
    const { hex, row } = targetHex
    thizModel.addClass(`march${string}_selected`)
    highlightHexes({colour:'legendaryGlow',dist},$(`.march${string}_selected`))
    socket.emit('forceMove',{h:hex, r:row, klass:"champion", callback:`march${string}`})
}
function marchExec(string, aktion){
    current_ability_method = null
    add_action_taken(aktion)
    un_glow()
    $(`.march${string}_selected`).removeClass(`march${string}_selected`)
}
function rallyChampion(thiz){
    thiz.removeClass('death mournblade_raisins').attr('data-healthleft', thiz.data('health') )
    displayAnimatedNews({templateType:'info', $attacker:thiz, msg1:` rallies`})
}
function _target({ hex, row }){//UNFINISHED, not annoyed enuff yet
    return $(`.hex_`)
}
function moveContentsOfHex(stringz,thiz,$tM){//"string for callback name" and $(thestinationHex)
    const { hex, row } = thiz.data()
    socket.emit('rolloSkill',{ hex, row, socksMethod:stringz })
}
function propagate_BB_s($origin,attribPack,$target){
    const { baim, bdamage, bspeed, bdodge, bprotection } = attribPack
    setBoons_Blights( $target, { baim, bdamage, bspeed, bdodge, bprotection } )
    if ( $origin.hasClass('activated') ) 
        $target.addClass('activated').attr('data-actionstaken',2)
    else {
        if( $target.data('name') !== "Landslide" )
            $target.removeClass('activated').attr('data-actionstaken',attribPack.actionstaken)
        else {
            add_action_taken("rallied",false,"Landslide")
        }
    }
}
function shootAndScoot(){
    highlightHexes({colour:'shootAndScoot',dist:1})
    $('.selectedModel').addClass('shootAndScoot_selected')
    cancellerName = 'shootAndScoot'
    displayAnimatedNews({ templateType:'info',
        $attacker:$('.selectedModel'), 
        msg1:' triggers ', 
        skillName:'Shoot & Scoot', 
        skillIcon:'self' })
}
function buildSkillTrack(roster){//['name','name','name']
    let premadeproduct = {}
    const restructureSkills = skillpack => {
        let prepskills = {}
        for(let phasename in skillpack){
            let phejs = skillpack[phasename]
            prepskills[phasename] = {}
            for(let sname in phejs){
                let skjil = phejs[sname]
                prepskills[phasename][sname] = { 
                                            used:false 
                                        }
            }
        }
        return prepskills
    }
    roster.forEach(nejm=>{
        for(klazz in rosters){
            let K = rosters[klazz]
            K.forEach(obj=>{
                if(obj.champ.name===nejm){
                    //to jestem we właściwym obiekcie typu {champ:Rattlebone, grunt:Hexlings}
                    let champsk = obj.champ.skills
                    let gruntsk = obj.grunt.skills
                    premadeproduct[obj.champ.name] = restructureSkills(champsk)
                    premadeproduct[obj.grunt.name] = restructureSkills(gruntsk)
                    premadeproduct[obj.champ.name].white.claimed = {used : false}
                    premadeproduct[obj.grunt.name].white.rallied = {used : false}
                    premadeproduct[obj.grunt.name].black.rallied = {used : false}
                }
            })
        }
    })
    return premadeproduct
}
function turn_resetter(skillTracker,phase,team){
    $(`.${team}[data-tenmodel]`).each(function(){
        const model = $(this)
        model
            .removeClass('activated')
            .attr('data-actionstaken',0)
            .attr('data-speedleft', model.attr('data-speed'))
    })
    for(let char in skillTracker){
        for(let s in skillTracker[char][phase]){
            skillTracker[char][phase][s].used = false
        }
        //-------------UNTESTEDO--------------//
        for(let mj in skillTracker[char].util){
            if( mj && mj !== 'legendary' )
                skillTracker[char].util[mj].used = false
        }
    }
    $('.sacrifice').removeClass('sacrifice damage aim')
}
function lifeTradeRaise(){
    un_glow()
    let dad = $('.selectedModel').parent('.hexagon')
    dad.attr('data-glow','recruitGlow')
    dad.children('.top').attr('data-glow','recruitGlow')
    dad.children('.bottom').attr('data-glow','recruitGlow')
    m_.raiseDead({hex:dad.data('hex'),row:dad.data('row'),key:"lifeTrade"})
    un_glow()
}
function gangBoss(target){
    un_glow()
    highlightHexes({colour:'gangBoss',dist:1},target)
    let helpers = $('[data-glow]').children('[data-name="SneakyStabbers"][data-tenmodel].whiteTeam').length
    un_glow()
    return helpers
}
function backstab(o){
    const { aim, hex, row, hurt } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        un_glow()
        add_action_taken(`backstab${phase==='white'?'White':'Black'}`)
        if( onHit(aim, target,'sword','Backstab') ){
            if( target.hasClass('champModel')){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                animateDamage(target, -1)
            }
            if( checkIfStillAlive(target) )
                moveLadder(target, target.data('stepsgiven'))
            else {
                setTimeout(()=>{
                    if ( doDamage(hurt, target) )
                        if( checkIfStillAlive(target) )
                            moveLadder(target, target.data('stepsgiven'))
                        else null
                },1550)
            }
        }
    }
    current_ability_method = null
}
function brutalMaste(o){
    const { hex, row } = o
    if( myTurn )
        $('#gameScreen')
            .append(brutalMasterPanel({
                            side:mySide, 
                            hex, row,
                            socksMethod:'brutalMaster',
                            message:'choose either bonus'
                        })    )
}
function brutalMaster_h(type){
    return $(`.whiteTeam.sacrifice.${type}`).length
//count needed class models, don't hurt them
}
function brutalMaster_brutaliser(type){
    const target = $(`.sacrifice.${type}`)
    target.removeClass(`sacrifice ${type}`)
    forceKill(target)
    //remove classes and kill models here based on class
}
function _ambush(origin,target){
    const { baim } = extractBoons_Blights(origin)
    const { hex, row } = target
    const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    const unitSize = origin.siblings('.smallCard').length
    const aim = [3, 4, 5][unitSize]
    let socksMethod = `ambush${phase==='white'?'White':'Black'}`
    if($target.hasClass(`blackTeam`) )
        socket.emit('rolloSkill', { aim: (aim + baim), socksMethod, hex, row })
}
function ambush_(o){
    const { aim, hex, row } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        un_glow()
        add_action_taken(`ambush${phase==='white'?'White':'Black'}`)
        if( onHit(aim, target,'axe','Ambush') ){
            stolenTreasure()
            target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
            animateDamage(target, -1)
            displayAnimatedNews({templateType:'info', $attacker:target,msg1:` Ambushed`})
            if( checkIfStillAlive(target) )
                moveLadder(target, target.data('stepsgiven'))
            else null
            }
    }
    current_ability_method = null
}
function sT(o){
    const { hex, row, cursePackage } = o
    const bb = cursePackage[0]
    const target = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel][data-name="RedBandits"]')[0])
    setBoons_Blights(target,{ [bb]: Number(target.attr(`data-${bb}`))+1 },0,{N:'StolenTreasure',I:'self'})
}
function wildfire(){
    let blackja = $('.selectedModel[data-tenmodel="Blackjaw"]')
    let sk = blackja.hasClass('whiteTeam') ? mySkillTrack : opoSkillTrack
    if ( !sk.Blackjaw.util.wildfire.used ){
        sk.Blackjaw.util.wildfire.used = true
        blackja.attr('data-actionstaken',Number(blackja.attr('data-actionstaken'))-1)
    }
}
function fearsome (){
    const v = $('.selectedModel')
    if( v.data('type') === 'unit' && v.siblings('[data-tenmodel]').length < 2 ){
        const wipe = ()=>$(`[data-shadow="fearsome"]`).removeAttr('data-shadow')
        highlightHexes({colour:'fearsome',dist:3},$('.selectedModel'),'shadow')
        const team = !v.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if( $(`[data-shadow="fearsome"].hexagon`).children(`[data-name="UnburntReavers"].${team}`).length ){
            wipe()
            return true
        } else {
            wipe()
            return false
        }
    }
}
function _hexBolt(origin,target){
    const { baim } = extractBoons_Blights(origin)
    const { hex, row } = target
    const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    const unitSize = origin.siblings('.smallCard').length
    const aim = [2, 4, 6][unitSize]
    const socksMethod = "hexBolt" + (phase==='white'?'White':'Black')
    if($target.hasClass(`blackTeam`) )
        socket.emit('rolloSkill',{ aim: (aim + baim), socksMethod, hex, row })
}
function hexBolt_(o){
    const { aim, hex, row } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        const { side, name } = target.data()
        const at = 'hexBolt' + (phase==='white'?'White':'Black')
        un_glow()
        add_action_taken(at)
        if( onHit(aim, target,'spell','Hex Bolt') ){ 
            if( myTurn )
                $('#gameScreen')
                    .append(  challengeOptions(target, {hex, row}, "hexBolt2",1,`give 1 blight to ${target.data('name')}`)  )
        }
    }
    current_ability_method = null
}
function rollTheBones_(o){
    const { aim, hex, row } = o
    const rattlebone = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard[data-tenmodel="Rattlebone"]')[0])
    const dist = aim[0]
    const side = rattlebone.data('side') === mySide ? mySide : opoSide
    //still needs add_action_take and change attr data-actionstaken=2
    rattlebone.attr('data-actionstaken',2)
    add_action_taken(`rollTheBones${phase==='white'?'White':'Black'}`,true)
    if(!dist){
        if ( myTurn )
            $('#gameScreen').append( EatHexes( {side,socksMethod:'hexEaters',message:'Hexlings gain 1 boon'} ) )
        else
            displayAnimatedNews({templateType:'info', skillName:'Hex Eaters', skillIcon:'self'})
    }else{
        $(`[data-glow]`).removeAttr('data-glow')
        highlightHexes({colour:'blueGlow',dist},rattlebone)
        displayAnimatedNews({templateType:'info', msg0:'choose token donor'})
        current_ability_method = _m.rollTheBonesTransfer
    }
}
function newSpew_ (o){//TRIGGERS TWICE
    const phejs = phase==='white'?'White':'Black'
    add_action_taken(`newSpew${phejs}`)
    displayAnimatedNews({templateType:'info', msg0:'Retchlings respawn'})
    $(`[data-tenmodel^="Retchlings"].${o.multiAction}`).each(function(){
        if( !$(this).hasClass('miniGameCard') )
            forceKill ( $(this) )
    })
    setTimeout(
        ()=>{rallyActionDeclaration({ 
            unitname:"Grimgut", 
            side:o.multiAction, 
            type:"champion", 
            name:"Retchlings" }, `newSpew${phejs}`)}
    ,700)
    current_ability_method = null
}
function rapidDeployment(thiz){
    if( thiz.data('name')==='GlorySeekers' ){
        displayAnimatedNews({templateType:'info', skillName:'Rapid Deployment', skillIcon:'self'})
        thiz.addClass('rapidDeployment_selected')
        highlightHexes({colour:'legendaryGlow', dist:2}, thiz)
        cancellerName = 'rapidDeployment'
    }
}
function callTotems1(){
    const side = $('.selectedModel').hasClass(mySide) ? mySide : opoSide
    un_glow()
    rallyActionDeclaration( { unitname:'Rattlebone', side, type:'unit', name:'Hexlings', dist:2 }, 'callTotems' )
}
function superiority(target){
    if( target.data('name') === 'Titus' && $('.selectedModel').hasClass('unitModel') )
        return true
    else
        return false
}
function retchlings_adagio( aN, mA = false ){
    const team = $('.selectedModel').hasClass('whiteTeam') ? mySkillTrack : opoSkillTrack
    if( typeof team.Retchlings[phase][aN].used === 'object' && !mA ){
        add_action_taken(aN)
    }else if( team.Retchlings[phase][aN].used === false && !mA ){
        const teamColor = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        let selModl = $('.selectedModel').parent('.hexagon').data()
        team.Retchlings[phase][aN].used = [ selModl.hex, selModl.row ]
        $(`[data-tenmodel^="Retchlings"].${teamColor}`).each(function(){
            $(this).attr('data-actionstaken',(Number($(this).attr('data-actionstaken'))+1))
        })
    }
}
function tituulti_addaction (actionName, multiAction = false){
    if( !tituulti[$('.selectedModel').data('side')][actionName] )
        add_action_taken(actionName,multiAction)
    else {
        add_action_taken(actionName, tituulti[$('.selectedModel').data('side')][actionName] )
        tituulti[$('.selectedModel').data('side')][actionName] = false
        if ( loop_tituulti() === 2 ){
            $('.selectedModel[data-tenmodel="Titus"]')
                .attr('data-actionstaken', 1 + Number($('.selectedModel[data-tenmodel="Titus"]').attr('data-actionstaken') ))
                displayAnimatedNews({
                    templateType:'info', 
                    $attacker:$('.selectedModel'), 
                    skillName:'Path Of Destruction',
                    skillIcon:'star',
                    msg2:' ends'
                })
        }
    }
}
function loop_tituulti(){
    let x = 0
    for(c in tituulti[$('.selectedModel[data-tenmodel="Titus"]').data('side')]){
        x += tituulti[ [$('.selectedModel[data-tenmodel="Titus"]').data('side')] ][ c ]
    }
    return x
}
function tituStep({hex, row}){
    socket.emit('rolloSkill',{hex,row,socksMethod:'tituStep'})
    cancellerName = 'tituStep'
}
function _earthquake(origin,target){
    const { baim } = extractBoons_Blights(origin)
    const { hex, row } = target
    const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    if( $target.hasClass(`blackTeam`) )
        socket.emit('rolloSkill',{ aim:(4 + baim), socksMethod:`earthquake${phase==='white'?"White":"Black"}`, hex, row })
}
function earthquake_(o){
    const { aim, hex, row } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        const team = target.hasClass('blackTeam') ? '.blackTeam' : '.whiteTeam'
        un_glow()
        add_action_taken(`earthquake${phase==='white'?"White":"Black"}`)
        if( !$('.earthquake_selected').length && onHit(aim, target,'spell','Earthquake') ){
            displayAnimatedNews({
                templateType:'info', 
                skillName:`Earthquake`,
                skillIcon:'skull',
                $victim:target,
                msg2:` moving`
            })
            $(`[data-name="${target.data('name')}"]${team}`).addClass('earthquake_moveable')
            target.addClass('earthquake_selected')
            highlightHexes({colour:'legendaryGlow',dist:2},target)
        }
    }
    current_ability_method = null
}
function land_sliding( $thiz ){
    const kid = $($thiz.children(`[data-tenmodel^="Landslide"].whiteTeam`)[0])
    const { hex, row } = $thiz.data()
    if( kid.attr('data-landstepper') == '1' ){
        cancellerName = 'runecaller'
        socket.emit('rolloSkill',{ hex, row, socksMethod:'runecaller'})
    }
}
function _likeWater(origin,target){
    socket.emit('rolloSkill', { key:mySide, socksMethod:`likeWater${phase==='white'?'White':'Black'}` })
}
function likeWater_(o){
    if ( mySide === o.key )
        $('#gameScreen').append(  showLikeWater( $(`[data-tenmodel^="RaithMarid"][data-side="${o.key}"]`) )  )
    else 
        displayAnimatedNews({
            templateType:'info', 
            $attacker:$(`[data-tenmodel="Splashlings"].${o.key}`),
            skillName:' Like Water',
            skillIcon:'self'
        })
}
function _current(origin,target){
    const { hex, row } = target
    socket.emit('rolloSkill',{ socksMethod:`current${phase==='white'?'White':'Black'}`, hex, row})
}
function current_(o){
    const {  hex, row } = o
    const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
    if(!$('.current').length){
        $('.selectedModel').addClass('current_selected current')
        $(`[data-name="${singleSpecimen.data('name')}"].${team}`).addClass('current')
        un_glow()
        highlightHexes({ colour:'blueGlow', dist:3 })
        displayAnimatedNews({templateType:'info', msg0:'current'})
    }
}
function _tide(origin,target){
    const { baim } = extractBoons_Blights(origin)
    const { hex, row } = target
    const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    const unitSize = origin.siblings('.smallCard').length
    const aim = [5, 6, 7][unitSize]
    if($target.hasClass(`blackTeam`) )
        socket.emit('rolloSkill',{ aim: (aim + baim), socksMethod:`tide${phase==='white'?'White':'Black'}`, hex, row })
}
function tide_(o){
    const { aim, hex, row } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        un_glow()
        add_action_taken(`tide${phase==='white'?'White':'Black'}`)
        if( onHit(aim, target,'spell','Tide') ){
            un_glow()
            target.addClass('tide_selected')
            highlightHexes({colour:"legendaryGlow",dist:1},target)
            //movement of a victim herree
        }
    }
    current_ability_method = null
}
function ripplingScales(t){
    const side = t.data('side')
    if (side === mySide)
        $('#gameScreen').append( ripplingChoices(side) )
    else
        displayAnimatedNews({
            templateType:'info',
            skillName:'Rippling Scales',
            skillIcon:'self',
            msg2:' triggered'
        })
}
function rockFormation(whereTo,callback){
    const baner = $( whereTo.children('.claimedBanner')[0] )
    if ( baner.data('name') === 'Nia' ){
        const saiid = baner.hasClass('whiteTeam') ? mySide : opoSide
        displayAnimatedNews({
            templateType:'info', 
            $attacker:$($(`[data-tenmodel="Quartzlings"].${saiid}`)[0]),
            msg1:' trigger ',
            skillName:'Rock Formation',
            skillIcon:'self'
        })
        rallyActionDeclaration({ 
            unitname:'Nia', 
            side: saiid, 
            type:'unit', 
            name:'Quartzlings', 
            dist:1 
        },`rockFormation${mySide}`)
    }
    callback()
}
function _rockConcert(o,t){
    const { hex, row } = o.parent('.hexagon').data()
    socket.emit('rolloSkill', { hex, row, socksMethod:'rockConcert' })
}
function rockConcert_(o){
    const { hex, row } = o
    const dad = $(`.hex_${hex}_in_row_${row}`)
    const nija = $(dad.children('[data-tenmodel^="Nia"]')[0])
    const team = nija.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
    const quarzlings = $(`[data-tenmodel^="Quartzlings"].${team}`)
    const actionsTaken = Number( nija.attr('data-actionstaken') )
    if( !actionsTaken && quarzlings.length === 3 ){
        un_glow()
        displayAnimatedNews({
            templateType:'info', 
            $attacker:nija,
            msg1:' trigger ',
            skillName:'Rock Concert',
            skillIcon:'self',
            msg2:'and gains extra action'
        })
        nija.attr('data-actionstaken', -1)
        add_action_taken(`rockConcert${phase==='white'?'White':'Black'}`, true)
        current_ability_method = null
    } else if ( quarzlings.length !== 3 )
        displayAnimatedNews({templateType:'info', msg0:'Missing ',$attacker:'Quartzlings'})
    else if ( actionsTaken )
        displayAnimatedNews({templateType:'info', msg0:"Its no longer beginning of activation"})
}
function kerSplash_(o){
    const { hex, row, multiAction } = o
    const team = multiAction === mySide ? 'whiteTeam' : 'blackTeam'
    const $target = $($(`.hex_${hex}_in_row_${row}`).children(`[data-name="Splashlings"].${team}`)[0])
    if( $target.length && !$target.siblings('.smallCard').length ){
        displayAnimatedNews({templateType:'info', skillName:"Ker-splash!", skillIcon:"self"})
        forceKill($target)
        makeAnim($(`[data-name="RaithMarid"].${team}`),$(`.hex_${hex}_in_row_${row}`))
        add_action_taken(`kerSplash${phase==='white'?'White':'Black'}`)
    }
    current_ability_method=null
    un_glow()
}
function rubble(target){
    if( target.data('name') === 'Landslide' ){
        displayAnimatedNews({templateType:'info', $attacker:target, msg1: ' becomes ', skillName:'Rubble', skillIcon:'self'})
        const { hex, row } = target.parent('.hexagon').data()
        makeObjectiveHex(row,hex)
    }
}
function shieldWall ($HG){//takes in household_guard
    const product = onlyOneStep($(`[data-tenmodel^="Rhodri"][data-side="${$HG.data('side')}"]`).parent('.hexagon'),  $HG)
    if( product ) displayAnimatedNews({templateType:'info', skillName:'Shield Wall', skillIcon:'self'})
    return product
    //if next to rhodri, household can't be moved
}
function unyielding ($R){//takes_in_rhodri
    const team = $R.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
    let product = false
    $(`.claimedBanner.${team}`).each(function(){
        if (  onlyOneStep( $R.parent('.hexagon'), $(this) )  ){
            displayAnimatedNews({
                templateType:'info', 
                $attacker:$R,
                msg1:' is ',
                skillName:'Unyielding',
                skillIcon:'self'
            })
            product = true
            return false
        }
    })//thiz=hexToGoInto, origin = $('.selectedModel') by default
    // if next to banner rhodri cannot be moved
    return product
}
function brainFreeze(){
    //killing coldBones impairs attacker with dodgeBlight
    const victim = $('.selectedModel')
    setBoons_Blights(victim, { bdodge:(Number(victim.attr('data-bdodge')) -1) },0,{N:'Brain Freeze',I:'cogs'})
}
function validateBannerPlacement({ $model, $destination, rules }){
    const product = ( $destination.children().length < 3 && $destination.hasClass('objectiveGlow') )
    if ( product ) 
        return true
    else {
        displayAnimatedNews({templateType:'info', msg0:'place on empty objective hex'})
        return false
    }
}
function validateAvalanchePlacement(){
    return true
}
function standardWalk ({ $model, $destination, rules }){// rules is a array ['onlyOneStep','checkActionsCount']
    const { type, name, side } = $model.data()
    const team = $model.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
    const ONTO_OBJECTIVE_HEX = ()=>{
        return (
            !$destination.hasClass('objectiveGlow') || 
            type !== 'unit' || 
            ( name === 'Froglodytes' && 
            !$destination.children(`.claimedBanner`).length )
        )
    }
    const ONTO_EMPTY_HEX = ()=>{
        return (
            !$destination.children(`.smallCard`).length || 
            ( 
                (
                    (
                        name === $destination.children(`.smallCard[data-side="${side}"]`).first().data('name') && 
                        !$model.hasClass('largeUnitModel')
                    ) ||
                    ( 
                        (
                            name === 'SneakyStabbers' || 
                            name === 'YoungDragons' 
                        ) && $('[data-glow].hexagon').length > 6 )//data.glow count is bad fix
                ) && 
                $destination.children(`.smallCard`).length < 3
            )
        )
    } 
    const OPTIONAL_RULES = ()=>{
        const ONE_STEP = rules && rules.includes('onlyOneStep') ? onlyOneStep($destination, $model) : true
        const ACTIONS_C = rules && rules.includes('checkActionsCount') ? check_actions_count() : true
        return ONE_STEP && ACTIONS_C
    }
    const NOT_ON_MY_BANNER = ()=> !$destination.children(`.claimedBanner.${team}`).length
    return ( ONTO_OBJECTIVE_HEX() && ONTO_EMPTY_HEX() && OPTIONAL_RULES() && NOT_ON_MY_BANNER() )
}
function standardPush ({$model,$destination,rules}){// rules is a array ['onlyOneStep','checkActionsCount']
    const { type, name, side } = $model.data()
    const ONTO_OBJECTIVE_HEX = ()=>{
        return (
            !$destination.hasClass('objectiveGlow') || 
            type !== 'unit' && 
            !$destination.children(`.claimedBanner`).length //)
        )
    }
    const ONTO_EMPTY_HEX = ()=>{
        return (
            !$destination.children(`.smallCard`).length || 
            (
                name === $destination.children(`.smallCard[data-side="${side}"]`).first().data('name') && 
                $destination.children(`.smallCard`).length < 3 &&
                !$model.hasClass('largeUnitModel')
            )
        )
    } 
    const OPTIONAL_RULES = ()=>{
        const ONE_STEP = rules.includes('onlyOneStep') ? onlyOneStep($destination, $model) : true
        const NOT_UMOVABLES = ( $model.data('name') === "Rhodri") ?
                !unyielding($model) : //need to check for death thores
            $model.data('name') === "HouseholdGuard" ?
                !shieldWall($model) : 
                true
        return ONE_STEP && NOT_UMOVABLES
    }
    return ( ONTO_OBJECTIVE_HEX() && ONTO_EMPTY_HEX() && OPTIONAL_RULES() )
}
function update_basket(){
    for(let i = 1; i <= OP_SCORE; i++){
        $(`.treasureBox.${opoSide}`).children(`.gem${i}`).removeClass('nope')
    }
    for(let i = 1; i <= MY_SCORE; i++){
        $(`.treasureBox.${mySide}`).children(`.gem${i}`).removeClass('nope')
    }
    //update scores seen on board, make flashy animatoin
}
function calc_score(){
    let product = GAME_TURN === 1 ? 1 :
        GAME_TURN === 2 ? 2 :
        GAME_TURN === 3 ? 3 :
        GAME_TURN === 4 ? 2 :
        1
    return product
}
function am_I_winner(){
    return ( 
        mySide === 'left' && $('#coin').parent('.ladderBlock').data('block') < 12 || 
        mySide === 'right' && $('#coin').parent('.ladderBlock').data('block') > 11
    )
}
function end_GAME_check(){
    $('[data-kill]').each(function(){
        $(this).removeAttr('data-kill')
        removeObjectiveHex( $(this).data('row'), $(this).data('hex') ) 
    })
    if( OP_SCORE > 4 || MY_SCORE > 4 ){
        $(`.cardsContainer`)
            .removeClass(`hinge-in-from-left hinge-in-from-right mui-enter mui-enter-active`)
            .addClass(`hinge-out-from-left hinge-out-from-right mui-leave mui-leave-active`)
            .remove()
        $('#gameScreen').append(wellPlayed())
        setTimeout(()=>$("#WP")
            .removeClass('hinge-out-from-top mui-leave mui-leave-active')
            .addClass("hinge-in-from-top mui-enter mui-enter-active")
        ,700)
    }
}
function animateWeapon($target, weapon){
    const agroDad = $('.selectedModel').parent('.hexagon')
    const sucket = $target.parent('.hexagon')
    //weapondad has to be model with higher hex && row

    //weapon hes to have left-right versions:
    //odd origin -> even target ROW
    //even origin  <- odd target ROW

    let ofsetSize = $target.hasClass('champModel') ? [.3, 3.25] : [-0.75, -0.75]
    const left = -(sucket.offset().left - ofsetSize[0] *(.248261 / 12  * 1.38 * km) - $('.selectedModel').offset().left)+'px'
    const top = -(sucket.offset().top - ofsetSize[1] * (.248261 / 12  * .36 * km) - $('.selectedModel').offset().top )+'px'
    const team = $target.hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
    const randomisoro = Math.floor( Math.random () * (10000 - 1 + 1)) + 1
    const specialKlazz = () => {
        const SM_d = agroDad.data()
        const VM_d = sucket.data()
        if( SM_d.hex > VM_d.hex ){
            return 'weaponSpinToLeft'
        } else if ( SM_d.hex < VM_d.hex ){
            return 'weaponSpinToRight'
        } else if ( SM_d.hex === VM_d.hex ){
            //theyre even
            if( SM_d.row % 2 === 0 ){
                return 'weaponSpinToLeft'
            } else {
                return 'weaponSpinToRight'
            }
        }
    }
    agroDad.append(`
        <img id="factualWeapon" class="${randomisoro}" src="./img/${weapon}-${team}.svg" />
    `)
    setTimeout(()=>{
        //$('#factualWeapon')
        agroDad.find('#factualWeapon')
        .addClass( specialKlazz() )
            .css({ left, top })
            .detach()
            .appendTo(sucket)
            .animate({
                left:0,
                top:0
            }, 400,()=>{
                setTimeout(()=>$(`#factualWeapon.${randomisoro}`).remove(),250)
            })
        },400)
}
const phaser = () => phase === 'white' ? 'White' : 'Black'

function _royalSummons(origin,target){
    let PH = phase === 'white' ? 'White' : 'Black'
    socket.emit('rolloSkill',{ socksMethod:"royalSummons"+PH })
}
const rally_drakes = (side)=>{
    add_action_taken('royalSummons'+phaser())
    //no drakes on board, allow only for recruitment
    rallyActionDeclaration({ unitname:'Keera', side, type:'unit', name:'YoungDragons' })
    displayAnimatedNews({
        templateType:'info', 
        $attacker:$('.selectedModel'), 
        msg1:' recruits ', 
        $victim:$(`[data-tenmodel="YoungDragons"].${side}`).length ? 
            $($(`[data-tenmodel="YoungDragons"].${side}`)[0]) : 'Young Dragons'
    })
}
const walk_drakes = (drakes)=>{
    //two drakes, one can walk, no recruitment
    if( !$('.summonsWalk').length ){
        drakes.addClass('summonsWalk')
        displayAnimatedNews({
            templateType:'info', 
            $attacker:$('.selectedModel'), 
            msg1:' commands ',
            msg2:' to advance ', 
            $victim:$(`[data-tenmodel="YoungDragons"].${side}`)
        })
    }
}
function royalSummons_(o){
    const team = $('.selectedModel[data-tenmodel^="Keera"]').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
    const drakes = $(`[data-tenmodel^="YoungDragons"].${team}`)
    const side = $('.selectedModel[data-tenmodel^="Keera"]').data('side')
    if ( drakes.length < 1 ){
        rally_drakes(side)
    } else if ( drakes.length === 1 ){
        $('#gameScreen').append(  royalSummonsChoices( drakes, side )  )
    } else {
        walk_drakes(drakes)
    }
}
const kause_of_Keera = () => {
    const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
    un_glow()
    highlightHexes({colour:'blank',dist:3})
    const drakes = $('[data-glow].hexagon').children(`[data-tenmodel^="YoungDragons"].${team}`)
    un_glow()
    return drakes
}

function GEEK_MAKER(rozter, victims){//keera, titus, shayle
    const nameButter = (r) =>{ 
        let prod = {}
        r.forEach(el => prod[el] = 0)
        return prod
    }
    let vNames = []
    for(let k in rosters){
        let klass = rosters[k]
        let band = klass.filter(b => { return (
            victims[0]===b.champ.name || 
            victims[1] === b.champ.name || 
            victims[2] === b.champ.name || 
            victims[3] === b.champ.name 
        )})
        if(band.length){
            vNames = [...vNames, band[0].champ.name, band[0].grunt.name]
        }
    }
    let template =  {
        bannersClaimed:0,//
        bannersStayed:0,//
        bannersSlayed:0,//?
        accuracy:[],//
        dmgCaused:0,//
        dodgeability:[],//
        tankyness:0,//
        woundsSuffered:0,//
        ralliesRecruits:0,//
        hexesTravelled:0,//
        stepsEarned:0,//
        favouriteToHit:nameButter(vNames),//
        killsCount:nameButter(vNames)//
    }
    let product = {}
    for(let k in rosters){
        let klass = rosters[k]
        let band = klass.filter(b => { return (
            rozter[0]===b.champ.name || 
            rozter[1] === b.champ.name || 
            rozter[2] === b.champ.name || 
            rozter[3] === b.champ.name
        )})
        if(band.length){
            product[band[0].champ.name] = template
            product[band[0].grunt.name] = template
        }
    }
    return product
}
function counterMaker(model,attrib,n=1){
    try {
        GEEK[model.data('side')][model.data('name')][attrib]+=n
    } catch { 
        console.log('error @ counterMarker', model, attrib, n) 
    }
}
function percentileMarker(model,attrib,boo){
    try {
        GEEK[model.data('side')][model.data('name')][attrib] = [...GEEK[model.data('side')][model.data('name')][attrib], boo]
    } catch { 
        console.log('error @ percentileMarker', model, attrib, boo) 
    }
}
function pixkedAtMarker(model,mode,victim){
    try {
        GEEK[model.data('side')][model.data('name')][mode][victim.data('name')]+=1
    } catch { 
        console.log('error @ pixkedAtMarker', model, mode, victim) 
    }
}

function turnTransition_ (dieRoll){
    myTurn = myTurn ? false : true
    //p1 && p2 starts black
    if(phase==='white'&&myNextPhase==='black'){
        phase='black'
        $('.plotPhase').removeClass('plotPhase').addClass('clashPhase')
        turn_resetter(opoSkillTrack,'black','blackTeam')
        turn_resetter(mySkillTrack,'black','whiteTeam')
        animateCart(opoSide, $($(".blackTeam[data-tenmodel]")[0]))
        animateCart(mySide, $($(".whiteTeam[data-tenmodel")[0]))
    }
    if(phase==='white'&&myNextPhase==='white'){
        turn_resetter(opoSkillTrack,'white','blackTeam')
        turn_resetter(mySkillTrack,'white','whiteTeam')
        myNextPhase='black'
       // myTurn = myTurn ? false : true
    }
    if( 
        phase==='black' && 
        $('.activated.blackTeam[data-tenmodel]').length === $('.blackTeam[data-tenmodel]').length && 
        $('.activated.whiteTeam[data-tenmodel]').length === $('.whiteTeam[data-tenmodel]').length
    ){
        myTurn = false
        phase='end' 
        let myBanners = removeAllBanners('blackTeam')
        let opBanners = removeAllBanners('whiteTeam')
        moveLadder($($('[data-tenmodel].whiteTeam')[0]), myBanners - opBanners)
        $('.clashPhase').removeClass('clashPhase').addClass('endPhase')
        myNextPhase = 'white'
        GAME_SCENARIO.dieRoll = dieRoll
        const skor = calc_score()
        //see if i won:
        if ( am_I_winner() ){
            MY_SCORE += skor
        } else {
            OP_SCORE += skor
        }
        end_GAME_check()
        update_basket()
        console.log('did both players get thi message??')
        GAME_TURN++
        displayAnimatedNews(  { templateType:'info',msg0:GAME_SCENARIO.turnEndMessage(dieRoll) }  )
        if( GAME_SCENARIO.instaCall )
            GAME_SCENARIO.ruleset(0,0)
    }
    if( myTurn )
        displayAnimatedNews({templateType:'info',msg0:'Your turn'})
    //need to add deifer and ultra resetter here
}
const rolloAndo = (that,name)=>{
    add_action_taken(name)
    $('[data-glow^="str"].hexagon').each(function(){
      if ( $(this).attr('data-glow') !== $('.selectedModel').parent('.hexagon').attr('data-glow') ) {
          $(this).removeAttr('data-glow')
          $(this).children('.top').removeAttr('data-glow')
          $(this).children('.bottom').removeAttr('data-glow')
      }
    })
    $('[data-glow].hexagon').each(function(){
        $(this).attr('data-glow','straitPaths')
        $(this).children('.top').attr('data-glow','straitPaths')
        $(this).children('.bottom').attr('data-glow','straitPaths')
    })
    $('.selectedModel').parent('.hexagon').removeAttr('data-glow')
    $('.selectedModel').siblings('.top').removeAttr('data-glow')
    $('.selectedModel').siblings('.bottom').removeAttr('data-glow')
    if( !$('[data-glow="straitPaths"]').length ){
        $(`.${name}_selected`).removeClass(`${name}_selected ${name}`)
        if( !$('.roll').length )
            current_ability_method = null
    }
}