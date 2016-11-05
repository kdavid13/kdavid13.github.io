var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400);
frameRate(60);

////////////////////////////////////////
// Name: Andrew Repp and David Kusterer
// Date: 11 - 4 - 2016
// Assn: Milestone 1 for Final Project
// Description:
////////////////////////////////////////

/************************************************/
/*             Background Object                */
/************************************************/


var backgroundObj = function(){
  this.stars = [];
  this.square = 23;
  for(var i = 0; i < this.square; i++){
    for(var j = 0; j < this.square; j++){
      // Place stars every 20 (give or take 5) pixels
      this.stars.push(new PVector(i * 20 + random(-5, 5), j * 20 + random(-5, 5)));
    }
  }
};

backgroundObj.prototype.display = function(){
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
  this.bg = new backgroundObj();
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
/*                Play State = 1                */
/************************************************/


var play_state = function(){
  this.bg = new backgroundObj();
  // TODO: Declare other new game variables / etc.
};

play_state.prototype.update = function(me){
  // TODO: Move things around / check collisions / etc.
};

play_state.prototype.checkState = function(me){
  // TODO: Check win/loss
};

play_state.prototype.display = function(me){
  this.bg.display();
  // TODO: Draw new game

  // PLACEHOLDER:
  textSize(15);
  text("New game to be displayed here.", 100, 200);
};


/************************************************/
/*           Instructions State = 2             */
/************************************************/


var instr_state = function(){
  this.bg = new backgroundObj();
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
  this.bg = new backgroundObj();
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
};


/************************************************/
/*             Game Shell Object                */
/************************************************/


var gameShellObj = function(){
  this.state = [new mainMenu_state(), new play_state(), new instr_state(),
                new diff_state(), new quit_state()];
  this.currState = 0;

  this.difficulty = "medium";
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


}}; // end of script
