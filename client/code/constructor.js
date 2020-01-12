function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function Character(klass, role, name, unitSize, icon, speed, dodge, protection, health) {
    _classCallCheck(this, Character);

    this.klass = klass;
    this.type = role;
    this.name = name;
    this.unitSize = unitSize;
    this.icon = icon;
    this.speed = speed; //{clash:X,plot:Y}
    this.speedLeft = speed;
    this.dodge = dodge;
    this.protection = protection;
    this.health = health;
    this.actionsTaken = 0;

    this.healthLeft = health;
    this.row = false;
    this.hex = false;

    this.bSpeed = 0;
    this.bDodge = 0;
    this.bProtection = 0;
    this.bAim = 0;
    this.bDamage = 0;

    this.doing = 'not used';
}

//methods
;