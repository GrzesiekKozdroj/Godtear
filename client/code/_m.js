const _m = {
    kick: function (origin, target) {
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') )
            socket.emit('rolloSkill',{ aim: (6 + baim), hurt:(6 + bdamage), socksMethod:"kick", hex, row })
    },
    fieryAxe:function(origin, target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') ) {
            let modelCount = $(`.hex_${hex}_in_row_${row}`).children('.smallCard').length
            let doneTimes = 0
        const interval = setInterval(function() {
            if (doneTimes < modelCount) { 
                doneTimes++
                const multiAction = doneTimes === 1 ? true : false
                socket.emit('rolloSkill',{ aim:(4 + baim), hurt:(5 + bdamage), socksMethod:"fieryAxe", hex, row, multiAction })
            } else 
                clearInterval(interval)
            
        }, 1200);
        }
    },
    fireball:function(origin, target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') ) {
            let modelCount = $(`.hex_${hex}_in_row_${row}`).children('.smallCard').length
            let doneTimes = 0
        const interval = setInterval(function() {
            if (doneTimes < modelCount) { 
                doneTimes++
                const multiAction = doneTimes === 1 ? false : true
                socket.emit('rolloSkill',{ aim: (4 + baim), hurt:(5 + bdamage), socksMethod:"fieryAxe", hex, row, multiAction })
            } else { 
                clearInterval(interval)
            }
        }, 1200);
        }
    },
    hootfoot:function(origin,target){
        const {hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass('whiteTeam'))
            socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"hootfoot", hex, row})
    },
    evilEye:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const {hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.unitModel.blackTeam')[0])
        if($target.length){
            socket.emit('rolloSkill',{aim:6+baim, hurt:0, socksMethod:"evilEye", hex, row})
        }else if( !$target.length )
            displayAnimatedNews({templateType:'info', msg0:'must target a follower'})
    },
    fireStorm:function(origin,taget){
        const {hex, row } = taget
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.unitModel.blackTeam').not('.destined_for_DOOM')[0])
        const doomed = $('.destined_for_DOOM')
        const allAviable = $($('.hexagon[data-glow]').children(`.${opoSide}.unitModel`))
        const key = doomed.length
        const multiInfo = {
            name:"Fire Storm",
            count:allAviable.length,
            color:"redFlame",
            klass:"destined_for_DOOM",
            ability:"fireStorm"
        }
        if( target.hasClass('blackTeam') && (doomed.length < 5 || doomed.length < allAviable.length) ) 
            {
                placeMark({hex, row, multiInfo, target, key})
                socket.emit('markedMan',{hex, row, multiInfo})
            } else displayAnimatedNews({templateType:'info', msg0:"target enemy units"})
        if( doomed.length + 1 === 5 || doomed.length + 1 === allAviable.length ) 
        {
            const { baim, bdamage } = extractBoons_Blights(origin)
            let doneTimes = 0
            const interval = setInterval(function() {
                const multiAction = doneTimes === 0 ? false : true
                if (doneTimes <= key) {
                    const {hex, row} = $(`[data-DOOMqueue="${doneTimes}"]`).parent('.hexagon').data()
                    socket.emit('rolloSkill',
                        { 
                            aim: (6 + baim), 
                            hurt:(5 + bdamage), 
                            socksMethod:"firestorm", 
                            hex, row, multiAction
                        }
                    )
                    setBoons_Blights($('.selectedModel'),{baim:0,bdamage:0})
                    $(`[data-DOOMqueue="${doneTimes}"]`).removeAttr('data-DOOMqueue')
                } else { 
                    clearInterval(interval)
                }
                doneTimes++
            }, 1100);
        }
    },
    warCry:function(origin,target){
        const {hex, row} = target
        const $target = origin
        const { baim } = extractBoons_Blights( $(`[data-name="${$target.data('name')}"]`) )
        if( baim < 1 )//is it really needed??
            socket.emit('rolloSkill',{socksMethod:"warCry", hex, row})
    },
    cleavingStrike: function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [3, 4, 5][unitSize]
        const hurt = [4, 5, 6][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt + bdamage), socksMethod:"cleavingStrike", hex, row })
    },
    rush:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{hex,row,socksMethod:"rush"})
    },
    intimidation:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [2, 4, 6][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:0, socksMethod:"intimidation", hex, row })
    },
    piercingStrike:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) ) {
            let modelCount = $(`.hex_${hex}_in_row_${row}`).children('.smallCard').length
            let doneTimes = 0
            const interval = setInterval(function() {
                if (doneTimes < modelCount && doneTimes < 2) { 
                    doneTimes++
                    const multiAction = doneTimes === 1 ? false : true
                    socket.emit('rolloSkill',{ aim: (5 + baim), hurt:(6 + bdamage), socksMethod:"piercingStrike", hex, row, multiAction })
                } else { 
                    clearInterval(interval)
                }
            }, 1000);
        }
    },
    sweepingSlash:function(origin,taget){
        const {hex, row } = taget
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.blackTeam').not('.destined_for_DOOM')[0])
        const doomed = $('.destined_for_DOOM')
        const allAviable = $($('.hexagon[data-glow]').children(`.${opoSide}.smallCard.blackTeam`))
        const key = doomed.length
        const multiInfo = {
            name:"Sweeping Slash",
            count:allAviable.length,
            color:"redFlame",
            klass:"destined_for_DOOM",
            ability:"sweepingSlash"
        }
        if( 
            target.hasClass('blackTeam') && (doomed.length < 2 || doomed.length < allAviable.length) &&
            !$(`.hex_${hex}_in_row_${row}`).children('.destined_for_DOOM').length
        ) 
            {
                placeMark({hex, row, multiInfo, target, key})
                socket.emit('markedMan',{hex, row, multiInfo})
            }
        if( doomed.length + 1 === 2 || doomed.length + 1 === allAviable.length ) 
        {
            const { baim, bdamage } = extractBoons_Blights(origin)
            let doneTimes = 0
            const interval = setInterval(function() {
                const multiAction = doneTimes === 0 ? false : true
                if (doneTimes <= key) {
                    const {hex, row} = $(`[data-DOOMqueue="${doneTimes}"]`).parent('.hexagon').data() ?
                    $(`[data-DOOMqueue="${doneTimes}"]`).parent('.hexagon').data() : clearInterval(interval)
                    socket.emit('rolloSkill',
                        { 
                            aim: (6 + baim), 
                            hurt:(5 + bdamage), 
                            socksMethod:"sweepingSlash", 
                            hex, row, multiAction
                        }
                    )
                    setBoons_Blights($('.selectedModel'),{baim:0,bdamage:0})
                    $(`[data-DOOMqueue="${doneTimes}"]`).removeAttr('data-DOOMqueue')
                } else { 
                    clearInterval(interval)
                }
                doneTimes++
            }, 1100);
        }
    },
    challenge:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) ){
            $('#gameScreen').append(challengeOptions(origin, target, "challenge",2,`apply two blights to ${$target.data('name')}`))
            socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"challenge", hex, row, curseCount:1 })
        } else displayAnimatedNews({templateType:'info', msg0:'target enemy model'})
    },
    illKillYouAll:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') )
            socket.emit('rolloSkill',{ aim: (6 + baim), socksMethod:"illKillYouAll", hex, row })
    },//NEEDS SKILL USE VALIDATION TO BE FINISHED!!!!!
    pathOfDestruction:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill', {hex,row,socksMethod:'pathOfDestruction'})
        // desc: "Titus may make a skill action. Then he may move 1 hex. Then he may make another skill action",
        // icon: self,
        // unused: true,
        // legendaryUsed: false,
        // m: "pathOfDestruction"
    },
    hack:function(origin,target){
            const { baim } = extractBoons_Blights(origin)
            const { hex, row } = target
            const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
            const unitSize = origin.siblings('.smallCard').length
            const aim = [5, 5, 6][unitSize]
            if($target.hasClass(`blackTeam`) )
                socket.emit('rolloSkill',{ aim: (aim + baim), socksMethod:"hack", hex, row })
    },
    surroundPound:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        let skillBonus = 0
        un_glow()
        highlightHexes ({colour:'blueGlow', dist:1}, $target)
        $('[data-glow="blueGlow"]')
            .each(function(){
                let thix = $(this)
                if
                ( 
                    thix.children('[data-name="GlorySeekers"]').length &&
                    ( thix.data('hex') !== origin.parent('.hexagon').data('hex') || 
                    thix.data('row') !== origin.parent('.hexagon').data('row') )
                )
                    skillBonus ++
            })
        const aim = [4, 4, 4][unitSize] + skillBonus
        const hurt = [3, 4, 5][unitSize] + skillBonus
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt + bdamage), socksMethod:"cleavingStrike", hex, row })
    },
    roarOfBattle:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.whiteTeam')[0])
        if( $target.hasClass(`champModel`) )
            socket.emit('rolloSkill',{ socksMethod:"roarOfBattle", hex, row })
    },
    outflank:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [6, 6, 6][unitSize] + baim
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, socksMethod:"outflank", hex, row })
    },
    roll:function(origin,target){
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"roll"})
    },
    newSpewWhite:function(origin,target){
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"newSpewWhite", multiAction:mySide})
    },
    fluSpew:function(origin,target){
        blights_spew_declaration({origin, abilName:"fluSpew"})
    },
    gooSpew:function(origin,target){
        blights_spew_declaration({origin, abilName:"gooSpew"})
    },
    newSpewBlack:function(origin,target){
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"newSpewBlack", multiAction:mySide})
    },
    nomNomNom:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') )
            socket.emit('rolloSkill',{ aim: (7 + baim), hurt:(7 + bdamage), socksMethod:"nomNomNom", hex, row })
    },
    buffet:function(origin,taget){
        const {hex, row } = taget
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.unitModel.blackTeam').not('.destined_for_DOOM')[0])
        const doomed = $('.destined_for_DOOM')
        const allAviable = $($('.hexagon[data-glow]').children(`.${opoSide}.unitModel`))
        const key = doomed.length
        const multiInfo = {
            name:"Buffet",
            count:allAviable.length,
            color:"redFlame",
            klass:"destined_for_DOOM",
            ability:"buffet"
        }
        if( target.hasClass('blackTeam') && (doomed.length < 3 || doomed.length < allAviable.length) ) 
            {
                placeMark({hex, row, multiInfo, target, key})
                socket.emit('markedMan',{hex, row, multiInfo})
            } else displayAnimatedNews({templateType:'info', msg0:"target enemy units"})
        if( doomed.length + 1 === 3 || doomed.length + 1 === allAviable.length ) 
        {
            const { baim, bdamage } = extractBoons_Blights(origin)
            let doneTimes = 0
            const interval = setInterval(function() {
                const multiAction = doneTimes === 0 ? false : true
                if (doneTimes <= key) {
                    const {hex, row} = $(`[data-DOOMqueue="${doneTimes}"]`).parent('.hexagon').data()
                    socket.emit('rolloSkill',
                        { 
                            aim: (7 + baim), 
                            hurt:(7 + bdamage), 
                            socksMethod:"buffet", 
                            hex, row, multiAction
                        }
                    )
                    setBoons_Blights($('.selectedModel'),{baim:0,bdamage:0})
                    $(`[data-DOOMqueue="${doneTimes}"]`).removeAttr('data-DOOMqueue')
                } else { 
                    clearInterval(interval)
                }
                doneTimes++
            }, 1100);
        }
    },
    slimed:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) ) {
            let modelCount = $(`.hex_${hex}_in_row_${row}`).children('.smallCard').length
            let doneTimes = 0
            const unitSize = origin.siblings('.smallCard').length
            const aim = [3, 4, 5][unitSize]
            const hurt = [5, 5, 5][unitSize]
        const interval = setInterval(function() {
            if (doneTimes < modelCount) { 
                doneTimes++
                const multiAction = doneTimes === 1 ? false : true
                socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt + bdamage), socksMethod:"slimed", hex, row, multiAction })
            } else { 
                clearInterval(interval)
            }
        }, 1000);
        }
    },
    slipAndSlide:function(origin,target){
        const {hex, row} = target
        const $target = origin
        const { bspeed } = extractBoons_Blights( $(`[data-name="${$target.data('name')}"]`) )
        if( bspeed < 1 )
            socket.emit('rolloSkill',{aim:0, hurt: 0, socksMethod:"slipAndSlide", hex, row})
    },
    regenerateWhite:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"regenerateWhite", hex, row })
    },
    regenerateBlack:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"regenerateBlack", hex, row })
    },
    onePunch:function(origin,target){
        const { baim, bdamage, healthleft } = extractBoons_Blights(origin)
        const { hex, row } = target
        let aim = 6 + baim + (healthleft === 7 ? 2 : 0)
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`))
            socket.emit('rolloSkill',{ aim: aim, hurt:(4 + bdamage), socksMethod:"onePunch", hex, row })
    },
    twoPunch:function(origin,target){
        const { baim, bdamage, healthleft } = extractBoons_Blights(origin)
        const { hex, row } = target
        let aim = 4 + baim + (healthleft === 7 ? 2 : 0)
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`))
            socket.emit('rolloSkill',{ aim: aim, hurt:(5 + bdamage), socksMethod:"twoPunch", hex, row })
    },
    footwork:function(origin,target){
        const {hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass('whiteTeam'))
            socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"footwork", hex, row})
    },
    feint:function(origin,target){
        const { baim, healthleft } = extractBoons_Blights(origin)
        const {hex, row } = target
        let aim = 5 + baim + (healthleft === 7 ? 2 : 0)
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        if($target){
            socket.emit('rolloSkill',{aim:aim, hurt:0, socksMethod:"feint", hex, row})
        }
    },
    theGreatTusk:function(origin,target){
        if(phase==='white'){
            $('#gameScreen').append(greatTuskBoons(origin, "theGreatTusk",1,`apply one boon to friends within 2 hexes`))
            highlightHexes({colour:'claimColor',dist:2},origin)
            socket.emit('HH', {color:'claimColor',dist:2, n:nickName})
        }
    },
    tongueTow:function(origin,target){
        const { hex, row } = target
        const $target = $(`.hex_${hex}_in_row_${row}`)
        if( $target.children('.claimedBanner.whiteTeam').length ){
            displayAnimatedNews({templateType:'info', msg0:'reposition your banner'})
            un_glow()
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            highlight_closest_path(origin.parent('.hexagon').data(),target)
            socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"tongueTow", hex, row})
        } else displayAnimatedNews({templateType:'info',msg0:'must target friendly banner'})
    },
    tongueLash:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const unitSize = origin.siblings('.smallCard').length
        const aim = [5, 6, 7][unitSize]
        const $target = $(`.hex_${hex}_in_row_${row}`)
        if( $target.children('.smallCard.blackTeam').length ){
            displayAnimatedNews({templateType:'info',msg0:'reposition model'})
            un_glow()
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.smallCard')[0]))
            $target.children('.claimedBanner').addClass('tongueLash_selected')
            socket.emit('rolloSkill',{aim:(baim+aim), hurt:0, socksMethod:"tongueLash", hex, row})
        } else displayAnimatedNews({templateType:'info',msg0:'must target enemy model'})
    },
    feelThePower:function(origin,target){
        const { hex, row } = target ;
        let destination = $(`.hex_${hex}_in_row_${row}`)
        if( destination.hasClass('objectiveGlow') ){
            socket.emit('rolloSkill',{hex,row,socksMethod:"feelThePower",hurt:0,aim:0})
            // setBoons_Blights(target,{
            //     bdodge:Number(target.attr('data-bdodge'))+1,
            //     bprotection:Number(target.attr('data-bprotection'))+1})
        } else
            displayAnimatedNews({templateType:'info', msg0:'must stand on objective hex'})
    },
    hop:function(origin,target){
        const { hex, row } = target
        // const parentHex = origin.parent('.hexagon')
        // parentHex.children('.smallCard').addClass('hop')
        socket.emit('rolloSkill',{hex,row,socksMethod:"hop",hurt:0,aim:0})
    },
    marchRhodriBlack:function(origin,target){
        march('RhodriBlack',target)
    },
    shieldBash:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (7 + baim), hurt:0, socksMethod:"shieldBash", hex, row })
    },
    swordSlash:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), hurt:(6 + bdamage), socksMethod:"swordSlash", hex, row })
    },
    marchRhodriWhite:function(origin,target){
        march('RhodriWhite',target)
    },
    answerTheCall:function(origin,target)
    {
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.unitModel.whiteTeam')[0])
        const { name, unitsize, side, type, unitname } = $target.data()
        if( $(`[data-name="${name}"].whiteTeam`).length < unitsize ){
            un_glow()
            setTimeout(()=>rallyActionDeclaration({ unitname, side, type, name }, 'answerTheCall'),800)
            displayAnimatedNews({
                templateType:'info',
                $attacker:$target, 
                skillName:'Answers The Call', 
                msg2:' of ', 
                $victim:origin
            })
        } else 
            displayAnimatedNews({templateType:'info',$attacker:$target, msg1:'has maximum unit size'})
        current_ability_method = null
    },
    hold:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.unitModel.whiteTeam')[0])
        if($target){
            socket.emit('rolloSkill',{hex,row,socksMethod:"hold",hurt:0,aim:0})
        }
    },
    bannerfall:function(origin,target){
        const { hex, row } = target
        if(phase==="black" && target)
            socket.emit('rolloSkill',{ socksMethod:"bannerfall", hex, row })
    },
    marchGuardBlack:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"marchGuardBlack", hex, row })
    },
    swordStrike:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [5, 5, 5][unitSize]
        const hurt = [4, 5, 6][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt + bdamage), socksMethod:"swordStrike", hex, row })
    },
    brace:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"brace", hex, row })
    },
    marchGuardWhite:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"marchGuardWhite", hex, row })
    },
    deathWind:function(origin,target){
        const { hex, row } = target
        const $target = $(`.hex_${hex}_in_row_${row}`).children('.claimedBanner[data-name="Mournblade"].whiteTeam')
        $target.addClass(`deathWind_selected`)
        socket.emit('forceMove',{h:hex, r:row, klass:"champion", callback:`deathWind`})
        displayAnimatedNews({templateType:'info',msg0:'click on banner then move it'})
    },
    raiseDeadChamps:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"raiseDeadChamps", hex, row })
        displayAnimatedNews({templateType:'info',msg0:'choose champions to rally'})
    },
    soulCleave:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') )
            socket.emit('rolloSkill',{ aim:(5+baim), hurt:(5+bdamage), socksMethod:"soulCleave", hex, row, multiAction:mySide})
    },
    graveSummons:function(origin,target){
        const {hex,row}=target
        un_glow()
        socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"graveSummons", hex, row})
    },
    forwardMinions:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"forwardMinions", hex, row })
    },
    graspingDead:function(origin,target){
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"graspingDead", multiAction:mySide})
    },
    depthsOfSorrow:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0,hurt:0,socksMethod:"depthsOfSorrow", hex, row})
    },
    deathsDoor:function(origin,target){//NO BONUS ADDED YET
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const bonu = !mySkillTrack.Knightshades[phase].rallied.used?0:1
        const aim = [4, 5, 5][unitSize]
        const hurt = [4, 4, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ 
                aim: (aim + baim + bonu), 
                hurt:(hurt + bdamage + bonu), 
                socksMethod:"deathsDoor", 
                hex, row 
            })
    },
    carefulMaster:function(origin,target){
        const { hex, row } = target
        $target = $(`.hex_in_${hex}_row_in_${row}`).children('[data-name="Mournblade"].whiteTeam')
        if( $target ){
            socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"carefulMaster", hex, row })
        } else if ( !$target ) 
        displayAnimatedNews({templateType:'info',msg0:'Must target your', $attacker:$target})
    },
    wheresMaster:function(origin,target){
        const { hex, row } = target
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Mournblade"].whiteTeam')[0])
        if ( $mourn.length )
            socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"wheresMaster", hex, row })
    },
    mirage:function(origin,target){
        const { hex, row } = target
        const $target = $(`.hex_${hex}_in_row_${row}`)
        if( $target.children('.claimedBanner.whiteTeam').length ){
            displayAnimatedNews({templateType:'info',msg0:'reposition your banner'})
            un_glow()
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"tongueTow", hex, row})
        } else displayAnimatedNews({templateType:'info',msg0:'must target friendly banner'})
    },
    voidWeaponChamp:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"voidWeaponChamp", hex, row})
    },
    lifeBlade:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const bW = bannerWarden(origin)
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (4 + baim + bW), hurt:(5 + bdamage), socksMethod:"lifeBlade", hex, row })
    },
    poisedToStrike:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"poisedToStrike", hex, row})
    },
    shadowWard:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const bW = bannerWarden(origin)
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim + bW), hurt:0, socksMethod:"shadowWard", hex, row })
    },
    phantomBanners:function(origin,target){
        const { hex, row } = target
        if( $( $(`.hex_${hex}_in_row_${row}`).children(`.claimedBanner.whiteTeam`)[0] ).length )
            socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"phantomBanners", hex, row })
    },
    voidWeapon:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"voidWeapon", hex, row })
    },
    lifeTrade:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [4, 5, 5][unitSize]
        const hurt = [4, 5, 6][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim:(aim+baim),hurt:(hurt+bdamage),multiAction:mySide,socksMethod:"lifeTrade",hex,row})
    },
    protect:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass('whiteTeam'))
            socket.emit('rolloSkill',{ aim:0,hurt:0,socksMethod:"protect",hex,row})
    },
    shadowSnare:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [4, 5, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:0, socksMethod:"shadowSnare", hex, row })
    },
    shadowStepWhite:function(origin,target){
        const { hex, row } = target
        if(origin.attr('data-speed') === origin.attr('data-speedleft'))
            socket.emit('rolloSkill',{ socksMethod:"shadowStepWhite",hex,row})
    },
    shadowStepBlack:function(origin,target){

    },
    crystalGlare:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if ( !crystalGlare_bb ){
            $('#gameScreen').append(crystalGlareOptions(origin, target, "crystalGlare",1,`choose one blight`))
        } else if ( crystalGlare_bb && $target.hasClass('blackTeam') )
            socket.emit('rolloSkill',{ aim: 0, hurt: 0, socksMethod:"crystalGlare", hex, row, cursePackage:crystalGlare_bb })
    },
    erosion:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), hurt:0, socksMethod:"erosion", hex, row })
    },
    blindingLight:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (4 + baim), hurt: (5 + bdamage), socksMethod:"blindingLight", hex, row })
    },
    crystalMirror:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.whiteTeam')[0])
        if ( !crystalGlare_bb ){
            $('#gameScreen').append(crystalGlareOptions(origin, target, "crystalMirror",1,`choose one boon`))
        } else if ( crystalGlare_bb )
            socket.emit('rolloSkill',{ socksMethod:"crystalMirror", hex, row, cursePackage:crystalGlare_bb })
    },
    meditation:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"meditation", hex, row })
    },
    marchNia:function(origin,target){
        march('Nia',target)
    },
    geodeX:function(origin,target){
            const { hex, row } = target
            const thizQuartz = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.whiteTeam')[0])
            if( !thizQuartz.siblings(`[data-name="Quartzlings"].${mySide}`).length ){
                highlightHexes({colour:'ob',dist:1},thizQuartz)
                $('[data-glow].hexagon').each(function(){
                    const thisObj = $(this)
                    if(thisObj.hasClass('objectiveGlow')){
                        un_glow()
                        socket.emit('rolloSkill', { socksMethod:'geode', hex, row })
                        return false
                    }
                })
            }
    },
    geode:function(origin,target){
        if( phase === "white" )
            socket.emit('rolloSkill',{ socksMethod:"geodeZ", key:mySide })
    },
    rockConcertWhite:_rockConcert,
    rockConcertBlack:_rockConcert,
    rollingStones:function(origin,target){
        socket.emit('rolloSkill',{ socksMethod:"rollingStones" })
    },
    stoneThrow:function(origin,target){//endpoint is cleaving strike
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [4, 5, 5][unitSize]
        const hurt = [4, 4, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt + bdamage), socksMethod:"stoneThrow", hex, row })
    },
    calcify:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"calcify", hex, row })
    },
    shimmer:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [4, 5, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:0, socksMethod:"shimmer", hex, row })
    },
    kerSplashBlack:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"kerSplashBlack", hex, row, multiAction:mySide })
    },
    kerSplashWhite:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"kerSplashWhite", hex, row, multiAction:mySide })
    },
    headbutt:function (origin, target) {
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), hurt:(5 + bdamage), socksMethod:"headbutt", hex, row })
    },
    lungingStrike:function (origin, target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if( !$target.length ) march('lungingStrikeMove',target)
        if(  $target.hasClass(`blackTeam`)  ){
            pocketBox = { hex, row }
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:1})
            highlight_closest_path(origin.parent('.hexagon').data(),target)
            if( !$('[data-glow]').length ){
                const { baim, bdamage } = extractBoons_Blights($('.selectedModel'))
                socket.emit('rolloSkill',{ aim: (6 + baim), hurt:(4 + bdamage), socksMethod:"lungingStrikeHit", hex, row })
            }
        }
    },
    underthrow:function (origin, target){
        const { hex, row} = target
        if( !pocketBox )
            socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"underthrowR", hex, row })
        if ( pocketBox )
            socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"underthrowM", hex, row })
    },
    jet:function (origin, target){
        const { hex, row } = target
        const $target = $(
            $(`.hex_${hex}_in_row_${row}`)
                .children('.smallCard[data-tenmodel^="Splashlings"].whiteTeam:not(".marchjet_selected")')[0]
            )
        if( $target.length && !$('.marchjet_selected').length ){
            socket.emit('rolloSkill',{ socksMethod: 'jet', hex, row })
        }
    },
    tsunami:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"tsunami", hex, row })
    },
    currentBlack:_current,
    currentWhite:_current,
    tideBlack:_tide,
    tideWhite:_tide,
    likeWaterWhite:_likeWater,
    likeWaterBlack:_likeWater,
    tremor:function(origin,target){
        socket.emit('rolloSkill',{ socksMethod:'tremor' })
    },
    stoneSpikes:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), hurt:0, socksMethod:"stoneSpikes", hex, row })
    },
    stoneStrenght:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="Landslide"].whiteTeam')[0])
        if( $target.length )
            socket.emit('rolloSkill',{aim:0,hurt:0,hex,row,socksMethod:"stoneStrenght"})
        else displayAnimatedNews({templateType:'info', msg0:'click on Landslide'})
    },
    runeweaving:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && !crystalGlare_bb)
            socket.emit('rolloSkill',{ aim: (6 + baim), hurt:0, socksMethod:"runeweaving", hex, row })
        else if ( crystalGlare_bb && $target.length )
            socket.emit('rolloSkill',{ aim:0,hurt:0,socksMethod:"runeweaving2", hex, row, cursePackage:crystalGlare_bb })
    },
    avalanche:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"avalanche", hex, row})
    },
    earthquakeWhite:_earthquake,
    earthquakeBlack:_earthquake,
    boulderBash:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (6 + baim), hurt:(6 + bdamage), socksMethod:"boulderBash", hex, row })
    },
    eruption:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"eruption", hex, row })
    },
    cursedGround:function(origin,target){//no endphase yet
        const { hex, row } = target
        socket.emit('rolloSkill',{ socksMethod:"cursedGround", hex, row })
    },
    deadlyCurse:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (4 + baim), hurt:(6 + bdamage), socksMethod:"deadlyCurse", hex, row })
    },
    callTotems:function(origin,target){
        $('[data-glow="greenGlow"]').removeAttr('data-glow');
        const { hex, row } = target
        const $targets = $(`[data-name="Hexlings"][data-tenmodel].${mySide}`)
        const $target = $($(`.hex_${hex}_in_row_${row}`).children(`[data-name="Hexlings"][data-tenmodel].${mySide}`)[0])
        $(`[data-name="Hexlings"][data-tenmodel].${mySide}`)
            .parent('.hexagon').each(function(){
                $(this).attr('data-glow','greenGlow')
                $(this).children('.top').attr('data-glow','greenGlow')
                $(this).children('.bottom').attr('data-glow','greenGlow')
            })
        if( $target.length ) 
            socket.emit('rolloSkill',{hex, row, socksMethod:'callTotems'})
        const multiInfo = {
            name:"Call Totems",
            count: $targets.length,
            color:"greenFlame",
            klass:"callTotems",
            ability:"callTotems",
            dedcount: 0
        }
        if( !$target.length ) 
            $('body').append(multi_choice_info_panel(multiInfo))
    },
    graspingCurse:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (6+baim), socksMethod:"graspingCurse", hex, row })
    },
    powerHex:function(origin,target){
        const curseCount = $('[data-glow].hexagon').children(`[data-name="Hexlings"].whiteTeam`).length
        $('#gameScreen')
            .append(
                challengeOptions(
                    origin, target, 
                    "powerHex",
                    curseCount,
                    `apply ${curseCount} blight${curseCount>1?'s':''} to enemy champions`))
    },
    rollTheBonesWhite:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill', { aim: 1, socksMethod: 'rollTheBonesWhite', hex, row} )
        //here I only 
    },
    rollTheBonesBlack:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill', { aim: 1, socksMethod: 'rollTheBonesBlack', hex, row} )
        //here I only 
    },
    rollTheBonesTransfer:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill', { socksMethod: 'rollTheBonesTransfer', hex, row} )
    },
    purgeMagic:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.whiteTeam')[0])
        if( $target.length )
            socket.emit('rolloSkill',{ socksMethod:"purgeMagic", hex, row, key:mySide })
    },
    hexBoltBlack:_hexBolt,
    hexBoltWhite:_hexBolt,
    attuneMagic:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        $('#gameScreen')
            .append(  challengeOptions(origin, {hex, row}, "attuneMagic",1,`give 1 boon to ${origin.data('name')}`)  )
    },
    piercingShot:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), socksMethod:"piercingShot", hex, row })
    },
    mysticArrow:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (3 + baim), hurt: (10 + bdamage), socksMethod:"mysticArrow", hex, row })
    },
    snipe:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (8 + baim), hurt: (4 + bdamage), socksMethod:"snipe", hex, row })
    },
    fieldInstruction:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`whiteTeam`) )
            socket.emit('rolloSkill',{ socksMethod:"fieldInstruction", hex, row })
    },
    faryFire:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), socksMethod:"faryFire", hex, row })
    },
    deathblow:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (6 + baim), socksMethod:"deathblow", hex, row })
    },
    aim:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"aim", hex, row })
    },
    fire:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [3, 4, 5][unitSize]
        const hurt = [3, 4, 5][unitSize]
        const hp = Number($target.attr('data-health'))
        const hpl = Number($target.attr('data-healthleft'))
        const killShot = $target.hasClass('champModel') && hp > hpl ? 1 : 0
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt+bdamage+killShot), socksMethod:"fire", hex, row })
    },
    blur:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"blur", hex, row })
    },
    faryFire_MR:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [3, 4, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), socksMethod:"faryFire_MR", hex, row })
    },
    plotRevenge:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`whiteTeam`) )
            socket.emit('rolloSkill',{ socksMethod:"plotRevenge", hex, row })
    },
    annoy:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        let aim = gangBoss($target) + 5 + baim
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, socksMethod:"annoy", hex, row })
    },
    backstabBlack:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        let aim = gangBoss($target) + 5 + baim
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, hurt:(5+bdamage), socksMethod:"backstabWhite", hex, row })
    },
    backstabWhite:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        let aim = gangBoss($target) + 5 + baim
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, hurt:(5+bdamage), socksMethod:"backstabBlack", hex, row })
    },
    leap:function(origin,target){
        const { hex, row } = target
        un_glow()
        highlightHexes({colour:'legendaryGlow',dist:2})
        socket.emit('rolloSkill',{ socksMethod:"leap", hex, row })
    },
    pounce:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const daddy = $(`.hex_${hex}_in_row_${row}`)
        const $target = $(daddy.children('.smallCard')[0])
        if( $target.hasClass('blackTeam') && daddy.attr('data-glow') === 'redGlow' )
            socket.emit('rolloSkill',{ socksMethod:"pounce1", hex, row })
        if( !target.length && daddy.attr('data-glow') === 'legendaryGlow' ){
            let aim = gangBoss($('.pounced')) + 6 + baim
            socket.emit('rolloSkill',{ socksMethod:"pounce2", hex, row, hurt:(6+bdamage), aim })
        }
    },
    sneak:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        const sneaker = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="SneakyStabbers"].whiteTeam')[0])
        if( sneaker.length )
            socket.emit('rolloSkill',{ socksMethod:"sneak", hex, row })
        else displayAnimatedNews({templateType:'info', msg0:'choose your stabber'})
    },
    irritate:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [3, 5, 7][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), socksMethod:"irritate", hex, row })
    },
    sprint:function(origin,target){
        const { hex, row } = target
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="SneakyStabbers"].whiteTeam')[0])
        if ( $mourn.length )
            socket.emit('rolloSkill',{ socksMethod:"sprint", hex, row })
    },
    letMeDoIt:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [7,5,3][unitSize]
        const hurt = [4,5,6][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt+bdamage), socksMethod:"letMeDoIt", hex, row })
    },
    brutalMasterWhite:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.whiteTeam[data-name="RedBandits"]')[0])
        if($target.hasClass(`whiteTeam`) )
            socket.emit('rolloSkill',{ socksMethod:"brutalMasterWhite", hex, row })
    },
    brutalMasterBlack:function(origin,target){
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.whiteTeam[data-name="RedBandits"]')[0])
        if($target.hasClass(`whiteTeam`) )
            socket.emit('rolloSkill',{ socksMethod:"brutalMasterBlack", hex, row })
    },
    jawbreaker:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const aim = 3 + baim + brutalMaster_h('aim')
        const hurt = 7 + bdamage + brutalMaster_h('damage')
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, hurt, socksMethod:"jawbreaker", hex, row })
    },
    whiplash:function(origin,target){//damage happens before moving, that should not be the case
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const aim = 5 + baim + brutalMaster_h('aim')
        const hurt = 5 + bdamage + brutalMaster_h('damage')
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, hurt, socksMethod:"whiplash", hex, row })
    },
    channelRage:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"channelRage", hex, row })
    },
    breakSpirit:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const aim = 6 + baim + brutalMaster_h('aim')
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim, socksMethod:"breakSpirit", hex, row })
    },
    beastlyCharge:function(origin,target){
        const { hex, row } = target
        origin.addClass('beastlyCharge_selected')
        if( $('[data-glow="greenGlow"]').length ){
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist:2})
        }
        socket.emit('rolloSkill',{ socksMethod:"beastlyCharge", hex, row })
    },
    ambushBlack:_ambush,
    shoot:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [3, 4, 5][unitSize]
        const hurt = [4, 4, 4][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt+bdamage), socksMethod:"shoot", hex, row })
    },
    induct:function(origin,target){
        const { hex, row } = target
        if ( !$('[data-glow]').length && $(`[data-name="RedBandits"][data-tenmodel].whiteTeam`).length < 5 )
            $(`[data-name="RedBandits"][data-tenmodel].whiteTeam`).parent('.hexagon').each(function(){
                const dad = $(this)
                if( dad.children(`[data-name="RedBandits"][data-tenmodel].whiteTeam`).length < 3 ){
                    dad.attr('data-glow','recruitGlow')
                    dad.children('.top').attr('data-glow','recruitGlow')
                    dad.children('.bottom').attr('data-glow','recruitGlow')
                    river = [ "Rangosh", mySide, "unit", "RedBandits" ]
                }
            })
        socket.emit( 'rolloSkill', { socksMethod:"induct", hex, row })
    },
    ambushWhite:_ambush,
    snowballsChance:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const dbaim = baim === 1 ? baim * 2 : baim
        const dbdamage = bdamage === 1 ? bdamage * 2 : bdamage
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (1+dbaim), hurt:(2+dbdamage), socksMethod:"snowballsChance", hex, row })
    },
    iceblade:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        const dbaim = baim === 1 ? baim * 2 : baim
        const dbdamage = bdamage === 1 ? bdamage * 2 : bdamage
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + dbaim), hurt:(5 + dbdamage), socksMethod:"iceblade", hex, row })
    },
    icebolt:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        const dbaim = baim === 1 ? baim * 2 : baim
        const dbdamage = bdamage === 1 ? bdamage * 2 : bdamage
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (7 + dbaim), hurt:(3 + dbdamage), socksMethod:"icebolt", hex, row })
    },
    forwardMinionsMorrigan:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"forwardMinionsMorrigan", hex, row })
    },
    frostyGlance:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const dbaim = baim === 1 ? baim * 2 : baim
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`))
            socket.emit('rolloSkill',{ aim: (5+dbaim), socksMethod:"frostyGlance", hex, row })
    },
    flashFreeze:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"flashFreeze", hex, row })
    },
    intenseCold:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{ socksMethod:"intenseCold", hex, row })
    },
    snowbladefight:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        $(`[data-glow]`).removeAttr('data-glow')
        highlightHexes({colour:'blueGlow',dist:1},$target)
        let AIIM = 0
        $(`[data-glow="blueGlow"].hexagon`).children(`[data-name="ColdBones"].whiteTeam`).each(()=>AIIM++)
        $(`[data-glow]`).removeAttr('data-glow')
        const aim = [1, 1, 1][unitSize]
        const hurt = [3, 4, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim + AIIM), hurt:(hurt+bdamage), socksMethod:"snowbladefight", hex, row })
    },
    soCoolMistress:function(origin,target){
        const { hex, row } = target
        const taget = $($(`.hex_${hex}_in_row_${row}`).children(`[data-name="Morrigan"].whiteTeam`)[0])
        const { name, side } = taget.data()
        if( name==="Morrigan" && side === mySide )
            $('#gameScreen').append( soCoolMistress( {side,name,socksMethod:'soCoolMistress',message:'choose one'} ) )
    },
    chillOut:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        $(`[data-glow]`).removeAttr('data-glow')
        highlightHexes({colour:'blueGlow',dist:1},$target)
        let AIIM = 0
        $(`[data-glow="blueGlow"].hexagon`).children(`[data-name="ColdBones"].whiteTeam`).each(()=>AIIM++)
        $(`[data-glow]`).removeAttr('data-glow')
        const aim = [1, 1, 1][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim + AIIM), socksMethod:"chillOut", hex, row })
    },
    royalSummonsBlack:_royalSummons,
    royalSummonsWhite:_royalSummons,
    regalBlessing:function(origin,target){
        const { hex, row } = target
        if( $(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="YoungDragons"].whiteTeam').length ){
            socket.emit('rolloSkill', { hex, row, socksMethod:'regalBlessing'})
            un_glow()
        }
    },
    firebrand:function(origin,target){
        socket.emit('rolloSkill',{ socksMethod:'firebrand' })
    },
    draconicRage:function(origin,target){
        socket.emit('rolloSkill',{ socksMethod:'draconicRage' })
    },
    roar:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), socksMethod:"roar", hex, row })
    },
    viciousBite:function(origin,target){
        socket.emit('rolloSkill',{ socksMethod:'viciousBite' })
    },
    viciousBite_onDrakes:function(origin, target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (4 + baim), hurt:(7 + bdamage), socksMethod:"viciousBite_onDrakes", hex, row })
    },
    rainOfFire:function(origin,target){
        socket.emit('rolloSkill',{ socksMethod:'rainOfFire' })
    },
    rainOfFire_onDrakes:function(origin, target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (7 + baim), hurt:(4 + bdamage), socksMethod:"rainOfFire_onDrakes", hex, row })
    },
    bite:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), hurt:(3 + bdamage), socksMethod:"bite", hex, row })
    },
    fieryBreath:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim), hurt:(3 + bdamage), socksMethod:"fieryBreath", hex, row })
    },
}