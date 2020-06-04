function makeCoin(){
    return `
        <div id="coin"></div>
    `
}

function displayDeploymentInfo(scenario) {
    const whoStarts = myTurn ? `IgoFirst` : `IgoSecond`
    const whoStartsText = myTurn ? `1<sup>st</sup>` : `2<sup>nd</sup>`
    const deploymentMyOptions = myTurn ? 
        `Its your turn, you must deploy one team wholly. Up to three followers can be on one hex, once you deploy, your 
          opponent does the same.` 
       : 
        `Now your opponent must deploy his one team wholly. Up to three followers can be on one hex. Once whole team is 
          deployed you will do the same.`

    setTimeout(()=>$('.gameTip.hinge-in-from-top.mui-enter').addClass('mui-enter-active'),450)

    return `
    <div class="gameTip hinge-in-from-top mui-enter slow">
        <div class="gameTipContent">
            <div class="displayWhoStarts ${myDeployment}"> ${whoStartsText} </div>
            <article class="scenarioBody">
                <p class="scenarioTitle"> ${scenario.name} </p>
                <p class="scenarioContent"> ${scenario.desc} </p>
            </article>
            <p class="deploymentMyOptions"> ${deploymentMyOptions} </p>
        </div>
    </div>
    `
}

function displayAnimatedNews (message){
    const flashNews = msg => ` <h3 class='flashNews hinge-in-from-middle-y mui-enter'> ${msg} </h3> ` 
    $('#gameScreen').append( flashNews(message) )
    setTimeout(()=>$('.flashNews').addClass('mui-enter-active'), 250)
    setTimeout(()=>
        $('.flashNews')
            .removeClass('hinge-in-from-middle-y mui-enter mui-enter-active')
            .addClass('scale-out-up mui-leave mui-leave-active')
            ,1500)
    setTimeout( () => $('.flashNews').off().remove(), 1950 )
    $('body').one('click',function(e){
        e.preventDefault()
        $('.flashNews')
            .remove()
    })
}

const decideOrnament = (bb) => bb > 0 ? 'booned' : bb < 0 ? 'blighted' : ''

function beginFirstPlotPhase(){
    //.append(miniCard(Morrigan,phase,opoSide)
    displayAnimatedNews ('Begin Plot Phase')
    $(`.${opoSide}.cardsContainer.${opoSide}_card`).empty().addClass(`hinge-out-from-${opoSide} mui-leave mui-leave-active`)
    $(`.${mySide}.cardsContainer.${mySide}_card`).empty().addClass(`hinge-out-from-${mySide} mui-leave mui-leave-active`)
    $('.'+myDeployment).removeClass(myDeployment)
    $('.'+opoDeployment).removeClass(opoDeployment)
    setTimeout(()=>{
        $(`.${opoSide}.cardsContainer.${opoSide}_card`)
            .removeClass(`hinge-out-from-${opoSide} mui-leave mui-leave-active`)
            .addClass(`hinge-in-from-${opoSide} mui-enter`)
            .append(  miniCard($($('.blackTeam')[0]).data(), phase, opoSide)  )
            .addClass('mui-enter-active')
        $(`.${mySide}.cardsContainer.${mySide}_card`)
            .removeClass(`hinge-out-from-${mySide} mui-leave mui-leave-active`)
            .addClass(`hinge-in-from-${mySide} mui-enter`)
            .append(  miniCard($($('.whiteTeam')[0]).data(), phase, mySide) )
            .addClass('mui-enter-active')
    },600)
}
function reduceSpeedLeft(){
    let bsped = Number($('.selectedModel').attr('data-bspeed'))
    const spedred = (n=0) =>{
        const speed = [...$('.selectedModel').attr('data-speedleft')].filter(el=>el!==',')
        const p = phase === 'white' ? 0 : 1
        speed[p]=speed[p]-1+n
        $('.selectedModel').attr('data-speedleft', speed)
    }
    if( bsped > 0 && $('.selectedModel') ){
        setBoons_Blights( $('.selectedModel'), { bspeed:0 }, 'local' )
    } else if ( bsped < 0 && $('.selectedModel') ){
        setBoons_Blights( $('.selectedModel'), { bspeed:0 }, 'local' )
        spedred(-1)
    } else 
        spedred()
}
function highlightHexes ({colour, dist},thiz = $('.selectedModel'), type = 'glow'){//console.trace()
    const applyClass = ({colour, row, hex, type}) => {
        if(row % 2 === 1) oddRowPosition(row, hex, colour, type) 
        else if (row % 2 === 0) evenRowPosition(row, hex, colour, type)
    }
    const {hex, row} = thiz.parent('.hexagon').data()
    for(let m = 0; m < dist; m++ ){
        if(m === 0) 
            applyClass({colour, hex, row, type})
        else
            $(`[data-glow="${colour}"]`).each(
                function(){
                    let rg = Number( $(this).data('row') )
                    let hg = Number( $(this).data('hex') )
                    applyClass({row: rg, hex: hg, colour, type})
                })
    }
    if(colour === 'yellowGlow' || colour === 'legendaryGlow'){
        thiz.parent('.hexagon').removeAttr('data-glow')
        thiz.parent('.hexagon').children().removeAttr('data-glow')
    }

}

