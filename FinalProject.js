var sketchProc=function(processingInstance){ with (processingInstance){ size(400, 400);
frameRate(30);
var toRads = TWO_PI/360;
////////////////////////////////////////
// Name: Andrew Repp and David Kusterer
// Date: 11 - 4 - 2016
// Assn: Milestone 1 for Final Project
// Description:
////////////////////////////////////////

// GLOBALS
var keysDown = new Array(256);
var wKey = 87;
var aKey = 65;
var sKey = 83;
var dKey = 68;
var spaceKey = 32;


/************************************************/
/*          Menu Background Object              */
/************************************************/


var menuBackgroundObj = function(){
  this.stars = [];
  this.square = 23;
  for(var i = 0; i < this.square; i++){
    for(var j = 0; j < this.square; j++){
      // Place stars every 20 (give or take 5) pixels
      this.stars.push(new PVector(i * 20 + random(-5, 5), j * 20 + random(-5, 5)));
    }
  }
};

menuBackgroundObj.prototype.display = function(){
  noStroke();
  // Black background
  fill(0, 0, 0);
  rect(0, 0, 400, 400);

  // Stars
  fill(255, 255, 255);

  // make stars move with mouse
  pushMatrix();
  translate(-mouseX/5 + 20, -mouseY/5 + 20);
  for(var i = 0; i < this.square * this.square; i++){
    ellipse(this.stars[i].x, this.stars[i].y, 2, 2);
  }
  popMatrix();
};


/************************************************/
/*             Menu Option Object               */
/************************************************/


var menuFont = createFont("monospace");

var menuOptionObj = function(option, x, y, fontSize){
  this.option = option;
  this.x = x;
  this.y = y;
  this.fontSize = fontSize;
  this.margin = fontSize * 0.2;
  this.width = (option.length * (fontSize*0.55)) + (this.margin * 2);
  this.height = fontSize + (this.margin * 2);
};

menuOptionObj.prototype.mouseIsOn = function(){
  if(mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 &&
     mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2){
    return true;
  } else {
    return false;
  }
};

menuOptionObj.prototype.display = function(){
  textFont(menuFont, this.fontSize);
  if (this.mouseIsOn() === true){
    fill(255, 255, 255);
    rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    fill(0, 0, 0);
    text(this.option, this.x - (this.width/2) + this.margin, this.y + this.margin);
  } else {
    fill(0, 0, 0);
    rect(this.x - (this.width/2), this.y - (this.height/2), this.width, this.height);
    fill(255, 255, 255);
    text(this.option, this.x - (this.width/2) + this.margin, this.y + this.margin);
  }
};


/************************************************/
/*              Main Menu Object                */
/************************************************/


var mainMenuObj = function(){
  this.newGame = new menuOptionObj("New Game", 200, 200, 25);
  this.instructions = new menuOptionObj("Instructions", 200, 250, 25);
  this.difficulty = new menuOptionObj("Difficulty", 200, 300, 25);
  this.quit = new menuOptionObj("Quit", 200, 350, 25);
};

mainMenuObj.prototype.mouseIsOn = function(){
  if (this.newGame.mouseIsOn() === true){
    return 1;
  }
  if (this.instructions.mouseIsOn() === true){
    return 2;
  }
  if (this.difficulty.mouseIsOn() === true){
    return 3;
  }
  if (this.quit.mouseIsOn() === true){
    return 4;
  }

  return 0;
};

mainMenuObj.prototype.display = function(){
  this.newGame.display();
  this.instructions.display();
  this.difficulty.display();
  this.quit.display();
};


/************************************************/
/*            Navigation Menu Object            */
/************************************************/


var navMenuObj = function(){
  this.back = new menuOptionObj("<- Back", 60, 375, 25);
  this.newGame = new menuOptionObj("New Game ->", 315, 375, 25);
};

navMenuObj.prototype.mouseIsOn = function(currState){
  if(this.back.mouseIsOn() === true){
    return 0;
  }
  if(this.newGame.mouseIsOn() === true){
    return 1;
  }

  return currState;
};

navMenuObj.prototype.display = function(){
  this.back.display();
  this.newGame.display();
};


/************************************************/
/*           Difficulty Menu Object             */
/************************************************/


var diffMenuObj = function(){
  this.easy = new menuOptionObj("Easy", 200, 100, 30);
  this.medium = new menuOptionObj("Medium", 200, 150, 30);
  this.hard = new menuOptionObj("Hard", 200, 200, 30);
};

diffMenuObj.prototype.mouseIsOn = function(currDiff){
  if(this.easy.mouseIsOn() === true){
    return "easy";
  }
  if(this.medium.mouseIsOn() === true){
    return "medium";
  }
  if(this.hard.mouseIsOn() === true){
    return "hard";
  }

  return currDiff;
};

diffMenuObj.prototype.display = function(currDiff){
  this.easy.display();
  this.medium.display();
  this.hard.display();

  fill(255, 255, 255);
  switch(currDiff){
    case "easy":
      ellipse(150, 100, 20, 20);
      ellipse(250, 100, 20, 20);
      break;
    case "medium":
      ellipse(135, 150, 20, 20);
      ellipse(265, 150, 20, 20);
      break;
    case "hard":
      ellipse(150, 200, 20, 20);
      ellipse(250, 200, 20, 20);
      break;
  }
};


/************************************************/
/*               Main Menu State = 0            */
/************************************************/


var mainMenu_state = function(){
  this.bg = new menuBackgroundObj();
  this.menu = new mainMenuObj();
};

mainMenu_state.prototype.update = function(me){};

mainMenu_state.prototype.checkState = function(me){
  me.currState = this.menu.mouseIsOn();
};

mainMenu_state.prototype.display = function(me){
  this.bg.display();
  this.menu.display();

  // Authors
  fill(255, 255, 255);
  textSize(15);
  text("Andrew Repp", 10, 390);
  text("David Kusterer", 275, 390);

  // PLACEHOLDER TITLE:
  textSize(75);
  text("SPACE", 95, 65);
  text("WARRIORS", 45, 125);
};


/************************************************/
/*          Game Background Object              */
/************************************************/

var MAP_SPEED = 1;

var gameBackgroundObj = function(){
  this.stars = [];
  this.square = 20;
  for(var i = 0; i < this.square; i++){
    for(var j = 0; j < this.square; j++){
      // Place stars every 20 (give or take 5) pixels
      this.stars.push(new PVector(i * 20 + random(-5, 5), j * 20 + random(-5, 5)));
    }
  }
};

gameBackgroundObj.prototype.update = function(){
    for(var i = 0; i < this.square * this.square; i++){
        this.stars[i].y += MAP_SPEED;
        if (this.stars[i].y > 400){
            this.stars[i].y -= 400;
        }
    }
};

gameBackgroundObj.prototype.display = function(){
  noStroke();
  // Black background
  fill(0, 0, 0);
  rect(0, 0, 400, 400);

  // Stars
  fill(255, 255, 255);

  for(var i = 0; i < this.square * this.square; i++){
    ellipse(this.stars[i].x, this.stars[i].y, 2, 2);
  }
};


/************************************************/
/*              Projectile Object               */
/************************************************/

var projectileObj = function(x, y, type, target){
  this.pos = new PVector(x, y);
  this.type = type;
  switch(this.type){
    case "friendly":
      this.speed = new PVector(0, -2);
      this.red = 0;
      this.green = 255;
      this.blue = 0;
      break;
    case "enemy":
      this.speed = new PVector(target.x - x, target.y - y);
      this.speed.normalize();
      this.speed.mult(2);
      this.red = 255;
      this.green = 0;
      this.blue = 0;
      break;
    default:
      println("Something horrible has happened.");
      break;
  }
};

projectileObj.prototype.update = function(){
  this.pos.add(this.speed);
};

projectileObj.prototype.display = function(){
  //noStroke();
  fill(this.red, this.green, this.blue);
  ellipse(this.pos.x, this.pos.y, 3, 7);
};


/************************************************/
/*               Spaceship Object               */
/************************************************/
var spaceshipObj = function(x, y, type) {
    this.pos = new PVector(x, y);
    this.vel = new PVector(0, 0);
    this.acc = new PVector(0, 0);

    this.mass = 5;
    this.width = 35;
    this.height = 45;

    this.type = type;
    this.speed = 1;
    this.armor = 1;
    this.weapon = 1;
    this.health = 10;

    this.reloadTimer = 0;
};

spaceshipObj.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acc.add(f);
};

spaceshipObj.prototype.update = function() {
    // Reload, if necessary
    if(this.reloadTimer > 0){
      this.reloadTimer--;
    }

    // Make it so the ship will come to a stop if no keys are being pressed
    var spaceFriction = PVector.mult(this.vel, (this.speed / 8) * -1);
    this.applyForce(spaceFriction);

    // If W, A, S, or D is being pressed, move the ship accordingly
    if(keysDown[wKey]){
      this.applyForce(new PVector(0, -this.speed));
    }
    if(keysDown[aKey]){
      this.applyForce(new PVector(-this.speed, 0));
    }
    if(keysDown[dKey]){
      this.applyForce(new PVector(this.speed, 0));
    }
    if(keysDown[sKey]){
      this.applyForce(new PVector(0, this.speed));
    }

    // Add the current acceleration to the velocity
    this.vel.add(this.acc);

    // Keep the ship within the bounds of the canvas
    if (this.pos.x < (this.width / 2) && this.vel.x < 0){
      this.vel.x = 0;
    } else if (this.pos.x > 400 - (this.width / 2) && this.vel.x > 0){
      this.vel.x = 0;
    }
    if (this.pos.y < (this.height / 2) && this.vel.y < 0){
      this.vel.y = 0;
    } else if (this.pos.y > 400 - (this.height / 2) && this.vel.y > 0){
      this.vel.y = 0;
    }

    // Add the current velocity to the position
    this.pos.add(this.vel);

    // Reset the current acceleration
    this.acc.set(0, 0);
};

spaceshipObj.prototype.draw = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(0, 0, 0);
    if (this.type === 1) { //Draw basic ship
        strokeWeight(2);
        //line(0, -40, 0, 0);
        fill(173, 151, 151);
        quad(5, 5, 15, 20, 15, 40, 5, 20); //Right fin
        quad(-5, 5, -15, 20, -15, 40, -5, 20); //Left fin
        fill(161, 88, 88);
        beginShape(); //BEGIN - body
            arc(0, 0, 13, 50, -41 * toRads, 221 * toRads);
            vertex(0, -35);
            vertex(5, -17);
        endShape(); //END - body
        fill(255, 222, 222);
        ellipse(0, -10, 4,4);
    } else if (this.type === 2) { //Draw upgraded ship
        strokeWeight(2);
        fill(133, 132, 173); //COLOR - blue
        quad(5, -17, 15, 20, 15, 40, 5, 20); //Right fin
        quad(-5, -17, -15, 20, -15, 40, -5, 20); //Left fin
        strokeWeight(1);
        //line(15, 3, 15, 30);
        //line(-15, 3, -15, 30);
        strokeWeight(2);
        beginShape(); //BEGIN - body
            arc(0, 0, 13, 50, -41 * toRads, 221 * toRads);
            vertex(0, -35);
            vertex(5, -17);
        endShape(); //END - body
        fill(47, 196, 196); //light blue
        arc(0, -14, 9, 10, 0 * toRads, 180 * toRads);
    } else if (this.type === 3) { //Draw ultimate ship
        strokeWeight(2);
        fill(37, 217, 49); //COLOR - red
        //triangle(42, -17, 180, 29, 29, 11);
        quad(5, -17, 15, 20, 15, 40, 5, 20); //Right fin
        quad(15, 20, 15, 40, 16, 42, 43, -5);
        quad(-5, -17, -15, 20, -15, 40, -5, 20); //Left fin
        quad(-15, 20, -15, 40, -16, 42, -43, -5);

        beginShape(); //BEGIN - body
            arc(0, 0, 13, 50, -41 * toRads, 221 * toRads);
            vertex(0, -35);
            vertex(5, -17);
        endShape(); //END - body
        fill(70, 168, 168);
        arc(0, -14, 9, 10, 0 * toRads, 180 * toRads);
    }
    popMatrix();
};

