// Sounds for kiln's swamp-kit glow_toadstools: ambient glow hum loop + squish, spore puff, drip.
// ambient: low swamp air + a soft shimmering pad that breathes with the glow
sfx("toadstool_ambience", { dur: 8, loop: true, vol: 0.5, fx: [reverb({ mix: 0.35 })] },
  noise({ color: "brown", dur: 8.5, filter: { type: "lp", cutoff: 600 }, vol: 0.25 }),
  tone({ wave: "sine", freq: "D4", dur: 8, env: [1.5, 0, 1, 1.5], tremolo: { rate: 0.25, depth: 0.5 }, vol: 0.12 }),
  tone({ wave: "sine", freq: "A4", dur: 8, env: [2, 0, 1, 1.5], tremolo: { rate: 0.375, depth: 0.6 }, vol: 0.08 }),
  tone({ wave: "triangle", freq: "F#5", dur: 8, env: [2.5, 0, 1, 1.5], vibrato: { rate: 4, depth: 0.1 }, tremolo: { rate: 0.125, depth: 0.8 }, vol: 0.04 }))

// stepping on a cap: wet low thump + filtered noise squelch
sfx("toadstool_squish", { vol: 0.6 },
  tone({ wave: "sine", freq: 140, to: 60, slide: 0.12, dur: 0.12, env: [0.002, 0.08, 0.3, 0.06] }),
  noise({ color: "pink", dur: 0.18, env: [0.005, 0.1, 0.3, 0.08], filter: { type: "bp", from: 1800, to: 400, q: 3 }, vol: 0.5 }))

// spore puff: soft airy burst rising, little sparkle on top
sfx("spore_puff", { vol: 1.0, fx: [reverb({ mix: 0.25 })] },
  noise({ color: "white", dur: 0.35, env: [0.02, 0.15, 0.2, 0.2], filter: { type: "bp", from: 1200, to: 5000, q: 1.5 }, vol: 0.9 }),
  at(0.06, tone({ wave: "sine", freq: "E6", to: "B6", slide: 0.2, dur: 0.2, env: [0.01, 0.1, 0.3, 0.2], vol: 0.25 })))

// drip off a cap into the bog
sfx("cap_drip", { vol: 0.55, fx: [reverb({ mix: 0.3 })] },
  tone({ wave: "sine", freq: 900, to: 1800, slide: 0.05, curve: "exp", dur: 0.06, env: [0.001, 0.05, 0, 0.04] }),
  at(0.07, tone({ wave: "sine", freq: 500, to: 300, slide: 0.08, dur: 0.05, env: [0.001, 0.04, 0, 0.05], vol: 0.3 })))

bank("toadstools_sfx", ["toadstool_squish", "spore_puff", "cap_drip"])
