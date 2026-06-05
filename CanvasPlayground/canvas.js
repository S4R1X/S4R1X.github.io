var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = window.getComputedStyle(document.body).getPropertyValue('--cl-secondary');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");

const keys = {
    left: false,
    right: false
};

addEventListener("keydown", e => {
    if (e.code === "KeyA") keys.left = true;
    if (e.code === "KeyD") keys.right = true;
    if (e.code == 'Space') {
        if (player.y + player.h >= canvas.height - 10) {
            player.dy = 170
        }
    }
});

addEventListener("keyup", e => {
    if (e.code === "KeyA") keys.left = false;
    if (e.code === "KeyD") keys.right = false;
});


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
        if (keys.left && !keys.right) {
            this.dx = -10;
        }
        else if (keys.right && !keys.left) {
            this.dx = 10;
        }
        if (this.y + this.h > canvas.height) {
            this.dy = -this.dy * 0.15
            this.y = canvas.height - this.h
        }else{
            this.dy++
        }
        if(!keys.left && !keys.right){
            if (this.dx > 0) {
                this.dx -= 0.2
                if (this.y + this.h >= canvas.height){
                    this.dx =0
                }
            }
            if (this.dx < 0) {
                this.dx += 0.2
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