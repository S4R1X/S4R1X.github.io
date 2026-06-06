var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = window.getComputedStyle(document.body).getPropertyValue('--cl-secondary');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");

const keys = {
    left: false,
    right: false,
    space:false
};

function genNewDot(){
        let safe = false;
            let tempx, tempy;

            while (!safe) {

                tempx = Math.random() * (canvas.width - 100) + 25;
                tempy = canvas.height - ((Math.random() * canvas.height) / 2 + 15);

                safe = true;

                for (let i = 0; i < course.length; i++) {

                    const left = tempx - pelet.radius;
                    const right = tempx + pelet.radius;
                    const top = tempy - pelet.radius;
                    const bottom = tempy + pelet.radius;

                    const plat = course[i];

                    const overlap =
                        right > plat.x &&
                        left < plat.x + plat.w &&
                        bottom > plat.y &&
                        top < plat.y + plat.h;

                    if (overlap) {
                        safe = false;
                        break;
                    }
                }
            }
            return [tempx,tempy]

}

grounded =false

addEventListener("keydown", e => {
    if (e.code === "KeyA") keys.left = true;
    if (e.code === "KeyD") keys.right = true;

});

addEventListener("keypress", e =>{    if (e.code == 'Space') keys.space = true
    if (e.code == 'Space') keys.space = true
})

function playerOnPlatform(playx,playy,playr, platx,platy,platw,plath){
    pl = [playx,playy,playr]
    platform = [ platx,platy,platw,plath]
    if(pl[0] < platform[0]+platform[2]&& pl[1]+pl[2] > platform[1]-1 && pl[0] > platform[0]+1&& pl[1]< platform[1]){
        return true
    }
     return false
}

function playerHitWall(playx,playy,playr, platx,platy,platw,plath){
    pl = [playx,playy,playr]
    platform = [ platx,platy,platw,plath]
    if(pl[0] < platform[0]+platform[2]+pl[2] && pl[1]+pl[2] > platform[1]+3 && pl[0] - pl[2] > platform[0] && pl[1]+pl[2] < platform[1]+platform[3]){
        player.x = platform[0]+platform[2]+pl[2]
        player.dx = 0
        return true
    }else if(pl[0]+pl[2] > platform[0] && pl[1]+pl[2] > platform[1]+3 && pl[0] < platform[0]+platform[2]/2 && pl[1] < platform[1]+platform[3]){
        player.x = platform[0]-pl[2]
        player.dx = 0
        return true
    }
    else if(pl[0] < platform[0]+platform[2]&& pl[1]-pl[2] < platform[1]+platform[3]-1 && pl[0] > platform[0]+1&& pl[1]> platform[1]){
        player.y = platform[1]+platform[3]+pl[2]
        player.dy =0
        return true
    }
}

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
    temp
    draw (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour
        c.fill();
    }

    update(){
        this.playerDistance = getDistance(this.x, this.y, player.x, player.y) - this.radius - player.radius
        if (this.playerDistance <= 0) {
            let temp = genNewDot()

            this.x = temp[0];
            this.y = temp[1];
            score++;
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
    airborn = false
    coyote = 10
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = clPrimary
        c.fill();
    }
    update() {
        if(this.coyote <= 10) this.coyote++
        if(!this.airborn) {
            grounded = false
            this.coyote = 0
        }
        if(keys.space == true){
            keys.space = false
            if (this.coyote <= 8){
                player.dy = -15
                this.coyote = 10
            }
            else if(!grounded) {player.dy = -10
                grounded = true
            }
        }
        if (keys.left && !keys.right && this.dx > -10) {
            this.dx -= 0.4;
            if (this.dx > 0){
                this.dx -= 0.2
            }
        }
        else if (keys.right && !keys.left && this.dx < 10) {
            this.dx += 0.4;
            if (this.dx < 0){
                this.dx += 0.2
            }
        }

        if (this.airborn == true) this.dy += 0.7

        if(!keys.left && !keys.right){
            if (this.dx > 0) {
                this.dx -= 0.3
                            if (!this.airborn){
                    this.dx -=0.3
            }
            }
            if (this.dx < 0) {
                this.dx += 0.3
                            if (!this.airborn){
                    this.dx +=0.3
            }
            }
            if (!this.airborn && this.dx < 0.5&& this.dx > -0.5){
                    this.dx =0
            }
        }
        this. airborn = true
        this.y += this.dy;
        this.x += this.dx
        if (this.y + this.radius >= canvas.height-1) {
            this.dy = -this.dy * 0.05
            this.y = canvas.height - this.radius
            this.airborn = false
        }
        for (let index = 0; index < course.length; index++) {
            if (playerOnPlatform(this.x, this.y, this.radius, course[index].x, course[index].y, course[index].w, course[index].h)) {
                this.dy = -this.dy * 0.15
                this.y = course[index].y - this.radius
                this.airborn = false
            }
            playerHitWall(this.x, this.y, this.radius, course[index].x, course[index].y, course[index].w, course[index].h)
                
        }
        this.draw();
    }
}

class Platform {   
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(){
        c.fillStyle = '#ffffff'
        c.fillRect(this.x,this.y,this.w,this.h)
    }
    update(){
        this.draw()
    }
}

let player
let objects = [];
let course = []
function init(){
    player = new Player(canvas.width/2, canvas.height/2, 20, 0, 2)
    let temp = genNewDot()
    pelet = new Pelet(temp[0],temp[1], 10, clSecondary)
    
    objects.push(player)
    objects.push(pelet)
    objects.push(new Platform(200,canvas.height - 200, 200, 50))
    course.push(new Platform(200,canvas.height - 200, 200, 50))
    objects.push(new Platform(275,canvas.height - 200, 50, 200))
    course.push(new Platform(275,canvas.height - 150, 50, 200))
    objects.push(new Platform(650,canvas.height - 400, 200, 50))
    course.push(new Platform(650,canvas.height - 400, 200, 50))
    objects.push(new Platform(canvas.width-500,canvas.height - 150, 500, 150))
    course.push(new Platform(canvas.width-500,canvas.height - 150, 500, 150))

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