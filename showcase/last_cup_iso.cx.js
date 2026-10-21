// LAST CUP (isometric): the room's sound, synced to the pxl scene. The picture loops every 1.6 s
// (16 frames at 10 fps); the score is 32 s = 20 loops, and the neon buzz dies on the same frames
// the sign's F does (5-6 and 11).

const LOOP = 32, PIC = 1.6, FPS = 10
const r = rng(7)

// Rain on the window to the left: muffled through glass, drops tapping the pane.
sfx("rain_glass", { dur: LOOP, loop: true },
  noise({ color: "pink", dur: LOOP + 0.5, env: [0.4, 0, 1, 0.4], filter: { type: "lp", cutoff: 2600 }, vol: 0.34, pan: -0.55 }),
  noise({ color: "brown", dur: LOOP + 0.5, env: [0.4, 0, 1, 0.4], filter: { type: "lp", cutoff: 320 }, vol: 0.3, pan: -0.3 }),
  Array.from({ length: 150 }, (_, i) => at(r() * LOOP, tone({
    wave: "sine", freq: 1400 + r() * 2400, to: 900 + r() * 900, slide: 0.015, dur: 0.006,
    env: [0, 0.008, 0, 0.025], vol: 0.03 + r() * 0.06, pan: -0.9 + r() * 0.7, seed: 100 + i,
  }))),
  // thunder rolling somewhere over the towers
  at(24, noise({ color: "brown", dur: 3, env: [0.6, 1.5, 0.3, 3], filter: { type: "lp", cutoff: 110 }, vol: 0.55, pan: -0.4 })))

// The city: a sub drone, a siren that never gets closer.
sfx("city", { dur: LOOP, loop: true, fx: [reverb({ size: 0.95, damp: 0.65, mix: 0.55 })] },
  noise({ color: "brown", dur: LOOP + 0.5, env: [0.8, 0, 1, 0.8], filter: { type: "lp", cutoff: 150 }, vol: 0.45 }),
  at(9, tone({ wave: "sine", freq: 660, dur: 7, vibrato: { rate: 0.5, depth: 2.6 }, env: [2.5, 0, 1, 3], vol: 0.02, pan: -0.7 })))

// The CAFE sign: hum and rasp, dark on frames 5-6 and 11 of every 16, re-striking with a tick.
const dark = [[5, 7], [11, 12]].map(([a, b]) => [a / FPS, b / FPS])
const lit = [[0, dark[0][0]], [dark[0][1], dark[1][0]], [dark[1][1], PIC]]
sfx("neon", { dur: PIC, loop: true },
  lit.map(([a, b]) => at(a, [
    tone({ wave: "saw", freq: 120, dur: b - a, env: [0.003, 0, 1, 0.003], filter: { type: "bp", cutoff: 1100, q: 0.8 }, vol: 0.09, pan: 0.25 }),
    tone({ wave: "square", freq: 60, dur: b - a, env: [0.003, 0, 1, 0.003], filter: { type: "lp", cutoff: 260 }, vol: 0.05, pan: 0.25 }),
    a > 0 ? noise({ dur: 0.005, env: [0, 0.005, 0, 0.012], filter: { type: "hp", cutoff: 3500 }, vol: 0.2, pan: 0.25 }) : null,
  ])))

// Steady hums: the kick-plate strip and the bulb over his table (slightly different mains beats).
sfx("hums", { dur: LOOP, loop: true },
  tone({ wave: "saw", freq: 100, dur: LOOP + 0.2, env: [0.2, 0, 1, 0.2], filter: { type: "lp", cutoff: 420 }, vol: 0.035, pan: 0.45 }),
  tone({ wave: "sine", freq: 100.6, dur: LOOP + 0.2, env: [0.2, 0, 1, 0.2], tremolo: { rate: 0.3, depth: 0.4 }, vol: 0.03, pan: -0.25 }))

// The CRT at the bar: flyback whine and a little static.
sfx("crt", { dur: LOOP, loop: true },
  tone({ wave: "sine", freq: 15734, dur: LOOP + 0.2, env: [0.1, 0, 1, 0.1], vol: 0.005, pan: 0.35 }),
  noise({ dur: LOOP + 0.2, env: [0.2, 0, 1, 0.2], filter: { type: "bp", cutoff: 6000, q: 2 }, tremolo: { rate: 7, depth: 0.8 }, vol: 0.012, pan: 0.35 }))

