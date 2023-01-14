
// let canvas = document.createElement("canvas");
// canvas.setAttribute("id","canvas");
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d"); // get the context oc the canvas
//set the size of canvas
canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

//set up basic variables for future reference
let particleNum = 100;
let connectDistance = 120;
let colorRGB = "254,250,254";
let particles = [];
let interactiveParticle = null;

class Particle {
  constructor(x, y, velocityX, velocityY, size, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.size = size;
    this.color = color;
  }
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
  update() {
    //change the moving direction if particle touch the border of canvas
    if (this.x < 0 || this.x > canvas.width) {
      this.velocityX *= -1;
    }
    if (this.y < 0 || this.x > canvas.height) {
      this.velocityY *= -1;
    }
    //update the distance of x and y axis of particle
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.draw();
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function createParticles() {
  for (let i = 0; i < particleNum; i++) {
    let size = getRandomArbitrary(1, 3);
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let velocityX = getRandomArbitrary(-2, 2);
    let velocityY = getRandomArbitrary(-2, 2);
    let color = `rgba(${colorRGB},${1 - size / 3})`;
    particles.push(new Particle(x, y, velocityX, velocityY, size, color));
  }
}
function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let p1 = particles[i];
      let p2 = particles[j];
      let distance = Math.sqrt(
        Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
      );
      if (distance < connectDistance) {
        context.strokeStyle = `rgba(${colorRGB},${
          1 - distance / connectDistance
        })`;
        //draw the line between two particles
        context.beginPath();
        canvas.getContext("2d").lineWidth = 0.8;
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  particles.forEach((particle) => {
    particle.update();
  });
  connect();
}

function bindEvents() {
  canvas.addEventListener("mouseover", (e) => {
    if (!interactiveParticle) {
      interactiveParticle = new Particle(
        e.x,
        e.y,
        0,
        0,
        2,
        `rgba(${colorRGB},1)`);
      particles.push(interactiveParticle);
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    interactiveParticle.x = e.x;
    interactiveParticle.y = e.y;
  });
  canvas.addEventListener("mouseout", (e) => {
    interactiveParticle.x = null;
    interactiveParticle.y = null;
  });
}
bindEvents();
createParticles();
animate();

