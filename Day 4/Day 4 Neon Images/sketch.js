let size=100;

function preload() {
g0= loadImage("4.2/1.jpg");
g1= loadImage("4.2/2.jpg");
g2= loadImage("4.2/3.jpg");
g3= loadImage("4.2/4.jpg");

}



function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  frameRate(3);
}

function draw() {
  
  for(i=0;i<width;i+=size) {
      for(let j=0;j<height;j+=size) {
        let choice= floor(random(0,4));
        if(choice==0) {
            image(g0,i,j,100,100);
        }
          else if (choice==1) {
            image(g1,i,j,100,100);
        }
          else if (choice==2) {
            image(g2,i,j,100,100);
        }
         else {
            image(g3,i,j,100,100);
        }
        
        


      }




  }
}
