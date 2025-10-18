class Flower {
constructor(x,y,xSpeed,ySpeed) {
    this.x=x;
    this.y=y;
    this.xSpeed= xSpeed;
    this.ySpeed= ySpeed;
    this.selected=false;
}

drawFlower() {
//    for (let i = 0; i < n; i++) {
//       rotate(360 / n);
//       fill(this.x, this.y, 10, 100);
//       ellipse(this.x + 100, 0, this.y+100, 40);
fill("yellow");
ellipse(this.x, this.y, 40,80);
ellipse(this.x, this.y, 80,40);
fill("red");
ellipse(this.x, this.y, 40);
}
moveFlower() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.y>height || this.y<0) {
            this.ySpeed= -this.ySpeed;
    }
    if(this.x>width || this.y<0) {
            this.xSpeed= -this.xSpeed;
    }
}

checkMousePosition(mX, mY) {
    let distance= dist(mX, mY, this.x, this.y);
    if(dist < this.size/2){
        this.selected=true ;
    } else {
        this.selected =false;
    }
    }
}

