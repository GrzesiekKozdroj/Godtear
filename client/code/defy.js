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
        $('.marchGuardWhite').removeClass('marchGuardWhite').removeClass('marchGuardWhite_selected')
        uniCancel()
    },
    feelThePoweer:()=>uniCancel(),
    hop:()=>{
        uniCancel()
        $('.hop').removeClass('hop')
    }



}