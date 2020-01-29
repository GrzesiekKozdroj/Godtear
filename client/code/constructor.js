function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

class Character{
    constructor(klass, role, name, unitSize, icon, speed, dodge, protection, health, skills,banner) {
    this.klass = klass;
    this.type = role;
    this.name = name;
    this.nameTech = `${name}${Math.random()}`; 
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

    this.doing = 'not used';
    this.stepsGiven = this.name !== "Mournblade" ? 4 : 1;
    }
//methods
}
;

const Halftusk = new Character("guardian","champion","Halftusk",1,'./img/Halftusk.png',[2,2],3,3,7,m.halftusk,'./img/classGuardian.png');
const Froglodytes = new Character("guardian","unit","Froglodytes",3,"",[3,1],2,3,1,m.froglodytes,'./img/classGuardian.png');

const Rhodri = new Character("guardian","champion","Rhodri",1,"./img/Rhodri.png",[1,2],2,4,7,m.Rhodri,'./img/classGuardian.png');
const HouseholdGuard = new Character("guardian","unit","Household Guard",4,"",[1,2],2,4,1,m.householdGuard,'./img/classGuardian.png');

const Mournblade = new Character("guardian","champion","Mournblade",1,'./img/Mournblade.png',[2,2],2,4,1,m.mournblade,'./img/classGuardian.png');
const Knightshades = new Character("guardian","unit","Knightshades",3,"",[1,1],2,3,1,m.knightshades,'./img/classGuardian.png');

const Finvarr = new Character("guardian","champion","Finvarr",1,'./img/Finvarr.png',[2,3],4,3,5,m.finvarr,'./img/classGuardian.png');
const ShadowSentinels = new Character("guardian","unit","Shadow Sentinels", 3,"",[2,3],4,2,1,m.shadowSentinels,'./img/classGuardian.png');

const Blackjaw = new Character("maelstrom","champion","Blackjaw",1,'./img/Blackjaw.png',[2,3],3,2,8,m.blackjaw,'./img/classMaelstrom.png');
const UnburntReavers = new Character("maelstrom","unit","Unburnt Reavers",5,"",[3,2],3,2,1,m.unburntReavers,'./img/classMaelstrom.png');

const Titus = new Character("maelstrom","champion","Titus",1,'./img/Titus.png',[2,2],3,3,5,m.Titus,'./img/classMaelstrom.png');
const GlorySeekers = new Character("maelstrom","unit","Glory Seekers",5,"",2,3,3,1,m.glorySeekers,'./img/classMaelstrom.png');

const Grimgut = new Character("maelstrom","champion","Grimgut",1,'./img/Grimgut.png',[1,1],2,2,9,m.grimgut,'./img/classMaelstrom.png');
const Retchlings = new Character("maelstrom","unit","Retchlings",5,"",[0,1],2,1,1,m.retchlings,'./img/classMaelstrom.png');

const Rattlebone = new Character("shaper","champion","Rattlebone",1,'./img/Rattlebone.png',[3,2],3,3,6,m.rattlebone,'./img/classShaper.png');
const Hexlings = new Character("shaper","unit","Hexlings",5,"",[2,2],3,2,1,m.hexlings,'./img/classShaper.png');

const Nia = new Character("shaper","champion","Nia",1,'./img/Nia.png',[1,2],4,2,6,m.Nia,'./img/classShaper.png');
const Quartzlings = new Character("shaper","unit","Quartzlings",3,"",[2,0],2,4,1,m.quartzlings,'./img/classShaper.png');

const RaithMarid = new Character("shaper","champion","Raith'Maid",1,'./img/RaithMarid.png',[1,1],2,3,7,m.raithMarid,'./img/classShaper.png');
const Splashlings = new Character("shaper","unit","Splashlings",3,"",[0,0],4,1,1,m.splashlings,'./img/classShaper.png');

const Shayle = new Character("shaper","champion","Shayle",1,'./img/Shayle.png',[2,2],4,2,5,m.shayle,'./img/classShaper.png');
const Landslide = new Character("shaper","unit","Landslide",1,"",[0,0],2,3,4,m.landslide,'./img/classShaper.png');

const Morrigan = new Character("slayer","champion","Morrigan",1,'./img/Morrigan.png',[2,2],2,3,6,m.morrigan,'./img/classSlayer.png');
const ColdBones = new Character("slayer","unit","Cold Bones",5,"",[1,1],2,3,1,m.coldBones,'./img/classSlayer.png');

const Lorsann = new Character("slayer","champion","Lorsann",1,"./img/Lorsann.png",[2,3],4,1,6,m.lorsann,'./img/classSlayer.png');
const MistwoodRangers = new Character("slayer","unit","MistwoodRangers",3,"",[2,3],3,1,1,m.mistwoodRangers,'./img/classSlayer.png');

const SneakyPeet = new Character("slayer","champion","Sneaky Peet",1,'./img/SneakyPeet.png',[3,1],5,1,5,m.sneakyPeet,'./img/classSlayer.png');
const SneakyStabbers = new Character("slayer","unit","Sneaky Stabbers", 3, "", [3,1],5,1,1,m.sneakyStabbers,'./img/classSlayer.png');

const Rangosh = new Character("slayer","champion", "Rangosh",1,'./img/Rangosh.png',[4,2],4,2,7,m.rangosh,'./img/classSlayer.png');
const RedBandits = new Character("slayer","unit","Red Bandits",5,"",[2,2],3,2,1,m.RedBandits,'./img/classSlayer.png');

const rosters = 
{
    guardian:
    [
        {champ:Halftusk,gunt:Froglodytes},
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