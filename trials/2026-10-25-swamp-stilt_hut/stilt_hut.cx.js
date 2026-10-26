// Sounds for kiln's swamp-kit stilt_hut: night-swamp ambience loop + door creak, ladder step, floorboard creak.
// ambience: bog air, frog croaks, a lazy cricket chirp
sfx("hut_ambience", { dur: 8, loop: true, vol: 0.6, fx: [reverb({ mix: 0.3 })] },
  noise({ color: "brown", dur: 8.5, filter: { type: "lp", cutoff: 500 }, vol: 0.3 }),
  [0.4, 2.9, 3.3, 6.1].map((t, i) => at(t, tone({ wave: "square", duty: 0.3, freq: i % 2 ? 95 : 120, to: i % 2 ? 80 : 100, slide: 0.12,
    dur: 0.14, env: [0.005, 0.06, 0.4, 0.05], tremolo: { rate: 40, depth: 0.9 }, filter: { type: "lp", cutoff: 900 }, vol: 0.35 }))),
  [1.5, 1.7, 4.8, 5.0, 7.2].map((t) => at(t, tone({ wave: "sine", freq: 4200, dur: 0.08, env: [0.005, 0.03, 0.5, 0.03], tremolo: { rate: 60, depth: 1 }, vol: 0.05 }))))

// door creak: slow rasping pitch wobble
sfx("door_creak", { vol: 1.1 },
  tone({ wave: "saw", freq: 220, to: 330, slide: 0.6, dur: 0.6, env: [0.03, 0.1, 0.8, 0.12], vibrato: { rate: 18, depth: 1.5 },
    tremolo: { rate: 32, depth: 0.7 }, filter: { type: "bp", cutoff: 900, q: 4 } }))

// ladder step: hollow wooden knock
sfx("ladder_step", { vol: 0.6 },
  tone({ wave: "sine", freq: 260, to: 180, slide: 0.05, dur: 0.05, env: [0.001, 0.05, 0, 0.06] }),
  noise({ color: "pink", dur: 0.04, env: [0.001, 0.03, 0, 0.03], filter: { type: "bp", cutoff: 1500, q: 2 }, vol: 0.4 }))
sfx("ladder_step_b", { base: "ladder_step", pitch: -3 })

// floorboard creak: short squeak
sfx("board_creak", { vol: 1.2 },
  tone({ wave: "saw", freq: 480, to: 420, slide: 0.25, dur: 0.25, env: [0.02, 0.05, 0.7, 0.06], tremolo: { rate: 45, depth: 0.6 },
    filter: { type: "bp", cutoff: 1400, q: 5 } }))

bank("stilt_hut_sfx", ["door_creak", "ladder_step*", "board_creak"])
