// const createGameEvents = () =>
//     $('.hexagon').each(function (e) {
//         let that = $(this);
//         let row = Number($(this).data('row'));
//         let hex = Number($(this).data('hex'));
//         $(this).on('click', (e) => {
//             e.preventDefault();
//             if (!bob) {
//                 $(this).append(`
//                 <img src="img/Rhodri.png" style="" class="heroImg elevator" data-row="${row}" data-hex="${hex}"/>
//                 `);
//                 bob = true;
//             } else if($(this).children('.heroImg').length>0){
//                 makeAnim(e, that,$(this));
//             }
//         })
//     })


const makeObjectiveHex =  (row,hex) => {
    let random = Math.floor( Math.random () * (3 - 1 + 1)) + 1
    $(`[data-row=${row}][data-hex=${hex}]`)
        .addClass(`objectiveGlow obj${random}`)
            .children()
                .addClass(`objectiveGlow obj${random}`)
}
const removeObjectiveHex = (row,hex) => {
    $(`[data-row=${row}][data-hex=${hex}]`)
        .removeClass('objectiveGlow obj1 obj2 obj3')
            .children()
                .removeClass('objectiveGlow obj1 obj2 obj3')
}
const makeViableTarget = (row,hex) => {
    $(`[data-row=${row}][data-hex=${hex}]`)
        .addClass('viableTarget')
            .children()
                .addClass('viableTarget')
}
const endViableTarget = (row,hex) => {
    $(`[data-row=${row}][data-hex=${hex}]`)
        .removeClass('viableTarget')
            .children()
                .removeClass('viableTarget')
}
const makeHexGlow = ({row, hex, color}) => {
    $(`[data-row=${row}][data-hex=${hex}]`)
        .addClass(color + 'Glow')
            .children()
                .addClass(color + 'Glow')
}
const endHexGlow = ({row, hex, color}) => {
    $(`[data-row=${row}][data-hex=${hex}]`)
        .removeClass(color + 'Glow')
            .children()
                .removeClass(color + 'Glow')
}
const buildScenarioLayout = ({redHexes, greenHexes, objectiveHexes}) => {
    redHexes.forEach(el => {
        if(el[1]==='row'){
            for(let r = 1; r < 15; r++){
                makeHexGlow({row:el[0], hex:r, color:'red'})
            }
        } else {
            makeHexGlow({row:el[0], hex:el[1], color:'red'})
        }
    });
    greenHexes.forEach(el => {
        if(el[1]==='row'){
            for(let r = 1; r < 15; r++){
                makeHexGlow({row:el[0], hex:r, color:'green'})
            }
        } else {
            makeHexGlow({row:el[0], hex:el[1], color:'green'})
        }
    });
    objectiveHexes.forEach( el => makeObjectiveHex(el[0],el[1]) )
}
function deployEvent (model){
    if(myTurn){
        socket.emit('deployment-select',model.data('tenmodel') )
        $('.selected-model').removeClass('selected-model')
        model.addClass('selected-model')
    }
}
function deployTrayToBoard(modelClass, thiz){
    let className = $('.'+modelClass).data('type') === 'unit' ? 30 : 14;
    if($('.'+modelClass).parent(`.teamBox.${mySide}`).hasClass(myDeployment))
        $('.'+modelClass)
            .removeClass( `${modelClass} hexagrama-${ className === 30 ? 14 : 7}`)
            .addClass(`hexagrama-${className} ${ className === 30 ? 'unitModel' : 'champModel'}`)
            .detach()
            .appendTo( thiz )
}