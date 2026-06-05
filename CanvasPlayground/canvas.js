var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = window.getComputedStyle(document.body).getPropertyValue('--cl-secondary');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");


// window.addEventListener('mousemove', function (event) {
//     mouse.x = event.x
//     mouse.y = event.y
// })

let movekey = [false,false]
addEventListener("keydown", function (event) {
// Then display the event.key
  if (event.code == 'Space'){
    if (player.y + player.h >= canvas.height - 10    ){
        player.dy = 170
    }
  }
  if (event.code == 'KeyA'){
    if (player.y + player.h >= canvas.height - 10    ){
        player.dx = -10
    }else{
        player.dx = -8
    }
    movekey[0] = true
  }
    if (event.code == 'KeyD'){
        if (player.y + player.h >= canvas.height - 10    ){
        player.dx = 10
    }else{
        player.dx = 8
    }
    movekey[1] = true
  }
});

addEventListener('keyup', function (event) {
      if (event.code == 'KeyA'){
    movekey[0] = false
  }
    if (event.code == 'KeyD'){
    movekey[1] = false
  }
})

class Player {
    constructor(x, y,w,h, dx, dy) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dx = dx;
        this.dy = dy;
    }
    draw() {
        c.fillStyle = clPrimary;
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        if (this.y + this.h > canvas.height ) {
            this.dy = -this.dy *0.15
            this.y = canvas.height - this.h
        }else{
            this.dy++
        }
        if (!movekey[0] && !movekey[1]) {
            if (this.dx > 0) {
                this.dx -= 0.1
                if (this.y + this.h >= canvas.height){
                    this.dx =0
                }
            }
            if (this.dx < 0) {
                this.dx += 0.1
                if (this.y + this.h >= canvas.height){
                    this.dx =0
                }
            }
        }
        this.y += this.dy;
        this.x += this.dx
        this.draw();
    }
}

let player
let objects = [];
function init(){
    player = new Player(canvas.width/2, canvas.height/2, 50, 20, 0, 2)
    objects.push(player)
    for (i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    animate();
    return
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (i = 0; i < objects.length; i++) {
        objects[i].update();
    }
}
    
init()