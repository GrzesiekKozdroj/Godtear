const if_moved_end_it  = () => {
    const speed = $('.selectedModel').attr('data-speed')
    const speedleft = $('.selectedModel').attr('data-speedleft')
    const bspeed = $('.selectedModel').attr('data-bspeed')
    const name = $('.selectedModel').attr('data-name')
    const actionstaken = $('.selectedModel').attr('data-actionstaken')
    const w = phase === 'white' ? 0 : 2
    if(Number(speedleft[w]) + Number(bspeed) < Number(speed[w]) )
        $(`[data-name=${name}]`).each(function(){
            $(this).attr('data-actionstaken', Number(actionstaken) + 1 )
            let left = phase === 'white' ? [0,speedleft[2]] : [speedleft[0],0]
            $(this).attr('data-speedleft', left)
        })
}
const add_action_taken = (shallI = false) => {
    if(!shallI){
        const actionstaken = Number($('.selectedModel').attr('data-actionstaken'))
        const name  = $('.selectedModel').attr('data-name')
        $(`[data-name=${name}]`).each(function(){
            $(this).attr('data-actionstaken', (Number(actionstaken) + 1) )
        })
    }
}
const check_actions_count = () => Number( $('.selectedModel').attr('data-actionstaken') ) < 2 ? true : false

const onHit = (aim, target) => { 
    const target_dodge = Number(target.attr('data-dodge')) + Number(target.attr('data-bdodge'))
    const aim_total = aim.reduce((a,b)=>a+b,0)
    setBoons_Blights($('.selectedModel'),{baim:0})
    setBoons_Blights(target,{bdodge:0})
    return aim_total >= target_dodge
}
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
}
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
        target.addClass('death')
        setTimeout(()=>{
            graveyard[target.data('name')] = target.removeClass('.death').detach()
        }, 700)
        return true
    }
}
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
    return { baim, bdamage, bspeed, bdodge, bprotection }
}
const setBoons_Blights = (origin,props)=>{//$(), {baim:-1}
    for(let key in props){
        let boon_blight = props[key]
        $(`[data-name="${origin.data('name')}"][data-side="${origin.data('side')}"]`)
            .each(function(){
                let attribute =Number( $(this).attr(`data-${key}`) )
                if( attribute < 1 && attribute > -1 )
                    $(this).attr(`data-${key}`,boon_blight) 
            })
    }
}
const placeMark = ({hex, row, multiInfo, target, key}) => {
    target.addClass('destined_for_DOOM')
    target.attr('data-DOOMqueue', key)
    $('#gameScreen').append(multi_choice_info_panel(multiInfo))
}
const tellMeDistance = (origin,target) => {
    //origin and taget expect two objects: {hex, row}
    const oh = origin.hex, or = origin.row
    const th = target.hex, tr = target.row
    const hexes = Math.abs(oh - th)
    const rows  = Math.abs(tr - or)
    return hexes < rows ? Math.floor(hexes / 2) + rows : Math.floor(rows / 2) + hexes
}
const highlightDirectPaths = ( { origin, distance, colour } ) => {
    //origin:$(this).parent('.hexagon).data(), number, i.e. 'greenGlow
    const h = origin.hex
    const r = origin.row

    if(distance === 2){
        $(`.hex_${h - 2}_in_row_${r}`).attr('data-glow',colour+1)
        $(`.hex_${h + 2}_in_row_${r}`).attr('data-glow',colour+4)
    } else if (distance === 3){
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
        if (distance === 3 ){
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
        if(distance === 3 ){
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

function extraMover(methodName,thiz){
    if($('.'+methodName+'_selected').length && myTurn){
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
function leave_only_selected_path(chosenGlows){
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