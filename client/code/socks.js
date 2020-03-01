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
        setTimeout(
            ()=>{
                $('#gameScreen')
                    .empty().off()
                    .append(  $('#gameScreen').empty().append( makeGameBoard(p.pack,p.coin) )  )
                    .removeClass('scale-out-down mui-leave mui-leave-active')
                    .addClass('scale-in-up mui-enter mui-enter-active')
                
                buildScenarioLayout(scenarios[p.scenario].layout)
                $(`.ladderBlock.block${p.coin}`).append( makeCoin() )
                makeAnim('.selected-model',$(`.${myDeployment}`))
            }
            ,600)
    }
)

socket.on('deployment-select',p=>{
    console.log(p)
    $('.selected-enemy-model').removeClass('selected-enemy-model')
    $(`.${opoSide}.miniGameCard`).find(`[data-tenModel=${p}]`).addClass('selected-enemy-model')
})

