var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver, gameOverImage;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  gameOverImage = loadImage("Gameover_generated.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(400, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

  door = createSprite(100, 100);
  door.addImage(doorImg);

  climber = createSprite(100, 150);
  climber.addImage(climberImg);

  gameOver = createSprite(300, 300);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  doorsGroup = createGroup();
  climbersGroup = createGroup();
}

function draw() {
  background(200);


  text("Score: " + score, 20, 50);

  if (gameState === PLAY) {
    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown(UP_ARROW)) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 10
    }

    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 10
    }

    text("Score: " + score, 300, 50);
    gameOver.visible = false;

    if (ghost.isTouching(door)) {

      gameState = END;
      //spookySound.play();
   
    }
    getDoor();
      getClimber();
  }
  else if (gameState === END) {
    gameOver.visible = true;
    ghost.remove();
    tower.velocityY = 0;
    climber.remove();
    door.remove();
  }

  

  drawSprites();
}

function getDoor() {
  if (frameCount % 40 === 0) {
    door = createSprite(100, 100);
    door.addImage(doorImg);
    door.x = Math.round(random(150, 400));

    door.velocityY = door.velocityY + 5;

    doorsGroup.add(door);
    door.lifetime = 120;
  }

}





function getClimber() {

  if (frameCount % 40 === 0) {
    climber = createSprite(100, 150);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = climber.velocityY + 5;

    climbersGroup.add(climber);
    climber.lifetime = 120;
  }
}

