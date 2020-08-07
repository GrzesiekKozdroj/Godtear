'use strict';
const express = require('express');
const app = express();
const serv = require('http').Server(app);
let SOCKET_LIST = {};
let LOBBY_LIST = {quickGame0:{}};
const serverPort = 4200;

class GameClient {
    constructor(id, nickName, roomName, otherGajmer, roster) {
        this.id = id;
        this.nickName = nickName;
        this.roomName = roomName;
        this.roster = roster
        this.otherGajmer = otherGajmer;
    }
}

var io = require('socket.io')(serv, {});

io.sockets.on('connection', (socket) => {
    socket.emit('online');
            socket.id = Math.random();
            SOCKET_LIST[socket.id] = socket;
            socket.opoName = 'bad bob'


    socket.on('namePlace', (data) => {//after that client chooses his team.
        if ( data.nickName.length < 15 && data.place.length < 15 && /^[0-9A-Za-z]+$/.test(data.nickName) && /^[0-9A-Za-z]+$/.test(data.place)) {
            //quickame room generation module
                if ( (data.place in LOBBY_LIST) && (data.nickName in LOBBY_LIST[data.place]) ){
                    socket.emit("duplicateGamerName");
                } else if((data.place in LOBBY_LIST) && Object.keys(LOBBY_LIST[data.place]).length < 2 &&
                !(data.nickName in LOBBY_LIST[data.place])){
                    socket.nickName = data.nickName;
                    socket.gamePlace = data.place;
                    let oponame = Object.keys(LOBBY_LIST[data.place])[0]
                    LOBBY_LIST[data.place][data.nickName] = 
                        new GameClient(socket.id,data.nickName,data.place,'bad  bob',data.roster);
                    let plac = LOBBY_LIST[data.place]
                    socket.opoName = plac[oponame].id;
                    plac[oponame].otherGajmer = socket.id
                    let rr = Math.floor( Math.random () * (5 - 0 + 1)) + 0
                    for(let c in SOCKET_LIST){
                        let opz = SOCKET_LIST[c]
                        if(socket.gamePlace === opz.gamePlace && opz.id !== socket.id){ opz.opoName=socket.id; }
                    }
                    let coinToss = Math.random() > .5 ? 12 : 11;
                    plac[Object.keys(LOBBY_LIST[data.place])[0]].side = coinToss < 12 ? 'left' : 'right';
                    plac[Object.keys(LOBBY_LIST[data.place])[1]].side = coinToss > 11 ? 'left' : 'right';
                    loopRoom({socket:socket,pack:{pack:LOBBY_LIST[data.place],scenario:rr, coin: coinToss},
                        stringEmit:'betaTime',callback:o=>o,twoWay:true})
                } else if( !(data.place in LOBBY_LIST) ){
                    socket.gamePlace = data.place;socket.nickName=data.nickName
                    LOBBY_LIST[data.place] = { [data.nickName]: new GameClient(socket.id,data.nickName,data.place,'',data.roster) };
                    socket.emit('alfaTime');
                } else if( (data.place in LOBBY_LIST) && Object.keys(LOBBY_LIST[data.place]).length > 1){
                    socket.emit("duplicateGameLobbyName")
                }
        };
    });

    socket.on('chatMSG',(message)=>{
            for(let bc in LOBBY_LIST[socket.gamePlace]){
                let playjer = LOBBY_LIST[socket.gamePlace][bc];
                SOCKET_LIST[playjer.id].emit('serverMSG',{message:message,nickName:socket.nickName});
            }
    });

    socket.on('chatMSG_seeWhosIn',()=>{
        if((socket.gamePlace in LOBBY_LIST) && Object.keys(LOBBY_LIST[socket.gamePlace]).length === 1){
            socket.emit('serverMSG',{message:'-WAITING-FOR-SECOND-PLAYER-',nickName:'Hoist'});
        }else if ((socket.gamePlace in LOBBY_LIST) && Object.keys(LOBBY_LIST[socket.gamePlace]).length === 2)
            for(let bc in LOBBY_LIST[socket.gamePlace]){
                let playjer = LOBBY_LIST[socket.gamePlace][bc];
                SOCKET_LIST[playjer.id].emit('serverMSG',{message:'-SECOND-PLAYER-CONNECTED-',nickName:'Hoist'});
            }
    });

    socket.on('disconnect', () => {
        delete SOCKET_LIST[socket.id];
        deleteLobby: for(let bc in LOBBY_LIST){
            let lobby = LOBBY_LIST[bc];
            for(let ah in lobby){
                let quitGamer = lobby[ah];
                if(quitGamer.id === socket.id){
                    delete LOBBY_LIST[bc];
                    break deleteLobby;
                }
            }
        }
    });
    socket.on('deployment-select',p=>{
            loopRoom({socket:socket,pack:p,stringEmit:'deployment-select',callback:o=>o,twoWay:false})
        })
    socket.on('quick_game',p=>loopRoom({socket:socket,pack:p,stringEmit:'qg',callback:o=>o,twoWay:true}))
    socket.on('deploy-on-hex',p=>loopRoom({socket:socket,pack:p,stringEmit:'d-o-h',callback:o=>o,twoWay:true}) )
    socket.on('beginBattle',()=>loopRoom({socket:socket,pack:'white',stringEmit:'horn',callback:o=>o,twoWay:false}))
    socket.on('selectedModel',p=>loopRoom({socket:socket,pack:p,stringEmit:'sM',callback:o=>o,twoWay:false}))
    socket.on('modelMoving',p=>loopRoom({socket:socket,pack:p,stringEmit:'mM',callback:o=>o,twoWay:false}))
    socket.on('HH',p=>loopRoom({socket:socket,pack:p,stringEmit:'HH',callback:o=>o,twoWay:false}))
    socket.on('stakeClaim',p=>loopRoom({socket:socket,pack:p,stringEmit:'sC',callback:o=>o,twoWay:false}))
    socket.on('markedMan',p=>loopRoom({socket:socket,pack:p,stringEmit:'markedMan',callback:o=>o,twoWay:false}))
    socket.on('rolloSkill',p=>loopRoom({socket:socket,pack:p,stringEmit:p.socksMethod,callback:roll,twoWay:true}))
    socket.on('forceMove',p=>loopRoom({socket:socket,pack:p,stringEmit:'fM',callback:o=>o,twoWay:false}))
    socket.on('turnEnd',p=>loopRoom({socket:socket,pack:p,stringEmit:'tt',callback:roll,twoWay:true}))
    socket.on('camcel',p=>loopRoom({socket:socket,pack:p,stringEmit:'camcel',callback:o=>o,twoWay:true}))
    socket.on('epp',p=>loopRoom({socket:socket,pack:p,stringEmit:'epp',callback:o=>o,twoWay:true}))

});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
});
app.use('/', express.static(__dirname + '/client'));
console.log(`http://localhost:${serverPort}/`);

