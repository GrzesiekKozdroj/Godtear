const makeObjectiveHex =  (row,hex) => {
    let random = Math.floor( Math.random () * (3 - 1 + 1)) + 1
    $(`[data-row=${row}][data-hex=${hex}]`)
        .addClass(`objectiveGlow obj${random}`)
            .children('.top')
                .addClass(`objectiveGlow obj${random}`)
    $(`[data-row=${row}][data-hex=${hex}]`)
        .children('.bottom')
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
    let data = {}
    data.klass = thiz.attr('data-klass')
    data.type = thiz.attr('data-type')
    data.name = thiz.attr('data-name')
    data.icon = thiz.attr('data-icon')
    data.unitname = thiz.attr('data-unitname')
    data.unitSize = thiz.attr('data-unitsize')
    data.healthleft = Number( thiz.attr('data-healthleft') )
    data.skills = JSON.parse(decodeURIComponent(thiz.attr('data-skills')));
    data.speed = [...thiz.attr('data-speed')].filter(o=>o!==',').map(el=>Number(el));
    ['dodge','protection','health','index','baim','bdamage','bdodge','bspeed','bprotection'].forEach(
        el=>data[el] = Number(thiz.attr(`data-${el}`) )
    )
    setTimeout(()=>{
        $(`.${site}.cardsContainer`)
            .empty()
            .append( miniCard(data, phase, site) )//gotta take attributes not data, and update damage seen on card when caused
            .removeClass(`hinge-out-from-${site} mui-leave mui-leave-active`)
            .addClass(`hinge-in-from-${site} mui-enter mui-enter-active`)
    },550)
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

const oddRowPosition = (r,h, colour = 'yellowGlow', type = 'glow') => {
    $(`.hex_${h}_in_row_${r}`).attr(`data-${type}`,colour)
    $(`.hex_${h - 1}_in_row_${r - 1}`).attr(`data-${type}`,colour)
    $(`.hex_${h}_in_row_${r - 1}`).attr(`data-${type}`,colour)
    $(`.hex_${h - 1}_in_row_${r}`).attr(`data-${type}`,colour)
    $(`.hex_${h + 1}_in_row_${r}`).attr(`data-${type}`,colour)
    $(`.hex_${h - 1}_in_row_${r + 1}`).attr(`data-${type}`,colour)
    $(`.hex_${h}_in_row_${r + 1}`).attr(`data-${type}`,colour)
    $(`[data-${type}="${colour}"`).children('.top').attr(`data-${type}`,colour)
    $(`[data-${type}="${colour}"`).children('.bottom').attr(`data-${type}`,colour)
}

const evenRowPosition = (r,h, colour = 'yellowGlow', type = 'glow') => {
    $(`.hex_${h}_in_row_${r}`).attr(`data-${type}`,colour)
    $(`.hex_${h}_in_row_${r - 1}`).attr(`data-${type}`,colour)
    $(`.hex_${h + 1}_in_row_${r - 1}`).attr(`data-${type}`,colour)
    $(`.hex_${h - 1}_in_row_${r}`).attr(`data-${type}`,colour)
    $(`.hex_${h + 1}_in_row_${r}`).attr(`data-${type}`,colour)
    $(`.hex_${h}_in_row_${r + 1}`).attr(`data-${type}`,colour)
    $(`.hex_${h + 1}_in_row_${r + 1}`).attr(`data-${type}`,colour)
    $(`[data-${type}="${colour}"`).children('.top').attr(`data-${type}`,colour)
    $(`[data-${type}="${colour}"`).children('.bottom').attr(`data-${type}`,colour)
}
const infectMovementHexesWithYellow = (r,h) => {
    if(r % 2 === 1) oddRowPosition(r,h) 
    else if (r % 2 === 0) evenRowPosition(r,h)
}
const spreadTheInfection = () =>
    $('[data-glow="yellowGlow"]').each(
        function(){
            let rg = Number( $(this).data('row') )
            let hg = Number( $(this).data('hex') )
            infectMovementHexesWithYellow(rg,hg)
        }
    )

function displayMovementAura (thiz) {
    let  bspeed = thiz.attr('data-bspeed')
    $('[data-glow]').removeAttr('data-glow')
    let h = Number(thiz.parent('.hexagon').data('hex'))
    let r = Number(thiz.parent('.hexagon').data('row'))
    let numbeOfSteps = Number( [...thiz.attr('data-speedleft')][phase === 'white' ? 0 : 2] ) + Number(bspeed)
    const noKnightshades = ()=>{
        let produce = true
        highlightHexes({colour:'trans',dist:1},thiz)
        $(`[data-glow].hexagon`).each(function(){
            if( $(this).children(`[data-name="Knightshades"][data-tenmodel].blackTeam`).length ){
                produce = false
                return false
            }
        })
        $(`data-glow`).removeAttr(`data-glow`)
        return produce
    }
    if( numbeOfSteps && noKnightshades() )
        for(let m = 0; m < numbeOfSteps; m++ ){
            m === 0 ?
                infectMovementHexesWithYellow(r,h)
            :
                spreadTheInfection()
        }
    thiz.parent('.hexagon').removeAttr('data-glow')
    thiz.parent('.hexagon').children().removeAttr('data-glow')
}

const onlyOneStep = (thiz, origin = $('.selectedModel') ) => {
    const ph = Number ( origin.parent('.hexagon').data('hex') )
    const pr = Number ( origin.parent('.hexagon').data('row') )
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

function removeAllBanners(team){
    let B_S = 0
    if( GAME_SCENARIO.name !== "Quest" ){
        $(`.claimedBanner.${team}`).each(function(){
            if ( $(this).data('banKol') === 'blue' )
                B_S += 5
            else
                B_S += 4
            m.universal.stepOnBanner($($(`[data-tenmodel].${team}`)[0]), $(this).parent('.hexagon'), false)
        })
        return B_S
    } else {
        //here need to add quest scenario banner counting queerkinyess
    }
}