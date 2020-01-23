let bob = false;

$((e) => {
    $('#gameScreen').prepend(bandSelection());


    $(".selection_backward_frame").each(
        function(e){
            let champ = $(this).siblings('.selection_heroImg');
            $(this).on('click',(e)=>{
                e.preventDefault();
                selection_animator({anime:{left: '11.75vw'}, champ:champ})
            })
        }
    );

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

    $('.card_heroImg').each(
        function(){
            $(this).on('click',e=>{
                e.preventDefault();
                $(this).animate( {opacity:.3,'backdrop-filter': 'grayscale(100%)'}, 420, ()=>$(this).removeAttr('style') )
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