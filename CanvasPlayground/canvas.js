var canvas = document.querySelector("canvas");

const clPrimary = window.getComputedStyle(document.body).getPropertyValue('--cl-primary');

canvas.width = window.innerWidth
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// c.fillStyle = "#5fdab352";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#5fdab390";
// c.fillRect(300, 200, 100, 100);
// c.fillStyle = "#5fdab322";
// c.fillRect(200, 400, 100, 100);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = clPrimary;
// c.stroke();

// for (var i = 0; i < 700; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var r = Math.floor(Math.random() * 256);
//     var g = Math.floor(Math.random() * 256);
//     var b = Math.floor(Math.random() * 256);
//     var color = 'rgb(' + r + ',' + g + ',' + b + ')';
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = color;
//     c.stroke();
// }

function Circle(x,y,dx,dy,radius,green){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.green = green;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'rgb(256, ' + this.green + ', 256)';
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
        this.draw();
    }
}

var circle_array = [];
for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 50 + 25
    var x = Math.random() * (window.innerWidth - radius * 2) + radius   
    var y = Math.random() * (window.innerHeight - radius * 2) + radius
    var dx = (Math.random() - 0.5) * 2
    var dy = (Math.random() - 0.5) * 2
    var green = Math.floor((Math.random()+2) * 85);
    circle_array.push(new Circle(x, y, dx, dy, radius,green));
}

function animate_circle() {
    requestAnimationFrame(animate_circle);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (i = 0; i < circle_array.length; i++) {
        circle_array[i].update();
    }
}
    
animate_circle();