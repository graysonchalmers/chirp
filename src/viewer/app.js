// chirp live player. Plain browser JS, no build step.
const $ = (id) => document.getElementById(id);
let state, sel = localStorage.getItem("chirp.sel") || undefined, ctx, src;

$("unlock").onclick = () => { ctx = new AudioContext(); $("unlock").remove(); };

function esc(s) { return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]); }

function stop() { try { src?.stop(); } catch {} src = undefined; }

async function play(name, layer) {
  if (!ctx) return;
  stop();
  const q = `name=${encodeURIComponent(name)}${layer !== undefined ? `&layer=${layer}` : ""}&v=${state?.version}`;
  const buf = await ctx.decodeAudioData(await (await fetch(`/api/wav?${q}`)).arrayBuffer());
  src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = $("loop").checked;
  src.connect(ctx.destination);
  src.start();
}

function show() {
  const info = state?.sounds.find((s) => s.name === sel);
  $("err").style.display = info?.error || state?.error ? "block" : "none";
  $("err").textContent = (state?.error ?? info?.error)?.message ?? "";
  if (!info || info.error) { $("prev").removeAttribute("src"); $("info").textContent = ""; $("layers").innerHTML = ""; return; }
  $("title").textContent = `${info.kind} ${info.name} · ${info.dur.toFixed(2)}s${info.loop ? " · loops" : ""}`;
  $("prev").src = `/api/png?name=${encodeURIComponent(info.name)}&v=${state.version}`;
  $("info").textContent = info.info;
  $("layers").innerHTML = "";
  info.layers.forEach((l, i) => {
    const b = document.createElement("button");
    b.textContent = `${i} ${l}`;
    b.onclick = () => { play(info.name, i); $("prev").src = `/api/png?name=${encodeURIComponent(info.name)}&layer=${i}&v=${state.version}`; };
    $("layers").appendChild(b);
  });
}

function renderList() {
  const box = $("list");
  box.innerHTML = "";
  if (!state) return;
  for (const [title, pred] of [["music", (s) => s.kind === "song" && !s.part], ["sfx", (s) => s.kind === "sfx" && !s.part], ["parts", (s) => s.part]]) {
    const items = state.sounds.filter(pred);
    if (!items.length) continue;
    const h = document.createElement("div");
    h.className = "sect";
    h.textContent = title;
    box.appendChild(h);
    for (const s of items) {
      const row = document.createElement("div");
      row.className = "row" + (s.name === sel ? " sel" : "");
      row.innerHTML = `<button class="pl">▶</button><span class="nm">${esc(s.name)}</span><span class="d">${s.dur ? s.dur.toFixed(2) + "s" : ""}</span>` +
        (s.error ? `<span class="dot err"></span>` : s.changed && state.version > 1 ? `<span class="dot new"></span>` : "");
      row.onclick = () => { select(s.name); play(s.name); };
      box.appendChild(row);
    }
  }
}

function select(name) {
  sel = name;
  localStorage.setItem("chirp.sel", name);
  renderList();
  show();
}

$("play").onclick = () => sel && play(sel);
$("stop").onclick = stop;
addEventListener("keydown", (e) => { if (e.key === " ") { e.preventDefault(); sel && play(sel); } });

const es = new EventSource("/events");
es.addEventListener("build", (e) => {
  const prev = state;
  state = JSON.parse(e.data);
  $("file").textContent = `${state.file}  v${state.version}  ${state.ms}ms`;
  const bad = state.error ? 1 : state.sounds.filter((s) => s.error).length + state.errors.length;
  $("status").textContent = bad ? `${bad} error${bad > 1 ? "s" : ""}` : "ok";
  $("status").className = "pill " + (bad ? "bad" : "ok");
  if (!sel || !state.sounds.some((s) => s.name === sel)) sel = state.sounds.find((s) => !s.part)?.name;
  // Follow the edit: select and play the first sound that changed.
  const changed = prev && state.sounds.find((s) => s.changed && !s.part && !s.error);
  if (changed) sel = changed.name;
  renderList();
  show();
  if (changed && $("auto").checked) play(changed.name);
});
es.onerror = () => { $("status").textContent = "disconnected"; $("status").className = "pill bad"; };
