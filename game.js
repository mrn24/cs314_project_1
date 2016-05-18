var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x00BFFF});
gameport.appendChild(renderer.view);

var background = PIXI.Sprite.fromImage("button_test_BG.jpg");

var stage = new PIXI.Container();

// add background to stage..
stage.addChild(background);

var texture = PIXI.Texture.fromImage("hoegarth.png");
var whirltex = PIXI.Texture.fromImage("whirlpool.png");
var finishtex = PIXI.Texture.fromImage("finishline.png");
var endgameText = new PIXI.Text("You were sucked in a whirlpool!", {font:"25px Arial", fill:"yellow"});

var character = new PIXI.Sprite(texture);
var finishLine = new PIXI.Sprite(finishtex);

var level = 1;
var levelBoard = new PIXI.Text("Level: " + level, {font:"10px Arial", fill:"yellow"});

levelBoard.anchor.x = 0.5;
levelBoard.anchor.y = 0.5;
levelBoard.position.x = 380;
levelBoard.position.y = 20;
stage.addChild(levelBoard);

var whirls = [];

character.scale.x = 0.2;
character.scale.y = 0.2;

character.anchor.x = 0.5;
character.anchor.y = 0.5;

finishLine.anchor.x = 0.5;
finishLine.anchor.y = 0.5;

character.position.x = 20;
character.position.y = 20;

finishLine.position.x = 380;
finishLine.position.y = 380;

stage.addChild(character);
stage.addChild(finishLine);

function fiveMore(){
  for (var i = 0; i < 5; i++){
    var whirlpool = new PIXI.Sprite(whirltex);
    whirlpool.anchor.x = 0.5;
    whirlpool.anchor.y = 0.5;
    whirlpool.position.x = Math.floor(Math.random() * 360) + 50;
    whirlpool.position.y = Math.floor(Math.random() * 360) + 50;
    stage.addChild(whirlpool);
    var newLength = whirls.push(whirlpool);
  }
}
fiveMore();

function keydownEventHandler(e){
  if (e.keyCode == 87){//W
    character.position.y -= 10;
  }
  if (e.keyCode == 83){//S
    character.position.y += 10;
  }
  if (e.keyCode == 65){//A
    character.position.x -= 10;
  }
  if (e.keyCode == 68){//D
    character.position.x += 10;
  }
}

document.addEventListener('keydown', keydownEventHandler);

function endgame(){
  stage.addChild(endgameText);
}


function animate(){
  requestAnimationFrame(animate);
  for(var i = 0; i < level*5; i++){
    whirls[i].rotation += 0.1;
    if (Math.abs(character.position.x - whirls[i].position.x) <= 40 && Math.abs(character.position.y - whirls[i].position.y) <= 40){
      character.position.x = whirls[i].position.x;
      character.position.y = whirls[i].position.y;
      endgame();
    }
    if (Math.abs(character.position.x - finishLine.position.x) <= 5 && Math.abs(character.position.y - finishLine.position.y) <= 5){
      level += 1;
      levelBoard.setText("Level: " + level);
      fiveMore();
      character.position.x = 20;
      character.position.y = 20;
    }
  }
  renderer.render(stage);
}
animate();
