var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = window.getComputedStyle(document.body).getPropertyValue('--cl-secondary');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");

const keys = {
    left: false,
    right: false,
    space:false,
    shift:false
};

const camera = {
    x: 0,
    y: 0
};

grounded =false

addEventListener("keydown", e => {
    if (e.code === "KeyA") keys.left = true;
    if (e.code === "KeyD") keys.right = true;
    if (e.code == 'ShiftLeft') keys.shift = true
});

addEventListener("keypress", e =>{    
    if (e.code == 'Space') keys.space = true
})

function playerOnPlatform(playx,playy,playr, platx,platy,platw,plath){
    pl = [playx,playy,playr]
    platform = [ platx,platy,platw,plath]
    if(pl[0] < platform[0]+platform[2]&& pl[1]+pl[2] > platform[1]-player.dy && pl[0] > platform[0]+1&& pl[1]< platform[1]){
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
    if (e.code == 'ShiftLeft') keys.shift = false
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

    genNewDot() {
    let safe = false;
    let tempx, tempy;

    while (!safe) {

        tempx = Math.random() * (canvas.width - 100) + 25;
        tempy = canvas.height - ((Math.random() * canvas.height) / 2 + 15);

        safe = true;

        for (let i = 0; i < course.length; i++) {

            const left = tempx - this.radius;
            const right = tempx + this.radius;
            const top = tempy - this.radius;
            const bottom = tempy + this.radius;

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
    this.x=tempx
    this.y=tempy

}
    draw (){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour
        c.fill();
    }

    update(){
        this.playerDistance = getDistance(this.x, this.y, player.x, player.y) - this.radius - player.radius
        if (this.playerDistance <= 0) {
            this.genNewDot()
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
        this.jumpForce = -15;
        this.doubleForce = 0.66
        this.runSpeed = 10
        this.runAccel = 0.4
        this.turnAccel = 0.4
        this.friction = 0.3
        this.bounce = 0.05
    }
    airborn = false
    coyote = 10
    boostCooldown = 0
    onIndex = -1

    jump() {
        this.onIndex = -1
        keys.space = false
        if (this.coyote <= 8) {
            player.dy = this.jumpForce
            this.coyote = 10
        }
        else if (!grounded) {
            player.dy = this.jumpForce * this.doubleForce
            grounded = true
        }
    }
    run(pos){
        if(this.dx * pos > this.runSpeed - this.runAccel)this.dx = this.runSpeed * pos
        {
            this.dx += this.runAccel * pos;
            if (this.dx * pos < 0) {
                this.dx += this.turnAccel * pos
            }
        }
    }
    boost(){
        this.runSpeed += 50
        this.boostCooldown = 50
        this.dx *= 1.5
    }
    stand() {
        if (!this.airborn && -0.5 < this.dx && this.dx < 0.5) {
            this.dx = 0
            return
        }
        if (this.dx > 0) {
            this.dx -= this.friction
            if (!this.airborn) {
                this.dx -= this.friction
            }
            return
        }
        if (this.dx < 0) {
            this.dx += this.friction
            if (!this.airborn) {
                this.dx += this.friction
            }
            return
        }
    }
    inWorld() {
        for (let index = 0; index < course.length; index++) {
            if (playerOnPlatform(this.x, this.y, this.radius, course[index].x, course[index].y, course[index].w, course[index].h)) {
                this.dy = -this.dy * this.bounce
                this.y = course[index].y - this.radius
                this.airborn = false
                this.onIndex = index
            }
            if(this.onIndex != index) playerHitWall(this.x, this.y, this.radius, course[index].x, course[index].y, course[index].w, course[index].h)

        }
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = clPrimary
        c.fill();
    }
    update() {

        //calculate coyote time physics
        if (this.coyote <= 10) this.coyote++
        if (!this.airborn) {
            grounded = false
            this.coyote = 0
        }

        if (this.boostCooldown > 0) this.boostCooldown--
        if (this.boostCooldown == 30) this.runSpeed -=50
            


        //Player jumped
        if (keys.space == true) this.jump(-1)

        //Player is running
        if (keys.left && !keys.right)this.run(-1)
        if (keys.right && !keys.left)this.run(1)
        
        if (keys.shift && this.boostCooldown == 0)this.boost()
        //platform friction
        if (!keys.left && !keys.right)this.stand()
        if ((keys.left && keys.right))this.stand()
            
        //falling
        if (this.airborn == true) this.dy += 0.7
        this. airborn = true

        //update position
        this.y += this.dy;
        this.x += this.dx

        //colission detection
        this.inWorld()

        //update visuals
        this.draw();
    }
}

class Platform {   
    constructor(x, y, w, h,colour, ThreeDColour ,top,right) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.colour = colour
        this.threeDColour = ThreeDColour
        this.top = top
        this.right =right
    }

    draw(){
        c.fillStyle = this.colour
        c.fillRect(this.x,this.y,this.w,this.h)
        c.beginPath();
        
        if (this.top) {
            c.moveTo(this.x, this.y);
            c.lineTo(this.x + 25, this.y);
            c.lineTo(this.x + 25, this.y - 15);
            c.closePath();
            c.fillStyle = this.threeDColour;
            c.fill();
            c.fillRect(this.x +25,this.y -15,this.w-25, 15)
        }
        if (this.right){
             c.fillStyle = this.threeDColour;
            c.fillRect(this.x + this.w, this.y, 10, this.h - 10)
            c.moveTo(this.x + this.w, this.y + this.h);
            c.lineTo(this.x + this.w + 10, this.y + this.h - 10);
            c.lineTo(this.x + this.w, this.y + this.h - 10);
            c.closePath();
            c.fill();
        }
        if (this.top&&this.right){
            c.fillRect(this.x + this.w, this.y, 10, -15)
        }
    }
    update(){
        this.draw()
    }
}

let player
let objects = [];
let course = []
function init(){
    course.push(new Platform(200,canvas.height - 200, 200, 50, '#5d3708',"#4c2d08ff",true,true))
    course.push(new Platform(275,canvas.height - 150, 50, 200,'#5d3708',"#4c2d08ff",false,true))
    course.push(new Platform(650,canvas.height - 400, 200, 50,'#c2d4daff',"#9eb2b8ff",true,true))
    course.push(new Platform(canvas.width-500,canvas.height - 150, canvas.width * 5, 150,'#2b5a26ff',"#1f3a1cff",true,true))
    course.push(new Platform(0,canvas.height-5,canvas.width,500, "#2b5a26ff"))

    for (i = 0; i < course.length; i++) {
        objects.push(course[i])
    }

    player = new Player(canvas.width / 2,0- ( canvas.height*3), 20, 0, 2)
    pelet = new Pelet(0,0, 10, clSecondary)
    pelet.genNewDot()

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
camera.x += (player.x - canvas.width * 0.5 - camera.x) * 0.1;
camera.y += (player.y - canvas.height * 0.6 - camera.y) * 0.1;
     c.save();

    c.translate(-camera.x, -camera.y);
    for (i = 0; i < objects.length; i++) {
        objects[i].update();
    }
        c.restore();
    c.font = "30px monospace";
    c.fillStyle = "#FFFFFF"
    c.fillText("Score: "+ score, 10, 50);
    c.fillRect(35,70,50,100)
    c.fillStyle = "#767676ff"
    c.fillRect(40,75,40,90)
    temp = Math.round( player.boostCooldown/50 *100)/100
    barRed = 255 *temp
    barGreen = 255 -  (255 * temp)
    c.fillStyle = `rgb(${barRed}, ${barGreen}, 120)`
    c.fillRect(40,75 + (90 *temp),40,90 - (90 *temp))
}

init()