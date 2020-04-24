let bob = false;
let zIndex = 1;

$((e) => {
  //  $('#gameScreen').empty().append(firstStitch());

    socket.emit('namePlace',{nickName:nickName, place:'lotlorien', roster:roster }  );

    $('.selection_section').each(
        function(){
            let daddy = $(this)
            $(this).on('click',e=>{
                e.preventDefault();
                make_selected_group_flashing(daddy)
            })
        }
    )
    $('#card').on('click','.champ_tab',e=>{
                e.preventDefault();
                e.stopPropagation();
                $('.champ_tab').parent('.card_skills').css('z-index', zIndex)
                $('.card_tab').toggleClass('tab_behind');
                if($('.champ_tab').hasClass('tab_behind'))$('.card_tab').toggleClass('tab_behind');
                zIndex++;
            });
    $('#card').on('click','.unit_tab',e=>{
                e.preventDefault();
                e.stopPropagation();
                $('.unit_tab').parent('.card_skills').css('z-index', zIndex)
                $('.card_tab').toggleClass('tab_behind');
                if($('.unit_tab').hasClass('tab_behind'))$('.card_tab').toggleClass('tab_behind');
                zIndex++;
            });
    $('.selection_heroImg').each(
        function(e){
            $(this).on('click',e=>{
                e.preventDefault()
                let chosen = $(this)
                if( chosen.hasClass('cardDisplayed') )chosen_move(chosen)
                else selection_animator({   champ:chosen  })
            })
        }
    )
    $('.chosen').children('.card_heroImg').each(
        function(){
            $(this).on('click',e=>{
                e.preventDefault();
                e.stopPropagation()
                if($(`[data-name="${$(this).data('name')}"]`).hasClass('greyedOut'))
                    $(`[data-name="${$(this).data('name')}"]`).removeClass('greyedOut').addClass('dechosen')
                $(this).animate( 
                    {opacity:.3}, 
                    420, 
                    ()=>{
                        $(this).removeAttr('style')
                        $(this).removeData()
                        $(this).removeAttr('data-name')
                    }
                )
            })
        }
    )
    $('#beginGameButton').on('click',(e)=>{
        nickName = $("#gamePlayerName").val();
        gamePlaceName = $("#gamePlaceName").val();
        let teamNames = $('#bandDisplay').find('.card_heroImg');
        roster = [];
        for(let k=0; k<3;k++){
             let el = teamNames[k];
             roster.push($(el).data('name'))
        }
        e.preventDefault();
        if( /^[0-9A-Za-z]+$/.test(nickName) && /^[0-9A-Za-z]+$/.test(gamePlaceName)   ){
            socket.emit('namePlace',{nickName:nickName, place:gamePlaceName, roster:roster }  );
        } else if(nickName === '' ){
            $("#wronCharWarning").text("missing nick name");
        } else if(gamePlaceName === ''){
            $("#wronCharWarning").text("missing place name");
        }else{
            $("#wronCharWarning").text("can't use special symbols");
        }
    })
    $('#introductory_insructions_info').on('click',e=>{
        e.preventDefault(); 
        $('#introductory_insructions_info')
            .removeClass('hinge-in-from-top mui-enter mui-enter-active')
            .addClass('hinge-out-from-top mui-leave mui-leave-active')
    })//
$($('#bandSelection').children('.selection_section')[0]).addClass('marked_group')
$('#card').append(roster_card(rosters.guardian[1]))
$('#selection_guardian').find('[data-name="Rhodri"]').addClass('cardDisplayed')
$('#selection_maelstrom').addClass('hinge-in-from-right mui-enter')
$('#selection_guardian').addClass('hinge-in-from-left mui-enter')
$('#selection_slayer').addClass('hinge-in-from-bottom mui-enter')
$('#selection_shaper').addClass('hinge-in-from-left mui-enter')


setTimeout(()=>{
    let o = 'mui-enter-active';
    $('.selection_section').addClass(o)
    $('#bandNamePlace').addClass(o)
},400)
setTimeout(()=>{
    let o = 'mui-enter-active';
    $('#selection_card').addClass(o)
},500)
setTimeout(()=>{
    let o = 'mui-enter-active';
    $('#introductory_insructions_info').addClass(o)
    $('#st_info').addClass('st_inf_ani')
    $('#nd_info').addClass('nd_inf_ani')
    $('#rd_info').addClass('rd_inf_ani')
},1050)

$('body').on('click','.puller',function(e){
    e.preventDefault();
    const data = $(this).parent('.miniGameCard').data()
    const selectedChar = rosters[ data.klass ][ data.index ][ data.type === 'champion' ? 'champ' : 'grunt' ]
    const selectedForm = data.side === 'left' ? leftCard : rightCard
    $(this).closest('#game_card')
        .removeClass(`hinge-in-from-${data.side} mui-enter mui-enter-active`)
        .addClass(`hinge-out-from-${data.side} mui-leave mui-leave-active`)
    setTimeout(()=>{
        $(this)
            .closest(`#game_card`)
            .empty()
            .append( selectedForm(selectedChar, data.phase, data.side) )
            .removeClass(`hinge-out-from-${data.side} mui-leave mui-leave-active`)
            .addClass(`hinge-in-from-${data.side} mui-enter mui-enter-active`)
    },750)
})
$('body').on('click','#game_card-big',function(e){
    e.preventDefault()
    const data = $(this).data()
    const selectedChar = rosters[ data.klass ][ data.index ][ data.type === 'champion' ? 'champ' : 'grunt' ]
    $(this).closest('#game_card')
        .removeClass(`hinge-in-from-${data.side} mui-enter mui-enter-active`)
        .addClass(`hinge-out-from-${data.side} mui-leave mui-leave-active`)
    setTimeout(()=>{
        $(this)
            .closest(`#game_card`)
            .empty()
            .append( miniCard(selectedChar,data.phase,data.side) )
            .removeClass(`hinge-out-from-${data.side} mui-leave mui-leave-active`)
            .addClass(`hinge-in-from-${data.side} mui-enter mui-enter-active`)
    }, 750)
})
$('body').on('click','.gameTip', function(e){
    e.preventDefault()
    $('.gameTip')
        .removeClass('hinge-in-from-top mui-enter mui-enter-active')
        .addClass('hinge-out-from-bottom mui-leave mui-leave-active')
    setTimeout(()=> $('.gameTip').remove(),750)
})
$('body').on('click','.hexagon[data-glow="yellowGlow"]', function(e){
    e.preventDefault()
    e.stopPropagation()
    if(myTurn && !MOVINGNOW)
        m.universal.walk(e,$(this))
})

$('body').on('click','#claimAction',function(e){
    if( phase==='white' && myTurn && check_actions_count() ){
        e.preventDefault()
        let claimsize = $('.selectedModel').data('name') === 'Mournblade' ? 3 : 1
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes({colour:'claimColor',dist:claimsize})
        socket.emit('HH', {color:'claimColor',dist:claimsize})
    }
})
$('body').on('click','.objectiveGlow[data-glow="claimColor"]', function(){
    if(phase==='white' && myTurn){
        m.universal.claim( $(this), 'whiteTeam' )
        const {hex, row} = $(this).data()
        socket.emit('stakeClaim',{hex: hex, row: row})
    }
})



//ON CLICKING EACH HEXAGON
$('body').on('click','.hexagon',function(e){
    e.preventDefault()
    const thiz = $( $(this).children('.smallCard')[0] )
    if( 
        $(this).children('.smallCard.whiteTeam').length && 
        myTurn && phase !== 'deployment' && 
        current_ability_method === null
    ){
        //add "selectedModel" class for easier model picking
        addSelectedColor(thiz)
        //add movement aura
        displayMovementAura(thiz)
    } else if (
        !$(this).children('.smallCard').length &&
        !$(this).attr('data-glow') && 
        !$(this).hasClass('objectiveGlow')
    ) {
        current_ability_method === null
        $('[data-glow]').removeAttr('data-glow')
    }

    //display appropriate card if needed
    if(phase!=='deployment')
        if   ( thiz.hasClass(opoSide) && checkCardContents(opoSide, thiz) ) animateCart(opoSide, thiz)
        else if( thiz.hasClass(mySide) && checkCardContents(mySide, thiz) ) animateCart(mySide, thiz)
})

for(let K in m){
    const character = m[K]
    for(let P in character){
        const PHASE_PLAY = character[P]
        for(let S in PHASE_PLAY){
            let SKILL = PHASE_PLAY[S]
            $('body').on('click',`[data-name="${SKILL.name}"]`,function(){
                const data = $(this).data()
                let modo = ['white','black'].includes(P) ? P === phase ? true : false : true
                    if(modo && myTurn && $(this).hasClass(mySide) ){
                        let glow = data.icon === "skull" ? 'redGlow' :
                                   data.icon === "cogs"  ? 'blueGlow' :
                                   data.icon === "self"  ? 'legendaryGlow' :
                                   data.icon === "star" ? 'greenGlow' : ''
                        $('[data-glow]').removeAttr('data-glow')
                        highlightHexes({colour:glow,dist:data.dist})
                        current_ability_method = _m[data.m]
                        if(data.dist)
                            socket.emit('HH', {color:glow,dist:data.dist})
                        else
                            current_ability_method($('.selectedModel'), $('.selectedModel').parent('.hexagon').data())
                    }
            })
        }
    }
}
$('body').on('click','[data-glow]', function (){
    const thiz_target = $(this).data()
    const thiz_origin = $('.selectedModel')
    if(current_ability_method && myTurn)
        current_ability_method(thiz_origin, thiz_target)
})

$('body').on('click','.multi_choice', function(){
    console.log( $(this).data() )//what are you for??
})
$('body').on('click','.boon-blight.crystalGlare',function(e){
    e.preventDefault()
    if( $(this).hasClass('blighted') ){
        $('.selected').removeClass('selected')
        $(this).addClass('selected') 
    } else $('.selected').removeClass('selected')//<----BUG??       <<--==
})
$('body').on('click','.boon-blight.crystalMirror',function(e){
    e.preventDefault()
    if( $(this).hasClass('booned') ){
        $('.selected').removeClass('selected')
        $(this).addClass('selected') 
    } else $('.selected').removeClass('selected')//<----BUG??       <<--==
})
$('body').on('click','.boon-blight.confirm.nia', function(e){
    e.preventDefault()
    if( $(this).hasClass('cancel') ) 
        $('.niaChallenge').remove()
    else {
        const { hex, row } = $(this).parent().data()
        const bbname = $('.boon-blight.selected').data('abil')
        const specimen = extractBoons_Blights( $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0]) )
        crystalGlare_bb = { [bbname]: specimen[bbname], curseType:bbname, origin:{ hex, row } }
        $('.niaChallenge').remove()
    }
})

