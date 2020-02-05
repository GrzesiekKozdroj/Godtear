function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

class Character{
    constructor(klass, role, name, unitSize, icon, speed, dodge, protection, health, skills,banner,index) {
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
    this.index = index;

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

const Halftusk = new Character("guardian","champion","Halftusk",1,'./img/Halftusk.png',[2,2],3,3,7,m.halftusk,'./img/classGuardian.png',0);
const Froglodytes = new Character("guardian","unit","Froglodytes",3,"",[3,1],2,3,1,m.froglodytes,'./img/classGuardian.png');

const Rhodri = new Character("guardian","champion","Rhodri",1,"./img/Rhodri.png",[1,2],2,4,7,m.Rhodri,'./img/classGuardian.png',1);
const HouseholdGuard = new Character("guardian","unit","HouseholdGuard",4,"",[1,2],2,4,1,m.householdGuard,'./img/classGuardian.png',1);

const Mournblade = new Character("guardian","champion","Mournblade",1,'./img/Mournblade.png',[2,2],2,4,1,m.mournblade,'./img/classGuardian.png',2);
const Knightshades = new Character("guardian","unit","Knightshades",3,"",[1,1],2,3,1,m.knightshades,'./img/classGuardian.png',2);

const Finvarr = new Character("guardian","champion","Finvarr",1,'./img/Finvarr.png',[2,3],4,3,5,m.finvarr,'./img/classGuardian.png',3);
const ShadowSentinels = new Character("guardian","unit","ShadowSentinels", 3,"",[2,3],4,2,1,m.shadowSentinels,'./img/classGuardian.png',3);

const Blackjaw = new Character("maelstrom","champion","Blackjaw",1,'./img/Blackjaw.png',[2,3],3,2,8,m.blackjaw,'./img/classMaelstrom.png',0);
const UnburntReavers = new Character("maelstrom","unit","UnburntReavers",5,"",[3,2],3,2,1,m.unburntReavers,'./img/classMaelstrom.png',0);

const Titus = new Character("maelstrom","champion","Titus",1,'./img/Titus.png',[2,2],3,3,5,m.Titus,'./img/classMaelstrom.png',1);
const GlorySeekers = new Character("maelstrom","unit","GlorySeekers",5,"",2,3,3,1,m.glorySeekers,'./img/classMaelstrom.png',1);

const Grimgut = new Character("maelstrom","champion","Grimgut",1,'./img/Grimgut.png',[1,1],2,2,9,m.grimgut,'./img/classMaelstrom.png',2);
const Retchlings = new Character("maelstrom","unit","Retchlings",5,"",[0,1],2,1,1,m.retchlings,'./img/classMaelstrom.png',2);

const Rattlebone = new Character("shaper","champion","Rattlebone",1,'./img/Rattlebone.png',[3,2],3,3,6,m.rattlebone,'./img/classShaper.png',0);
const Hexlings = new Character("shaper","unit","Hexlings",5,"",[2,2],3,2,1,m.hexlings,'./img/classShaper.png',0);

const Nia = new Character("shaper","champion","Nia",1,'./img/Nia.png',[1,2],4,2,6,m.Nia,'./img/classShaper.png',1);
const Quartzlings = new Character("shaper","unit","Quartzlings",3,"",[2,0],2,4,1,m.quartzlings,'./img/classShaper.png',1);

const RaithMarid = new Character("shaper","champion","RaithMaid",1,'./img/RaithMarid.png',[1,1],2,3,7,m.raithMarid,'./img/classShaper.png',2);
const Splashlings = new Character("shaper","unit","Splashlings",3,"",[0,0],4,1,1,m.splashlings,'./img/classShaper.png',2);

const Shayle = new Character("shaper","champion","Shayle",1,'./img/Shayle.png',[2,2],4,2,5,m.shayle,'./img/classShaper.png',3);
const Landslide = new Character("shaper","unit","Landslide",1,"",[0,0],2,3,4,m.landslide,'./img/classShaper.png',3);

const Morrigan = new Character("slayer","champion","Morrigan",1,'./img/Morrigan.png',[2,2],2,3,6,m.morrigan,'./img/classSlayer.png',0);
const ColdBones = new Character("slayer","unit","ColdBones",5,"",[1,1],2,3,1,m.coldBones,'./img/classSlayer.png',0);

const Lorsann = new Character("slayer","champion","Lorsann",1,"./img/Lorsann.png",[2,3],4,1,6,m.lorsann,'./img/classSlayer.png',1);
const MistwoodRangers = new Character("slayer","unit","MistwoodRangers",3,"",[2,3],3,1,1,m.mistwoodRangers,'./img/classSlayer.png',1);

const SneakyPeet = new Character("slayer","champion","SneakyPeet",1,'./img/SneakyPeet.png',[3,1],5,1,5,m.sneakyPeet,'./img/classSlayer.png',2);
const SneakyStabbers = new Character("slayer","unit","SneakyStabbers", 3, "", [3,1],5,1,1,m.sneakyStabbers,'./img/classSlayer.png',2);

const Rangosh = new Character("slayer","champion", "Rangosh",1,'./img/Rangosh.png',[4,2],4,2,7,m.rangosh,'./img/classSlayer.png',3);
const RedBandits = new Character("slayer","unit","RedBandits",5,"",[2,2],3,2,1,m.redBandits,'./img/classSlayer.png',3);

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