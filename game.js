var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x00BFFF});
gameport.appendChild(renderer.view);

var background = PIXI.Sprite.fromImage("button_test_BG.jpg");

var stage = new PIXI.Container();

// add background to stage..
stage.addChild(background);

var texture = PIXI.Texture.fromImage("hoegarth.png");
var whirltex = PIXI.Texture.fromImage("Whirlpool.png");

var character = new PIXI.Sprite(texture);

var level = 1;
var whirls = [];

character.scale.x = 0.2;
character.scale.y = 0.2;

character.anchor.x = 0.5;
character.anchor.y = 0.5;

character.position.x = 20;
character.position.y = 20;

stage.addChild(character);

for (var i = 0; i < level*5; i++){
  var whirlpool = new PIXI.Sprite(whirltex);
  whirlpool.scale.x = 0.2;
  whirlpool.scale.y = 0.2;
  whirlpool.anchor.x = 0.5;
  whirlpool.anchor.y = 0.5;
  whirlpool.position.x = Math.floor(Math.random() * 380) + 10;
  whirlpool.position.y = Math.floor(Math.random() * 380) + 10;
  var newLength = whirls.push(whirlpool);
}

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

function animate(){
  requestAnimationFrame(animate);
  for(var i = 0; i < level*5; i++){
    whirls[i].rotation += 0.1;
  }
  renderer.render(stage);
}
animate();
