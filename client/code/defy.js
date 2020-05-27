const uniCancel = ()=>{
    $('[data-glow]').removeAttr('data-glow')
    $('.skilling_declaration').removeClass('skilling_declaration')
    current_ability_method = null
    defy = null
    cancellerName = null
}
var defy = {
    forwardMinions:()=>{
        uniCancel()
        $('.forwardMinions').removeClass('forwardMinions').removeClass('forwardMinions_selected')
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
        uniCancel()
        ,$('.hop').removeClass('hop')
    },
    twoPunch:()=>{
        uniCancel()
        $('.twoPunch_selected').removeClass('twoPunch_selected')
    },
    bannerfall:()=>uniCancel(),
    tongueTow:()=>{
        uniCancel()
        $('.tongueTow_selected').removeClass('tongueTow_selected')
    },
    tongueLash:()=>{
        uniCancel()
        $('.tongueLash_selected').removeClass('tongueLash_selected')
    },
    marchRhodriBlack:()=>{
        uniCancel()
        $('.marchRhodriBlack_selected').removeClass('marchRhodriBlack_selected')
    },
    shieldBash:()=>{
        uniCancel()
        $('.shieldBash_selected').removeClass('shieldBash_selected')
    },
    swordSlash:()=>uniCancel(),
    swordStrike:()=>uniCancel(),
    deathsDoor:()=>uniCancel(),
    deathWind:()=>{
        uniCancel()
        $('.deathWind_selected').removeClass('deathWind_selected')
    },
    soulCleave:()=>uniCancel(),
    shadowWard:()=>{
        uniCancel()
        $('.shadowWard_selected').removeClass('shadowWard_selected')
    },
    protect:()=>uniCancel(),
    shadowSnare:()=>uniCancel(),
    shadowStepWhite:()=>{
        uniCancel()
        $('.shadowStepWhite').removeClass('shadowStepWhite shadowStepWhite_selected')
    },
    poisedToStrike:()=>uniCancel(),
    shadowWard:()=>{
        uniCancel()
        $('.shadowWard_selected').removeClass('shadowWard_selected')
    },
    phantomBanners:()=>{
        uniCancel()
        $('.phantomBanners_selected').removeClass('phantomBanners_selected')
    },
    protect:()=>uniCancel(),
    shadowSnare:()=>uniCancel(),
    frostyGlance:()=>{
        uniCancel()
        $('.frostyGlance_selected').removeClass('frostyGlance_selected')
    },
    forwardMinionsMorrigan:()=>{
        uniCancel()
        $('.forwardMinionsMorrigan').removeClass('forwardMinionsMorrigan forwardMinionsMorrigan_selected')
    },
    frostyGlance:()=>{
        uniCancel()
        $('.frostyGlance_selected').removeClass('frostyGlance_selected')
    },
    flashFreeze:()=>uniCancel(),


}