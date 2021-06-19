var score=0
var distance=0;
var gameState="loading"
var roof;
var villan2;
var token=1;

function preload(){

ninjaImg=loadAnimation("images/ninja1.png","images/ninja2.png","images/ninja3.png")
ninjaAttack=loadAnimation("images/ninjaattack.png")
bgImg=loadImage("images/forest.png")
villan1=loadImage("images/villan1.png")
villan2=loadAnimation("images/villan2.png")
ninjadie=loadImage("images/ninjadead.png")
//turtledie=loadAnimation("images/turtledie.png")
coin=loadImage("images/coins.png")
killer=loadAnimation("images/killer.png")
gif_loadImg = loadImage("loader-gif-blue-2.gif");
  gif_createImg = createImg("loader-gif-blue-2.gif");
  introimage=loadImage("images/loadingbg1.jpg")
  buttonimg=loadImage("images/playbutton.png")
  templeimg=loadImage("images/templedup.jpg")
  restartbutton=loadImage("tryagain_button.png")
  completedlevel=loadImage("images/completedlevel1image.png")
  overimage=loadImage("images/overimage.jpg")
  //bgsound=loadSound("background sound.mpeg")
}


function setup() {
  createCanvas(displayWidth,displayHeight);
  console.log(displayWidth)
  console.log(displayHeight)
  

//intro=createSprite(displayWidth/2,displayHeight/2)


forest=createSprite(displayWidth/2,displayHeight/2)
forest.addImage("load",introimage)
forest.addImage("jungle",bgImg)
forest.addImage("mandir",templeimg)

    
playbutton=createSprite(displayWidth/2,displayHeight/2)

ninja= createSprite(150, displayHeight-180, 50, 50);
ninja.addAnimation("ninja1",ninjaImg);
ninja.addImage("ndie",ninjadie)
ninja.addAnimation("ninjaatt",ninjaAttack);
ninja.addAnimation("kill",killer)
ninja.setCollider("rectangle",0,0,100,150)
ninja.debug=false

inviground=createSprite(displayWidth/2,displayHeight-130,4*displayWidth,5)
inviground.visible=false

 
roofgroup=createGroup();
for(i=ninja.x+410;i<10000;i=i+800){
  roof=createSprite(i,displayHeight/2,460,10)
  roof.visible=false
  roofgroup.add(roof)
  console.log(roof.x)
  i=i+50;
}

restart=createSprite(displayWidth/2,displayHeight/2,250,150)

icon=createSprite(displayWidth/2,displayHeight/2)
icon.visible=false

oversprite=createSprite(displayWidth/2,displayHeight/2)
oversprite.visible=false

turtlegroup=createGroup()
coingroup=createGroup()
villan2group=createGroup()

}

