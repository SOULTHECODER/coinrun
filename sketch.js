var  boy,  boyimg,ghost,ghostImg;
var track,trackimg; 
var coins,coinimg
var Bscore=0, Gscore=0;
var coinGroup;
var PLAY=1;
var END=0;
var Btouch=0, Gtouch=0;
var gameState=PLAY;
var barrier,barrierImg,barrierGroup,gameoverImg;
//var database;
var gameState;
var playerCount;
function preload(){
girlimg=loadImage("GIRL.png");
boyimg=loadImage("NINJA.png");
trackimg=loadImage("track.png");
ghostimg=loadImage("Ghost.png");
coinimg=loadImage("Coins.png");
barrierImg=loadImage("barrier.png")
gameoverImg=loadImage("gameover.png");


}




function setup(){
    createCanvas(windowWidth,windowHeight);
    track=createSprite(windowWidth/2,(windowHeight/2)+100);
    track.addImage("track",trackimg);
    girl=createSprite(windowWidth/4,windowHeight-70);
    girl.addImage("girl",girlimg);
    boy=createSprite(windowWidth-(windowWidth/4),windowHeight-75);
    boy.addImage("boy",boyimg);
    boy.addImage("game over",gameoverImg);
    girl.addImage("game over",gameoverImg);
boy.scale=0.4;
girl.scale=0.53;
track.scale=1.6;
track.velocityY=2;
score = 0;
coinGroup = new Group();  
barrierGroup = new Group();
// boy.debug=1;
 //girl.debug=1;
girl.setCollider("rectangle",0,0,150,260);
boy.setCollider("rectangle",0,0,250,380);
//database=firebase.database;
//game = new Game();
 // game.getState();
  //game.start();
}

function draw(){
  
    background("lightblue");
    
    
    if (gameState===PLAY){
    
      track.velocityY = (6 + 3*score/100);
    
      if(keyDown("left")){
        boy.x=boy.x-3;
       }
       if(keyDown("right")){
           boy.x=boy.x+3;
          }
          if(keyDown("a")){
           girl.x=girl.x-3;
          }
          if(keyDown("d")){
           girl.x=girl.x+3;
          }
   
    
      if(track.y>(windowHeight/2)+200){
        track.y=windowHeight/2;
    }
      spawnCoin();
      spawnBarrier()
      if(coinGroup.isTouching(boy)){
        Bscore=Bscore+1;  
        coinGroup.destroyEach();
    }
    if(coinGroup.isTouching(girl)){
      Gscore=Gscore+1;  
      coinGroup.destroyEach();
  }
  //barriercode
      if(barrierGroup.isTouching(boy)){
          boy.changeImage("game over",gameoverImg)
          boy.scale=1.01;
          Btouch=1;
      }
      if(barrierGroup.isTouching(girl)){
        girl.changeImage("game over",gameoverImg)
        girl.scale=1.01;
        Gtouch=1;
        
    }
    if(Btouch==1&&Gtouch==1){
      gameState=END;
    }
    }
    else if (gameState === END) {
      // gameOver.visible = true;
      // restart.visible = true;
      
      //set velcity of each game object to 0
      track.velocityY = 0;
      coinGroup.setVelocityYEach(0);
      barrierGroup.setVelocityYEach(0);
      //coinsGroup.setVelocityXEach(0);
      
      //change the trex animation
      // trex.changeAnimation("collided",trex_collided);
      
      // //set lifetime of the game objects so that they are never destroyed
      // obstaclesGroup.setLifetimeEach(-1);
      // cloudsGroup.setLifetimeEach(-1);
      
      // if(mousePressedOver(restart)) {
      //   reset();
      // }
    }
    





    
    
       
    drawSprites();
    fill("red")
    textSize(24);
    text("Score: "+ Gscore, 10,50);
    fill("blue")
    text("Score:" +Bscore,windowWidth-200,50);



// function spawnCoin(){
//     if(frameRate%60==0){
//         console.log(frameRate%60)
//         coins=createSprite(600,600,30,30);
//         coins.shapeColor="red"
//        //coins.addImage("coin",coinimg);
//     }
// }
function spawnCoin() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coins = createSprite(600,120,40,10);
    coins.x=Math.round(random(100,(windowWidth-100)))
    coins.addImage(coinimg);
    coins.scale = 0.25;
    coins.velocityY = 4;
    coins.lifetime=600;
    coinGroup.add(coins);
  //  coins.debug=1;
    
  }
  
}

function spawnBarrier() {
  //write code here to spawn the clouds
  if (frameCount % 260 === 0) {
    barrier = createSprite(600,120,40,10);
    barrier.x=Math.round(random(100,(windowWidth-100)))
    barrier.addImage(barrierImg);
    barrier.scale = 0.25;
    barrier.velocityY = 4;
    barrierGroup.add(barrier);
    // barrier.debug=1;
    
  }
  
}
}