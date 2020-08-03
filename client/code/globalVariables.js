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
var TMER = true;
var phase = 'white';
var myNextPhase = "white";
var glow;
var river;//used for resurrection
var MOVINGNOW = false;//used to stop doublemove
var graveyard = 
    {
        left:{},
        right:{}
    };
var crystalGlare_bb = null;
var canceller;
var cancellerName;
var pocketBox = null;
var opoSkillTrack;
var mySkillTrack;
var current_ability_method = null;
var end_phase_protocols = null;
let waitinInfoAsArray = [roster[0],roster[1],roster[2],nickName,gamePlaceName,"waiting for opponent"];
let waitingTicker = 0;
var km = window.innerHeight;
let GAME_SCENARIO;
let GAME_TURN = 1
let MY_SCORE = 0
let OP_SCORE = 0
const tituulti = {
    left:{
        challenge:false,
        illKillYouAll:false,
        piercingStrike:false,
        sweepingSlash:false
    },
    right:{
        challenge:false,
        illKillYouAll:false,
        piercingStrike:false,
        sweepingSlash:false
    }
}
var titustepper = {
    left:false,
    right:false
}
var landstepper = {
    left:false,
    right:false
}
var GEEK = {}