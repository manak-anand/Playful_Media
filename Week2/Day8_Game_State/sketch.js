let noLayers=3;
let layerImages= [];
let layers= [];

let currentLayer= 0;

function preload() {
  for (let i=0; i<noLayers; i++) {
    let imgName= "images/" + i + ".jpeg";
    layerImages[i] = loadImage(imgName);
  }
  
  
}
  
  function setup() {
  createCanvas(innerWidth, innerWidth/2);
  imageMode(CENTER)

  for(let i=0;i<noLayers; i++) {
      let tempLayer= new layerImages(layerImages[i], width/2,height/2, i);
      layers[i] = tempLayer;
  }
}

function draw() {
  background(220);
  layers[currentLayer].showLayer();
}