spaceshipObj.prototype.display = function() {
  this.draw();
};

/************************************************/
/*               Alien Object                   */
/************************************************/


var alienObj = function(x, y, type) {
    this.pos = new PVector(x, y);
    this.origin = new PVector(x, y);
    this.type = type;

    this.width = 40;
    this.height = 40;

    this.speed = 1;
    this.armor = 1;
    this.weapon = 1;
    this.health = 10;

    this.reloadTimer = floor(random(90, 150));
};

alienObj.prototype.update = function() {
  //println(this.reloadTimer);
  // Reload the ship's guns, if necessary
    if(this.reloadTimer > 0){
      this.reloadTimer--;
    }

    this.pos.x += this.speed;
    if(abs(this.pos.x - this.origin.x) > 20){
      this.speed *= -1;
    }
};

alienObj.prototype.draw = function() {
    pushMatrix();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    scale(1);
    stroke(0, 0, 0);
    if (this.type === 1) { //Draw basic ship
        strokeWeight(1);
        
        /** Front Wings **/
        fill(131, 97, 145);
        arc(-9, -1, 37, 96, 86 * toRads, 180 * toRads); //left front wing
        arc(9, -1, 37, 96, 0 * toRads, 94 * toRads); //right front wing
        fill(0, 0, 0);
        triangle(-7, 47, -11, 36, -8, 33);
        triangle(7, 47, 11, 36, 8, 33);
        /*
        line(-7, 47, -11, 36); //left wing border lines
        line(-11, 36, -9, 34);
        line(-8, 34, -8, 17);
        
        line(7, 47, 11, 36); //right wing border lines
        line(11, 36, 9, 34);
        line(8, 34, 8, 17); 
        */
      
        /** Middle Wings **/
        fill(113, 84, 125); //front bottom curved section
        arc(0, 10, 45, 14, -31 * toRads, 218 * toRads); //
        rotate(6 * toRads);
        arc(-9, 12, 43, 96, 172 * toRads, 258 * toRads); //left middle wing
        rotate(-12 * toRads);
        arc(9, 12, 43, 96, -80 * toRads, 9 * toRads); //right middle wing
        rotate(6 * toRads);
        line(-32, 17, -21, 13); //front line of middle wing left
        line(32, 17, 21, 13); //right
        
        fill(82, 81, 105);
        ellipse(-7, 15, 20, 20); //big circles by back wings left
        ellipse(7, 15, 20, 20); //right
        fill(131, 97, 145);
        ellipse(-9, 15, 10, 10); //small circles by back wings left
        ellipse(9, 15, 10, 10); //right
        
        fill(138, 103, 153);
        rotate(13 * toRads);
        arc(-13, -15, 40, 70, 180 * toRads, 258 * toRads); //left back wing
        rotate(-26 * toRads);
        arc(13, -15, 40, 70, -80 * toRads, 0 * toRads); //right back wing
        rotate(13 * toRads);
        
        fill(82, 81, 105);
        ellipse(-10, -18, 20, 20); //big circles by back wings left
        ellipse(10, -18, 20, 20); //right
        fill(131, 97, 145);
        ellipse(-10, -18, 10, 10); //small circles by back wings left
        ellipse(10, -18, 10, 10); //right
        
        
        
        //ellipse(0, 0, 24, 45); //main body
            beginShape(); //BEGIN - body
                arc(0, 0, 26, 50, -41 * toRads, 221 * toRads);
                vertex(0, -30);
                vertex(10, -17);
            endShape(); //END - body
            beginShape(); //BEGIN - body
                arc(0, 0, 13, 20, -41 * toRads, 221 * toRads);
                vertex(0, -21);
                vertex(5, -7);
            endShape(); //END - body
        fill(131, 97, 145);

        //back wing lines
        line(-9, -24, -5, -52);
        line(9, -24, 5, -52);
        line(-28, -21, -16, -19);
        line(28, -21, 16, -19);
        
        //green circles
        strokeWeight(1.5);
        fill(62, 214, 70);
        ellipse(6, 8, 9, 9); //big three on back
        ellipse(-6, 8, 9, 9);
        ellipse(0, -15, 11, 12);
        
        //left wing middle
        ellipse(-23, 2, 5, 7);
        ellipse(-22, -10, 5, 7);
        //right wing
        ellipse(23, 2, 5, 7);
        ellipse(22, -10, 5, 7);
        
        strokeWeight(1);
        //back left
        ellipse(-17, -32, 3, 5);
        ellipse(-14, -38, 3, 5);
        ellipse(-11, -44, 3, 5);
        //back right
        ellipse(17, -32, 3, 5);
        ellipse(14, -38, 3, 5);
        ellipse(11, -44, 3, 5);
        
        //left wing front
        ellipse(-20, 22, 4, 6);
        ellipse(-16, 34, 4, 6);
        //right wing front
        ellipse(20, 22, 4, 6);
        ellipse(16, 34, 4, 6);
    } else if (this.type === 2) { //Draw basic ship
    
    } else if (this.type === 3) { //Draw basic ship
    
    }
    popMatrix();
};