function draw() {
  background("white");
//bgsound.play()
 console.log("x :",ninja.x)
 console.log("y :",ninja.y)

if(gameState==="loading"){
  restart.visible=false
  forest.addImage("load",introimage)
  forest.scale=2.5
  image(gif_loadImg, 25, 20);
  gif_createImg.position(550,550)
  playbutton.addImage("btt",buttonimg)
  playbutton.scale=1
  ninja.visible=false
  if(touches.length>0||mousePressedOver(playbutton)){
    gif_createImg.hide()
    playbutton.visible=false
    gameState="play"
    touches=[]
  }

}
  if(gameState==="play"){
    distance=distance+1
    console.log(distance)
    ninja.visible=true
   restart.visible=false
   forest.changeImage("jungle",bgImg)

   
   forest.scale=1.3
   forest.velocityX=-(9+5*distance/300)
    if(forest.x<200){
      forest.x=displayWidth/2
    }
      if(touches.length>0||keyDown("space")){
          
        ninja.velocityY=-20  
        ninja.changeAnimation("ninjaatt",ninjaAttack);   
     
      }
 
     turtle();
     
      if(ninja.y<560){
          var token=0;
          
          
      }
      if(ninja.isTouching(inviground)&&ninja.y>=560) {
          var token=1;
         
      }
      
     // console.log(ninja.y)
      ninja.velocityY=ninja.velocityY+1;

      for(j=0;j<turtlegroup.length;j++){
       if(token===0&&ninja.isTouching(turtlegroup[j])){

            turtlegroup[j].destroy();
            
        }
     else if(turtlegroup[j].isTouching(ninja)&&token===1&&ninja.isTouching(inviground))
        {
        gameState="end"
}
        
}

if(ninja.isTouching(inviground)){


  ninja.changeAnimation("ninja1",ninjaImg)
}


createcoins() 
for(x=0;x<coingroup.length;x++){
 if(coingroup[x].isTouching(ninja)){

coingroup[x].destroy()
score=score+1
 }
}
 
console.log(distance)
if(distance>=3300){
  
  forest.velocityX=0;
  icon.visible=true
  icon.addImage("l1com",completedlevel)
  ninja.changeAnimation("kill",killer)
  turtlegroup.destroyEach();
  coingroup.destroyEach()
  if(mousePressedOver(icon)||touches.length>0){
gameState="level2"
touches=[]
  }
  
}
  }

  if(gameState==="level2"){
    distance=0;
    distance=distance+1
    
 icon.visible=false; 
forest.changeImage("mandir",templeimg)
forest.scale=1.6
forest.velocityX=0

camera.position.x=ninja.x+500
camera.position.y=displayHeight/2

ninja.changeAnimation("ninja1",ninjaImg);
ninja.scale=0.7
ninja.velocityX=5


if(touches.length>0||keyDown("space")){
  ninja.velocityX=8 
    ninja.velocityY=-20  
    ninja.changeAnimation("ninjaatt",ninjaAttack);   
 
  }
  blackvillan() 
 if(ninja.y>580){
    gameState="gameover"
  }
  if(ninja.y<309){
      var token=0;  
  }
  if(ninja.isTouching(roofgroup)&&ninja.y>=309) {
      var token=1;
     
  }
  
  console.log(ninja.y)
  ninja.velocityY=ninja.velocityY+1;

  for(x=0;x<villan2group.length;x++){
   if(token===0&&ninja.isTouching(villan2group[x])){

    villan2group[x].destroy();
        
    }
 else if(villan2group[x].isTouching(ninja)&&token===1&&ninja.isTouching(roofgroup))
    {
    gameState="gameover"
}
  }
ninja.collide(roofgroup)
inviground.x=50
inviground.width=displayWidth/2+100;
ninja.setCollider("rectangle",0,0,50,200)

if(ninja.isTouching(roofgroup)){

  ninja.changeAnimation("ninja1",ninjaImg)
}

createcoins() 
for(x=0;x<coingroup.length;x++){
  if(coingroup[x].isTouching(ninja)){
 
 coingroup[x].destroy()
 score=score+1
  }
  

 }
  }
 
if(gameState==="end"){
  ninja.changeImage("ndie",ninjadie)
forest.velocityX=0
ninja.velocityY=ninja.velocityY+2
ninja.collide(inviground)
coingroup.destroyEach()
restart.addImage("reset",restartbutton)
restart.visible=true
if(touches.length>0||mousePressedOver(restart)){
  gameState="play"
  turtlegroup.destroyEach();
  score=0;
  distance=0;
}
}

ninja.collide(inviground)

drawSprites();
textSize(50)
fill("gold")
text("COINS "+score,ninja.x+800,displayHeight/2-200)
if(gameState==="gameover"){
  restart.visible=false;
ninja.changeImage("ndie",ninjadie)
forest.velocityX=0
ninja.velocityY=ninja.velocityY+2
ninja.collide(inviground)
coingroup.destroyEach()
villan2group.destroyEach()
  oversprite.addImage("gmeover",overimage)
  oversprite.x=ninja.x+300;
  oversprite.visible=true;
  ninja.velocityX=0
}

}


function blackvillan(){
  //var i=Math.round(random(10,200))
  if(frameCount%100===0){
    fighter=createSprite(ninja.x+800,displayHeight-450)
    fighter.addAnimation("blackturtle",villan2)
    fighter.velocityX=-(5+8*distance/200)
    fighter.scale=0.43
    fighter.debug=false
    villan2group.add(fighter)
    
      }

}
  

function createcoins(){
if(frameCount%60===0){
coins=createSprite(ninja.x+900,random(ninja.y-5,ninja.y-10))
coins.addImage("rupee",coin)
coins.velocityX=-6
coins.scale=0.1
coingroup.add(coins)

for(i=0;i<coingroup.length;i++){
coingroup[i].depth=ninja.depth
ninja.depth=ninja.depth+1
//coingroup[i].lifetime=500
}
}

}
function turtle(){
  var i=Math.round(random(10,500))

  if(frameCount%i===0){
villan=createSprite(random(displayWidth-10,displayWidth-100),displayHeight-250)
villan.addImage("turtle",villan1)
villan.velocityX=-(8+5*distance/300)
villan.scale=1.3
villan.debug=false
turtlegroup.add(villan)

  }
}
