function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

class Character{
    constructor(klass, role, name, unitSize, icon, speed, dodge, protection, health, skills,banner, index) {
    this.klass = klass;
    this.type = role;
    this.name = name;
    this.index = index
    this.nameTech = `${name}${Math.floor( Math.random () * (100000 - 0 + 1)) + 0 }`; 
    this.unitSize = unitSize;
    this.icon = icon;
    this.speed = speed; //{clash:X,plot:Y}
    this.speedLeft = speed;
    this.dodge = dodge;
    this.protection = protection;
    this.health = health;
    this.actionsTaken = 0;
    this.skills = skills;
    this.banner = banner;

    this.healthLeft = health;
    this.row = false;
    this.hex = false;

    this.bSpeed = 0;
    this.bDodge = 0;
    this.bProtection = 0;
    this.bAim = 0;
    this.bDamage = 0;

    //this.doing = 'not used';
    this.stepsGiven = name !== "Mournblade" && role === "champion" ? 4 : name === "Retchlings" ? 0 : 1;
    }
//methods
}
;

const Halftusk = new Character("guardian","champion","Halftusk",1,'./img/Halftusk.png',[2,2],3,3,7,m.halftusk,'./img/classGuardian.png',0);
const Froglodytes = new Character("guardian","unit","Froglodytes",3,"./img/Halftusk.png",[3,1],2,3,1,m.froglodytes,'./img/classGuardian.png');

const Rhodri = new Character("guardian","champion","Rhodri",1,"./img/Rhodri.png",[1,2],2,4,7,m.Rhodri,'./img/classGuardian.png',1);
const HouseholdGuard = new Character("guardian","unit","HouseholdGuard",4,"./img/Rhodri.png",[1,2],2,4,1,m.householdGuard,'./img/classGuardian.png',1);

const Mournblade = new Character("guardian","champion","Mournblade",1,'./img/Mournblade.png',[2,2],2,4,1,m.mournblade,'./img/classGuardian.png',2);
const Knightshades = new Character("guardian","unit","Knightshades",3,"./img/Mournblade.png",[1,1],2,3,1,m.knightshades,'./img/classGuardian.png',2);

const Finvarr = new Character("guardian","champion","Finvarr",1,'./img/Finvarr.png',[2,3],4,3,5,m.finvarr,'./img/classGuardian.png',3);
const ShadowSentinels = new Character("guardian","unit","ShadowSentinels", 3,"./img/Finvarr.png",[2,3],4,2,1,m.shadowSentinels,'./img/classGuardian.png',3);

const Blackjaw = new Character("maelstrom","champion","Blackjaw",1,'./img/Blackjaw.png',[2,3],3,2,8,m.blackjaw,'./img/classMaelstrom.png',0);
const UnburntReavers = new Character("maelstrom","unit","UnburntReavers",5,"./img/Blackjaw.png",[3,2],3,2,1,m.unburntReavers,'./img/classMaelstrom.png',0);

const Titus = new Character("maelstrom","champion","Titus",1,'./img/Titus.png',[2,2],3,3,5,m.Titus,'./img/classMaelstrom.png',1);
const GlorySeekers = new Character("maelstrom","unit","GlorySeekers",5,"./img/Titus.png",[2,2],3,3,1,m.glorySeekers,'./img/classMaelstrom.png',1);

const Grimgut = new Character("maelstrom","champion","Grimgut",1,'./img/Grimgut.png',[1,1],2,2,9,m.grimgut,'./img/classMaelstrom.png',2);
const Retchlings = new Character("maelstrom","unit","Retchlings",5,"./img/Grimgut.png",[0,1],2,1,1,m.retchlings,'./img/classMaelstrom.png',2);

const Rattlebone = new Character("shaper","champion","Rattlebone",1,'./img/Rattlebone.png',[3,2],3,3,6,m.rattlebone,'./img/classShaper.png',0);
const Hexlings = new Character("shaper","unit","Hexlings",5,"./img/Rattlebone.png",[2,2],3,2,1,m.hexlings,'./img/classShaper.png',0);