// The robot: a tired cooling fan, a relay that clicks when it shouldn't, servos lifting the cup,
// the cup back on the table, and oil dripping onto concrete.
const servo = (up) => tone({ wave: "saw", freq: up ? 170 : 250, to: up ? 250 : 165, slide: 0.7, dur: 0.75, env: [0.05, 0, 1, 0.12],
  filter: { type: "bp", cutoff: 1300, q: 3 }, vibrato: { rate: 23, depth: 0.4 }, vol: 0.05, pan: -0.3 })
const clink = () => [
  tone({ wave: "sine", freq: 2630, dur: 0.01, env: [0, 0.18, 0, 0.25], vol: 0.07, pan: -0.32 }),
  tone({ wave: "sine", freq: 3940, dur: 0.01, env: [0, 0.1, 0, 0.15], vol: 0.04, pan: -0.32 }),
  noise({ dur: 0.01, env: [0, 0.012, 0, 0.02], filter: { type: "bp", cutoff: 3000, q: 1 }, vol: 0.08, pan: -0.32 })]
const drip = (t) => at(t, tone({ wave: "sine", freq: 950, to: 380, slide: 0.05, dur: 0.02, env: [0, 0.04, 0, 0.08], vol: 0.06, pan: -0.38 }))
sfx("robot", { dur: LOOP, loop: true, fx: [reverb({ size: 0.4, damp: 0.5, mix: 0.2 })] },
  noise({ color: "pink", dur: LOOP + 0.3, env: [0.3, 0, 1, 0.3], filter: { type: "bp", cutoff: 700, q: 1.5 }, tremolo: { rate: 31, depth: 0.3 }, vol: 0.05, pan: -0.3 }),
  [3.1, 8.7, 9.0, 14.2, 21.5, 27.9, 28.1].map((t) => at(t, noise({ dur: 0.003, env: [0, 0.003, 0, 0.006], filter: { type: "bp", cutoff: 2200, q: 4 }, vol: 0.12, pan: -0.3 }))),
  // the pxl sip: up at 6.0 s, down at 10.0 s, cup on the table at 11.1 s; again 16 s later
  [0, 16].map((t0) => at(t0, [at(6.0, servo(true)), at(6.6, servo(true)), at(10.0, servo(false)), at(10.6, servo(false)), at(11.1, clink())])),
  [6.4, 13.9, 17.3, 25.6, 30.8].map(drip))

// The sleeper at the counter: slow, wet breathing.
sfx("sleeper", { dur: LOOP, loop: true },
  Array.from({ length: 6 }, (_, i) => at(1 + i * 5.3, [
    noise({ color: "brown", dur: 1.6, env: [1.1, 0.3, 0.6, 0.6], filter: { type: "lp", cutoff: 520 }, vol: 0.16, pan: 0.6 }),
    noise({ color: "pink", dur: 1.2, env: [0.9, 0.2, 0.4, 0.5], filter: { type: "bp", cutoff: 240, q: 3 }, vol: 0.06, pan: 0.6 }),
  ])))

// The espresso machine, half dead: a sigh of steam and a gurgle nobody comes for.
sfx("espresso", { dur: LOOP, loop: true },
  at(13, noise({ dur: 2.2, env: [0.3, 0.8, 0.4, 0.8], filter: { type: "bp", from: 4200, to: 2600, q: 1.2 }, vol: 0.07, pan: 0.5 })),
  Array.from({ length: 14 }, (_, i) => at(14.5 + r() * 1.6, tone({ wave: "sine", freq: 220 + r() * 180, to: 500 + r() * 300, slide: 0.03, dur: 0.02, env: [0, 0.03, 0, 0.05], vol: 0.04, pan: 0.5, seed: 300 + i }))))

