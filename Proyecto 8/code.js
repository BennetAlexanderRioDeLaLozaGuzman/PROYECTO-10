var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["56fe0cf3-1b93-4915-8727-452f9a770f65","1d281126-50e2-4517-8d4d-42638e0ccbd5"],"propsByKey":{"56fe0cf3-1b93-4915-8727-452f9a770f65":{"name":"ballon","sourceUrl":null,"frameSize":{"x":20,"y":20},"frameCount":4,"looping":true,"frameDelay":12,"version":".G5M1bXt4TJUKUd_am_odq2k.xBHi_0R","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":40,"y":40},"rootRelativePath":"assets/56fe0cf3-1b93-4915-8727-452f9a770f65.png"},"1d281126-50e2-4517-8d4d-42638e0ccbd5":{"name":"hockey","sourceUrl":"assets/api/v1/animation-library/gamelab/qfPopOz8nFwcQdKvovnN6XVlIPvs5awQ/category_backgrounds/sports_hockey.png","frameSize":{"x":396,"y":374},"frameCount":1,"looping":true,"frameDelay":2,"version":"qfPopOz8nFwcQdKvovnN6XVlIPvs5awQ","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":396,"y":374},"rootRelativePath":"assets/api/v1/animation-library/gamelab/qfPopOz8nFwcQdKvovnN6XVlIPvs5awQ/category_backgrounds/sports_hockey.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

/*
JUEGO DE AIR HOCKEY MULTIJUGADOR 2.0

Cambie la  forma de movimiento de las paletas para que fuera más precisa y agregue animacion

*/



 //Declaración de variables
var jugador1 = createSprite(200, 350, 100, 15);
jugador1.shapeColor = "black";
var jugador2 = createSprite(200, 50, 100, 15);
jugador2.shapeColor = "black";
var porteria1 = createSprite(200,15,150,30);
porteria1.shapeColor = "red";
var porteria2 = createSprite(200,385,150,30);
porteria2.shapeColor = "blue";
var disco = createSprite(200,200,10,10);
disco.shapeColor = "gray";
var gameState = "preGame";
var pj1 = 0;
var pj2 = 0;

//Funcion draw
function draw(){
  
//Propiedades de lienzo
background("white");
createEdgeSprites();
for(var num=0;num<400;num=num+20){
  line(num,200,num+10,200);
}

//mostrar puntuación
textSize(18);
stroke("maroon");
text(pj2,20,180);
textSize(18);
stroke("maroon");
text(pj1,20,230);

//Pre-game
if (gameState == "preGame"){

//texto de bienvenida 
fill("red");
textSize(20);
text("Are you ready?", 135, 185);
fill("black");
textSize(16);
text("Presiona 'space' para empezar", 90, 225);
fill("blue");
textSize(16);
text("Jugador 1: flecha izquierda y derecha", 70, 300);
fill("blue");
textSize(16);
text("Jugador 2: teclas a y d", 115, 100);

// iniciar Juego
if(keyDown("space")){

disco.velocityX = 2;
disco.velocityY = 2;

gameState = "inGame";
     
}
 
}

//In-game
if (gameState == "inGame"){
  
// Rebote disco
    disco.bounceOff(edges);
    disco.bounceOff(jugador1);
    disco.bounceOff(jugador2);
    jugador1.collide(edges);
    jugador2.collide(edges);

//Movimiento jugadores
    if(keyDown(RIGHT_ARROW)){
     jugador1.x = jugador1.x +5;
    }
    if(keyDown(LEFT_ARROW)){
       jugador1.x = jugador1.x -5;
    }
    if(keyDown("a")){
      jugador2.x = jugador2.x -5;
    }
    if(keyDown("d")){
      jugador2.x = jugador2.x +5;
    }

//Manejo de puntuación
    if(disco.isTouching(porteria1)){
      pj1 = pj1+1;
      disco.x = 200;
      disco.y = 200;
      disco.velocityX = 5;
      disco.velocityY = 4;
      jugador1.x = 200;
      jugador2.x = 200;
      jugador1.velocityX = 0;
      jugador1.velocityY = 0;
      jugador2.velocityX = 0;
      jugador2.velocityY = 0;
      }
    if(disco.isTouching(porteria2)){
      pj2 = pj2+1;
      disco.x = 200;
      disco.y = 200;
      disco.velocityX = -4;
      disco.velocityY = -5;
      jugador1.x = 200;
      jugador2.x = 200;
      jugador1.velocityX = 0;
      jugador1.velocityY = 0;
      jugador2.velocityX = 0;
      jugador2.velocityY = 0;
      }
      
//Puntución maxima
    if(pj1 == 5 || pj2 == 5){
      disco.destroy();
      jugador1.velocityY = 0;
      jugador1.velocityX = 0;
      jugador2.velocityX = 0;
      jugador2.velocityY = 0;
      gameState = "postGame";
    }
}

//Post-game
if(gameState == "postGame"){
  
//jugador 1 gana
  if(pj1 == 5){
   fill("green");
   textSize(20);
   text("¡Jugador 1 gana!", 135, 225);
   fill("black");
   textSize(20);
   text("Jugador 2 pierde", 135, 185);
}
//jugador 2 gana
  if(pj2 == 5){
   fill("black");
   textSize(20);
   text("Jugador 1 pierde", 135, 225);
   fill("green");
   textSize(20);
   text("¡Jugador 2 gana!", 135, 185);
}
}
  
  
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
