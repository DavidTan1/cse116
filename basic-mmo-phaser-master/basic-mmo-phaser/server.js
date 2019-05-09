var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

dataBase = []

io.on('connection',function(socket){

    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };

        socket.plant = {
            water : false,
            age : 0,
            id : socket.player.id, //player id
            death : false,
            x : socket.player.x,
            y : socket.player.y,
            realId: server.lastPlayderID++,
            alive: false
        }

        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.emit('allPlant',dataBase);

        socket.on('newPlant', function(){

            var tracker = 0

            for(var s = 0; s < dataBase.length; s++){
                if(new createPlant(socket.player.id, socket.player.x, socket.player.y).x == dataBase[s].x &
                    new createPlant(socket.player.id, socket.player.x, socket.player.y).y == dataBase[s].y){
                    tracker++
                }
            }

            if(tracker == 0){
                dataBase.push(plant(new createPlant(socket.player.id, socket.player.x, socket.player.y)));
                io.emit('newPlant', plant(new createPlant(socket.player.id, socket.player.x, socket.player.y)));
            }
            tracker = 0

        });

        socket.on('delete', function (data) {
            dataBase.splice(dataBase.indexOf(data), dataBase.indexOf(data));

        });

        socket.on('killPlant', function(){
            for(var i = 0; i < dataBase.length; i++){
                if(socket.player.x > dataBase[i].x-15 & socket.player.x < dataBase[i].x+15){
                    if(socket.player.y > dataBase[i].y-15 & socket.player.y < dataBase[i].y+15){
                        io.emit('killPlant', dataBase[i]);
                    }
                }
            }
        });

        socket.on('waterPlant', function() {

            for(var i = 0; i < dataBase.length; i++){
                if(socket.player.x > dataBase[i].x-15 & socket.player.x < dataBase[i].x+15){
                    if(socket.player.y > dataBase[i].y-15 & socket.player.y < dataBase[i].y+15){
                        if(dataBase[i].death == true){
                            dataBase[i].age = dataBase[i].age + 10
                            io.emit('waterPlant', dataBase[i])
                        }
                    }
                }
            }
        })

        socket.on('right',function(){
            console.log(socket.player+'move to '+'right');
            socket.player.x++
            //socket.plant.x++
            grow()
            io.emit('right',socket.player);
            io.emit('grow', dataBase)
        });

        socket.on('left',function(){
            console.log(socket.player+' move to '+'left');
            socket.player.x--
            //socket.plant.x--
            grow()
            io.emit('left',socket.player);
            io.emit('grow', dataBase)

        });

        socket.on('up',function(){
            console.log(socket.player+'move to '+'up');
            socket.player.y--
            //socket.plant.y--
            grow()
            io.emit('up',socket.player);
            io.emit('grow', dataBase)

        });

        socket.on('down',function(){
            console.log(socket.player+'move to '+'down');
            socket.player.y++
            //socket.plant.y++
            grow()
            io.emit('down',socket.player);
            io.emit('grow', dataBase)
        });

        socket.on('size',function(){
            console.log('currently' + server.lastPlayderID + 'people playing the game');
            io.emit('size', server.lastPlayderID);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function getAllPlant() {
    var plants = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var plant = io.sockets.connected[socketID].plant;
        if(plant) plants.push(plant);
    });
    return plants;
}

function plant(obj){

    obj.death = true
    return obj
}

function grow() {
    for(var s = 0; s < dataBase.length; s++){
        if(dataBase[s].death == true)
            dataBase[s].age++
    }
}


function growPlant(){
    for(var s = 0; s < dataBase.length; s++){
        if(dataBase[s].death == true)
            dataBase[s].age = dataBase[s].age + (.1 * dataBase)
    }
}

function createPlant(id, x, y){

    this.water = false
    this.age = 0
    this.id = id //player id
    this.death = false
    this.x = x;
    this.y = y;

}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
