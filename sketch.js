var gameState = 1;
var obstacle;
var laserr;
var nave, navei,nave2i;
var ground, invisibleGround, groundImage;

var laserrsGroup, laserrImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score=0;
var hight=0;

var gameOver, restart;
var nochei;
var obsjetosgroup;
var resetgroup;
var gameOverImg,restartImg;
var edges;
var laser;
var recarga;
var calentamiento = 0;
var enemigo;




function preload(){
  nochei = loadImage("noche.jpg");
  
  

  navei = loadAnimation("nave.png");  
  nave2i = loadAnimation("nave2.png")
  laserrImage = loadImage("laser.png");
  
  obstacle1 = loadImage("meteorito1.png");
  obstacle2 = loadImage("meteorito2.png");
  obstacle3 = loadImage("meteorito3.png");
  



  laser = loadSound("laser.mp3")
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = 0;


  nave = createSprite(windowWidth/2,height/2+200,20,50);
  nave.setCollider("circle",0,0,200);

  

  nave.addAnimation("nave",navei);
  nave.scale = 0.1;

  recarga = createSprite(windowWidth-30,windowHeight-500,20,300);
  recarga.shapeColor = "red";

  enemigo = createSprite(-100,-20,20,20);
 
  
  
  
  
  
  enemigoGroup = new Group();
  laserrsGroup = new Group();
  obstaclesGroup = new Group();
  obsjetosgroup = new Group();
  resetgroup = new Group();
  laserrsGroup2 = new Group();


  
  invisibleGround = createSprite(50000,height/2+200,100000000,10);
  invisibleGround.visible = false;
 

  
  score = 0;
}

function draw() {
  


  background(nochei);
  textSize(20);
  fill("white")
  text("Puntuación: "+ score, camera.x+300,camera.y-300);
  text("HI: "+ hight,camera.x+500,camera.y-300);
  text("Calentamiento",windowWidth-150,130);


  console.log(gameState)


  if (gameState===0){
    if (keyDown("SPACE")){
      gameState = 1;
      
    }
    
    textSize(width/40);
     fill("white")
  text("Presiona la tecla espacio para empezar",width/4+80,height/2-50);

    
   
  }
  
  if (gameState===1){
    textSize(width/90);

  //if(calentamiento <= 200){
    if (keyDown("SPACE")) {
      calentamiento = calentamiento + 5;
  }
//}


  calentamiento = calentamiento - 1;

  if(calentamiento < 1){
    calentamiento = calentamiento + 1;
  }

  if(calentamiento > 300){
    calentamiento = 300;
  }

recarga.height = calentamiento;
  
   

    if (keyDown("RIGHT_ARROW")){
      nave.x = nave.x + 20;
 
     }
     if (keyDown("LEFT_ARROW")){
      nave.x = nave.x - 20;
 
     }

     if(nave.x > windowWidth){
        nave.x = 0;
    }

     if(nave.x < 0){
      nave.x = windowWidth;

    }
     

    if(enemigo.x > windowWidth){
      enemigo.x = 0;
  }
   
   
   
  
    nave.collide(invisibleGround);
    spawnlaserrs();
    spawnObstacles();
    spawnenemis();
    spawnlasersenemi();
    
    
    
  
    if(obstaclesGroup.isTouching(nave)){
        gameState = 2;

    }

    if(enemigoGroup.isTouching(nave)){
      gameState = 2;

  }

    if(laserrsGroup.collide(obstaclesGroup)){
      score = score + 10;
      obstacle.lifetime = 1;
      laserr.lifetime = 1;
    
  }

  if(laserrsGroup2.collide(nave)){
    gameState = 2;

  
}

  if(laserrsGroup.collide(enemigoGroup)){
    score = score + 100;
    enemigo.lifetime = 1;
    laserr.lifetime = 1;
    enemigo = createSprite(-100,-20,20,20);
    enemigo.lifetime = 100;
    enemigo.velocityY = 2;

  
}


}
   else if(gameState === 2) {
    
    gameOver = createSprite(windowWidth/2,height/2-100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(windowWidth/2,height/2-50);
    restart.addImage(restartImg);

    resetgroup.add(restart);
    obsjetosgroup.add(gameOver);

    nave.collide(invisibleGround);    
  

    

    
    
    if (score>hight){
      
          hight=score;

    }
    enemigoGroup.setVelocityXEach(0);
    enemigoGroup.setVelocityYEach(0);
    obstaclesGroup.setVelocityYEach(0);
    laserrsGroup.setVelocityYEach(0);
    laserrsGroup2.setVelocityYEach(0);


    
    enemigoGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    laserrsGroup.setLifetimeEach(-1);
    laserrsGroup2.setLifetimeEach(-1);

    
    if(mousePressedOver(restart)) {      
      reset();
    }
  }
  
 
  
  drawSprites();
  
}

function spawnlaserrs() {
  if(calentamiento <= 200){
  if (keyDown("SPACE")) {
    laserr = createSprite(nave.x,nave.y,40,10);
    laserr.addImage(laserrImage);
    laserr.scale = 0.2;
    laserr.velocityY = -10;
    laser.play();

    laserr.lifetime = height+10;
    
    laserr.depth = nave.depth;
    nave.depth = nave.depth + 1;
    
    laserrsGroup.add(laserr);
  }

}
 
  
}

function spawnlasersenemi() {
  if (frameCount % 10 === 0) {
    laserr = createSprite(enemigo.x,enemigo.y,40,10);
    laserr.addImage(laserrImage);
    laserr.scale = 0.2;
    laserr.velocityY = 10;

    laserr.lifetime = height;
    
    laserr.depth = nave.depth;
    nave.depth = nave.depth + 1;
    
    laserrsGroup2.add(laserr);
  

}
 
  
}

function spawnObstacles(){ 
if (frameCount % 50 === 0) {
 
    obstacle = createSprite(20,camera.y-500,10,40);
    obstacle.x = Math.round(random(0,windowWidth));

    obstacle.velocityY = 10;
   


    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = height+5;
    obstaclesGroup.add(obstacle);

    
    
   
  
  
    
  
  }
  

  
}

function spawnenemis(){ 
  if (frameCount % 500 === 0) {
   
      enemigo = createSprite(20,camera.y-500,10,40);
      enemigo.x = Math.round(random(0,windowWidth));
  
      enemigo.velocityY = 2;
      enemigo.velocityX = 10;
      
      

     
      enemigo.addAnimation("enemigo",nave2i);

      
      enemigo.lifetime = height;
      
      enemigo.scale = 0.2;
      enemigoGroup.add(enemigo);
  
      
      
     
    
    
      
    
    }
    
  
    
  }
  
  





function reset(){
  gameState = 1;
  gameOver.visible = false;
  restart.visible = false;
  
  resetgroup.destroyEach();
  obsjetosgroup.destroyEach();

  enemigoGroup.destroyEach();

  obstaclesGroup.destroyEach();
  laserrsGroup.destroyEach();
  laserrsGroup2.destroyEach();

  
  score = 0;
  nave.x = windowWidth/2;
 calentamiento = 1;
  
 enemigo = createSprite(-100,-20,20,20);
 enemigo.lifetime = 100;
 enemigo.velocityY = 2;

    
};
    