const Nia = new Character("shaper","champion","Nia",1,'./img/Nia.png',[1,2],4,2,6,m.Nia,'./img/classShaper.png',1);
const Quartzlings = new Character("shaper","unit","Quartzlings",3,"./img/Nia.png",[2,0],2,4,1,m.quartzlings,'./img/classShaper.png',1);

const RaithMarid = new Character("shaper","champion","RaithMarid",1,'./img/RaithMarid.png',[1,1],2,3,7,m.raithMarid,'./img/classShaper.png',2);
const Splashlings = new Character("shaper","unit","Splashlings",3,"./img/RaithMarid.png",[0,0],4,1,1,m.splashlings,'./img/classShaper.png',2);

const Shayle = new Character("shaper","champion","Shayle",1,'./img/Shayle.png',[2,2],4,2,5,m.shayle,'./img/classShaper.png',3);
const Landslide = new Character("shaper","unit","Landslide",1,"./img/Shayle.png",[0,0],2,3,4,m.landslide,'./img/classShaper.png',3);

const Morrigan = new Character("slayer","champion","Morrigan",1,'./img/Morrigan.png',[2,2],2,3,6,m.morrigan,'./img/classSlayer.png',0);
const ColdBones = new Character("slayer","unit","ColdBones",5,"./img/Morrigan.png",[1,1],2,3,1,m.coldBones,'./img/classSlayer.png',0);

const Lorsann = new Character("slayer","champion","Lorsann",1,"./img/Lorsann.png",[2,3],4,1,6,m.lorsann,'./img/classSlayer.png',1);
const MistwoodRangers = new Character("slayer","unit","MistwoodRangers",3,"./img/Lorsann.png",[2,3],3,1,1,m.mistwoodRangers,'./img/classSlayer.png',1);

const SneakyPeet = new Character("slayer","champion","SneakyPeet",1,'./img/SneakyPeet.png',[3,1],5,1,5,m.sneakyPeet,'./img/classSlayer.png',2);
const SneakyStabbers = new Character("slayer","unit","SneakyStabbers", 3, "./img/SneakyPeet.png", [3,1],5,1,1,m.sneakyStabbers,'./img/classSlayer.png',2);

const Rangosh = new Character("slayer","champion", "Rangosh",1,'./img/Rangosh.png',[4,2],4,2,7,m.rangosh,'./img/classSlayer.png',3);
const RedBandits = new Character("slayer","unit","RedBandits",5,"./img/Rangosh.png",[2,2],3,2,1,m.redBandits,'./img/classSlayer.png',3);

const rosters = 
{
    guardian:
    [
        {champ:Halftusk,grunt:Froglodytes},
        {champ:Rhodri,grunt:HouseholdGuard},
        {champ:Mournblade,grunt:Knightshades},
        {champ:Finvarr,grunt:ShadowSentinels}
    ],
    slayer:
    [
        {champ:Morrigan, grunt:ColdBones},
        {champ:Lorsann, grunt:MistwoodRangers},
        {champ:SneakyPeet, grunt:SneakyStabbers},
        {champ:Rangosh, grunt:RedBandits}
    ],
    maelstrom:
    [
        {champ:Blackjaw, grunt:UnburntReavers},
        {champ:Titus, grunt:GlorySeekers},
        {champ:Grimgut, grunt:Retchlings}
    ],
    shaper:
    [
        {champ:Rattlebone, grunt:Hexlings},
        {champ:Nia, grunt:Quartzlings},
        {champ:RaithMarid, grunt:Splashlings},
        {champ:Shayle, grunt: Landslide}
    ]
};
roster = [
    rosters.maelstrom[1].champ.name, 
    rosters.shaper[0].champ.name, 
    rosters.guardian[0].champ.name
];

