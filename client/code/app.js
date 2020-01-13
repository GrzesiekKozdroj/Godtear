let bob = false;

$((e) => {
    $('#gameScreen').prepend(bandSelection());
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

function makeGameBoard(){
    let  board = `
        <div id="app"></div>
        <div id="ladder"></div>
    `;
    $('#gameScreen').append(board);
    for (let r = 1; r < 13; r++) {
        let shelfClass = 'shelf row' + r;
        let shelf = `<div class="${shelfClass}"></div>`;
        $('#app').append(shelf);

        for (let h = 1; h < 15; h++) {
            let hexClass = "hexagon hex_" + h + "_in_row_" + r;
            let hex = `
            <div class="${hexClass}" data-row=${r} data-hex=${h}>
                <div class="hexTop"></div>
                <div class="hexBottom"></div>
            </div>`;
            $(`.row${r}`).append(hex);
        }
    }
    for (let l = 1; l < 23; l++) {
        $('#ladder').append(`
        <div class="ladderBlock block${l}" data-block="${l}"></div>
    `);
    }
}
const makeAnim = (that) => {
    $('.hexagon').each(function(){
        $(this).on('click.anima',(e)=>{
            e.preventDefault();
            that.animate({
                left: $(this).offset().left - .3 *(.248261 / 12  * 1.38 * window.innerHeight)- that.offset().left,
                top: $(this).offset().top - 7.5 * (.248261 / 12  * .36 * window.innerHeight) - that.offset().top
            }, 420, ()=>{
                let row = $(this).data('row');
                let hex = $(this).data('hex');
                that.removeAttr('style').finish().off().detach().appendTo(this);
                $('.hexagon').off('click.anima');
                $(this).children('img').attr('data-row',row);
                $(this).children('img').attr('data-hex',hex);
            });
        });
    });
};//anim