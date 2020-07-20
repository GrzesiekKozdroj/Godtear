const uniCancel = ()=>{
    un_glow()
    $('.skilling_declaration').removeClass('skilling_declaration')
    current_ability_method = null
    canceller = null
    cancellerName = null
}
var defy = {
    forwardMinions:()=>{
        $('.forwardMinions').removeClass('forwardMinions').removeClass('forwardMinions_selected')
        uniCancel()
    },
    graspingDead:()=>{//THAT CANNOT BEE JUST whiteTeam, now it contains untestedo
        if( $(`[data-name="Knightshades"][data-tenmodel].${myTurn?'whiteTeam':'blackTeam'}`).length === 3 )
            uniCancel()
        else
            displayAnimatedNews(`deploy all<br/>Knightshades`)
    },
    graveSummons:()=>{uniCancel()},
    carefulMaster:()=>{uniCancel()},
    wheresMaster:()=>{
        $('.wheresMaster_selected').removeClass('wheresMaster_selected')
        uniCancel()
    },
    footwork:()=>{uniCancel()},
    feint:()=>{uniCancel()},
    theGreatTusk:()=>{uniCancel()},
    marchRhodriWhite:()=>{uniCancel()},
    hold:()=>uniCancel(),
    marchGuardWhite:()=>{
        multiMovement_procedure('marchGuardWhite','marchGuardWhite_selected','Guards<br/>end march')
        uniCancel()
    },
    marchGuardBlack:()=>{
        multiMovement_procedure('marchGuardBlack','marchGuardBlack_selected','Guards<br/>end march')
        uniCancel()
    },
    feelThePoweer:()=>uniCancel(),
    hop:()=>{
        $('.hop').removeClass('hop')
        uniCancel()
    },
    twoPunch:()=>{
        $('.twoPunch_selected').removeClass('twoPunch_selected')
        uniCancel()
    },
    bannerfall:()=>uniCancel(),
    tongueTow:()=>{
        $('.tongueTow_selected').removeClass('tongueTow_selected')
        uniCancel()
    },
    tongueLash:()=>{
        $('.tongueLash_selected').removeClass('tongueLash_selected')
        uniCancel()
    },
    marchRhodriBlack:()=>{
        $('.marchRhodriBlack_selected').removeClass('marchRhodriBlack_selected')
        uniCancel()
    },
    shieldBash:()=>{
        $('.shieldBash_selected').removeClass('shieldBash_selected')
        uniCancel()
    },
    swordSlash:()=>uniCancel(),
    swordStrike:()=>uniCancel(),
    deathsDoor:()=>uniCancel(),
    deathWind:()=>{
        $('.deathWind_selected').removeClass('deathWind_selected')
        uniCancel()
    },
    soulCleave:()=>uniCancel(),
    shadowWard:()=>{
        $('.shadowWard_selected').removeClass('shadowWard_selected')
        uniCancel()
    },
    protect:()=>uniCancel(),
    shadowSnare:()=>uniCancel(),
    shadowStepWhite:()=>{
        $('.shadowStepWhite').removeClass('shadowStepWhite shadowStepWhite_selected')
        uniCancel()
    },
    shadowStepBlack:()=>{
        $('.shadowStepBlack').removeClass('shadowStepBlack shadowStepBlack_selected')
        uniCancel()
    },
    poisedToStrike:()=>uniCancel(),
    shadowWard:()=>{
        $('.shadowWard_selected').removeClass('shadowWard_selected')
        uniCancel()
    },
    phantomBanners:()=>{
        $('.phantomBanners_selected').removeClass('phantomBanners_selected')
        uniCancel()
    },
    protect:()=>uniCancel(),
    shadowSnare:()=>uniCancel(),
    frostyGlance:()=>{
        $('.frostyGlance_selected').removeClass('frostyGlance_selected')
        uniCancel()
    },
    forwardMinionsMorrigan:()=>{
        $('.forwardMinionsMorrigan').removeClass('forwardMinionsMorrigan forwardMinionsMorrigan_selected')
        uniCancel()
    },
    flashFreeze:()=>uniCancel(),
    soCoolMistress:()=>{
        $('.soCoolMistressPanel').remove()
        uniCancel()
    },
    blur:()=>uniCancel(),
    faryFire_MR:()=>uniCancel(),
    chillOut:()=>uniCancel(),
    fieldInstruction:()=>uniCancel(),
    faryFire:()=>uniCancel(),
    deathblow:()=>uniCancel(),
    aim:()=>uniCancel(),
    fire:()=>uniCancel(),
    shootAndScoot:()=>{console.log('defied sC')
        $('.shootAndScoot_selected').removeClass('shootAndScoot_selected')
        uniCancel()
    },
    snipe:()=>uniCancel(),
    mysticArrow:()=>uniCancel(),
    piercingShot:()=>uniCancel(),
    snowbladefight:()=>uniCancel(),
    intenseCold:()=>uniCancel(),
    snowballsChance:()=>uniCancel(),
    iceblade:()=>uniCancel(),
    icebolt:()=>uniCancel(),
    voidWeapn:()=>uniCancel(),
    lifeTrade:()=>uniCancel(),
    voidWeapon:()=>uniCancel(),
    lifeBlade:()=>uniCancel(),
    backstabWhite:()=>uniCancel(),
    backstabBlack:()=>uniCancel(),
    leap:()=>uniCancel(),
    letMeDoIt:()=>uniCancel(),
    channelRage:()=>uniCancel(),
    breakSpirit:()=>uniCancel(),
    mirage:()=>{
        $('.tongueTow_selected').removeClass('tongueTow_selected')
        uniCancel()
    },
    annoy:()=>{
        $('.annoyed_selected').removeClass('annoyed_selected')
        uniCancel()
    },
    pounce:()=>{
        $('.pounced').removeClass('pounced')
        uniCancel()
    },
    sprint:()=>{
        $('.sprint_selected').removeClass('sprint_selected')
        uniCancel()
    },
    brutalMasterBlack:()=>uniCancel(),
    brutalMasterWhite:()=>uniCancel(),
    ambushWhite:()=>uniCancel(),
    ambushBlack:()=>uniCancel(),
    induct:()=>uniCancel(),
    hootfoot:()=>uniCancel(),
    evilEye:()=>uniCancel(),
    fireStorm:()=>{
        $('.destined_for_DOOM').removeClass('destined_for_DOOM')
        $('#multi_choice_info_panel').remove()
        uniCancel()
    },
    rush:()=>{
        $('.rush').removeClass('rush rush_selected')
        $('.rush_selected').removeClass('rush rush_selected')
        uniCancel()
    },
    intimidation:()=>uniCancel(),
    warCry:()=>uniCancel(),
    cleavingStrike:()=>uniCancel(),
    fireball:()=>uniCancel(),
    fieryAxe:()=>uniCancel(),
    kick:()=>uniCancel(),
    shoot:()=>uniCancel(),
    jawbreaker:()=>{
        $('.brokenJaw_selected').removeClass('brokenJaw_selected')
        uniCancel()
    },
    whiplash:()=>{
        $('.whiplash_selected').removeClass('whiplash_selected')
        uniCancel()
    },
    beastlyCharge:()=>{
        $('.beastlyCharge_selected').removeClass('beastlyCharge_selected')
        uniCancel()
    },
    sneak:()=>{
        if( $('[data-glow="sneak"]').length )
            displayAnimatedNews('Recruit<br/>Sneaky<br/>Stabber')
    },
    irritate:()=>uniCancel(),
    plotRevenge:()=>uniCancel(),
    annoy:()=>{
        $('.annoyed_selected').removeClass('annoyed_selected')
        uniCancel()
    },
    hexBoltWhite:()=>{
        $('.titusChallenge').remove()
        uniCancel()
    },
    hexBoltBlack:()=>{
        $('.titusChallenge').remove()
        uniCancel()
    },
    attuneMagic:()=>{
        $('.titusChallenge').remove()
        uniCancel()
    },
    callTotems:()=>displayAnimatedNews('click green flame<br/>to call<br/>totems back'),
    graspingCurse:()=>{
        $('.deadlyCursePanel').remove()
        uniCancel()
    },
    powerHex:()=>{
        $('.titusChallenge').remove()
        uniCancel()
    },
    rollTheBonesWhite:()=>{
        $('.the_donor').removeClass('the_donor')
        $('.titusChallenge').remove()
        uniCancel()
    },
    rollTheBonesBlack:()=>{
        $('.the_donor').removeClass('the_donor')
        $('.titusChallenge').remove()
        uniCancel()
    },
    slipAndSlide:()=>uniCancel(),
    newSpewBlack:()=>displayAnimatedNews('deploy all<br/>Retchlings'),
    newSpewWhite:()=>displayAnimatedNews('deploy all<br/>Retchlings'),
    fluSpew:()=>uniCancel(),
    gooSpew:()=>uniCancel(),
    roarOfBattle:()=>{
        $('.roarOfBattle_selected').removeClass('roarOfBattle_selected')
        uniCancel()
    },
    outflank:()=>{console.log('outfl defy')
        multiMovement_procedure('outflank','outflank_selected','outflanked')
        $('.outflank_source').removeClass('outflank_source')
        uniCancel()
    },
    rapidDeployment:()=>{
        $('.rapidDeployment_selected').removeClass('rapidDeployment_selected')
        uniCancel()
    },
    challenge:()=>{
        if( myTurn ) 
            $('.titusChallenge').remove()
        uniCancel()
    },
    illKillYouAll:()=>{
        $('.illKillYouAll').removeClass('illKillYouAll illKillYouAll_selected')
        uniCancel()
    },
    pathof_cancelledStep:()=>{
        titustepper[$('.selectedModel').data('side')] = false
        $('.pathof_selected').removeClass('pathof_selected')
        displayAnimatedNews('movement<br/>cancelled')
        uniCancel()
    },
    piercingStrike:()=>uniCancel(),
    sweepingSlash:()=>{
        $('.destined_for_DOOM').removeClass('destined_for_DOOM')
        $('[data-DOOMqueue]').removeAttr('data-DOOMqueue')
        $('#multi_choice_info_panel').remove()
        uniCancel()
    },
    hack:()=>uniCancel(),
    surroundPound:()=>uniCancel(),
    roll:()=>{
        displayAnimatedNews('Roll<br/>ended')
        $('.roll_selected').removeClass('roll_selected')
        uniCancel()
    },
    nomNomNom:()=>uniCancel(),
    buffet:()=>{
        $('.destined_for_DOOM').removeClass('destined_for_DOOM')
        $('[data-DOOMqueue]').removeAttr('data-DOOMqueue')
        $('#multi_choice_info_panel').remove()
        uniCancel()
    },
    slimed:()=>uniCancel(),
    slipAndSlide:()=>uniCancel(),
    cursedGround:()=>uniCancel(),
    deadlyCurse:()=>{
        $('.deadlyCursePanel').remove()
        uniCancel()
    },
    purgeMagic:()=>uniCancel(),
    eruption:()=>uniCancel(),
    stoneStrenght:()=>uniCancel(),
    runeweaving:()=>{
        crystalGlare_bb = null
        $('.niaChallenge').remove()
        uniCancel()
    },
    avalanche:()=>{
        displayAnimatedNews('Avalanche<br/>Ends')
        $('.avalanche_moveable').removeClass('avalanche_moveable avalanche_selected')
        uniCancel()
    },
    runecaller:()=>{
        displayAnimatedNews('Runecaller<br/>cancelled')
        $('[data-tenmodel^="Landslide"]').each(function(){
            $(this).attr('data-landstepper', 0)
        })
        uniCancel()
    },
    currentWhite:currentDefy,
    currentBlack:currentDefy,
    tideBlack:()=>{
        $('.tide_selected').removeClass('tide_selected')
        uniCancel()
    },
    tideWhite:()=>{
        $('.tide_selected').removeClass('tide_selected')
        uniCancel()
    },
    likeWaterWhite:()=>{
        $('.showLikeWaterC').remove()
        uniCancel()
    },
    likeWaterBlack:()=>{
        $('.showLikeWaterC').remove()
        uniCancel()
    },
    kerSplashBlack:()=>uniCancel(),
    kerSplashWhite:()=>uniCancel(),
    jet:()=>{
        $('.marchjet_selected').removeClass('marchjet_selected')
        uniCancel()
    },
    underthrow:()=>{
        if ( !pocketBox )
            uniCancel()
        else if ( myTurn )
            displayAnimatedNews('you have<br/>to place<br/>objective hex')
    },
    tsunami:()=>{
        if( !$('.tsunami-selected').length ){
            un_glow()
            $('.tsunami-moveable').removeClass('tsunami-moveable')
        }
        if( !$('.tsunami-moveable').length ){
            displayAnimatedNews('Tsunami<br/>ends')
            uniCancel()
        }
        $('.tsunami-selected').removeClass('tsunami-moveable tsunami-selected')
    },
    shimmer:()=>uniCancel(),
    calcify:()=>uniCancel(),
    crystalMirror:()=>{
        $('.niaChallengeCrest').remove()
        uniCancel()
    },
    meditation:()=>uniCancel(),
    marchNia:()=>{
        $('.marchNia_selected').removeClass('marchNia_selected')
        uniCancel()
    },
    geode:()=>uniCancel(),
    erosion:()=>uniCancel(),
    blindingLight:()=>uniCancel(),
    crystalGlare:()=>{
        $('.niaChallenge').remove()
        crystalGlare_bb = null
        uniCancel()
    },
    rollingStones:()=>{
        un_glow()
        multiMovement_procedure('roll','roll_selected',"Roll<br/>ends")
    },
    stoneThrow:()=>uniCancel(),
    headbutt:()=>{
        $('.headbutt_selected').removeClass('headbutt_selected')
        uniCancel()
    },
    lungingStrike:()=>{
        pocketBox = null
        uniCancel()
    },
    tremor:()=>uniCancel(),
    stoneSpikes:()=>uniCancel(),
    earthquakeWhite:()=>multiMovement_procedure('earthquake_moveable','earthquake_selected','earthquake<br/>cancelled'),
    earthquakeBlack:()=>multiMovement_procedure('earthquake_moveable','earthquake_selected','earthquake<br/>cancelled'),
    boulderBash:()=>uniCancel(),
    royalSummonsWhite:()=>rsDefy(),
    royalSummonsBlack:()=>rsDefy(),

}




function currentDefy ( condition ){
        $('.current').removeClass(`current current_selected`)
        uniCancel()
}
function multiMovement_procedure(c,c_s,strng){
    if( !$('.' + c_s).length ){
        un_glow()
        $('.' + c).removeClass(c)
    }
    if( !$('.' + c).length ){
        displayAnimatedNews(strng)
        uniCancel()
    }
    $('.' + c_s).removeClass(c + ' ' +c_s)
}
function rsDefy(){
    multiMovement_procedure( 'summonsWalk', 'summonsWalk_selected', 'Royal Sommons ended')
}