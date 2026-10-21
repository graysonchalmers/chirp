// Forest Kit sounds: the audio half of the vex Forest Kit platformer pack.
// Chip-flavored, short, punchy; one bank for the game, one looping theme.

const blip = (freq, dur, o = {}) => tone({ wave: "square", freq, dur, env: [0.001, 0.03, 0.5, 0.05], duty: 0.25, ...o })

// ------------------------------------------------------------------ movement

sfx("jump", { vol: 0.45 },
  tone({ wave: "square", freq: 220, to: 660, slide: 0.13, dur: 0.13, env: [0.002, 0.06, 0.45, 0.06], duty: 0.5 }))
sfx("double_jump", { base: "jump", pitch: 5 })

sfx("land", { vol: 0.6 },
  noise({ color: "brown", dur: 0.04, env: [0.001, 0.05, 0, 0.04], filter: { type: "lp", cutoff: 900 } }),
  tone({ wave: "triangle", freq: 95, to: 50, dur: 0.06, env: [0.001, 0.06, 0, 0.04] }))

// Footsteps: a few takes so repetition doesn't stand out.
;[1600, 2100, 1300].forEach((cut, i) =>
  sfx("step_" + (i + 1), { vol: 0.35 },
    noise({ dur: 0.02, env: [0.001, 0.025, 0, 0.02], filter: { type: "bp", cutoff: cut, q: 1.2 }, seed: 10 + i }),
    tone({ wave: "triangle", freq: 120 + i * 15, to: 70, dur: 0.03, env: [0.001, 0.03, 0, 0.02], vol: 0.6 })))

// ------------------------------------------------------------------ pickups

sfx("coin", { vol: 0.42 },
  blip("B5", 0.055, { env: [0.001, 0.02, 0.6, 0.02] }),
  at(0.055, blip("E6", 0.18, { env: [0.001, 0.05, 0.5, 0.16] })))

sfx("gem", { vol: 0.38, fx: [reverb({ size: 0.5, mix: 0.25 })] },
  tone({ wave: "triangle", freq: "E6", dur: 0.28, arp: { notes: [0, 7, 12, 19, 24], rate: 0.035 }, env: [0.001, 0.05, 0.6, 0.15] }),
  at(0.1, tone({ wave: "sine", freq: "B6", dur: 0.05, env: [0.001, 0.05, 0.3, 0.5], vol: 0.6 })))

sfx("heart", { vol: 0.4, fx: [reverb({ size: 0.4, mix: 0.18 })] },
  ["C5", "E5", "G5", "C6"].map((n, i) => at(i * 0.06, blip(n, 0.08, { duty: 0.5, env: [0.002, 0.04, 0.6, 0.08] }))),
  at(0.24, tone({ wave: "square", freq: "E6", dur: 0.25, duty: 0.5, env: [0.002, 0.1, 0.5, 0.2], vibrato: { rate: 9, depth: 0.25 } })))

// Glugs: little sine bubbles rising, over a wet wash.
sfx("potion", { vol: 0.5 },
  [0, 0.11, 0.2, 0.31].map((t, i) =>
    at(t, tone({ wave: "sine", freq: 260 + i * 40, to: 520 + i * 60, slide: 0.07, dur: 0.07, env: [0.004, 0.05, 0.3, 0.04] }))),
  noise({ color: "pink", dur: 0.38, env: [0.03, 0.2, 0.3, 0.1], filter: { type: "lp", cutoff: 700 }, vol: 0.25 }))

sfx("key", { vol: 0.32, fx: [delay({ time: 0.07, feedback: 0.35, mix: 0.35, pingpong: true })] },
  blip("A6", 0.03, { duty: 0.125 }), at(0.05, blip("E7", 0.05, { duty: 0.125 })))

// Creaking lid, then treasure shimmer.
sfx("chest_open", { vol: 0.5, fx: [reverb({ size: 0.5, mix: 0.2 })] },
  tone({ wave: "saw", freq: 95, to: 140, dur: 0.35, env: [0.04, 0.1, 0.7, 0.08], vibrato: { rate: 23, depth: 0.6 }, filter: { type: "bp", cutoff: 700, q: 2 }, vol: 0.7 }),
  at(0.33, tone({ wave: "square", freq: "C6", to: "C7", dur: 0.4, duty: 0.25, arp: { notes: [0, 4, 7, 11], rate: 0.03 }, env: [0.002, 0.1, 0.5, 0.3], vol: 0.5 })))

// ------------------------------------------------------------------ damage and enemies

sfx("hurt", { vol: 0.5, fx: [crush({ bits: 6, rate: 12000 })] },
  tone({ wave: "square", freq: 520, to: 140, slide: 0.18, dur: 0.18, duty: 0.5, env: [0.001, 0.08, 0.5, 0.06] }),
  noise({ dur: 0.05, env: [0.001, 0.05, 0, 0.03], filter: { type: "hp", cutoff: 2000 }, vol: 0.4 }))

sfx("slime", { vol: 0.55 },
  tone({ wave: "sine", freq: 320, to: 110, dur: 0.22, env: [0.004, 0.1, 0.5, 0.08], vibrato: { rate: 18, depth: 1.2 } }),
  noise({ color: "brown", dur: 0.12, env: [0.005, 0.1, 0.2, 0.06], filter: { type: "lp", from: 1400, to: 300 }, vol: 0.5 }))

sfx("bat_flap", { vol: 1.6 },
  [0, 0.09].map((t) => at(t, noise({ dur: 0.03, env: [0.004, 0.04, 0, 0.03], filter: { type: "bp", from: 600, to: 1600, q: 1.4 } }))))

