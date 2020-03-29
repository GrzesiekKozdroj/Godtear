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
const add_action_taken = () => {
    const actionstaken = Number($('.selectedModel').attr('data-actionstaken'))
    const name  = $('.selectedModel').attr('data-name')
    $(`[data-name=${name}]`).each(function(){
        $(this).attr('data-actionstaken', (Number(actionstaken) + 1) )
    })
}
const check_actions_count = () => Number( $('.selectedModel').attr('data-actionstaken') ) < 2 ? true : false

const onHit = (aim, target) => { 
    const target_dodge = Number(target.attr('data-dodge')) + Number(target.attr('data-bdodge'))
    const aim_total = aim.reduce((a,b)=>a+b,0)
    $('.selectedModel').attr('data-baim', 0)
    target.attr('data-bdodge',0)
    return aim_total >= target_dodge
}
const doDamage = (hurt, target) => {
    const target_protection = Number(target.attr('data-protection')) + Number(target.attr('data-bprotection'))
    const hurt_total = hurt.reduce((a,b)=>a+b,0)
    $('.selectedModel').attr('data-bdamage', 0)
    target.attr('data-bprotection',0)
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
    console.log(target, steps)
    const origin = $('#coin').parent('.ladderBlock').data('block')
    const coinDirection = mySide ==='left' ? -1 : 1
    const netto = target.hasClass('whiteTeam') && target.hasClass('smallCard') ? -1 : 1
    $('#coin').detach().appendTo(`.block${origin+(steps * coinDirection * netto)}`)

}

