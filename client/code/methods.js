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
            if( 
              (
                !thiz.hasClass('objectiveGlow') || 
                $('.selectedModel.whiteTeam').data('type') !== 'unit'
              ) &&
              (
                  !thiz.children(`.smallCard`).length || 
                ( 
                  $(`.selectedModel.whiteTeam`).data('name') === thiz.children(`.smallCard.whiteTeam`).first().data('name') && 
                  thiz.children(`.smallCard`).length < 3
                )
              ) && onlyOneStep(thiz) &&  check_actions_count()
            )
            {
                const h = thiz.data('hex')
                const r = thiz.data('row')
                reduceSpeedLeft()
                makeAnim( $('.selectedModel.whiteTeam'), thiz, displayMovementAura )
                socket.emit('modelMoving',{h:h,r:r})
            }
        },
        recruit: function () { },
        rally: function () { },
        dieGrunt: function () { },
        dieChamp: function () { },
        claim: function (thiz, teamColor) {
            if_moved_end_it()
            thiz.append(placeBanner(teamColor))
            $('.claimColor').removeClass('claimColor')
            add_action_taken()
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
                m: function () { }
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
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            evilEye:
            {
                name: "Evil Eye",
                desc: `Must target a follower. ${shieldBlight}`,
                icon: skull,
                dist: 2,
                aim: [6],
                unused: true,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            cleavingStrike:
            {
                name: "Cleaving Strike",
                icon: skull,
                dist: 1,
                aim: [3, 4, 5],
                hurt: [4, 5, 6]
            }
        },
        white:
        {
            rush:
            {
                name: "Rush",
                desc: "Choose a hex. Each Unburnt Reaver in that hex may move up to 2 hexes.",
                icon: self,
                m: function () { }
            },
            intimidation:
            {
                name: "Intimidation",
                desc: `Hit Effect: ${dodgeBlight}`,
                icon:skull,
                dist: 1,
                aim: [2, 4, 6],
                m: function () { }
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
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            illKillYouAll:
            {
                name: "I'll Kill You All!",
                desc: `Must target a follower. <br/> Hit Effect: Move all followers in target's unit that are within range up to 1 hex.`,
                icon:skull,
                dist: 3,
                aim: [6],
                unused: true,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            outflank:
            {
                name: "Outflank",
                desc: "Hit Effect: Place each Glory Seeker that is adjacent to the target in a hex adjacent to the target.",
                icon: skull,
                dist: 1,
                aim: [6, 6, 6],
                unused: true,
                m: function () { }
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
                m: function () { }
            },
            newSpew:
            {
                name: "New Spew",
                desc: "Remove all Retchlings from the battlefield. Then they make five recruit actions.",
                icon: cogs,
                unused: true,
                m: function () { }
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
                m: function () { }
            }
        },
        white:
        {

            newSpew:
            {
                name: "New Spew",
                desc: "Remove all Retchlings from the battlefield. Then they make five recruit actions.",
                icon: cogs,
                unused: true,
                m: function () { }
            },
            fluSpew:
            {
                name: "Flu Spew",
                desc: `This skill targets each enemy champion and follower adjacent to one or more Retchlings. 
                    Hit Effect ${hurtBlight}.`,
                icon: skull,
                aim: [4],
                unused: true,
                m: function () { }
            },
            gooSpew:
            {
                name: "Goo Spew",
                desc: `This skill targets each enemy champion and follower unit adjacent to one or more Retchlings. 
                    Hit Effect: ${dodgeBlight}`,
                icon: skull,
                aim: [4],
                unused: true,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            }
        },
        white:
        {
            slipAndSlide:
            {
                name: "Slip andSlide",
                desc: `${walkBoon}. Two Retchlings may use this skill in the same activation if they are on different hexes.`,
                icon: cogs,
                dist: 1,
                unused: true,
                m: function () { }
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
            regenerate:
            {
                name: "Regenerate",
                desc: "Remove up to 2 of Halftusk's wounds.",
                icon: self,
                unused: true,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
        },
        white:
        {
            regenerate:
            {
                name: "Regenerate",
                desc: "Remove up to 2 of Halftusk's wounds.",
                icon: self,
                unused: true,
                m: function () { }
            },
            footwork:
            {
                name: "Footwork",
                desc: dodgeBoon,
                icon: cogs,
                dist: 2,
                unused: true,
                m: function () { }
            },
            feint:
            {
                name: "Feint",
                desc: `Hit Effect: ${aimBlight}`,
                icon: skull,
                dist: 2,
                aim: [5],
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            legendary:
            {
                name: "the Great Tusk",
                desc: `Plot Phase only. Halftusk may make a claim action. Then choose ${dodgeBoon} or ${shieldBoon}. Friendy models within range gain the boon you chose.`,
                icon: star,
                dist: 2,
                unused: true,
                legendaryUsed: false,
                m: function () { }
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
                m: function () { }
            },
            tongueLash:
            {
                name: "Tongue Lash",
                desc: "Hit effect: Move target up to 1 hex towards this Froglodyte.",
                icon: skull,
                dist: 2,
                aim: [5, 6, 7],
                unused: true,
                m: function () { }
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
                m: function () { }
            },
            hop:
            {
                name: "Hop",
                desc: "You may place each Froglodyte in a hex up to 2 hexes from its current hex.",
                icon: self,
                unused: true,
                m: function () { }
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
            march:
            {
                name: "March",
                desc: "Move Rhodri up to 1 hex.",
                icon: self,
                unused: true,
                m: function () { }
            },
            shieldBash:
            {
                name: "Shield Bash",
                desc: `Hit Effect: ${hurtBlight}. Move target up to 2 hexes away from Rhodri.`,
                icon: skull,
                dist: 1,
                aim: [7],
                unused: true,
                m: function () { }
            },
            swordSlash:
            {
                name: "Sword Slash",
                icon: skull,
                dist: 1,
                aim: [5],
                hurt: [6],
                unused: true,
                m: function () { }
            },
        },
        white:
        {
            march:
            {
                name: "March",
                desc: "Move Rhodri up to 1 hex.",
                icon: self,
                unused: true,
                m: function () { }
            },
            answerTheCall:
            {
                name: "Answer the Call",
                desc: "Choose a follower within range. Its unit makes a recruit action.",
                icon: cogs,
                dist: 2,
                unused: true,
                m: function () { }
            },
            hold:
            {
                name: "Hold!",
                desc: shieldBoon,
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
                name: "Bannerfall",
                desc: "Clash phase only. Make a claim action.",
                unused: true,
                legendaryUsed: false,
                icon: self,
                m: function () { }
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
            march:
            {
                name: "March",
                desc: "Move each Household Guard up to 1 hex.",
                icon: self,
                unused: true,
                m: function () { }
            },
            swordStrike:
            {
                name: "Sword Strike",
                icon: skull,
                dist: 1,
                aim: [5, 5, 5],
                hurt: [4, 5, 6],
                unsed: true,
                m: function () { }
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
                m: function () { }
            },
            march:
            {
                name: "March",
                desc: "Move each Household Guard up to 1 hex.",
                icon: self,
                unused: true,
                m: function () { }
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
                m: function () { }
            },
            raiseDead:
            {
                desc: "Raise Dead",
                desc: "All friendly champions within range may make a rally action.",
                icon: cogs,
                dist: 3,
                unused: true,
                m: function () { }
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
                m: function () { }
            }
        },
        white:
        {
            graveSummons:
            {
                name: "Grave Summons",
                desc: "Mournblade makes a claim action. You may place his banner on any objective hex within range.",
                icon: star,
                dist: 3,
                unused: true,
                m: function () { }
            },
            forwardMinions:
            {
                name: "Forward Minions!",
                desc: "Move each Knightshade that is within range up to 2 hexes.",
                icon: cogs,
                dist: 4,
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            legendary:
            {
                name: "Graspping Dead",
                desc: "Remove all Knightshades from the battlefield. Then place all three Knightshades on hexes that are within 3 hexes of Mournblade.",
                icon: "cogs",
                unused: true,
                legendaryUsed: false
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
                m: function () { }
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
                m: function () { }
            }
        },
        white:
        {
            carefulMaster:
            {
                name: "Careful, Master",
                desc: `If Mournblade is within range, he gains ${dodgeBoon}.`,
                icon: cogs,
                dist: 3,
                unused: true,
                m: function () { }
            },
            wheresMaster:
            {
                name: "Where's Master?",
                desc: "If Mournblade is within range, he may make a rally action or move up to 2 hexes.",
                icon: cogs,
                dist: 3,
                unused: true,
                m: function () { }
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
                m: function () { }
            },
            voidWeapon:
            {
                name: "Void Weapon",
                desc: hurtBoon,
                icon: self,
                unused: true,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            shadowWard:
            {
                name: "Shadow Ward",
                desc: "Hit Effect: Move target up to 1 hex",
                icon: skull,
                dist: 2,
                aim: [5],
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            legendary:
            {
                name: "Phantom Banners",
                desc: "Choose any number of friendly banners within range. Place teh on objective hexes within range.",
                dist: 4,
                unused: true,
                legendaryUsed: false,
                icon: star,
                m: function () { }
            },
            bannerWarden:
            {
                name: "Banner Warden",
                desc: `If Finvarr is on an objective hex, his skills have +2${aim}.`,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            shadowSnare:
            {
                name: "Shadow Snare",
                desc: `Hit Effect: ${walkBlight}.`,
                icon: skull,
                dist: 1,
                aim: [4, 5, 5],
                unused: true,
                m: function () { }
            }
        },
        util:
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
                m: function () { }
            },
            erosion:
            {
                name: "Erosion",
                desc: `Hit Effect: ${shieldBlight}.`,
                icon: skull,
                dist: 2,
                aim: [5],
                unused: true,
                m: function () { }
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
                m: function () { }
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
                m: function () { }
            },
            meditation:
            {
                name: "Meditation",
                desc: aimBoon,
                icon: self,
                unused: true,
                m: function () { }
            },
            march:
            {
                name: "March",
                desc: "Move Nia up to 1 hex.",
                icon: self,
                unused: true,
                m: function () { }
            }
        },
        util:
        {
            legendary:
            {
                name: "Geode",
                desc: "Plot Phase only. Choose a Quartzling that is the only model in its hex and is adjacent to an objective hex, and replace it with an objective hex. If it is within 2 hexes of Nia, she may make a claim action on that hex.",
                icon:star,
                unused: true,
                legendaryUsed: false,
                m: function () { }
            },
            rockConcert:
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
                m: function () { }
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