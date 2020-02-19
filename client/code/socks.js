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
                    .append(  $('#gameScreen').empty().append( makeGameBoard(p.pack) )  )
                    .removeClass('scale-out-down mui-leave mui-leave-active')
                    .addClass('scale-in-up mui-enter mui-enter-active')
                
                buildScenarioLayout(scenarios[p.scenario].layout)
            }
            ,600)
    }
)