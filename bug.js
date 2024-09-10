function Bug(speed){
  if(speed){
    this.speed = speed;
  }
  else{
    this.speed = Math.random()*((maxSpeed-minSpeed)/100)+minSpeed/100; 
  }

  this.pos = createVector(Math.random()*width,Math.random()*(height-header-footer)+header);
  this.dir = p5.Vector.random2D();
  this.dir.setMag((this.speed)*maxForce);
  this.color = [255*this.speed,0,255-this.speed*255,150];
  
  //Checks For Border Detection
  this.update = function(){
    if(this.pos.x < 0 || this.pos.x > width){
      this.dir.x *= -1;
      this.pos.add(this.dir);
      return;
    }
    else if(this.pos.y < header || this.pos.y > height-footer){
      this.dir.y *= -1;
      this.pos.add(this.dir);
      return;
    }
    
    //Checks for enemy nearby
    if(flee){
      for(var j = 0; j < enemys.length; j++){
        if(dist(this.pos.x,this.pos.y,enemys[j].pos.x,enemys[j].pos.y)<awareness+enemyradius){

          var distVec = p5.Vector.sub(enemys[j].pos,this.pos);
          distVec.rotate(-this.dir.heading());

          angleBetween = distVec.heading();
          if(angleBetween < 0){
             this.dir.rotate(wiggle);
          }
          else{
            this.dir.rotate(-wiggle);
          }
          this.pos.add(this.dir);
          return;
        }
      }
    }
    
    //Random Movement
    if(doWiggle){
      this.dir.rotate(Math.random()*wiggle-wiggle/2);
    }
    this.pos.add(this.dir);
    return;
  }
  
  this.show = function(){
    push();
    noStroke();
    if(showColors){
      fill(this.color);
    }
    else{
      fill(0,150);
    }
    translate(this.pos.x, this.pos.y);
    rotate(this.dir.heading());
    rectMode(CENTER);
    rect(0,0,25,10);
    pop();
  }
  
  this.resetSpeed = function(){
    this.dir.setMag((this.speed)*maxForce);
  }
    
}