alienObj.prototype.display = function(){
  this.draw();
};


/************************************************/
/*                Play State = 1                */
/************************************************/


var play_state = function(){
  this.bg = new gameBackgroundObj();
  this.player = new spaceshipObj(200, 350, 1);
  this.projectiles = [];
  this.enemies = [];

  for(var i = 0; i<5; i++){
    this.enemies.push(new alienObj(67 + i*67, 50, 1));
  }
};

play_state.prototype.checkCollision = function(obj, x, y){
  if(x < obj.pos.x + (obj.width / 2) && x > obj.pos.x - (obj.width / 2) &&
     y < obj.pos.y + (obj.height / 2) && y > obj.pos.y - (obj.height / 2)){
       return true;
     }
  return false;
};

play_state.prototype.update = function(me){
  // Move the background and player
  this.bg.update();
  this.player.update();

  // Figure out if player is firing, and fire when they're weapon is reloaded
  if(keysDown[spaceKey] && this.player.reloadTimer === 0){
    this.projectiles.push(new projectileObj(this.player.pos.x, this.player.pos.y, "friendly"));
    this.player.reloadTimer = 15;
  }

  // Update each projectile and remove it from the game if it's off the map
  for(var i = 0; i < this.projectiles.length; i++){
    this.projectiles[i].update();
    if(this.projectiles[i].pos.y < 0 || this.projectiles[i].pos.y > 400 ||
       this.projectiles[i].pos.x < 0 || this.projectiles[i].pos.x > 400){
      this.projectiles.splice(i, 1);
      continue;
    }
    if(this.projectiles[i].type === "enemy"){
      if(this.checkCollision(this.player, this.projectiles[i].pos.x, this.projectiles[i].pos.y)){
        this.player.health--;
        this.projectiles.splice(i, 1);
      }
    }
  }

  // Check for collisions between enemies and projectiles
  for(var i = 0; i < this.enemies.length; i++){
    this.enemies[i].update();

    // If an enemy is reloaded, they should fire their weapon
    if(this.enemies[i].reloadTimer === 0){
      this.projectiles.push(new projectileObj(this.enemies[i].pos.x, this.enemies[i].pos.y, "enemy", this.player.pos));
      this.enemies[i].reloadTimer = floor(random(90, 150));
    }

    for(var j = 0; j < this.projectiles.length; j++){
      if(this.projectiles[j].type === "friendly"){
        if(this.checkCollision(this.enemies[i], this.projectiles[j].pos.x, this.projectiles[j].pos.y)){
          // There was a collision; decrease this enemy's health and remove the projectile from the game
          this.enemies[i].health--;
          this.projectiles.splice(j, 1);
        }
      }
    }

    // If enemy is dead, remove him from game
    if(this.enemies[i].health <= 0){
      this.enemies.splice(i, 1);
    }
  }

  this.checkState(me);
};

