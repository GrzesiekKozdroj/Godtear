var m_ = {
    kick:function (o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("kick")
            if( onHit(aim, target, 'axe','Kick') ){
                if( doDamage(hurt, target) ){
                    wildfire()
                    if( checkIfStillAlive(target) ){
                        moveLadder(target,1 + target.data('stepsgiven'))
                    } else null
                }
            }
        }
        current_ability_method = null
    },
    fieryAxe:function (o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel:not(".death")`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("fieryAxe",multiAction)
            if( onHit(aim, target, 'axe','Fiery Axe') ){
                if( doDamage(hurt, target) ){
                    wildfire()
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                }
            }
        }
        current_ability_method = null
    },
    fireball:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel:not(".death")`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("fireball",multiAction)
            if( onHit(aim, target, 'spell','Fireball') ){
                if( doDamage(hurt, target) ){
                    wildfire()
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                }
            }
        }
        current_ability_method = null
    },
    hootfoot:function(o){
        add_action_taken("hootfoot")
        un_glow()
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
        if( onHit(aim, target, 'spell','Evil Eye') ){
            displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
            setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))-1})
        } else 
            displayAnimatedNews('missed!')
        un_glow()
    },
    firestorm:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
            un_glow()
            add_action_taken("legendary",multiAction)
            if( onHit(aim, target, 'axe','Firestorm') ){
                if( doDamage(hurt, target) ){
                    wildfire()
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                }
            }
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
            un_glow()
            add_action_taken("cleavingStrike")
            if( onHit(aim, target, 'axe','Cleaving Strike') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                }
            }
        }
        current_ability_method = null
    },
    rush:function(o){//stepingOnHexWithAnotherUnburntRemoves.rush,.rush_selected and data-glow from one entering occupiedhex
        const { hex, row } = o
        let dad = $('.selectedModel').parent('.hexagon')//$(`.hex_${hex}_in_row_${row}`)
        if( !$('.rush[data-tenmodel]').length ){
            displayAnimatedNews(`Rush<br/>Unburnt<br/>Reavers`)
            dad.children('[data-name="UnburntReavers"][data-tenmodel]').each(function(){$(this).addClass('rush')})
            $('.selectedModel').addClass('rush_selected')
            //highlightHexes({colour:'legendaryGlow',dist:2})
            add_action_taken('rush')
            current_ability_method = null
        }
    },
    intimidation:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("intimidation")
            if( onHit(aim, target, 'axe', 'Intimidation') )
            {
                displayAnimatedNews({  blight:'-1 dodge'    })
                setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))-1})
            }
        }
        current_ability_method = null
    },
    piercingStrike:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            tituulti_addaction("piercingStrike",multiAction)
            if( onHit(aim, target, 'sword','Piercing Strike') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, (target.data('type') === 'unit' ? 1 : 0) + target.data('stepsgiven'))
                    else null
                }
            }
        }
        current_ability_method = null
    },
    sweepingSlash:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
            un_glow()
            tituulti_addaction("sweepingSlash",multiAction)
            if( onHit(aim, target, 'sword', 'Sweeping Slash') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target,(target.data('type') === 'unit' ? 1 : 0) + target.data('stepsgiven'))
                    else null
                }
            }
        } 
        if( !$(`.destined_for_DOOM`).length ) $('#multi_choice_info_panel').remove()
            current_ability_method = null
    },
    challenge:function(o){
        const { hex, row , cursePackage, curseCount } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        tituulti_addaction('challenge')
        if( curseCount && !cursePackage && target.hasClass('whiteTeam')){
            let paybacked = $('.selectedModel').parent('.hexagon').data()
            $('#gameScreen').append(challengeOptions(target, paybacked, "challenge",1,"apply one blight to Titus"))
        }else if( !curseCount && cursePackage ){
            let curses = {}
            cursePackage.forEach( el=> curses[el]=-1 )
            setBoons_Blights(target,curses)
            current_ability_method = null
            un_glow()
            displayAnimatedNews(`${target.data('name')}<br/>-1 ${cursePackage.join(', ')}`)
        }
    },
    illKillYouAll:function(o){
        const { aim, hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        current_ability_method = null
        if(  !$('.illKillYouAll').length && onHit(aim, singleSpecimen,'spell',"I'll Kill You All")){
            const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
            const allInRange = $('[data-glow]')
                        .children(`[data-name="${singleSpecimen.data('name')}"].${team}`)
            allInRange.addClass('illKillYouAll')
            un_glow()
        } 
    },//NEEDS SKILL USE VALIDATION TO BE FINISHED!!!!!
    pathOfDestruction:function(o){
        const { hex, row } = o
        const side = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="Titus"]')[0]).data('side')
        for(let SKILL_KEY in tituulti[side]){
            tituulti[side][SKILL_KEY] = true
        }
        titustepper[side] = true
        displayAnimatedNews('Titus<br/>Path of<br/>Destruction')
        add_action_taken('legendary', true)
        // name: "Path of Destruction",
        // desc: "Titus may make a skill action. Then he may move 1 hex. Then he may make another skill action",
        // icon: self,
        // unused: true,
        // legendaryUsed: false,
        // m: "pathOfDestruction"
    },
    titusStep_m:function(o){
        const { hex, row } = o
        const tajtus = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel="Titus"]')[0])
        const side = tajtus.data('side')
        if( loop_tituulti()===3 && titustepper[side] ){
            displayAnimatedNews('move<br/>Titus')
            un_glow()
            cancellerName = 'pathof_cancelledStep'
            tajtus.addClass('pathof_selected')
            highlightHexes({colour:'legendaryGlow',dist:1})
        }
    },
    hack:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("hack")
            if( onHit(aim, target,'sword','Hack') ){
                setBoons_Blights(target,{bprotection:-1})
                displayAnimatedNews({           blight:'-1 protection'         })
            }
        }
        current_ability_method = null
    },
    surroundPound:function(o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
            add_action_taken("surroundPound")
            un_glow()
            if( onHit(aim, target, 'sword','Surround Pound') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                } 
            }
        }
        current_ability_method = null
    },
    roarOfBattle:function(o){
        const { hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.champModel')[0])
        ////too early, noone moved yet!!!!!!!!!!!!!!!!
        if( !$('.roarOfBattle_selected').length ){
            singleSpecimen.addClass('roarOfBattle_selected')
            un_glow()
            displayAnimatedNews('reposition champion')
            highlightHexes({colour:'legendaryGlow', dist:1}, $('.roarOfBattle_selected'))
        }
    },
    outflank:function(o){
        const { aim, hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        add_action_taken("outflank")
        if( !$('.outflank').length && onHit(aim, singleSpecimen, 'sword','Outflank') ){
            const team = singleSpecimen.hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
            console.log('outflank init')
            un_glow()
            $('.selectedModel').removeClass('selectedModel')
            highlightHexes ({colour:'blueGlow', dist:1}, singleSpecimen)
            $('[data-glow="blueGlow"]')
                .each(function(){
                    let thix = $(this)
                    thix.children(`[data-name="GlorySeekers"].${team}`).addClass('outflank')
                })
            singleSpecimen.addClass('outflank_source')
            displayAnimatedNews({addInfo:'reposition',$attacker:$($('.outflank')[0]),templateType:'info'})
        }
        current_ability_method = null
    },
    roll:function(o){
        if( !$('[data-glow]').length )
            highlightDirectPaths({origin: $('.selectedModel').parent('.hexagon').data(), distance:3, colour:'straitPaths'})
            $('.selectedModel').addClass('roll_selected')
    },
    newSpewWhite:newSpew_,
    newSpewBlack:newSpew_,
    raiseNewSpew:function(o){
        const { hex, row, multiAction} = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        graveyard[river[1]][river[3]].splice(0,1)
        if( $(`[data-tenmodel^="Retchlings"].${multiAction}`).length < 5 ){
            rallyActionDeclaration({ unitname:"Grimgut", side:multiAction, type:"champion", name:"Retchlings" }, `newSpewWhite`)
        } else {
            river = null
            current_ability_method = null
            un_glow()
        }
    },
    raiseDead:function(o){
        const { hex, row, key } = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        displayAnimatedNews({addInfo:'recruited',$attacker:$(thiz.children('[data-tenmodel]')[0]),templateType:'info'})
        graveyard[river[1]][river[3]].splice(0,1)
        const $thiz = $(thiz.children('.smallCard')[0])
        const $brothers = $($(`[data-name="${$thiz.data('name')}"][data-side=${$thiz.data('side')}]:not( [data-tenmodel="${$thiz.data('tenmodel')}"] )`)[0])
        propagate_BB_s($brothers,$thiz)
        setTimeout(()=>rapidDeployment($thiz),700)
        if(key!=='callTotems' || !graveyard[river[1]][river[3]].length ){     //untestedo
            un_glow()
            river = null
            current_ability_method = null
            $('#multi_choice_info_panel').remove()
            $('.selectedModel').removeClass('selectedModel')                                          //untestedo
        }                                                                                             //untestedo
        add_action_taken(key?key:"rallied")
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
            un_glow()
            add_action_taken("nomNomNom")
            if( onHit(aim, target, 'scythe','Nom nom nom') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                }
            }
        }
        current_ability_method = null
    },
    buffet:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
            un_glow()
            add_action_taken("legendary",multiAction)
            if( onHit(aim, target, 'scythe','Buffet') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                }
            }
        } 
        if( !$(`.destined_for_DOOM`).length ) $('#multi_choice_info_panel').remove()
        current_ability_method = null
    },
    slimed:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            retchlings_adagio("slimed",multiAction)
            if( onHit(aim, target, 'spell','Slimed') ){
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                }
            } 
        }
        current_ability_method = null
    },
    slipAndSlide:function(o){
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        displayAnimatedNews(`${target.data('name')}<br/>+1 speed`)
        retchlings_adagio('slipAndSlide',false)
        current_ability_method = null
        setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))+1})
        un_glow()
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
    onePunch:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("onePunch")
            if( onHit(aim, target, 'sword','One Punch') ){
                //bonus action added
                if(target.hasClass('blackTeam') && !mySkillTrack.Halftusk.black.twoPunch.used){
                    let myTusk = $('[data-name="Halftusk"][data-tenmodel].whiteTeam')
                    myTusk.attr('data-actionstaken',(Number(myTusk.attr('data-actionstaken'))-1) )
                }else if(target.hasClass('whiteTeam') && !opoSkillTrack.Halftusk.black.twoPunch.used){
                    let opoTusk = $('[data-name="Halftusk"][data-tenmodel].blackTeam')
                    opoTusk.attr('data-actionstaken',(Number(opoTusk.attr('data-actionstaken'))-1) )
                }
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target,target.data('stepsgiven'))
                    else null
                }
            }
        }
        current_ability_method = null
    },
    twoPunch:function(o){//needs bonus action defined
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        un_glow()
        if(targets.length){
            const target = $(targets[0])
            const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
            $('.selectedModel').addClass('twoPunch_selected')
            highlightHexes({colour:'legendaryGlow',dist:1})
            add_action_taken("twoPunch")
            if( onHit(aim, target, 'spell','Two Punch') )//allow for bonus one hex movement for Halftusk action here
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
        un_glow()
    },
    feint:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
         
        add_action_taken("feint")
        current_ability_method = null
        un_glow()
        if( onHit(aim, target,'sword','Feint') ){
            displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
            setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
        }
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
            un_glow()
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
             
            un_glow()
            add_action_taken("tongueLash")
            if( onHit(aim, target,'scythe', 'Tongue Lash') && !$('.tongueLash_selected').length ){
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
        un_glow()
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
                un_glow()
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
            un_glow()
             
            add_action_taken('shieldBash')
            if( onHit(aim, target,'sword','Shield Bash') ){
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
             
            un_glow()
            add_action_taken('swordSlash')
            if( onHit(aim, target,'sword','Sword Slash') )
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
        un_glow()
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
        if(!$('.marchGuardBlack').length){
            $(`[data-name="${singleSpecimen.data('name')}"].${team}`).addClass('marchGuardBlack')
            un_glow()
            displayAnimatedNews('Guards<br/>march')
        }
    },
    swordStrike:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            un_glow()
            add_action_taken('swordStrike')
            if( onHit(aim, target,'sword','Sword Strike') )
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
            un_glow()
            displayAnimatedNews('Guards<br/>march')
        }
    },
    deathwind:function(o){
        displayAnimatedNews('Mournblade moves<br/>banner')
    },
    raiseDeadChamps:function(o){
        un_glow()
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
        un_glow()        
    },
    soulCleave:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            un_glow()
            add_action_taken('soulCleave')
            if( onHit(aim, target,'sword','Soul Cleave') ){
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
        un_glow()
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
            un_glow()
            displayAnimatedNews('Knightshades<br/>shamble onwards')
        }
    },
    graspingDead:function(o){
        $(`[data-name="Knightshades"].${o.multiAction}[data-tenmodel]`).each(function(){
            forceKill ( $(this) )
        })
         
        add_action_taken('legendary')
        setTimeout(
            ()=>{
                un_glow()
                rallyActionDeclaration({ 
                    unitname:"Mournblade", 
                    side:o.multiAction, 
                    type:"champion", 
                    name:"Knightshades",
                    dist:3 }, 'graspingDead')}
        ,700)
        current_ability_method = null
    },
    raiseGraspingDead:function(o){
        const { hex, row, multiAction} = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        graveyard[river[1]][river[3]].splice(0,1)
        un_glow()
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
             
            un_glow()
            add_action_taken('deathsDoor')
            if( onHit(aim, target,'sword','Deaths Door') )
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
        un_glow()
        setBoons_Blights($target,{bdodge:bdodge+1})
    },
    wheresMaster:function(o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Mournblade"]')[0])
        un_glow()
         
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
            un_glow()
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
         
        un_glow()
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
            un_glow()
            add_action_taken('lifeBlade')
            if( onHit(aim, target,'sword','Life Blade') ){
                healLife( $('.selectedModel[data-name="Finvarr"][data-tenmodel]'), 1)
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
         
        un_glow()
        current_ability_method = null
        setBoons_Blights($target,{ bspeed: Number( $target.attr('data-bspeed') ) + 1 })
    },
    shadowWard:function(o){
        const { aim, hex, row } = o
        const targets = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        if(targets.length && !$('.shadowWard_selected').length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('shadowWard')
            if( onHit(aim, target,'spell','Shadow Ward') ){
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
        un_glow()
        current_ability_method = null
        setBoons_Blights($target,{baim:Number($target.attr('data-baim'))+1})
    },
    lifeTrade:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('lifeTrade')
            if( onHit(aim, target,'sword','Life Trade') )
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) ){
                        if( $('.selectedModel').siblings('.smallCard').length < 2 ){
                            rallyActionDeclaration({ 
                                unitname:"Finvarr", 
                                side:multiAction, 
                                type:"champion", 
                                name:"ShadowSentinels" },'lifeTrade')
                            displayAnimatedNews(`dead raise<br/>again`)
                        }
                        moveLadder(target, target.data('stepsgiven'))
                    }else null
                } else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    protect:function(o){
        const { hex, row } = o
        const targets = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        displayAnimatedNews(`${targets.data('name')}<br/>+1 protection`)
        un_glow()
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
        const { hex, row } = o
        $('[data-glow').removeAttr('data-glow')
        const targetHex = $(`.hex_${hex}_in_${row}`)
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if( !$('.shadowStepBlack').length )
        $(`[data-tenmodel][data-name="ShadowSentinels"].${team}`).each(function(){
            $(this)
                .addClass('shadowStepBlack')
                .attr('data-actionstaken',2)
        })
    },
    shadowSnare:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            un_glow()
            add_action_taken('shadowSnare')
            if( onHit(aim, target,'spell','Shadow Snare') ){
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
        un_glow()
        add_action_taken('erosion')
        current_ability_method = null
        if(targets.length){
            const target = $(targets[0])
            if( onHit(aim, target,'spell','Erosion') ){
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
            un_glow()
            add_action_taken('blindingLight')
            if( onHit(aim, target,'spell','Blinding Light') ){
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
        add_action_taken('crystalMirror')
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        crystalGlare_bb = null
    },
    meditation:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        setBoons_Blights($target,{baim:Number($target.attr('data-baim'))+1})
        displayAnimatedNews('Nia<br/>+1 aim')
        add_action_taken('meditation')
        un_glow()
        current_ability_method = null
    },
    marchNia:function(o){
        displayAnimatedNews('Nia<br/>marching')
    },
    geodeZ:function(o){
            const { key } = o
            un_glow()
            displayAnimatedNews('choose<br/>lone<br/>quartzling')
            const quartzlings = $(`[data-tenmodel^="Quartzlings"][data-side="${key}"]`)
            quartzlings.each(function(){
                if( $(this).siblings().length < 3 )
                    $(this).parent('.hexagon').attr('data-glow','greenGlow')
                    $(this).siblings().attr('data-glow','greenGlow')
            })
            current_ability_method = _m.geodeX
    },
    geode:function(o){
        const { hex, row } = o
        const thizQuartz = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = thizQuartz.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        makeObjectiveHex(row,hex)
        un_glow()
        highlightHexes({colour:'greenGlow',dist:2},thizQuartz)
        forceKill(thizQuartz)
        $('[data-glow].hexagon').each(function(){
            const niahere = $(this)
            if ( niahere.children(`[data-name="Nia"].${team}`).length ){
                un_glow()
                current_ability_method = _m.niaMinus
                highlightHexes({colour:'claimColor',dist:2},$(niahere.children(`[data-name="Nia"].${team}`)[0]))
                $('[data-glow]').each(function(){
                    const notThat = $(this)
                    if( notThat.data('hex') !== hex || notThat.data('row')!==row )
                        notThat.removeAttr('data-glow')
                    else
                        notThat.addClass('niaMinus')
                })
                return false
            }
        })
        add_action_taken('legendary', true)
        current_ability_method=null
        displayAnimatedNews('Geode<br/>place banner<br/>there')
    },
    rockConcert:rockConcert_,
    rollingStones_:function(o){
        const { hex, row } = o
        $('.roll_selected').removeClass('roll_selected roll')
        un_glow()
        const rollabel = $($(`.hex_${hex}_in_row_${row}`).children('.roll')[0])
        $('.selectedModel').removeClass('selectedModel')
        rollabel.addClass('roll_selected selectedModel')
        if(rollabel.length)
            highlightDirectPaths({origin: $(`.hex_${hex}_in_row_${row}`).data(), distance:3, colour:'straitPaths'})
    },
    rollingStones:function(o){
        displayAnimatedNews('rolling<br/>stones')
        if( !$('[data-glow]').length )
            highlightDirectPaths({origin: $('.selectedModel').parent('.hexagon').data(), distance:3, colour:'straitPaths'})
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        $('.selectedModel').addClass('roll_selected')
        $(`[data-tenmodel^="Quartzlings"].${team}`).addClass('roll')
        current_ability_method = ()=>{}
    },
    stoneThrow: function (o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("stoneThrow")
            if( onHit(aim, target,'spell','Stone Throw') )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    calcify:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Quartzlings"]')[0])
        console.log('calcify', hex, row )
        if ( $target.length && !$target.siblings('.smallCard').length ){
            // highlightHexes({colour:'greenGlow',dist:1},$target)
            // $('[data-glow].hexagon').each(function(){
            //     const thiz = $(this)
            //     if( thiz.hasClass('objectiveGlow') ){
                    makeObjectiveHex(row,hex)
                    forceKill($target)
                    displayAnimatedNews('calcify')
            //        return false
            //    }
            //})
            add_action_taken('calcify')
        }
        current_ability_method=null
        un_glow()
    },
    rockFormation1:function(o){
        const { key } = o
        const nija = $(`[data-tenmodel="Nia"][data-side="${key}"].smallCard`)
        if( key === mySide )
            highlightHexes({colour:`rockFormation${key}`, dist:1}, nija )
    },
    shimmer: function (o) {
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('shimmer')
            if( onHit(aim, target,'Shimmer') ){
                displayAnimatedNews(`Shimmer<br/>${target.data('name')}<br/>-1 speed`)
                setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))-1})
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    kerSplashWhite:kerSplash_,
    kerSplashBlack:kerSplash_,
    headbutt:function(o){//if champ killed he should be able to push 3 inches instead
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('headbutt')
            const hedbut = (n='')=>{
                un_glow()
                highlightHexes({colour:'legendaryGlow',dist:1},target)
                target.addClass('headbutt_selected')
                displayAnimatedNews(`${n}headbutt<br/>${target.data('name')}`)
            }
            if( onHit(aim, target,'sword','Headbutt') )
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
            un_glow()
            add_action_taken('lungingStrike')
            if( onHit(aim, target,'sword','Lunging Strike') )
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
            add_action_taken('underthrow')
        }
    },
    underthrowM:function(o){
        const { hex, row } = o
        const hexagon = $(`.hex_${hex}_in_row_${row}`)
        if ( pocketBox && hexagon.children().length < 3 && !hexagon.hasClass('objectiveGlow') ){
            makeObjectiveHex(row,hex)
            un_glow()
            pocketBox = null
            current_ability_method = null
            displayAnimatedNews('underthrow')
        } else 
            displayAnimatedNews('hex is<br/>not empty')
    },
    jet:function (o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="Splashlings"]')[0])
        displayAnimatedNews('Splashling<br/>jet')
        if( !$('.marchjet_selected').length ){
            $mourn.addClass('marchjet_selected')
            un_glow()
            highlightHexes({colour:'legendaryGlow',dist: 3}, $mourn)
            add_action_taken('jet')
        }
    },
    tsunami:function(o){
        const { hex, row } = o
        const $targetHex = $(`.hex_${hex}_in_row_${row}`)
        //un_glow()
        add_action_taken('legendary')
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
        const hexagon = $(`.hex_${hex}_in_row_${row}`)
        if( !hexagon.attr('data-glow') ){
        $('.tsunami-selected').removeClass('tsunami-selected')
        const $target = $(hexagon.children('.tsunami-moveable')[0])
        $target.removeClass('tsunami-moveable').addClass('tsunami-selected')
        un_glow()
        highlightHexes({colour:'legendaryGlow',dist:2},$target)
        }
    },
    ripplingScalesChosen:function(o){
        const { cursePackage } = o
        const curseType  = cursePackage.pack[0]
        const side = cursePackage.side
        const $target = $($(`[data-tenmodel^="RaithMarid"][data-side="${side}"]`)[0])
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) + 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>+1 ${[...curseType].slice(1).join('')}`)
    },
    currentBlack:current_,
    currentWhite:current_,
    tideBlack:tide_,
    tideWhite:tide_,
    likeWaterWhite:likeWater_,
    likeWaterBlack:likeWater_,
    likeWaterPost:function(o){
        const { cursePackage } = o
        const curseType  = cursePackage[0]
        const $target = $($(`[data-tenmodel^="Splashlings"].${myTurn?'whiteTeam':'blackTeam'}`)[0])
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) + 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>+1 ${[...curseType].slice(1).join('')}`)
        add_action_taken(`likeWater${phase==='white'?'White':'Black'}`)
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        crystalGlare_bb = null
    },
    tremor:function(o){
        team = $('.selectedModel').hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
        $('[data-glow]').children('[data-tenmodel].'+team).each(function(){
            const thiz = $(this)
            const { baim, bdamage, bspeed, bdodge, bprotection } = extractBoons_Blights(thiz)
            const setUp = {}
            if ( baim > 0 ) setUp.baim = 0
            if ( bdamage > 0 ) setUp.bdamage = 0
            if ( bspeed > 0 ) setUp.bspeed = 0
            if ( bdodge > 0 ) setUp.bdodge = 0
            if ( bprotection > 0 ) setUp.bprotection = 0
            setBoons_Blights(thiz,setUp)
        })
        un_glow()
        shayle_takes_action('tremor')
        current_ability_method = null
        displayAnimatedNews('tremor<br/>boons removed')
    },
    stoneSpikes:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            shayle_takes_action('stoneSpikes')
            if( onHit(aim, target,'spell','Stone Spikes') ){
                setBoons_Blights(target, { bspeed: Number(target.attr('data-bspeed')) - 1 })
                displayAnimatedNews('stone spikes<br/>-1 speed')
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    stoneStrenght:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="Landslide"]')[0])
        const { bprotection, bdamage } = extractBoons_Blights($target)
        setBoons_Blights($target,{bprotection:bprotection+1,bdamage:bdamage+1})
        displayAnimatedNews('stone strength<br/>+1 shield and damage')
        un_glow()
        shayle_takes_action('stoneStrenght')
        current_ability_method = null
    },
    runeweaving:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            shayle_takes_action('runeweaving')
            if( onHit(aim, target,'spell','Runeweaving') ){
                displayAnimatedNews('runeweaving')
                if ( myTurn )
                    $('#gameScreen').append(crystalGlareOptions(o, { hex, row }, "runeweaving2",1,`choose one boon`))
            } else displayAnimatedNews ("missed!")
        }
    },
    runeweaving2:function(o){
        const { hex, row, cursePackage } = o
        const { curseType, origin } = cursePackage
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const $origin = $($(`.hex_${origin.hex}_in_row_${origin.row}`).children('.smallCard')[0])
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) + 1 })
        setBoons_Blights($origin,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) - 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>+1 ${[...curseType].slice(1).join('')}`)
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
            highlightHexes({colour:'greenGlow',dist:3},$(`[data-tenmodel^="Landslide"]${team}`))
            $('[data-glow].objectiveGlow').addClass('avalanche_moveable')
            un_glow()
            current_ability_method = null
        }
    },
    avalanche2:function(o){
        const { hex, row } = o
        const thiz = $(`.hex_${hex}_in_row_${row}.objectiveGlow`)
        un_glow()
        $('.avalanche_selected').removeClass('avalanche_moveable').removeClass('avalanche_selected')
        thiz.addClass('avalanche_selected')
        highlightHexes({colour:'legendaryGlow',dist:1}, $(thiz.children('.top')[0]) )
    },
    avalanche3:function(o){
        const { hex, row } = o
        const origin = $('.avalanche_selected')
        const destination = $(`.hex_${hex}_in_row_${row}`)
        if(!destination.children('.smallCard').length && !destination.hasClass('objectiveGlow') ){
            shayle_takes_action('legendary')
            origin.children('.whiteTeam').detach().appendTo(destination)
            origin.children('.blackTeam').detach().appendTo(destination)
            removeObjectiveHex( origin.data('row'), origin.data('hex') )
            makeObjectiveHex(row, hex)
            un_glow()
            displayAnimatedNews(`objextive<br/>moved`)
            origin.removeClass('avalanche_moveable avalanche_selected')
        } 
        else 
            displayAnimatedNews(`must target<br/>empty hex`)
        if( !$('.avalanche_selected').length ){
            current_ability_method = null
        }
    },
    runecaller:function(o){
        const { hex, row } = o
        console.log('landsliding')
        const kid = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="Landslide"]')[0])
        highlightHexes({colour:'landSlideGlow', dist:2}, kid )
    },
    landSlideGlow1:function(o){
        const { hex, row } = o
        const targetLocation = $(`.hex_${hex}_in_row_${row}`)
        const landS = $($(`[data-tenmodel^="Landslide"].${ myTurn ? "white" : "black"}Team`)[0])
        displayAnimatedNews('Landslide<br/>moves')
        if(landS.attr('data-landstepper') == '1')
            makeAnim(landS,targetLocation,()=>{
                un_glow()
                landS.attr('data-landstepper',0)
            })
    },
    earthquakeWhite:earthquake_,
    earthquakeBlack:earthquake_,
    boulderBash:function(o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('boulderBash')
            if( onHit(aim, target,'sword','Boulder Bash') ){
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
        const addo = -1
        const team = !$('.selectedModel').hasClass('whiteTeam') ? '.blackTeam' : '.whiteTeam'
        displayAnimatedNews(`eruption<br/>${addo} protection`)
        const ARR = [...$($(`[data-glow].hexagon`).children(`.smallCard:not([data-tenmodel="Landslide0"]${team})`)) ].map(el=>$(el).data('name'))
        const uniqSet = [...new Set(ARR)]
        console.log(uniqSet)
        uniqSet.forEach(el=>{
            const thiz = $($(`[data-glow].hexagon`).children(`[data-name="${el}"][data-tenmodel]`)[0])
            setBoons_Blights(thiz,{ bprotection: (Number(thiz.attr('data-bprotection')) + addo) })
        })
        un_glow()
        add_action_taken('eruption')
        current_ability_method = null
    },
    cursedGround:function(o){//no endphase yet, marks generated hexes with data-kill="side"
        const { hex, row } = o
        const target = $(`.hex_${hex}_in_row_${row}.hexagon`)
        add_action_taken('cursedGround')
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
            current_ability_method = null
            un_glow()
        }
    },
    deadlyCurse:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            const { side, name } = target.data()
            un_glow()
            add_action_taken('deadlyCurse')
            if( onHit(aim, target,'spell','Deadly Curse') ){ 
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
        un_glow()
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
    graspingCurse:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            const { side, name } = target.data()
            un_glow()
            add_action_taken('graspingCurse')
            if( onHit(aim, target,'spell','Grasping Curse') ){ 
                if( myTurn )
                    $('#gameScreen').append( dedlyCursePanel( {side,name,socksMethod:'graspingCurse',message:'choose one'} ) )
                else
                    displayAnimatedNews('opponent<br/>choosing blight')
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    hexEaters:function(o){
        const { side, curseType } = o.cursePackage
        const $target = $($(`[data-name="Hexlings"][data-side="${side}"]`)[0])
        setBoons_Blights($target,{[curseType]:Number($target.attr(`data-${curseType}`))+1})
        displayAnimatedNews(`Hexlings<br/>+1 ${[...curseType[0]].slice(1).join('')}`)
        current_ability_method = null
        $('.titusChallenge').remove()
    },
    powerHex:function(o){
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
        const { cursePackage } = o
        let curses = {}
        cursePackage.forEach( el=> curses[el]=-1 )
        $('[data-glow].hexagon').children(`.champModel.${team}`).each(function(){
            setBoons_Blights($(this),curses)
        })
        add_action_taken('legendary')
        current_ability_method = null
        const infoString = cursePackage.map(el=>`-1 ${el}<br/>`).join(',')
        un_glow()
        displayAnimatedNews(`champions get<br/>${infoString}`)
    },
    rollTheBonesBlack:rollTheBones_,
    rollTheBonesWhite:rollTheBones_,
    rollTheBonesTransfer:function(o){
        const { hex, row } = o
        //continue here
        const dad = $(`.hex_${hex}_in_row_${row}`)
        const target = $(dad.children('[data-tenmodel]')[0])
        if( !$('.the_donor').length ){
            const { baim ,bdamage, bprotection, bdodge, bspeed } = extractBoons_Blights(target)
            const arr = [baim ,bdamage, bprotection, bdodge, bspeed]
            if( arr.some(el=>el!==0) ){
                displayAnimatedNews('now choose<br/>reciever')
                target.addClass('the_donor')
            } else 
                displayAnimatedNews('choose model<br/>with<br/>boons or blights')
        } else if ( $('.the_donor').length ){
            const { baim ,bdamage, bprotection, bdodge, bspeed } = extractBoons_Blights( $('.the_donor') )
            const bebes = { baim ,bdamage, bprotection, bdodge, bspeed }
            const arr = [baim ,bdamage, bprotection, bdodge, bspeed]
            if( arr.some(el=>el!==0) ){
                let bbCount = 0
                arr.forEach(el=>{if(el!==0)bbCount++})
                if(bbCount===1){
                    let k
                    for(let kej in bebes){if(bebes[kej]!==0)k = kej}
                    setBoons_Blights(  $('.the_donor'), { [k]:0 }  )
                    setBoons_Blights(  target,{ [k]: Number( target.attr(`data-${k}`) ) + bebes[k] }  )
                    displayAnimatedNews(`${target.data('name')}<br/>${bebes[k]} to ${[...k].slice(1).join('')}`)
                    un_glow()
                } else if( myTurn ){
                    $('#gameScreen').append( rTB_Transfer( {hex,row,socksMethod:'rTB_End',message:'take one'} ) )
                }
            } else displayAnimatedNews('choose model<br/>with<br/>boons or blights')
        }
    },
    rollTheBones__End:function(o){
        const { hex, row, curseType } = o.cursePackage
        const recepient = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        let value = Number(recepient.attr(`data-${curseType}`))+Number($('.the_donor').attr(`data-${curseType}`))
        setBoons_Blights(recepient,{ [curseType]: (value > 1 ? 1 : value < -1 ? -1 : value) })
        setBoons_Blights( $('.the_donor'), {[curseType]:0} )
        displayAnimatedNews(`${recepient.data('name')}
            <br/>takes ${Number(recepient.attr(`data-${curseType}`))} ${[...curseType].slice(1).join('')} from<br/>
            ${$('.donor').data('name')}`)
        $('.the_donor').removeClass('the_donor')
        un_glow()
        current_ability_method = null
    },
    purgeMagic:function(o){
        const { hex, row, key } = o
        const $hexlings = $($(`[data-name="Hexlings"][data-tenmodel].${key}`)[0])
        const $recepient = $( $(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0] )
        const hexlings = extractBoons_Blights( $hexlings )
        const { baim, bdamage, bspeed, bdodge, bprotection } = hexlings
        setBoons_Blights( $recepient, { baim, bdamage, bspeed, bdodge, bprotection } )
        setBoons_Blights( $hexlings, { baim:0, bdamage:0, bspeed:0, bdodge:0, bprotection:0})
        un_glow()
        displayAnimatedNews(`Hexlings<br/>pure magic`)
        add_action_taken('purgeMagic')
        current_ability_method = null
    },
    hexBoltBlack:hexBolt_,
    hexBoltWhite:hexBolt_,
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
        add_action_taken('attuneMagic')
        current_ability_method = null
    },
    piercingShot:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('piercingShot')
            if( onHit(aim, target,'arrow','Piercing Shot') ){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                animateDamage(target, -1)
                shootAndScoot()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target) )
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
            un_glow()
            add_action_taken('mysticArrow')
            if( onHit(aim, target,'arrow','Mystic Arrow') ){
                const p = hurt.length > 10 ? 6 : 5
                const stPunch = hurt.slice(0, p)
                const ndPunch = hurt.slice(p)
                if( doDamage(stPunch, target) ){
                    shootAndScoot()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target) )
                    else {
                        setTimeout(()=>{
                            if ( doDamage(ndPunch, target) )
                                if( checkIfStillAlive(target) )
                                    moveLadder(target, slayerPoints(target) )
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
            un_glow()
            add_action_taken('snipe')
            if( onHit(aim, target,'arrow','Snipe') )
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target) )
                    else null
                    shootAndScoot()
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
        add_action_taken('fieldInstruction')
        current_ability_method = null
        un_glow()
    },
    faryFire:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('faryFire')
            if( onHit(aim, target,'arrow','Fairy Fire') ){
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
            un_glow()
            add_action_taken('legendary')
            if( onHit(aim, target,'arrow','Deathblow') ){
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-2) )
                animateDamage(target, -2)
                shootAndScoot()
                $(`.miniGameCard.${target.data('side')}[data-name="${target.data('name')}"]`)
                    .find('.smallCard.health')
                    .find('.gameCard_num')
                    .removeClass('normal')
                    .addClass('blighted')
                    .text( Number(target.attr('data-healthleft')) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target) )
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
        add_action_taken('aim')
        current_ability_method = null
    },
    fire: function (o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('fire')
            if( onHit(aim, target,'arrow','Fire') )
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
            un_glow()
            if( onHit(aim, target,'arrow','Fairy Fire') ){
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
        add_action_taken('plotRevenge')
        un_glow()
        current_ability_method = null
    },
    annoy:function(o){//acccepts only one step. plugged to froglodytes tongue lash//fixed
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('annoy')
            if( onHit(aim, target,'spell','Annoy') ){
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
    backstabWhite:(o)=>backstab(o),
    backstabBlack:(o)=>backstab(o),
    leap:function(o){
        const modl = $(`[data-name="SneakyPeet"].selectedModel`)
        modl.addClass('leap_selected')
        un_glow()
        highlightHexes({ colour:'legendaryGlow', dist:2 }, modl)
    },
    pounce1:function(o){
        const { hex, row } = o
        const targes = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        targes.addClass('pounced')
        un_glow()
        highlightHexes({colour:'legendaryGlow',dist:1},targes)
        displayAnimatedNews('sneaky leap<br/>first')
    },
    pounce2:function(o){
        const { hex, row, aim, hurt } = o
        const thiz = $(`[data-name="SneakyPeet"].selectedModel`)
        const that = $(`.hex_${hex}_in_row_${row}`)
        makeAnim(thiz,that)
        un_glow()
        setTimeout(()=>{
            const target = $('.pounced')
            target.removeClass('pounced')
            add_action_taken('legendary')
            if( onHit(aim, target,'sword','Pounce') )
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
        un_glow()
        const { hex, row } = o
        const dad = $(`.hex_${hex}_in_row_${row}`)
        const sneaker = $(dad.children('[data-name="SneakyStabbers"]')[0])
        const side = sneaker.data('side') === mySide ? mySide : opoSide
        const sneakyPreet = $(`[data-name="SneakyPeet"].${side}`)
        forceKill(sneaker)
        displayAnimatedNews('sneaky<br/>sneak')
        add_action_taken('sneak')
        //highlightHexes({colour:'sneak',dist:1},sneakyPreet)
        setTimeout(()=>{
            if( !$('.selectedModel').length )
                $($(`[data-name="SneakyStabbers"][data-tenmodel].${side}:not(".death")`)[0]).addClass('selectedModel')
            rallyActionDeclaration({unitname:"SneakyPeet",side,type:'unit',name:'SneakyStabbers'},'sneak')
        },1000)
        current_ability_method = null
    },
    irritate:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('irritate')
            if( onHit(aim, target,'spell','Irritate') ){
                displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
                setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    sprint:function(o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="SneakyStabbers"]')[0])
        un_glow()
        if( !$('.sprint_selected').length ){
            displayAnimatedNews('Sneaky<br/>sprint')
            $mourn.addClass('sprint_selected')
            highlightHexes({colour:'legendaryGlow',dist: 3}, $mourn)
        }
    },
    letMeDoIt:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('letMeDoIt')
            if( onHit(aim, target,'sword','Let Me Do It') )
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    brutalMasterBlack:function(o){
        brutalMaste(o)
    },
    brutalMasterWhite:function(o){
        brutalMaste(o)
    },
    brutalMaster:function(o){
        const { hex, row, key } = o
        const dad = $(`.hex_${hex}_in_row_${row}`)
        $(`.sacrifice.${key}`).removeClass(`sacrifice ${key}`)
        const target = $( dad.children(`[data-name="RedBandits"][data-tenmodel]:not(".sacrifice")`)[0] )
        target.addClass(`sacrifice ${key}`)
    },
    jawbreaker:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
             
            un_glow()
            add_action_taken("jawbreaker")
            brutalMaster_brutaliser('aim')
            if( onHit(aim, target,'axe','Jawbreaker') ){
                brutalMaster_brutaliser('damage')
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else {
                        target.addClass('brokenJaw_selected')
                        highlightHexes({colour:'legendaryGlow',dist:1},target)
                    }
                } else {
                    displayAnimatedNews("no damage!")
                    target.addClass('brokenJaw_selected')
                    highlightHexes({colour:'legendaryGlow',dist:1},target)
                }
            } else {
                displayAnimatedNews ("missed!")
                $('.sacrifice').removeClass('sacrifice damage')
            }
        }
        current_ability_method=null
    },
    whiplash:function(o){//no damage module
        const { aim, hurt, hex, row } = o
        const dAD = $(`.hex_${hex}_in_row_${row}`)
        const targets = dAD.children(`.smallCard`)
        if( targets.length ){
            const target = $(targets[0])
            un_glow()
            add_action_taken('whiplash')
            brutalMaster_brutaliser('aim')
            if( onHit(aim, target,'axe','Whiplash') ){
                    brutalMaster_brutaliser('damage')
                    displayAnimatedNews(`${target.data('name')}<br/>whiplashed`)
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else {
                        target.addClass('whiplash_selected')
                        highlightHexes({colour:'legendaryGlow',dist:2},target)
                        highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                    }
                } else {
                    target.addClass('whiplash_selected')
                    highlightHexes({colour:'legendaryGlow',dist:2},target)
                    highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                    displayAnimatedNews("no damage!")
                }
            } else {
                $('.sacrifice').removeClass('sacrifice damage')
                displayAnimatedNews ("missed!")
            }
        }
        current_ability_method = null
    },
    channelRage:function(o){
        const { hex, row } = o
        target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        displayAnimatedNews(`${target.data('name')}<br/>+1 damage`)
        setBoons_Blights(target,{bdamage:Number(target.attr('data-bdamage'))+1})
        add_action_taken('channelRage')
        un_glow()
        current_ability_method = null
    },
    breakSpirit:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('breakSpirit')
            brutalMaster_brutaliser('aim')
            if( onHit(aim, target,'spell','Break Spirit') ){
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
        add_action_taken('legendary')
        if( target.length ){
            $('.beastlyCharge_selected').removeClass(`beastlyCharge_selected`)
            target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-2) )
            animateDamage(target, -2)
                if( checkIfStillAlive(target) )
                    moveLadder(target, target.data('stepsgiven'))
                else null
            current_ability_method = null
            un_glow()
        }
    },
    ambushWhite:ambush_,
    ambushBlack:ambush_,
    shoot:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("shoot")
            if( onHit(aim, target,'arrow','Shoot') )
                if( doDamage(hurt, target) ){
                    stolenTreasure()
                    if( checkIfStillAlive(target) )
                        moveLadder(target, target.data('stepsgiven'))
                    else null
                } else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    induct:function(o){
        const { hex, row } = o
        const side = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0]).hasClass(mySide) ? mySide : opoSide
        if ( /*!$('[data-glow]').length &&*/ $(`[data-name="RedBandits"][data-tenmodel].${side}`).length < 5 ){
            $(`[data-name="RedBandits"][data-tenmodel].${side}`).parent('.hexagon').each(function(){
                const dad = $(this)
                if( dad.children(`[data-name="RedBandits"][data-tenmodel].${side}`).length < 3 ){
                    dad.attr('data-glow','inductGlow')
                    dad.children('.top').attr('data-glow','inductGlow')
                    dad.children('.bottom').attr('data-glow','inductGlow')
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
            un_glow()
            add_action_taken('snowballsChance')
            if( onHit(aim, target,'scythe','Snowballs Chance') )
                if( doDamage(hurt, target) ){
                    target.attr('data-healthleft', 0 )
                    animateDamage(target, 0-target.data('health'))
                    displayAnimatedNews("snowball's chance<br/>succesful")
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target))
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
            un_glow()
            add_action_taken('iceblade')
            if( onHit(aim, target,'scythe','Iceblade') ){
                const { bspeed, baim, bdamage } = extractBoons_Blights(target)
                const extraWound = bspeed === -1 || baim === -1 || bdamage === -1 ? -1 : 0
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target))
                    else if (extraWound ===-1){
                        setTimeout(()=>{
                            target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-1) )
                            animateDamage(target, -1)
                            displayAnimatedNews(`${target.data('name')}<br/>iceblade`)
                            if( checkIfStillAlive(target) )
                                moveLadder(target, slayerPoints(target))
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
            un_glow()
            add_action_taken('icebolt')
            if( onHit(aim, target,'spell','Icebolt') ){
                setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
                displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target, slayerPoints(target) )
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
            un_glow()
            displayAnimatedNews('Cold Bones<br/>shamble onwards')
        }
    },
    frostyGlance:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken('frostyGlance')
            if( onHit(aim, target,'spell','Frosty Glance') ){//allow for bonus one hex movement for Halftusk action here
                highlightHexes({colour:'legendaryGlow',dist:1},$('.selectedModel'))
                highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                setBoons_Blights(target,{bprotection:(Number(target.attr('data-bprotection'))-1) })
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
        un_glow()
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
             
            un_glow()
            add_action_taken('snowbladefight')
            if( onHit(aim, target,'sword','Snowblade Fight') )
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
            un_glow()
            add_action_taken('chillOut')
            if( onHit(aim, target,'spell','Chill Out') ){
                setBoons_Blights(target,{bdamage:Number(target.attr('data-bdamage'))-1})
                displayAnimatedNews(`${target.data('name')}<br/>-1 damage`)
            } else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    stolenTreasure:sT,
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
        if(phase==='white'&&$('.activated.whiteTeam[data-tenmodel]').length === $('.whiteTeam[data-tenmodel]').length){
            socket.emit('turnEnd',{current:'white', next:'black'})
            strajng+="<br/>turn end"
        }else if(phase==='black' && side===mySide){
            socket.emit('turnEnd',{current:'black', next:'black'})
            strajng+="<br/>turn end"
        }
        displayAnimatedNews(strajng)
    },
    dwhnt:function(o){console.log('inside dwhnt')
        const { key } = o
        if( key === mySide ){console.log('mySide is tru ', key)
            myTurn = true
            displayAnimatedNews('You go<br/>first')
            $(`.warbandToken.${mySide}`).text('1')
            $(`.warbandToken.${opoSide}`).text('2')
            if(mySide === 'left' )
                $('#coin').detach().appendTo('.block11')
            else
                $('#coin').detach().appendTo('.block12')
        } else {console.log('mySide is tru ', key)
            myTurn = false
            $(`.warbandToken.${mySide}`).text('2')
            $(`.warbandToken.${opoSide}`).text('1')
            displayAnimatedNews('You go<br/>second')
            if(mySide === 'left' )
                $('#coin').detach().appendTo('.block12')
            else
                $('#coin').detach().appendTo('.block11')
        }
        phase = 'white'
        myNextPhase = 'white'
        $('.endPhase').removeClass('endPhase').addClass('plotPhase')
        update_basket()
        turn_resetter(opoSkillTrack,'white','blackTeam')
        turn_resetter(mySkillTrack,'white','whiteTeam')
    },
    royalSummonsBlack:royalSummons_,
    royalSummonsWhite:royalSummons_,
    summonsWalk:function(o){
        const { hex, row } = o
        $('.summonsWalk_selected').removeClass('summonsWalk_selected summonsWalk')
        const drake = $($(`.hex_${hex}_in_row_${row}`).children('.summonsWalk')[0])
        drake.addClass('summonsWalk_selected')
        un_glow()
        highlightHexes({colour:'legendaryGlow', dist:3}, $('.summonsWalk_selected'))
    },
    rally_drakes_:function(){
        current_ability_method = null
        const side = $('.selectedModel[data-tenmodel^="Keera"]').data('side')
        rally_drakes(side)
    },
    walk_drakes_:function(){
        current_ability_method = ()=>true
        const team = $('.selectedModel[data-tenmodel^="Keera"]').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        const drakes = $(`[data-tenmodel^="YoungDragons"].${team}`)
        walk_drakes(drakes)
    },
    regalBlessing:function(o){
        const { hex, row } = o
        const target = $($(`.hex_${hex}_in_row_${row}`).children('[data-tenmodel^="YoungDragons"]')[0])
        un_glow()
        current_ability_method = null
        add_action_taken('regalBlessing')
        if( target.length ){
            setBoons_Blights( target, {baim:Number(target.attr('data-baim'))+1})
            displayAnimatedNews()
        }
    },
    firebrand:function(o){
        un_glow()
        add_action_taken('legendary')
        const team = $('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        const opoteam = !$('.selectedModel').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        const drakes = $(`[data-tenmodel^="YoungDragons"].${team}`)
        current_ability_method = null
        drakes.each(function(){
            highlightHexes({colour:'redGlow',dist:2}, $(this) )
            $('[data-glow].hexagon').children(`.champModel.${opoteam}:not(".beaten_already")`).each(function(){
                const target = $(this)
                target.addClass('beaten_already')
                target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-2) )
                animateDamage(target, -2)
                if( checkIfStillAlive(target) )
                    moveLadder(target, slayerPoints(target) )
            })
            un_glow()
        })
        $('.beaten_already').removeClass('beaten_already')
        displayAnimatedNews()
    },
    draconicRage:function(o){
        add_action_taken('draconicRage')
        current_ability_method = null
        un_glow()
        setBoons_Blights( $('.selectedModel'), { bdamage: Number( $('.selectedModel').attr('data-bdamage') )+1 })
        displayAnimatedNews()
    },
    roar:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("roar")
            if( onHit(aim, target, 'spell','Roar') ){
                setBoons_Blights( target, { bdodge: Number( target.attr('data-bdodge') )-1 })
            }
        }
        current_ability_method = null
    },
    viciousBite:function(o){
        const drakes = kause_of_Keera()
        drakes.each(function(){
            highlightHexes({colour:'redGlow',dist:1}, $(this))
        })
        current_ability_method = _m.viciousBite_onDrakes
    },
    viciousBite_onDrakes:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("viciousBite")
            if( onHit(aim, target, 'spell','Vicious Bite') ){
                if( target.hasClass('champModel')){
                    target.attr('data-healthleft', (Number(target.attr('data-healthleft'))-2) )
                    animateDamage(target, -2)
                }
                if( checkIfStillAlive(target) ){
                    moveLadder(target, slayerPoints(target) )
                } else if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) ){
                        moveLadder(target, slayerPoints(target) )
                    } else null
                }
            }
        }
        current_ability_method = null

    },
    rainOfFire:function(o){
        const drakes = kause_of_Keera()
        drakes.each(function(){
            highlightHexes({colour:'redGlow',dist:1}, $(this))
        })
        current_ability_method = _m.rainOfFire_onDrakes
    },
    rainOfFire_onDrakes:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            un_glow()
            add_action_taken("rainOfFire")
            if( onHit(aim, target, 'spell','Vicious Bite') ){
                setBoons_Blights( target, { bprotection:Number( target.attr('data-bprotection') ) - 1 })
                if( doDamage(hurt, target) ){
                    if( checkIfStillAlive(target) ){
                        moveLadder(target, slayerPoints(target) )
                    } else null
                }
            }
        }
        current_ability_method = null

    },
    bite:function(o){},
    fieryBreath:function(o){},
}