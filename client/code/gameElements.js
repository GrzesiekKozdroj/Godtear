function makeCoin(){
    return `
        <div id="coin">1</div>
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
function displayAnimatedNews ({
    $attacker, $victim, 
    skillName, skillIcon, 
    dieRoll, rollOutcome, hurtTotal,
    templateType, steps, blights, 
    msg0, msg1, msg2, msg3
}){
    const extractor = (model) => {
        const name = model.data('name')
        const team = model.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        return { name, team }
    }
    const uq_id = Math.floor( Math.random () * (1000 - 1 + 1)) + 1
    const a = $attacker ? extractor($attacker) : null
    const v = $victim ? extractor($victim) : null
    const skillMarker = (sN,sI) => sN && sI ? `<span class="${sI}" >${sN}</span>` : ''
    const charMarker = x => x ? `<span class="${x.team}" >${x.name}</span>` : ''
    const outcoMarker = y =>`<span class="${y?'success':'miss'}" >${y?'hits!':'fails!'}</span>`
    const damageMarker = (y, hT) => `${y ? '<span class="blackTeam" >'+hT+'</span>' : 'no' }`
    const ptsMarker = pts => `<span class="SMS-gold">${pts} step${pts>1?'s':''}</span>`
    const msgMincer = (msg) => msg ? msg : ''
    const makeSMS_b_b = (value,Bname) => {
        const imageAdd = [...Bname].slice(1).join('')+(value>0?'Boon':'Blight')
        const val = value > 0 ? '<span class="bigger-SMS">+1</span>' : '<span class="bigger-SMS">-1</span>'
        return `${val}&nbsp;<div class="SMS_BB" style="background-image:url('../img/${imageAdd}.svg')"></div> `}
    const diceMarker = (x,dieRoll) => dieRoll.map(el=>{
        const X = x.team ? x.team : 'blackTeam'
        if(el===0){
            return `<div id="dice_" class="_square ${X}" ></div>`
        }else if(el===1){
            return `<div id="dice_" class="_square ${X}" ><div class="die_1 eye"></div></div>`
        }else if(el===2){
            return `
                <div id="dice_" class="_square ${X}" >
                    <div class="die_2a eye"></div><div class="die_2b eye"></div>
                </div>`
        }
    }).join('&nbsp; ')
    const templater = food => $('#sms').prepend(`<div class="sms_message fade_sms ${uq_id}">${food}</div>`)
    if(templateType === 'attack'){
        templater(`${charMarker(a)} use ${skillMarker(skillName,skillIcon)} on ${charMarker(v)} <br/> 
            roll ${diceMarker(a,dieRoll)} ${outcoMarker(rollOutcome)}`)
    }else if(templateType==='damage'){
        templater(`${charMarker(v)} suffers damage roll of ${diceMarker('',dieRoll)}`)
    }else if(templateType==='pain'){
        templater(`${charMarker(v)} recieves ${damageMarker(rollOutcome,hurtTotal)} damage`)
    }else if(templateType==='boons'){
        let messahe = ''
        let argr = false
        for(let k in blights){
            const boobli = blights[k]
            messahe+=makeSMS_b_b(boobli,k)
            argr = argr ? argr : boobli !== 0 ? true : false
        }
        if( argr )
            templater(`${charMarker(a) + ' ' + messahe} ${ skillName ? " from " + skillMarker(skillName,skillIcon) : ''}`)
    }else if(templateType==='points'){
        templater(`${charMarker(v)} scores ${ptsMarker(steps)}`)
    }else if(templateType==='info'){//it needs dies here as well
        templater(`
            ${msgMincer(msg0)} 
            ${charMarker(a)} 
            ${msgMincer(msg1)} 
            ${skillMarker(skillName, skillIcon)} 
            ${msgMincer(msg2)}
            ${charMarker(v)} 
            ${msgMincer(msg3)}
        `)
    } else {
        // const flashNews = msg => ` <h3 class='flashNews hinge-in-from-middle-y mui-enter'> ${msg} </h3> ` 
        // $('#gameScreen').append( flashNews(message) )
        // setTimeout(()=>$('.flashNews').addClass('mui-enter-active'), 250)
        // setTimeout(()=>
        //     $('.flashNews')
        //         .removeClass('hinge-in-from-middle-y mui-enter mui-enter-active')
        //         .addClass('scale-out-up mui-leave mui-leave-active')
        //         ,1500)
        // setTimeout( () => $('.flashNews').off().remove(), 1950 )
        // $('body').one('click',function(e){
        //     e.preventDefault()
        //     $('.flashNews')
        //         .remove()
        // })
    }
}

const decideOrnament = (bb) => bb > 0 ? 'booned' : bb < 0 ? 'blighted' : 'nooner'

function beginFirstPlotPhase(){
    //.append(miniCard(Morrigan,phase,opoSide)
    displayAnimatedNews({templateType:'info',msg0:'Begin Plot Phase'})
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
        $("#scenarioTip").append(
            `<div id="s_title" class="hide_sms">${GAME_SCENARIO.name}</div>
            <div id="s_story" class="hide_sms">${GAME_SCENARIO.desc}</div>`
        )
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
function highlightHexes ({colour, dist},thiz = $('.selectedModel'), type = 'glow'){
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
        data-banKol=${color} 
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
                <div class="boon-blight ${socksMethod} walk ${decideOrnament(bspeed)}" data-abil="bspeed">  </div>
                <div class="boon-blight ${socksMethod} dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
                <div class="boon-blight ${socksMethod} protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
                <div class="boon-blight ${socksMethod} aim ${decideOrnament(baim)}" data-abil="baim">  </div>
                <div class="boon-blight nia confirm" > done </div>
                <div class="boon-blight ${socksMethod} damage ${decideOrnament(bdamage)}" data-abil="bdamage">  </div>
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
function showLikeWater( RaithMarid ){
    const { baim, bdamage, bdodge, bprotection, bspeed } = extractBoons_Blights( RaithMarid )
    return `
        <div class="showLikeWaterC">
            <div 
                class="showLikeWaterCrest" 
                data-socksmethod= "likeWaterPost" 
                data-cursecount= 1 
              >
                <div class="message">Splashlings gain one</div>
                <div class="boon-blight showLikeWater walk ${decideOrnament(bspeed)}" data-abil="bspeed">  </div>
                <div class="boon-blight showLikeWater dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
                <div class="boon-blight showLikeWater protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
                <div class="boon-blight showLikeWater aim ${decideOrnament(baim)}" data-abil="baim">  </div>
                <div class="boon-blight showLikeWater confirm " > done </div>
                <div class="boon-blight showLikeWater damage ${decideOrnament(bdamage)}" data-abil="bdamage">  </div>
            </div>
        </div>
    `
}
function un_glow(p=false){
    if (!p)
        $('[data-glow]').removeAttr('data-glow')
    else
        $(`[data-glow=${p}]`).removeAttr('data-glow')
}
function ripplingChoices(side) {
    const { bspeed, bdodge, bprotection, baim, bdamage } = $(`[data-tenmodel^="RaithMarid"][data-side="${side}"]`)
    return `
    <div class="ripplingChoicesC">
        <div 
            class="ripplingChoicesCrest" 
            data-socksmethod="ripplingScalesChosen" 
            data-sajd="${side}" 
          >
            <div class="message">Give a boon to Raith'Marid</div>
            <div class="boon-blight ripplingChoices walk ${decideOrnament(bspeed)}" data-abil="bspeed">  </div>
            <div class="boon-blight ripplingChoices dodge ${decideOrnament(bdodge)}" data-abil="bdodge">  </div>
            <div class="boon-blight ripplingChoices protection ${decideOrnament(bprotection)}" data-abil="bprotection">  </div>
            <div class="boon-blight ripplingChoices aim ${decideOrnament(baim)}" data-abil="baim">  </div>
            <div class="boon-blight ripplingChoices confirm " > done </div>
            <div class="boon-blight ripplingChoices confirm cancel " > cancel </div>
            <div class="boon-blight ripplingChoices damage ${decideOrnament(bdamage)}" data-abil="bdamage">  </div>
        </div>
    </div>
    `
}
function display_who_starts_next_phase(){
    return $('#gameScreen').append(`
            <div class="soCoolMistressPanel">
                <div 
                    class="soCoolMistressPanelCrest" 
                  >
                    <div class="message">choose to go first or second</div>
                    <div class="boon-blight ch1nt chnt" > 1<sub>st</sub> </div>
                    <div class="boon-blight ch2nt chnt" > 2<sub>nd</sub> </div>
                </div>
            </div>
        `)
    //stil TODO
}
function royalSummonsChoices( drakes, side ){
    if( myTurn ) return`
        <div class="soCoolMistressPanel">
            <div 
                class="soCoolMistressPanelCrest" 
              >
                <div class="message">choose to walk or recruit a Young Dragon</div>
                <div class="walkDragon${phase} walkDragon royalSumms" >advance</div>
                <div class="cancelDragon${phase} cancelDragon royalSumms" >cancel</div>
                <div class="recruitDragon${phase} recruitDragon royalSumms" >recruit</div>
            </div>
        </div>`
}

function wellPlayed(){
    return `<div id="WP" class="hinge-out-from-top mui-leave mui-leave-active">
    <div id="mainWPinfo">${MY_SCORE > 4 ? 'Victory!' : 'Well Played!'}</div>
        <div class="statListNames">
            <div class="list_name_label">${treasureBox('left')}</div>
            <div class="singleStats" >Banners Claimed</div>
            <div class="singleStats" >Banners Stayed</div>
            <div class="singleStats" >Banners Slayed</div>
            <div class="singleStats" >Accuracy</div>
            <div class="singleStats" >Damage</div>
            <div class="singleStats" >Dodgeability</div>
            <div class="singleStats" >Tankiness</div>
            <div class="singleStats" >Wounds Suffered</div>
            <div class="singleStats" >Rallies/Recruits</div>
            <div class="singleStats" >Hexes Travelled</div>
            <div class="singleStats" >Steps Earned</div>
            <div class="list_name_label" >${treasureBox('right')}</div>
        </div>
        ${loopaLLWP()}
    </div>`
}
const loopaLLWP = ()=>{
    let line = 1
    let LIST = ""
    for(let c in GEEK[mySide]){
        const ch = GEEK[mySide][c]
        const thiz = $($(`.${mySide}[data-tenmodel^="${c}"]`)[0])
        LIST += (    singleStatList({ch,side:mySide,c,thiz, line})   )
        line++
    }
    for(let c in GEEK[opoSide]){
        const ch = GEEK[opoSide][c]
        const thiz = $($(`.${opoSide}[data-tenmodel^="${c}"]`)[0])
        LIST += (    singleStatList({ch,side:opoSide,c,thiz, line})   )
        line++
    }
    return LIST
}
const beatUpCounter = (piece,side) =>{
    const thiz = $($(`.${side === mySide ? opoSide : mySide }[data-tenmodel^="${piece.name}"]`)[0])
    return `<div class="singlebeatup">
        <div class="wp_portrait">${dudesCloner(thiz)}</div>
        <div class="spanINFO">x${piece.p}</div>
    </div>`
}
const beatUpCombinator = (list,side) => {
    let pts = []
    for(let k in list){
        pts = [...pts, {name:k, p:list[k]}]
    }
    pts.sort(function(a, b){return b.p-a.p})
    return beatUpCounter(pts[0],side)+beatUpCounter(pts[1],side)+beatUpCounter(pts[2],side)
}
const percentileReducer = P => P.length ? P.reduce((a,c)=>a+c) * 100 / P.length : 0
const dudesCloner = thiz => `
    <div class="${thiz.attr("class").toString().split(' ').join(' ')}">
        <div class="top ${thiz.hasClass('whiteTeam') ? 'whiteTeam' : 'blackteam' }"></div>
        <div class="bottom ${thiz.hasClass('whiteTeam') ? 'whiteTeam' : 'blackteam' }"></div>
        <img src="${thiz.data('icon')}" />
    </div>`

const singleStatList = ({ch,side,c, thiz, line}) => {
    const team = thiz.hasClass('whiteTeam') ? 'bluish' : 'redish'
    const { 
        bannersClaimed, bannersStayed, bannersSlayed, 
        accuracy, dmgCaused, 
        dodgeability, tankyness, woundsSuffered, 
        ralliesRecruits, hexesTravelled, stepsEarned, 
        favouriteToHit, killsCount 
    } = ch
    return `<div class="singleStatList">
        <div class="wp_name_label wh" data-line="${line}" data-col="0">
            <div class="wp_portrait ${side}_${c}">${dudesCloner(thiz)}</div>
            <div class="wp_name ${team}">${c}</div>
        </div>
        <div id="bannersClaimed" class="singleStats wh ${team}" data-line="${line}" data-col="1">${bannersClaimed}</div>
        <div id="bannersStayed" class="singleStats wh ${team}" data-line="${line}" data-col="2">${bannersStayed}</div>
        <div id="bannersSlayed" class="singleStats wh ${team}" data-line="${line}" data-col="3">${bannersSlayed}</div>
        <div id="accuracy" class="singleStats wh ${team}" data-line="${line}" data-col="4">${percentileReducer(accuracy)}%</div>
        <div id="dmgCaused" class="singleStats wh ${team}" data-line="${line}" data-col="5">${dmgCaused}</div>
        <div id="dodgeability" class="singleStats wh ${team}" data-line="${line}" data-col="6">
            ${percentileReducer(dodgeability)}%
        </div>
        <div id="tankyness" class="singleStats wh ${team}" data-line="${line}" data-col="7">${tankyness}</div>
        <div id="woundsSuffered" class="singleStats wh ${team}" data-line="${line}" data-col="8">${woundsSuffered}</div>
        <div id="ralliesRecruits" class="singleStats wh ${team}" data-line="${line}" data-col="9">${ralliesRecruits}</div>
        <div id="hexesTravelled" class="singleStats wh ${team}" data-line="${line}" data-col="10">
            ${hexesTravelled/$(`.${side}[data-tenmodel^="${c}"]`).data('unitsize')}
        </div>
        <div id="stepsEarned" class="singleStats wh ${team}" data-line="${line}" data-col="11">${stepsEarned}</div>
        <div class="multiStat wh ${team}" data-line="${line}" data-col="12">
            <div id="favouriteToHit" class="multiStatLine">${beatUpCombinator(favouriteToHit,side)}</div>
            <div id="killsCount" class="multiStatLine">${beatUpCombinator(killsCount,side)}</div>
        </div>
    </div>`
}
function displatyTT(){
    $('body').append(`
        <p id="rolledOutTT">
            <span id="closeTT">X</span>
            All character names, abilities, rules and character images are registered trademarks of&nbsp;<a target="_blank" href="https://steamforged.com/">Steam Forged Games Ltd.</a>&nbsp;This site is not affiliated with&nbsp;<a target="_blank"  href="https://steamforged.com/">Steam Forged Games Ltd.</a>&nbsp;and no claim of ownership is made to any of these trademarks. Icons for skills, banners etc. are are graciously provided by&nbsp;<a target="_blank"  href="https://game-icons.net/">https://game-icons.net/</a>&nbsp;.<br/><br/>You expressly agree that use of this service is at your sole risk and is provided on an "as is" basis without warranties of any kind, either express or implied. No one can warrant that the service will be uninterrupted or error-free. Use at your own risk.
            <span id="contact_me">larhendiel@yahoo.co.uk</span>
        </p>
    `)
}