var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = "#fff700ff"
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
facing = true

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
    
    if(
        pl[0] < platform[0]+platform[2]
        && pl[1]+pl[2] > platform[1]-player.dy 
        && pl[0] > platform[0]+1
        && pl[1]< platform[1]+player.dy-pl[2]){
        return true
    }
     return false
}

function playerHitWall(playx, playy, playr, platx, platy, platw, plath) {

    const px = playx;
    const py = playy;
    const r = playr;

    const left = px - r;
    const right = px + r;
    const top = py - r;
    const bottom = py + r;

    const pLeft = platx;
    const pRight = platx + platw;
    const pTop = platy;
    const pBottom = platy + plath;

    const overlap =
        right > pLeft &&
        left < pRight &&
        bottom > pTop &&
        top < pBottom;

    if (!overlap) return false;

    // compute overlap depths
    const fromLeft = pRight - left;
    const fromRight = right - pLeft;
    const fromTop = pBottom - top;
    const fromBottom = bottom - pTop;

    // resolve smallest penetration axis
    const min = Math.min(fromLeft, fromRight, fromTop, fromBottom);

    if (min === fromLeft) {
        player.x = pRight + r;
        player.dx = 0;
    } 
    else if (min === fromRight) {
        player.x = pLeft - r;
        player.dx = 0;
    } 
    else if (min === fromTop) {
        player.y = pBottom + r;
        player.dy = 0;
    } 
    else {
        player.y = pTop - r;
        player.dy = 0;
    }

    return true;
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
    let tempx, tempy,above;

    while (!safe) {
        above = course[Math.floor(Math.random()*course.length)]
        tempx = above.x + (Math.random() * above.w)
        tempy = above.y - (Math.random() * 200)+15

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

    destroy(){
        this.x = -100000
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
            // this.genNewDot()
            score++;
            this.destroy()
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
            this.dy -= 2
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
                if(this.onIndex != index&& !course[index].floating) playerHitWall(this.x, this.y, this.radius, course[index].x, course[index].y, course[index].w, course[index].h)

            }
        }

        draw() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = clPrimary;
            c.fill();

            const w = this.radius * 2;
            const h = this.radius * 2;

            // if (facing) {
            //     c.drawImage(img, this.x - w, this.y - h *1.2, w*1.8, h*1.8);
            // } else {
            //     c.save();

            //     c.translate(this.x + w, this.y - h*1.2);
            //     c.scale(-1, 1);

            //     c.drawImage(img, 0, 0, w*1.8, h*1.8);

            //     c.restore();
            // }
            // };
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
            if (keys.left && !keys.right){
                this.run(-1)
                facing = true
            }
            if (keys.right && !keys.left){
                this.run(1)
                facing = false
            }
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
    constructor(x, y, w, h,colour, ThreeDColour ,top,right, floating,extendtop,extendcorner,extendright) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.colour = colour
        this.threeDColour = ThreeDColour
        this.top = top
        this.right =right
        this.floating = floating
        this.extendtop = extendtop
        this.extendcorner =extendcorner
        this.extendright = extendright
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
        if(this.extendtop){
            c.fillRect(this.x, this.y, 25, -15)
        }
        if(this.extendcorner){
            c.fillStyle = this.threeDColour;
            c.moveTo(this.x + this.w, this.y);
            c.lineTo(this.x + this.w + 10, this.y );
            c.lineTo(this.x + this.w + 10, this.y - 10);
            c.closePath();
            c.fill();
        }
        if(this.extendright){
             c.fillRect(this.x + this.w, this.y+this.h, 10, -15)
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
    //spawn
    course.push(new Platform(0,200, 600, 50, '#97C1A9',"#769784ff",true,true,false,true,false))
        course.push(new Platform(600, 375, 100, 10, '#D2b8b8', "#b09b9bff", true, true, true,true))

    course.push(new Platform(0,250, 600, 300, '#9AB7D3',"#819ab1ff",false,true,false,false,true))
    course.push(new Platform(600,550, 1100, 200, '#9AB7D3',"#819ab1ff",true,false,false,true,false))
    course.push(new Platform(0,550, 600, 200, '#9AB7D3',"#819ab1ff"))
    course.push(new Platform(1700,550, 200, 200, '#9AB7D3',"#819ab1ff"))
    course.push(new Platform(1900,550, 1100, 200, '#9AB7D3',"#819ab1ff",true,false,false,true,false))

    //floating platforms section
    course.push(new Platform(1000, 100, 200, 10, '#D9BDE3', "#b79dc0ff", true, true, true))
    objects.push(new Pelet(1057,80, 10, clSecondary))
    objects.push(new Pelet(1157,80, 10, clSecondary))

    course.push(new Platform(500, -100, 200, 10, '#D9BDE3', "#b79dc0ff", true, true, true,true))
    objects.push(new Pelet(557,-120, 10, clSecondary))
    objects.push(new Pelet(657,-120, 10, clSecondary))
    course.push(new Platform(300,-290, 200, 200, '#9AB7D3',"#819ab1ff",true,true,false,true,false))
    objects.push(new Pelet(145,-120, 10, clSecondary))
    objects.push(new Pelet(145,-220, 10, clSecondary))
    objects.push(new Pelet(145,-320, 10, clSecondary))
    course.push(new Platform(-200,-990, 200, 1740, '#9AB7D3',"#819ab1ff"))


    course.push(new Platform(1500, -200, 200, 10, '#D9BDE3', "#b79dc0ff", true, false, true))
    objects.push(new Pelet(1557,-220, 10, clSecondary))
    objects.push(new Pelet(1657,-220, 10, clSecondary))
    course.push(new Platform(1700,-600, 200, 600, '#9AB7D3',"#819ab1ff",true,true,false,false,false))
    course.push(new Platform(1700,200, 200, 350, '#9AB7D3',"#819ab1ff",true,true,false,false,false))
    course.push(new Platform(1200, -400, 200, 10, '#D9BDE3', "#b79dc0ff", true, true, true,true))
    objects.push(new Pelet(1257,-420, 10, clSecondary))
    objects.push(new Pelet(1357,-420, 10, clSecondary))
    course.push(new Platform(1000, -990, 200, 600, '#9AB7D3',"#819ab1ff",true,true,false))




    for (i = 0; i < course.length; i++) {
        objects.unshift(course[i])
    }

    player = new Player(course[0].x +( course[0].w/2), course[0].y - 50, 20, 0, 2)
    // pelet = new Pelet(0,0, 10, clSecondary)
    // pelet.genNewDot()

    objects.push(player)

    for (i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
    animate();
    return
}
const img = new Image();
img.src = "./images/Drawing(3).png";

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