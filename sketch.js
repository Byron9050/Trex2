var Die
var Checkpoint
var Jump
var trex_collider
var Enemigo2;
var Enemigo;
var GameOver2;
var Retry2;
var Retry;
var GameOver;
var CloudGroup;
var CactusGroup;
var Play = 1;
var End = 0;
var GameState = Play;
var Puntaje = 0;
var cactus1;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactus7;
var ground;
var IG;
var ground2
var trex ,trex_running;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
ground = loadImage("ground2.png")
Cloud2 = loadImage("cloud.png");
cactus1 = loadImage("obstacle1.png");
cactus3 = loadImage("obstacle2.png");
cactus4 = loadImage("obstacle3.png");
cactus5 = loadImage("obstacle4.png");
cactus6 = loadImage("obstacle5.png");
cactus7 = loadImage("obstacle6.png");
Retry = loadImage("Restart2.png");
GameOver = loadImage("gameOver.png");
Enemigo = loadAnimation("Enemigo.png","Enemigo2.png");
trex_collider = loadImage("trex_collided.png");

Jump = loadSound("jump.mp3");
Die = loadSound("die.mp3")
Checkpoint = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //crear sprite de Trex
 trex = createSprite(50, 167);
 trex.addAnimation("running",trex_running);
 trex.addAnimation("collider",trex_collider); 
 trex.scale = 0.7

 ground2 = createSprite(200,185)
 ground2.  addImage(ground); 

 IG = createSprite(200, 195, 400, 10)
IG.visible = false;

CactusGroup = new Group();
CloudGroup = new Group();

Retry2 = createSprite (300, 100);
Retry2.addImage(Retry)
Retry2.scale = 0.5

GameOver2 = createSprite (300, 150);
GameOver2.addImage(GameOver)
GameOver2.scale = 0.5;
trex.setCollider("Circle",0,0,40);
trex.debug = true
//Enemigo2 = createSprite(200, 80);
 // Enemigo2.addAnimation("Fly",Enemigo);
}

function draw(){
  background("white");
  text("Puntaje " + Puntaje, 500, 100);
  if(GameState == Play){

    Retry2.visible = false;
    GameOver2.visible = false;
    ground2.velocityX = -(10 + 3*Puntaje/2500);
    Puntaje = Puntaje + Math.round(frameCount/60); 
    if(Puntaje > 0 && Puntaje%1000 == 0) {

    Checkpoint.play()

    }
    if(keyDown("space") && trex.y >= 150) {

      trex.velocityY = -13
      Jump.play();
        }
         trex.velocityY = trex.velocityY + 0.8; 
         //Para que el suelo se haga infinito
         if(ground2.x < 0) {

          ground2.x = ground2.width/2;
          
       
         }

         RN ();
         Cactus ();
         Terofly ();

        if(CactusGroup.isTouching(trex)) {

        GameState = End;
        Die.play()

        } 
  }
  else if(GameState == End){

    ground2.velocityX = 0;
    Retry2.visible = true;
    GameOver2.visible = true;
    trex.changeAnimation("collider",trex_collider);
    CactusGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    CactusGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
  }
 
  
  

  trex.collide(IG)
  drawSprites();

}

function RN () {

  if(frameCount % 60 == 0) {
  var Cloud = createSprite(600,100);
  Cloud.addImage(Cloud2);
  Cloud.scale = 0.5

  Cloud.velocityX = -(10 + Puntaje/2500);
    Cloud.y = Math.round(random(10,60));
    Cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    Cloud.lifetime = 65
    CloudGroup.add(Cloud);
  }

}


function Cactus() {
// para que las nubes aparescan cada 60 segundos
  if(frameCount % 60 == 0) {

   Cactus2 = createSprite(700, 170);
   Cactus2.velocityX = -(13 + Puntaje/2500);
   var run = Math.round(random(1,6));
   switch(run) {

   case 1:Cactus2.addImage(cactus1);
   break;
   case 2:Cactus2.addImage(cactus3);
   break;
   case 3:Cactus2.addImage(cactus4);
   break;
   case 4:Cactus2.addImage(cactus5);
   break;
   case 5:Cactus2.addImage(cactus6);
   break;
   case 6:Cactus2.addImage(cactus7);
   break;
   default: break;
   }
  Cactus2.scale = 0.8
  CactusGroup.add(Cactus2);
  }

}
function Terofly() {

 // if(frameCount % 60 == 0) {
      

  
  Enemigo.velocityX = -10
 // }

}