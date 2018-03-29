const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let w = canvas.width  = 512;//innerWidth;
let h = canvas.height = 512;//innerHeight;

let speeds = [];
for (let i = 0; i < 32; i++) {
  speeds[i] = Math.random() + 1;
}

function calcOffs(_w = 1) {
  let t = Date.now();
  let offs = speeds.map(s => Math.sin(t * s * 0.003) + 1);
  let sum = offs.reduce((sum, n) => sum + n, 0);
  return offs.map(n => n / sum * _w);
}

c.fillStyle = '#fff';

function draw() {
  c.clearRect(0,0,w,h);

  let offs = calcOffs(h);
  for (let i = 0, len = offs.length; i < len; i++) {
    c.fillRect(w * (i/len), 0, w/len, offs[i]);
  }

  requestAnimationFrame(draw);
}

draw();
