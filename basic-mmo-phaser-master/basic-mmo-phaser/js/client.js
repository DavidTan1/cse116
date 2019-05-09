var Client = {};
var score = [];
var str = ""
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendPlant = function(str, list){
    Client.socket.emit(str, list);
}

Client.waterPlant = function(){
    Client.socket.emit('waterPlant');
}

Client.newPlant = function(){
    Client.socket.emit('newPlant');
};

Client.killPlant = function(){
    Client.socket.emit('killPlant');
}

Client.sendKey = function(key){
    Client.socket.emit(key);
};

Client.size = function(){
    Client.socket.emit("size")
}

Client.back = function(data){
    Client.socket.emit("delete", data)
}


Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});




Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++) {
        Game.addNewPlayer(data[i].id, data[i].x, data[i].y);
        Game.ClientSize++
    }

    Client.socket.on('allPlant', function(data) {

        for(var p = 0; p < data.length; p++) {
            Game.addNewPlant(data[p])


        }

    });

    Client.socket.on('grow', function(data){
        for(var s = 0; s < data.length; s++){

            Game.grow(data[s].x, data[s].y, data[s].realId, data[s].age, data[s].id)

        }

    });


    Client.socket.on('killPlant', function(data){
        //console.log(data)
        Game.removePlant(data.realId)
        Client.back(data)
    });

    Client.socket.on('waterPlant',function(data){
        //console.log("water plant")
        //water plant

        if(data.age > 800){
            score.push(data.id)
        }
        var str = ""

        if(score.length == 1){
            str = str + " player " + score[0] + " flower has fully grown. "

        }else{
            for(var x = 0; x < score.length; x++){
                if(score[x] != score[x+1])
                    str = str + " player " + score[x] + " flower has fully grown. "
            }
        }

        document.getElementById("leaderBoard").innerHTML = str

        Game.grow(data.x, data.y, data.id, data.age)

    });

    Client.socket.on('right',function(data){
        Game.moveRight(data.id);
    });

    Client.socket.on('newPlant',function(data){
        Game.addNewPlant(data)
    });

    Client.socket.on('left',function(data){
        Game.moveLeft(data.id);
    });

    Client.socket.on('up',function(data){
        Game.moveUp(data.id);
    });

    Client.socket.on('down',function(data){
        Game.moveDown(data.id);
    });

    Client.socket.on('size',function(data){
        Game.size(data);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });

    Client.socket.on('plant',function(data){
        Game.size(data);
    });

});


