function Predator(speed){
  if(speed){
    this.speed = speed;
  }
  else{
    this.speed = 1; 
  }

  this.pos = createVector(Math.random()*width,Math.random()*(height-header-footer)+header);
  this.dir = p5.Vector.random2D();
  this.dir.setMag(this.speed*maxForce);
  
  this.update = function(){
    if(userControlled){
      this.dir = createVector(0,0);
      if(keyIsDown(UP_ARROW)){
         this.dir.add(0,-1);
      }
      if(keyIsDown(DOWN_ARROW)){
        this.dir.add(0,1);
      }
      if(keyIsDown(LEFT_ARROW)){
        this.dir.add(-1,0);
      }
      if(keyIsDown(RIGHT_ARROW)){
        this.dir.add(1,0);
      }
      this.dir.setMag(this.speed*maxForce);
    }
    
    else{
      if(this.dir.mag()==0){
        this.dir = p5.Vector.random2D();
        this.dir.setMag(this.speed*maxForce);
      }
      if(this.pos.x < 0 || this.pos.x > width){
        this.dir.x *= -1;
      }
      else if(this.pos.y < header || this.pos.y > height-footer){
        this.dir.y *= -1;
      }
      else{
        this.dir.rotate(Math.random()*wiggle-wiggle/2);
      }
    }    
    this.pos.add(this.dir);
  }
  
  this.show = function(){
    push();
    noStroke();
    fill(0);
    translate(this.pos.x, this.pos.y);
    rotate(this.dir.heading()+PI/2);
    imageMode(CENTER);
    image(enemyImg,0,0,enemyradius*2,enemyradius*2);
    /*ellipseMode(CENTER);
    ellipse(0,0,enemyradius,enemyradius);*/
    pop();
  }
  
  this.resetSpeed = function(){
    this.dir.setMag((this.speed)*maxForce);
  }
}