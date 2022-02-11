var nickName = (Math.floor(Math.floor( Math.random () * (1000 - 1 + 1)) + 1)).toString();
var gamePlaceName = "Lothlorien";
var roster = ["Jeen","Morrigan","Blackjaw"];
var opoName = "BadBob";
var opoRoster = ["Jeen","SneakyPeet","Lorsann"];
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
let kallbak_m = null
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
const TaT = `All character names, abilities, rules and character images are registered trademarks of&nbsp;<a target="_blank" href="https://steamforged.com/">Steam Forged Games Ltd.</a>&nbsp;This site is not affiliated with&nbsp;<a target="_blank"  href="https://steamforged.com/">Steam Forged Games Ltd.</a>&nbsp;and no claim of ownership is made to any of these trademarks. Icons for skills, banners etc. are are graciously provided by&nbsp;<a target="_blank"  href="https://game-icons.net/">https://game-icons.net/</a>&nbsp;.<br/><br/>You expressly agree that use of this service is at your sole risk and is provided on an "as is" basis without warranties of any kind, either express or implied. No one can warrant that the service will be uninterrupted or error-free. Use at your own risk.<span id="contact_me">larhendiel@yahoo.co.uk</span>`
const queztionMark = `When you click on a champion icon on the left their card gets displayed and the champion will be added to roster on the right. <br/>If you click on champion on the right hand side it will get removed from roster. <br/>Once you have all 3 champions selected, fill in your nick name and the battlefield name you and your opponent agreed upon. <br/>For example you both could use 'Godtear' as the place where you battle, so that you join the same room and get to play. <br/>You can of course open this game in two separete windows and practice on your own.`