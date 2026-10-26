// Sounds for kiln's swamp-kit lantern_post: flame ambience loop + light, lantern swing creak, chain clink.
// ambience: soft flame crackle over night air, a moth tapping the glass
sfx("lantern_ambience", { dur: 8, loop: true, vol: 1.0, fx: [reverb({ mix: 0.2 })] },
  noise({ color: "brown", dur: 8.5, filter: { type: "lp", cutoff: 400 }, vol: 0.15 }),
  noise({ color: "pink", dur: 8.5, filter: { type: "bp", cutoff: 1800, q: 1 }, tremolo: { rate: 7, depth: 0.8 }, vol: 0.05 }),
  ...[0.3, 1.1, 1.4, 2.8, 3.9, 4.2, 5.6, 6.3, 7.4].map((t, i) => at(t, noise({ color: "white", dur: 0.012, env: [0.001, 0.01, 0, 0.01], filter: { type: "hp", cutoff: 2500 + (i % 3) * 800 }, vol: 0.25 }))),
  ...[2.0, 2.15, 5.0].map((t) => at(t, tone({ wave: "sine", freq: 2300, dur: 0.02, env: [0.001, 0.015, 0, 0.03], vol: 0.06 }))))

// lighting the lantern: match strike then whoomp of flame
sfx("lantern_light", { vol: 1.2 },
  noise({ color: "white", dur: 0.12, env: [0.005, 0.08, 0.2, 0.05], filter: { type: "bp", from: 5000, to: 2500, q: 2 }, vol: 0.5 }),
  at(0.12, noise({ color: "pink", dur: 0.4, env: [0.03, 0.2, 0.3, 0.2], filter: { type: "lp", from: 300, to: 1500 }, vol: 0.7 })))

// lantern swinging on its hook: thin metal squeak
sfx("lantern_creak", { vol: 1.9 },
  tone({ wave: "saw", freq: 900, to: 760, slide: 0.3, dur: 0.3, env: [0.03, 0.05, 0.7, 0.08], tremolo: { rate: 50, depth: 0.5 }, filter: { type: "bp", cutoff: 2200, q: 6 } }))

// chain clink: two small metallic hits
sfx("chain_clink", { vol: 0.5 },
  tone({ wave: "fm", freq: 1800, fm: { ratio: 3.7, index: 5, decay: 0.15 }, dur: 0.03, env: [0.001, 0.12, 0, 0.1] }),
  at(0.09, tone({ wave: "fm", freq: 2100, fm: { ratio: 3.7, index: 4, decay: 0.12 }, dur: 0.03, env: [0.001, 0.1, 0, 0.08], vol: 0.7 })))
