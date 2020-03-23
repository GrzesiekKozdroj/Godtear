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

socket.on('mM',p=>{
    let thiz = $(`.hex_${p.h}_in_row_${p.r}`)
    reduceSpeedLeft()
    makeAnim(  $('.selectedModel'), thiz, displayMovementAura )
})