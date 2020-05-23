const uniCancel = ()=>{
    $('[data-glow]').removeAttr('data-glow')
    $('.skilling_declaration').removeClass('skilling_declaration')
    current_ability_method = null
    defy = null
}
var defy = {
    forwardMinions:()=>{
        uniCancel()
        $('.forwardMinions').removeClass('forwardMinions').removeClass('forwardMinions_selected')
    },
    graspingDead:()=>{
        if( $(`[data-name="Knightshades"][data-tenmodel].whiteTeam`).length === 3 )
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


}