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
    m.universal.walk(e,$(this))
})

$('body').on('click','#claimAction',function(e){
    if( phase==='white' && myTurn && check_actions_count() ){
        e.preventDefault()
        $('[data-glow="yellowGlow"]').removeClass('[data-glow="yellowGlow"]')
        highlightHexes({colour:'claimColor',dist:1})
        socket.emit('HH', {color:'claimColor',dist:1})
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
                        highlightHexes({colour:glow,dist:data.dist})
                        socket.emit('HH', {color:glow,dist:data.dist})
                        current_ability_method = _m[data.m]
                        if( !data.dist )//call ability upon itself
                            current_ability_method($('.selectedModel'), $('.selectedModel').parent('.hexagon').data())
                    }
            })
        }
    }
}
$('body').on('click','[data-glow]', function (){
    const thiz_target = $(this).data()
    const thiz_origin = $('.selectedModel')
    if(current_ability_method)
        current_ability_method(thiz_origin, thiz_target)
})

$('body').on('click','.multi_choice', function(){
    console.log( $(this).data() )//what are you for??
})
$('body').on('click','.boon-blight.challengeTitus',function(e){
    e.preventDefault()
    const numberOfChoices = Number($(this).parent('.titusChallengeCrest').data('cursecount') ) 
    if( !$(this).hasClass('blighted') )
        if($('.selected').length < numberOfChoices)
            $(this).toggleClass('selected') 
        else $(this).removeClass('selected')
})
$('body').on('click','.boon-blight.confirm', function(e){
    e.preventDefault()
    const { socksmethod, hex, row, cursecount } = $(this).parent().data()
    const cursePackage = $('.boon-blight.selected').map(function(){return $(this).data('abil')}).get()
    socket.emit('rolloSkill',{ aim: 0, hurt: 0, socksMethod:socksmethod, hex, row, cursePackage })
    $('.titusChallenge').remove()
})
$('body').on('click','[data-glow].hexagon',function(e){
    e.preventDefault()
    const thiz = $(this)
    extraMover('illKillYouAll',thiz)
    extraMover('outflank',thiz)
})
$('body').on('click','.illKillYouAll',function(e){
    e.preventDefault()
    $('.illKillYouAll_selected').removeClass('illKillYouAll_selected')
    $(this).addClass('illKillYouAll_selected')
    highlightHexes ({colour:'legendaryGlow', dist:1},$(this))
})
$('body').on('click','.outflank',function(e){
    e.preventDefault()
    $('.outflank_selected').removeClass('outflank_selected')
    $(this).addClass('outflank_selected')
})
$('body').on('click','[data-glow^="straitPaths"].hexagon',function(e){
    e.preventDefault()
    e.stopPropagation()
    const chosenGlows = $(this).attr('data-glow')
    leave_only_selected_path(chosenGlows)
    //it also needs to move into selected hex and send the instruction to opposing player, with deletion of hexes as well as movement
})
 











})//DOM