let myCar;
let yourCar;
let cars=[];

let noCars=15;
function setup() {
  createCanvas(innerWidth, innerHeight);
  //myCar = new Car(120,200,60,10);
 // yourCar = new Car(260,300,230,10);
for (let i=0; i<noCars;i+=1) {
   let tempCar= new Car(random(0,width), random(0,height), 50,3)
   cars.push(tempCar);
}
}

function draw() {
  background(200);
  for(let i=0;i<cars.length;i++) {
   cars[i].move();
   cars[i].show();
  }
 // myCar.move();
 // myCar.show();
  //yourCar.move();
  //yourCar.show();
 
}
