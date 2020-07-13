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
    //UNTESTEDO BADLY
    const child = klass.className && $($(`.hex_${klass.h}_in_row_${klass.r}`).children(klass.className)[0]).length ? 
        $($(`.hex_${klass.h}_in_row_${klass.r}`).children(klass.className)[0])
        :
        children
    makeAnim( $(child), $(`.hex_${h}_in_row_${r}`), _m_[callback] )
})
socket.on('tt',p=>{//key: { phase, next: myNextPhase, name, side:mySide }
    console.log('inside TT')//each time one of belows happens up to TT_II, and while in black phase
    const { current, next, dieRoll } = p
    myTurn = myTurn ? false : true
    $('.activatingShow').removeClass('activatingShow').addClass('nonActivShow')
    $('.nonActivShow').removeClass('nonActivShow').addClass('activatingShow')
    //p1 && p2 starts black
    if(phase==='white'&&myNextPhase==='black'){console.log('TT_I')//into black phase
        phase='black'
        turn_resetter(opoSkillTrack,'black','blackTeam')
        turn_resetter(mySkillTrack,'black','whiteTeam')
    }
    if(phase==='white'&&myNextPhase==='white'){console.log('TT_II')//one white phase ends another begins
        turn_resetter(opoSkillTrack,'white','blackTeam')
        turn_resetter(mySkillTrack,'white','whiteTeam')
        myNextPhase='black'
    }
    if( 
        phase==='black' && 
        $('.activated.blackTeam[data-tenmodel]').length === $('.blackTeam[data-tenmodel]').length && 
        $('.activated.whiteTeam[data-tenmodel]').length === $('.whiteTeam[data-tenmodel]').length
    ){console.log('TT_III')
        myTurn = false
        let myBanners = removeAllBanners('whiteTeam')
        let opBanners = removeAllBanners('blackTeam')
        moveLadder($($('[data-tenmodel].whiteTeam')[0]), myBanners - opBanners)
        phase='end' 
        myNextPhase = 'white'
        GAME_SCENARIO.dieRoll = dieRoll
        const skor = calc_score()
        //see if i won:
        if ( am_I_winner() ){
            MY_SCORE += skor
        } else {
            OP_SCORE += skor
        }
        GAME_TURN++
        displayAnimatedNews(GAME_SCENARIO.turnEndMessage(dieRoll))
        if( GAME_SCENARIO.instaCall )
            GAME_SCENARIO.ruleset(0,0)
        //no need to pass anything through server at this point, each player can calculate independently the ammount of points 
        //they have and allocate score according to turn number (need to track it), thn still without server knowledge
        //apply scenario rules, this time with through server declaration, once that done, loosing player declares first
        //player once again through server.
        //here also is the place to check if there is a winner, once the godtears have been allocated.
        console.log('TURN END TURN END TURN END TURN END TURN END TURN END')
    }
    if( myTurn )
        displayAnimatedNews('Your<br/>turn')
    //need to add deifer and ultra resetter here
})
socket.on('camcel',p=>defy[p.m](p.c))
socket.on('epp',(o)=>{
    GAME_SCENARIO.ruleset(o)

})