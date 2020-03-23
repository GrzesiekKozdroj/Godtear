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
            .removeClass('hinge-in-from-middle-y mui-enter mui-enter-active')
            .addClass('scale-out-up mui-leave mui-leave-active')
        setTimeout(()=>$('.flashNews').off().remove(),550)
    })
}

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
    const speed = [...$('.selectedModel').data('speedleft')].filter(el=>el!==',')
    const p = phase === 'white' ? 0 : 1
    speed[p]-=1
    $('.selectedModel').data('speedleft', speed)
}