var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight || e.clientHeight || g.clientHeight;

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'robits', { preload: preload, create: create, update: update, render: render });
var player, board, map;
var cursors;
var widthInTiles, heightInTiles, tileWidth;
var keyboardMovement = true;

function preload() {
    game.load.tilemap('map', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tileset.png');
    game.load.image('robot', 'assets/robot.png');
}

function create() {
    cursors = game.input.keyboard.createCursorKeys();

    map = game.add.tilemap('map');
    map.addTilesetImage('tileset');

    var layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    player = game.add.sprite(width / 2, height / 2, 'robot');

    widthInTiles = 16;
    heightInTiles = 12;
    tileWidth = 128;
}

function update() {
    tryArrowKeyMovement();
}

function render() {

}

function tryArrowKeyMovement() {
    if (cursors.up.isDown) {
        moveOverTiles(player, 0, -1);
    } else if (cursors.down.isDown) {
        moveOverTiles(player, 0, 1);
    } else if (cursors.left.isDown) {
        moveOverTiles(player, -1, 0);
    } else if (cursors.right.isDown) {
        moveOverTiles(player, 1, 0);
    }
}

function moveOverTiles(entity, xTiles, yTiles) {
    if(!map) {
        console.error("No tilemap defined");
        return;
    } else if(!keyboardMovement) {
        return;
    }

    keyboardMovement = false;
    setTimeout(function() {
        keyboardMovement = true;
    }, 100);

    entity.x = Phaser.Math.clamp(entity.x + (xTiles * tileWidth), 0, width);
    entity.y = Phaser.Math.clamp(entity.y + (yTiles * tileWidth), 0, height);
}