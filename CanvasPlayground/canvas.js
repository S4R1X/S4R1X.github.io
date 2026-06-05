var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');
const clSecondary = window.getComputedStyle(document.body).getPropertyValue('--cl-secondary');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

function hexToRgb(hex) {
    hex = hex.replace('#', '');

    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function randomColorOnGradient(c1, c2) {
    const t = Math.random();

    return {
        r: Math.round(c1.r + (c2.r - c1.r) * t),
        g: Math.round(c1.g + (c2.g - c1.g) * t),
        b: Math.round(c1.b + (c2.b - c1.b) * t),
    };
}

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
    init();
})

function Circle(x,y,dx,dy,radius, red, green, blue){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.inflate = 0
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius + this.inflate, 0, Math.PI * 2, false);
        c.fillStyle = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
        c.fill();
    }
    this.update = function () {
        if (this.x > window.innerWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;

        }
        if (this.y > window.innerHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < (this.radius + this.inflate) && mouse.x - this.x > -(this.radius + this.inflate) && mouse.y - this.y < (this.radius + this.inflate) && mouse.y - this.y > -(this.radius + this.inflate)) {
            if (this.inflate < this.radius ) {
                this.inflate += 1
            }
        }else if(this.inflate > 0 ) {
            this.inflate -= 1
        }
        this.draw();
    }
}

var screen_size, A,B

if (window.innerWidth > window.innerHeight) {
    A = window.innerWidth
    B = window.innerHeight
}else{
    A = window.innerHeight
    B = window.innerWidth
}

screen_size = (A - B)/20
var circle_array = [];

function init(){
    circle_array = [];
for (var i = 0; i < 75; i++) {
    var radius = Math.random() * screen_size + 25
    var x = Math.random() * (window.innerWidth - radius * 2) + radius   
    var y = Math.random() * (window.innerHeight - radius * 2) + radius
    var dx = (Math.random() - 0.5) * 2
    var dy = (Math.random() - 0.5) * 2
    const { r, g, b } = randomColorOnGradient(hexToRgb(clPrimary), hexToRgb(clSecondary));

    circle_array.push(
        new Circle(x, y, dx, dy, radius, r, g, b)
    );
}}

function animate_circle() {
    requestAnimationFrame(animate_circle);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (i = 0; i < circle_array.length; i++) {
        circle_array[i].update();
    }
}
    
animate_circle();
init()