function placeBanner(teamColor){
    const { klass, name } = $('.selectedModel').data()
    const color = klass ==='guardian' ? 'blue' : 
                  klass === 'maelstrom' ? 'yellow' : 
                  klass === 'shaper' ? 'green' : 
                  'red'
    let steps = color === 'green' ? 2 : 1
    return `
        <img class="claimedBanner ${teamColor}"
        src='./img/${color}Flag.png' data-color=${steps} 
        data-name="${name}"  />
    `
}
function displayDamageRecieved(pain){
    const wound_colour = pain < 0 ? 'redPain' : 'noPain'
    return `
        <div class="displayDamageRecieved ${wound_colour}">${pain}</div>
    `
}

const multi_choice_info_panel = ({name, count, color, klass, ability, dedcount}) => {
    //"greenFlame" || "redFlame" || "yellowFlame" || "blueFlame"
    let partixles = [] 
    for(let y = 0; y < 50; y++) 
        partixles = [...partixles, `<div class="particle ${color}"></div>`]
    let alreadyChosen = $(`.${klass}`).length || dedcount
    $('#multi_choice_info_panel').remove()
    return `
        <div id="multi_choice_info_panel">
            <p class="multi_choice abil_name" data-callback="${ability}">${name}</p>
            <p class="multi_choice abil_count" data-callback="${ability}">${alreadyChosen} / ${count}</p>
            <div  class="fire" data-socksMethod="${ability}" >
                ${partixles.join('')}
            </div>
        </div>
    `
}
const challengeOptions = (origin, target, socksMethod,curseCount,message) => {
//$('.selectedModel'), {hex=Number(), row=Number(), sockMethod:"string"}
    const { hex, row } = target
    const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights( $target )
    return `
        <div class="titusChallenge">
            <div 
                class="titusChallengeCrest" 
                data-hex=${hex} 
                data-row=${row} 
                data-socksmethod=${socksMethod} 
                data-cursecount=${curseCount}
              >
                <div class="message">${message}</div>
                <div class="boon-blight challengeTitus walk ${decideOrnament(bspeed)}" data-abil="bspeed">  </div>
                <div class="boon-blight challengeTitus dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
                <div class="boon-blight challengeTitus protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
                <div class="boon-blight challengeTitus aim ${decideOrnament(baim)}" data-abil="baim">  </div>
                <div class="boon-blight titus confirm " > done </div>
                <div class="boon-blight challengeTitus damage ${decideOrnament(bdamage)}" data-abil="bdamage">  </div>
            </div>
        </div>
    `
}
const greatTuskBoons = (origin, socksMethod,curseCount,message) => {
    //$('.selectedModel'), {hex=Number(), row=Number(), sockMethod:"string"}
        const { hex, row } = $(origin.parent('.hexagon') ).data()
        return `
            <div class="titusChallenge">
                <div 
                    class="titusChallengeCrest" 
                    data-hex=${hex} 
                    data-row=${row} 
                    data-socksmethod=${socksMethod} 
                    data-cursecount=${curseCount}
                  >
                    <div class="message">${message}</div>
                    <div class="boon-blight challengeTitus dodge" data-abil="bdodge">  </div>
                    <div class="boon-blight challengeTitus protection" data-abil="bprotection">  </div>
                    <div class="boon-blight theGreatTusk confirm " > done </div>
                </div>
            </div>
        `
}
const crystalGlareOptions = (origin, target, socksMethod,curseCount,message) => {
//$('.selectedModel'), {hex=Number(), row=Number(), sockMethod:"string"}
    const { hex, row } = target
    const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
    const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights( $target )
    const decideOrnament = (bb) => bb > 0 ? 'booned' : bb < 0 ? 'blighted' : ''
    return `
        <div class="niaChallenge">
            <div 
                class="niaChallengeCrest" 
                data-hex=${hex} 
                data-row=${row} 
                data-socksmethod=${socksMethod} 
                data-cursecount=${curseCount}
              >
                <div class="message">${message}</div>
                <div class="boon-blight ${socksMethod} walk ${decideOrnament(bspeed)}" data-abil="bwalk">  </div>
                <div class="boon-blight ${socksMethod} dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
                <div class="boon-blight ${socksMethod} protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
                <div class="boon-blight ${socksMethod} aim ${decideOrnament(bdamage)}" data-abil="baim">  </div>
                <div class="boon-blight nia confirm" > done </div>
                <div class="boon-blight ${socksMethod} damage ${decideOrnament(baim)}" data-abil="bdamage">  </div>
                <div class="boon-blight nia confirm cancel" > cancel </div>
            </div>
        </div>
    `
}
function dedlyCursePanel({side, name,socksMethod,message}){
    return socksMethod === "deadlyCurse" ?
        `
            <div class="deadlyCursePanel">
                <div 
                    class="deadlyCursePanelCrest" 
                    data-side=${side} 
                    data-name=${name} 
                    data-socksmethod=${socksMethod}
                  >
                    <div class="message">${message}</div>
                    <div class="boon-blight ${socksMethod} aim blighted" data-abil="baim">  </div>
                    <div class="boon-blight ${socksMethod} confirm" > done </div>
                    <div class="boon-blight ${socksMethod} damage blighted" data-abil="bdamage">  </div>
                </div>
            </div>
        `
         :

        `
        <div class="deadlyCursePanel">
            <div 
                class="deadlyCursePanelCrest" 
                data-side=${side} 
                data-name=${name} 
                data-socksmethod=${socksMethod}
              >
                <div class="message">${message}</div>
                <div class="boon-blight ${socksMethod} dodge blighted" data-abil="bdodge">  </div>
                <div class="boon-blight ${socksMethod} confirm" > done </div>
                <div class="boon-blight ${socksMethod} walk blighted" data-abil="bspeed">  </div>
            </div>
        </div>
    `
}
function soCoolMistress({side, name, socksMethod,message}){
        return `
        <div class="soCoolMistressPanel">
            <div 
                class="soCoolMistressPanelCrest" 
                data-side=${side} 
                data-name=${name} 
                data-socksmethod=${socksMethod}
              >
                <div class="message">${message}</div>
                <div class="boon-blight ${socksMethod} aim booned" data-abil="baim">  </div>
                <div class="boon-blight ${socksMethod} confirm" > done </div>
                <div class="boon-blight ${socksMethod} walk booned" data-abil="bspeed">  </div>
            </div>
        </div>
    `
}
function brutalMasterPanel({side, hex, row, socksMethod, message}){
        return `
        <div class="brutalMasterPanel">
            <div 
                class="brutalMasterCrest" 
                data-side=${side} 
                data-hex=${hex} 
                data-row=${row} 
                data-socksmethod=${socksMethod}
              >
                <div class="message">${message}</div>
                <div class="boon-blight ${socksMethod} aim booned" data-abil="aim" >  </div>
                <div class="boon-blight ${socksMethod} confirm" > done </div>
                <div class="boon-blight ${socksMethod} damage booned" data-abil="damage" >  </div>
            </div>
        </div>
    `
}
function stolenTreasure (){
    let RedBandit = $('.selectedModel[data-name="RedBandits"][data-tenmodel]')
    if( RedBandit.hasClass('whiteTeam') ){
    const { hex, row } = RedBandit.parent('.hexagon').data()
    const $target = RedBandit
    const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights( $target )
    const socksMethod = 'stolenTreasure'
    const product = `
        <div class="titusChallenge">
            <div 
                class="titusChallengeCrest" 
                data-hex=${hex} 
                data-row=${row} 
                data-socksmethod=${socksMethod} 
                data-cursecount=1
              >
                <div class="message">give Red Bandits 1 boon</div>
                <div class="boon-blight stolenTreasure walk ${decideOrnament(bspeed)}" data-abil="bspeed">  </div>
                <div class="boon-blight stolenTreasure dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
                <div class="boon-blight stolenTreasure protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
                <div class="boon-blight stolenTreasure aim ${decideOrnament(baim)}" data-abil="baim">  </div>
                <div class="boon-blight stolenTreasure confirm " > done </div>
                <div class="boon-blight stolenTreasure damage ${decideOrnament(bdamage)}" data-abil="bdamage">  </div>
            </div>
        </div>
    `
    $('#gameScreen').append(product)
 }  }
