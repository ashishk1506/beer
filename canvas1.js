const canvas = document.querySelector('canvas');

const c = canvas.getContext("2d");

const box = 10;
const size = 38;

//snake
let snake = [];
snake[0]=
{
     x : (size/2)*box ,
     y : (size/2)*box
}

//food
let food = {
    x : Math.floor(( Math.random()*size) + 1)*box,
    y : Math.floor(( Math.random()*size) + 1)*box
}

//score
let score = 0;

//audiofiles
 const move0= new Audio();
 const eat = new Audio();
 const dead = new Audio();
 const move1 = new Audio(); 
 const move2 = new Audio(); 
 const move3 = new Audio(); 

 move0.src = "audio/move.mp3";
 eat.src = "audio/eat.mp3";
 dead.src = "audio/dead.mp3";
 move1.src = "audio/move.mp3";
 move2.src = "audio/move.mp3";
 move3.src = "audio/move.mp3";

//start game
let d;
document.getElementById("start_game").addEventListener("click", start);
function start()
{   
    d = "up";
    setInterval(draw,200);
}

//reset game
document.getElementById("reset_game").addEventListener("click",reset);
function reset()
{
    window.location.reload();
}

//direction
document.addEventListener("keydown", direction );
function direction(event)
{
  if(event.keyCode == 37 && d!="right")
   {  move0.play(); d="left"; }
   if(event.keyCode == 38 && d!="down")
   {  move1.play(); d="up"; }
   if(event.keyCode == 39 && d!="left")
   {  move2.play(); d="right"; }
   if(event.keyCode == 40 && d!="up")
   {  move3.play(); d="down"; }
}

//autonomous
var l=0;
document.getElementById("auto_mode").addEventListener("click", automode);
function automode()
{ 
  l=1;
  setInterval(draw,600);
}
 

function draw()
{   
    //background
    c.fillStyle = "lightgreen";
    c.fillRect(box, box, size*box, size*box);

    //snake array
    for(let i=0; i < snake.length; i++)
    {   
       
        c.fillStyle="green";
        c.fillRect( snake[i].x, snake[i].y, box, box);
       
    }

    //draw food
    
    c.fillStyle =  "red";
    c.fillRect(food.x, food.y, box, box);
    
    //movment of snake head
    var snakex = snake[0].x;
    var snakey = snake[0].y;

     //automode movment
 if(l==1)
 {
     if( snake[0].x  != food.x )
   { 
     if(food.x - snake[0].x > 0 && d != "left")
     d = "right";
     else if ( food.x - snake[0].x < 0 && d != "right")
     d = "left";
     else
     {
         if(snake[0].x  <= box)
          {
              d = "down";
              if( snakey >= box*38)
              d = "up";
          }
          else if(snake[0].x >= box*38)
          {
              d = "down";
              if( snake[0].y >= box*38)
              d = "up"; 
          }
         else
         d = "down";
     }
   
   }
   else if( snake[0].y  != food.y )
   { 
     if(food.y - snake[0].y > 0 && d != "up")
     d = "down";
     else if ( food.y - snake[0].y < 0 && d != "down")
     d = "up";
     else
     {
         if(snake[0].y <= box)
          {
              d = "right";
              if( snakex >= box*38)
              d = "left";
          }
          else if(snake[0].y >= box*38)
          {
              d = "right";
              if( snake[0].x >= box*38)
              d = "left"; 
          }
         else
         d = "right"; 
     }
   }
 }
 
    
    if(d=="left")
    {
        snakex -= box;
    }
    if(d=="up")
    {
        snakey -= box;

    }
    if(d=="right")
    {
        snakex += box;
    }
    if(d=="down")
    {
        snakey += box;
    }
    
     
   //if snake eats the food
   if(snakex == food.x && snakey == food.y)
   {
    food = {
        x : Math.floor(( Math.random()*size) + 1 )*box,
        y : Math.floor(( Math.random()*size) + 1 )*box
    }
    score = score + 5;
    eat.play();
   }
   else //deletion
   snake.pop();

   //extension
   let newhead = {
    x : snakex,
    y : snakey
   }
snake.unshift(newhead);  
   
//condition
if (snakex < box || snakey < box || snakex > (box*size) || snakey > (box*size))
{
    dead.play();
    clearInterval(game);
    
}
for(let i=1; i < snake.length; i++)
{
    if(snakex == snake[i].x && snakey == snake[i].y)
    {
    dead.play();
    clearInterval(game);
    }
}

//scoredisplay
document.getElementById("score").innerHTML = score;


}
let game = setInterval(draw,200);

//increase the speed
document.getElementById("speed_1").addEventListener("click", speed1)
function speed1()
{   
    clearInterval(game);
    game = setInterval(draw , 50);
    
}
document.getElementById("speed_2").addEventListener("click", speed2)
function speed2()
{
    clearInterval(game);
    game = setInterval(draw , 100);
  
}
document.getElementById("speed_3").addEventListener("click", speed3)
function speed3()
{   
    clearInterval(game);
    game = setInterval(draw , 200);
    
}
document.getElementById("speed_4").addEventListener("click", speed4)
function speed4()
{
    clearInterval(game);
    game = setInterval(draw , 300);
   
}
document.getElementById("speed_5").addEventListener("click", speed5)
function speed5()
{
    clearInterval(game);
    game = setInterval(draw , 500);
    
}
