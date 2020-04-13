const blight_icon = o => `
    <div class="${o} small_icon blight" style="background-image:url('../img/${o}.png')">
        <div class="small_minus"></div>
    </div>
`;
const boon_icon = o => `
    <div class="${o} small_icon boon" style="background-image:url('../img/${o}.png')">
        <div class="small_plus"></div>
    </div>
`;
let walk = 'walk', 
walkBlight = `walkBlight`, walkBoon = 'walkBoon', aim = 'aim', aimBlight = 'aimBlight', aimBoon = 'aimBoon', dodge = 'dodge', dodgeBlight = 'dodgeBlight', dodgeBoon = 'dodgeBoon', hurt = 'hurt', hurtBlight = 'hurtBlight', hurtBoon = 'hurtBoon', shield = 'shield', shieldBlight = 'shieldBlight', shieldBoon = 'shieldBoon', 
skull = 'skull', 
cogs = 'cogs', 
self = 'self', 
star = 'star';


const m =
{
    universal:
    {
        walk: function (e, thiz) { 
            const { type, name } = $('.selectedModel.whiteTeam').data()
            if( 
              (
                !thiz.hasClass('objectiveGlow') || 
                type !== 'unit' || 
                name === 'Froglodytes'
              ) &&
              (
                  !thiz.children(`.smallCard`).length || 
                ( 
                  name === thiz.children(`.smallCard.whiteTeam`).first().data('name') && 
                  thiz.children(`.smallCard`).length < 3
                )
              ) && onlyOneStep(thiz) &&  check_actions_count()
            )
            {
                const h = thiz.data('hex')
                const r = thiz.data('row')
                socket.emit('modelMoving',{h:h,r:r})
                reduceSpeedLeft()
                makeAnim( $('.selectedModel.whiteTeam'), thiz, displayMovementAura )
            }
        },
        recruit: function () { },
        rally: function () { },
        dieGrunt: function () { },
        dieChamp: function () { },
        claim: function (thiz, teamColor) {
            if_moved_end_it()
            thiz.append(placeBanner(teamColor))
            $('[data-glow]').removeAttr('data-glow');console.log('REMOVE GLOW')
            add_action_taken()
            moveLadder($(thiz.children('.claimedBanner')),$(thiz.children('.claimedBanner')).data('color')  )
            displayAnimatedNews(`${ $('.selectedModel').data('name') }<br/>claims objective`)
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
                desc: walkBoon,
                icon: cogs,
                dist: 2,
                unused: true,
                m: "hootfoot"
            },
            evilEye:
            {
                name: "Evil Eye",
                desc: `Must target a follower. ${shieldBlight}`,
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
                icon: self,
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
                icon: self,
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
                desc: `If a small enemy is within 3 hexes of one or more Unburnt Reavers and has fewer than three models in its hex, all of its skills have -1 ${aim}.`,
                m: function () { }
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
                icon: self,
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
                desc: `Hit Effect: ${shieldBlight}`,
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
                m: function () { }
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
                icon: self,
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
                    Hit Effect ${hurtBlight}.`,
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
                desc: `${walkBoon}. Two Retchlings may use this skill in the same activation if they are on different hexes.`,
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
                icon: self,
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
                icon: self,
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
                desc: `Plot Phase only. Halftusk may make a claim action. Then choose ${dodgeBoon} or ${shieldBoon}. Friendy models within range gain the boon you chose.`,
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
                desc: `This skill may be used only while on an objective hex. ${dodgeBoon} ${shieldBoon}.`,
                icon: "self",
                unused: true,
                m: "feelThePower"
            },
            hop:
            {
                name: "Hop",
                desc: "You may place each Froglodyte in a hex up to 2 hexes from its current hex.",
                icon: self,
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
                icon: self,
                unused: true,
                dist:1,
                m: "marchRhodriBlack"
            },
            shieldBash:
            {
                name: "Shield Bash",
                desc: `Hit Effect: ${hurtBlight}. Move target up to 2 hexes away from Rhodri.`,
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
                icon: self,
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
                desc: shieldBoon,
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
                icon: self,
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
                icon: self,
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
                desc: shieldBoon,
                icon: self,
                unused: true,
                m: "brace"
            },
            marchGuardWhite:
            {
                name: "March",
                desc: "Move each Household Guard up to 1 hex.",
                icon: self,
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
            soulClave:
            {
                name: "Soul Cleave",
                desc: "Hit Effect: The Knightshades make a recruit action.",
                icon: skull,
                dist: 3,
                aim: [5],
                hurt: [5],
                unused: true,
                m: "soulClave"
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
                icon: self,
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
                m: function () { }
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
                desc: hurtBoon,
                icon: self,
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
                desc: walkBoon,
                icon: self,
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
                m: "null"
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
                icon: self,
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
            }
        },
        white: {
            protect:
            {
                name: "Protect",
                desc: shieldBoon,
                icon: cogs,
                dist: 1,
                unused: true,
                m: "protect"
            },
            shadowSnare:
            {
                name: "Shadow Snare",
                desc: `Hit Effect: ${walkBlight}.`,
                icon: skull,
                dist: 1,
                aim: [4, 5, 5],
                unused: true,
                m: "shadowSnare"
            }
        },
        util://waits until proper action validation
        {
            shadowStep:
            {
                name: "Shadow Step",
                desc: "If the Shadow Sentinels do not make an advance action during their activation, each Shadow Sentinel may move up to 1 hex when activation ends.",
                m: function () { }
            }
        }
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
                desc: `Hit Effect: ${shieldBlight}.`,
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
                icon: self,
                unused: true,
                m: "meditation"
            },
            marchNia:
            {
                name: "March",
                desc: "Move Nia up to 1 hex.",
                icon: self,
                unused: true,
                m: "marchNia"
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
                dist:13,
                legendaryUsed: false,
                m: "geode"
            },
            rockConcert://not yet madeable, no activation validation structure to give such a boon
            {
                name: "Rock Concert",
                desc: "If all 3 Quartzlings are on the battlefield when Nia activates, she may make a bonus action that activation.",
                m: function () { }
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
                icon: self,
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
                m: function () { }
            }
        },
        white:
        {
            calcify:
            {
                name: "Calcify",
                desc: "If this Quartzling is the only model in its hex and is adjacent to an objective hex, replace it with an objective hex.",
                icon: self,
                unused: true,
                m: function () { }
            },
            shimmer:
            {
                name: "Shimmer",
                desc: `Hit Effect: ${walkBlight}`,
                dist: 2,
                aim: [4, 5, 5],
                icon: skull,
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            rockFormation:
            {
                name: "Rock Formation",
                desc: "When Nia's banner is removed from battlefield, the Quartzlings may immediately make a recruit action, even if its the end phase.",
                m: function () { }
            }
        }
    },
    raithMarid:
    {
        black:
        {
            kerSplash:
            {
                name: "Ker-Splash",
                desc: "Choose a hex within range containing one Splashling. Remove the Splashling and place Raith'Marid in that hex.",
                icon: self,
                dist: 3,
                unused: true,
                m: function () { }
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
                M: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            kerSplash:
            {
                name: "Ker-Splash",
                desc: "Choose a hex within range containing one Splashling. Remove the Splashling and place Raith'Marid in that hex.",
                icon: self,
                dist: 3,
                unused: true,
                m: function () { }
            },
            jet:
            {
                name: "Jet",
                desc: "Move a Splashilng within range up to 3 hexes.",
                icon: cogs,
                dist: 2,
                unused: true,
                m: function () { }
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
                m: function () { }
            },
            ripplingScales:
            {
                name: "Rippling Scales",
                desc: "When a splashling leaves the battlefield, Raith'Marid may gain the boon of your choice.",
                m: function () { }
            }
        },
    },
    splashlings:
    {
        black:
        {
            current:
            {
                name: "Current",
                desc: "You may place each Splashling in a hex up to 3 hexes from its current hex.",
                icon: self,
                unused: true,
                m: function () { }
            },
            tide:
            {
                name: "Tide",
                desc: "Hit Effect: Move target up to 1 hex.",
                dist: 2,
                aim: [5, 6, 7],
                icon: skull,
                unused: true,
                m: function () { }
            }
        },
        white:
        {
            current:
            {
                name: "Current",
                desc: "You may place each Splashling in a hex up to 3 hexes from its current hex.",
                icon: self,
                unused: true,
                m: function () { }
            },
            tide:
            {
                name: "Tide",
                desc: "Hit Effect: Move target up to 1 hex.",
                dist: 2,
                aim: [5, 6, 7],
                icon: skull,
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            likeWater:
            {
                name: "Like Water",
                desc: "Once per phase during the Splashlings' activation, you may choose a boon on Raith'Marid. The Splashlings gain that boon.",
                m: function () { }
            }
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
                m: function () { }
            },
            stoneSpikes:
            {
                name: "Stone Spikes",
                desc: walkBlight,
                icon: skull,
                dist: [3],
                aim: [5],
                unused: true,
                m: function () { }
            }
        },
        white:
        {
            stoneStrenght:
            {
                name: "Stone Strenght",
                desc: `If Landslide is within range, it gains ${shieldBoon} and ${hurtBoon}.`,
                icon: cogs,
                dist: 3,
                unused: true,
                m: function () { }
            },
            runeweaving:
            {
                name: "Runeweaving",
                desc: "Hit Effect: Move a boon from the target to any model within range.",
                icon: skull,
                dist:[3],
                aim: [6],
                unused: true,
                m: function () { }
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
                m: function () { }
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
            earthquake:
            {
                name: "Earthquake",
                desc: "Hit Effect: Move target champion or all followers in target's unit up to 2 hexes.",
                icon: skull,
                dist:[2],
                aim: [4],
                unused: true,
                m: function () { }
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
                m: function () { }
            }
        },
        white:
        {
            eruption:
            {
                name: "Eruption",
                desc: `Friendly and enemy models adjacent to Landslide gain ${shieldBlight}.`,
                icon: star,
                dist: 1,
                unused: true,
                m: function () { }
            },
            earthquake:
            {
                name: "Earthquake",
                desc: "Hit Effect: Move target champion or all folowers in target's unit up to 2 hexes.",
                icon: skull,
                dist: 2,
                aim: [4],
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            rubble:
            {
                name: "Rubble",
                desc: "When Landslide is knocked out, replace it with an objective hex.",
                m: function () { }
            }
        }
    },
    rattlebone:
    {
        black:
        {
            cursedGround:
            {
                name: "Cursed Ground",
                desc: "Place up to two objective hexes on empty non-objective hexes withing range. Remove them at the end of the clash phase.",
                dist: 2,
                icon: star,
                unused: true,
                m: function () { }
            },
            deadlyCurse:
            {
                name: "Deadly Curse",
                desc: `Hit Effect: The target gains ${aimBlight} or ${hurtBlight}.`,
                icon: skull,
                dist: 2,
                aim: [4],
                hurt: [6],
                unused: true,
                m: function () { }
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
                m: function () { }
            },
            graspingCurse:
            {
                name: "Grapsing Curse",
                desc: `Hit Effect: The target gains ${walkBlight} or ${dodgeBlight}.`,
                dist: 2,
                aim: [6],
                icon:skull,
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            legendary:
            {
                name: "Power Hex",
                desc: "Chooxe on blight for each Hexling within range. Each enemy champion within range gains those blights.",
                icon: star,
                dist: 2,
                unused: true,
                legendaryUsed: false,
                m: function () { }
            },
            rollTheBones:
            {
                name: "Roll the Bones",
                desc: "At the end of Rattlebone's activation, roll one die. If you roll a 1 o 2, you may remove a boon or blight from a odel within that many exes of Rattlebone and place it on a different model within that many hexes.",
                m: function () { }
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
                m: function () { }
            },
            hexBolt:
            {
                name: "Hex Bolt",
                desc: "Hit Effect: The target gains the blights of your choice.",
                icon: skull,
                dist: 2,
                aim: [2, 4, 6],
                unused: true,
                m: function () { }
            }
        },
        white:
        {
            attuneMagic:
            {
                name: "Attune Magic",
                desc: "Gain the boon of your choice.",
                icon: self,
                unused: true,
                m: function () { }
            },
            hexBolt:
            {
                name: "Hex Bolt",
                desc: "Hit effect: The target gains the blight of your choice.",
                icon: skull,
                dist: 2,
                aim: [2, 4, 6],
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            hexEaters:
            {
                name: "Hex Eaters",
                desc: "When Rattlebone rolls a blank on her Roll the Bones roll, the Hexlings may gain the boon of your choice."
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
                m:function(){}
            },
            mysticArrow:
            {
                name:"Mystic Arrow",
                desc:`After the mystic arrow damage roll, make a 5${hurt} damage roll againt the target.`,
                icon:skull,
                dist:3,
                aim:[3],
                hurt:[5],
                unused:true,
                m:function(){}
            },
            snipe:
            {
                name:"Snipe",
                icon:skull,
                dist:3,
                aim:[8],
                hurt:[4],
                unused:true,
                m:function(){}
            }
        },
        white:
        {
            fieldInstruction:
            {
                name:"Field Instruction",
                desc:hurtBoon,
                icon:cogs,
                dist:2,
                unused:true,
                m:function(){}
            },
            faryFire:
            {
                name:"Fairy Fire ",
                desc:`Hit Effect: ${shieldBlight}.`,
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:function(){}
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
                m:function(){}
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
                icon:self,
                unused:true,
                m:function(){}
            },
            fire:
            {
                name:"Fire",
                icon:skull,
                dist:3,
                aim:[3,4,5],
                hurt:[3,4,5],
                unused:true,
                m:function(){}
            }
        },
        white:
        {
            blur:
            {
                name:"Blur",
                desc:dodgeBoon,
                icon:self,
                unused:true,
                m:function(){}
            },
            faryFire:
            {
                name:"Fairy Fire",
                desc:`Hit Effect: ${shieldBlight}.`,
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:function(){}
            }
        },
        util:
        {
            killShot:
            {
                name:"Kill Shot",
                desc:`When the target is a wounded enemy chmpion, the Mistwood Rangers' skills have +1${hurt}.`,
                m:function(){}
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
                m:function(){}
            },
            annoy:
            {
                name:"annoy",
                desc:"Hit Effect: Move target up to 2 hexes toward Sneaky Peet.",
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:function(){}
            },
            backstab:
            {
                name:"Backstab",
                desc:"If this attack hits a champion, the champion gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[5],
                hurt:[5],
                unused:true,
                m:function(){}
            }
        },
        white:
        {
            leap:
            {
                name:"Leap",
                desc:"You may place Sneaky Peet on a hex up to 2 hexes away from his current hex.",
                icon:self,
                unused:true,
                m:function(){}
            },
            backstab:
            {
                name:"Backstab",
                desc:"If this attack hits a champion, the champion gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[5],
                hurt:[5],
                unused:true,
                m:function(){}
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
                m:function(){}
            },
            gangBoss:
            {
                name:"Gang Boss",
                desc:`Sneaky Peet's skill have +1${aim} for Sneaky Stabber adjacent to the target.`,
                m:function(){}
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
                icon:self,
                unused:true,
                m:function(){}
            },
            irritate:
            {
                name:"Irritate",
                desc:`Hit Effect: ${aimBlight}.`,
                icon:skull,
                dist:3,
                aim:[3,5,7],
                unused:true,
                m:function(){}
            }
        },
        white:
        {
            sprint:
            {
                name:"Sprint",
                desc:"One Sneaky Stabber may move up to 3 hexes.",
                icon:self,
                unused:true,
                m:function(){}
            },
            letMeDoIt:
            {
                name:"Let Me Do It!",
                icon:skull,
                dist:1,
                aim:[7,5,3],
                hurt:[4,5,6],
                unused:true,
                m:function(){}
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
                m:function(){}
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
                m:function(){}
            }
        },
        white:
        {
            channelRage:
            {
                name:"Channel Rage",
                desc:hurtBoon,
                icon:self,
                unused:true,
                m:function(){}
            },
            breakSpirit:
            {
                name:"Break Spirit",
                desc:`Hit Effect: ${dodgeBlight}.`,
                icon:skull,
                dist:2,
                aim:[6],
                unused:true,
                m:function(){}
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
                m:function(){}
            },
            brutalMaster:
            {
                name:"Brutal Master",
                desc:"Once per hit roll or damage roll before rolling the dice, you may remove one Red Bandit from a hex within 3 hexes of Rangosh to add 1 die to Rangosh's roll.",
                m:function(){}
            }
        }
    },
    redBandits:
    {
        black:
        {
            ambush:
            {
                name:"Ambush",
                desc:"Hit Effect: The target gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[3,4,5],
                unused:true,
                m:function(){}
            },
            shoot:
            {
                name:"Shoot",
                icon:skull,
                dist:3,
                aim:[3,4,5],
                hurt:[4,4,4],
                unused:true,
                m:function(){}
            }
        },
        white:
        {
            induct:
            {
                name:"Induct",
                desc:"If the Red Bandits are below their maximum unit size, add one to a hex containing at least one Red Bandit.",
                icon:self,
                unused:true,
                m:function(){}
            },
            ambush:
            {
                name:"Ambush",
                desc:"Hit Effect: The target gains 1 wound.",
                icon:skull,
                dist:1,
                aim:[3,4,5],
                unused:true,
                m:function(){}
            }
        },
        util:
        {
            stolenTreasure:
            {
                name:"Stolen Treasure",
                desc:"If the Red Bandits cause an enemy model to gain a wound when they use a skill action, they may gain a boon of your choice.",
                m:function(){}
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
                desc:"If this skill wounds the targe, they gain wounds untill they are knocked out.",
                icon:skull,
                dist:1,
                aim:[1],
                hurt:[2],
                unused:true,
                m:function(){}
            },
            iceblade:
            {
                name:"Iceblade",
                desc:`Hit Effect: If the target has ${walkBlight} ${aimBlight} or ${hurtBlight}, it gains 1 wound.`,
                icon:skull,
                dist:1,
                aim:[5],
                hurt:[5],
                unused:true,
                m:function(){}
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
                m:function(){}
            }
        },
        white:
        {
            forwardMinions:
            {
                name:"Forward, Minions!",
                desc:"Move each Cold Bones that is within range up top 2 hexes.",
                icon:cogs,
                dist:4,
                unused:true,
                m:function(){}
            },
            frostyGlance:
            {
                name:"Frosty Glance",
                desc:`Hit Effect: ${shieldBlight}. Move Morrigan up to 1 hex towards the target.`,
                icon:skull,
                dist:3,
                aim:[5],
                unused:true,
                m:function(){}
            }
        },
        util:
        {
            legendary:
            {
                name:"Flash Freeze",
                desc:`All enemies within range gain ${dodgeBlight} and ${walkBlight}.`,
                icon:star,
                dist:3,
                unused:true,
                legendaryUsed:false,
                m:function(){}
            },
            frostForged:
            {
                name:"Frost Forged",
                desc:"Morrigan gains a +2 bonus for boons instead of a +1 bonus.",
                m:function(){}
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
                desc:hurtBoon,
                icon:self,
                unused:true,
                m:function(){}
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
                m:function(){}
            }
        },
        white:
        {
            soCoolMistress:
            {
                name:"So Cool, Mistress!",
                desc:`If Morrigan is within rnage, she gains ${aimBoon} or ${walkBoon}.`,
                icon:cogs,
                dist:3,
                unused:true,
                m:function(){}
            },
            chillOut:
            {
                name:"Chill Out",
                desc:`This skill has +1 ${aim} for each Cold Bones adjacent to the target. Hit Effect: ${hurtBlight}.`,
                dist:1,
                aim:[1,1,1],
                icon:skull,
                unused:true,
                m:function(){}
            }
        },
        util:
        {
            brainFreeze:
            {
                name:"Brain Freeze",
                desc:`After an enemy model uses a skill to knock out one or more Cold Bones, the enemy model gains ${dodgeBlight}.`,
                m:function(){}
            }
        }
    }
}

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
                socket.emit('rolloSkill',{ aim: (4 + baim), hurt:(5 + bdamage), socksMethod:"fieryAxe", hex, row, multiAction })
            } else { 
                clearInterval(interval)
            }
        }, 1000);
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
        }, 1000);
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
        if($target){
            socket.emit('rolloSkill',{aim:6+baim, hurt:0, socksMethod:"evilEye", hex, row})
        }
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
            } else displayAnimatedNews ("target enemy<br/>units")
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
        if( baim < 1 )
            socket.emit('rolloSkill',{aim:0, hurt: 0, socksMethod:"warCry", hex, row})
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
        const { hex, row } = target
        let destination = $(`.hex_${hex}_in_row_${row}`)
        if( 
            destination.children(`[data-name="${$('.selectedModel').data('name')}"]`).length ||
            !destination.children('.smallCard').length &&
            !destination.hasClass('objectiveGlow') 
        )
            socket.emit('rolloSkill',{hex,row,socksMethod:"rush",hurt:0,aim:0})
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
        } else 
            displayAnimatedNews('target enemy model')
    },
    illKillYouAll:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') )
            socket.emit('rolloSkill',{ aim: (6 + baim), hurt:0, socksMethod:"illKillYouAll", hex, row })
    },//NEEDS SKILL USE VALIDATION TO BE FINISHED!!!!!
    pathOfDestruction:function(origin,target){
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
                socket.emit('rolloSkill',{ aim: (aim + baim), hurt:0, socksMethod:"hack", hex, row })
    },
    surroundPound:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        let skillBonus = 0
        $('[data-glow]').removeAttr('data-glow')
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
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if( $target.hasClass(`champModel`) )
            socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"roarOfBattle", hex, row })
    },
    outflank:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const unitSize = origin.siblings('.smallCard').length
        const aim = [6, 6, 6][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim+ baim), hurt:0, socksMethod:"outflank", hex, row })
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
            } else displayAnimatedNews ("target enemy<br/>units")
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
            // name: "Buffet",
            // desc: "Must target followers. This skill may target up to three followers on any hexes within range.",
            // icon:skull,
            // dist: 1,
            // aim: [7],
            // hurt: [7],
            // unused: true,
            // legendaryUsed: false,
            // m: "buffet"
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
        let aim = 6 + baim + healthleft === 7 ? 2 : 0
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`))
            socket.emit('rolloSkill',{ aim: aim, hurt:(4 + bdamage), socksMethod:"onePunch", hex, row })
    },
    twoPunch:function(origin,target){
        const { baim, bdamage, healthleft } = extractBoons_Blights(origin)
        const { hex, row } = target
        let aim = 4 + baim + healthleft === 7 ? 2 : 0
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
        let aim = 5 + baim + healthleft === 7 ? 2 : 0
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.blackTeam')[0])
        if($target){
            socket.emit('rolloSkill',{aim:aim, hurt:0, socksMethod:"feint", hex, row})
        }
    },
    theGreatTusk:function(origin,target){
        if(phase==='white'){
            $('#gameScreen').append(greatTuskBoons(origin, "theGreatTusk",1,`apply one boon to friends within 2 hexes`))
            highlightHexes({colour:'claimColor',dist:2},origin)
            socket.emit('HH', {color:'claimColor',dist:2})
        }
    },
    tongueTow:function(origin,target){
        const { hex, row } = target
        const $target = $(`.hex_${hex}_in_row_${row}`)
        if( $target.children('.claimedBanner.whiteTeam').length ){
            displayAnimatedNews('reposition your banner')
            $('[data-glow]').removeAttr('data-glow')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            highlight_closest_path(origin.parent('.hexagon').data(),target)
            socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"tongueTow", hex, row})
        } else displayAnimatedNews('must target friendly banner')
    },
    tongueLash:function(origin,target){
        const { baim } = extractBoons_Blights(origin)
        const { hex, row } = target
        const unitSize = origin.siblings('.smallCard').length
        const aim = [5, 6, 7][unitSize]
        const $target = $(`.hex_${hex}_in_row_${row}`)
        if( $target.children('.smallCard.blackTeam').length ){
            displayAnimatedNews('reposition model')
            $('[data-glow]').removeAttr('data-glow')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.smallCard')[0]))
            $target.children('.claimedBanner').addClass('tongueLash_selected')
            socket.emit('rolloSkill',{aim:(baim+aim), hurt:0, socksMethod:"tongueLash", hex, row})
        } else displayAnimatedNews('must target<br/>enemy model')
    },
    feelThePower:function(origin,target){
        const { hex, row } = target ;
        let destination = $(`.hex_${hex}_in_row_${row}`)
        if( destination.hasClass('objectiveGlow') ){
            socket.emit('rolloSkill',{hex,row,socksMethod:"feelThePower",hurt:0,aim:0})
            setBoons_Blights(target,{
                bdodge:Number(target.attr('data-bdodge'))+1,
                bprotection:Number(target.attr('data-bprotection'))+1})
            displayAnimatedNews('Froglodytes <br/>+1 dodge & shield')
        } else
            displayAnimatedNews('must stand on<br/>objective hex')
    },
    hop:function(origin,target){
        const { hex, row } = target
        const parentHex = origin.parent('.hexagon')
        parentHex.children('.smallCard').addClass('hop')
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
            $('[data-glow]').removeAttr('data-glow')
            rallyActionDeclaration({ unitname, side, type, name })
            displayAnimatedNews(`${name} answers<br/>the call of Rhodri`)
        } displayAnimatedNews(`${name} has<br/>maximum unit size`)
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
        const $target = $(`.hex_${hex}_in_row_${row}.objectiveGlow`)
        if(phase==="black" && target){
            m.universal.claim( $target, 'whiteTeam' )
            socket.emit('stakeClaim',{hex: hex, row: row})
        }
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
        displayAnimatedNews('click banner<br/>then move it')
    },
    raiseDeadChamps:function(origin,target){
        const { hex, row } = target
        socket.emit('rolloSkill',{ aim: 0, hurt:0, socksMethod:"raiseDeadChamps", hex, row })
        displayAnimatedNews('choose champions<br/>to rally')
    },
    soulClave:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        if($target.hasClass(`blackTeam`) && $target.hasClass('unitModel') )
            socket.emit('rolloSkill',{ aim:(5+baim), hurt:(5+bdamage), socksMethod:"soulClave", hex, row, multiAction:mySide})
    },
    graveSummons:function(origin,target){
        const {hex,row}=target
        $('[data-glow]').removeAttr('data-glow')
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
        const aim = [4, 5, 5][unitSize]
        const hurt = [4, 4, 5][unitSize]
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (aim + baim), hurt:(hurt + bdamage), socksMethod:"deathsDoor", hex, row })
    },
    carefulMaster:function(origin,target){
        const { hex, row } = target
        $target = $(`.hex_in_${hex}_row_in_${row}`).children('[data-name="Mournblade"].whiteTeam')
        if( $target ){
            socket.emit('rolloSkill',{ aim:0, hurt:0, socksMethod:"carefulMaster", hex, row })
        } else if ( !$target ) displayAnimatedNews('Must target<br/>your Mournblade')
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
            displayAnimatedNews('reposition your banner')
            $('[data-glow]').removeAttr('data-glow')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"tongueTow", hex, row})
        } else displayAnimatedNews('must target friendly banner')
    },
    voidWeaponChamp:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"voidWeaponChamp", hex, row})
    },
    lifeBlade:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const bannerWarden = $(`.hex_${hex}_in_row_${row}`).hasClass('objectiveGlow') ? 2 : 0
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (4 + baim + bannerWarden), hurt:(5 + bdamage), socksMethod:"lifeBlade", hex, row })
    },
    poisedToStrike:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"poisedToStrike", hex, row})
    },
    shadowWard:function(origin,target){
        const { baim, bdamage } = extractBoons_Blights(origin)
        const { hex, row } = target
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const bannerWarden = $(`.hex_${hex}_in_row_${row}`).hasClass('objectiveGlow') ? 2 : 0
        if($target.hasClass(`blackTeam`) )
            socket.emit('rolloSkill',{ aim: (5 + baim + bannerWarden), hurt:0, socksMethod:"shadowWard", hex, row })
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
            socket.emit('rolloSkill',{ aim: 0, hurt: 0, socksMethod:"crystalMirror", hex, row, cursePackage:crystalGlare_bb })
    },
    meditation:function(origin,target){
        const { hex, row } = origin.parent('.hexagon').data()
        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"meditation", hex, row})
    },
    marchNia:function(origin,target){
        march('Nia',target)
    },
    geode:function(origin,target){
        if( phase === "white" ){
            const { hex, row } = target
            const thizQuartz = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.whiteTeam')[0])
            if( !thizQuartz.siblings(`[data-name="Quartzlings"].${mySide}`).length ){
                highlightHexes({colour:'ob',dist:1},thizQuartz)
                $('[data-glow].hexagon').each(function(){
                    const thisObj = $(this)
                    if(thisObj.hasClass('objectiveGlow')){
                        socket.emit('rolloSkill',{aim:0, hurt:0, socksMethod:"geode", hex, row})
                        return false
                    }
                })
            }
        }
    },
    rollingStones:function(origin,target){
        // name: "Rolling Stones",
        // desc: "Each Quartzling may move up to 3 hexes in a straight line.",
        // icon: self,
        // unused: true,
        // m: "rollingStones"
    },
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                                                                                                */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var m_ = {
    kick:function (o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))+1})
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        displayAnimatedNews(`${target.data('name')}<br/>+1 speed`)
        $('[data-glow]').removeAttr('data-glow')
    },
    evilEye:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        if( onHit(aim, target) ){
            displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
            setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))-1})
        } else 
            displayAnimatedNews('missed!')
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
    },
    firestorm:function(o){
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel.destined_for_DOOM`)
        if(targets.length){
            const target = $(targets[0])
            target.removeClass('destined_for_DOOM')
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
        setBoons_Blights(target,{ baim: Number(target.attr('data-baim')) + 1 })
        current_ability_method = null
        if_moved_end_it()
        add_action_taken()
        displayAnimatedNews(`${target.data('name')}<br/>+1 aim`)
    },
    cleavingStrike: function (o) {
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
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
    rush:function(o){
        const { hex, row } = o
        let friends = $('.selectedModel').siblings('.smallCard')
        if(!friends.length){
            current_ability_method = null
            add_action_taken()
            $('[data-glow]').removeAttr('data-glow')
        }
        if_moved_end_it()
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
            if_moved_end_it()
            add_action_taken()
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
            if_moved_end_it()
            add_action_taken()
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
        if_moved_end_it()
        add_action_taken()
        if( !$('.illKillYouAll').length ){
            singleSpecimen.addClass('illKillYouAll')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('reposition champion')
        }
    },
    outflank:function(o){
        const { aim, hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
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
        if_moved_end_it()
        add_action_taken()
    },
    roll:function(o){
        if( !$('[data-glow]').length )
            highlightDirectPaths({origin: $('.selectedModel').parent('.hexagon').data(), distance:3, colour:'straitPaths'})
            $('.selectedModel').addClass('roll_selected')
    },
    newSpewWhite:function(o){//TRIGGERS TWICE
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
        const { hex, row} = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        $('[data-glow]').removeAttr('data-glow')
        graveyard[river[1]][river[3]].splice(0,1)
        river = null
        current_ability_method = null
        displayAnimatedNews(`${river[3]}<br/>recruited`)
    },
    fluSpew:function(o){
        blights_spew_recieved({o, blight:"bdamage"})
    },
    gooSpew:function(o){
        blights_spew_recieved({o, blight:"bdodge"})
    },
    nomNomNom: function (o) {
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard.hexagrama-30.unitModel`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
        const { aim, hurt, hex, row, key, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken(multiAction)
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
        setBoons_Blights(target,{bspeed:Number(target.attr('data-bspeed'))+1})
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        displayAnimatedNews(`${target.data('name')}<br/>+1 speed`)
        $('[data-glow]').removeAttr('data-glow')
    },
    regenerateWhite:function(o){
        const { hex, row } = o
        const target = $(`.hex_${hex}_in_row_${row}`).children('.smallCard')
        healLife(target)
        current_ability_method = null
        if_moved_end_it()
        add_action_taken()
        displayAnimatedNews(`${target.data('name')} heals<br/>2 wounds`)
    },
    regenerateBlack:function(o){
        const { hex, row } = o
        const target = $(`.hex_${hex}_in_row_${row}`).children('.smallCard')
        healLife(target)
        current_ability_method = null
        if_moved_end_it()
        add_action_taken()
        displayAnimatedNews(`${target.data('name')} heals<br/>2 wounds`)
    },
    onePunch:function(o){//needs bonus action defined
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) )//allow for bonus twoPunch action here
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    twoPunch:function(o){//needs bonus action defined
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
        setBoons_Blights(target,{bdodge:Number(target.attr('data-bdodge'))+1})
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        displayAnimatedNews(`${target.data('name')}<br/>+1 dodge`)
        $('[data-glow]').removeAttr('data-glow')
    },
    feint:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        if( onHit(aim, target) ){
            displayAnimatedNews(`${target.data('name')}<br/>-1 aim`)
            setBoons_Blights(target,{baim:Number(target.attr('data-baim'))-1})
        } else 
            displayAnimatedNews('missed!')
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
    },
    theGreatTusk:function(o){
        const { hex, row, cursePackage} = o
        const team = $(`.hex_${hex}_in_row_${row}`).children('.smallCard').hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        $('[data-glow="claimColor"]').children('.'+team).each(function(){
            setBoons_Blights( $(this),{[cursePackage[0]]:+1})
        })
        displayAnimatedNews(`${[...cursePackage[0]].slice(1).join('')} boon added`)
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
    },
    tongueTow:function(o){
        if( !$('.tongueTow_selected').length ){
            const { hex, row } = o
            const $target = $(`.hex_${hex}_in_row_${row}`)
            $('[data-glow]').removeAttr('data-glow')
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
            if_moved_end_it()
            add_action_taken()
            current_ability_method = null
            displayAnimatedNews(`tongue towing<br/>banner`)
        }
    },
    tongueLash: function (o) {
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) && !$('.tongueLash_selected').length ){
                    const { hex, row } = o
                    target.addClass('tongueLash_selected')
                    highlightHexes({colour:'greenGlow',dist:1},target)
                    highlight_closest_path($('.selectedModel').parent('.hexagon').data(),o)
                    if_moved_end_it()
                    add_action_taken()
                    current_ability_method = null
                    displayAnimatedNews(`tongue towing<br/>victim`)
                }
            else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    feelThePower:function(o){
        const { hex, row } = o
        const target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        setBoons_Blights(target,{
            bdodge:Number(target.attr('data-bdodge'))+1,
            bprotection:Number(target.attr('data-bprotection'))+1})
        displayAnimatedNews('Froglodytes <br/>+1 dodge & shield')
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        $('[data-glow]').removeAttr('data-glow')
    },
    hop:function(o){
        const { hex, row } = o
        const parentHex = $('.selectedModel').parent('.hexagon')
        parentHex.children('.smallCard').addClass('hop')
        $('.selectedModel').removeClass('selectedModel')
        $(parentHex.children('.hop')[0])
            .detach()
            .appendTo(`.hex_${hex}_in_row_${row}`)
        $(parentHex.children('.hop')[0]).addClass('selectedModel')
        $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')).removeClass('.hop')
        if(!parentHex.children('.smallCard').length){
            $('.hop').removeClass('hop')
            $('[data-glow]').removeAttr('data-glow')
            current_ability_method  = null
        }
    },
    marchRhodriBlack:function(o){
        displayAnimatedNews('Rhodri<br/>marching')
    },
    shieldBash:function(o){//shows circle, not directly away, and allows insta move, without single stepping
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            $('[data-glow]').removeAttr('data-glow')
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
            if_moved_end_it()
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
    marchRhodriWhite:function(o){
        displayAnimatedNews('Rhodri<br/>marching')
    },
    answerTheCall:function(o){
        current_ability_method = null
        if_moved_end_it()
        add_action_taken()
    },
    hold:function(o){
        const { hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        const target = $(targets[0])
        setBoons_Blights(target,{bprotection:Number(target.attr('data-bprotection'))+1})
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        displayAnimatedNews(`${target.data('name')}<br/>+1 protection`)
        $('[data-glow]').removeAttr('data-glow')
    },
    bannerfall:function(o){},
    marchGuardBlack:function(o){
        const {  hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
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
            if_moved_end_it()
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
    brace:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard.unitModel')[0])
        const { bprotection } = extractBoons_Blights($target)
        setBoons_Blights($target,{bprotection: bprotection + 1})
        displayAnimatedNews("Household Guards<br/>+1 protection")
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
    },
    marchGuardWhite:function(o){
        const {  hex, row } = o
        const singleSpecimen = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = singleSpecimen.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if(!$('.marchGuardBlack').length){
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
        $('[data-glow="greenGlow"]').children(`.champModel.${team}.death`).each(function(){
            $(this).addClass('mournblade_raisins')
        })
        rallyChampion( $(`.hex_${hex}_in_row_${row}`).children('.champModel.mournblade_raisins') )
    },
    soulClave:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                //resurrection starts here
                rallyActionDeclaration({ unitname:"Mournblade", side:o.multiAction, type:"champion", name:"Knightshades" })
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            }else displayAnimatedNews ("missed!")
        }
        current_ability_method = null
    },
    graveSummons:function(o){
        $('[data-glow]').removeAttr('data-glow')
        highlightHexes({colour:'claimColor',dist:3})
        add_action_taken()
        if_moved_end_it()
        current_ability_method = null
        displayAnimatedNews('double click<br/>to claim')
    },
    forwardMinions:function(o){
        const {  hex, row } = o
        const boss = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const team = boss.hasClass('whiteTeam') ? 'whiteTeam' : 'blackTeam'
        if( !$('.forwardMinions').length ){
            $('[data-glow]').children(`[data-name="Knightshades"].${team}`).addClass('forwardMinions')
            $('[data-glow]').removeAttr('data-glow')
            displayAnimatedNews('Knightshades<br/>shamble onwards')
        }
    },
    graspingDead:function(o){
        $(`[data-name="Knightshades"].${o.multiAction}`).each(function(){
            forceKill ( $(this) )
        })
        $('[data-glow]').removeAttr('data-glow')
        setTimeout(
            ()=>{rallyActionDeclaration({ 
                unitname:"Mournblade", 
                side:o.multiAction, 
                type:"champion", 
                name:"Knightshades",
                dist:2 }, 'graspingDead')}
        ,700)
        current_ability_method = null
    },
    raiseGraspingDead:function(o){
        const { hex, row, multiAction} = o
        const thiz = $(`.hex_${hex}_in_row_${row}`)
        $(graveyard[river[1]][river[3]][0]).detach().appendTo(thiz).removeClass('death')
        graveyard[river[1]][river[3]].splice(0,1)
        $('[data-glow]').removeAttr('data-glow')
        if( $(`[data-name="Knightshades"].${multiAction}`).length < 3 ){
            rallyActionDeclaration({ unitname:"Mournblade", side:multiAction, type:"champion", name:"Knightshades", dist:2 }, `graspingDead`);
        } else {
            river = null
            current_ability_method = null
        }
    },
    depthsOfSorrow:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('.smallCard')[0])
        const { baim } = extractBoons_Blights($target)
        setBoons_Blights($target,{baim:baim+1})
        displayAnimatedNews("Knightshades<br/>+1 aim")
        current_ability_method = null
        add_action_taken()
        if_moved_end_it()
    },
    deathsDoor:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
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
    carefulMaster:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Mournblade"]')[0])
        const { bdodge } = extractBoons_Blights($target)
        setBoons_Blights($target,{bdodge:bdodge+1})
        displayAnimatedNews("Mournblade<br/>+1 dodge")
        current_ability_method = null
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
    },
    wheresMaster:function(o){
        const { hex, row } = o
        const $mourn = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Mournblade"]')[0])
        $('[data-glow]').removeAttr('data-glow')
        if ( Number($mourn.attr('data-healthleft')) < 1 ){
            displayAnimatedNews('Mournblade<br/>rallies')
            rallyChampion( $mourn )
            current_ability_method = null
        } else {
            displayAnimatedNews('Mournblade<br/>moves')
            $mourn.addClass('wheresMaster_selected')
            highlightHexes({colour:'legendaryGlow',dist: 2}, $mourn)
        }
        if_moved_end_it()
        add_action_taken()
    },
    mirage:function(o){
        if( !$('.tongueTow_selected').length ){
            const { hex, row } = o
            const $target = $(`.hex_${hex}_in_row_${row}`)
            $('[data-glow]').removeAttr('data-glow')
            $target.children('.claimedBanner').addClass('tongueTow_selected')
            highlightHexes({colour:'greenGlow',dist:1},$($target.children('.claimedBanner')[0]))
            if_moved_end_it()
            add_action_taken()
            current_ability_method = null
            displayAnimatedNews(`mirage<br/>banner moved`)
        }
    },
    voidWeaponChamp:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Finvarr"]')[0])
        setBoons_Blights($target,{ bdamage: Number( $target.attr('data-bdamage') ) + 1 })
        displayAnimatedNews("Finvarr<br/>+1 to damage")
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
    },
    lifeBlade:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
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
        console.log(o)
        const $target = $($(`.hex_${hex}_in_row_${row}`).children('[data-name="Finvarr"]')[0])
        setBoons_Blights($target,{ bspeed: Number( $target.attr('data-bspeed') ) + 1 })
        displayAnimatedNews("Finvarr<br/>+1 to speed")
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
    },
    shadowWard:function(o){
        const { aim, hurt, hex, row, key } = o
        const targets = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        if(targets.length && !$('.shadowWard_selected').length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
            if( onHit(aim, target) ){
                displayAnimatedNews(`reposition ${target.data('name')}`)
                target.addClass('shadowWard_selected')
                highlightHexes({colour:'legendaryGlow',dist: 1}, $('.shadowWard_selected'))
                if( doDamage(hurt, target) )
                    if( checkIfStillAlive(target) )
                        moveLadder(target,1 + target.data('stepsgiven'))
                    else null
                else displayAnimatedNews("no damage!")
            }else displayAnimatedNews ("missed!")
        }
    },
    phantomBanners:function(o){ // current_ability_methodDOESN"T GET NULL!!!!
        const { hex, row } = o
        const $banner = $($(`.hex_${hex}_in_row_${row}`).children(`.claimedBanner`)[0])
        const team = !$banner.hasClass('whiteTeam') ? 'blackTeam' : 'whiteTeam'
            console.log(!$('.phantomBanners_selected').length,team, $banner.hasClass(team))
        if( !$('.phantomBanners_selected').length && $banner.hasClass(team))
            $banner.addClass('phantomBanners_selected')
    },
    voidWeapon:function(o){
        const { hex, row } = o
        const $target = $($(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)[0])
        setBoons_Blights($target,{baim:Number($target.attr('data-baim'))+1})
        displayAnimatedNews('Shadow Sentinels<br/>+1 aim')
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        current_ability_method = null
    },
    lifeTrade:function(o){
        const { aim, hurt, hex, row, multiAction } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
        setBoons_Blights(targets,{bprotection:Number( targets.attr('data-bprotection') )+1})
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        displayAnimatedNews(`${targets.data('name')}<br/>+1 protection`)
        $('[data-glow]').removeAttr('data-glow')
    },
    shadowSnare:function(o){
        const { aim, hurt, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
        setBoons_Blights($target,{ [curseType]: Number( $target.attr(`data-${curseType}`) ) - 1 })
        displayAnimatedNews(`${$target.data('name')}<br/>-1 ${[...curseType].slice(1).join('')}`)
        if_moved_end_it()
        add_action_taken()
        current_ability_method = null
        $('[data-glow').removeAttr('data-glow')
        crystalGlare_bb = null
    },
    erosion:function(o){
        const { aim, hex, row } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if( onHit(aim, target) ){
                setBoons_Blights(target,{ bprotection:Number( target.attr('data-bprotection') )-1 })
                displayAnimatedNews(`${target.data('name')}<br/>-1 protection`)
            }else displayAnimatedNews ("missed!")
        }
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        add_action_taken()
        current_ability_method = null
    },
    blindingLight:function (o){
        const { aim, hurt, hex, row, key } = o
        const targets = $(`.hex_${hex}_in_row_${row}`).children(`.smallCard`)
        if(targets.length){
            const target = $(targets[0])
            if_moved_end_it()
            $('[data-glow]').removeAttr('data-glow')
            add_action_taken()
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
        if_moved_end_it()
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
        if_moved_end_it()
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
        if_moved_end_it()
        current_ability_method=null
        displayAnimatedNews('Geode')
    },
    rollingStones:function(o){
        // name: "Rolling Stones",
        // desc: "Each Quartzling may move up to 3 hexes in a straight line.",
        // icon: self,
        // unused: true,
        // m: "rollingStones"
    },
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                                                                                                */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var _m_ = {
    illKillYouAll: (thiz) => {//Utterlu brokenos, keeps glow and bad blood on the recieving end
        //$('.illKillYouAll_selected').removeClass('illKillYouAll illKillYouAll_selected outflank')<----WAS THIS, NOW ITS BELOW
        thiz.removeClass('illKillYouAll illKillYouAll_selected outflank').removeAttr('style')
        if( !$('.illKillYouAll').length && !$('.outflank').length )
        {
            current_ability_method = null
            $('[data-glow]').removeAttr('data-glow')
        }
    },
    outflank: () => {
        $('.outflank_selected').removeClass('outflank_selected outflank')
        if( !$('.outflank').length )
            {
                $('[data-glow]').removeAttr('data-glow')
                current_ability_method = null
            }
    },
    roll:(that)=>{
       $('[data-glow^="str"].hexagon').each(function(){
          if ( $(this).attr('data-glow') !== $('.selectedModel').parent('.hexagon').attr('data-glow') ) {
              $(this).removeAttr('data-glow')
              $(this).children('.top').removeAttr('data-glow')
              $(this).children('.bottom').removeAttr('data-glow')
          }
        })
        $('[data-glow].hexagon').each(function(){
            $(this).attr('data-glow','straitPaths')
            $(this).children('.top').attr('data-glow','straitPaths')
            $(this).children('.bottom').attr('data-glow','straitPaths')
        })
        $('.selectedModel').parent('.hexagon').removeAttr('data-glow')
        $('.selectedModel').siblings('.top').removeAttr('data-glow')
        $('.selectedModel').siblings('.bottom').removeAttr('data-glow')
        if( !$('[data-glow="straitPaths"]').length ){
            current_ability_method = null
            $('.roll_selected').removeClass('roll_selected')
        }
    },
    tongueTow:()=>{
        if( $('.tongueTow_selected').length ){
            $('[data-glow]').removeAttr('data-glow')
            $('.tongueTow_selected').removeClass('tongueTow_selected')
            current_ability_method = null
        }
    },
    tongueLash:()=>{
        if( $('.tongueLash_selected').length ){
            $('[data-glow]').removeAttr('data-glow')
            $('.tongueLash_selected').removeClass('tongueLash_selected')
            current_ability_method = null
        }
    },
    marchRhodriBlack:()=>{
        marchExec('RhodriBlack')
    },
    marchRhodriWhite:()=>{
        marchExec('RhodriWhite')
    },
    shieldBash:()=>{
        current_ability_method = null
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        $('.shieldBash_selected').removeClass('shieldBash_selected')
    },
    marchGuardBlack:($thiz)=>{
            $('[data-glow]').removeAttr('data-glow')
            $($thiz).removeClass('marchGuardBlack').removeClass(`marchGuardBlack_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
        if(!$('.marchGuardBlack').length ){
            current_ability_method = null
            add_action_taken()
        }
    },
    marchGuardWhite:($thiz)=>{
        $('[data-glow]').removeAttr('data-glow')
        $($thiz).removeClass('marchGuardWhite').removeClass(`marchGuardWhite_selected`)
        setTimeout(()=>$thiz.removeAttr('style'),100)
    if(!$('.marchGuardWhite').length ){
        current_ability_method = null
        add_action_taken()
    }
    },
    deathWind:($thiz)=>{
        current_ability_method = null
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        $(`.deathWind_selected`).removeClass(`deathWind_selected`)
    },
    forwardMinions:($thiz)=>{
        if( $('[data-glow].hexagon').length > 6 ){
            $('[data-glow]').removeAttr('data-glow')
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            $('[data-glow]').removeAttr('data-glow')
            $($thiz).removeClass('forwardMinions').removeClass(`forwardMinions_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.forwardMinions').length ){
                current_ability_method = null
                add_action_taken()
            }
        }
    },
    wheresMaster:($thiz)=>{
        if( $('[data-glow].hexagon').length > 6 ){
            $('[data-glow]').removeAttr('data-glow')
            highlightHexes({colour:'legendaryGlow',dist:1},$thiz)
        } else {
            $('[data-glow]').removeAttr('data-glow')
            $($thiz).removeClass(`wheresMaster_selected`)
            setTimeout(()=>$thiz.removeAttr('style'),100)
            if(!$('.wheresMaster_selected').length ){
                current_ability_method = null
            }
        }

    },
    shadowWard:($thiz)=>{
        current_ability_method = null
        add_action_taken()
        if_moved_end_it()
        $('[data-glow]').removeAttr('data-glow')
        $(`.shadowWard_selected`).removeClass(`shadowWard_selected`)
    },
    phantomBanners:()=>{
        $('.phantomBanners_selected').removeClass('phantomBanners_selected')
    },
    marchNia:()=>{
        marchExec('Nia')
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*                                                                                                                */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var m__ = {
    newSpew: function (o){
        console.log('doubled ?')
    }
}