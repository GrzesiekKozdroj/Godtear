'use strict';
const express = require('express');
const app = express();
const serv = require('http').Server(app);
let SOCKET_LIST = {};
let LOBBY_LIST = {quickGame0:{}};
const serverPort = 4200;
const alaska = 4;

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


    socket.on('namePlace', (data) => {//after that client chooses his team.
        if (/^[0-9A-Za-z]+$/.test(data.nickName) && /^[0-9A-Za-z]+$/.test(data.place)) {
            socket.nickName = data.nickName;
            socket.gamePlace = "";
            //quickame room generation module
            if (data.place!=='quickGame') {
                if ( (data.place in LOBBY_LIST) && (socket.nickName in LOBBY_LIST[data.place]) ){
                    socket.emit("duplicateGamerName");
                    socket.gamePlace = "";
                    socket.nickName = ""
                } else if((data.place in LOBBY_LIST) && Object.keys(LOBBY_LIST[data.place]).length < 2 &&
                !(socket.nickName in LOBBY_LIST[data.place])){
                    socket.gamePlace = data.place;
                    let oponame = Object.keys(LOBBY_LIST[data.place])[0]
                    LOBBY_LIST[data.place][data.nickName] = new GameClient(socket.id,data.nickName,data.place,oponame,data.roster);
                    socket.opoName = oponame;
                    let plac = LOBBY_LIST[data.place]
                    plac[oponame].otherGajmer = data.nickName
                    loopRoom({socket:socket,pack:LOBBY_LIST[data.place],stringEmit:'betaTime',callback:o=>o,twoWay:true})
                } else if( !(data.place in LOBBY_LIST) ){
                    socket.gamePlace = data.place;
                    LOBBY_LIST[data.place] = { [data.nickName]: new GameClient(socket.id,data.nickName,data.place,'',data.roster) };
                    socket.emit('alfaTime');
                } else if( (data.place in LOBBY_LIST) && Object.keys(LOBBY_LIST[data.place]).length > 1){
                    socket.emit("duplicateGameLobbyName");
                    socket.gamePlace = "";
                }

            } else if(data.place === 'quickGame') {

                let roomsCounterToCheckIfAllRoomsAreEmpty = 0;
                for (let pg in LOBBY_LIST) {
                    let room = LOBBY_LIST[pg];
                    if (Object.keys(room).length === 1 && pg.includes('quickGame')) {
                        let opoName = LOBBY_LIST[pg][Object.keys(room)[0]]
                        room[data.nickName] = new GameClient(socket.id, data.nickName,pg,oponame,data.roster);
                        socket.gamePlace = pg;
                        socket.opoName = opoName;
                        LOBBY_LIST[pg][Object.keys(room)[0]].otherGajmer = data.nickName;
                        socket.emit('betaTime');
                    } else if (Object.keys(room).length === 2 || Object.keys(room).length === 0) {
                        roomsCounterToCheckIfAllRoomsAreEmpty++;
                        let roomName = data.place + Math.floor( Math.random () * (42000000 - 1 + 1)) + 1;
                        socket.gamePlace = roomName;
                        if (roomsCounterToCheckIfAllRoomsAreEmpty >= Object.keys(LOBBY_LIST).length){
                            LOBBY_LIST[roomName] = { 
                                [data.nickName]: new GameClient(socket.id,data.nickName,roomName,'',data.roster) 
                            };
                            socket.emit('alfaTime');
                        }
                    }
                }
            }
        };
    });

    socket.on('chatMSG',(message)=>{
            for(let bc in LOBBY_LIST[socket.gamePlace]){
                let playjer = LOBBY_LIST[socket.gamePlace][bc];
                SOCKET_LIST[playjer.id].emit('serverMSG',{message:message,nickName:socket.nickName});
            }
    });
    socket.on('evalServer',(message)=>{
        let res = eval(message);
        socket.emit('serverEvalMSG',res);
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
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
});
app.use('/', express.static(__dirname + '/client'));
console.log(`http://localhost:${serverPort}/`);

serv.listen(serverPort);

function loopRoom (options) {
        let pack = options.pack ? options.pack : {};
        const evokeMe = (pack, callback) => {
            if(typeof callback === 'function')return callback(pack);
        }
        let returnPackage = evokeMe(pack, options.callback);

        let playjer = LOBBY_LIST[options.socket.gamePlace][options.socket.nickName];
        let oplayer = LOBBY_LIST[options.socket.gamePlace][options.socket.opoName]

        if(options.twoWay === 'selfie')
            {SOCKET_LIST[playjer.id].emit(options.stringEmit, returnPackage) }
        else if(!options.twoWay) 
            {null} 
        else {
            SOCKET_LIST[playjer.id].emit(options.stringEmit, returnPackage);
            SOCKET_LIST[oplayer.id].emit(options.stringEmit, returnPackage);
        }
}