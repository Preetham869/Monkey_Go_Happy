 var PLAY = 0;
 var END;
 var gameState = PLAY;
 var monkey, monkey_running
 var banana, bananaImage, obstacle, obstacleImage
 var bananaGroup, obstacleGroup;
 var score = 0;
 var ground;
 var GameOver;
 var restart;

 function preload() {

 monkey_running = loadAnimation("sprite_0.png","sprite_1.png",
          "sprite_2.png","sprite_3.png","sprite_4.png",
          "sprite_5.png","sprite_6.png","sprite_7.png",
          "sprite_8.png")
 bananaImage = loadImage("banana-1.png");
 obstacleImage = loadImage("obstacle.png");
 GameOverImage= loadImage("game-over.png");
 restartImage = loadImage("restart.png"); 
   
 }

 function setup() {
 
 createCanvas(530,445);  
   
 monkey = createSprite(100,300,10,10);
 monkey.addAnimation("running",monkey_running);
 monkey.scale = 0.13;
   
 ground = createSprite(400,380,800,10);
 ground.velocityX = -(6 + 2*score/100) 
 ground.x = ground.width/2;
 
 GameOver = createSprite(240,100,20,20)
 GameOver.addImage(GameOverImage)
 GameOver.scale = 0.5;
 GameOver.visible = false;
  
 restart = createSprite(240,150,20,20);
 restart.addImage(restartImage)
 restart.scale = 0.5;
 restart.visible = false;

 obstacleGroup = new Group();
 bananaGroup = new Group();
 
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 monkey.debug = false;  
   
 }

 function draw () {
 
 background("white");
  
 text("Survival Time: "+ score,420,50);

 if (gameState===PLAY){
 
 score = score + Math.round(getFrameRate()/60);
 ground.velocityX = -(6 + 2*score/100);
   
 if(keyDown("space") && monkey.y >= 320) {
 
 monkey.velocityY = -12;
 
 }

 monkey.velocityY = monkey.velocityY + 0.7
   
 if (ground.x < 200){

 ground.x = ground.width/2;
 
 }  
 
 monkey.collide(ground);  
   
 spawnBanana();
 spawnObstacle();
  
 if (bananaGroup.isTouching(monkey)) {
  
 bananaGroup.destroyEach();
  
 } 
   
 if(obstacleGroup.isTouching(monkey)){
        
 gameState = END;

 }
 
 }
   
 else if (gameState === END) {
    
 GameOver.visible = true;
 restart.visible = true;
 ground.velocityX = 0;
 monkey.velocityY = 0;
 obstacleGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0);
  
 obstacleGroup.setLifetimeEach(-1);
 bananaGroup.setLifetimeEach(-1);  
   
 if(mousePressedOver(restart)) {
     
 reset();

 } 
   
 } 
    
 drawSprites() 
   
 }

 function spawnObstacle() {
 
 if (frameCount % 150 === 0) {
  
 obstacle = createSprite(600,350,20,20)
 obstacle.x = Math.round(random(600,600));
 obstacle.addImage(obstacleImage);
 obstacle.scale = 0.15
 obstacle.velocityX = -(6 + 2*score/100);
 obstacle.lifetime = 100;
 obstacleGroup.add(obstacle);  
   
 }  
   
 }

 function spawnBanana() {
 
 if (frameCount % 80 === 0) {
 
 banana = createSprite(600,250,20,20)  
 banana.x = Math.round(random(600,600)); 
 banana.addImage(bananaImage)
 banana.scale = 0.25;
 banana.velocityX = -(6 + 2*score/100);
 banana.lifetime = 100;
 bananaGroup.add(banana);  
   
 }
   
 }

 function reset() {
 
 gameState = PLAY;
 GameOver.visible = false;
 restart.visible = false;
 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();
 score = 0;
   
 }




 