// Music: a slow, tired electric piano and bass in D minor, a lead that sighs in the second half.
inst("epiano", (f, dur, accent) => [
  tone({ wave: "sine", freq: f, dur, env: [0.004, 1.6, 0.3, 1.8], tremolo: { rate: 3.6, depth: 0.22 }, vol: accent ? 0.15 : 0.12 }),
  tone({ wave: "triangle", freq: f * 2, dur, env: [0.002, 0.3, 0.06, 0.7], vol: 0.025 }),
])
inst("upright", { wave: "triangle", env: [0.01, 0.5, 0.45, 0.6], vol: 0.3, filter: { type: "lp", cutoff: 420 } })
inst("pad", { wave: "saw", env: [3, 1, 0.8, 4], vol: 0.05, filter: { type: "lp", cutoff: 380 }, vibrato: { rate: 0.2, depth: 0.08 } })
inst("lead", { wave: "square", duty: 0.25, env: [0.35, 0.6, 0.6, 1.2], vol: 0.06, filter: { type: "lp", cutoff: 1300 }, vibrato: { rate: 4.8, depth: 0.18, delay: 0.5 } })
const H = (n) => Array(n).fill("-").join(" "), R = (n) => Array(n).fill(".").join(" ")
song("theme", { bpm: 60, bars: 8, fx: [reverb({ size: 0.9, damp: 0.55, mix: 0.38 }), delay({ time: 0.75, feedback: 0.3, mix: 0.14 })] },
  track("epiano", [
    `D3+F3+A3+E4 ${H(7)} ${R(4)} A4 - - .`, `Bb2+D3+F3+A3 ${H(7)} ${R(4)} F4 - G4 -`,
    `G2+Bb2+D3+F3 ${H(7)} ${R(4)} D4 - - .`, `A2+C#3+G3+Bb3 ${H(11)} ${R(4)}`,
    `D3+F3+A3+C4 ${H(7)} ${R(4)} A4 - - .`, `Bb2+D3+F3+A3 ${H(7)} . . F4 - E4 - - .`,
    `G2+Bb2+D3+E3 ${H(7)} ${R(8)}`, `A2+D3+E3 ${H(7)} A2+C#3+E3 ${H(7)}`].join(" | ")),
  track("upright", ["D2", "Bb1", "G1", "A1", "D2", "Bb1", "G1", "A1"].map((n, i) =>
    `${n} ${H(5)} ${R(6)} ${["A1", "F1", "D2", "E2", "A1", "F1", "D2", "E2"][i]} - . .`).join(" | ")),
  track("pad", `D2+A2 ${H(63)} D2+A2+F3 ${H(63)}`),
  track("lead", `${R(64)} | A4 ${H(11)} G4 - F4 - | E4 ${H(7)} ${R(8)} | D4 ${H(7)} F4 ${H(3)} E4 ${H(3)} | C#4 ${H(11)} ${R(4)}`))

// The full room.
sfx("last_cup_iso", { dur: LOOP, loop: true, vol: 0.9 },
  play("rain_glass", { vol: 0.8 }),
  play("city", { vol: 0.8 }),
  Array.from({ length: LOOP / PIC }, (_, i) => at(i * PIC, play("neon", { vol: 0.85 }))),
  play("hums"), play("crt"), play("robot"), play("sleeper"), play("espresso"),
  play("theme", { vol: 1.0 }))

// The kiln version: a 10 s clip at 24 fps whose F is dark on frames 50-53, 56-62, 130-133,
// 190-204 and 207-210. Same room, the buzz follows that sign.
const dark3d = [[50, 53], [56, 62], [130, 133], [190, 204], [207, 210]].map(([a, b]) => [a / 24, b / 24])
const lit3d = [[0, dark3d[0][0]], ...dark3d.slice(0, -1).map((d, i) => [d[1], dark3d[i + 1][0]]), [dark3d[4][1], 10]]
sfx("neon_3d", { dur: 10, loop: true },
  lit3d.map(([a, b]) => at(a, [
    tone({ wave: "saw", freq: 120, dur: b - a, env: [0.003, 0, 1, 0.003], filter: { type: "bp", cutoff: 1100, q: 0.8 }, vol: 0.09, pan: 0.1 }),
    tone({ wave: "square", freq: 60, dur: b - a, env: [0.003, 0, 1, 0.003], filter: { type: "lp", cutoff: 260 }, vol: 0.05, pan: 0.1 }),
    a > 0 ? noise({ dur: 0.005, env: [0, 0.005, 0, 0.012], filter: { type: "hp", cutoff: 3500 }, vol: 0.2, pan: 0.1 }) : null,
  ])))
sfx("robot_3d", { dur: 10, fx: [reverb({ size: 0.4, damp: 0.5, mix: 0.2 })] },
  noise({ color: "pink", dur: 10.3, env: [0.3, 0, 1, 0.3], filter: { type: "bp", cutoff: 700, q: 1.5 }, tremolo: { rate: 31, depth: 0.3 }, vol: 0.05, pan: -0.3 }),
  [1.3, 5.1, 5.35].map((t) => at(t, noise({ dur: 0.003, env: [0, 0.003, 0, 0.006], filter: { type: "bp", cutoff: 2200, q: 4 }, vol: 0.12, pan: -0.3 }))),
  at(2.0, servo(true)), at(2.9, servo(true)), at(6.7, servo(false)), at(7.8, servo(false)), at(8.85, clink()),
  [3.6, 9.5].map(drip))
sfx("last_cup_iso_3d", { dur: 10, vol: 0.9 },
  play("rain_glass", { vol: 0.8 }), play("city", { vol: 0.8 }), play("neon_3d", { vol: 0.85 }),
  play("hums"), play("crt"), play("robot_3d"), play("sleeper"), play("espresso"), play("theme"))
