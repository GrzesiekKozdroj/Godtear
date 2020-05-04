const if_moved_end_it  = () => {
    const name = $('.selectedModel').attr('data-name')
    const side = $('.selectedModel').attr('data-side')
    const actionstaken = $('.selectedModel').attr('data-actionstaken')
    const w = phase === 'white' ? 0 : 2
    $(`[data-name=${name}][data-tenmodel].${side}`).each(function(){
        const speed = $(this).attr('data-speed')
        const speedleft = $(this).attr('data-speedleft')
        const bspeed = $(this).attr('data-bspeed')
        if(Number(speedleft[w]) + Number(bspeed) < Number(speed[w]) ){
            $(`[data-name=${name}][data-tenmodel].${side}`).each(function(){
                $(this).attr('data-actionstaken', Number(actionstaken) + 1 )
                let left = phase === 'white' ? [0,speedleft[2]] : [speedleft[0],0]
                $(this).attr('data-speedleft', left)
            })
            setBoons_Blights($(`[data-name=${name}][data-tenmodel].${side}`),{bspeed:0})
            return false
        }
    })
}
const abilTruthChange = (abilName = null) => {
    let name = $('.selectedModel').data('name')
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
    $(`[data-m="${abilName}"]`).removeClass('glow_unused').addClass('usedSkill')
}

const abilTruthRead = (abilName = null, name = $('.selectedModel').data('name') ) => {
    const targetos = (abilName, p = phase) => 
        $('.selectedModel').hasClass('whiteTeam') ? 
        mySkillTrack[name][p][abilName].used
        : 
        opoSkillTrack[name][p][abilName].used

    if (abilName === "legendary")
        return !targetos("legendary","util")
    else if (typeof abilName === 'string')
        return !targetos(abilName)
    else
        return true
}

const add_action_taken = (abilName = false,shallI = false) => {
        const actionstaken = Number($('.selectedModel').attr('data-actionstaken'))
        const name  = $('.selectedModel').attr('data-name')
    if(!shallI){
        $(`[data-name=${name}]`).each(function(){
            $(this).attr('data-actionstaken', (Number(actionstaken) + 1) )
        })
    }
    abilTruthChange(abilName)
}
const check_actions_count = (abilName = false) => {
    return Number( $('.selectedModel').attr('data-actionstaken') ) < 2 && 
    abilTruthRead(abilName)
    ? true : false
}

