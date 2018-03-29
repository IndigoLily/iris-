const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let w = canvas.width  = 512;//innerWidth;
let h = canvas.height = 512;//innerHeight;

let speeds = [];
for (let i = 0; i < 10; i++) {
  speeds[i] = Math.random() + 1;
}

function calcOffs(_w = 1) {
  let t = Date.now();
  let offs = speeds.map(s => Math.sin(t * s * 0.003) + 1);
  let sum = offs.reduce((sum, n) => sum + n, 0);
  return offs.map(n => n / sum * _w);
}
