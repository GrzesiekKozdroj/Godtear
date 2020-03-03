function buildRosters(o,coin){
    //console.log(o)
    //o={nickName:{roster,nickName,opoName,gamePlace,socket.id,side},opoName:{roster,nickName,opoName,gamePlace,socket.id}}
    if(o) for (let key in o){
        let plajer = o[key];
        if(plajer.nickName !== nickName){
            opoName = key
            opoRoster = plajer.roster
            opoSide = plajer.side
        } else if(plajer.nickName === nickName){
            nickName = plajer.nickName;
            roster = plajer.roster;
            mySide = plajer.side;
            myTurn = (plajer.side === 'left' && coin === 11) || (plajer.side === 'right' && coin === 12) ? true : false;
            myDeployment = plajer.side === 'left' ? 'greenGlow' : 'redGlow';
        }
    }
}
function beginBattle(){
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
const makeAnim = (e,that,thiz) => {
  //  console.log(that)
    $(thiz).each(function(){
        $(this).on('click.anima',(e)=>{
            e.preventDefault();
            that.animate({
                left: $(this).offset().left - .3 *(.248261 / 12  * 1.38 * window.innerHeight)- that.offset().left,
                top: $(this).offset().top - 3.5 * (.248261 / 12  * .36 * window.innerHeight) - that.offset().top
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
function gameCard (name, roster, color) {
    return `
    <div id="${name}" class="game_card">
        
    </div>
    `
}
function makeGameBoard(o,coin){
    buildRosters(o,coin)
        //      rightCard(Rhodri,'white','right')
        $('#gameScreen').empty().css('background-color','darkgreen')
        //      leftCard(Lorsann,'black','left')
            .append(`
                <div id='game_card' class='${opoSide} cardsContainer ${opoSide}_card'>
                    ${/*miniCard(Morrigan,'black','left')*/ deeploy(opoRoster,opoSide)}
                </div>
                <div id='board'>
                    <div id="app"></div>
                    <div id="ladder"></div>
                </div>
                <div id='game_card' class='${mySide} cardsContainer ${mySide}_card'>
                    ${/*miniCard(Rhodri,'white','right')*/ deeploy(roster,mySide)}
                </div>
            `)
    //createGameEvents()
    beginBattle()
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
                let data = model[who][D];
                let dataModel = `data-${D}=${data}`
                champDATA = [...champDATA,dataModel]
            }
            return champDATA.join(' ')
        }
         team = [...team,
            `<div class='${side} smallCard hexagrama-7' data-tenmodel=${model.champ.name} ${makedata('champ')}>
                <div class='top'></div>
                <img src='${model.champ.icon}'/>
                <div class='bottom'></div>
            </div>`];

        for(let i = 0; i < model.grunt.unitSize;i++){
            let grunt = 
                `<div class='${side} smallCard hexagrama-14' ${makedata('grunt') + ` data-tenmodel=${model.grunt.name + i}` }>
                    <div class='top'></div>
                    <img src='${model.grunt.icon}'/>
                    <div class='bottom'></div>
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
            deployEvent($(this))
        })
        $('#gameScreen').on('click',`.${myDeployment}.hexagon`,function(e){
            e.preventDefault()
            socket.emit('deploy-on-hex',{row:$(this).data('row'),hex:$(this).data('hex')})
            deployTrayToBoard('selected-model',$(this))
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