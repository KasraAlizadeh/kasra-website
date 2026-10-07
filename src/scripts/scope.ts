// Oscilloscope hero: a noisy (heavy-tailed) raw trace is "decoded" into a clean one.
export function mountScope(): void {
  const canvas = document.getElementById("scope") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ro = document.getElementById("ro-mode");
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(".seg button"));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const W = 1000, H = 700, N = 400;
  const noise = new Float32Array(N);
  let mix = reduce ? 1 : 0, target = reduce ? 1 : 0, t = 0;
  let running = false, visible = true, raf = 0, userTouched = false;

  const tNoise = () => {
    let g = (Math.random() + Math.random() + Math.random() - 1.5) * 0.9;
    if (Math.random() < 0.035) g *= 4.5; // impulsive spike
    return g;
  };
  const refresh = () => { for (let i = 0; i < N; i++) noise[i] = noise[i] * 0.35 + tNoise() * 0.65; };
  const sig = (x: number, ph: number) =>
    0.52 * Math.sin(2 * Math.PI * 3 * x - ph) + 0.2 * Math.sin(2 * Math.PI * 7 * x - 1.6 * ph) + 0.1 * Math.sin(2 * Math.PI * 12 * x - 0.7 * ph);

  const grid = () => {
    ctx.fillStyle = "#070B10"; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(120,190,220,.11)"; ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) { const x = (i * W) / 10; ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
    for (let j = 1; j < 8; j++) { const y = (j * H) / 8; ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }
    ctx.strokeStyle = "rgba(120,190,220,.28)";
    for (let k = 0; k <= 50; k++) { const x = (k * W) / 50; ctx.beginPath(); ctx.moveTo(x, H / 2 - 5); ctx.lineTo(x, H / 2 + 5); ctx.stroke(); }
    for (let m = 0; m <= 40; m++) { const y = (m * H) / 40; ctx.beginPath(); ctx.moveTo(W / 2 - 5, y); ctx.lineTo(W / 2 + 5, y); ctx.stroke(); }
  };
  const trace = (fn: (x: number, i: number) => number, color: string, alpha: number, width: number) => {
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineJoin = "round";
    ctx.shadowColor = color; ctx.shadowBlur = 14;
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const x = i / (N - 1), y = H / 2 - fn(x, i) * H * 0.3;
      if (i === 0) ctx.moveTo(x * W, y); else ctx.lineTo(x * W, y);
    }
    ctx.stroke(); ctx.restore();
  };
  const frame = () => {
    grid();
    mix += (target - mix) * (reduce ? 1 : 0.05);
    const ph = t;
    trace((x, i) => sig(x, ph) + noise[i] * 0.42, "#F5C542", 1 - mix * 0.82, 1.6);
    trace((x) => sig(x, ph), "#4FD8E8", mix, 2.6);
  };
  const loop = () => {
    if (!running) return;
    t += 0.022;
    if (Math.random() < 0.5) refresh();
    frame();
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (reduce || running || !visible || document.hidden) return; running = true; raf = requestAnimationFrame(loop); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  const setMode = (m: "raw" | "dec") => {
    target = m === "dec" ? 1 : 0;
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
    if (ro) ro.innerHTML = `<span class="dim">MODE</span> ${m === "dec" ? '<span class="c2">DECODE</span>' : '<span class="c1">RAW INPUT</span>'}`;
    if (reduce) { mix = target; frame(); }
  };
  buttons.forEach((b) => b.addEventListener("click", () => { userTouched = true; setMode(b.dataset.mode === "raw" ? "raw" : "dec"); }));

  refresh(); frame();
  new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; visible ? start() : stop(); }).observe(canvas);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  start();
  if (!reduce) { setMode("raw"); window.setTimeout(() => { if (!userTouched) setMode("dec"); }, 1600); }
}
