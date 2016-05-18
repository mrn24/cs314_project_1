var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x00BFFF});
gameport.appendChild(renderer.view);

var background = PIXI.Sprite.fromImage("BG.jpg");

var stage = new PIXI.Container();

// add background to stage..
stage.addChild(background);

var texture = PIXI.Texture.fromImage("hoegarth.png");
var whirltex = PIXI.Texture.fromImage("whirlpool.png");
var finishtex = PIXI.Texture.fromImage("finishline.png");
var endgameText = new PIXI.Text("You were sucked in a whirlpool!", {font:"25px Arial", fill:"yellow"});
var endgameText2 = new PIXI.Text("Hit Space to try again!", {font:"25px Arial", fill:"yellow"});
endgameText2.position.y = 20;

var character = new PIXI.Sprite(texture);
var finishLine = new PIXI.Sprite(finishtex);

var isRunning = true;
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

function gameStart(){
  isRunning = true;
  character.rotation = 0;
  character.position.x = 20;
  character.position.y = 20;
  for (var j = 0; j <= whirls.length; j++){
    stage.removeChild(whirls[j]);
  }
  whirls = [];
  for (var i = 0; i < level*5; i++){
    var whirlpool = new PIXI.Sprite(whirltex);
    whirlpool.anchor.x = 0.5;
    whirlpool.anchor.y = 0.5;
    whirlpool.position.x = Math.floor(Math.random() * 360) + 50;
    whirlpool.position.y = Math.floor(Math.random() * 360) + 50;
    if ((whirlpool.position.x < 60 && whirlpool.position.y < 60)||(whirlpool.position.x > 340 && whirlpool.position.y > 340)){
      i--;
    }
    else{
      stage.addChild(whirlpool);
      var newLength = whirls.push(whirlpool);
    }
  }
}

function keydownEventHandler(e){
  if (e.keyCode == 87){//W
    if(character.position.y > 20){
      character.position.y -= 10;
    }
  }
  if (e.keyCode == 83){//S
    if(character.position.y < 380){
      character.position.y += 10;
    }
  }
  if (e.keyCode == 65){//A
    if(character.position.x > 20){
      character.position.x -= 10;
    }
  }
  if (e.keyCode == 68){//D
    if(character.position.x < 380){
      character.position.x += 10;
    }
  }
  if (e.keyCode == 32){//Space
    if (isRunning == false){
      stage.removeChild(endgameText);
      stage.removeChild(endgameText2);
      level = 1;
      levelBoard.setText("Level: " + level);
      gameStart();
    }
  }
}

document.addEventListener('keydown', keydownEventHandler);

function endgame(){
  isRunning = false;
  stage.addChild(endgameText);
  stage.addChild(endgameText2);
  level = 0;
  levelBoard.setText("Level: " + level);
}


function animate(){
  requestAnimationFrame(animate);
  for(var i = 0; i < whirls.length; i++){
    whirls[i].rotation += 0.1;
    if (Math.abs(character.position.x - whirls[i].position.x) <= 40 && Math.abs(character.position.y - whirls[i].position.y) <= 40){
      character.position.x = whirls[i].position.x;
      character.position.y = whirls[i].position.y;
      character.rotation -= 0.1;
      endgame();
    }
    if (Math.abs(character.position.x - finishLine.position.x) <= 5 && Math.abs(character.position.y - finishLine.position.y) <= 5){
      level += 1;
      levelBoard.setText("Level: " + level);
      gameStart();
    }
  }
  renderer.render(stage);
}
gameStart();
animate();