serv.listen(process.env.PORT || serverPort);

function loopRoom (options) {
        let pack = options.pack ? options.pack : {};
        const evokeMe = (pack, callback) => {
            if(typeof callback === 'function')return callback(pack);
        }
        let returnPackage = evokeMe(pack, options.callback);
        if(options.twoWay === 'selfie'){
            SOCKET_LIST[options.socket.id].emit(options.stringEmit, returnPackage) 
        }
        else if( !options.twoWay && SOCKET_LIST[options.socket.opoName] ){
            SOCKET_LIST[options.socket.opoName].emit(options.stringEmit, returnPackage);
        } 
        else if( SOCKET_LIST[options.socket.id] && SOCKET_LIST[options.socket.opoName] ){
            SOCKET_LIST[options.socket.id].emit(options.stringEmit, returnPackage);
            SOCKET_LIST[options.socket.opoName].emit(options.stringEmit, returnPackage);
        }
}
const DICE = () => {
    let r = (Math.ceil(Math.random() * 6))
    return r < 3 ? 0 : r < 6 ? 1 : 2
}
function roll(o){
    const { aim, hurt, socksMethod, hex, row, multiAction, cursePackage, curseCount, key } = o
    let aim_rolls = [];
    let hurt_rolls = [];
    let die_hurt = 0;
    let die_aim = 0;

    do {
        aim_rolls = [ ...aim_rolls, DICE()];
        die_aim++
    } while (die_aim < aim)
    
    do {
        hurt_rolls = [ ...hurt_rolls, DICE()];
        die_hurt++
    } while (die_hurt < hurt)
    const vvdf = { aim:aim_rolls, hurt:hurt_rolls, socksMethod, hex, row, multiAction, cursePackage, curseCount, key }
    return vvdf
}