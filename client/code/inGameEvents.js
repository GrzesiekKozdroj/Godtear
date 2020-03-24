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
const __canIBePlacedOnHex = (thiz, modelClass) => 
    !thiz.children(`.smallCard`).length || 
    ( 
      $(`.${modelClass}`).data('name') === thiz.children(`.smallCard`).first().data('name') && 
      thiz.children(`.smallCard`).length < 3
    ) ? true : false
function deployTrayToBoard(modelClass, thiz, deployment){
    let className = $('.'+modelClass).data('type') === 'unit' ? 30 : 14;
    let modeOfControl  = deployment ? $('.'+modelClass).parent(`.teamBox.${mySide}`).hasClass(myDeployment) : true
    if
    ( 
        __canIBePlacedOnHex(thiz, modelClass)
       && 
      modeOfControl
    )
        $('.'+modelClass)
            .removeClass( `${modelClass} hexagrama-${ className === 30 ? 14 : 7}`)
            .addClass(`hexagrama-${className} ${ className === 30 ? 'unitModel' : 'champModel'}`)
            .detach()
            .appendTo( thiz )

}



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

const declareSelectedModel = thiz => {
    $(".selectedModel").removeClass("selectedModel")
    thiz.addClass("selectedModel")
}

const addSelectedColor = (thiz = false) =>
    {
        if(thiz)
        {   
            declareSelectedModel(thiz)
            socket.emit('selectedModel',$('.selectedModel').data('tenmodel'))
        }
    }

const oddRowPosition = (r,h, colour = 'yellowGlow') => {
    $(`.hex_${h - 1}_in_row_${r - 1}`).addClass(colour)
    $(`.hex_${h}_in_row_${r - 1}`).addClass(colour)
    $(`.hex_${h - 1}_in_row_${r}`).addClass(colour)
    $(`.hex_${h + 1}_in_row_${r}`).addClass(colour)
    $(`.hex_${h - 1}_in_row_${r + 1}`).addClass(colour)
    $(`.hex_${h}_in_row_${r + 1}`).addClass(colour)
    $('.'+colour).children('.top').addClass(colour)
    $('.'+colour).children('.bottom').addClass(colour)
}

const evenRowPosition = (r,h, colour = 'yellowGlow') => {
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

function displayMovementAura (thiz) {

    $('.yellowGlow').removeClass('yellowGlow')

    let h = Number(thiz.parent('.hexagon').data('hex'))
    let r = Number(thiz.parent('.hexagon').data('row'))
    if( thiz.data('speedleft') )
        for(let m = 0; m < Number( [...thiz.data('speedleft')][phase === 'white' ? 0 : 1] ); m++ ){
            m === 0 ?
                infectMovementHexesWithYellow(r,h)
            :
                spreadTheInfection()
        }
    thiz.parent('.hexagon').removeClass('yellowGlow')
    thiz.parent('.hexagon').children().removeClass('yellowGlow')
}

const onlyOneStep = thiz => {
    const ph = Number ( $('.selectedModel').parent('.hexagon').data('hex') )
    const pr = Number ( $('.selectedModel').parent('.hexagon').data('row') )
    const h = Number ( thiz.data('hex') )
    const r = Number ( thiz.data('row') )
    const atEven = Boolean(
        ph === h && r - 1 === pr ||
        ph === h + 1 && r - 1 === pr ||
        ph === h - 1 && r == pr ||
        ph === h + 1 && r === pr ||
        ph === h && r + 1 === pr ||
        ph === h + 1 && r + 1 ===pr
    )
    const atOdds = Boolean(
        ph === h - 1 && r - 1 === pr ||
        ph === h && r - 1 === pr ||
        ph === h - 1 && r === pr ||
        ph === h + 1 && r === pr ||
        ph === h - 1 && r + 1 === pr ||
        ph === h && r + 1 === pr 
    )
    if(pr % 2 === 0) {
        return atOdds ? true : false
    }
    else if (pr % 2 === 1) {
        return atEven ? true : false
    }
}