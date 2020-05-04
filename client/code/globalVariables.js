var nickName = Math.floor(Math.floor( Math.random () * (1000 - 1 + 1)) + 1);
var gamePlaceName = "Lothlorien";
var roster = ["Rhodri","Morrigan","Blackjaw"];
var opoName = "Bad Bob";
var opoRoster = ["Finvarr","SneakyPeet","Lorsann"];
var opoSide;
var mySide;
var myTurn;
var myDeployment;
var opoDeployment;
var phase = 'white';
var glow;
var river;//used for resurrection
var MOVINGNOW = false;//used to stop doublemove
var graveyard = 
    {
        left:{},
        right:{}
    };
var crystalGlare_bb = null;
var pocketBox = null;
var opoSkillTrack;
var mySkillTrack;
var current_ability_method = null;
let waitinInfoAsArray = [roster[0],roster[1],roster[2],nickName,gamePlaceName,"waiting for opponent"];
let waitingTicker = 0;