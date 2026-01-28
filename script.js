// Get canvas and context
const canvas = document.getElementById('solarSystem');
const ctx = canvas.getContext('2d');

let centerX;
let centerY;

// Solar system data embedded directly
const solarData = {
  sun: { radius: 50, color: 'yellow' },
  planets: [
    { name: 'Mercury', radius: 5, distance: 70, speed: 0.04, color: '#b2b2b2' },
    { name: 'Venus', radius: 12, distance: 100, speed: 0.015, color: '#f5deb3' },
    {
      name: 'Earth',
      radius: 13,
      distance: 140,
      speed: 0.01,
      color: '#2e86c1',
      moon: { radius: 4, distance: 20, speed: 0.05 }
    },
    { name: 'Mars', radius: 8, distance: 180, speed: 0.008, color: '#c1440e' },
    { name: 'Jupiter', radius: 25, distance: 230, speed: 0.006, color: '#d9b48f' },
    { name: 'Saturn', radius: 22, distance: 280, speed: 0.005, color: '#f4e1a0' },
    { name: 'Uranus', radius: 18, distance: 330, speed: 0.003, color: '#7fdbff' },
    { name: 'Neptune', radius: 17, distance: 380, speed: 0.002, color: '#4169e1' }
  ],
  asteroids: {
    count: 100,
    minDistance: 220,
    maxDistance: 260,
    minRadius: 1,
    maxRadius: 3,
    minSpeed: 0.002,
    maxSpeed: 0.005
  },
  stars: { count: 200 }
};

let planets = [];
let asteroids = [];
let stars = [];
let sun = {};

// Initialize planets, asteroids, stars
function initialize() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  sun = solarData.sun;

  planets = solarData.planets.map(p => ({
    ...p,
    angle: Math.random() * Math.PI * 2,
    moon: p.moon
      ? { ...p.moon, angle: Math.random() * Math.PI * 2 }
      : null
  }));

  asteroids = [];
  for (let i = 0; i < solarData.asteroids.count; i++) {
    asteroids.push({
      distance:
        solarData.asteroids.minDistance +
        Math.random() *
          (solarData.asteroids.maxDistance -
            solarData.asteroids.minDistance),
      angle: Math.random() * Math.PI * 2,
      radius:
        solarData.asteroids.minRadius +
        Math.random() *
          (solarData.asteroids.maxRadius -
            solarData.asteroids.minRadius),
      speed:
        solarData.asteroids.minSpeed +
        Math.random() *
          (solarData.asteroids.maxSpeed -
            solarData.asteroids.minSpeed)
    });
  }

  stars = [];
  for (let i = 0; i < solarData.stars.count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5
    });
  }
}

// Draw stars
function drawStars() {
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// Main animation loop
function animate() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawStars();

  // Draw Sun
  const sunGradient = ctx.createRadialGradient(
    centerX,
    centerY,
    sun.radius * 0.2,
    centerX,
    centerY,
    sun.radius
  );

  sunGradient.addColorStop(0, '#fff9a3');
  sunGradient.addColorStop(0.3, '#fff176');
  sunGradient.addColorStop(0.6, '#ffd54f');
  sunGradient.addColorStop(0.8, '#ffb300');
  sunGradient.addColorStop(1, '#ffa000');

  ctx.beginPath();
  ctx.arc(centerX, centerY, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = sunGradient;
  ctx.fill();

  // Draw planets
  planets.forEach(planet => {
    planet.angle += planet.speed;

    const x = centerX + planet.distance * Math.cos(planet.angle);
    const y = centerY + planet.distance * Math.sin(planet.angle);

    const gradient = ctx.createRadialGradient(
      x - planet.radius / 3,
      y - planet.radius / 3,
      planet.radius / 5,
      x,
      y,
      planet.radius
    );

    switch (planet.name) {
      case 'Mercury':
        gradient.addColorStop(0, '#d0d0d0');
        gradient.addColorStop(1, '#7a7a7a');
        break;
      case 'Venus':
        gradient.addColorStop(0, '#fff5e6');
        gradient.addColorStop(1, '#f5d6a1');
        break;
      case 'Earth':
        gradient.addColorStop(0, '#6ec1ff');
        gradient.addColorStop(0.7, '#2e86c1');
        gradient.addColorStop(1, '#1c5a99');
        break;
      case 'Mars':
        gradient.addColorStop(0, '#ff6f4c');
        gradient.addColorStop(1, '#b03d1d');
        break;
      case 'Jupiter':
        gradient.addColorStop(0, '#ffe0b2');
        gradient.addColorStop(0.5, '#d9b48f');
        gradient.addColorStop(1, '#b07250');
        break;
      case 'Saturn':
        gradient.addColorStop(0, '#fff8c4');
        gradient.addColorStop(0.7, '#f4e1a0');
        gradient.addColorStop(1, '#d4c08c');
        break;
      case 'Uranus':
        gradient.addColorStop(0, '#b0f0ff');
        gradient.addColorStop(1, '#4da3cc');
        break;
      case 'Neptune':
        gradient.addColorStop(0, '#66a3ff');
        gradient.addColorStop(1, '#1c3fa0');
        break;
    }

    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw moon
    if (planet.moon) {
      planet.moon.angle += planet.moon.speed;

      const mx =
        x + planet.moon.distance * Math.cos(planet.moon.angle);
      const my =
        y + planet.moon.distance * Math.sin(planet.moon.angle);

      const moonGradient = ctx.createRadialGradient(
        mx - planet.moon.radius / 3,
        my - planet.moon.radius / 3,
        planet.moon.radius / 4,
        mx,
        my,
        planet.moon.radius
      );

      moonGradient.addColorStop(0, '#dddddd');
      moonGradient.addColorStop(1, '#888888');

      ctx.beginPath();
      ctx.arc(mx, my, planet.moon.radius, 0, Math.PI * 2);
      ctx.fillStyle = moonGradient;
      ctx.fill();
    }
  });

  // Draw asteroids
  asteroids.forEach(asteroid => {
    asteroid.angle += asteroid.speed;

    const ax = centerX + asteroid.distance * Math.cos(asteroid.angle);
    const ay = centerY + asteroid.distance * Math.sin(asteroid.angle);

    ctx.beginPath();
    ctx.arc(ax, ay, asteroid.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#aaaaaa';
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

// Resize handling
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initialize();
}

window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
animate();
