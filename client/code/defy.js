const uniCancel = ()=>{
    $('[data-glow]').removeAttr('data-glow')
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
        $('.marchGuardWhite')
            .removeClass('marchGuardWhite marchGuardWhite_selected')
        uniCancel()
    },
    marchGuardBlack:()=>{
        $('.marchGuardBlack').removeClass('marchGuardBlack').removeClass('marchGuardBlack_selected')
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


}