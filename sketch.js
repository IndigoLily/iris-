const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let w = canvas.width  = innerWidth;
let h = canvas.height = innerHeight;

c.strokeStyle = '#fff';
c.lineWidth = Math.sqrt(2);
c.translate(w/2, h/2);

let speeds = [];
for (let i = 0; i < (w+h)/Math.PI/10; i++) {
  speeds[i] = Math.random() + 1;
}

function calcOffs(_w = 1, _s = speeds) {
  let t = Date.now();
  let offs = _s.map(s => Math.sin(t * s * 0.0015) + 1);
  let sum = offs.reduce((sum, n) => sum + n, 0);
  return offs.map(n => n / sum * _w);
}

function polToCart(a, r) {
  return [Math.sin(a) * r, Math.cos(a) * r];
}

let r1 = w/2/3,
    r2 = w/2/4;

function draw() {
  c.clearRect(-w/2,-h/2,w,h);

  c.beginPath();
  c.arc(0, 0, r1, 0, Math.PI*2);
  c.stroke();

  c.beginPath();
  c.arc(0, 0, r2, 0, Math.PI*2);
  c.stroke();

  let offs = calcOffs(Math.PI*2);
  let total = 0;
  for (let i = 0, len = offs.length; i < len; i++) {
    c.beginPath();
    c.moveTo(...polToCart(offs[i] + total + Math.sin(Date.now()/6000), r1));
    c.lineTo(...polToCart(offs[i] + total + Math.sin(Date.now()/6000), r2));
    c.stroke();
    total += offs[i];
  }

  requestAnimationFrame(draw);
}

draw();
