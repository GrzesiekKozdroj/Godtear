function buildRosters(o,coin){
    //o={nickName:{roster,nickName,opoName,gamePlace,socket.id,side},opoName:{roster,nickName,opoName,gamePlace,socket.id}}
    if(o) for (let key in o){
        let plajer = o[key];
        if(plajer.nickName !== nickName){
            opoName = key
            opoRoster = plajer.roster
            opoSide = plajer.side
            //here and below i need function making object
        } else if(plajer.nickName === nickName){
            nickName = plajer.nickName;
            roster = plajer.roster;
            mySide = plajer.side;
            myTurn = (plajer.side === 'left' && coin === 11) || (plajer.side === 'right' && coin === 12) ? true : false;
            myDeployment = plajer.side === 'left' ? 'greenGlow' : 'redGlow';
            opoDeployment = plajer.side === 'left' ? 'redGlow' : 'greenGlow';
            myNextPhase = 'white'
        }
    }
}
function beginBattle(){
    for (let r = 1; r < 13; r++) {
        let shelfClass = 'shelf row' + r;
        let shelf = `<div class="${shelfClass}"></div>`;
        $('#app').append(shelf);

        for (let h = 1; h < 15; h++) {
            const tester_paragraph = `<p>${h} | ${r}</p>`
            let hexClass = "hexagon hex_" + h + "_in_row_" + r;
            let hex = `
            <div class="${hexClass}" data-row=${r} data-hex=${h}>
                <div class="top"></div>
                <div class="bottom"></div>
                ${false ? tester_paragraph : ''}
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
const makeAnim = (model,whereTo,callback=false) => {//model, destination
    let ofsetSize = model.hasClass('champModel') ? [.3, 3.25] : [-0.75, -0.75]
    MOVINGNOW = true
    if(whereTo)
        model.animate({
            left: whereTo.offset().left - ofsetSize[0] *(.248261 / 12  * 1.38 * window.innerHeight)- model.offset().left,
            top: whereTo.offset().top - ofsetSize[1] * (.248261 / 12  * .36 * window.innerHeight) - model.offset().top
        }, 220, ()=>{
            const name = model.data('name')
            const team = model.hasClass('blackTeam') ? '.blackTeam' : '.whiteTeam'
            model.removeAttr('style').detach().appendTo(whereTo)
            document.querySelector(`[data-name="${name}"]${team}`).removeAttribute('style')
            if(callback)
                callback(model)
            else
                whereTo.removeAttr('data-glow')
            MOVINGNOW = false
        });
};//anim
function gameCard (name, roster, color) {
    return `    <div id="${name}" class="game_card"></div>    `
}
function makeGameBoard(o,coin){
    buildRosters(o,coin)
        $('#gameScreen').empty()//.css('background-color','darkgreen')
            .append(`
                <div id='game_card' class='${opoSide} cardsContainer ${opoSide}_card'>
                    ${deeploy(opoRoster,opoSide)}
                </div>
                <div id='board'>
                    <div id="app"></div>
                    <div id="ladder"></div>
                </div>
                <div id='game_card' class='${mySide} cardsContainer ${mySide}_card'>
                    ${deeploy(roster,mySide)}
                </div>
            `)
    beginBattle()

    QUICK_DEEPLOY()
  //  setTimeout(()=>{phase='black';myNextPhase='black'},1900)
    opoSkillTrack = buildSkillTrack(opoRoster)
    mySkillTrack = buildSkillTrack(roster)
}

function deeploy (group,side){
    let championBands = []
    for(let k in rosters){
        let klass = rosters[k]
        let band = klass.filter(b => group[0]===b.champ.name || group[1] === b.champ.name || group[2] === b.champ.name )
        if(band.length){
            championBands = [...championBands,...band]
        }
    }
    let models = championBands.map(model => {
        let team = []
        let modelCount = 0;
        const makedata = (who)=>{
            let champDATA = []
            for(let D in model[who]){
                let data = D !== 'skills' ? model[who][D] : encodeURIComponent(JSON.stringify(model[who][D]));
                
                let dataModel = `data-${D}=${data}`
                champDATA = [...champDATA,dataModel]
            }
            champDATA = [...champDATA,`data-side=${side}`]
            return champDATA.join(' ')
        }
        let teamColor = side === mySide ? 'whiteTeam' : 'blackTeam'
         team = [...team,
            `<div class='${side} smallCard hexagrama-7 ${teamColor}' data-tenmodel=${model.champ.name} ${makedata('champ')}>
                <div class='top ${teamColor}'></div>
                <div class="bb_HUD">
                    <div class="baim-dum onBoard" /> 
                    <div class="bdamage-dum onBoard" /> 
                    <div class="bdodge-dum onBoard" /> 
                    <div class="bprotection-dum onBoard" />
                    <div class="bspeed-dum onBoard" />
                </div>
                <img src='${model.champ.icon}'/>
                <div class='bottom ${teamColor}'></div>
            </div>`];

        for(let i = 0; i < model.grunt.unitSize;i++){
            let grunt = 
                `<div class='${side} smallCard hexagrama-14 ${teamColor}' ${makedata('grunt') + ` data-tenmodel=${model.grunt.name + i}` }>
                    <div class='top ${teamColor}'></div>
                    <div class="bb_HUD grunt">
                        <div class="baim-dum onBoard" /> 
                        <div class="bdamage-dum onBoard" /> 
                        <div class="bdodge-dum onBoard" /> 
                        <div class="bprotection-dum onBoard" />
                        <div class="bspeed-dum onBoard" />
                    </div>
                    <img src='${model.grunt.icon}'/>
                    <div class='bottom ${teamColor}'></div>
                </div>`
            team = [...team,grunt]
            modelCount = i
        }
        return `<div class='teamBox ${side}' data-modelcount=${modelCount+2}>
                ${team.join('')}
            </div>`
    })
    if(side===mySide){
        $('#gameScreen').on('click',`.teamBox.${mySide}`,function(e){
            e.preventDefault()
            let chosenBox = $(`.teamBox.${mySide}.${myDeployment}`)
            if( !chosenBox.hasClass(myDeployment) && !chosenBox.length || chosenBox.data('modelcount') == chosenBox.children(`.smallCard`).length  )
            {
                chosenBox.removeClass(myDeployment)
                $(this).addClass(myDeployment)
                if(!$('.selected-model').parent(`.teamBox.${mySide}`).hasClass(myDeployment)){
                    $('.selected-model').removeClass('selected-model')
                }
            }
        })
        $('#gameScreen').on('click',`.smallCard.${mySide} `,function(e){
            e.preventDefault()
            if(phase==='deployment' && $(this).parents().hasClass('teamBox'))deployEvent($(this))
        })
        $('#gameScreen').on('click',`.${myDeployment}.hexagon`,function(e){
            e.preventDefault()
            deployTrayToBoard('selected-model',$(this),true)
            let turnChange = !$(`.teamBox.${mySide}.${myDeployment}`).children('.smallCard').length ? false : true
            myTurn = turnChange
            if( !turnChange ) $(`.teamBox.${mySide}.${myDeployment}`).removeClass(myDeployment)
            socket.emit('deploy-on-hex',{row:$(this).data('row'),hex:$(this).data('hex'),turnChange:turnChange})
        })
    }

    return `
        <div class='${side} miniGameCard hinge-in-from-${side} mui-enter mui-enter-active'>
            <div class='${side} list tray'>
                ${ models.join('') }
            </div>
        </div>
    `
}

function QUICK_DEEPLOY() {
    console.log('HI -_-')
    let roow = 5;
    let heex = 1;
    $(`.teamBox.left`).children(`.smallCard`).each(function(){
        let className = $(this).data('type') === 'unit' ? 30 : 14 
        $(this)
            .detach()
            .removeClass( `hexagrama-${ className === 30 ? 14 : 7}`)
            .addClass(`hexagrama-${className} ${ className === 30 ? 'unitModel' : 'champModel'}`)
            .appendTo(`.hex_${heex}_in_row_${roow}`)
        roow += heex <14 ? 0 : 1;
        heex += heex < 14 ? 1 : -13;
    })
    roow = 8 
    heex = 14
    $(`.teamBox.right`).children(`.smallCard`).each(function(){
        let className = $(this).data('type') === 'unit' ? 30 : 14 
        $(this)
            .detach()
            .removeClass( `hexagrama-${ className === 30 ? 14 : 7}`)
            .addClass(`hexagrama-${className} ${ className === 30 ? 'unitModel' : 'champModel'}`)
            .appendTo(`.hex_${heex}_in_row_${roow}`)
        roow -= heex > 0 ? 0 : 1;
        heex -= heex > 0 ? 1 : -14;
    })
    socket.emit('beginBattle')
}