function EatHexes({side,socksMethod,message}){
    //$('.selectedModel'), {hex=Number(), row=Number(), sockMethod:"string"}
    const heling = $($(`.${side}[data-tenmodel^="Hexlings"]`)[0])
        const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights( heling )
        return `
            <div class="titusChallenge">
                <div 
                    class="titusChallengeCrest" 
                    data-socksmethod="${socksMethod}" 
                    data-side="${side}" 
                  >
                    <div class="message">${message}</div>
                    <div class="boon-blight ${socksMethod} walk ${decideOrnament(bspeed)}" data-abil="bspeed">  </div>
                    <div class="boon-blight ${socksMethod} dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
                    <div class="boon-blight ${socksMethod} protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
                    <div class="boon-blight ${socksMethod} aim ${decideOrnament(baim)}" data-abil="baim">  </div>
                    <div class="boon-blight ${socksMethod} confirm " > done </div>
                    <div class="boon-blight ${socksMethod} damage ${decideOrnament(bdamage)}" data-abil="bdamage">  </div>
                </div>
            </div>
        `
}
function rTB_Transfer( {hex,row,socksMethod,message} ){
    const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights( $('.the_donor') )
    const bebes = { baim, bdamage, bspeed, bdodge, bprotection }
    let elements = []
    const itemPrep = ({socksMethod,abilVal,abilName}) => {
        let klazx
        switch (abilName) {
            case 'bspeed':
                klazx = 'walk'
                break;
                case 'baim':
                    klazx = 'aim'
                    break;
                    case 'bdamage':
                        klazx = 'damage'
                        break;
                        case 'bdodge':
                            klazx = 'dodge'
                            break;
                            case 'bprotection':
                                klazx = 'protection'
                                break;
        
            default:
                break;
        }
        elements = [ ...elements,`
                <div class="boon-blight ${socksMethod} ${klazx} ${decideOrnament(abilVal)}" data-abil="${abilName}">  </div>
            `]
    }
    for(let k in bebes){
        if(bebes[k]!==0)
            itemPrep({socksMethod, abilVal:bebes[k],abilName:k})
    } 
    return `
        <div class="titusChallenge">
            <div 
                class="titusChallengeCrest" 
                data-socksmethod="${socksMethod}" 
                data-hex=${hex} 
                data-row=${row} 
              >
                <div class="message">${message}</div>
                ${ elements.join('') }
                <div class="boon-blight ${socksMethod} confirm " > done </div>
            </div>
        </div>
    `
}