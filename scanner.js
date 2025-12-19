/* ===== RED ANIMADA ===== */
const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let points = [];
for (let i = 0; i < 60; i++) {
  points.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "#00ff55";
    ctx.fillRect(p.x, p.y, 2, 2);

    points.forEach(q => {
      let dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 120) {
        ctx.strokeStyle = "rgba(0,255,85,0.2)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animate);
}

animate();

/* ===== CONSOLA FALSA ===== */
const input = document.getElementById("command");
const output = document.getElementById("output");

const fakeCommands = [
  "scanning subnet 192.168.0.0/24...",
  "decrypting packets...",
  "access granted to node 7",
  "injecting payload...",
  "retrieving metadata...",
  "connection secured"
];

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    let cmd = fakeCommands[Math.floor(Math.random() * fakeCommands.length)];
    output.textContent += "\n> " + cmd;
    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});
