function Population(bugNumber, enemyCount){
  
  this.popSize = bugNumber;
  
  this.bugs = [];
  enemys = [];
  
  for(var i = 0; i<this.popSize; i++){
    this.bugs[i] = new Bug();
  }
  for(var i =0; i<enemyCount; i++){
    enemys[i] = new Predator();
  }
  
  this.run = function(){
    for(var i =0; i<this.bugs.length; i++){
      
      this.bugs[i].update();
      this.bugs[i].show();
      
      for(var j = 0; j<enemys.length; j++){
        if(this.collide(this.bugs[i],enemys[j])){
          this.bugs.splice(i,1);
          this.reproduce();
        }
      }
    }
    for(var i =0; i<enemys.length; i++){
      enemys[i].update();
      enemys[i].show();
    }
  }
  
  this.reproduce = function(){
    if(Math.random() < mutationChance){
      console.log("mutate");
      this.mutate();
    }
    else {
      var parentA = random(this.bugs);
      var parentB = random(this.bugs);
      newSpeed = (parentA.speed + parentB.speed)/2;
      this.bugs.push(new Bug(newSpeed));
    }
  }
  
  this.mutate = function(){
    this.bugs.push(new Bug(Math.random()));
  }
  
  this.collide = function(bug,enemy){
    var far = dist(bug.pos.x,bug.pos.y,enemy.pos.x,enemy.pos.y);
    
    return far < enemyradius + 5;
  }
  
  this.getAverageSpeed = function(){
    var totalSpeed = 0;
    for(var i = 0; i<this.bugs.length; i++){
      totalSpeed += this.bugs[i].speed;
    }
    return totalSpeed/this.bugs.length;
  }
  
  this.updateSpeed = function(){
    for(var i = 0; i<this.bugs.length; i++){
      this.bugs[i].resetSpeed();
    }
    for(var i = 0; i < enemys.length; i++){
      enemys[i].resetSpeed();
    }
  }
}