for(let c in rosters){
    let group = rosters[c]
    for(let g = 0; g < group.length; g++){
        group[g].champ.index = g;
        group[g].champ.unitName = group[g].grunt.name
        group[g].grunt.index = g;
        group[g].grunt.unitName = group[g].champ.name
    }
}
const scenarios = [
    {
        name:"Life",
        desc:`In the end phase of each turn, the player who lost the turn rolls a die and adds 2 to the result. Then they 
            gather that many objective hexes and place them one by one on empty hexes that are adjacent to other objective 
            hexes. In the rare case that there are no empty hexes adjacent to objective hexes, they may place the nex objective 
            hex on any empty hex.`,
        layout:{
            greenHexes:[ [11,'row'], [12,'row'] ],
            redHexes:[ [1,'row'], [2, 'row'] ],
            objectiveHexes:[ [6, 7], [6, 8], [7, 7], [7, 8] ]
        }
    },
    {
        name:"Death",
        desc:`In the end phase of each turn, the player who lost the turn removes any two objective hexes of their choice. 
            If there are any models onan objective hex when it is removed, they remain on the hex.`,
        layout:{
            greenHexes:[ [12,'row']],
            redHexes:[ [1,'row'] ],
            objectiveHexes:[ [6, 2], [7, 2], [7, 3], [6, 7], [6, 8], [7, 7], [7, 8], [6, 12], [6, 13], [7, 13] ]
        }
    },
    {
        name:"Change",
        desc:`In the end phase of each turn, the player who lost the turn rolls four dice. Then they move up to that many 
            different hexes one by one onto empty adjacent hexes.  If there are any models on an objective hex when it is 
            moved, they move with the objective hex.`,
        layout:{
            greenHexes:[ [12,'row']],
            redHexes:[ [1,'row'] ],
            objectiveHexes:[ [6, 2], [7, 2], [6, 7], [6, 8], [7, 7], [7, 8], [6, 13], [7, 13] ]
        }
    },
    {
        name:"Knowledge",
        desc:`In the end phase of each turn, the player who won the turn moves their warband token a number of steps closer to the middle of battle ladder equal to the number of victory points they just won.`,
        layout:{
            greenHexes:[ [12,'row']],
            redHexes:[ [1,'row'] ],
            objectiveHexes:[ [5, 5], [6, 4], [7, 4], [8, 3],  [5, 12], [6, 11], [7, 11], [8, 10] ]
        }
    },
    {
        name:"Quest",
        desc:`In the Quest scenario, players score end phase points only for their banners that are on the opponent's half of 
            the battlefield. In the end phase of each turn, the player who lost the turn may place one objective hex on an 
            empty hex adjacent to one or more objecive hexes. In the rare case that there are no empty hexes adjacent to 
            objective hexes, they may place the objective hex on any empty hex.`,
        layout:{
            greenHexes:[ [12,'row'], [11, 'row']],
            redHexes:[ [1,'row'], [2, 'row'] ],
            objectiveHexes:[ [4, 3], [4, 4], [4, 11], [4, 12], [9, 3], [9, 4], [9, 11], [9, 12] ]
        }
    },
    {
        name:"Chaos",
        desc:`In the end phase of each turn, player who lost the turn may place one objective hex on any empty hex on the battlefield.`,
        layout:{
            greenHexes:[ 
                [12,'row'], [11, 'row'], [7, 1], [7, 2], [7, 13], [7, 14], [8, 1], [8, 2], [8, 13], [8, 14],
                [9, 1], [9, 2], [9, 13], [9, 14], [10, 1], [10, 2], [10, 13], [10, 14]
            ],
            redHexes:[ 
                [1,'row'], [2, 'row'], [3, 1], [3, 2], [3, 13], [3, 14], [4, 1], [4, 2], [4, 13], [4, 14], [4, 1],
                [5, 1], [5, 2], [5, 13], [5, 14], [6, 1], [6, 2], [6, 13], [6, 14]
            ],
            objectiveHexes:[ [6, 5], [6, 10], [7, 5], [7, 10] ]
        }
    }
]