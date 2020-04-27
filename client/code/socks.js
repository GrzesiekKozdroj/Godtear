socket.on('duplicateGamerName',()=>$("#wronCharWarning").text("nickname already taken"))
socket.on('duplicateGameLobbyName',()=>$("#wronCharWarning").text("room already in use"))
socket.on('serverEvalMSG',o=>console.log(o))
socket.on('alfaTime',()=>{
    $('#gameScreen').addClass('scale-out-down mui-leave mui-leave-active')
    setTimeout(()=>$('#gameScreen')
        .empty().off()
        .append(  $('#gameScreen').empty().append( opponentWaitingScreen() )  )
        .removeClass('scale-out-down mui-leave mui-leave-active')
        .addClass('scale-in-up mui-enter mui-enter-active')
        ,600)
}/*.empty().off().append(opponentWaitingScreen())*/)

socket.on('betaTime',
    p=>{
        $('#gameScreen').addClass('scale-out-down mui-leave mui-leave-active')
        phase='deployment'
        setTimeout(
            ()=>{
                $('#gameScreen')
                    .empty().off()
                    .append(  $('#gameScreen').empty().append( makeGameBoard(p.pack,p.coin) )  )
                    .removeClass('scale-out-down mui-leave mui-leave-active')
                    .addClass('scale-in-up mui-enter mui-enter-active')
                
                buildScenarioLayout(scenarios[p.scenario].layout)

                setTimeout(()=>$('body').append(  displayDeploymentInfo(scenarios[p.scenario])  ),600)
                
                $(`.ladderBlock.block${p.coin}`).append( makeCoin() )
                makeAnim('.selected-model',$(`.${myDeployment}`))
            }
            ,600)
    }
)

socket.on('deployment-select',p=>{
    $('.selected-enemy-model').removeClass('selected-enemy-model')
    $(`.${opoSide}.miniGameCard`).find(`[data-tenModel=${p}]`).addClass('selected-enemy-model')
})

socket.on('d-o-h',p=>{
    myTurn = p.turnChange ? false : true
    let that = $(`.hex_${p.hex}_in_row_${p.row}`)
    deployTrayToBoard('selected-enemy-model',that,false)

    if( !$('.list.tray').find('.teamBox').children('.smallCard').length && myTurn) socket.emit('beginBattle')
    else if(myTurn) displayAnimatedNews ('Your turn')
})

socket.on('horn',p=>{
    phase = p
    beginFirstPlotPhase()
})

socket.on('sM',p=>{
    const thiz = $(`.blackTeam[data-tenmodel=${p}]`)
    declareSelectedModel(thiz)
    displayMovementAura(thiz)
})

socket.on('mM',p=>{console.log('mM',p.r,p.h)
    let thiz = $(`.hex_${p.h}_in_row_${p.r}`)
    reduceSpeedLeft()
    makeAnim(  $('.selectedModel'), thiz, displayMovementAura )
})
socket.on('HH',p=>{
    river = p.river ? p.river : null
    const h = p.hex ? p.hex   : false
    const r = p.row ? p.row   : false
    const m = p.m   ? p.m     : false
    const specimen = r && h ? $($(`.hex_${h}_in_row_${r}`).children()[0]) : $('.selectedModel')
    if(!river)$('[data-glow]').removeAttr('data-glow')
    highlightHexes({colour:p.color,dist:p.dist}, specimen)
    if( m )__m[m]()
})
socket.on('sC',p=>{
    m.universal.claim( $(`.hex_${p.hex}_in_row_${p.row}`), 'blackTeam' )
})
socket.on('markedMan',p=>{
    const {hex, row, multiInfo} = p
    const {name, count, color, klass, ability} = multiInfo
    const target = $($(`.hex_${hex}_in_row_${row}`).children('.unitModel').not(`.${klass}`)[0])
    placeMark({hex, row, multiInfo, target})
})
socket.on('fM',p=>{console.log('fM',p)
    const { h, r, klass, callback } = p
    //this shouldn't just be a small card, has to be smallcard by default though, unless i want to backtrack
    const children = $(`.hex_${klass.h}_in_row_${klass.r}`).children('.smallCard').length ? 
            $(`.hex_${klass.h}_in_row_${klass.r}`).children('.smallCard')[0] :
            $(`.hex_${klass.h}_in_row_${klass.r}`).children('.claimedBanner')[0]
    makeAnim( $(children), $(`.hex_${h}_in_row_${r}`), _m_[callback] )
})