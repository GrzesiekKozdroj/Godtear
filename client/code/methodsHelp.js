const if_moved_end_it  = () => {
    const {speed, speedleft, bspeed, name, actionstaken} = $('.selectedModel').data()
    const w = phase === 'white' ? 0 : 2
    if(speedleft[w] + bspeed < speed[w])
        $(`[data-name=${name}]`).each(function(){
            $(this).data('actionstaken', actionstaken + 1 )
            let left = phase === 'white' ? [0,speedleft[2]] : [speedleft[0],0]
            $(this).data('speedleft', left)
        })
}
const add_action_taken = () => {
    const { actionstaken, name } = $('.selectedModel').data()
    $(`[data-name=${name}]`).each(function(){
        $(this).data('actionstaken', actionstaken + 1 )
    })
}
const check_actions_count = () => Number( $('.selectedModel').data('actionstaken') ) < 2 ? true : false