$('body').on('click','.boon-blight.runeweaving2',function(e){
    e.preventDefault()
    if( $(this).hasClass('booned') ){
        $('.selected').removeClass('selected')
        $(this).addClass('selected') 
    } else $('.selected').removeClass('selected')//<----BUG??       <<--==
})


$('body').on('click','.boon-blight.blighted.deadlyCurse',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
})
$('body').on('click','.boon-blight.confirm.deadlyCurse', function(e){
    e.preventDefault()
    const { side, name } = $(this).parent().data()
    const bbname = $('.boon-blight.selected').data('abil')
    crystalGlare_bb = { side, name, curseType:bbname }
    socket.emit('rolloSkill',{ socksMethod:"deadlyCurse2", cursePackage:crystalGlare_bb })
    $('.deadlyCursePanel').remove()
})

$('body').on('click','.boon-blight.blighted.graspingCurse',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
})
$('body').on('click','.boon-blight.confirm.graspingCurse', function(e){
    e.preventDefault()
    const { side, name, socksmethod } = $(this).parent().data()
    const bbname = $('.boon-blight.selected').data('abil')
    crystalGlare_bb = { side, name, curseType:bbname }
    socket.emit('rolloSkill',{ socksMethod:'deadlyCurse2', cursePackage:crystalGlare_bb })
    $('.deadlyCursePanel').remove()
})

