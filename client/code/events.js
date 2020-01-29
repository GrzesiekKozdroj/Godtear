let bob = false;
let zIndex = 1;

$((e) => {
    $('#gameScreen').prepend(bandSelection());


    $(".selection_backward_frame").each(
        function(e){
            let champ = $(this).siblings('.selection_heroImg');
            $(this).on('click',(e)=>{
                e.preventDefault();
                selection_animator({anime:{left: '11.75vw'}, champ:champ});
            })
        }
    );
    $('#card').on('click','.champ_tab',e=>{
                e.preventDefault();
                $('.champ_tab').parent('.card_skills').css('z-index', zIndex)
                $('.card_tab').toggleClass('tab_behind');
                if($('.champ_tab').hasClass('tab_behind'))$('.card_tab').toggleClass('tab_behind');
                zIndex++;
            });
    $('#card').on('click','.unit_tab',e=>{
                e.preventDefault();
                $('.unit_tab').parent('.card_skills').css('z-index', zIndex)
                $('.card_tab').toggleClass('tab_behind');
                if($('.unit_tab').hasClass('tab_behind'))$('.card_tab').toggleClass('tab_behind');
                zIndex++;
            });
    $('.selection_heroImg').each(
        function(e){
            $(this).on('click',e=>{
                e.preventDefault();
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