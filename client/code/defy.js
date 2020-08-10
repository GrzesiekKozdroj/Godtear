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
            displayAnimatedNews({templateType:'info',msg0:`deploy all Knightshades`})
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
        multiMovement_procedure('marchGuardWhite','marchGuardWhite_selected','Guards end march')
        uniCancel()
    },
    marchGuardBlack:()=>{
        multiMovement_procedure('marchGuardBlack','marchGuardBlack_selected','Guards end march')
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
    shootAndScoot:()=>{
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
            displayAnimatedNews({templateType:'info',msg0:'Recruit Sneaky Stabber'})
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
    callTotems:()=>displayAnimatedNews({templateType:'info',msg0:'click green flame to call totems back'}),
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
    newSpewBlack:()=>displayAnimatedNews({templateType:'info',msg0:'deploy all Retchlings'}),
    newSpewWhite:()=>displayAnimatedNews({templateType:'info',msg0:'deploy all Retchlings'}),
    fluSpew:()=>uniCancel(),
    gooSpew:()=>uniCancel(),
    roarOfBattle:()=>{
        $('.roarOfBattle_selected').removeClass('roarOfBattle_selected')
        uniCancel()
    },
    outflank:()=>{
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
        displayAnimatedNews({templateType:'info',msg0:'movement cancelled'})
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
        multiMovement_procedure('roll','roll_selected','Roll ended')
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
        displayAnimatedNews({templateType:'info',skillName:'Avalanche',skillIcon:'star',msg2:' Ends'})
        $('.avalanche_moveable').removeClass('avalanche_moveable avalanche_selected')
        uniCancel()
    },
    runecaller:()=>{
        displayAnimatedNews({templateType:'info',msg2:' cancelled', skillName:'Runecaller', skillIcon:'self'})
        $('[data-tenmodel^="Landslide"]').each(function(){$(this).attr('data-landstepper', 0)})
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
            displayAnimatedNews({templateType:'info',msg0:'you have to place one objective hex'})
    },
    tsunami:()=>{
        if( !$('.tsunami-selected').length ){
            un_glow()
            $('.tsunami-moveable').removeClass('tsunami-moveable')
        }
        if( !$('.tsunami-moveable').length ){
            displayAnimatedNews({templateType:'info',skillName:'Tsunami', skillIcon:'star', msg2:' Ends'})
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
    earthquakeWhite:()=>multiMovement_procedure('earthquake_moveable','earthquake_selected','earthquake cancelled'),
    earthquakeBlack:()=>multiMovement_procedure('earthquake_moveable','earthquake_selected','earthquake cancelled'),
    boulderBash:()=>uniCancel(),
    royalSummonsWhite:()=>rsDefy(),
    royalSummonsBlack:()=>rsDefy(),
    regalBlessing:()=>uniCancel(),
    firebrand:()=>uniCancel(),
    roar:()=>uniCancel(),
    draconicRage:()=>uniCancel(),
    viciousBite:()=>uniCancel(),
    rainOfFire:()=>uniCancel(),
    bite:()=>uniCancel(),
    fieryBreath:()=>uniCancel(),
    rallied:()=>uniCancel(),
    deathMove:()=>multiMovement_procedure('deathMove','deathMove_selected','death move cancelled'),
    bannerClaim:()=>uniCancel(),

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
        displayAnimatedNews({templateType:'info',msg0:strng})
        uniCancel()
    }
    $('.' + c_s).removeClass(c + ' ' +c_s)
}
function rsDefy(){
    multiMovement_procedure( 'summonsWalk', 'summonsWalk_selected', 'Royal Summons ended')
    $('.soCoolMistressPanel').remove()
}
function meagREsetter(){
    $(".smallCard").removeClass(`
        skilling_declaration 
        forwardMinions 
        forwardMinions_selected 
        wheresMaster_selected 
        marchGuardWhite 
        marchGuardWhite_selected 
        marchGuardBlack 
        marchGuardBlack_selected 
        hop 
        twoPunch_selected 
        tongueTow_selected 
        tongueLash_selected 
        marchRhodriBlack_selected 
        shieldBash_selected 
        deathWind_selected 
        shadowWard_selected 
        shadowStepWhite 
        shadowStepWhite_selected 
        shadowStepBlack 
        shadowStepBlack_selected 
        shadowWard_selected 
        phantomBanners_selected 
        frostyGlance_selected 
        forwardMinionsMorrigan 
        forwardMinionsMorrigan_selected 
        shootAndScoot_selected 
        tongueTow_selected 
        annoyed_selected 
        pounced 
        sprint_selected 
        destined_for_DOOM 
        rush 
        rush_selected 
        brokenJaw_selected 
        whiplash_selected 
        beastlyCharge_selected 
        annoyed_selected 
        titusChallenge 
        roarOfBattle_selected 
        outflank 
        outflank_selected 
        rapidDeployment_selected 
        titusChallenge 
        illKillYouAll 
        illKillYouAll_selected 
        pathof_selected 
        destined_for_DOOM 
        roll 
        roll_selected 
        avalanche_moveable 
        avalanche_selected 
        tide_selected 
        tsunami-moveable 
        tsunami-selected 
        marchNia_selected 
        headbutt_selected 
        earthquake_moveable 
        earthquake_selected 
        deathMove 
        deathMove_selected 
    `)
    $('#multi_choice_info_panel').remove()
    const rem = [
        'soCoolMistressPanel',
        'deadlyCursePanel',
        'titusChallenge',
        'niaChallenge',
        'showLikeWaterC',
        'marchjet_selected',
        'niaChallengeCrest'
    ]
    for(let ii = 0; ii < rem.length; ii++){
        $("."+rem[ii]).remove()
    }//.forEach(function(el){$('.'+el).remove()})
    $('[data-DOOMqueue]').removeAttr('data-DOOMqueue')

    if(myTurn){
        $(`.miniGameCard.${mySide}`).removeClass('nonActivShow').addClass('activatingShow')
        $(`.miniGameCard.${opoSide}`).removeClass('activatingShow').addClass('nonActivShow')
    } else {
        $(`.miniGameCard.${opoSide}`).removeClass('nonActivShow').addClass('activatingShow')
        $(`.miniGameCard.${mySide}`).removeClass('activatingShow').addClass('nonActivShow')
    }
}