play_state.prototype.checkState = function(me){
  if(this.enemies.length === 0){
    // Player has won
    me.winLoss = "won!";
    me.currState = 4;
  }
  if(this.player.health === 0){
    // Player has lost
    me.winLoss = "lost!";
    me.currState = 4;
  }
};

play_state.prototype.display = function(me){
  this.bg.display();
  this.player.display();
  for(var i = 0; i < this.projectiles.length; i++){
    this.projectiles[i].display();
  }
  for(var i = 0; i < this.enemies.length; i++){
    this.enemies[i].display();
  }
};


/************************************************/
/*           Instructions State = 2             */
/************************************************/


var instr_state = function(){
  this.bg = new menuBackgroundObj();
  this.menu = new navMenuObj();
};

instr_state.prototype.update = function(me){};

instr_state.prototype.checkState = function(me){
  me.currState = this.menu.mouseIsOn(2);
};

instr_state.prototype.display = function(me){
  this.bg.display();
  this.menu.display();

  textSize(20);
  fill(255, 255, 255);
  text("You are a SPACE WARRIOR. You command a fighter ship and your goal is " +
        "to make it through several rounds of alien fighters, and defeat the " +
        "the final boss. You control your ship with [MOVEMENT_KEYS] and fire " +
        "your lasers with [FIRE_BUTTON].", 25, 25, 350, 300);
};


