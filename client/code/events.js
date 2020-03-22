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

const animateCart = (site, thiz) => 
{
    $(`.${site}.cardsContainer.${site}_card.hinge-in-from-${site}.mui-enter.mui-enter-active`)
        .removeClass(`hinge-in-from-${site} mui-enter mui-enter-active`)
        .addClass(`hinge-out-from-${site} mui-leave mui-leave-active`)
    setTimeout(()=>
        $(`.${site}.cardsContainer`)
            .empty()
            .append( miniCard(thiz.data(), phase, site) )
            .removeClass(`hinge-out-from-${site} mui-leave mui-leave-active`)
            .addClass(`hinge-in-from-${site} mui-enter mui-enter-active`)
        ,550)
}
const checkCardContents = (site, chosenModel) => 
    $(`.miniGameCard.${site}`).data('name') !== chosenModel.data('name')

const addSelectedColor = (thiz = false) =>
    {
        if(thiz)
        {
            $(".selectedModel").removeClass("selectedModel")
            thiz.addClass("selectedModel")
        }
    }

const oddRowPosition = (r,h) => {
    const colour = 'yellowGlow'
    $(`.hex_${h - 1}_in_row_${r - 1}`).addClass(colour)
    $(`.hex_${h}_in_row_${r - 1}`).addClass(colour)
    $(`.hex_${h - 1}_in_row_${r}`).addClass(colour)
    $(`.hex_${h + 1}_in_row_${r}`).addClass(colour)
    $(`.hex_${h - 1}_in_row_${r + 1}`).addClass(colour)
    $(`.hex_${h}_in_row_${r + 1}`).addClass(colour)
    $('.'+colour).children('.top').addClass(colour)
    $('.'+colour).children('.bottom').addClass(colour)
}

const evenRowPosition = (r,h) => {
    const colour = 'yellowGlow'
    $(`.hex_${h}_in_row_${r - 1}`).addClass(colour)
    $(`.hex_${h + 1}_in_row_${r - 1}`).addClass(colour)
    $(`.hex_${h - 1}_in_row_${r}`).addClass(colour)
    $(`.hex_${h + 1}_in_row_${r}`).addClass(colour)
    $(`.hex_${h}_in_row_${r + 1}`).addClass(colour)
    $(`.hex_${h + 1}_in_row_${r + 1}`).addClass(colour)
    $('.'+colour).children('.top').addClass(colour)
    $('.'+colour).children('.bottom').addClass(colour)
}
const infectMovementHexesWithYellow = (r,h) => {
    if(r % 2 === 1) oddRowPosition(r,h) 
    else if (r % 2 === 0) evenRowPosition(r,h)
}
const spreadTheInfection = () =>
    $('.yellowGlow').each(
        function(){
            let rg = Number( $(this).data('row') )
            let hg = Number( $(this).data('hex') )
            infectMovementHexesWithYellow(rg,hg)
        }
    )

const displayMovementAura = thiz => {

    $('.yellowGlow').removeClass('yellowGlow')

    let h = Number(thiz.parent('.hexagon').data('hex'))
    let r = Number(thiz.parent('.hexagon').data('row'))

    for(let m = 0; m < Number( [...thiz.data('speed')][0] ); m++ ){
        m === 0 ?
            infectMovementHexesWithYellow(r,h)
        :
            spreadTheInfection()
    }
    thiz.parent('.hexagon').removeClass('yellowGlow')
    thiz.parent('.hexagon').children().removeClass('yellowGlow')
}

$('body').on('click','.hexagon.yellowGlow', function(e){
    e.preventDefault()
    e.stopPropagation()
    makeAnim( e, $('.selectedModel'), $(this), displayMovementAura )
})





//ON CLICKING EACH HEXAGON
$('body').on('click','.hexagon',function(e){
    e.preventDefault()
    const thiz = $( $(this).children('.smallCard')[0] )

    if(  $(this).children('.smallCard').length  ){
        //add movement aura
        displayMovementAura(thiz)
        //add "selected" class for easier model picking
        addSelectedColor(thiz)
    }

    //display appropriate card if needed
    if(phase!=='deployment')
        if   ( thiz.hasClass(opoSide) && checkCardContents(opoSide, thiz) ) animateCart(opoSide, thiz)
        else if( thiz.hasClass(mySide) && checkCardContents(mySide, thiz) ) animateCart(mySide, thiz)
})






 











})//DOM