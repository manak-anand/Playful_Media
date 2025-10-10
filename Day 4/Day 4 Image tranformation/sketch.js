let size=10;

function preload() {
g0= loadImage("4/1.png");
g1= loadImage("4/2.png");
g2= loadImage("4/3.png");
g3= loadImage("4/4.png");

}



function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  frameRate(5);
}

function draw() {
  
  for(i=0;i<width;i+=size) {
      for(let j=0;j<height;j+=size) {
        let choice= floor(random(0,4));
        if(choice==0) {
            image(g0,i,j);
        }
          else if (choice==1) {
            image(g1,i,j);
        }
          else if (choice==2) {
            image(g2,i,j);
        }
         else {
            image(g3,i,j);
        }
        
        


      }




  }
}