const onHit = (aim, target) => { 
    const target_dodge = Number(target.attr('data-dodge')) + Number(target.attr('data-bdodge'))
    const aim_total = aim.reduce((a,b)=>a+b,0)
    setBoons_Blights($('.selectedModel'),{baim:0})
    setBoons_Blights(target,{bdodge:0})
    return aim_total >= target_dodge
}//<--should take $(origin) and reset its baim and take target and reset its bdodge
const doDamage = (hurt, target) => {
    const target_protection = Number(target.attr('data-protection')) + Number(target.attr('data-bprotection'))
    const hurt_total = hurt.reduce((a,b)=>a+b,0)
    setBoons_Blights($('.selectedModel'),{bdamage:0})
    setBoons_Blights(target,{bprotection:0})
        if(hurt_total > target_protection){
            let target_health = target.attr('data-healthleft')
            let pain = target_health - (hurt_total - target_protection)
            target.attr( 'data-healthleft', pain )
            animateDamage(target, (target_protection - hurt_total))
            return true
        } else { return false }
}//<--should take $(origin) and reset its bdamage and take target and it bprotection
const animateDamage = (target, pain) => {
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
const checkIfStillAlive = (target) => {
    if( Number(target.attr('data-healthleft') ) < 1 ){
        forceKill(target)
        return true
    }
}
const forceKill = (target) => {//$()
    target.addClass('death')
    setBoons_Blights( target, { baim:0, bdamage:0, bspeed:0, bdodge:0, bprotection:0})
    target.attr('data-healthleft',target.data('health'))
    setTimeout(()=>{
        if( target.data('type')==='unit' )
            if(
                graveyard[target.data('side')][target.data('name')] && 
                graveyard[target.data('side')][target.data('name')].length
            )
                graveyard[target.data('side')][target.data('name')] = 
                    [...graveyard[target.data('side')][target.data('name')], target.removeClass('.death').detach()]
            else
                graveyard[target.data('side')][target.data('name')] = [target.removeClass('.death').detach()]
        else if( target.data('type')==='champion' ){
            //gotta emit champ death
            $('[data-glow]').removeAttr('data-glow')
            highlightHexes({colour:'deathMove',dist:2},target)
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
    const calculus = ((.79*window.innerWidth / 17.23 ) - .01*window.innerWidth)
    const destination = $(`.block${ origin + steps * direction }`)
    $('#coin').animate({
        left: (steps * direction * calculus)
    }, 500, ()=>{
        $('#coin').removeAttr('style').finish().detach().appendTo(destination)
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
const setBoons_Blights = (origin,props,local = false)=>{//$(), {baim:-1}
    for(let key in props){
        let boon_blight = props[key]
        let subject = local !== 'local' ? $(`[data-name="${origin.data('name')}"][data-side="${origin.data('side')}"]`) : origin
            subject.each(function(){
                if( boon_blight <= 1 && boon_blight >= -1 ){
                    $(this).attr(`data-${key}`,boon_blight) 
                    if(boon_blight!==0){
                        $(this).find(`.${key}-dum`).addClass(`${key} ${boon_blight>0?'booned':'blighted'}`)
                        $(`.miniGameCard.${$(this).data('side')}`)
                            .find('.'+[...key].slice(1).join(''))
                            .addClass('glow_BB_card booned')
                    }else{
                        $(this).find(`.${key}-dum`).removeClass(`${key} booned blighted`)
                        $(`.miniGameCard.${$(this).data('side')}`)
                            .find('.'+[...key].slice(1).join(''))
                            .removeClass('glow_BB_card booned blighted')
                    }
                }
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
function extraMover(methodName,thiz,conditions=true){//<----needs another props: conditions to be considered
    if($('.'+methodName+'_selected').length && myTurn && conditions){//tioed to a bug with IllKillYouAll
        const h = thiz.data('hex')
        const r = thiz.data('row')
        const klass = { 
            h:$('.'+methodName+'_selected').parent('.hexagon').data('hex'), 
            r:$('.'+methodName+'_selected').parent('.hexagon').data('row')
        }
        if(h !== klass.h || r !==klass.r){
            makeAnim( $('.'+methodName+'_selected'), thiz, _m_[methodName] )
            socket.emit('forceMove',{h:h, r:r, klass, callback:methodName})
        }
    }
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
    console.log(unitname,side,type,name,dist)
    const { hex, row } = $(`[data-name="${unitname}"].${side}`).parent('.hexagon').data()
    river = [unitname,side,type,name]
    if(name==="Retchlings"){
        $(`[data-name="${name}"].${side}`).each(function(){
            const h = $(this).parent('.hexagon').data('hex')
            const r = $(this).parent('.hexagon').data('row')
            highlightHexes({colour:glowType,dist},$(this))
            socket.emit('HH', {color:glowType,dist, hex:h, row:r, river})
        })
    }
    //highlightHexes({colour:glowType,dist},$(`[data-name="${unitname}"].${side}`))
    if ( !$('[data-glow="recruitGlow"]').length )
        socket.emit('HH', {color:glowType,dist, hex, row, river})
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
    $('[data-glow]').removeAttr('data-glow')
    current_ability_method = null
    add_action_taken()
    if_moved_end_it()
}
function blights_spew_recieved({o, blight}){
    const { aim, hex, row } = o
    const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
    if(targets.length){
        const target = $(targets[0])
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        add_action_taken()
        if( onHit(aim, target) ){
            setBoons_Blights(target,{[blight]:-1})
            displayAnimatedNews (`${target.data('name')} <br/> -1 ${blight.splice(0,1)}`)
        } else 
            displayAnimatedNews ("missed!")
    }
    current_ability_method = null
}
function healLife(target, h = 2){
    for(let oi = 0; oi < 2; oi++){
        if(  Number( target.attr('data-healthleft') ) < Number( target.attr('data-health') )  ){
            const currentWounds = Number(target.attr('data-healthleft')) + 1
            target.attr('data-healthleft', currentWounds)
        }
    }
    displayAnimatedNews(`${target.data('name')}<br/>heals ${h} wound${h>2?"s":''}`)
}
function march (string, targetHex, thizModel = $('.selectedModel') ){
    const { hex, row } = targetHex
    thizModel.addClass(`march${string}_selected`)
    highlightHexes({colour:'legendaryGlow',dist:1},$(`.march${string}_selected`))
    socket.emit('forceMove',{h:hex, r:row, klass:"champion", callback:`march${string}`})
}
function marchExec(string){
    current_ability_method = null
    add_action_taken()
    if_moved_end_it()
    $('[data-glow]').removeAttr('data-glow')
    $(`.march${string}_selected`).removeClass(`march${string}_selected`)
    displayAnimatedNews('marching')
}
function rallyChampion(thiz){
    console.log(thiz)
    thiz.removeClass('death mournblade_raisins').attr('data-healthleft', thiz.data('health') )
    displayAnimatedNews(`${thiz.data('name')}<br/>back in game`)
}
function _target({ hex, row }){//UNFINISHED, not annoyed enuff yet
    return $(`.hex_`)
}

function moveContentsOfHex(stringz,thiz){//"string for callback name" and $(thestinationHex)
    const { hex, row } = thiz.data()
    socket.emit('rolloSkill',{ hex, row, socksMethod:stringz })
    console.log('step4')
}

function propagate_BB_s($origin,$target){
    const origin = extractBoons_Blights( $origin )
    const { baim, bdamage, bspeed, bdodge, bprotection } = origin
    setBoons_Blights( $target, { baim, bdamage, bspeed, bdodge, bprotection } )
}
function shootAndScoot(){
    highlightHexes({colour:'shootAndScoot',dist:1})
    $('.selectedModel').addClass('shootAndScoot_selected')
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