$('body').on('click','.boon-blight.challengeTitus',function(e){
    e.preventDefault()
    const numberOfChoices = Number($(this).parent('.titusChallengeCrest').data('cursecount') ) 
    const socksmethod = $(this).parent('.titusChallengeCrest').data('socksmethod')
    if( 
        (!$(this).hasClass('blighted') && socksmethod !== 'attuneMagic' ) || 
        (socksmethod === 'attuneMagic' && !$(this).hasClass('booned') ) 
    )
        if($('.selected').length < numberOfChoices)
            $(this).toggleClass('selected') 
        else $(this).removeClass('selected')
})
$('body').on('click','.boon-blight.confirm.titus', function(e){
    e.preventDefault()
    const { socksmethod, hex, row, cursecount } = $(this).parent().data()
    const cursePackage = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
    socket.emit('rolloSkill',{ aim: 0, hurt: 0, socksMethod:socksmethod, hex, row, cursePackage })
    $('.titusChallenge').remove()
})
$('body').on('click','.boon-blight.theGreatTusk.confirm', function(e){
    e.preventDefault()
    const { hex, row } = $(this).parent().data()
    const cursePackage = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
    socket.emit('rolloSkill',{ aim: 0, hurt: 0, socksMethod:"theGreatTusk", hex, row, cursePackage })
    $('.titusChallenge').remove()
})
$('body').on('click','[data-glow].hexagon',function(e){
    e.preventDefault()
    const thiz = $(this)
    const { hex, row } = thiz.data()
    if(myTurn){
        extraMover('illKillYouAll',thiz)
        extraMover('outflank',thiz)
        if( $('.tongueTow_selected').length && thiz.hasClass('objectiveGlow'))extraMover('tongueTow',thiz)
        if( $('.tongueLash_selected').length )extraMover('tongueLash',thiz)
        if( $('.marchRhodriBlack_selected').length )extraMover('marchRhodriBlack',thiz)
        if( $('.marchRhodriWhite_selected').length )extraMover('marchRhodriWhite',thiz)
        if( $('.marchNia_selected').length )extraMover('marchNia',thiz)
        if( $('.shieldBash_selected').length )extraMover('shieldBash',thiz)
        if( $('[data-glow^="strait"]').length && onlyOneStep(thiz) )extraMover('roll',thiz)
        if( $('.marchGuardBlack').length )extraMover('marchGuardBlack',thiz)
        if( $('.marchGuardWhite').length )extraMover('marchGuardWhite',thiz)
        //if( $('.marchGuardWhite').length )extraMover('marchGuardWhite',thiz)
        if( $('.deathWind_selected').length && thiz.hasClass('objectiveGlow') )extraMover('deathWind',thiz)
        else if ( $('.deathWind_selected').length )displayAnimatedNews('must be placed<br/>on objective')
        if( $('.mournblade_raisins').length )
            socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"raiseDeadChamps", hex, row })
        if( $('.forwardMinions_selected').length && onlyOneStep(thiz,$('.forwardMinions_selected')) )
            extraMover('forwardMinions',thiz)
        if( $('.wheresMaster_selected').length && onlyOneStep(thiz,$('.wheresMaster_selected')) )
            extraMover('wheresMaster',thiz)
        if( $('.shadowWard_selected').length )extraMover('shadowWard',thiz)
        if( $('.phantomBanners_selected').length && thiz.hasClass('objectiveGlow') )
            extraMover('phantomBanners',thiz)
        if( $('.headbutt_selected').length )extraMover('headbutt',thiz)
        if( $('.marchlungingStrikeMove_selected').length )extraMover('marchlungingStrikeMove',thiz)
        if( $('.marchjet_selected').length && onlyOneStep(thiz,$('.marchjet_selected')) )extraMover('marchjet',thiz)
        if( $('.current_selected').length )extraMover('current',thiz)
        if( $('.tide_selected').length )extraMover('tide',thiz)
        if( $('.avalanche_selected').length )moveContentsOfHex('avalanche3',thiz)
        if( $('.earthquake_selected').length && onlyOneStep(thiz,$('.earthquake_selected')))extraMover('earthquake',thiz)
        if( $('[data-glow="shootAndScoot"]').length )extraMover('shootAndScoot',thiz)
    }
})
$('body').on('click','.avalanche_moveable',function(e){
    console.log('step3')
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"avalanche2", hex, row})

})
$('body').on('click','.illKillYouAll',function(e){
    e.preventDefault()
    if(myTurn){
        $('.illKillYouAll_selected').removeClass('illKillYouAll_selected')
        $(this).addClass('illKillYouAll_selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
    }
})
$('body').on('click','.outflank',function(e){
    e.preventDefault()
    if(myTurn){
        $('.outflank_selected').removeClass('outflank_selected')
        $(this).addClass('outflank_selected')
    }
})
$('body').on('click','.marchGuardBlack',function(e){
    e.preventDefault()
    if(myTurn){
        $('.selectedModel').removeClass('selectedModel')
        $('.marchGuardBlack_selected').removeClass('marchGuardBlack_selected')
        $(this).addClass('marchGuardBlack_selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
    }
})
$('body').on('click','.marchGuardWhite',function(e){
    e.preventDefault()
    if(myTurn){
        $('.selectedModel').removeClass('selectedModel')
        $('.marchGuardWhite_selected').removeClass('marchGuardWhite_selected')
        $(this).addClass('marchGuardWhite_selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
    }
})
$('body').on('click','.forwardMinions',function(e){
    e.preventDefault()
    const thiz = $(this)
    if(myTurn){
        $('.forwardMinions_selected').removeClass('forwardMinions_selected')
        thiz.addClass('forwardMinions_selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'legendaryGlow', dist:2},$(this))
    }
})
$('body').on('click','.earthquake_moveable',function(e){
    e.preventDefault()
    const thiz = $(this)
    if(myTurn){
        $('.earthquake_selected').removeClass('earthquake_selected')
        thiz.addClass('earthquake_selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'legendaryGlow', dist:2},$(this))
    }
})
$('body').on('click','#rallyAction',function(e){
    e.preventDefault()
    if(myTurn)
    rallyActionDeclaration( $(this).data() )
})
$('body').on('click','[data-glow="recruitGlow"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
    socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"raiseDead", hex, row})
})
$('body').on('click','[data-glow="newSpewWhite"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"raiseNewSpew", hex, row, multiAction:mySide})
})
$('body').on('click','[data-glow="graspingDead"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"raiseGraspingDead", hex, row, multiAction:mySide})
})
$('body').on('click','.tsunami-moveable',function(e){
    const { hex, row } = $(this).parent('.hexagon').data()
    socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"tsunamiMoveDeclaration", hex, row})
})
$('body').on('click','.current',function(e){
    e.preventDefault()
    if(myTurn){
        $('.selectedModel').removeClass('selectedModel')
        $('.current_selected').removeClass('current_selected')
        $(this).addClass('current_selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'blueGlow', dist:3},$(this))
    }
})
$('body').on('click','.fire[data-socksmethod="callTotems"]',function(e){
    e.preventDefault()
    e.stopPropagation()
    if( myTurn && graveyard[mySide].Hexlings.length > 1 )
        socket.emit('rolloSkill',{socksMethod:'callTotems1'})
    else {
        socket.emit('rolloSkill',{socksMethod:'callTotems1'})
        if_moved_end_it()
        current_ability_method = null
        add_action_taken()
        $('#multi_choice_info_panel').remove()
    }
})





// $('body').on('click','.hexagon',function(e){
//     e.preventDefault()
//     const epicenter = $($('.hex_5_in_row_7').children('.top')[0])
//     epicenter.parent('.hexagon').addClass('objectiveGlow obj1')
//     highlightHexes({colour:'deathMove',dist:1},epicenter)
//     highlight_closest_path(epicenter.parent('.hexagon').data(),$(this).data())
//     console.log(tellMeDistance(epicenter.parent('.hexagon').data(),$(this).data()))
// })











})//DOM