const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var temp = 0;

var ground;

var rope1;
var rope2;
var rope3;

var fruit;

var hook1;
var hook2;
var hook3;

var bgImage;
var fruitImage;
var targetImage;
var bunny;

var blink;
var eat;
var sad;

var button1;
var button2;
var button3;

var bk_Sound;
var cut_Sound;
var sad_Sound;
var eating_Sound;
var air_Sound;

var star1, starImg;
var star2;
var balloon;
var bubble, bubbleImg;

var emptyStar, oneStar, twoStar
var sTaRz;

var mute_Button;

var edge;
var edge1;

var score = 0;

var bow, bowImg;



function preload() {

  bgImage = loadImage("BG.png");
  fruitImage = loadImage("arrow.png");
  targetImage = loadImage("Target.png");

  bk_Sound = loadSound("sound1.mp3");
  cut_Sound = loadSound("rope_cut.mp3");
  sad_Sound = loadSound("sad.wav");
  eating_Sound = loadSound("eating_sound.mp3");
  air_Sound = loadSound("air.wav");

  starImg = loadImage("star.png");
  
  emptyStar = loadImage("emptyStar.png");
  oneStar = loadImage("one_star.png");
  twoStar = loadImage("stars.png");

  bubbleImg = loadImage("Bubble.png");

  bowImg = loadImage("Bow.png");

  
  
}

function setup() {

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {

    canvasWidth = displayWidth + 80;
    canvasHeight = displayHeight;

  } else {

    canvasWidth = windowWidth;
    canvasHeight = windowHeight;

  }

  createCanvas(canvasWidth, canvasHeight);
  frameRate(80);

  bk_Sound.play();
  bk_Sound.setVolume(0.1);
  
  engine = Engine.create();
  world = engine.world;



  bunny = createSprite(250, 200, 200, 100);
  bunny.addImage("Daisy", targetImage);
  //bunny.debug = true;
  bunny.scale = 0.2;
  

  bunny.velocityX = 10;


  /*button1 = createImg("cut_btn.png");
  button1.position(100, 190);
  button1.size(50, 50);
  button1.mouseClicked(drop1);

  button2 = createImg("cut_btn.png");
  button2.position(450, 190);
  button2.size(50, 50);
  button2.mouseClicked(drop2);*/

  bow = createImg("Bow.png");
  bow.position(width/2 - 200, height-300);
  bow.size(400, 250);
  bow.mouseClicked(mute);

 /*button3 = createImg("cut_btn.png");
  button3.position(360, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);*/


  //balloon = createImg("balloon.png");
  //balloon.position(440, 70);
  //balloon.size(120, 100);
  //balloon.mouseClicked(airBlow);


 /* mute_Button = createImg("mute.png");
  mute_Button.position(450, 20);
  mute_Button.size(50, 50);
  mute_Button.mouseClicked(mute);*/


  ground = new Ground(width/2, height-10, width, 20);

  //rope1 = new Rope(10, {x: 120, y:190});
  //rope2 = new Rope(12, {x: 490, y:190});
  //rope3 = new Rope(5, {x: 400, y:225});

  var fruit_options = {

    density: 0.0001,
    restitution: 0.5,

  }

  fruit = Bodies.circle(width/2, height-230, 20, fruit_options);
  
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0, y:0.002});

  

  

//hook1 = new Link(rope1, fruit);
 //hook2 = new Link(rope2, fruit);
  //hook3 = new Link(rope3, fruit);

  /*star1 = createSprite(520, 400, 20, 20);
  star1.addImage(starImg);
  star1.scale = 0.02;

  star2 = createSprite(75, 670, 20, 20);
  star2.addImage(starImg);
  star2.scale = 0.02;

  bubble = createSprite(200, 670, 20, 20);
  bubble.addImage(bubbleImg);
  bubble.scale = 0.1;

  sTaRz = createSprite(50, 20, 30, 30);
  sTaRz.scale = 0.2;
  sTaRz.addImage("empty", emptyStar);
  sTaRz.addImage("Uno", oneStar);
  sTaRz.addImage("Dos", twoStar);*/

  edge = createSprite(width, 30, 5, 500);
  edge1 = createSprite(0, 30, 5, 500);



  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
 

}

function draw() 
{
  bunny.bounceOff(edge);
  bunny.bounceOff(edge1);



  image(bgImage,width/2,height/2,width,height);

  if(fruit!=null){
    image(fruitImage,fruit.position.x,fruit.position.y,200,200);
  }

  console.log(mouseX + ", " + mouseY);


  //rope3.show();
  Engine.update(engine);
  ground.display();

  if(collide(fruit, bunny, 80) == true){
    

    eating_Sound.play();
    World.remove(world, fruit);
      fruit = null;

  } 


  drawSprites();
  
}

function drop1() {
  
  rope1.break();
  hook1.detach();
  hook1=null;
  cut_Sound.play();
  
}

function drop2() {
  
  rope2.break();
  hook2.detach();
  hook2=null;
  cut_Sound.play();
  
}

/*function drop3() {
  
  rope3.break();
  hook3.detach();
  hook3=null;
  cut_Sound.play();
  
}*/

function collide(body, sprite, x) {

  if (body != null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d <= x){
      return(true);

    } else {

      return(false);

    }

  }

}


function mute() {

  if (bk_Sound.isPlaying()) {

    bk_Sound.stop();

  } else {

    bk_Sound.play();

  }
  
}

function keyPressed() {

  if(keyCode==UP_ARROW)
  {
    Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0, y:- 0.1});

  }
  

}