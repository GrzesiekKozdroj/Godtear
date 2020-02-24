function makeGameBoard(o){
    //o={nickName:{roster,nickName,opoName,gamePlace,socket.id},opoName:{roster,nickName,opoName,gamePlace,socket.id}}
    if(o) for (let key in o){
        let plajer = o[key]
        if(plajer.nickName !== nickName){
            opoName = plajer.nickname
            opoRoster = plajer.roster
        }
    }
    for (let r = 1; r < 13; r++) {
        let shelfClass = 'shelf row' + r;
        let shelf = `<div class="${shelfClass}"></div>`;
        $('#app').append(shelf);

        for (let h = 1; h < 15; h++) {
            let hexClass = "hexagon hex_" + h + "_in_row_" + r;
            let hex = `
            <div class="${hexClass}" data-row=${r} data-hex=${h}>
                <div class="top"></div>
                <div class="bottom"></div>
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
const makeAnim = (e,that) => {
    $('.hexagon').each(function(){
        $(this).on('click.anima',(e)=>{
            e.preventDefault();
            that.children('.heroImg').animate({
                left: $(this).offset().left - .3 *(.248261 / 12  * 1.38 * window.innerHeight)- that.offset().left,
                top: $(this).offset().top - 3.5 * (.248261 / 12  * .36 * window.innerHeight) - that.offset().top
            }, 420, ()=>{
                let row = $(this).data('row');
                let hex = $(this).data('hex');
                that.children('.heroImg').removeAttr('style').finish().off().detach().appendTo(this);
                $('.hexagon').off('click.anima');
                $(this).children('img').attr('data-row',row);
                $(this).children('img').attr('data-hex',hex);
            });
        });
    });
};//anim
function gameCard (name, roster, color) {
    return `
    <div id="${name}" class="game_card">
        
    </div>
    `
}
function beginBattle(){
        //      rightCard(Rhodri,'white','right')
        $('#gameScreen').css('background-color','darkgreen')
        //      leftCard(Lorsann,'black','left')
        $('#gameScreen').empty().append(`
            <div id='game_card' class='left cardsContainer left_card'>
                ${/*miniCard(Morrigan,'black','left')*/ deeploy(roster,'left')}
            </div>
            <div id='board'>
                <div id="app"></div>
                <div id="ladder"></div>
            </div>
            <div id='game_card' class='right cardsContainer right_card'>
                ${/*miniCard(Rhodri,'white','right')*/ deeploy(opoRoster,'right')}
            </div>
        `)
        makeGameBoard()
}

function deeploy (group,side){

    const makeModels = o => {
        let models = o.forEach(model => {
            
        });
        return models.map(model=>`

            <div class='smallCard img_${skill.icon}img_${phase}'>
                <div class='top'></div>
                <p>${/*skill.name*/''}</p>
                <div class='bottom'></div>
            </div>
        `).join('')
    }

    return `
        <div class='miniGameCard ${side} hinge-in-from-${side} mui-enter mui-enter-active'>
            <div class='list ${side}'>
            </div>
        </div>
    `
}