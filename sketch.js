//Variables. There is a lot!!!
var header = 100;
var footer = 100;

var startButton;
var popSlider;
var enemySlider;
var minSlider;
var maxSlider;
var enemySizeSlider;
var timeSpeedSlider;
var controlCheck;
var fleeCheck;
var colorCheck;
var wiggleCheck;

var saveState = 0;

var populationSize = 200;
var population;
var maxForce = 5;
var minSpeed;
var maxSpeed;
var frames = 0;
var enemyradius = 20;
var mutationChance = 0.05;
var wiggle;
var awareness = 100;
var enemys = [];
var enemyCount = 1;
var userControlled = false;
var flee = true;
var showColors = true;
var doWiggle = true;
var backColor = "#000000";

var bugImg;
var enemyImg;

var gui;

//runs before start of program to make sure images  and fonts are preloaded
function preload(){
  bugImg = loadImage('bug.png');
  enemyImg = loadImage('spider.png');
}

//Runs once at start of program
function setup() {
  wiggle = PI/8;
  
  createCanvas(600, 600+header+footer);
  population = new Population(0, 1);
  
  framesP = createP();
  bugsP = createP();
  avgSpeedP = createP();
  saveStateP = createP();
  
  startButton = createButton('Create New Population');
  startButton.position(0, 0);
  startButton.size(width/2,header);
  startButton.mousePressed(start);
  
  popSlider = createSlider(50,1000,200,10);
  popSlider.position(width/2,header/4);
  
  enemySlider = createSlider(0,3,1,1);
  enemySlider.position(width/2,header/4*3);
  
  minSlider = createSlider(0,100,0,5);
  minSlider.position(width/4*3,header/4);
  
  maxSlider = createSlider(0,100,100,5);
  maxSlider.position(width/4*3,header/4*3);
  
  enemySizeSlider = createSlider(5,100,20,5);
  enemySizeSlider.position(width/4*3,height-footer/4*3);
  
  timeSpeedSlider = createSlider(1,10,5,1);
  timeSpeedSlider.position(width/4*3,height-footer/4*1);
  
  controlCheck = createCheckbox('User Controlled Spider?',false);
  controlCheck.position(0,height-footer/4*3);
  controlCheck.changed(changeController);
  
  fleeCheck = createCheckbox('Flee?',true);
  fleeCheck.position(0,height-footer/4*2);
  fleeCheck.changed(changeFlee);
  
  fleeCheck = createCheckbox('Show Colors?',true);
  fleeCheck.position(0,height-footer/4*1);
  fleeCheck.changed(changeColors);
  
  wiggleCheck = createCheckbox('Bugs Wiggle?',true);
  wiggleCheck.position(0,height-footer);
  wiggleCheck.changed(changeWiggle);
}

//Loops every frame
function draw() {
  //Erases previous frame
  background(255);
  
  //Updates html statistics
  frames ++;
  framesP.html("Time: " + (Math.round(frames/60)) + " secs");
  bugsP.html("Population Size: " + population.bugs.length);
  avgSpeedP.html("Average Speed: " + (population.getAverageSpeed()*100) + "%");
  saveStateP.html('Save');
  
  //Runs population
  population.run();
  
  //Creates Header and Footer Border
  fill(255,200,200);
  rect(0,0,width,header);
  rect(0,height-footer,width,footer);
  
  //Slider value updates
  populationSize = popSlider.value();
  enemyCount = enemySlider.value();
  minSpeed = minSlider.value();
  maxSpeed = maxSlider.value();
  if(maxSpeed<minSpeed){
    minSpeed=maxSpeed;
    minSlider.value(minSpeed);
  }
  enemyradius = enemySizeSlider.value();
  if(maxForce != timeSpeedSlider.value()){
    maxForce = timeSpeedSlider.value();
    population.updateSpeed();
  }
  
  //Draws text above sliders
  fill(0)
   .strokeWeight(0)
   .textSize(15);
  textAlign(LEFT, TOP);
  textFont('Georgia');
  text('No. of bugs: '+populationSize,width/2+10,10);
  text('No. of spiders: '+enemyCount,width/2+10,header/2+10);
  text('Min  Bug Speed: '+minSpeed+'%',width/4*3,10);
  text('Max  Bug Speed: '+maxSpeed+'%',width/4*3-10,header/2+10);
  text('Enemy Radius: '+enemyradius+'%',width/4*3-10,height-footer+10);
  text('Max  Bug Speed: '+maxForce+'%',width/4*3-10,height-footer/2+10);
}

//Function called by "Create New Population" button
function start(){
  population = new Population(populationSize, enemyCount);
  frames = 0;
}

function changeController(){
  if(userControlled){
    userControlled = false;
  }
  else{
    userControlled = true;
  }
}

function changeFlee(){
  flee = !flee;
}

function changeColors(){
  showColors = !showColors;
}

function changeWiggle(){
  doWiggle = !doWiggle;
}
//Normal distribution function.
//Was going to use this for speed, but random number generation 
//worked better
function normal() {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num
}
