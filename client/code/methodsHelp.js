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