/************************************************/
/*         Difficulty Menu State = 3            */
/************************************************/


var diff_state = function(){
  this.bg = new menuBackgroundObj();
  this.navMenu = new navMenuObj();
  this.diffMenu = new diffMenuObj();
};

diff_state.prototype.update = function(me){};

diff_state.prototype.checkState = function(me){
  me.difficulty = this.diffMenu.mouseIsOn(me.difficulty);
  me.currState = this.navMenu.mouseIsOn(3);
};

diff_state.prototype.display = function(me){
  this.bg.display();
  this.navMenu.display();
  this.diffMenu.display(me.difficulty);
};


/************************************************/
/*             Quit State = 4                   */
/************************************************/


var quit_state = function(){};

quit_state.prototype.update = function(me){};

quit_state.prototype.checkState = function(me){};

quit_state.prototype.display = function(me){
  fill(255, 255, 255);
  noStroke();
  rect(0, 0, 400, 400);

  textSize(45);
  fill(0, 0, 0);
  text("You've " + me.winLoss, 50, 200);
};


/************************************************/
/*             Game Shell Object                */
/************************************************/


var gameShellObj = function(){
  this.state = [new mainMenu_state(), new play_state(), new instr_state(),
                new diff_state(), new quit_state()];
  this.currState = 0;

  this.difficulty = "medium";

  this.winLoss = "quit.";

  for(var i = 0; i < keysDown.length; i++){
    keysDown[i] = false;
  }
};
gameShellObj.prototype.update = function(){
  this.state[this.currState].update(this);
};
gameShellObj.prototype.display = function(){
  this.state[this.currState].display(this);
};


/************************************************/
/*    Game declaration and event handler(s)     */
/************************************************/


var shell = new gameShellObj();

var draw = function() {
  shell.update();
  shell.display();
};

var mouseClicked = function() {
  shell.state[shell.currState].checkState(shell);
};

var keyPressed = function() {
  keysDown[keyCode] = true;
};

var keyReleased = function() {
  keysDown[keyCode] = false;
};


}}; // end of script
