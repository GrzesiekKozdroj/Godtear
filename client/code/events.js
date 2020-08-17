let bob = false;
let zIndex = 1;

$((e) => {
    $('body').append(`<img id="map_place" src="../img/place${Math.floor(Math.random()*8)}.jpg" />`)
    $('#gameScreen').empty().append(firstStitch());
    //socket.emit('namePlace',{nickName:nickName, place:'lotlorien', roster:roster }  );
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
        if( 
            /^[0-9A-Za-z]+$/.test(nickName) && 
            /^[0-9A-Za-z]+$/.test(gamePlaceName) && 
            nickName.length < 15 && gamePlaceName.length < 15 && 
            $('#checkbox').prop('checked') &&
            $('.ch_rd').children('.card_heroImg').attr('style') &&
            $('.ch_nd').children('.card_heroImg').attr('style') &&
            $('.ch_st').children('.card_heroImg').attr('style') 
        ){
            socket.emit('namePlace',{nickName:nickName, place:gamePlaceName, roster:roster }  );
        } else if(nickName === '' ){
            $("#wronCharWarning").text("missing nick name");
        } else if(gamePlaceName === ''){
            $("#wronCharWarning").text("missing place name");
        }else if ( nickName.length > 14 || gamePlaceName.length > 14 ){
            $("#wronCharWarning").text("can't be longer than 14 characters");
        }else if ( !$('#checkbox').prop('checked') ){
            $("#wronCharWarning").text("agree to terms & conditions");
        }else if (
            !/^[0-9A-Za-z]+$/.test(nickName) || 
            !/^[0-9A-Za-z]+$/.test(gamePlaceName)
        ){
            $("#wronCharWarning").text("can't use special symbols");
        } else if(
            !$('.ch_rd').children('.card_heroImg').attr('style') ||
            !$('.ch_nd').children('.card_heroImg').attr('style') ||
            !$('.ch_st').children('.card_heroImg').attr('style') 
        ){
            $("#wronCharWarning").text("complete your warband");
        }else{
            $("#wronCharWarning").text("unforeseen error");
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
$('body').on('click','#TaT',function(e){
    e.preventDefault()
    displatyTT()
})
$('body').on('click','#closeTT',function(e){
    e.preventDefault()
    setTimeout(()=>$("#rolledOutTT").remove(),250)
})
$('body').on('click','#game_card-big',function(e){
    e.preventDefault()
    const data = $(this).data()
    //below is no good, it needs to start extracting attribue(data) from board and return it in form of object
    const h = rosters[ data.klass ][ data.index ][ data.type === 'champion' ? 'champ' : 'grunt' ]
    const l = $($(`[data-tenmodel][data-name="${data.name}"].${data.side}`)[0])
    const selectedChar = {
            klass: h.klass,
            type: l.attr('data-type') || h.type,
            name: l.attr('data-name') || h.name,
            unitSize: l.attr('data-unitsize') || h.unitSize,
            icon: l.attr('data-icon') || h.icon,
            speed: l.attr('data-speed') || h.speed,
            dodge: l.attr('data-dodge') || h.dodge,
            protection: l.attr('data-protection') || h.protection,
            health: l.attr('data-health') || h.health,
            healthleft: l.attr('data-healthleft') || h.healthLeft,
            skills: l.attr('data-skills') || h.skills,
            banner: l.attr('data-banner') || h.banner,
            index: h.index || h.index,
            unitName: l.attr('data-unitname') || h.unitName
    }
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
$('body').on('click','[data-glow="landSlideGlow"]',function(e){
    e.preventDefault()
    const { hex, row } = $(this).data()
    if ( myTurn )
        socket.emit( "rolloSkill", { hex, row, socksMethod:"landSlideGlow1" })
})

$('body').on('click','#claimAction',function(e){
    if( phase==='white' && myTurn ){
        if_moved_end_it()
        if( check_actions_count("claimed",mySide) ){
            e.preventDefault()
            let claimsize = $('.selectedModel').data('name') === 'Mournblade' ? 3 : 1
            un_glow()
            cancellerName = 'bannerClaim'
            highlightHexes({colour:'claimColor',dist:claimsize})
            socket.emit('HH', {color:'claimColor',dist:claimsize})
        }
    }
})
$('body').on('click','.objectiveGlow[data-glow="claimColor"].hexagon', function(e){
    e.preventDefault()
    if(phase==='white' && myTurn){
        m.universal.claim( $(this), 'whiteTeam' )
        const {hex, row} = $(this).data()
        socket.emit('stakeClaim',{ hex: hex, row: row })
    }
})
$("body").on('mouseenter', '.wh', function(e){
    e.preventDefault()
    const { line, col } = $(this).data()
    $('.wp_hihg').removeClass('wp_hihg')
    $(`[data-line="${line}"]`).addClass('wp_hihg')
    $(`[data-col="${col}"]`).addClass('wp_hihg')
})



//ON CLICKING EACH HEXAGON
$('body').on('click','.hexagon:not([data-glow="callTotems"])',function(e){
    e.preventDefault()
    const S_Stabber = $( $(this).children('.smallCard[data-tenmodel^="SneakyStabbers"].whiteTeam')[0] )
    const Y_Dragon = $( $(this).children('.smallCard[data-tenmodel^="YoungDragons"].whiteTeam')[0] )
    const normal_model = $( $(this).children('.smallCard')[0] )
    const thiz = S_Stabber.length ? S_Stabber : Y_Dragon.length ? Y_Dragon: normal_model
    if (phase === 'end' && !am_I_winner() ){
        const { hex, row } = $(this).data()
        socket.emit('epp', { hex, row })
    } else if ( 
        $(this).children('.smallCard.whiteTeam').length && 
        myTurn && phase !== 'deployment' && 
        current_ability_method === null
    ){
        //add "selectedModel" class for easier model picking
        addSelectedColor(thiz)
        //add movement aura
        displayMovementAura(thiz)
        //ladnslide case
        land_sliding( $(this) )
    } else if (
        !$(this).children('.smallCard').length &&
        !$(this).attr('data-glow') && 
        !$(this).hasClass('objectiveGlow')
    ) {
        const cancelMove = ()=>{
            if( $(`[data-glow="yellowGlow"]`).length )
            $(`[data-glow="yellowGlow"]`).removeAttr(`data-glow`)
        }
        cancellerName ? socket.emit('camcel',{m:cancellerName,c:false}) : cancelMove()
        $('.rapidDeployment_selected').removeClass('rapidDeployment_selected')
      //  current_ability_method = null
      //  un_glow()
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
            $('body').on('click',`[data-m="${SKILL.m}"]`,function(){
                if( typeof canceller === 'function') canceller(true)//untestedo HERE
                const data = $(this).data()
                let modo = ['white','black'].includes(P) ? P === phase ? true : false : true
                if_moved_end_it()
                if(loop_tituulti()===3&&titustepper[$('.selectedModel').data('side')]){
                    const { hex, row } = $('.selectedModel').parent('.hexagon').data()
                    socket.emit('rolloSkill', { hex, row, socksMethod:"titusStep_m" })
                } else if(modo && myTurn && $(this).hasClass(mySide) && (check_actions_count(S,mySide) || SKILL.zero )){
                        $(this).children('#smallCardParagraph').addClass('skilling_declaration')
                        let glow = data.icon === "skull" ? 'redGlow' :
                                   data.icon === "cogs"  ? 'blueGlow' :
                                   data.icon === "self"  ? 'legendaryGlow' :
                                   data.icon === "star" ? 'greenGlow' : ''
                        un_glow()
                        highlightHexes({colour:glow,dist:data.dist})
                        current_ability_method = _m[data.m]
                        canceller = defy[SKILL.m] ? defy[SKILL.m] : ()=>{return 0}
                        cancellerName = SKILL.m
                        if(data.dist && !data.itskeera)
                            socket.emit('HH', {color:glow,dist:data.dist,m:SKILL.preface})//r way also pre init function
                        else//for things like initiating message to other player, highlighting uttons active, pre setting skills
                            current_ability_method($('.selectedModel'), $('.selectedModel').parent('.hexagon').data())
                    }
            })
        }
    }
}
$('body').on('click','[data-glow].hexagon', function (e){
    e.preventDefault()
    const thiz_target = $(this).data()
    const thiz_origin = $('.selectedModel')
    if(typeof current_ability_method === "function" && myTurn && TMER && !$(this).children('.death').length ){
        TMER = false
        setTimeout(()=>TMER = true, 800)
        current_ability_method(thiz_origin, thiz_target)
    }
})
$('body').on('click','.brutalMaster.damage',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
})
$('body').on('click','.brutalMaster.aim',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
})
$('body').on('click','.brutalMaster.confirm',function(e){
    e.preventDefault()
        const { hex, row, socksmethod } = $(this).parent().data()
        const ch = $('.boon-blight.selected')
        const key = ch.data('abil')
        if(ch.length){
            socket.emit('rolloSkill',{ socksMethod:socksmethod, key, hex, row })
            $('.brutalMasterPanel').remove()
        }

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

$('body').on('click','.boon-blight.hexEaters:not(".confirm")',function(e){
    e.preventDefault()
    if( !$(this).hasClass('booned') ){
        $('.selected').removeClass('selected')
        $(this).addClass('selected')
    }
})
$('body').on('click','.boon-blight.confirm.hexEaters', function(e){
    e.preventDefault()
    const { side } = $(this).parent().data()
    const bbname = $('.boon-blight.selected').data('abil')
    crystalGlare_bb = { side, curseType:bbname }
    socket.emit('rolloSkill',{ socksMethod:"hexEaters", cursePackage:crystalGlare_bb })
    $('.deadlyCursePanel').remove()
})

$('body').on('click','.boon-blight.rTB_End:not(".confirm")',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
})
$('body').on('click','.boon-blight.confirm.rTB_End', function(e){
    e.preventDefault()
    const { hex, row } = $(this).parent().data()
    const bbname = $('.boon-blight.selected').data('abil')
    crystalGlare_bb = { hex, row, curseType:bbname }
    socket.emit('rolloSkill',{ socksMethod:"rollTheBones__End", cursePackage:crystalGlare_bb })
    $('.titusChallenge').remove()
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

$('body').on('click','.boon-blight.booned.soCoolMistress',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    $(this).addClass('selected')
})
$('body').on('click','.boon-blight.confirm.soCoolMistress', function(e){
    e.preventDefault()
    const { side, name, socksmethod } = $(this).parent().data()
    const bbname = $('.boon-blight.selected').data('abil')
    crystalGlare_bb = { side, name, curseType:bbname }
    socket.emit('rolloSkill',{ socksMethod:'soCoolMistress', cursePackage:crystalGlare_bb })
    $('.soCoolMistressPanel').remove()
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

$('body').on('click','.boon-blight.showLikeWater:not(".confirm")',function(e){
    e.preventDefault()
    if( !$(this).hasClass('blighted') && !$(this).hasClass('nooner') ){
            $('.selected').removeClass('selected')
            $(this).addClass('selected') 
        }
})
$('body').on('click','.boon-blight.confirm.showLikeWater', function(e){
    e.preventDefault()
    const { socksmethod } = $(this).parent().data()
    const cursePackage = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
    socket.emit('rolloSkill',{ socksMethod:socksmethod, cursePackage })
    $('.showLikeWaterC').remove()
})

$('body').on('click','.boon-blight.ripplingChoices:not(".confirm")',function(e){
    e.preventDefault()
    if( !$(this).hasClass('booned') ){
            $('.selected').removeClass('selected')
            $(this).addClass('selected') 
        }
})
$('body').on('click','.boon-blight.confirm.ripplingChoices', function(e){
    e.preventDefault()
    if( !$(this).hasClass('cancel') ){
        const { socksmethod, sajd } = $(this).parent().data()
        cursePackage = {}
        cursePackage.pack = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
        cursePackage.side = sajd
        socket.emit('rolloSkill',{ socksMethod:socksmethod, cursePackage })
    }
    $('.ripplingChoicesC').remove()
})

$('body').on('click','.boon-blight.stolenTreasure:not(".confirm")',function(e){
    e.preventDefault()
    $('.selected').removeClass('selected')
    if( !$(this).hasClass('booned') )
            $(this).addClass('selected') 
})
$('body').on('click','.boon-blight.confirm.stolenTreasure', function(e){
    e.preventDefault()
    const { socksmethod, hex, row, cursecount } = $(this).parent().data()
    const cursePackage = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
    let pack = { socksMethod:socksmethod, hex, row, cursePackage }
    socket.emit('rolloSkill', pack)
    $('.titusChallenge').remove()
})

$('body').on('click','.boon-blight.theGreatTusk.confirm', function(e){
    e.preventDefault()
    const { hex, row } = $(this).parent().data()
    const cursePackage = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
    socket.emit('rolloSkill',{ aim: 0, hurt: 0, socksMethod:"theGreatTusk", hex, row, cursePackage })
    $('.titusChallenge').remove()
})
$('body').on('click','.rollingStones',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).parent('.hexagon').data()
    socket.emit('rolloSkill', { socksMethod:'rollingStones_', hex, row })
})
$('body').on('click','[data-glow].hexagon',function(e){
    e.preventDefault()
    const thiz = $(this)
    const { hex, row } = thiz.data()
    if(myTurn){
        if( $('.mournblade_raisins').length )
            socket.emit('rolloSkill',{ socksMethod:"raiseDeadChamps", hex, row })
        if( $('[data-glow="answerTheCall"]').length )
            socket.emit('rolloSkill',{ socksMethod:"raiseDead", hex, row, key:"answerTheCall"})

        if( $('.tongueTow_selected').length )
            extraMover('tongueTow',thiz,'bannerWalk')
        if( $('.deathWind_selected').length )
            extraMover('deathWind',thiz,'bannerWalk')
        if( $('.phantomBanners_selected').length )
            extraMover('phantomBanners',thiz,'bannerWalk')

        if( $('.avalanche_selected').length )moveContentsOfHex('avalanche3',thiz)

        if( $('.illKillYouAll_selected').length )extraMover('illKillYouAll',thiz,'push')
        if( $('.outflank_selected').length )extraMover('outflank',thiz,'walk')
        if( $('.roarOfBattle_selected').length )extraMover('roarOfBattle',thiz,'walk')
        if( $('.tongueLash_selected').length )extraMover('tongueLash',thiz,'push')
        if( $('.marchRhodriBlack_selected').length )extraMover('marchRhodriBlack',thiz,'walk')
        if( $('.marchRhodriWhite_selected').length )extraMover('marchRhodriWhite',thiz,'walk')
        if( $('.marchNia_selected').length )extraMover('marchNia',thiz,'walk')
        if( $('.shieldBash_selected').length )extraMover('shieldBash',thiz,'push',['onlyOneStep'])
        if( $('.roll').length)extraMover('roll',thiz,'walk',['onlyOneStep'])
        if( $('.rollingStones').length)extraMover('rollingStones',thiz,'walk',['onlyOneStep'])
        if( $('.marchGuardBlack').length )extraMover('marchGuardBlack',thiz,'walk')
        if( $('.marchGuardWhite').length )extraMover('marchGuardWhite',thiz,'walk')
        if( $('.forwardMinions_selected').length )extraMover('forwardMinions',thiz,'walk',['onlyOneStep'])
        if( $('.forwardMinionsMorrigan_selected').length ) extraMover('forwardMinionsMorrigan',thiz,'walk',['onlyOneStep'])
        if( $('.wheresMaster_selected').length )extraMover('wheresMaster',thiz,'walk',['onlyOneStep'])
        if( $('.shadowWard_selected').length )extraMover('shadowWard',thiz,'push')
        if( $('.headbutt_selected').length )extraMover('headbutt',thiz,'push')
        if( $('.marchlungingStrikeMove_selected').length )extraMover('marchlungingStrikeMove',thiz,'walk')
        if( $('.marchjet_selected').length )extraMover('marchjet',thiz,'walk',['onlyOneStep'])
        if( $('.current_selected').length )extraMover('current',thiz,'walk')
        if( $('.tide_selected').length )extraMover('tide',thiz,'push')
        if( $('.earthquake_selected').length )extraMover('earthquake',thiz,'push',['onlyOneStep'])
        if( $('[data-glow="shootAndScoot"]').length )extraMover('shootAndScoot',thiz,'walk')
        if( $('.annoyed_selected').length )extraMover('annoyed',thiz,'push',['onlyOneStep'])
        if( $('.sprint_selected').length )extraMover('sprint',thiz,'walk',['onlyOneStep'])
        if( $('.brokenJaw_selected').length )extraMover('brokenJaw',thiz,'push')
        if( $('.whiplash_selected').length )extraMover('whiplash',thiz,'push')
        if( $('.frostyGlance_selected').length )extraMover('frostyGlance',thiz,'walk')
        if( $('.twoPunch_selected').length )extraMover('twoPunch',thiz,'walk')
        if( $('.shadowStepWhite_selected').length )extraMover('shadowStepWhite',thiz,'walk')
        if( $('.rush_selected').length )extraMover('rush',thiz,'walk',['onlyOneStep'])
        if( $('.rapidDeployment_selected').length )extraMover('rapidDeployment',thiz,'walk',['onlyOneStep'])
        if( $('.pathof_selected').length )extraMover('pathof',thiz,'walk')
        if( $('.marchjet_selected').length )extraMover('jet',thiz,'walk',['onlyOneStep'])
        if( $('.beastlyCharge_selected').length && !thiz.children('.smallCard').length )
            extraMover('beastlyCharge',thiz,'walk',['onlyOneStep'])
        if( $('.leap_selected').length )extraMover('leap',thiz,'walk')
        if( $('.summonsWalk_selected').length )extraMover('summonsWalk',thiz,'walk',['onlyOneStep'])
        if( $('.deathMove_selected').length )extraMover('deathMove',thiz,'push',['onlyOneStep'])
    }
})
$('body').on('click','.avalanche_moveable',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"avalanche2", hex, row})

})
$('body').on('click','.shadowStepWhite',function(e){
    e.preventDefault()
    if(myTurn){
        $('.shadowStepWhite_selected').removeClass('shadowStepWhite_selected')
        $(this).addClass('shadowStepWhite_selected')
        $(`[data-glow]`).removeAttr('data-glow')
        highlightHexes({colour:'legendaryGlow',dist:1},$(this))
        socket.emit('HH',{colour:'legendaryGlow',dist:1})
    }
})
$('body').on('click','.illKillYouAll',function(e){
    e.preventDefault()
    if(myTurn && !$(this).parent('.hexagon').attr('data-glow') ){
        $('.illKillYouAll_selected').removeClass('illKillYouAll_selected')
        $(this).addClass('illKillYouAll_selected')
        un_glow()
        highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
    }
})
$('body').on('click','.summonsWalk',function(e){
    e.preventDefault()
    const { hex, row } = $(this).parent('.hexagon').data()
    socket.emit('rolloSkill', { socksMethod: 'summonsWalk', hex, row })
})
$('body').on('click','.outflank',function(e){
    e.preventDefault()
    if(myTurn){
        setTimeout(()=>highlightHexes({colour:'blueGlow', dist:1}, $('.outflank_source')),360)
        $('.outflank_selected').removeClass('outflank_selected')
        $(this).addClass('outflank_selected')
    }
})
$('body').on('click','.marchGuardBlack',function(e){
    e.preventDefault()
    if(myTurn){
       // $('.selectedModel').removeClass('selectedModel')
        $('.marchGuardBlack_selected').removeClass('marchGuardBlack_selected marchGuardBlack')
        $(this).addClass('marchGuardBlack_selected')
        un_glow()
        highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
    }
})
$('body').on('click','.rush[data-tenmodel]',function(e){
    e.preventDefault()
    e.stopPropagation()
    if(myTurn){
        $(`[data-glow]`).removeAttr('data-glow')
        $('.rush_selected[data-tenmodel]').removeClass('rush rush_selected')
        $(this).addClass('rush_selected')
        highlightHexes({colour:'legendaryGlow',dist:2},$(this))
    }
})
$('body').on('click','.marchGuardWhite',function(e){
    e.preventDefault()
    if(myTurn){
      //  $('.selectedModel').removeClass('selectedModel')
        $('.marchGuardWhite_selected').removeClass('marchGuardWhite_selected marchGuardWhite')
        $(this).addClass('marchGuardWhite_selected')
        un_glow()
        highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
    }
})
$('body').on('click','.forwardMinions',function(e){
    e.preventDefault()
    const thiz = $(this)
    if(myTurn){
        $('.forwardMinions_selected').removeClass('forwardMinions_selected')
        thiz.addClass('forwardMinions_selected')//.removeClass('forwardMinions')
        un_glow()
        highlightHexes ({colour:'legendaryGlow', dist:2},$(this))
    }
})
$('body').on('click','.forwardMinionsMorrigan',function(e){
    e.preventDefault()
    const thiz = $(this)
    if(myTurn){
        $('.forwardMinionsMorrigan_selected').removeClass('forwardMinionsMorrigan_selected')
        thiz.addClass('forwardMinionsMorrigan_selected')//.removeClass('forwardMinionsMorrigan')
        un_glow()
        highlightHexes ({colour:'legendaryGlow', dist:2},$(this))
    }
})
$('body').on('click','.earthquake_moveable',function(e){
    e.preventDefault()
    const thiz = $(this)
    if(myTurn && !thiz.hasClass('earthquake_selected') ){
        $('.earthquake_selected').removeClass('earthquake_selected earthquake_moveable')
        thiz.addClass('earthquake_selected')
        un_glow()
        highlightHexes ({colour:'legendaryGlow', dist:2}, thiz )
    }
})
$('body').on('click','#rallyAction',function(e){
    e.preventDefault()
    const th = $(this)
    const { side, name } = th.data()
    const brothers = $(`[data-tenmodel^="${name}"][data-side="${side}"]`)
    const actionzKount = () => {
        if( brothers.length )
            return check_actions_count('rallied', name)
        else {
            const aktkount = Number(  $(graveyard[side][name][0]).attr('data-actionstaken')  ) < 2
            const trakSkill = side === mySide ? mySkillTrack : opoSkillTrack
            const trakoutk = !trakSkill[name][phase].rallied.used
            return (aktkount && trakoutk)
        }
    }
    if( myTurn && th.data('side') === mySide && actionzKount() ){
        un_glow()
        highlightHexes({colour:'recruitGlow',dist:1},$(`[data-tenmodel^=${th.data('unitname')}][data-side=${th.data('side')}]`))
        rallyActionDeclaration( th.data() )
    }
}) 
$('body').on('click','.champion.rally',function(e){
    e.preventDefault()
    if( myTurn && $('.selectedModel').hasClass(mySide) )
        socket.emit('rolloSkill', { socksMethod:'raiseDedChamp' })
})
$('body').on('click','[data-glow="recruitGlow"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
        socket.emit('rolloSkill',{ socksMethod:"raiseDead", hex, row })
})
$('body').on('click',`[data-glow^="rockFormation"].hexagon`,function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if ( $(this).attr('data-glow').includes(mySide))
        socket.emit('rolloSkill',{socksMethod:"raiseDead", hex, row})
})
$('body').on('click','[data-glow="callTotems"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
    socket.emit('rolloSkill',{ socksMethod:"raiseDead", hex, row, key:'callTotems'})
})
$('body').on('click','[data-glow="inductGlow"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
        socket.emit('rolloSkill',{ socksMethod:"raiseDead", hex, row, key:'induct'})
})
$('body').on('click','[data-glow="sneak"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const { hex, row } = $(this).data()
    if(myTurn)
        socket.emit('rolloSkill',{ socksMethod:"raiseDead", hex, row, key:'sneak'})
})
$('body').on('click','[data-glow^="newSpew"].hexagon',function(e){
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
$('body').on('click','.smallCard.speed',function(e){
    e.preventDefault()
    if( Number($(this).children('.blighted.gameCard_num').text()) <= 0 && myTurn && $(this).parent('.list').hasClass(mySide) ){
        const dad =  $(this).parent('.list').parent('.miniGameCard')
        const boi = $($(`[data-tenmodel][data-name="${dad.data('name')}"][data-side="${dad.data('side')}"]`)[0])
        const { hex, row } = boi.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"burnWalk", hex, row })
    }
})
$('body').on('click','.tsunami-moveable',function(e){
    const { hex, row } = $(this).parent('.hexagon').data()
    socket.emit('rolloSkill',{ socksMethod:"tsunamiMoveDeclaration", hex, row})
})
$('body').on('click','.current',function(e){
    e.preventDefault()
    if(myTurn){
        $('.selectedModel').removeClass('selectedModel')
        $('.current_selected').removeClass('current_selected current selectedModel')
        $(this).addClass('current_selected selectedModel')
        un_glow()
        highlightHexes ({colour:'blueGlow', dist:3},$(this))
    }
})
$('body').on('click','.fire[data-socksmethod="callTotems"]',function(e){
    e.preventDefault()
    e.stopPropagation()
  //  socket.emit('rolloSkill',{socksMethod:'callTotems1'})
    add_action_taken('callTotems')//added
    current_ability_method = null
    if( myTurn && graveyard[mySide].Hexlings.length > 1 )
            callTotems1()
    else 
        $('#multi_choice_info_panel').remove()
})
$('body').on('click','.royalSumms',function(e){
    e.preventDefault()
    const thiz = $(this)
    if( thiz.hasClass('walkDragon') ){
        socket.emit('rolloSkill',{ socksMethod:'walk_drakes_' })
    } else if ( thiz.hasClass('recruitDragon') ){
        add_action_taken('royalSummons'+phaser())
        socket.emit('rolloSkill',{ socksMethod:'rally_drakes_' })
        current_ability_method = null
    }
    $('.soCoolMistressPanel').remove()
})
$('body').on('click','.deathMove',function(e){
    e.preventDefault()
    const { hex, row } = $(this).parent('.hexagon').data()
    if( myTurn )
        socket.emit('rolloSkill', {socksMethod:'deathMove', hex, row })
})
$(`body`).on('click',`.endTask`,function(e){
    e.preventDefault()
    e.stopPropagation()
    if( $(this).hasClass(`${mySide}`) && myTurn && !$(this).hasClass('activated' && TMER)){
        TMER = false
        setTimeout(()=>TMER = true, 1000)
        const { name } = $($(this).parents(`[data-klass][data-name][data-type]`)[0]).data()
        socket.emit('rolloSkill',{    socksMethod:'phaseEnd',aim: 4, key: { phase,  next: myNextPhase, name, side:mySide }   })
    }
})

$('body').on('click','.chnt',function(e){
    e.preventDefault()
    if ( $(this).hasClass('ch1nt') )
        socket.emit('rolloSkill',{ socksMethod:'dwhnt', key:mySide })
    else if ( $(this).hasClass('ch2nt') )
        socket.emit('rolloSkill', { socksMethod:'dwhnt', key:opoSide })
    $('.soCoolMistressPanel').remove()
})
$('body').on('click','#ladder',function(e){
    if( $('.sms_message').length )
        if( !$('.show_sms').length ){
            $('.sms_message').removeClass('hide_sms fade_sms').addClass('show_sms')
            $('#sms').addClass('hidta').removeClass('showta')
        } else {
            $('.sms_message').removeClass('show_sms').addClass('hide_sms')
            $('#sms').addClass('showta').removeClass('hidta')
        }
})
$('body').on('click',`.treasureBox`,function(e){
    e.preventDefault()
    $("#scenarioTip").toggleClass('show_sms').toggleClass("hide_sms")
})






})//DOM




const BADCALLZ_OFF = ()=>{
    $('.marchGuardWhite').removeClass('marchGuardWhite')
}