// Sounds for kiln's swamp-kit mangrove_roots: canopy ambience loop + root splash, leaf rustle, branch creak.
// ambience: lapping water around the roots, leaves stirring, a far bird
sfx("mangrove_ambience", { dur: 8, loop: true, vol: 1.2, fx: [reverb({ mix: 0.3 })] },
  noise({ color: "pink", dur: 8.5, filter: { type: "lp", cutoff: 2500 }, tremolo: { rate: 0.25, depth: 0.6 }, vol: 0.12 }),
  ...[0.7, 2.6, 4.4, 6.5].map((t) => at(t, noise({ color: "brown", dur: 0.5, env: [0.1, 0.2, 0.3, 0.3], filter: { type: "lp", from: 900, to: 300 }, vol: 0.35 }))),
  ...[3.1, 3.35].map((t, i) => at(t, tone({ wave: "sine", freq: i ? "A6" : "E6", to: i ? "E6" : "A6", slide: 0.15, dur: 0.15, env: [0.01, 0.05, 0.6, 0.08], vol: 0.06 }))))

// something drops off a root into the water: plop + splash spray
sfx("root_splash", { vol: 0.6, fx: [reverb({ mix: 0.2 })] },
  tone({ wave: "sine", freq: 300, to: 900, slide: 0.04, dur: 0.05, env: [0.001, 0.04, 0, 0.04] }),
  noise({ color: "white", dur: 0.25, env: [0.005, 0.1, 0.3, 0.15], filter: { type: "bp", from: 3000, to: 1200, q: 1 }, vol: 0.5 }))

// leaf rustle: a few fast filtered noise bursts
sfx("leaf_rustle", { vol: 0.8 },
  ...[0, 0.07, 0.15, 0.21].map((t, i) => at(t, noise({ color: "white", dur: 0.06, env: [0.01, 0.03, 0.3, 0.04], filter: { type: "hp", cutoff: 3000 + i * 400 }, vol: 0.5 }))))

// branch creak: low groaning saw
sfx("branch_creak", { vol: 1.1 },
  tone({ wave: "saw", freq: 140, to: 120, slide: 0.5, dur: 0.5, env: [0.05, 0.1, 0.8, 0.1], tremolo: { rate: 24, depth: 0.7 }, filter: { type: "bp", cutoff: 600, q: 4 } }))
