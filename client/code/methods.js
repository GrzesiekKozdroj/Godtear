const blight_icon = o => `<img class="${o} BB_s small_icon blight" src="../img/${o}.svg" />`;
const boon_icon = o => `<img class="${o} BB_s small_icon boon" src="../img/${o}.svg" />`;
let walk = 'walk', 
    speedBlight = blight_icon('speedBlight'), 
    speedBoon = boon_icon('speedBoon'), 
    aim = 'aim', 
    aimBlight = blight_icon('aimBlight'), 
    aimBoon = boon_icon('aimBoon'), 
    dodge = 'dodge', 
    dodgeBlight = blight_icon('dodgeBlight'), 
    dodgeBoon = boon_icon('dodgeBoon'), 
    hurt = 'hurt', 
    damageBlight = blight_icon('damageBlight'), 
    damageBoon = boon_icon('damageBoon'), 
    shield = 'shield', 
    protectionBlight = blight_icon('protectionBlight'), 
    protectionBoon = boon_icon('protectionBoon'), 
skull = 'skull', 
cogs = 'cogs', 
sefl = 'self', 
star = 'star';


const m =
{
    universal:
    {
        walk: function (e, thiz) { // thiz is hext to step on
            if( standardWalk ({ 
                    $model: $('.selectedModel'), 
                    $destination: thiz, 
                    rules: [ 'onlyOneStep', 'checkActionsCount' ] 
                })
            )
            {
                const h = thiz.data('hex')
                const r = thiz.data('row')
                socket.emit('modelMoving', { h, r })
                reduceSpeedLeft()
                makeAnim( $('.selectedModel.whiteTeam'), thiz, displayMovementAura )
            }
        },
        stepOnBanner: function (model,whereTo, points = true){
            if( whereTo.children(`.claimedBanner`).length && model.hasClass('smallCard') ){
                rockFormation(whereTo,()=>{whereTo.find(`.claimedBanner`).remove()})
                //this ought to be thing functionalised
                counterMaker(model,phase!=='end'?'bannersSlayed':'bannersStayed')
                if( points )
                    moveLadder(model,-1)
            }
        },
        claim: function (thiz, teamColor, key = "claimed") {//console.log(key), key = "claimed"
            thiz.append(placeBanner(teamColor))
            un_glow()
            add_action_taken(key)
            shayle_takes_action()
            if(phase==='white')
                moveLadder($(thiz.children('.claimedBanner')),$(thiz.children('.claimedBanner')).data('color')  )
            counterMaker($('.selectedModel'),'bannersClaimed')
            displayAnimatedNews({templateType:'info',$attacker:$('.selectedModel'),msg1:` claims objective`})
        }
    },
    blackjaw:
    {
        black:
        {
            kick:
            {
                name: "Kick",
                desc: "Must target a follower.",
                icon: skull,
                dist: 1,
                aim: [6],
                hurt: [6],
                unused: true,
                m: "kick"
            },
            fieryAxe:
            {
                name: "Fiery Axe",
                desc: "This skill may target up to three models in one hex.",
                icon: skull,
                dist: 1,
                aim: [4],
                hurt: [5],
                unused: true,
                m: "fieryAxe"
            },
            fireball:
            {
                name: "Fireball",
                desc: "This skill may target up to three models in one hex.",
                icon: skull,
                dist: 2,
                aim: [5],
                hurt: [4],
                unused: true,
                m: "fireball"
            }
        },
        white:
        {
            hootfoot:
            {
                name: "Hootfoot",
                desc: speedBoon,
                icon: cogs,
                dist: 2,
                unused: true,
                m: "hootfoot"
            },
            evilEye:
            {
                name: "Evil Eye",
                desc: `Must target a follower. ${protectionBlight}`,
                icon: skull,
                dist: 2,
                aim: [6],
                unused: true,
                m: "evilEye"
            }
        },
        util:
        {
            legendary:
            {
                name: "Fire Storm",
                desc: "Must target followers. This skill may target up to five followers on any hexes within range.",
                icon: skull,
                dist: 2,
                aim: [6],
                hurt: [5],
                unused: true,
                legendaryUsed: false,
                m: "fireStorm"
            },
            wildfire:
            {
                name: "Wildfire",
                desc: "If Blackjaw knocks out a follower during his activation, he may make a bonus action that activation.",
                m: function () { }
            }
        }
    },
    unburntReavers:
    {
        black:
        {
            warCry:
            {
                name: "War Cry",
                desc: aimBoon,
                icon: 'self',
                m: "warCry"
            },
            cleavingStrike:
            {
                name: "Cleaving Strike",
                icon: skull,
                dist: 1,
                aim: [3, 4, 5],
                hurt: [4, 5, 6],
                m:"cleavingStrike"
            }
        },
        white:
        {
            rush:
            {
                name: "Rush",
                desc: "Each Unburnt Reaver in this hex may move up to 2 hexes.",
                dist:2,
                icon: 'self',
                m: "rush"
            },
            intimidation:
            {
                name: "Intimidation",
                desc: `Hit Effect: ${dodgeBlight}`,
                icon:skull,
                dist: 1,
                aim: [2, 4, 6],
                m: "intimidation"
            }
        },
        util:
        {
            fearsome:
            {
                name: "Fearsome",
                desc: `If a small enemy is within 3 hexes of one or more Unburnt Reavers and has fewer than three models in its hex, all of its skills have -1 aim.`,
                m: "fearsome"
            }
        }
    },
    Titus:
    {
        black:
        {
            piercingStrike:
            {
                name: "Piercing Strike",
                desc: "This skill may target up to two models in the same hex.",
                icon: skull,
                dist: 1,
                aim: [5],
                hurt: [6],
                unused: true,
                m: "piercingStrike"
            },
            sweepingSlash:
            {
                name: "Sweeping Slash",
                desc: "This skill may target up to two models that are in different hexes",
                icon: skull,
                dist: 1,
                aim: [6],
                hurt: [5],
                unused: true,
                m: "sweepingSlash"
            }
        },
        white:
        {
            challenge:
            {
                name: "Challenge",
                desc: "An enemy model within range gains two different blights of your choice. Titus gains a blight of your opponents choice.",
                icon: star,
                dist: 2,
                unused: true,
                m: "challenge"
            },
            illKillYouAll:
            {
                name: "I'll Kill You All!",
                desc: `Must target a follower. <br/> Hit Effect: Move all followers in target's unit that are within range up to 1 hex.`,
                icon:skull,
                dist: 3,
                aim: [6],
                unused: true,
                m: "illKillYouAll"
            }
        },
        util:
        {
            legendary:
            {
                name: "Path of Destruction",
                desc: "Titus may make a skill action. Then he may move 1 hex. Then he may make another skill action",
                icon: 'self',
                unused: true,
                legendaryUsed: false,
                m: "pathOfDestruction"
            },
            superiority:
            {
                name: "Superiority",
                desc: `Titus has +1 ${dodge} against followers' hit rolls and +1 ${shield} against followers' damage rolls.`
            }
        }
    },
    glorySeekers:
    {
        black:
        {
            hack:
            {
                name: "Hack",
                desc: `Hit Effect: ${protectionBlight}`,
                icon: skull,
                dist: 1,
                aim: [5, 5, 6],
                unused: true,
                m: "hack"
            },
            surroundPound:
            {
                name: "SurroundPound",
                desc: `This skill has +1 ${aim} and ${hurt} for each other hex adjacent to the target that contains one or more Glory Seekers.`,
                icon: skull,
                dist: 1,
                aim: [4, 4, 4],
                hurt: [3, 4, 5],
                unused: true,
                m: "surroundPound"
            }
        },
        white:
        {
            roarOfBattle:
            {
                name: "Roar of Battle",
                desc: "One champion within range may move 1 hex.",
                icon: cogs,
                dist: 1,
                unused: true,
                m: "roarOfBattle"
            },
            outflank:
            {
                name: "Outflank",
                desc: "Hit Effect: Place each Glory Seeker that is adjacent to the target in a hex adjacent to the target.",
                icon: skull,
                dist: 1,
                aim: [6, 6, 6],
                unused: true,
                m: "outflank"
            }
        },
        util:
        {
            rapidDeployment:
            {
                name: "Rapid Deployment",
                desc: "After using a recruit action, the Glory Seeker returned to the battlefield moves up to 2 hexes.",
                m: "rapidDeployment"
            }
        }
    },
    grimgut:
    {
        black:
        {
            roll:
            {
                name: "Roll",
                desc: "Grimgut moves up to 3 hexes in a straight line.",
                icon: 'self',
                unused: true,
                m: "roll"
            },
             newSpewBlack:
             {
                 name: "New Spew",
                 desc: "Remove all Retchlings from the battlefield. Then they make five recruit actions.",
                 icon: cogs,
                 unused: true,
                 m: "newSpewBlack"
             },
            nomNomNom:
            {
                name: "Nom Nom Nom",
                desc: "Must target a follower.",
                icon: skull,
                dist: 1,
                aim: [7],
                hurt: [7],
                unused: true,
                m: "nomNomNom"
            }
        },
        white:
        {

            newSpewWhite:
            {
                name: "New Spew",
                desc: "Remove all Retchlings from the battlefield. Then they make five recruit actions.",
                icon: cogs,
                unused: true,
                m: "newSpewWhite"
            },
            fluSpew:
            {
                name: "Flu Spew",
                desc: `This skill targets each enemy champion and follower adjacent to one or more Retchlings. 
                    Hit Effect ${damageBlight}.`,
                icon: skull,
                aim: [4],
                unused: true,
                m: "fluSpew"
            },
            gooSpew:
            {
                name: "Goo Spew",
                desc: `This skill targets each enemy champion and follower unit adjacent to one or more Retchlings. 
                    Hit Effect: ${dodgeBlight}`,
                icon: skull,
                aim: [4],
                unused: true,
                m: "gooSpew"
            }
        },
        util:
        {
            legendary:
            {
                name: "Buffet",
                desc: "Must target followers. This skill may target up to three followers on any hexes within range.",
                icon:skull,
                dist: 1,
                aim: [7],
                hurt: [7],
                unused: true,
                legendaryUsed: false,
                m: "buffet"
            },
            spew:
            {
                name: "Spew",
                desc: "When Retchlings make a recruit action during Grimgut's activation, you may place new Retchlings adjacent to any Retchlings placed during this activation.",
                m: function () { }
            }
        }
    },
    retchlings:
    {
        black:
        {
            slimed:
            {
                name: "Slimed",
                desc: "This skill may target up to three models in one hex. Two Retchlings may use this skill in the same activaction if they are in different hexes.",
                icon: skull,
                dist: 2,
                aim: [3, 4, 5],
                hurt: [5, 5, 5],
                unused: true,
                m: "slimed"
            }
        },
        white:
        {
            slipAndSlide:
            {
                name: "Slip and Slide",
                desc: `${speedBoon}. Two Retchlings may use this skill in the same activation if they are on different hexes.`,
                icon: cogs,
                dist: 1,
                unused: true,
                m: "slipAndSlide"
            }
        },
        util:
        {
            wretched:
            {
                name: "Wretched",
                desc: "When a Retchling is knocked out, it is worth 0 steps instead of 1."
            }
        }
    },
    halftusk:
    {
        black:
        {
            regenerateBlack:
            {
                name: "Regenerate ",
                desc: "Remove up to 2 of Halftusk's wounds.",
                icon: 'self',
                unused: true,
                m: "regenerateBlack"
            },
            onePunch:
            {
                name: "One Punch",
                desc: "Hit Effect: Halftusk may use Two Punch this turm as a bonus action.",
                icon: skull,
                dist: 1,
                aim: [6],
                hurt: [4],
                unused: true,
                m: "onePunch"
            },
            twoPunch:
            {
                name: "Two Punch",
                desc: "Hit Effect: Halftusk may move up to 1 hex.",
                icon: skull,
                dist: 1,
                aim: [4],
                hurt: [5],
                unused: true,
                m: "twoPunch"
            },
        },
        white:
        {
            regenerateWhite:
            {
                name: "Regenerate",
                desc: "Remove up to 2 of Halftusk's wounds.",
                icon: 'self',
                unused: true,
                m: "regenerateWhite"
            },
            footwork:
            {
                name: "Footwork",
                desc: dodgeBoon,
                icon: cogs,
                dist: 2,
                unused: true,
                m: "footwork"
            },
            feint:
            {
                name: "Feint",
                desc: `Hit Effect: ${aimBlight}`,
                icon: skull,
                dist: 2,
                aim: [5],
                unused: true,
                m: "feint"
            }
        },
        util:
        {
            legendary:
            {
                name: "the Great Tusk",
                desc: `Plot Phase only. Halftusk may make a claim action. Then choose ${dodgeBoon} or ${protectionBoon}. Friendy models within range gain the boon you chose.`,
                icon: star,
                unused: true,
                legendaryUsed: false,
                m: "theGreatTusk"
            },
            fightingFit:
            {
                name: "Fighting Fit",
                desc: `If Halftusk does not have any wounds, his skills have +2 ${aim}.`
            }
        }
    },
    froglodytes:
    {
        black:
        {
            tongueTow:
            {
                name: "Tongue Tow",
                desc: "Move a friendly banner that is within range up to 1 hex toward this froglodyte",
                icon: star,
                dist: 2,
                unused: true,
                m: "tongueTow"
            },
            tongueLash:
            {
                name: "Tongue Lash",
                desc: "Hit effect: Move target up to 1 hex towards this Froglodyte.",
                icon: skull,
                dist: 2,
                aim: [5, 6, 7],
                unused: true,
                m: "tongueLash"
            }
        },
        white:
        {
            feelThePower:
            {
                name: "Feel the Power",
                desc: `This skill may be used only while on an objective hex. ${dodgeBoon} ${protectionBoon}.`,
                icon: "self",
                unused: true,
                m: "feelThePower"
            },
            hop:
            {
                name: "Hop",
                desc: "You may place each Froglodyte in a hex up to 2 hexes from its current hex.",
                icon: 'self',
                unused: true,
                dist: 2,
                m: "hop"
            }
        },
        util: {
            tearTwisted:
            {
                name: "Tear-Twisted",
                desc: "Froglodytes may enter objective hexes."
            }
        }
    },
    Rhodri:
    {
        black:
        {
            marchRhodriBlack:
            {
                name: "March",
                desc: "Move Rhodri up to 1 hex.",
                icon: 'self',
                unused: true,
                dist:1,
                m: "marchRhodriBlack"
            },
            shieldBash:
            {
                name: "Shield Bash",
                desc: `Hit Effect: ${damageBlight}. Move target up to 2 hexes away from Rhodri.`,
                icon: skull,
                dist: 1,
                aim: [7],
                unused: true,
                m: "shieldBash"
            },
            swordSlash:
            {
                name: "Sword Slash",
                icon: skull,
                dist: 1,
                aim: [5],
                hurt: [6],
                unused: true,
                m: "swordSlash"
            },
        },
        white:
        {
            marchRhodriWhite:
            {
                name: "March",
                desc: "Move Rhodri up to 1 hex.",
                icon: 'self',
                unused: true,
                dist:1,
                m: "marchRhodriWhite"
            },
            answerTheCall:
            {
                name: "Answer the Call",
                desc: "Choose a follower within range. Its unit makes a recruit action.",
                icon: cogs,
                dist: 2,
                unused: true,
                m: "answerTheCall"
            },
            hold:
            {
                name: "Hold!",
                desc: protectionBoon,
                icon: cogs,
                dist: 2,
                unused: true,
                m: "hold"
            }
        },
        util:
        {
            legendary:
            {
                name: "Bannerfall",
                desc: "Clash phase only. Make a claim action.",
                unused: true,
                legendaryUsed: false,
                icon: 'self',
                dist:1,
                m: "bannerfall"
            },
            unyielding:
            {
                name: "Unyielding",
                desc: "If Rhodri is adjacent to a friendly banner he cannot be moved by enemy models."
            }
        }
    },
    householdGuard:
    {
        black:
        {
            marchGuardBlack:
            {
                name: "March",
                desc: "Move each Household Guard up to 1 hex.",
                icon: 'self',
                unused: true,
                m: "marchGuardBlack"
            },
            swordStrike:
            {
                name: "Sword Strike",
                icon: skull,
                dist: 1,
                aim: [5, 5, 5],
                hurt: [4, 5, 6],
                unsed: true,
                m: "swordStrike"
            }
        },
        white:
        {
            brace:
            {
                name: "Brace",
                desc: protectionBoon,
                icon: 'self',
                unused: true,
                m: "brace"
            },
            marchGuardWhite:
            {
                name: "March",
                desc: "Move each Household Guard up to 1 hex.",
                icon: 'self',
                unused: true,
                m: "marchGuardWhite"
            }
        },
        util:
        {
            shieldWall:
            {
                name: "Shield Wall",
                desc: "Household Guard in hexes adjacent to Rhodri cannot be moved by enemy models."
            }
        }
    },
    mournblade:
    {
        black:
        {
            deathWind:
            {
                name: "Death Wind",
                desc: "If Mournblade's banner is within range, place it on an objective hex within range.",
                icon: "star",
                dist: 2,
                unused: true,
                m: "deathWind"
            },
            raiseDeadChamps:
            {
                name: "Raise Dead",
                desc: "All friendly champions within range may make a rally action.",
                icon: cogs,
                unused: true,
                m: "raiseDeadChamps"
            },
            soulCleave:
            {
                name: "Soul Cleave",
                desc: "Hit Effect: The Knightshades make a recruit action.",
                icon: skull,
                dist: 3,
                aim: [5],
                hurt: [5],
                unused: true,
                m: "soulCleave"
            }
        },
        white:
        {
            graveSummons:
            {
                name: "Grave Summons",
                desc: "Mournblade makes a claim action. You may place his banner on any objective hex within range.",
                icon: star,
                unused: true,
                dist:3,
                m: "graveSummons"
            },
            forwardMinions:
            {
                name: "Forward Minions!",
                desc: "Move each Knightshade that is within range up to 2 hexes.",
                icon: cogs,
                dist: 4,
                unused: true,
                m: "forwardMinions"
            }
        },
        util:
        {
            legendary:
            {
                name: "Grasping Dead",
                desc: "Remove all Knightshades from the battlefield. Then place all three Knightshades on hexes that are within 3 hexes of Mournblade.",
                icon: "cogs",
                unused: true,
                legendaryUsed: false,
                m:"graspingDead"
            },
            undying:
            {
                name: "Undying",
                desc: "When Mournblade is knocked out, he is worth 1 step instead of 4. When an enemy is knocked out, Mournblade may immediately make a rally action."
            }
        }
    },
    knightshades:
    {
        black:
        {
            depthsOfSorrow:
            {
                name: "Depths of Sorrow",
                desc: aimBoon,
                icon: 'self',
                unused: true,
                m: "depthsOfSorrow"
            },
            deathsDoor:
            {
                name: "Death's Door",
                desc: `If the Knightshades made a recruit action this activation, Death's Door has +1 ${aim} and ${hurt}.`,
                icon: skull,
                dist: 1,
                aim: [4, 5, 5],
                hurt: [4, 4, 5],
                unused: true,
                m: "deathsDoor"
            }
        },
        white:
        {
            carefulMaster:
            {
                name: "Careful, Master",
                desc: `Click Mournblade if in range, he gains ${dodgeBoon}.`,
                icon: cogs,
                dist: 3,
                unused: true,
                m: "carefulMaster"
            },
            wheresMaster:
            {
                name: "Where's Master?",
                desc: "Click Mournblade if within range, he may make a rally action or move up to 2 hexes.",
                icon: cogs,
                dist: 3,
                unused: true,
                m: "wheresMaster"
            }
        },
        util:
        {
            deathGrip:
            {
                name: "DeathGrip",
                desc: "Enemy models that make an advance acction while they are adjacent to a Knightshade have speed 0 during that advance action.",
                m: "deathGrip"
            }
        }
    },
    finvarr:
    {
        black:
        {
            mirage:
            {
                name: "Mirage",
                desc: "Choose a friendly banner within 2 hexes of Finvarr. Place it on an objective hex that is 1 hex away from its current hex.",
                icon: star,
                dist: 2,
                unused: true,
                m: "mirage"
            },
            voidWeaponChamp:
            {
                name: "Void Weapon",
                desc: damageBoon,
                icon: 'self',
                unused: true,
                m: "voidWeaponChamp"
            },
            lifeBlade:
            {
                name: "Life Blade",
                desc: "Hit Effect: Remove up to 1 of Finvarr's wounds.",
                icon: skull,
                dist: 1,
                aim: [4],
                hurt: [5],
                unused: true,
                m: "lifeBlade"
            }
        },
        white:
        {
            poisedToStrike:
            {
                name: "Poised to Strike",
                desc: speedBoon,
                icon: 'self',
                unused: true,
                m: "poisedToStrike"
            },
            shadowWard:
            {
                name: "Shadow Ward",
                desc: "Hit Effect: Move target up to 1 hex",
                icon: skull,
                dist: 2,
                aim: [5],
                unused: true,
                m: "shadowWard"
            }
        },
        util:
        {
            legendary:
            {
                name: "Phantom Banners",
                desc: "Choose any number of friendly banners within range. Place them on objective hexes within range.",
                dist: 4,
                unused: true,
                legendaryUsed: false,
                icon: star,
                m: "phantomBanners"
            },
            bannerWarden:
            {
                name: "Banner Warden",
                desc: `If Finvarr is on an objective hex, his skills have +2${aim}.`,
                m: "bannerWarden"
            }
        }
    },
    shadowSentinels:
    {
        black:
        {
            voidWeapon:
            {
                name: "Void Weapon",
                desc: aimBoon,
                icon: 'self',
                unused: true,
                m: "voidWeapon"
            },
            lifeTrade:
            {
                name: "Life Trade",
                desc: "If this skill knocks out na enemy while Shadow Sentinels are below their maximum unit size, add 1 Shadow Sentinel to this hex.",
                icon: skull,
                dist: 1,
                aim: [4, 5, 5],
                hurt: [4, 5, 5],
                unused: true,
                m: "lifeTrade"
            },
            shadowStepBlack:
            {
                name: "Shadow Step",
                desc: "If the Shadow Sentinels do not make an advance action during their activation, each Shadow Sentinel may move up to 1 hex when activation ends.",
                m: "shadowStepBlack",
                icon:'self'
            }
        },
        white: {
            protect:
            {
                name: "Protect",
                desc: protectionBoon,
                icon: cogs,
                dist: 1,
                unused: true,
                m: "protect"
            },
            shadowSnare:
            {
                name: "Shadow Snare",
                desc: `Hit Effect: ${speedBlight}.`,
                icon: skull,
                dist: 1,
                aim: [4, 5, 5],
                unused: true,
                m: "shadowSnare"
            },
            shadowStepWhite:
            {
                name: "Shadow Step",
                desc: "If the Shadow Sentinels do not make an advance action during their activation, each Shadow Sentinel may move up to 1 hex when activation ends.",
                m: "shadowStepWhite",
                icon:'self'
            }
        },
        util:{}
    },
    Nia:
    {
        black:
        {
            crystalGlare:
            {
                name: "Crystal Glare",
                desc: "Choose a blight on any model within range. Then Choose an enemy model within range to gain that blight.",
                icon: star,
                dist: 2,
                unused: true,
                m: "crystalGlare"
            },
            erosion:
            {
                name: "Erosion",
                desc: `Hit Effect: ${protectionBlight}.`,
                icon: skull,
                dist: 2,
                aim: [5],
                unused: true,
                m: "erosion"
            },
            blindingLight:
            {
                name: "Blinding Light",
                desc: `Hit Effect: ${aimBlight}`,
                icon: skull,
                dist: 2,
                aim: [4],
                hurt: [5],
                unused: true,
                m: "blindingLight"
            },
            rockConcertBlack://not yet madeable, no activation validation structure to give such a boon
            {
                name: "Rock Concert",
                desc: "If all 3 Quartzlings are on the battlefield when Nia activates, she may make a bonus action that activation.",
                m: "rockConcertBlack",
                icon: cogs,
                unused:true
            }
        },
        white:
        {
            crystalMirror:
            {
                name: "Crystal Mirror",
                desc: "Choose a boon on any friendly model within range. Then choose a friendly model within range to gain that boon.",
                dist: 2,
                icon: star,
                unused: true,
                m: "crystalMirror"
            },
            meditation:
            {
                name: "Meditation",
                desc: aimBoon,
                icon: 'self',
                unused: true,
                m: "meditation"
            },
            marchNia:
            {
                name: "March",
                desc: "Move Nia up to 1 hex.",
                icon: 'self',
                unused: true,
                m: "marchNia"
            },
            rockConcertWhite://not yet madeable, no activation validation structure to give such a boon
            {
                name: "Rock Concert",
                desc: "If all 3 Quartzlings are on the battlefield when Nia activates, she may make a bonus action that activation.",
                m: "rockConcertWhite",
                icon: cogs,
                unused:true
            }
        },
        util:
        {
            legendary://SUPER DUPER MEGA SLOW 4 seconds wait to load all glows
            {
                name: "Geode",
                desc: "Plot Phase only. Choose a Quartzling that is the only model in its hex and is adjacent to an objective hex, and replace it with an objective hex. If it is within 2 hexes of Nia, she may make a claim action on that hex.",
                icon:star,
                unused: true,
                legendaryUsed: false,
                m: "geode"
            }
        }
    },
    quartzlings:
    {
        black:
        {
            rollingStones:
            {
                name: "Rolling Stones",
                desc: "Each Quartzling may move up to 3 hexes in a straight line.",
                icon: 'self',
                unused: true,
                m: "rollingStones"
            },
            stoneThrow:
            {
                name: "Stone Throw",
                icon: skull,
                dist: 2,
                aim: [4, 5, 5],
                hurt: [4, 4, 5],
                unused: true,
                m: "stoneThrow"
            }
        },
        white:
        {
            calcify:
            {
                name: "Calcify",
                desc: "If this Quartzling is the only model in its hex and is adjacent to an objective hex, replace it with an objective hex.",
                icon: 'self',
                unused: true,
                m: "calcify"
            },
            shimmer:
            {
                name: "Shimmer",
                desc: `Hit Effect: ${speedBlight}`,
                dist: 2,
                aim: [4, 5, 5],
                icon: skull,
                unused: true,
                m: "shimmer"
            }
        },
        util:
        {
            rockFormation:
            {
                name: "Rock Formation",
                desc: "When Nia's banner is removed from battlefield, the Quartzlings may immediately make a recruit action, even if its the end phase.",
                m: "rockFormation"
            }
        }
    },
    raithMarid:
    {
        black:
        {
            kerSplashBlack:
            {
                name: "Ker-Splash",
                desc: "Choose a hex within range containing one Splashling. Remove the Splashling and place Raith'Marid in that hex.",
                icon: 'self',
                dist: 3,
                unused: true,
                m: "kerSplashBlack"
            },
            headbutt:
            {
                name: "Headbutt",
                desc: "Hit Effect: Move target up to 1 hex.",
                icon: skull,
                dist: 1,
                aim: [5],
                hurt: [5],
                unused: true,
                m: "headbutt"
            },
            lungingStrike:
            {
                name: "Lunging Strike",
                desc: "Before the hit roll, move Raith,Marid up to 1 hex towards the target.",
                icon: skull,
                dist: 2,
                aim: [6],
                hurt: [4],
                unused: true,
                m: "lungingStrike"
            }
        },
        white:
        {
            underthrow:
            {
                name: "Underthrow",
                desc: "Choose an empty objective hex within range. Place it on an empty non-objective hex within range.",
                dist: 1,
                icon: star,
                unused: true,
                m: "underthrow"
            },
            kerSplashWhite:
            {
                name: "Ker-Splash",
                desc: "Choose a hex within range containing one Splashling. Remove the Splashling and place Raith'Marid in that hex.",
                icon: 'self',
                dist: 3,
                unused: true,
                m: "kerSplashWhite"
            },
            jet:
            {
                name: "Jet",
                desc: "Move a Splashilng within range up to 3 hexes.",
                icon: cogs,
                dist: 2,
                unused: true,
                m: "jet"
            }
        },
        util:
        {
            legendary:
            {
                name: "Tsunami",
                desc: "Place Raith'Marid on a hex within range. Then move each enemy model within 2 hexes of him up to 2 hexes in the order of your choice.",
                icon: "star",
                dist: 3,
                unused: true,
                legendaryUsed: false,
                m: "tsunami"
            },
            ripplingScales:
            {
                name: "Rippling Scales",
                desc: "When a splashling leaves the battlefield, Raith'Marid may gain the boon of your choice.",
                m: "ripplingScales"
            }
        },
    },
    splashlings:
    {
        black:
        {
            currentBlack:
            {
                name: "Current",
                desc: "You may place each Splashling in a hex up to 3 hexes from its current hex.",
                icon: 'self',
                unused: true,
                m: "currentBlack"
            },
            tideBlack:
            {
                name: "Tide",
                desc: "Hit Effect: Move target up to 1 hex.",
                dist: 2,
                aim: [5, 6, 7],
                icon: skull,
                unused: true,
                m: "tideBlack"
            },
            likeWaterBlack:
            {
                name: "Like Water",
                desc: "Once per phase during the Splashlings' activation, you may choose a boon on Raith'Marid. The Splashlings gain that boon.",
                m: "likeWaterBlack",
                icon:cogs,
                zero:true
            }
        },
        white:
        {
            currentWhite:
            {
                name: "Current",
                desc: "You may place each Splashling in a hex up to 3 hexes from its current hex.",
                icon: 'self',
                unused: true,
                m: "currentWhite"
            },
            tideWhite:
            {
                name: "Tide",
                desc: "Hit Effect: Move target up to 1 hex.",
                dist: 2,
                aim: [5, 6, 7],
                icon: skull,
                unused: true,
                m: "tideWhite"
            },
            likeWaterWhite:
            {
                name: "Like Water",
                desc: "Once per phase during the Splashlings' activation, you may choose a boon on Raith'Marid. The Splashlings gain that boon.",
                m: "likeWaterWhite",
                icon:cogs,
                zero:true
            }
        },
        util:
        {
        }
    },
    shayle:
    {
        black:
        {
            tremor:
            {
                name: "Tremor",
                desc: "Remove all boons from enemies within range",
                icon: star,
                dist: 2,
                unused: true,
                m: "tremor"
            },
            stoneSpikes:
            {
                name: "Stone Spikes",
                desc: speedBlight,
                icon: skull,
                dist: 3,
                aim: [5],
                unused: true,
                m: "stoneSpikes"
            }
        },
        white:
        {
            stoneStrenght:
            {
                name: "Stone Strenght",
                desc: `If Landslide is within range, it gains ${protectionBoon} and ${damageBoon}.`,
                icon: cogs,
                dist: 3,
                unused: true,
                m: "stoneStrenght"
            },
            runeweaving:
            {
                name: "Runeweaving",
                desc: "Hit Effect: Move a boon from the target to any model within range.",
                icon: skull,
                dist:3,
                aim: [6],
                unused: true,
                m: "runeweaving"
            }
        },
        util:
        {
            legendary:
            {
                name: "Avalanche",
                desc: "Choose any number of objective hexes within 3 hexes of Landslide. Move each up to 1 hex onto an empty non-objective hex in any order. Models on the objective hexes move with them.",
                icon: star,
                unused: true,
                legendaryUsed: false,
                m: "avalanche"
            },
            runecaller:
            {
                name: "Runecaller",
                desc: "After Shayle makes an action during his activation, if he is within 3 hexes of Landslide, you may place Landslide in a hex up to 2 hexes from its current hex.",
                m: function () { }
            }
        }
    },
    landslide:
    {
        black:
        {
            earthquakeBlack:
            {
                name: "Earthquake",
                desc: "Hit Effect: Move target champion or all followers in target's unit up to 2 hexes.",
                icon: skull,
                dist: 2,
                aim: [4],
                unused: true,
                m: "earthquakeBlack"
            },
            boulderBash:
            {
                name: "Boulder Bash",
                desc: `Hit Effect: ${dodgeBlight}`,
                icon: skull,
                dist: 1,
                aim: [6],
                hurt: [6],
                unused: true,
                m: "boulderBash"
            }
        },
        white:
        {
            eruption:
            {
                name: "Eruption",
                desc: `Friendly and enemy models adjacent to Landslide gain ${protectionBlight}.`,
                icon: star,
                dist: 1,
                unused: true,
                m: "eruption"
            },
            earthquakeWhite:
            {
                name: "Earthquake",
                desc: "Hit Effect: Move target champion or all folowers in target's unit up to 2 hexes.",
                icon: skull,
                dist: 2,
                aim: [4],
                unused: true,
                m: "earthquakeWhite"
            }
        },
        util:
        {
            rubble:
            {
                name: "Rubble",
                desc: "When Landslide is knocked out, replace it with an objective hex.",
                m: "rubble"
            }
        }
    },
    rattlebone:
    {
        black:
        {
            cursedGround://no endphase yet
            {
                name: "Cursed Ground",
                desc: "Place up to two objective hexes on empty non-objective hexes withing range. Remove them at the end of the clash phase.",
                dist: 2,
                icon: star,
                unused: true,
                m: "cursedGround"
            },
            deadlyCurse:
            {
                name: "Deadly Curse",
                desc: `Hit Effect: The target gains ${aimBlight} or ${damageBlight}.`,
                icon: skull,
                dist: 2,
                aim: [4],
                hurt: [6],
                unused: true,
                m: "deadlyCurse"
            },
            rollTheBonesBlack:
            {
                name: "Roll the Bones",
                desc: "At the end of Rattlebone's activation, roll one die. If you roll a 1 or 2, you may remove a boon or blight from a model within that many exes of Rattlebone and place it on a different model within that many hexes.",
                icon:'cogs',
                m: 'rollTheBonesBlack',
                zero:true
            }
        },
        white:
        {
            callTotems:
            {
                name: "Call Totems",
                desc: "Remove any number of Hexlings from the battlefield, then place them on hexes within 2 hexes of Rattlebone.",
                icon: cogs,
                unused: true,
                m: "callTotems"
            },
            graspingCurse:
            {
                name: "Grapsing Curse",
                desc: `Hit Effect: The target gains ${speedBlight} or ${dodgeBlight}.`,
                dist: 2,
                aim: [6],
                icon:skull,
                unused: true,
                m: "graspingCurse"
            },
            rollTheBonesWhite:
            {
                name: "Roll the Bones",
                desc: "At the end of Rattlebone's activation, roll one die. If you roll a 1 or 2, you may remove a boon or blight from a model within that many exes of Rattlebone and place it on a different model within that many hexes.",
                icon:'cogs',
                m: 'rollTheBonesWhite',
                zero:true
            }
        },
        util:
        {
            legendary:
            {
                name: "Power Hex",
                desc: "Chooxe one blight for each Hexling within range. Each enemy champion within range gains those blights.",
                icon: star,
                dist: 2,
                unused: true,
                legendaryUsed: false,
                m: "powerHex"
            }
        }
    },
    hexlings:
    {
        black:
        {
            purgeMagic:
            {
                name: "Purge Magic",
                desc: "Move all boons and blights from the Hexlings, to a friendly model within range.",
                icon: cogs,
                dist: 2,
                unused: true,
                m: "purgeMagic"
            },
            hexBoltBlack:
            {
                name: "Hex Bolt",
                desc: "Hit Effect: The target gains blight of your choice.",
                icon: skull,
                dist: 2,
                aim: [2, 4, 6],
                unused: true,
                m: "hexBoltBlack"
            }
        },
        white:
        {
            attuneMagic:
            {
                name: "Attune Magic",
                desc: "Gain the boon of your choice.",
                icon: 'self',
                unused: true,
                m: "attuneMagic"
            },
            hexBoltWhite:
            {
                name: "Hex Bolt",
                desc: "Hit effect: The target gains the blight of your choice.",
                icon: skull,
                dist: 2,
                aim: [2, 4, 6],
                unused: true,
                m: "hexBoltWhite"
            }
        },
        util:
        {
            hexEaters:
            {
                name: "Hex Eaters",
                desc: "When Rattlebone rolls a blank on her Roll the Bones roll, the Hexlings may gain the boon of your choice.",
                m:'hexEaters'
            }
        }
    },
    lorsann:
    {
        black:
        {
            piercingShot:
            {
                name:"Piercing Shot",
                desc:"Hit Effect: The target gains 1 wound.",
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:"piercingShot"
            },
            mysticArrow:
            {
                name:"Mystic Arrow",
                desc:`After the mystic arrow damage roll, make a 5 damage roll againt the target.`,
                icon:skull,
                dist:3,
                aim:[3],
                hurt:[5],
                unused:true,
                m:"mysticArrow"
            },
            snipe:
            {
                name:"Snipe",
                icon:skull,
                dist:3,
                aim:[8],
                hurt:[4],
                unused:true,
                m:"snipe"
            }
        },
        white:
        {
            fieldInstruction:
            {
                name:"Field Instruction",
                desc:damageBoon,
                icon:cogs,
                dist:2,
                unused:true,
                m:"fieldInstruction"
            },
            faryFire:
            {
                name:"Fairy Fire ",
                desc:`Hit Effect: ${protectionBlight}.`,
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:"faryFire"
            }
        },
        util:
        {
            legendary:
            {
                name:"Deathblow",
                desc:"Hit Effect: The target gains 2 wounds.",
                icon:skull,
                dist:3,
                aim:[6],
                unused:true,
                legendaryUsed:false,
                m:"deathblow"
            },
            shootAndScoot:
            {
                name:"Shoot and Scoot",
                desc:"After Lorsann uses a skill that inflicts 1 or more wounds, she may move up to 1 hex.",
                m:function(){}
            }
        }
    },
    mistwoodRangers:
    {
        black:
        {
            aim:
            {
                name:"Aim",
                desc:aimBoon,
                icon:'self',
                unused:true,
                m:"aim"
            },
            fire:
            {
                name:"Fire",
                icon:skull,
                dist:3,
                aim:[3,4,5],
                hurt:[3,4,5],
                unused:true,
                m:"fire"
            }
        },
        white:
        {
            blur:
            {
                name:"Blur",
                desc:dodgeBoon,
                icon:'self',
                unused:true,
                m:"blur"
            },
            faryFire_MR:
            {
                name:"Fairy Fire",
                desc:`Hit Effect: ${protectionBlight}.`,
                icon:skull,
                dist:3,
                aim:[3,4,5],
                unused:true,
                m:"faryFire_MR"
            }
        },
        util:
        {
            killShot:
            {
                name:"Kill Shot",
                desc:`When the target is a wounded enemy chmpion, the Mistwood Rangers' skills have +1${hurt}.`,
                m:false
            }
        }
    },
    sneakyPeet:
    {
        black:
        {
            plotRevenge:
            {
                name:"Plot Revenge",
                desc:aimBoon,
                icon:cogs,
                dist:2,
                unused:true,
                m:"plotRevenge"
            },
            annoy:
            {
                name:"Annoy",
                desc:"Hit Effect: Move target up to 2 hexes toward Sneaky Peet.",
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:"annoy"
            },
            backstabBlack:
            {
                name:"Backstab",
                desc:"If this attack hits a champion, the champion gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[5],
                hurt:[5],
                unused:true,
                m:"backstabBlack"
            }
        },
        white:
        {
            leap:
            {
                name:"Leap",
                desc:"You may place Sneaky Peet on a hex up to 2 hexes away from his current hex.",
                icon:'self',
                unused:true,
                dist:2,
                m:"leap"
            },
            backstabWhite:
            {
                name:"Backstab",
                desc:"If this attack hits a champion, the champion gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[5],
                hurt:[5],
                unused:true,
                m:"backstabWhite"
            }
        },
        util:
        {
            legendary:
            {
                name:"Pounce",
                desc:"Before the hit roll, you may place Sneaky Peet on a hex adjacent to the target.",
                icon:skull,
                dist:2,
                aim:[6],
                hurt:[6],
                unused:true,
                legendaryUsed:false,
                m:"pounce"
            },
            gangBoss:
            {
                name:"Gang Boss",
                desc:`Sneaky Peet's skills have +1 aim for each Sneaky Stabber adjacent to the target.`,
                m:'gangBoss'
            }
        }
    },
    sneakyStabbers:
    {
        black:
        {
            sneak:
            {
                name:"sneak",
                desc:"Remove one sneaky Stabber from the battlefield. Then make a recruit action.",
                icon:'self',
                unused:true,
                m:"sneak"
            },
            irritate:
            {
                name:"Irritate",
                desc:`Hit Effect: ${aimBlight}.`,
                icon:skull,
                dist:3,
                aim:[3,5,7],
                unused:true,
                m:"irritate"
            }
        },
        white:
        {
            sprint:
            {
                name:"Sprint",
                desc:"One Sneaky Stabber may move up to 3 hexes.",
                icon:'self',
                unused:true,
                m:"sprint"
            },
            letMeDoIt:
            {
                name:"Let&nbsp;Me Do&nbsp;It!",
                icon:skull,
                dist:1,
                aim:[7,5,3],
                hurt:[4,5,6],
                unused:true,
                m:"letMeDoIt"
            }
        },
        util:
        {
            smallAndSneaky:
            {
                name:"Small and Sneaky",
                desc:"Sneaky Stabber may move through other models' hexes but cannot end their movement on those hexes.",
                m:function(){}
            }
        }
    },
    rangosh:
    {
        black:
        {
            jawbreaker:
            {
                name:"Jawbreaker",
                desc:"Hit Effect: Move target up to 1 hex away from Rangosh.",
                icon:skull,
                dist:1,
                aim:[3],
                hurt:[7],
                unused:true,
                m:"jawbreaker"
            },
            whiplash:
            {
                name:"Whiplash",
                desc:"Hit Effect: Move Target up to 1 hex towards Rangosh.",
                icon:skull,
                dist:2,
                aim:[5],
                hurt:[5],
                unused:true,
                m:"whiplash"
            },
            brutalMasterBlack:
            {
                name:"Brutal Master",
                desc:"Once per hit roll or damage roll before rolling the dice, you may remove one Red Bandit from a hex within 3 hexes of Rangosh to add 1 die to Rangosh's roll.",
                dist:3,
                icon:'cogs',
                m:"brutalMasterBlack",
                zero:true
            }
        },
        white:
        {
            channelRage:
            {
                name:"Channel Rage",
                desc:damageBoon,
                icon:'self',
                unused:true,
                m:"channelRage"
            },
            breakSpirit:
            {
                name:"Break Spirit",
                desc:`Hit Effect: ${dodgeBlight}.`,
                icon:skull,
                dist:2,
                aim:[6],
                unused:true,
                m:"breakSpirit"
            },
            brutalMasterWhite:
            {
                name:"Brutal Master",
                desc:"Once per hit roll or damage roll before rolling the dice, you may remove one Red Bandit from a hex within 3 hexes of Rangosh to add 1 die to Rangosh's roll.",
                dist:3,
                icon:'cogs',
                m:"brutalMasterWhite",
                zero:true
            }
        },
        util:
        {
            legendary:
            {
                name:"Beastly Charge",
                desc:"Move Rangosh up to 2 hexes. Then you may place up to 2 wounds on an enemy within range.",
                icon:star,
                dist:1,
                unused:true,
                legendaryUsed:false,
                m:"beastlyCharge",
                preface:"beastlyCharge"
            }
        }
    },
    redBandits:
    {
        black:
        {
            ambushBlack:
            {
                name:"Ambush",
                desc:"Hit Effect: The target gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[3,4,5],
                unused:true,
                m:"ambushBlack"
            },
            shoot:
            {
                name:"Shoot",
                icon:skull,
                dist:3,
                aim:[3,4,5],
                hurt:[4,4,4],
                unused:true,
                m:"shoot"
            }
        },
        white:
        {
            induct:
            {
                name:"Induct",
                desc:"If the Red Bandits are below their maximum unit size, add one to a hex containing at least one Red Bandit.",
                icon:'self',
                unused:true,
                m:"induct",
            },
            ambushWhite:
            {
                name:"Ambush",
                desc:"Hit Effect: The target gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[3,4,5],
                unused:true,
                m:"ambushWhite"
            }
        },
        util:
        {
            stolenTreasure:
            {
                name:"Stolen Treasure",
                desc:"If the Red Bandits cause an enemy model to gain a wound when they use a skill action, they may gain a boon of your choice.",
                m:"stolenTreasure"
            }
        }
    },
    morrigan:
    {
        black:
        {
            snowballsChance:
            {
                name:"Snowball's Chance",
                desc:"If this skill wounds the target, they gain wounds untill they are knocked out.",
                icon:skull,
                dist:1,
                aim:[1],
                hurt:[2],
                unused:true,
                m:"snowballsChance"
            },
            iceblade:
            {
                name:"Iceblade",
                desc:`Hit Effect: If the target has ${speedBlight} ${aimBlight} or ${damageBlight}, it gains 1 wound.`,
                icon:skull,
                dist:1,
                aim:[5],
                hurt:[5],
                unused:true,
                m:"iceblade"
            },
            icebolt:
            {
                name:"Icebolt",
                desc:`Hit Effect: ${aimBlight}.`,
                icon:skull,
                dist:3,
                aim:[7],
                hurt:[3],
                unused:true,
                m:"icebolt"
            }
        },
        white:
        {
            forwardMinionsMorrigan:
            {
                name:"Forward, Minions!",
                desc:"Move each Cold Bones that is within range up to 2 hexes.",
                icon:cogs,
                dist:4,
                unused:true,
                m:"forwardMinionsMorrigan"
            },
            frostyGlance:
            {
                name:"Frosty Glance",
                desc:`Hit Effect: ${protectionBlight}. Move Morrigan up to 1 hex towards the target.`,
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:"frostyGlance"
            }
        },
        util:
        {
            legendary:
            {
                name:"Flash Freeze",
                desc:`All enemies within range gain ${dodgeBlight} and ${speedBlight}.`,
                icon:star,
                dist:3,
                unused:true,
                legendaryUsed:false,
                m:"flashFreeze"
            },
            frostForged:
            {
                name:"Frost Forged",
                desc:"Morrigan gains a +2 bonus for boons instead of a +1 bonus.",
                m:"frostForged"
            }
        }
    },
    coldBones:
    {
        black:
        {
            intenseCold:
            {
                name:"Intense Cold",
                desc:damageBoon,
                icon:'self',
                unused:true,
                m:"intenseCold"
            },
            snowbladefight:
            {
                name:"Snowblade Fight!",
                desc:`This skill has +1 ${aim} for each Cold Bones adjacent to the target.`,
                dist:1,
                icon:skull,
                aim:[1,1,1],
                hurt:[3,4,5],
                unused:true,
                m:"snowbladefight"
            }
        },
        white:
        {
            soCoolMistress:
            {
                name:"So Cool, Mistress!",
                desc:`If Morrigan is within ranage, she gains ${aimBoon} or ${speedBoon}.`,
                icon:cogs,
                dist:3,
                unused:true,
                m:"soCoolMistress"
            },
            chillOut:
            {
                name:"Chill Out",
                desc:`This skill has +1 ${aim} for each Cold Bones adjacent to the target. Hit Effect: ${damageBlight}.`,
                dist:1,
                aim:[1,1,1],
                icon:skull,
                unused:true,
                m:"chillOut"
            }
        },
        util:
        {
            brainFreeze:
            {
                name:"Brain Freeze",
                desc:`After an enemy model uses a skill to knock out one or more Cold Bones, the enemy model gains ${dodgeBlight}.`,
                m:'brainFreeze'
            }
        }
    },
    keera:{
        black:{
            royalSummonsBlack:{
                name:"Royal Summons",
                desc:`Young dragons may make an advance action or a recruit action`,
                icon:'cogs',
                unused:true,
                m:"royalSummonsBlack"
            },
            viciousBite:{
                name:"Vicious Bite",
                desc:`If the target is a champion it gains 1 wound.`,
                icon:skull,
                dist:1,
                aim:[4],
                hurt:[7],
                unused:true,
                itskeera:true,
                m:"viciousBite"
            },
            rainOfFire:{
                name:"Rain Of Fire",
                desc:`Hit Effect: -1 ${protectionBlight}.`,
                icon:skull,
                dist:1,
                aim:[7],
                hurt:[4],
                unused:true,
                itskeera:true,
                m:"rainOfFire"
            }
        },
        white:{
            royalSummonsWhite:{
                name:"Royal Summons",
                desc:`Young Dragons may make an advance action or a recruit action.`,
                icon:'cogs',
                unused:true,
                m:"royalSummonsWhite"
            },
            regalBlessing:{
                name:"Regal Blessing",
                dist:3,
                desc:`If a Young Dragon is within range they gain ${aimBoon}.`,
                icon:'cogs',
                unused:true,
                m:"regalBlessing"
            }
        },
        util:{
            legendary:{
                name:"Firebrand",
                desc:`Each enemy champion that is within 2 hexes of 1 or more Young Dragons gains 1 wound`,
                icon:star,
                unused:true,
                legendaryUsed:false,
                m:"firebrand"
            },
            byMyCommand:{
                name:"By My Command!",
                desc:"The range of Keera's skull skills must be determined from a Young Dragon within 3 hexes of her.",
                m:"frostForged"
            }
        }

    },
    youngDragons:{
        black:{
            bite:{
                name:"Bite",
                desc:`If the target is a champion it gains 1 wound.`,
                icon:skull,
                dist:1,
                aim:[3],
                hurt:[5],
                unused:true,
                m:"bite"
            },
            fieryBreath:{
                name:"Fiery Breath",
                desc:`Hit Effect: -1 ${protectionBlight}.`,
                dist:1,
                aim:[5],
                hurt:[3],
                unused:true,
                icon:skull,
                m:"fieryBreath"
            }
        },
        white:{
            draconicRage:{
                name:"Draconic Rage",
                desc:`${damageBoon}.`,
                icon:'self',
                unused:true,
                m:"draconicRage"
            },
            roar:{
                name:"Roar",
                desc:`Hit Effect: -1 ${dodgeBlight}.`,
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:"roar"
            }
        },
        util:{
            flight:{
                name:"Flight",
                desc:"During an advance action, the Young Dragons may move through other models' hexes but cannot end their movement on those hexes'.",
                m:"flight"
            }
        }
    }
}