sfx("bat_screech", { vol: 0.25, fx: [delay({ time: 0.045, feedback: 0.2, mix: 0.2 })] },
  tone({ wave: "saw", freq: 2400, to: 3400, slide: 0.08, dur: 0.16, vibrato: { rate: 38, depth: 0.8 }, env: [0.004, 0.06, 0.6, 0.06], filter: { type: "hp", cutoff: 1500 } }))

// ------------------------------------------------------------------ loops

// Torch: a low roar plus random crackles. Loops seamlessly.
sfx("torch_loop", { dur: 3, loop: true, vol: 0.5 },
  noise({ color: "brown", dur: 3.4, env: [0.2, 0, 1, 0.2], filter: { type: "lp", cutoff: 900 }, vol: 0.5 }),
  (() => {
    const r = rng(7)
    return Array.from({ length: 34 }, (_, i) => at(r() * 3, noise({ dur: 0.004 + r() * 0.01, env: [0, 0.01, 0, 0.015], filter: { type: "hp", cutoff: 2500 + r() * 4000 }, vol: 0.25 + r() * 0.5, seed: 100 + i })))
  })())

// ------------------------------------------------------------------ UI

sfx("ui_select", { vol: 0.35 }, tone({ wave: "triangle", freq: "A5", dur: 0.035, env: [0.001, 0.03, 0.3, 0.03] }))
sfx("ui_confirm", { vol: 0.35 }, blip("E5", 0.05), at(0.05, blip("A5", 0.12, { env: [0.001, 0.04, 0.5, 0.1] })))
sfx("ui_back", { vol: 0.35 }, blip("A5", 0.05), at(0.05, blip("E5", 0.1, { env: [0.001, 0.04, 0.4, 0.08] })))

// ------------------------------------------------------------------ music

inst("lead", { wave: "square", duty: 0.25, env: [0.004, 0.1, 0.55, 0.07], vol: 0.24, vibrato: { rate: 5.5, depth: 0.18, delay: 0.12 } })
inst("arp", { wave: "square", duty: 0.125, env: [0.002, 0.05, 0.3, 0.03], vol: 0.07 })
inst("bass", { wave: "triangle", env: [0.003, 0.06, 0.85, 0.04], vol: 0.55 })

// Patterns are strings, so plain JS builds them: chords -> arpeggios and bass lines.
const CH = { C: ["C5", "E5", "G5"], F: ["F4", "A4", "C5"], Am: ["A4", "C5", "E5"], G: ["G4", "B4", "D5"], Em: ["E4", "G4", "B4"] }
const ROOT = { C: "C", F: "F", Am: "A", G: "G", Em: "E" }
const arpBar = (c) => Array(4).fill([CH[c][0], CH[c][1], CH[c][2], CH[c][1]].join(" ")).join(" ")
const bassBar = (c) => Array(4).fill(`${ROOT[c]}2 . ${ROOT[c]}3 .`).join(" ")
const bars = (chords, f) => chords.map(f).join(" | ")

const A = ["C", "F", "Am", "G"], B = ["Am", "F", "C", "G"]
const melA = "E5 . G5 . C6 - B5 . A5 . G5 . E5 - - . | F5 . A5 . G5 - E5 . D5 . E5 . C5 - - . | E5 . G5 . C6 - B5 . A5 . C6 . D6 - - . | E6 - D6 . C6 . B5 . D6 - - - . . . ."
const melB = "A5 . . C6 B5 . A5 . E5 - - . . . . . | F5 . A5 . C6 - A5 . G5 - - - . . . . | E5 . G5 . C6 . E6 . D6 - C6 . B5 . . . | D6 - - . B5 - - . G5 - A5 . B5 - - ."
const beat = "x . . . . . . . x . . . . . . ."
const snare = ". . . . x . . . . . . . x . . ."
const hats = ". . x . . . x . . . x . . . x x"
const fill = ". . . . x . . . . . . . x . x x"

song("forest_theme", { bpm: 140, vol: 0.7, fx: [reverb({ size: 0.35, mix: 0.12 })] },
  track("lead", [melA, melA, melB, melA].join(" | ")),
  track("arp", [A, A, B, A].map((s) => bars(s, arpBar)).join(" | ")),
  track("bass", [A, A, B, A].map((s) => bars(s, bassBar)).join(" | ")),
  track("kick", beat),
  track("snare", Array(15).fill(snare).join(" | ") + " | " + fill),
  track("hat", hats, { vol: 0.8 }))

song("jingle_win", { bpm: 160, loop: false, vol: 0.7, fx: [reverb({ size: 0.4, mix: 0.18 })] },
  track("lead", "C5 E5 G5 C6 . G5 C6 - - - E6 - - - - - . ."),
  track("arp", "C4+E4+G4 . . . . . . . . . C5+E5+G5 - - - - - . ."),
  track("bass", "C3 . . . G2 . . . C3 . . . . . . ."))

song("jingle_gameover", { bpm: 90, loop: false, vol: 0.7, fx: [reverb({ size: 0.6, mix: 0.25 })] },
  track("lead", "G5 - . F5 - . E5 - . D5 - . C5 - - - - - - -", { gate: 0.95 }),
  track("bass", "C3 - - - - - B2 - - - - - A2 - - - - - G2 - - - - - -"))

bank("forest_sfx", ["jump", "double_jump", "land", "step_*", "coin", "gem", "heart", "potion", "key", "chest_open",
  "hurt", "slime", "bat_*", "torch_loop", "ui_*", "jingle_*"])
