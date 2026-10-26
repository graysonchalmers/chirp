// Swamp UI sounds: woody, wet, soft. Hover, click, confirm, cancel, notify, bar low warning.
sfx("ui_hover", { vol: 0.35 }, tone({ wave: "sine", freq: "E5", to: "G5", slide: 0.03, dur: 0.03, env: [0.002, 0.03, 0, 0.03] }))
sfx("ui_click", { vol: 0.6 },
  tone({ wave: "sine", freq: 520, to: 300, slide: 0.03, dur: 0.03, env: [0.001, 0.04, 0, 0.04] }),
  noise({ color: "pink", dur: 0.02, env: [0.001, 0.015, 0, 0.02], filter: { type: "bp", cutoff: 2200, q: 2 }, vol: 0.3 }))
sfx("ui_confirm", { vol: 0.45, fx: [reverb({ mix: 0.2 })] },
  tone({ wave: "fm", freq: "C5", fm: { ratio: 2, index: 1.5, decay: 0.2 }, dur: 0.08, env: [0.002, 0.1, 0.3, 0.1] }),
  at(0.08, tone({ wave: "fm", freq: "G5", fm: { ratio: 2, index: 1.5, decay: 0.2 }, dur: 0.16, env: [0.002, 0.12, 0.3, 0.2] })))
sfx("ui_cancel", { vol: 0.5 },
  tone({ wave: "triangle", freq: "E4", dur: 0.07, env: [0.002, 0.06, 0.3, 0.05] }),
  at(0.08, tone({ wave: "triangle", freq: "B3", dur: 0.12, env: [0.002, 0.1, 0.2, 0.1] })))
sfx("ui_notify", { vol: 0.4, fx: [reverb({ mix: 0.3 }), delay({ time: 0.15, feedback: 0.25, mix: 0.2 })] },
  tone({ wave: "sine", freq: "A5", dur: 0.08, env: [0.005, 0.1, 0.4, 0.3] }),
  at(0.1, tone({ wave: "sine", freq: "E6", dur: 0.12, env: [0.005, 0.1, 0.4, 0.4] })))
sfx("ui_low", { vol: 0.5 },
  tone({ wave: "square", duty: 0.3, freq: "A3", dur: 0.1, env: [0.003, 0.05, 0.6, 0.05], filter: { type: "lp", cutoff: 1200 } }),
  at(0.16, tone({ wave: "square", duty: 0.3, freq: "A3", dur: 0.1, env: [0.003, 0.05, 0.6, 0.05], filter: { type: "lp", cutoff: 1200 } })))
bank("swamp_ui", ["ui_*"])
