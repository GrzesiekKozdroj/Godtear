var m_ = {
    kick:function (o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("kick")
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    fieryAxe:function (o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("fieryAxe",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed!')
        }
        current_ability_method = null
    },
    fireball:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("fireball",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed')
        }
        current_ability_method = null
    },
    hootfoot:function(o){
         
        add_action_taken("hootfoot")
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        displayAnimatedNews(`${target.data('name')}<br/>+1 speed`)
        setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))+1})
    },
    evilEye:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
         
        add_action_taken("evilEye")
        current_ability_method = null
        if( onHit(aim, target) ){
            displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
            setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))-1})
        } else 
            displayAnimatedNews('missed!')
        $('[data-glow]').removeAttr('data-glow')
    },
    firestorm:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("firestorm",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed')
        } 
        if( !$(`.destined_for_DOOM`).length ) $('#multi_choice_info_panel').remove()
        current_ability_method = null
    },
    warCry:function(o){
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        current_ability_method = null
         
        add_action_taken("warCry")
        setBoons_Blights(target,{ baim: Number(target.attr('data-baim')) + 1 })
        displayAnimatedNews(`${target.data('name')}<br/>+1 aim`)
    },
    cleavingStrike: function (o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("cleavingStrike")
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    rush:function(o){
        const { hex, row } = o
        let friends = $('.selectedModel').siblings('.smallCard')
         
        if(!friends.length){
            current_ability_method = null
            add_action_taken("rush")
            $('[data-glow]').removeAttr('data-glow')
        }
        displayAnimatedNews(`rushed`)
        makeAnim( $('.selectedModel.whiteTeam'), $(`.hex_${hex}_in_row_${row}`) )
        if (friends.length) {
            $('.selectedModel').removeClass('selectedModel')
            $(friends[0]).addClass('selectedModel')
        }
    },
    intimidation:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("intimidation")
            if( onHit(aim, target) )
            {
                displayAnimatedNews(`${target.data('name')}<br/>-1 dodge`)
                setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))-1})
            }
            else displayAnimatedNews("missed!")
        }
        current_ability_method = null
    },
    piercingStrike:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("piercingStrike",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, (target.data('type') === 'unit' ? 1 : 0) + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed')
        }
        current_ability_method = null
    },
    sweepingSlash:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("sweepingSlash",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,(target.data('type') === 'unit' ? 1 : 0) + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed')
        } 
        if( !$(`.destined_for_DOOM`).length ) $('#multi_choice_info_panel').remove()
            current_ability_method = null
    },
    challenge:function(o){
        const { hex, row , cursePackage, curseCount } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
         
        if( curseCount && !cursePackage && target.hasClass('whiteTeam')){
            let paybacked = $('.selectedModel').parent('.hexagon').data()
            $('#gameScreen').append(challengeOptions(target, paybacked, "challenge",1,"apply one blight to Titus"))
        }else if( !curseCount && cursePackage ){
            let curses = {}
            cursePackage.forEach( el=> curses[el]=-1 )
            setBoons_Blights(target,curses)
            add_action_taken("challenge")
            current_ability_method = null
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews(`${target.data('name')}<br/>-1 ${cursePackage.join(', ')}`)
        }
    },
    illKillYouAll:function(o){
        const { aim, hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if( onHit(aim, singleSpecimen) && !$('.illKillYouAll').length ){
            const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
            const allInRange = $('[data-glow]')
                        .children(`[data-name="${singleSpecimen.data('name')}"].${team}`)
            allInRange.addClass('illKillYouAll')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('Titus can<br/>reposition enemies')
        } else if( !onHit(aim, singleSpecimen) )
            displayAnimatedNews('Missed!')
    },//NEEDS SKILL USE VALIDATION TO BE FINISHED!!!!!
    pathOfDestruction:function(o){
        // name: "Path of Destruction",
        // desc: "Titus may make a skill action. Then he may move 1 hex. Then he may make another skill action",
        // icon: self,
        // unused: true,
        // legendaryUsed: false,
        // m: "pathOfDestruction"
    },
    hack:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("hack")
            if( onHit(aim, target) ){
                setBoons_Blights(target,{bprotection:-1})
                displayAnimatedNews (`${target.data('name')} <br/>-1 protection`)
            }
            else 
                displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    surroundPound:function(o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
             
            add_action_taken("surroundPound")
            $('[data-glow]').removeAttr('data-glow')
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    roarOfBattle:function(o){
        const { hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.champModel')[0])
         
        add_action_taken("roarOfBattle")
        if( !$('.illKillYouAll').length ){
            singleSpecimen.addClass('illKillYouAll')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('reposition champion')
        }
    },
    outflank:function(o){
        const { aim, hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
         
        add_action_taken("outflank")
        if( onHit(aim, singleSpecimen) && !$('.outflank').length ){
            const team = singleSpecimen.hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
            $('[data-glow]').removeAttr('data-glow')
            $('.selectedModel').removeClass('selectedModel')
            highlightHexes ({colour:'blueGlow', dist:1}, singleSpecimen)
            $('[data-glow="blueGlow"]')
                .each(function(){
                    let thix = $(this)
                    thix.children(`[data-name="GlorySeekers"].${team}`).addClass('outflank')
                })
            displayAnimatedNews('reposition<br/>Glory Seekers')
        } else if( !onHit(aim, singleSpecimen) )
            displayAnimatedNews('Missed!')
    },
    roll:function(o){
         
        add_action_taken("roll")
        if( !$('[data-glow]').length )
            highlightDirectPaths({origin: $('.selectedModel').parent('.hexagon').data(), distance:3, colour:'straitPaths'})
            $('.selectedModel').addClass('roll_selected')
    },
    newSpewWhite:function(o){//TRIGGERS TWICE
         
        add_action_taken("newSpewWhite")
        $(`[data-name="Retchlings"].${o.multiAction}`).each(function(){
            forceKill ( $(this) )
        })
        setTimeout(
            ()=>{rallyActionDeclaration({ 
                unitname:"Grimgut", 
                side:o.multiAction, 
                type:"champion", 
                name:"Retchlings" }, 'newSpewWhite')}
        ,700)
        current_ability_method = null
    },
    newSpewBlack:function(o){//TRIGGERS TWICE
         
        add_action_taken("newSpewBlack")
        $(`[data-name="Retchlings"].${o.multiAction}`).each(function(){
            forceKill ( $(this) )
        })
        setTimeout(
            ()=>{rallyActionDeclaration({ 
                unitname:"Grimgut", 
                side:o.multiAction, 
                type:"champion", 
                name:"Retchlings" }, 'newSpewWhite')}
        ,700)
        current_ability_method = null
    },
    raiseNewSpew:function(o){
        const { hex, row, multiAction} = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        graveyard[river[1]][river[3]].splice(0,1)
        if( $(`[data-name="Retchlings"].${multiAction}`).length < 5 ){
            rallyActionDeclaration({ unitname:"Grimgut", side:multiAction, type:"champion", name:"Retchlings" }, `newSpewWhite`)
        } else {
            river = null
            current_ability_method = null
            $('[data-glow]').removeAttr('data-glow')
        }
    },
    raiseDead:function(o){
        const { hex, row, key} = o
        add_action_taken(key?key:"rallied")
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        $('[data-glow]').removeAttr('data-glow')
        displayAnimatedNews(`${river[3]}<br/>recruited`)
        graveyard[river[1]][river[3]].splice(0,1)
        const $thiz = $(thiz.children('.smallCard')[0])
        const $brothers = $($(`[data-name="${$thiz.data('name')}"][data-side=${$thiz.data('side')}]:not( [data-tenmodel="${$thiz.data('tenmodel')}"] )`)[0])
        propagate_BB_s($brothers,$thiz)
        river = null
        current_ability_method = null
    },
    fluSpew:function(o){
        blights_spew_recieved({o, blight:"bdamage",m:"fluSpew"})
    },
    gooSpew:function(o){
        blights_spew_recieved({o, blight:"bdodge",m:"gooSpew"})
    },
    nomNomNom: function (o) {
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("nomNomNom")
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    buffet:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("buffet",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed')
        } 
        if( !$(`.destined_for_DOOM`).length ) $('#multi_choice_info_panel').remove()
        current_ability_method = null
    },
    slimed:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("slimed",multiAction)
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews ('no damage!')
            else displayAnimatedNews ('missed')
        }
        current_ability_method = null
    },
    slipAndSlide:function(o){
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        displayAnimatedNews(`${target.data('name')}<br/>+1 speed`)
         
        add_action_taken("slipAndSlide")
        current_ability_method = null
        setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))+1})
        $('[data-glow]').removeAttr('data-glow')
    },
    regenerateWhite:function(o){
        const { hex, row } = o
        const target = $(`.hex_${hex}_in_row_${row}`).children('.smallCard')
        current_ability_method = null
         
        add_action_taken("regenerateWhite")
        displayAnimatedNews(`${target.data('name')} heals<br/>2 wounds`)
        healLife(target)
    },
    regenerateBlack:function(o){
        const { hex, row } = o
        const target = $(`.hex_${hex}_in_row_${row}`).children('.smallCard')
        current_ability_method = null
        add_action_taken("regenerateBlack")
        healLife(target)
        displayAnimatedNews(`${target.data('name')} heals<br/>2 wounds`)
    },
    onePunch:function(o){console.log('onePunch')
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        console.log('targets length:', targets.length)
        if(targets.length){
            const target = $(targets[0])
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("onePunch")
            if( onHit(aim, target) ){
                //bonus action added
                if(target.hasClass('blackTeam') && !mySkillTrack.Halftusk.black.twoPunch.used){
                    let myTusk = $('[data-name="Halftusk"][data-tenmodel].whiteTeam')
                    myTusk.attr('data-actionstaken',(Number(myTusk.attr('data-actionstaken'))-1) )
                }else if(target.hasClass('whiteTeam') && !opoSkillTrack.Halftusk.black.twoPunch.used){
                    let opoTusk = $('[data-name="Halftusk"][data-tenmodel].blackTeam')
                    opoTusk.attr('data-actionstaken',(Number(opoTusk.attr('data-actionstaken'))-1) )
                }
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    twoPunch:function(o){//needs bonus action defined
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        $('[data-glow]').removeAttr('data-glow')
        if(targets.length){
            const target = $(targets[0])
            const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
            $('.selectedModel').addClass('twoPunch_selected')
            highlightHexes({colour:'legendaryGlow',dist:1})
            add_action_taken("twoPunch")
            if( onHit(aim, target) )//allow for bonus one hex movement for Halftusk action here
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    footwork:function(o){
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
         
        add_action_taken("footwork")
        setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))+1})
        current_ability_method = null
        displayAnimatedNews(`${target.data('name')}<br/>+1 dodge`)
        $('[data-glow]').removeAttr('data-glow')
    },
    feint:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
         
        add_action_taken("feint")
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
        if( onHit(aim, target) ){
            displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
            setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
        } else 
            displayAnimatedNews('missed!')
    },
    theGreatTusk:function(o){
        const { hex, row, cursePackage} = o
        displayAnimatedNews(`${[...cursePackage[0]].slice(1).join('')}<br/>boon added`)
        const team = $(`.hex_${hex}_in_row_${row}`).children('.smallCard').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        const ARR = [...$($(`[data-glow].hexagon`).children('.'+team)) ].map(el=>$(el).data('name'))
        const uniqSet = [...new Set(ARR)]
         
        add_action_taken("legendary")
        current_ability_method = null
        uniqSet.forEach(el=>{
            const thiz = $(`[data-name="${el}"].${team}`)
            setBoons_Blights( thiz,{[cursePackage[0]]:Number(thiz.attr(`data-${cursePackage[0]}`))+1})
        })
    },
    tongueTow:function(o){
        if( !$('.tongueTow_selected').length ){
            const { hex, row } = o
            const $target = $(`.hex_${hex}_in_row_${row}`)
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("tongueTow")
            current_ability_method = null
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
            displayAnimatedNews(`tongue towing<br/>banner`)
        }
    },
    tongueLash: function (o) {
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken("tongueLash")
            if( onHit(aim, target) && !$('.tongueLash_selected').length ){
                    target.addClass('tongueLash_selected')
                    highlightHexes({colour:'greenGlow',dist:1},target)
                    highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                    displayAnimatedNews(`tongue towing<br/>victim`)
                }
            else {
                 
                displayAnimatedNews ("missed!")
            }
        }
        current_ability_method = null
    },
    feelThePower:function(o){
        const { hex, row } = o
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews('Froglodytes <br/>+1 dodge & shield')         
        add_action_taken("feelThePower")
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
        setBoons_Blights(target,{
            bdodge:Number(target.attr('data-bdodge'))+1,
            bprotection:Number(target.attr('data-bprotection'))+1})
        //displayAnimatedNews('Froglodytes <br/>+1 dodge & shield')
    },
    hop:function(o){//seems to have a bug that I can't fix....
        const { hex, row } = o
        if(hex&&row){
            const parentHex = $('.selectedModel').parent('.hexagon')
            parentHex.children('.smallCard').addClass('hop')
            add_action_taken("hop")
            console.log('hop: ',hex,' ', row)
            $('.selectedModel').removeClass('selectedModel')
            $(parentHex.children('.hop')[0])
                .detach()
                .appendTo(`.hex_${hex}_in_row_${row}`)
                .removeClass('hop')
            $(parentHex.children('.hop')[0]).addClass('selectedModel')
            //$($(`.hex_${hex}_in_row_${row}`).children('.smallCard'))
            if(!parentHex.children('.smallCard').length){
                $('.hop').removeClass('hop')
                $('[data-glow]').removeAttr('data-glow')
                current_ability_method  = null
            }
        }
    },
    marchRhodriBlack:function(o){
        displayAnimatedNews('Rhodri<br/>marching')
    },
    shieldBash:function(o){//shows circle, not directly away, and allows insta move, without single stepping
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            $('[data-glow]').removeAttr('data-glow')
             
            add_action_taken('shieldBash')
            if( onHit(aim, target) ){
                displayAnimatedNews(`Rhodri bashed<br/>${target.data('name')}`)
                target.addClass('shieldBash_selected')
                setBoons_Blights(target,{bdamage:Number(target.attr('data-bdamage'))-1})
                highlightHexes ({colour:'legendaryGlow', dist:2},target)
                highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o,'away')
            }
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    swordSlash: function (o) {
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('swordSlash')
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    marchRhodriWhite:function(o){
        displayAnimatedNews('Rhodri<br/>marching')
    },
    answerTheCall:function(o){
        current_ability_method = null
        //add_action_taken('answerTheCall')
    },
    hold:function(o){
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
         
        add_action_taken('hold')
        setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))+1})
        current_ability_method = null
        displayAnimatedNews(`${target.data('name')}<br/>+1 protection`)
        $('[data-glow]').removeAttr('data-glow')
    },
    bannerfall:function(o){
        const { hex, row } = o
        const $target = $(`.hex_${hex}_in_row_${row}.objectiveGlow`)
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        $(`.claimedBanner.${team}[data-name="Rhodri"]`).remove()
        m.universal.claim( $target, team, "legendary")
        //socket.emit('stakeClaim',{hex, row, key:"legendary"})
    },
    marchGuardBlack:function(o){
        const {  hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        add_action_taken('marchGuardBlack')
        if(!$('.marchGuardBlack').length){
            $(`[data-name="${singleSpecimen.data('name')}"].${team}`).addClass('marchGuardBlack')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('Guards<br/>march')
        }
    },
    swordStrike:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('swordStrike')
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    brace:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.unitModel')[0])
        const { bprotection } = extractBoons_Blights($target)
         
        add_action_taken('brace')
        setBoons_Blights($target,{bprotection: bprotection + 1})
        displayAnimatedNews("Household Guards<br/>+1 protection")
        current_ability_method = null
    },
    marchGuardWhite:function(o){
        const {  hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if(!$('.marchGuardWhite').length){
            $(`[data-name="${singleSpecimen.data('name')}"].${team}`).addClass('marchGuardWhite')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('Guards<br/>march')
        }
    },
    deathwind:function(o){
        displayAnimatedNews('Mournblade moves<br/>banner')
    },
    raiseDeadChamps:function(o){
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes ({colour:'greenGlow', dist: 3})
        const $Mournblade = $('.selectedModel')
        const { hex, row } = o
        const team = $Mournblade.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        $('[data-glow="greenGlow"].hexagon').children(`.champModel.${team}.death`).each(function(){
            rallyChampion( $(this) )
        })
        if_moved_end_it()
        add_action_taken("raiseDeadChamps")
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')        
    },
    soulCleave:function(o){console.log('hiw')
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('soulCleave')
            if( onHit(aim, target) ){
                const team = target.hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
                //resurrection starts here
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!");
            if($(`[data-name="Knightshades"][data-tenmodel].${team}`).length < 3)
                rallyActionDeclaration({ unitname:"Mournblade", side:o.multiAction, type:"champion", name:"Knightshades" })
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    graveSummons:function(o){
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes({colour:'claimColor',dist:3})
        add_action_taken('graveSummons',true, 'Mournblade')
        myTurn? mySkillTrack.Mournblade.white.claimed.used = true:opoSkillTrack.Mournblade.white.claimed.used = true
        current_ability_method = null
        displayAnimatedNews('double click<br/>to claim')
    },
    forwardMinions:function(o){
        const {  hex, row } = o
        const boss = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = boss.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if( !$('.forwardMinions').length ){
            add_action_taken('forwardMinions',false,'Mournblade')
             
            $('[data-glow]').children(`[data-name="Knightshades"].${team}[data-tenmodel]`).addClass('forwardMinions')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('Knightshades<br/>shamble onwards')
        }
    },
    graspingDead:function(o){console.log('first')
        $(`[data-name="Knightshades"].${o.multiAction}[data-tenmodel]`).each(function(){
            forceKill ( $(this) )
        })
         
        add_action_taken('legendary')
        setTimeout(
            ()=>{
                $('[data-glow]').removeAttr('data-glow')
                rallyActionDeclaration({ 
                    unitname:"Mournblade", 
                    side:o.multiAction, 
                    type:"champion", 
                    name:"Knightshades",
                    dist:3 }, 'graspingDead')}
        ,700)
        current_ability_method = null
    },
    raiseGraspingDead:function(o){console.log('second')
        const { hex, row, multiAction} = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        graveyard[river[1]][river[3]].splice(0,1)
        $('[data-glow]').removeAttr('data-glow')
        if( $(`[data-name="Knightshades"].${multiAction}[data-tenmodel]`).length < 3 ){//[unitname,side,type,name]
            rallyActionDeclaration({ unitname:"Mournblade", side:multiAction, type:"champion", name:"Knightshades", dist:3 }, `graspingDead`);
        } else {
            river = null
            current_ability_method = null
        }
    },
    depthsOfSorrow:function(o){
        displayAnimatedNews("Knightshades<br/>+1 aim")
        current_ability_method = null
        add_action_taken('depthsOfSorrow')
        if_moved_end_it()
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const { baim } = extractBoons_Blights($target)
        setBoons_Blights($target,{baim:baim+1})
    },
    deathsDoor:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('deathsDoor')
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    carefulMaster:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Mournblade"]')[0])
        const { bdodge } = extractBoons_Blights($target)
        displayAnimatedNews("Mournblade<br/>+1 dodge")
        current_ability_method = null
        add_action_taken('carefulMaster')
        $('[data-glow]').removeAttr('data-glow')
        setBoons_Blights($target,{bdodge:bdodge+1})
    },
    wheresMaster:function(o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Mournblade"]')[0])
        $('[data-glow]').removeAttr('data-glow')
         
        add_action_taken('wheresMaster')
        if ( Number($mourn.attr('data-healthleft')) < 1 ){
            displayAnimatedNews('Mournblade<br/>rallies')
            rallyChampion( $mourn )
            current_ability_method = null
        } else {
            displayAnimatedNews('Mournblade<br/>moves')
            $mourn.addClass('wheresMaster_selected')
            highlightHexes({colour:'legendaryGlow',dist: 2}, $mourn)
        }
    },
    mirage:function(o){
        if( !$('.tongueTow_selected').length ){
            const { hex, row } = o
            const $target = $(`.hex_${hex}_in_row_${row}`)
            $('[data-glow]').removeAttr('data-glow')
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
             
            add_action_taken('mirage')
            current_ability_method = null
            displayAnimatedNews(`mirage<br/>banner moved`)
        }
    },
    voidWeaponChamp:function(o){
        const { hex, row } = o
        displayAnimatedNews("Finvarr<br/>+1 to damage")
        add_action_taken('voidWeaponChamp')
         
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Finvarr"]')[0])
        setBoons_Blights($target,{ bdamage: Number( $target.attr('data-bdamage') ) + 1 })
    },
    lifeBlade:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it('lifeBlade')
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                healLife( $('.selectedModel[data-name="Finvarr"]'), 1)
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    poisedToStrike:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Finvarr"]')[0])
        displayAnimatedNews("Finvarr<br/>+1 to speed")
        add_action_taken('poisedToStrike')
         
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
        setBoons_Blights($target,{ bspeed: Number( $target.attr('data-bspeed') ) + 1 })
    },
    shadowWard:function(o){
        const { aim, hex, row } = o
        const targets = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        if(targets.length && !$('.shadowWard_selected').length){
            const target = $(targets[0])
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('shadowWard')
            if( onHit(aim, target) ){
                displayAnimatedNews(`reposition<br/>${target.data('name')}`)
                target.addClass('shadowWard_selected')
                highlightHexes({colour:'legendaryGlow',dist: 1}, $('.shadowWard_selected'))
            }else displayAnimatedNews ("missed!")
        }
    },
    phantomBanners:function(o){ // current_ability_methodDOESN"T GET NULL!!!!
        const { hex, row } = o
        add_action_taken('legendary')
        if_moved_end_it()
        const $banner = $($(`.hex_${hex}_in_row_${row}`).children(`.claimedBanner`)[0])
        const team = !$banner.hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
        if( !$('.phantomBanners_selected').length && $banner.hasClass(team) ){
            $banner.addClass('phantomBanners_selected')
        }
    },
    voidWeapon:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        displayAnimatedNews('Shadow Sentinels<br/>+1 aim')
        add_action_taken('voidWeapon')
         
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
        setBoons_Blights($target,{baim:Number($target.attr('data-baim'))+1})
    },
    lifeTrade:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('lifeTrade')
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) ){
                        if( $('.selectedModel').siblings('.smallCard').length < 2 )
                        rallyActionDeclaration({ 
                            unitname:"Finvarr", 
                            side:multiAction, 
                            type:"champion", 
                            name:"ShadowSentinels" })
                        displayAnimatedNews(`dead raise<br/>again`)
                        moveLadder(target, target.data('stepsgiven'))
                    }else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    protect:function(o){
        const { hex, row } = o
        const targets = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        displayAnimatedNews(`${targets.data('name')}<br/>+1 protection`)
        $('[data-glow]').removeAttr('data-glow')
        add_action_taken('protect')
        current_ability_method = null
        setBoons_Blights(targets,{bprotection:Number( targets.attr('data-bprotection') )+1})
    },
    shadowStepWhite:function(o){
        const { hex, row } = o
        $('[data-glow').removeAttr('data-glow')
        const targetHex = $(`.hex_${hex}_in_${row}`)
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if( !$('.shadowStepWhite').length )
        $(`[data-tenmodel][data-name="ShadowSentinels"].${team}`).each(function(){
            $(this)
                .addClass('shadowStepWhite')
                .attr('data-actionstaken',2)
        })
    },
    shadowStepBlack:function(o){

    },
    shadowSnare:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('shadowSnare')
            if( onHit(aim, target) ){
                setBoons_Blights(target,{ bspeed:Number( target.attr('data-bspeed') )-1 })
                displayAnimatedNews(`${target.data('name')}<br/>-1 speed`)
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    crystalGlare:function(o){
        const { hex, row, cursePackage } = o
        const { curseType } = cursePackage
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews(`${$target.data('name')}<br/>-1 ${[...curseType].slice(1).join('')}`)
         
        add_action_taken('crystalGlare')
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) - 1 })
        crystalGlare_bb = null
    },
    erosion:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
         
        $('[data-glow]').removeAttr('data-glow')
        add_action_taken('erosion')
        current_ability_method = null
        if(targets.length){
            const target = $(targets[0])
            if( onHit(aim, target) ){
                setBoons_Blights(target,{ bprotection:Number( target.attr('data-bprotection') )-1 })
                displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
            }else displayAnimatedNews ("missed!")
        }
    },
    blindingLight:function (o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('blindingLight')
            if( onHit(aim, target) ){
                setBoons_Blights(target,{ baim:Number( target.attr('data-baim') )-1 })
                displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    crystalMirror:function(o){
        const { hex, row, cursePackage } = o
        const { curseType } = cursePackage
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) + 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>+1 ${[...curseType].slice(1).join('')}`)
         
        add_action_taken()
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        crystalGlare_bb = null
    },
    meditation:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        setBoons_Blights($target,{baim:Number($target.attr('data-baim'))+1})
        displayAnimatedNews('Nia<br/>+1 aim')
        add_action_taken()
         
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
    },
    marchNia:function(o){
        displayAnimatedNews('Nia<br/>marching')
    },
    geode:function(o){
        const { hex, row } = o
        const thizQuartz = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = thizQuartz.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        makeObjectiveHex(row,hex)
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes({colour:'greenGlow',dist:2},thizQuartz)
        forceKill(thizQuartz)
        $('[data-glow].hexagon').each(function(){
            const niahere = $(this)
            if ( niahere.children(`[data-name="Nia"].${team}`).length ){
                $('[data-glow]').removeAttr('data-glow')
                highlightHexes({colour:'claimColor',dist:2},$(niahere.children(`[data-name="Nia"].${team}`)[0]))
                $('[data-glow]').each(function(){
                    const notThat = $(this)
                    if( notThat.data('hex') !== hex || notThat.data('row')!==row )
                        notThat.removeAttr('data-glow')
                })
                return false
            }
        })
        add_action_taken()
         
        current_ability_method=null
        displayAnimatedNews('Geode')
    },
    rollingStones:function(o){
        displayAnimatedNews('rolling<br/>stones')
        if( !$('[data-glow]').length )
            highlightDirectPaths({origin: $('.selectedModel').parent('.hexagon').data(), distance:3, colour:'straitPaths'})
            $('.selectedModel').addClass('roll_selected')
    },
    calcify:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Quartzlings"]')[0])
        if ( $target.length && !$target.siblings('.smallCard').length ){
            highlightHexes({colour:'greenGlow',dist:1},$target)
            $('[data-glow].hexagon').each(function(){
                const thiz = $(this)
                if( thiz.hasClass('objectiveGlow') ){
                    makeObjectiveHex(row,hex)
                    forceKill($target)
                    displayAnimatedNews('calcify')
                    return false
                }
            })
            add_action_taken()
             
        }
        current_ability_method=null
        $('[data-glow]').removeAttr('data-glow')
    },
    shimmer: function (o) {
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                displayAnimatedNews(`${target.data('name')}<br/>-1 speed`)
                setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))-1})
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    kerSplash:function(o){
        const { hex, row, multiAction } = o
        const team = multiAction === mySide ? 'whiteTeam' : 'blackTeam'
        const $target = $($(`.hex_${hex}_in_row_${row}`).children(`[data-name="Splashlings"].${team}`)[0])
        if( $target.length && !$target.siblings('.smallCard').length ){
            displayAnimatedNews("Ker-splash!")
            forceKill($target)
            makeAnim($(`[data-name="RaithMarid"].${team}`),$(`.hex_${hex}_in_row_${row}`))
            add_action_taken()
             
        }
        current_ability_method=null
        $('[data-glow]').removeAttr('data-glow')
    },
    headbutt:function(o){//if champ killed he should be able to push 3 inches instead
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            const hedbut = (n='')=>{
                $('[data-glow]').removeAttr('data-glow')
                highlightHexes({colour:'legendaryGlow',dist:1},target)
                target.addClass('headbutt_selected')
                displayAnimatedNews(`${n}headbutt<br/>${target.data('name')}`)
            }
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else hedbut()
                else hedbut("no damage!<br/>")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    marchlungingStrikeMove:function (o){
        displayAnimatedNews(`Raith'Maid<br/>marching`)
    },
    lungingStrikeHit:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
        pocketBox = null
    },
    underthrowR:function (o){ 
        const { hex, row } = o
        if ( !pocketBox ){
            removeObjectiveHex(row,hex)
            pocketBox = true
        }
    },
    underthrowM:function(o){
        const { hex, row } = o
        if ( pocketBox ){
            makeObjectiveHex(row,hex)
            $('[data-glow]').removeAttr('data-glow')
            pocketBox = null
            add_action_taken()
             
            current_ability_method = null
            displayAnimatedNews('underthrow')
        }
    },
    marchjet:function (o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Splashlings"]')[0])
        $('[data-glow]').removeAttr('data-glow')
        displayAnimatedNews('Splashling<br/>jet')
        $mourn.addClass('marchjet_selected')
        highlightHexes({colour:'legendaryGlow',dist: 3}, $mourn)
        current_ability_method = null
         
        add_action_taken()
    },
    tsunami:function(o){
        const { hex, row } = o
        const $targetHex = $(`.hex_${hex}_in_row_${row}`)
        if ( $targetHex.attr('data-glow') === 'greenGlow' )
            makeAnim($('.selectedModel'),$targetHex,_m_.tsunami)
        if ( 
            $('.tsunami-selected').length && 
            $targetHex.attr('data-glow') === 'legendaryGlow' && 
            onlyOneStep($targetHex, $('.tsunami-selected') )
        )
            makeAnim($('.tsunami-selected'),$targetHex,_m_.tsunamiMove)
    },
    tsunamiMoveDeclaration:function(o){
        const { hex, row } = o
        $('.tsunami-selected').removeClass('tsunami-selected')
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.tsunami-moveable')[0])
        $target.removeClass('tsunami-moveable').addClass('tsunami-selected')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes({colour:'legendaryGlow',dist:2},$target)
    },
    current:function(o){
        const {  hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if(!$('.current').length){
            add_action_taken('current')
             
            $(`[data-name="${singleSpecimen.data('name')}"].${team}`).addClass('current')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('current')
        }
    },
    tide:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('tide')
            if( onHit(aim, target) ){
                displayAnimatedNews('tide')
                $('[data-glow]').removeAttr('data-glow')
                target.addClass('tide_selected')
                highlightHexes({colour:"legendaryGlow",dist:1},target)
                //movement of a victim herree
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    tremor:function(o){
        team = $('.selectedModel').hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
        $('[data-glow]').children('.'+team).each(function(){
            const thiz = $(this)
            const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights(thiz)
            const setUp = {}
            if(baim>0)setUp.baim=0
            if(bdamage>0)setUp.bdamage=0
            if(bspeed>0)setUp.bspeed=0
            if(bdodge>0)setUp.bdodge=0
            if(bprotection>0)setUp.brpotection=0
            setBoons_Blights(thiz,setUp)
        })
        $('[data-glow]').removeAttr('data-glow')
        add_action_taken()
         
        current_ability_method = null
        displayAnimatedNews('tremor<br/>boons removed')
    },
    stoneSpikes:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                setBoons_Blights(target, { bspeed: Number(target.attr('data-bspeed')) - 1 })
                displayAnimatedNews('stone spikes<br/>-1 speed')
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    stoneStrenght:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Landslide"]')[0])
        const { bprotection, bdamage } = extractBoons_Blights($target)
        setBoons_Blights($target,{bprotection:bprotection+1,bdamage:bdamage+1})
        displayAnimatedNews('stone strength<br/>+1 shield and damage')
        $('[data-glow]').removeAttr('data-glow')
         
        add_action_taken()
        current_ability_method = null
    },
    runeweaving:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            add_action_taken()
            if( onHit(aim, target) ){
                displayAnimatedNews('runeweaving')
                if ( myTurn )
                    $('#gameScreen').append(crystalGlareOptions(origin, { hex, row }, "runeweaving2",1,`choose one boon`))
            } else displayAnimatedNews ("missed!")
        }
    },
    runeweaving2:function(o){
        const { hex, row, cursePackage } = o
        const { curseType, origin } = cursePackage
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const $origin = $($(`.hex${origin.hex}_in_row_${origin.row}`).children('.smallCard')[0])
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) + 1 })
        setBoons_Blights($origin,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) - 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>+1 ${[...curseType].slice(1).join('')}`)
         
        add_action_taken()
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        crystalGlare_bb = null
    },
    avalanche:function(o){
        if( !$('.avalanche_moveable').length ){
            displayAnimatedNews(`avalanche<br/>hexes moving`)
            const { hex, row } = o
            const $shayle = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Shayle"]')[0])
            const team = $shayle.hasClass('blackTeam') ? '.blackTeam' : '.whiteTeam'
            highlightHexes({colour:'greenGlow',dist:3},$(`[data-name="Landslide"]${team}`))
            $('[data-glow].objectiveGlow').addClass('avalanche_moveable')
            $('[data-glow]').removeAttr('data-glow')
            current_ability_method = null
        }
    },
    avalanche2:function(o){
        const { hex, row } = o
        const thiz = $(`.hex_${hex}_in_row_${row}.objectiveGlow`)
        $('[data-glow]').removeAttr('data-glow')
        $('.avalanche_selected').removeClass('avalanche_moveable').removeClass('avalanche_selected')
        thiz.addClass('avalanche_selected')
        highlightHexes({colour:'legendaryGlow',dist:1}, $(thiz.children('.top')[0]) )
    },
    avalanche3:function(o){
        const { hex, row } = o
        const origin = $('.avalanche_selected')
        const destination = $(`.hex_${hex}_in_row_${row}`)
        if(!destination.children('.smallCard').length && !destination.hasClass('objectiveGlow') ){
            origin.children('.whiteTeam').detach().appendTo(destination)
            origin.children('.blackTeam').detach().appendTo(destination)
            removeObjectiveHex( origin.data('row'), origin.data('hex') )
            makeObjectiveHex(row, hex)
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews(`objextive<br/>moved`)
            origin.removeClass('avalanche_moveable avalanche_selected')
        } 
        else 
            displayAnimatedNews(`must target<br/>empty hex`)

        if( !$('.avalanche_selected').length ){
            current_ability_method = null
             
            add_action_taken()
        }
    },
    earthquake:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            const team = target.hasClass('blackTeam') ? '.blackTeam' : '.whiteTeam'
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) && !$('.earthquake_selected').length ){
                displayAnimatedNews(`earthquake<br/>${target.data('name')} moving`)
                $(`[data-name="${target.data('name')}"]${team}`).addClass('earthquake_moveable')
                target.addClass('earthquake_selected')
                highlightHexes({colour:'legendaryGlow',dist:2},target)
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    boulderBash:function(o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))-1})
                let completeness = false
                if( doDamage(hurt, target) ){
                    completeness = true
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                    displayAnimatedNews(`${target.data('name')}<br/>-1 dodge`)
                } else displayAnimatedNews(`no damage!<br/>-1 dodge`)
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    eruption:function(o){//each loop such as this one executes for each model, b_B'ing teams more than once SOLVED!!! :]
        const coin = Math.random()
        const plus = 1, minus = -1
        const addo = coin > .5 ? plus : minus
        const team = $('.selectedModel').hasClass('whiteTeam') ? '.blackTeam' : '.whiteTeam'
        displayAnimatedNews(`eruption<br/>${addo} protection`)
        const ARR = [...$($(`[data-glow].hexagon`).children('.smallCard')) ].map(el=>$(el).data('name'))
        const uniqSet = [...new Set(ARR)]
        uniqSet.forEach(el=>{
            const thiz = $(`[data-name="${el}"]${team}`)
            setBoons_Blights(thiz,{ bprotection: (Number(thiz.attr('data-bprotection')) + addo) })
        })
        $(`[data-glow]`).removeAttr('data-glow')
        add_action_taken()
         
        current_ability_method = null
    },
    cursedGround:function(o){//no endphase yet
        const { hex, row } = o
        const target = $(`.hex_${hex}_in_row_${row}.hexagon`)
        if( 
            $(`[data-kill="${ $('.selectedModel').data('side') }"]`).length < 2 && 
            target.children().length < 3 && 
            !target.hasClass('objectiveGlow') 
        ){
            makeObjectiveHex(row,hex)
            target.attr( 'data-kill', $('.selectedModel').data('side') )
            displayAnimatedNews('cursed<br/>ground')
        } else displayAnimatedNews('target<br/>empty hex')

        if ( $('[data-kill]').length > 1 ){
            add_action_taken()
             
            current_ability_method = null
            $('[data-glow]').removeAttr('data-glow')
        }
    },
    deadlyCurse:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            const { side, name } = target.data()
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){ 
                if( myTurn )
                    $('#gameScreen').append(  dedlyCursePanel( {side,name,socksMethod:'deadlyCurse',message:'choose one'} )  )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    deadlyCurse2:function(o){
        const { side, name, curseType } = o.cursePackage
        const $target = $($(`[data-name="${name}"][data-tenmodel].${side}`)[0])
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) - 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>-1 ${[...curseType].slice(1).join('')}`)
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        crystalGlare_bb = null
    },
    callTotems:function(o){
        $('[data-glow]').removeAttr('data-glow')
        const { hex, row } = o
        const side = $('.selectedModel').hasClass(mySide) ? mySide : opoSide
        const $targets = $(`[data-name="Hexlings"][data-tenmodel].${side}`)
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard[data-name="Hexlings"]')[0])
        forceKill(target)
        setTimeout(function(){
        const multiInfo = {
            name:"Call Totems",
            count: $targets.length - 1,
            color:"greenFlame",
            klass:"callTotems",
            ability:"callTotems",
            dedcount: graveyard[side].Hexlings.length
        }
        $('body').append(multi_choice_info_panel(multiInfo))
        $(`[data-name="Hexlings"][data-tenmodel].${side}`)
            .parent('.hexagon').each(function(){
                $(this).attr('data-glow','greenGlow')
                $(this).children('.top').attr('data-glow','greenGlow')
                $(this).children('.bottom').attr('data-glow','greenGlow')
            })
        },900)
    },
    callTotems1:function(){
        const side = $('.selectedModel').hasClass(mySide) ? mySide : opoSide
        $('[data-glow="greenGlow"]').removeAttr('data-glow')
        rallyActionDeclaration( { unitname:'Rattlebone', side, type:'unit', name:'Hexlings', dist:2 } )
    },
    graspingCurse:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            const { side, name } = target.data()
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){ 
                if( myTurn )
                    $('#gameScreen').append( dedlyCursePanel( {side,name,socksMethod:'graspingCurse',message:'choose one'} ) )
                else
                    displayAnimatedNews('opponent<br/>choosing blight')
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    powerHex:function(o){
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
        const { cursePackage } = o
        let curses = {}
        cursePackage.forEach( el=> curses[el]=-1 )
        $('[data-glow].hexagon').children(`.champModel.${team}`).each(function(){
            setBoons_Blights($(this),curses)
        })
         
        add_action_taken()
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
        displayAnimatedNews(`champions get<br/>-1 ${cursePackage.join(', ')}`)
    },
    purgeMagic:function(o){
        const { hex, row, key } = o
        const $hexlings = $($(`[data-name="Hexlings"][data-tenmodel].${key}`)[0])
        const $recepient = $( $(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0] )
        const hexlings = extractBoons_Blights( $hexlings )
        const { baim, bdamage, bspeed, bdodge, bprotection } = hexlings
        setBoons_Blights( $recepient, { baim, bdamage, bspeed, bdodge, bprotection } )
        setBoons_Blights( $hexlings, { baim:0, bdamage:0, bspeed:0, bdodge:0, bprotection:0})
        $('[data-glow]').removeAttr('data-glow')
        displayAnimatedNews(`Hexlings<br/>pure magic`)
         
        add_action_taken()
        current_ability_method = null
    },
    hexBolt:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            const { side, name } = target.data()
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){ 
                if( myTurn )
                    $('#gameScreen').append(  challengeOptions(target, {hex, row}, "hexBolt2",1,`give 1 blight to ${target.data('name')}`)  )
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    hexBolt2:function(o){
        const { hex, row, cursePackage } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        setBoons_Blights($target,{[cursePackage[0]]:Number($target.attr(`data-${cursePackage[0]}`))-1})
        displayAnimatedNews(`${$target.data('name')}<br/>-1 ${[...cursePackage[0]].slice(1).join('')}`)
    },
    attuneMagic:function(o){
        const { hex, row, cursePackage } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Hexlings"]')[0])
        setBoons_Blights($target,{[cursePackage[0]]:Number($target.attr(`data-${cursePackage[0]}`))+1})
        displayAnimatedNews(`Hexlings<br/>+1 ${[...cursePackage[0]].slice(1).join('')}`)
         
        add_action_taken()
        current_ability_method = null
    },
    piercingShot:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                animateDamage(target, -1)
                shootAndScoot()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    mysticArrow:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                const p = hurt.length > 10 ? 6 : 5
                const stPunch = hurt.slice(0, p)
                const ndPunch = hurt.slice(p)
                if( doDamage(stPunch, target) ){
                    shootAndScoot()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else {
                        setTimeout(()=>{
                            if ( doDamage(ndPunch, target) )
                                if( checkIfStillAlive(target) )
                                    moveLadder(target, target.data('stepsgiven'))
                                else null
                        },1550)
                    }
                } else displayAnimatedNews("no damage!")
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    snipe:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) ){
                    shootAndScoot()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                }else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    fieldInstruction:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        setBoons_Blights($target,{bdamage:Number($target.attr('data-bdamage'))+1})
        displayAnimatedNews(`${$target.data('name')}<br/>+1 damage`)
         
        add_action_taken()
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
    },
    faryFire:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))-1})
                displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    deathblow:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-2) )
                animateDamage(target, -2)
                shootAndScoot()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    aim:function(o){
        const { hex, row } = o
        target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews('Mistwood Rangers<br/>+1 aim')
        setBoons_Blights(target,{baim:Number(target.attr('data-baim'))+1})
         
        add_action_taken()
        current_ability_method = null
    },
    fire: function (o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    blur:function(o){
        const { hex, row } = o
        target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews('Mistwood Rangers<br/>+1 dodge')
        setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))+1})
        add_action_taken('blur')
        current_ability_method = null
    },
    faryFire_MR:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            $('[data-glow]').removeAttr('data-glow')
            if( onHit(aim, target) ){
                displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
                setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))-1})
            }else displayAnimatedNews ("missed!")
            add_action_taken('faryFire_MR')
            if_moved_end_it()
        }
        current_ability_method = null
    },
    plotRevenge:function(o){
        const { hex, row } = o
        target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews(`${target.data('name')}<br/>+1 aim`)
        setBoons_Blights(target,{baim:Number(target.attr('data-baim'))+1})
         
        add_action_taken()
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
    },
    annoy:function(o){//acccepts only one step. plugged to froglodytes tongue lash//fixed
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                //enemy pushing here
                target.addClass('annoyed_selected')
                highlightHexes({colour:'legendaryGlow',dist:2},target)
                highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                displayAnimatedNews(`${target.data('name')}<br/>annoyed`)
                //push ends here
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    backstab:function(o){
        const { aim, hex, row, hurt } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                animateDamage(target, -1)
                displayAnimatedNews(`${target.data('name')}<br/>backstabbed`)
                if( checkIfStillAlive(target) )
                    moveLadder(target, target.data('stepsgiven'))
                else {
                    setTimeout(()=>{
                        if ( doDamage(hurt, target) )
                            if( checkIfStillAlive(target) )
                                moveLadder(target, target.data('stepsgiven'))
                            else null
                    },1550)
                }
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    leap:function(o){
        const { hex, row } = o
        const thiz = $(`[data-name="SneakyPeet"].selectedModel`)
        const that = $(`.hex_${hex}_in_row_${row}`)
        makeAnim(thiz,that,_m_.leap)
    },
    pounce1:function(o){
        const { hex, row } = o
        const targes = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        targes.addClass('pounced')
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes({colour:'legendaryGlow',dist:1},targes)
        displayAnimatedNews('sneaky leap<br/>first')
    },
    pounce2:function(o){
        const { hex, row, aim, hurt } = o
        const thiz = $(`[data-name="SneakyPeet"].selectedModel`)
        const that = $(`.hex_${hex}_in_row_${row}`)
        makeAnim(thiz,that)
        $('[data-glow]').removeAttr('data-glow')
        setTimeout(()=>{
            const target = $('.pounced')
            target.removeClass('pounced')
             
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        current_ability_method = null
        displayAnimatedNews('pounced')
        },1000)
    },
    sneak:function(o){
        $('[data-glow]').removeAttr('data-glow')
        const { hex, row } = o
        const sneaker = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="SneakyStabbers"]')[0])
        const side = sneaker.data('side') === mySide ? mySide : opoSide
        const sneakyPreet = $(`[data-name="SneakyPeet"].${side}`)
        forceKill(sneaker)
        displayAnimatedNews('sneaky<br/>sneak')
        current_ability_method = null
        add_action_taken()
         
        highlightHexes({colour:'recruitGlow',dist:1},sneakyPreet)
        setTimeout(()=>rallyActionDeclaration({ unitname:"SneakyPeet", side, type:'unit', name:'SneakyStabbers'}),1000)
    },
    irritate:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
                setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    sprint:function(o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="SneakyStabbers"]')[0])
        $('[data-glow]').removeAttr('data-glow')
        displayAnimatedNews('Sneaky<br/>sprint')
        $mourn.addClass('sprint_selected')
        highlightHexes({colour:'legendaryGlow',dist: 3}, $mourn)
    },
    letMeDoIt:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    jawbreaker:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else {
                        target.addClass('brokenJaw_selected')
                        highlightHexes({colour:'legendaryGlow',dist:1},target)
                    }
                else {
                    displayAnimatedNews("no damage!")
                    target.addClass('brokenJaw_selected')
                    highlightHexes({colour:'legendaryGlow',dist:1},target)
                }
            else displayAnimatedNews ("missed!")
        }
        current_ability_method=null
    },
    whiplash:function(o){
        const { aim, hex, row } = o
        const dAD = $(`.hex_${hex}_in_row_${row}`)
        const targets = dAD.children(`.smallCard`)
        if( targets.length ){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                //enemy pushing here
                target.addClass('whiplash_selected')
                highlightHexes({colour:'legendaryGlow',dist:2},target)
                highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                displayAnimatedNews(`${target.data('name')}<br/>whiplashed`)
                //push ends here
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    channelRage:function(o){
        const { hex, row } = o
        target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews(`${target.data('name')}<br/>+1 damage`)
        setBoons_Blights(target,{bdamage:Number(target.attr('data-bdamage'))+1})
         
        add_action_taken()
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
    },
    breakSpirit:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                displayAnimatedNews(`${target.data('name')}<br/>-1 dodge`)
                setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))-1})
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    beastlyCharge:function(o){//enters the hex with victim
        const { hex, row} = o
        const dad = $(`.hex_${hex}_in_row_${row}`)
        const team = !$('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        const target = $(dad.children(`.smallCard.${team}`)[0])
        if( target.length ){
            $('.beastlyCharge_selected').removeClass(`beastlyCharge_selected`)
            target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-2) )
            animateDamage(target, -2)
                if( checkIfStillAlive(target) )
                    moveLadder(target, target.data('stepsgiven'))
                else null
             
            add_action_taken()
            current_ability_method = null
            $('[data-glow]').removeAttr('data-glow')
        }
    },
    ambush:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                animateDamage(target, -1)
                displayAnimatedNews(`${target.data('name')}<br/>ambushed`)
                if( checkIfStillAlive(target) )
                    moveLadder(target, target.data('stepsgiven'))
                else null
                } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    shoot:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    induct:function(o){
        const { hex, row } = o
        const side = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0]).hasClass(mySide) ? mySide : opoSide
        if ( !$('[data-glow]').length && $(`[data-name="RedBandits"][data-tenmodel].${side}`).length < 5 ){
            $(`[data-name="RedBandits"][data-tenmodel].${side}`).parent('.hexagon').each(function(){
                const dad = $(this)
                if( dad.children(`[data-name="RedBandits"][data-tenmodel].${side}`).length < 3 ){
                    dad.attr('data-glow','recruitGlow')
                    dad.children('.top').attr('data-glow','recruitGlow')
                    dad.children('.bottom').attr('data-glow','recruitGlow')
                }
            })
            river = [ "Rangosh", side, "unit", "RedBandits" ]
        }
    },
    snowballsChance:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )
                if( doDamage(hurt, target) ){
                    target.attr('data-healthleft', 0 )
                    animateDamage(target, 0-target.data('health'))
                    displayAnimatedNews("snowball's chance<br/>succesful")
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                } else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    iceblade:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                const { bspeed, baim, bdamage } = extractBoons_Blights(target)
                const extraWound = bspeed === -1 || baim === -1 || bdamage === -1 ? -1 : 0
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else if (extraWound===-1){
                        setTimeout(()=>{
                            target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                            animateDamage(target, -1)
                            displayAnimatedNews(`${target.data('name')}<br/>iceblade`)
                            if( checkIfStillAlive(target) )
                                moveLadder(target, target.data('stepsgiven'))
                            else null
                        },1000)
                    }
                else displayAnimatedNews("no damage!")
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    icebolt:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
                displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    forwardMinionsMorrigan:function(o){
        const {  hex, row } = o
        const boss = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = boss.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if( !$('.forwardMinionsMorrigan').length ){
            add_action_taken('forwardMinionsMorrigan')
            $('[data-glow]').children(`[data-name="ColdBones"].${team}`).addClass('forwardMinionsMorrigan')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('Cold Bones<br/>shamble onwards')
        }
    },
    frostyGlance:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('frostyGlance')
            if( onHit(aim, target) ){//allow for bonus one hex movement for Halftusk action here
                highlightHexes({colour:'legendaryGlow',dist:1},$('.selectedModel'))
                highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                $('.selectedModel').addClass('frostyGlance_selected')
                displayAnimatedNews('Morrigan<br/>shambles onward')
                //as above mentions by doing this skill I need to finish Halftusks tooo
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    flashFreeze:function(o){
        const { hex, row } = o
        const team = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard[data-name="Morrigan"]')[0]).hasClass(mySide) ? opoSide : mySide
        displayAnimatedNews("flash freeze<br/>-1 dodge & speed")
        add_action_taken('legendary')
        const ARR = [...$($(`[data-glow].hexagon`).children(`.smallCard.${team}`)) ].map(el=>$(el).data('name'))
        const uniqSet = [...new Set(ARR)]
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
        uniqSet.forEach(el=>{
            const x = $(`[data-name="${el}"][data-tenmodel].${team}`)
            setBoons_Blights(x,{bdodge:Number(x.attr('data-bdodge'))-1,bspeed:Number(x.attr('data-bspeed'))-1})
        })
    },
    intenseCold:function(o){
        const { hex, row } = o
         
        add_action_taken('intenseCold')
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        setBoons_Blights(target,{bdamage:Number(target.attr('data-bdamage'))+1})
        displayAnimatedNews(`Cold Bones<br/>+1 damage`)
    },
    snowbladefight:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('snowbladefight')
            if( onHit(aim, target) )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    soCoolMistress:function(o){
        const { side, name, curseType } = o.cursePackage
        const $target = $($(`[data-name="${name}"][data-tenmodel].${side}`)[0])
        displayAnimatedNews(`${$target.data('name')}<br/>+1 ${[...curseType].slice(1).join('')}`)
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        add_action_taken('soCoolMistress')
         
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) + 1 })
        crystalGlare_bb = null
    },
    chillOut:function(o){//unotestedo, hopo copypasta works
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken('chillOut')
            if( onHit(aim, target) ){
                setBoons_Blights(target,{bdamage:Number(target.attr('data-bdamage'))-1})
                displayAnimatedNews(`${target.data('name')}<br/>-1 damage`)
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    phaseEnd:function(o){
        const { next, name, side } = o.key//o.phase
        let strajng = ''
        const selectedModels = $(`[data-name="${name}"][data-side="${side}"]`)
        selectedModels.each(function(){
            $(this).attr('data-actionstaken',2).addClass('activated')
        })
        $(`[data-glow]`).removeAttr('data-glow')
        current_ability_method = null
        strajng+=`${name}<br/>activated`
        //need to add deifer and ultra resetter here
        if(phase==='white'&&$('.activated.whiteTeam[data-tenmodel]').length === $('.whiteTeam[data-tenmodel]').length){
            socket.emit('turnEnd',{current:'white', next:'black'})
            strajng+="<br/>turn end"
        }else if(phase==='black' && side===mySide){
            socket.emit('turnEnd',{current:'black', next:'black'})
            strajng+="<br/>turn end"
        }
        displayAnimatedNews(strajng)
    }
}