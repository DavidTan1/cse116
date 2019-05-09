var Game = {};

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function(){
    game.load.image('sprite','assets/sprites/sprite.png');

    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);

    game.load.image('plant','assets/Tulip_Stage_1.png')
    game.load.image('plant1','assets/Tulip_Stage_2.png')
    game.load.image('plant2','assets/Tulip_Stage_3.png')
    game.load.image('plant3','assets/Tulip_Stage_4.png')
    game.load.image('plant4','assets/Tulip_Stage_6.png')

};

Game.create = function(){
    Game.playerMap = {};
    Game.listOfPlants = {};
    Game.ClientSize = 0;

    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(Client.sendTest, this);

    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }




    cursors = game.input.keyboard.createCursorKeys(); //creates the up, down, right, left

    key =  game.input.keyboard.addKey("P".charCodeAt(0))
    killkey =  game.input.keyboard.addKey("K".charCodeAt(0))
    waterkey =  game.input.keyboard.addKey("W".charCodeAt(0))


    Client.askNewPlayer();

};

Game.waterPlant = function(id){
    if(Game.listOfPlants[id].death == false){
        Game.listOfPlants[id].water = true;
        console.log(Game.listOfPlants[id].water)
    }
}

Game.update = function(){

    Game.getKey()

}


Game.grow = function(x, y, id, age, name){

    console.log(age)
    if(age < 200 & age >= 0){
        Game.listOfPlants[id] = game.add.sprite(x, y,'plant');
    }
    if(age > 200 & age <= 400){
        Game.listOfPlants[id] = game.add.sprite(x,y,'plant1');
    }
    if(age > 400 & age <= 600){
        Game.listOfPlants[id] = game.add.sprite(x,y,'plant2');
    }
    if(age > 600 & age <= 800){
        Game.listOfPlants[id] = game.add.sprite(x,y,'plant3');
    }
    if(age > 800){
        Game.listOfPlants[id] = game.add.sprite(x,y,'plant4');
    }
}

Game.display = function(leader){
    document.getElementById("leaderBoard").innerHTML = leader
}

Game.getKey = function(){

    if(killkey.isDown){
        //kill
        Client.killPlant();
    }
    if(waterkey.isDown){
        Client.waterPlant();
        //water
    }

    if(key.isDown){
        //plant
        Client.newPlant();
    }

    if(cursors.left.isDown){
        //move left
        Client.sendKey('left');
    }

    if(cursors.up.isDown){
        //move up
        Client.sendKey('up');
    }

    if(cursors.right.isDown){
        //move right
        Client.sendKey('right');
    }

    if(cursors.down.isDown){
        //move down
        Client.sendKey('down');
    }
};

Game.addNewPlayer = function(id, x, y){
    Game.playerMap[id] = game.add.sprite(x, y,'sprite');
};

Game.addNewPlant = function(data){

    if(data.age < 200 & data.age >= 0){
        Game.listOfPlants[data.realId] = game.add.sprite(data.x,data.y,'plant');
    }
    if(data.age > 200 & data.age <= 400){
        Game.listOfPlants[data.realId] = game.add.sprite(x,y,'plant1');
    }
    if(data.age > 400 & data.age <= 600){
        Game.listOfPlants[data.realId] = game.add.sprite(x,y,'plant2');
    }
    if(data.age > 600 & data.age <= 800){
        Game.listOfPlants[data.realId] = game.add.sprite(x,y,'plant3');
    }
    if(data.age > 800){
        Game.listOfPlants[data.realId] = game.add.sprite(x,y,'plant4');
    }

};



Game.moveLeft = function(id){
    var player = Game.playerMap[id];
    player.x--
};

Game.moveRight = function(id){
    var player = Game.playerMap[id];
    player.x++
};

Game.moveUp = function(id){
    var player = Game.playerMap[id];
    player.y--
};

Game.moveDown = function(id){
    var player = Game.playerMap[id];
    player.y++
};


Game.removePlayer = function(id){

    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
    Game.ClientSize--
};

Game.removePlant = function(readId){

    Game.listOfPlants[readId].destroy();
    delete Game.listOfPlants[readId];
}


randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


Game.remove = function(sprite) {
    sprite.destroy();
}