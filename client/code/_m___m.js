var _m_ = {
    pathof:thiz=>{
        titustepper[$('.selectedModel').data('side')] = false
        $('.pathof_selected').removeClass('pathof_selected')
        displayAnimatedNews({templateType:'info', msg0:'use another ability'})
        uniCancel()
    },
    illKillYouAll: (thiz) => {//Utterlu brokenos, keeps glow and bad blood on the recieving end
        //$('.illKillYouAll_selected').removeClass('illKillYouAll illKillYouAll_selected outflank')<----WAS THIS, NOW ITS BELOW
        thiz.removeClass('illKillYouAll illKillYouAll_selected outflank').removeAttr('style')
        un_glow()
        tituulti_addaction('illKillYouAll')
    if( !$('.illKillYouAll').length && !$('.outflank').length )
    {
        current_ability_method = null
        un_glow()
    }

    },
    roarOfBattle:()=>{
        $('.roarOfBattle_selected').removeClass('roarOfBattle_selected')
        add_action_taken("roarOfBattle")
        uniCancel()
    },
    outflank: thiz => {
        thiz.removeClass('outflank_selected outflank')
        if( !$('.outflank').length )
            {
                $('.outflank_source').removeClass('outflank_source')
                un_glow()
                current_ability_method = null
            }
    },
    roll:(thiz)=>rolloAndo(thiz,'roll'),
    rollingStones:(thiz)=>rolloAndo(thiz,'rollingStones'),
    tongueTow:()=>{
        if( $('.tongueTow_selected').length ){
            un_glow()
            $('.tongueTow_selected').removeClass('tongueTow_selected')
            current_ability_method = null
        }
    },
    tongueLash:()=>{
        if( $('.tongueLash_selected').length ){
            un_glow()
            $('.tongueLash_selected').removeClass('tongueLash_selected')
            current_ability_method = null
        }
    },
    marchRhodriBlack:()=>{
        marchExec('RhodriBlack','marchRhodriBlack')
    },
    marchRhodriWhite:()=>{
        marchExec('RhodriWhite','marchRhodriWhite')
    },
    shieldBash:()=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$('.shieldBash_selected'))
        } else {
            un_glow()
            $('.shieldBash_selected').removeClass(`shieldBash_selected`)
            setTimeout(()=>$('.shieldBash_selected').removeAttr('style'),100)
            current_ability_method = null
        }
    },
    marchGuardBlack:($thiz)=>{
        add_action_taken('marchGuardBlack')
        un_glow()
        $($thiz).removeClass('marchGuardBlack marchGuardBlack_selected')
        setTimeout(()=>$thiz.removeAttr('style'),100)
        if(!$('.marchGuardBlack').length ){
            current_ability_method = null
        }
    },
    marchGuardWhite:($thiz)=>{
        add_action_taken('marchGuardWhite')
        console.log('unglow below')
        un_glow()
        $($thiz).removeClass('marchGuardWhite marchGuardWhite_selected')
        setTimeout(()=>$thiz.removeAttr('style'),100)
        if(!$('.marchGuardWhite').length ){
            current_ability_method = null
        }
    },
    deathWind:($thiz)=>{
        current_ability_method = null
        add_action_taken('deathWind')
        un_glow()
        $(`.deathWind_selected`).removeClass(`deathWind_selected`)
    },
    forwardMinions:($thiz)=>{
        add_action_taken('forwardMinions')
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass('forwardMinions').removeClass(`forwardMinions_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.forwardMinions').length ){
                current_ability_method = null
            }
        }
    },
    wheresMaster:($thiz)=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass(`wheresMaster_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.wheresMaster_selected').length ){
                current_ability_method = null
            }
        }
    },
    shadowWard:($thiz)=>{
        un_glow()
        $(`.shadowWard_selected`).removeClass(`shadowWard_selected`)
    },
    phantomBanners:()=>{
        $('.phantomBanners_selected').removeClass('phantomBanners_selected')
    },
    marchNia:()=>{
        marchExec('Nia')
    },
    headbutt:()=>{
        current_ability_method = null
        un_glow()
        $('.headbutt_selected').removeClass('headbutt_selected')
    },
    marchlungingStrikeMove:(o)=>{
        if(pocketBox){
            marchExec('lungingStrikeMove')
            const { baim, bdamage } = extractBoons_Blights($('.selectedModel'))
            const { hex, row } = pocketBox
            un_glow()
            socket.emit('rolloSkill',{ aim: (6 + baim), hurt:(4 + bdamage), socksMethod:"lungingStrikeHit", hex, row })
        }
    },
    marchjet:($thiz)=>{
        if ( $('[data-glow].hexagon').length > 19 ) {
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:2},$thiz)
        } else if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else { 
            un_glow()
            $($thiz).removeClass(`marchjet_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if( !$('.marchjet_selected').length ){
                current_ability_method = null
                pocketBox = null
            }
        }
    },
    tsunami:()=>{
        displayAnimatedNews({templateType:'info', skillName:'Tsunami', skillIcon:'star', msg2:'move models'})
        un_glow()
        highlightHexes({colour:'blueGlow', dist: 2})
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
        $('[data-glow].hexagon').children(`.${team}`).each(function(){
            $(this).addClass('tsunami-moveable')
        })
        un_glow()
    },
    tsunamiMove:($thiz)=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass(`tsunami-selected tsunami-moveable`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.tsunami-moveable').length ){
                current_ability_method = null
                pocketBox = null
            }
        }
    },
    current:($thiz)=>{
        un_glow()
        $($thiz).removeClass('current').removeClass(`current_selected`)
        add_action_taken(`current${phase==='white'?'White':'Black'}`)
        setTimeout(()=>$thiz.removeAttr('style'),100)
        if(!$('.current').length )
            current_ability_method = null
    },
    tide:($thiz)=>{
        un_glow()
        $('.tide_selected').removeClass('tide_selected')
        add_action_taken()
        current_ability_method = null
    },
    earthquake:($thiz)=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass('earthquake_moveable').removeClass(`earthquake_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.earthquake_moveable').length ){
                current_ability_method = null
            }
        }
    },
    shootAndScoot:($thiz)=>{
        un_glow()
        $('.shootAndScoot_selected').removeClass('shootAndScoot_selected')
        displayAnimatedNews({templateType:'info', $attacker:$thiz, skillName:'Shoot & Scoot', skillIcon:'self'})
    },
    leap:$thiz=>{
        un_glow()
        displayAnimatedNews({templateType:'info', $attacker:$thiz, skillName:'Leap', skillIcon:'self'})
        add_action_taken('leap')
        current_ability_method = null
    },
    annoyed:($thiz)=>{
        if( $('[data-glow].hexagon').length > 2 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
            let o = {}
            o.hex = $thiz.parent('.hexagon').data('hex')
            o.row = $thiz.parent('.hexagon').data('row')
            highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
        } else {
            un_glow()
            $($thiz).removeClass(`annoyed_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            current_ability_method = null
            //add_action_taken('annoyed')
        }
    },
    sprint:$thiz=>{
        if ( $('[data-glow].hexagon').length > 19 ) {
            un_glow()
            if_moved_end_it()
            add_action_taken('sprint')
            highlightHexes({colour:'legendaryGlow',dist:2},$thiz)
        } else if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass(`sprint_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.sprint_selected').length ){
                current_ability_method = null
                pocketBox = null
                add_action_taken('sprint')
            }
        }
    },
    brokenJaw:$thiz=>{
        un_glow()
        displayAnimatedNews({templateType:'info', $victim:$thiz, skillName:'Broken Jaw', skillIcon:'skull', msg2:' Ends'})
        $('.brokenJaw_selected').removeClass('brokenJaw_selected')
    },
    whiplash:thiz=>{
        un_glow()
        $(thiz).removeClass(`whiplash_selected`)
        setTimeout(()=>thiz.removeAttr('style'),100)
    },
    beastlyCharge:thiz=>{
        if( $('[data-glow="legendaryGlow"].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},thiz)
        } else {
            un_glow()
            $(thiz).removeClass(`beastlyCharge_selected`)
            setTimeout(()=>thiz.removeAttr('style'),100)
            if(!$('.beastlyCharge_selected').length ){
                highlightHexes({colour:'redGlow',dist:1},thiz)
            }
        }
    },
    forwardMinionsMorrigan:($thiz)=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass('forwardMinionsMorrigan').removeClass(`forwardMinionsMorrigan_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.forwardMinionsMorrigan').length ){
                current_ability_method = null
              //  add_action_taken('sprint')
            }
        }
    },
    frostyGlance:thiz=>{
        $('.frostyGlance_selected').removeClass('frostyGlance')
        $('.frostyGlance_selected').removeClass('frostyGlance_selected')
        current_ability_method = null
        un_glow()
    },
    twoPunch:thiz=>{
        un_glow()
        $(thiz).removeClass(`twoPunch_selected`)
        setTimeout(()=>thiz.removeAttr('style'),100)
    },
    shadowStepWhite:thiz=>{
        un_glow()
        thiz.removeClass('shadowStepWhite shadowStepWhite_selected')
        if( !$('.shadowStepWhite').length ){
            current_ability_method = null
        }
    },
    shadowStepBlack:thiz=>{
        un_glow()
        thiz.removeClass('shadowStepBlack shadowStepBlack_selected')
        if( !$('.shadowStepBlack').length ){
            current_ability_method = null
        }
    },
    rush:$thiz=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass(`rush rush_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            //$('.selectedModel').removeClass('selectedModel')
            if(!$('.rush[data-tenmodel]').length ){
                current_ability_method = null
            }
        }
    },
    rapidDeployment:thiz=>{
        if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},thiz)
        } else {
            displayAnimatedNews({templateType:'info',skillName:'Rapid Deployment', skillIcon:'cogs',msg2:' Ends'})
            un_glow()
            $(thiz).removeClass(`rapidDeployment_selected`)
            setTimeout(()=>thiz.removeAttr('style'),100)
        }
    },
    summonsWalk:$thiz=>{
        if ( $('[data-glow].hexagon').length > 19 ) {
            un_glow()
            if_moved_end_it()
            add_action_taken( 'royalSummons' + phaser() )
            highlightHexes({colour:'legendaryGlow',dist:2},$thiz)
        } else if( $('[data-glow].hexagon').length > 6 ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass(`summonsWalk_selected summonsWalk`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.summonsWalk').length ){
                current_ability_method = null
                pocketBox = null
                add_action_taken( 'royalSummons' + phaser() )
            }
        }
    },
    deathMove:$thiz=>{
        if( $('[data-glow].hexagon').length > 7 ){
            un_glow()
            highlightHexes({colour:'deathMove',dist:1},$thiz)
        } else {
            un_glow()
            $($thiz).removeClass(`deathMove_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.deathMove_selected').length ){
                current_ability_method = null
                pocketBox = null
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                                                                                                */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var m__ = {
    newSpew: function (o){
        return true
    }
}

var __m = {//only on da otha sajd
    beastlyCharge:function(){
        displayAnimatedNews({templateType:'info',skillName:'Beastly Charge', skillIcon:'star'})
        $(`[data-name="Rangosh"].${opoSide}`).addClass('beastlyCharge_selected')
        un_glow()
        highlightHexes({colour:'legendaryGlow',dist:2})
    }
}

var bonusAction = {//sets of conditions requiered for bonus actions

}