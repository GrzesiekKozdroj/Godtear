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
socket.on('HH',p=>{
    river = p.river ? p.river : null
    const h = p.hex ? p.hex   : false
    const r = p.row ? p.row   : false
    const m = p.m   ? p.m     : false
    const specimen = r && h ? $($(`.hex_${h}_in_row_${r}`).children()[0]) : $('.selectedModel')
    if(!river)un_glow()
    //un_glow()//added cause graspingDead double aura
    highlightHexes({colour:p.color,dist:p.dist}, specimen)
    if( m )__m[m]()
})
socket.on('sC',p=>{console.log('banner falle after emit')
    m.universal.claim( $(`.hex_${p.hex}_in_row_${p.row}`), 'blackTeam',p.key )
})
socket.on('markedMan',p=>{
    const {hex, row, multiInfo} = p
    const {name, count, color, klass, ability} = multiInfo
    const target = $($(`.hex_${hex}_in_row_${row}`).children('.unitModel').not(`.${klass}`)[0])
    placeMark({hex, row, multiInfo, target})
})
socket.on('fM',p=>{
    const { h, r, klass, callback } = p
    //this shouldn't just be a small card, has to be smallcard by default though, unless i want to backtrack
    const children = $(`.hex_${klass.h}_in_row_${klass.r}`).children('.smallCard').length ? 
            $(`.hex_${klass.h}_in_row_${klass.r}`).children('.smallCard')[0] :
            $(`.hex_${klass.h}_in_row_${klass.r}`).children('.claimedBanner')[0]
    makeAnim( $(children), $(`.hex_${h}_in_row_${r}`), _m_[callback] )
})
socket.on('tt',p=>{//{current:myTurn, next:phase}
    const { current, next } = p
    myTurn = myTurn ? false : true
    $('.activatingShow').removeClass('activatingShow').addClass('nonActivShow')
    $('.nonActivShow').removeClass('nonActivShow').addClass('activatingShow')
    //p1 && p2 starts black
    if(phase==='white'&&myNextPhase==='black'){
        phase='black'
        turn_resetter(opoSkillTrack,'black','blackTeam')
        turn_resetter(mySkillTrack,'black','whiteTeam')
    }
    if(phase==='white'&&myNextPhase==='white'){
        turn_resetter(opoSkillTrack,'white','blackTeam')
        turn_resetter(mySkillTrack,'white','whiteTeam')
        myNextPhase='black'
    }
    if(phase==='black'&&$('.activated.blackTeam[data-tenmodel]').length === $('.blackTeam[data-tenmodel]').length)
        console.log('TURN END TURN END TURN END TURN END TURN END TURN END')
    myTurn?displayAnimatedNews('Your<br/>turn'):0
})
socket.on('camcel',p=>defy[p.m]())