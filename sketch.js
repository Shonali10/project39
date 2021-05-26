//making variable for knife
var knife ,knifeImage;

//make gamestate
var PLAY=1;
var END=0;
var gameState = PLAY;

//make fruits images
var fruit1, fruit2, fruit3, fruit4

//make monster image
var monsterImage

//creating score;
var score;

//gameover image
var gameOver, sound1, sound2;

function preload(){
  //loading knife image
 knifeImage = loadImage("knife.png");
  
  //loading fruits images
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  //loading monster image
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  
  //loading gameover image
  gameOver = loadImage("gameover.png")
  

 
}

function setup(){
  // making canvas
  createCanvas(500,500);
  
  // making the knife
  knife = createSprite(40,200,20,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.6;

  
  score=0;
  
  // create fruit and enemy groups
  fruitGroup=createGroup();
  enemyGroup= createGroup();
}


function draw(){
    
  background("lightblue");
  if (gameState === PLAY){
    // if knife touches a fruit then the score increases and fruit disappears
    if (fruitGroup.isTouching(knife)){
      score=score+1;
      fruitGroup.destroyEach()
    // sound2.play();
        }
    
   // move the knife with mouse
     knife.y = World.mouseY;
  knife.x= World.mouseX;

  camera.x=knife.x
  camera.y=knife.y
  
  // calling the fruits and enemy functions
  fruits();
  enemy();

  }
  if(enemyGroup.isTouching(knife)){
    gameState= END;
    // sound1.play();
  }
    if(gameState===END){
// make the fruits and monsters disappear when gamestate is end
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
      
      enemyGroup.velocityX=0;
      enemyGroup.velocityY=0;
    
      fruitGroup.velocityX=0;
      fruitGroup.velocityY=0;
      
      knife.addImage(gameOver);
      knife.x=250;
      knife.y=250;
      knife.scale=1;

      console.log("Game Ended");
    }
textSize(20);  
  text("Score: "+ score , 230,50)  
  
  console.log("this is "+gameState );
  drawSprites();
}

function fruits(){
  if (World.frameCount  % 80 === 0 ){
    var fruit =createSprite(400,Math.round(random(100,400)),20,20);
    
    position=Math.round(random(1,2));
    if (position == 1){
     fruit.x=400;
     fruit.velocityX=-(7+score/4);
    }
    else{
     fruit.x=0; 
     fruit.velocityX=(7+score/4);   
    }
    
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r==3){
      fruit.addImage(fruit3);
    }else {
      fruit.addImage(fruit4);
    }
   
    
    fruit.setLifetime= 72;
    
    fruitGroup.add(fruit);
  } 
} 

function enemy(){
  if(World.frameCount % 200 ===0){
    var monster = createSprite(500,Math.round(random(100,400)),20,20);
    monster.addAnimation("moving", monsterImage);
    monster.velocityX=-(8+score/10);    
    monster.setLifetime=63;
    
   enemyGroup.add(monster);
  }
}