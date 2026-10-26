// Sounds paired to pxl swamp VFX (pxl trials/2026-10-26-swamp-vfx).
// sparkle burst: bright FM chime arpeggio with a shimmer tail
sfx("fx_sparkle", { vol: 0.25, fx: [reverb({ mix: 0.35 }), delay({ time: 0.09, feedback: 0.3, mix: 0.25 })] },
  tone({ wave: "fm", freq: "E6", fm: { ratio: 3.5, index: 2, decay: 0.15 }, dur: 0.12, env: [0.001, 0.1, 0.2, 0.2] }),
  at(0.05, tone({ wave: "fm", freq: "B6", fm: { ratio: 3.5, index: 1.5, decay: 0.15 }, dur: 0.12, env: [0.001, 0.1, 0.2, 0.25], vol: 0.7 })),
  at(0.1, tone({ wave: "sine", freq: "E7", dur: 0.3, env: [0.001, 0.2, 0.1, 0.3], tremolo: { rate: 18, depth: 0.6 }, vol: 0.4 })))
// splash: plop (falling sine) + wet noise spray + two droplet ticks
sfx("fx_splash", { vol: 0.35, fx: [reverb({ mix: 0.25 })] },
  tone({ wave: "sine", freq: 380, to: 120, slide: 0.08, curve: "exp", dur: 0.1, env: [0.001, 0.08, 0.2, 0.06] }),
  noise({ color: "white", dur: 0.3, env: [0.005, 0.12, 0.15, 0.15], filter: { type: "bp", from: 3000, to: 900, q: 1.2 }, vol: 0.5 }),
  at(0.18, tone({ wave: "sine", freq: 1400, to: 2200, slide: 0.03, dur: 0.03, env: [0.001, 0.03, 0, 0.03], vol: 0.3 })),
  at(0.27, tone({ wave: "sine", freq: 1100, to: 1900, slide: 0.03, dur: 0.03, env: [0.001, 0.03, 0, 0.03], vol: 0.25 })))
// smoke puff: soft low whoosh
sfx("fx_smoke", { vol: 2.4, fx: [reverb({ mix: 0.3 })] },
  noise({ color: "pink", dur: 0.6, env: [0.08, 0.2, 0.3, 0.3], filter: { type: "lp", from: 500, to: 1600 }, vol: 0.7 }))
// fireflies: tiny random-feeling twinkles (loop)
sfx("fx_fireflies", { dur: 4, loop: true, vol: 0.9, fx: [reverb({ mix: 0.4 })] },
  ...[0.3, 1.1, 1.7, 2.6, 3.3].map((t, i) => at(t, tone({ wave: "sine", freq: ["A6", "E7", "C#7", "F#6", "B6"][i], dur: 0.05, env: [0.002, 0.05, 0, 0.1], vol: 0.5 }))))
// wisp: eerie detuned hum that breathes (loop)
sfx("fx_wisp", { dur: 4, loop: true, vol: 0.5, fx: [reverb({ mix: 0.45 })] },
  tone({ wave: "sine", freq: "D4", dur: 4, env: [0.5, 0, 1, 0.5], tremolo: { rate: 0.5, depth: 0.6 }, vibrato: { rate: 5, depth: 0.15 }, vol: 0.3 }),
  tone({ wave: "triangle", freq: "D#4", dur: 4, env: [0.8, 0, 1, 0.5], tremolo: { rate: 0.75, depth: 0.7 }, vol: 0.12 }),
  tone({ wave: "sine", freq: "A5", dur: 4, env: [1, 0, 1, 0.8], tremolo: { rate: 1, depth: 0.9 }, vol: 0.05 }))
