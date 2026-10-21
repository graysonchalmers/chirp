// LAST CUP: the sound of the vex noir scene. Everything loops in exactly 10 s, the length of
// the video, and the neon buzz drops out on the same frames the sign's dying letter does.

const LOOP = 10

// Rain on the glass: a wide hiss, low body, and droplets plinking at random.
sfx("rain", { dur: LOOP, loop: true },
  noise({ color: "pink", dur: LOOP + 0.5, env: [0.3, 0, 1, 0.3], filter: { type: "lp", cutoff: 5200 }, vol: 0.32, pan: -0.15 }),
  noise({ color: "pink", dur: LOOP + 0.5, env: [0.3, 0, 1, 0.3], filter: { type: "hp", cutoff: 2400 }, vol: 0.12, pan: 0.25, seed: 3 }),
  noise({ color: "brown", dur: LOOP + 0.5, env: [0.3, 0, 1, 0.3], filter: { type: "lp", cutoff: 400 }, vol: 0.35 }),
  (() => {
    const r = rng(11)
    return Array.from({ length: 70 }, (_, i) => at(r() * LOOP, tone({
      wave: "sine", freq: 1800 + r() * 3200, to: 1500 + r() * 1500, slide: 0.02, dur: 0.008,
      env: [0, 0.01, 0, 0.03], vol: 0.04 + r() * 0.08, pan: r() * 1.6 - 0.8, seed: 200 + i,
    })))
  })())

// The city beyond: a low drone and a siren far, far away.
sfx("city", { dur: LOOP, loop: true, fx: [reverb({ size: 0.9, damp: 0.6, mix: 0.5 })] },
  noise({ color: "brown", dur: LOOP + 0.5, env: [0.5, 0, 1, 0.5], filter: { type: "lp", cutoff: 180 }, vol: 0.5 }),
  at(2.5, tone({ wave: "sine", freq: 720, dur: 5, vibrato: { rate: 0.6, depth: 2.4 }, env: [1.5, 0, 1, 2], vol: 0.025, pan: 0.6 })))

// Neon buzz: mains hum + transformer rasp. Dark on frames 3-4, 9 and 15-16 of every 24 (12 fps),
// re-striking with a tick, exactly like the sign in the picture.
const DEAD = [[3, 5], [9, 10], [15, 17]].map(([a, b]) => [a / 12, b / 12])
const lit = [[0, DEAD[0][0]], [DEAD[0][1], DEAD[1][0]], [DEAD[1][1], DEAD[2][0]], [DEAD[2][1], 2]]
sfx("neon", { dur: 2, loop: true },
  lit.map(([a, b]) => at(a, [
    tone({ wave: "saw", freq: 120, dur: b - a, env: [0.004, 0, 1, 0.004], filter: { type: "bp", cutoff: 900, q: 0.7 }, vol: 0.11, pan: -0.5 }),
    tone({ wave: "square", freq: 60, dur: b - a, env: [0.004, 0, 1, 0.004], filter: { type: "lp", cutoff: 300 }, vol: 0.05, pan: -0.5 }),
    noise({ dur: 0.006, env: [0, 0.006, 0, 0.01], filter: { type: "hp", cutoff: 3000 }, vol: 0.18, pan: -0.5 }),   // re-strike tick
  ])))

// The CRT at the bar: the faint 15.7 kHz flyback whine of old tube screens.
sfx("crt", { dur: LOOP, loop: true }, tone({ wave: "sine", freq: 15734, dur: LOOP + 0.2, env: [0.1, 0, 1, 0.1], vol: 0.006, pan: 0.7 }))

// A tired electric piano, three bars of A minor, slow tremolo, a lot of room.
inst("epiano", (f, dur, accent) => [
  tone({ wave: "sine", freq: f, dur, env: [0.004, 1.2, 0.35, 1.4], tremolo: { rate: 4.2, depth: 0.25 }, vol: accent ? 0.18 : 0.14 }),
  tone({ wave: "triangle", freq: f * 2, dur, env: [0.002, 0.25, 0.08, 0.6], vol: 0.03 }),
])
inst("upright", { wave: "triangle", env: [0.01, 0.4, 0.5, 0.5], vol: 0.3, filter: { type: "lp", cutoff: 500 } })
song("noir_theme", { bpm: 72, bars: 3, fx: [reverb({ size: 0.85, damp: 0.5, mix: 0.35 }), delay({ time: 0.62, feedback: 0.25, mix: 0.12 })] },
  // Am9 | Fmaj7 | E7(b9), 4 steps per beat
  track("epiano", "A3+C4+E4+G4+B4 - - - - - - - . . . . E5 - - . | . . . . . . . . . . . . . . . . " +
                  "F3+A3+C4+E4 - - - - - - - . . . . C5 - - . | D5 - - - . . . . . . . . . . . . " +
                  "E3+G#3+D4+F4 - - - - - - - . . . . B4 - - - | - - - - . . . . . . . . . . . ."),
  track("upright", "A1 - - - - - - - . . . . . . . . | . . . . . . . . . . . . E2 - - . | " +
                   "F1 - - - - - - - . . . . . . . . | . . . . . . . . . . . . C2 - - . | " +
                   "E1 - - - - - - - . . . . . . . . | . . . . . . . . . . . . B1 - - ."))

// The full mix for the video.
sfx("last_cup", { dur: LOOP, loop: true, vol: 0.9 },
  play("rain", { vol: 0.72 }),
  play("city", { vol: 0.8 }),
  [0, 2, 4, 6, 8].map((t) => at(t, play("neon", { vol: 0.8 }))),
  play("crt"),
  play("noir_theme", { vol: 1.05 }))
