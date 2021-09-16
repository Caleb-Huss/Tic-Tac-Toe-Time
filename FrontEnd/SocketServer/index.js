let express = require('express');
let  app =express();

let http = require('http');
let server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      transports: ['websocket', 'polling', 'flashsocket']
    }
  });

var roomList = [];

const port = process.env.PORT ||  3000;

server.listen(port, ()=>{
    console.log(`started on port: ${port}`);
});

io.on('connection',(socket)=>{   

    socket.on('join',(data) =>{

        socket.join(data.room);
        let room = roomList.find(({id}) => id == data.room);
        if(!room && data.room) 
        {
            roomList.push({id: data.room, users: [], options: data.options});
        }
        room = roomList.find(({id}) => id == data.room);
        if(room && room.users && !room.users.find((user) => user == data.user) && data.user)
        {
            room.users.push(data.user);
        }
        console.log(roomList);
        console.log(io.sockets.adapter.rooms);
        io.emit('updatedRoomList',roomList);
        socket.broadcast.to(data.room).emit('user joined',`welcome ${data.user}`); 
        
    });

    socket.on('gameboard', (data) => {
        io.to(data.room).emit('new gameboard', data.gameboard);
    });
    
    socket.on('leave', (data) => {
        let room = roomList.find(({id}) => id == data.room);
        if(room){
            let index = room.users.indexOf(data.user);
            if(index >= 0) {
                socket.leave(data.room);
                room.users.splice(index, 1);
                console.log('a user left');  
            }
            console.log(roomList);
            index = roomList.findIndex(room => room.users.length == 0);
            if(index >= 0) roomList.splice(index, 1);
        }
        io.emit('updatedRoomList',roomList);
    })

    socket.on('reloadRoomList', (username) =>
    {
        io.emit('updatedRoomList',roomList);
    })
    socket.on('getPlayers',(data) => {
        console.log("getting players");
        let room = roomList.find(({id}) => id == data.room)
        console.log(room.users);
        io.in(data.room).emit('foundPlayers', room.users)
    });
    socket.on('play game',(data) => {
        console.log("game id");
        console.log(data.gameid);
        io.in(data.room).emit('goto game', data.gameid);
    });
    socket.on('gotoroom',(data) => {
        io.in(data.room).emit('goto room');
    })
});
