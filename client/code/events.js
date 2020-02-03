let bob = false;
let zIndex = 1;

$((e) => {
    $('#gameScreen').prepend(bandSelection());

    $('.selection_section').each(
        function(){
            let daddy = $(this)
            $(this).on('click',e=>{
                e.preventDefault();
                e.stopPropagation();
                $('.marked_group').removeClass('marked_group')
                daddy.toggleClass('marked_group');
                let nameOfDisplayed = daddy.children('.selection_heroImg').data('name')
                for(let key in rosters){
                    let champs = rosters[key]
                    for(let i = 0; i < champs.length; i++){
                        if(champs[i].champ.name === nameOfDisplayed){
                            $('#card').empty().append(roster_card(champs[i]))
                            break;
                        }
                    }
                }
            })
        }
    )
    $(".selection_backward_frame").each(
        function(e){
            let champ = $(this).siblings('.selection_heroImg');
            $(this).on('click',(e)=>{
                e.preventDefault();
                e.stopPropagation();
                selection_animator({anime:{left: '11.75vw'}, champ:champ})
            })
        }
    );
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
                e.preventDefault();
                e.stopPropagation();
                let chosen = $(this);
                selection_animator({anime:{left: '11.75vw'}, champ:chosen});
                chosen_move(chosen);
            })
        }
    )

    $('.chosen').children('.card_heroImg').each(
        function(){
            $(this).on('click',e=>{
                e.preventDefault();
                e.stopPropagation();
                $(this).animate( 
                    {opacity:.3,'backdrop-filter': 'grayscale(100%)'}, 
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
        let teamNames = $('#bandDisplay').find('.card_heroImg');console.log(teamNames)
        e.preventDefault();
        if( /^[0-9A-Za-z]+$/.test(nickName) && /^[0-9A-Za-z]+$/.test(gamePlaceName)   ){
            socket.emit('namePlace',{nickName:nickName, place:gamePlaceName }  );
        } else if(nickName === '' ){
            $("#wronCharWarning").text("missing nick name");
        } else if(gamePlaceName === ''){
            $("#wronCharWarning").text("missing place name");
        }else{
            $("#wronCharWarning").text("can't use special symbols");
        }
    })
$($('#bandSelection').children('.selection_section')[0]).addClass('marked_group')
$('#card').append(roster_card(rosters.guardian[1]))

















    $('.hexagon').each(function (e) {
        let that = $(this);
        let row = Number($(this).data('row'));
        let hex = Number($(this).data('hex'));
        $(this).on('click', (e) => {
            e.preventDefault();
            console.log(row, hex);
            if (!bob) {
                $(this).append(`<img src="img/Rhodri.png" class="heroImg" data-row="${row}" data-hex="${hex}"/>`);
                bob = true;
            } else if($(this).children('.heroImg').length>0){
                makeAnim(e, that.children('.heroImg'));
            }
        })
    })
})//DOM