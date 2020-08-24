socket.on('duplicateGamerName',()=>$("#wronCharWarning").text("nickname already taken"))
socket.on('duplicateGameLobbyName',()=>$("#wronCharWarning").text("room already in use"))
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
                GAME_SCENARIO = scenarios[p.scenario]
                makeWarbandTokens(GAME_SCENARIO.warbandTokens)
                setTimeout(()=>$('body').append(  displayDeploymentInfo(scenarios[p.scenario])  ),600)
                
                $(`.ladderBlock.block${p.coin}`).append( makeCoin() )
                makeAnim('.selected-model',$(`.${myDeployment}`))
            }
            ,600)
    }
)

socket.on('deployment-select',p=>{
    $('.selected-model').removeClass('selected-model')
    $('.teamBox.'+opoDeployment).removeClass(opoDeployment)
    $(`.${opoSide}.miniGameCard`)
        .find(`[data-tenModel=${p}]`)
        .addClass('selected-model')
            .parent('.teamBox')
            .addClass(opoDeployment)
})

socket.on('d-o-h',p=>{
    const { hex, row } = p
    const dad = $(`.hex_${hex}_in_row_${row}`)
    deployTrayToBoard('selected-model',dad,false)
    if( !$('.list.tray').find('.teamBox').children('.smallCard').length && myTurn) {
        socket.emit('beginBattle')
        displayAnimatedNews({ templateType:'info',msg0:'Begin Plot Phase' })
    } else if (myTurn && !$(`.teamBox.${myDeployment}`).children(".smallCard").length) {
        displayAnimatedNews({templateType:'info', msg0:"Opponent will now place their warband's models"})
    } else if ( !myTurn && !$(`.teamBox.${opoDeployment}`).children('.smallCard').length ){
        displayAnimatedNews({ templateType:'info', msg0:'Now you deploy one warband'})
    }
    const deter = myTurn ? {side:mySide, dep:myDeployment} : {side:opoSide, dep:opoDeployment}
    const counter = $(`.teamBox.${deter.side}.${deter.dep}`).children('.smallCard').length
    myTurn = counter && myTurn ? 
        true : !counter ? 
            myTurn ? false : true : myTurn
    if( !counter ) $(`.teamBox.${deter.side}.${deter.dep}`).removeClass(deter.dep)
})

socket.on('horn',p=>{
    phase = p
    beginFirstPlotPhase()
    $('.deployPhase').removeClass('deployPhase').addClass('plotPhase')
    for(let side in GEEK){
        for(let model in GEEK[side]){
            GEEK[side][model].hexesTravelled = 0
        }
    }
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
socket.on('sC',p=>{
    m.universal.claim( $(`.hex_${p.hex}_in_row_${p.row}.hexagon`), 'blackTeam',p.key )
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
    //UNTESTEDO BADLY
    const child = klass.className && $($(`.hex_${klass.h}_in_row_${klass.r}`).children(klass.className)[0]).length ? 
        $($(`.hex_${klass.h}_in_row_${klass.r}`).children(klass.className)[0])
        :
        children
    makeAnim( $(child), $(`.hex_${h}_in_row_${r}`), _m_[callback] )
})


socket.on( 'camcel', p=>defy[p.m](p.c) )
socket.on( 'epp', o=>GAME_SCENARIO.ruleset(o) )