var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = window.getComputedStyle(document.body).getPropertyValue('--cl-secondary');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");

const keys = {
    left: false,
    right: false,
};

grounded =false

addEventListener("keydown", e => {
    if (e.code === "KeyA") keys.left = true;
    if (e.code === "KeyD") keys.right = true;
    if (e.code == 'Space') {
        if (player.y + player.radius >= canvas.height - 10) {
            player.dy = 130
        }else if(!grounded){
            player.dy = -15
            grounded = !grounded
        }
    }
});

addEventListener("keyup", e => {
    if (e.code === "KeyA") keys.left = false;
    if (e.code === "KeyD") keys.right = false;
});

function getDistance (x1,y1,x2,y2){
    let xDistance = x2 - x1
    let yDistance = y2 - y1
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}
score = 0
class Pelet {
        constructor(x, y, radius, colour) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour
        this.playerDistance
        }
    draw (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour
        c.fill();
    }

    update(){
        this.playerDistance = getDistance(this.x,this.y,player.x,player.y) - this.radius - player.radius
        if(this.playerDistance <= 0){
            this.x = Math.random() * (canvas.width - 100) +25
            this.y = canvas.height - ((Math.random() * canvas.height)/2 + 15)
            score++
        }
        this.draw()
    }
}

class Player {
    constructor(x, y,radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = clPrimary
        c.fill();
    }
    update() {
        if (keys.left && !keys.right && this.dx > -10) {
            this.dx -= 1;
            if (this.dx > 0){
                this.dx -= 1
            }
        }
        else if (keys.right && !keys.left && this.dx < 10) {
            this.dx += 1;
            if (this.dx < 0){
                this.dx += 1
            }
        }

        if (this.y + this.radius > canvas.height) {
            grounded = false
            this.dy = -this.dy * 0.15
            this.y = canvas.height - this.radius
        }else{
            this.dy++
        }

        if(!keys.left && !keys.right){
            if (this.dx > 0) {
                this.dx -= 0.2
                if (this.y + this.radius >= canvas.height){
                    this.dx =0
                }
            }
            if (this.dx < 0) {
                this.dx += 0.2
                if (this.y + this.radius >= canvas.height){
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
    player = new Player(canvas.width/2, canvas.height/2, 20, 0, 2)
    pelet = new Pelet(Math.random() * (canvas.width - 100) +25,canvas.height - ((Math.random() * canvas.height)/2 + 15), 10, clSecondary)
    objects.push(player)
    objects.push(pelet)
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
        c.font = "30px Arial";
        c.fillText(score, 10, 50);
    }
}
    
init()