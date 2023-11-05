

// Adding mainloop function
var ctx = gameCanvas.getContext('2d');
var x = [600, 600, 600, 600, 600];
var y = [0, 100, 200, 300, 400]; 
var speed = [-1, -2, -0.5, -1.2, -1.8];
var rocketY = 200, changeY=0, score=0;

var gameTimer = setInterval(mainLoop, 20); 
var highScore = 0, loc=localStorage.getItem('highScore');
if(loc>0) highScore = loc;
function mainLoop(){
  moveMeteors();
  moveRocket();
}

function moveMeteors(){
  ctx.clearRect(0,0,640,480);
  for (var n = 0; n < 5; n++) {
    ctx.drawImage(meteor,x[n],y[n],80,80);
    x[n] += speed[n];
    checkForHits(n);
    if(x[n]<-80) {
      x[n] = 640; y[n] = math.random() * 400;
    }
    
  }
}

// function that moves the rocket up and down and add the score
function moveRocket(){
  ctx.drawImage(rocket,0,rocketY,80,80);
  rocketY += changeY;
  score += 1;
  ctx.fillStyle = "yellow";
  ctx.font = "30px Arial";
  ctx.fillText("Score: " +score,10,30);
  if((rocketY<0)|| (rocketY>400)){changeY = 0;}
  ctx.fillText("Score: " +score,10,30);
ctx.fillText("High Score: "+highScore,400,30);
}


// make rocket move up and down
document.onkeydown = keyPressed;
function keyPressed(e){
  var k=e.keyCode;
  if(k==38) {changeY=-3;}
  if(k==40) {changeY=3;}
}

function checkForHits(n) {
  if (Math.abs(x[n] < 50) && (Math.abs(rocketY-y[n])<50)){
    clearInterval(gameTimer);
    ctx.font="80px Arial";
    ctx.fillText("Game Over!", 100, 250);
    localStorage.setItem('highScore', score);
  }
  
}
