# chirp

**Game sound effects and music as code.** Write a small `.cx.js` file of tones, noise, envelopes
and patterns; chirp synthesizes WAV/OGG for every sound, chiptune songs that loop seamlessly, and
audio-sprite banks with JSON for Howler.js and Phaser. A live player rebuilds on save and plays
what you just changed.

Built for AI agents (it ships as a Claude Code skill). An agent can't hear, so every build also
writes a **waveform + spectrogram preview** and `chirp info` prints **levels, clipping and the pitch
over time**: the agent reads its sounds the way it reads its code.

Sibling of [**vex**](https://github.com/uilianks/vex) (vector art) and inspired by
[**claude-pxl**](https://github.com/crsolver/claude-pxl) (pixel art), with the same architecture:
sandboxed source files, lazy cached builds, errors with exact locations, and a live viewer.

## Showcase

Everything here is synthesized from code in [`showcase/`](showcase/). No samples, no recordings.

### LAST CUP: a soundtrack for the vex noir scene

[![LAST CUP soundscape](docs/media/last_cup.png)](docs/media/last_cup_with_sound.mp4)

▶ **[Watch the scene with sound](docs/media/last_cup_with_sound.mp4)** · [ambience OGG](docs/media/last_cup_ambience.ogg) ·
source: [`last_cup.cx.js`](showcase/last_cup.cx.js)

Rain on the glass with droplet plinks, a distant city drone and a far-off siren, the faint 15.7 kHz
whine of an old CRT, a tired electric piano in A minor, and the neon sign's buzz, which **cuts out on
exactly the video frames where its dying letter flickers off**:

![neon buzz dropping out on frames 3-4, 9 and 15-16](docs/media/neon.png)

### Forest Kit: the sounds of the vex platformer pack

[![Forest Kit sound bank](docs/media/forest_sfx_bank.png)](docs/media/forest_sfx_bank.mp4)

▶ **[Listen to all 22 sounds](docs/media/forest_sfx_bank.mp4)** · [bank OGG](docs/media/forest_sfx_bank.ogg) ·
source: [`forest_kit.cx.js`](showcase/forest_kit.cx.js)

Jump, double jump, landing, footsteps (3 takes), coin, gem, heart, potion glugs, key, creaking
chest, hurt, slime, bat flap and screech, a seamless torch-crackle loop, UI sounds, and win and
game-over jingles, packed as one audio sprite with JSON offsets.

[![Forest theme](docs/media/forest_theme.png)](docs/media/forest_theme.mp4)

▶ **[Listen to the forest theme](docs/media/forest_theme.mp4)** · [OGG](docs/media/forest_theme.ogg):
a 16-bar AABA chiptune loop. Pulse lead with delayed vibrato, arpeggiated chords and triangle
bass, all built from chord names with a few lines of JS.

| coin | jump | chest_open |
|---|---|---|
| ![](docs/media/coin.png) | ![](docs/media/jump.png) | ![](docs/media/chest_open.png) |

## Quick start

```bash
git clone https://github.com/uilianks/chirp && cd chirp
npm install
node bin/chirp.js build examples/basics.cx.js        # -> examples/out/
node bin/chirp.js serve showcase/all.cx.js           # live player on http://127.0.0.1:4330
```

```js
sfx("coin", { vol: 0.45 },
  tone({ wave: "square", freq: "B5", dur: 0.055, duty: 0.25 }),
  at(0.055, tone({ wave: "square", freq: "E6", dur: 0.18, duty: 0.25 })))
sfx("coin_big", { base: "coin", pitch: -5 })

sfx("explosion", { fx: [crush({ bits: 8 }), drive({ amount: 1.6 })] },
  noise({ color: "brown", dur: 0.5, filter: { type: "lp", from: 4000, to: 150 } }),
  tone({ wave: "sine", freq: 110, to: 35, dur: 0.4 }))

inst("lead", { wave: "square", duty: 0.25, env: [0.004, 0.1, 0.55, 0.07] })
song("theme", { bpm: 140 },
  track("lead", "E5 . G5 . C6 - B5 . | A5 . G5 . E5 - - ."),
  track("kick", "x . . . x . . ."), track("hat", ". x . x . x . x"))

bank("game_sfx", ["coin*", "explosion"])
```

```
$ chirp info sounds.cx.js coin
sfx coin: 0.4s  peak -6.8 dBFS  rms -16.79 dBFS  brightness 5196 Hz
pitch: B5 (988Hz -16dB) @0s → E6 (1318Hz -15dB) @0.05s
```

## Features

- **Voices:** band-limited square (with duty), saw, triangle, sine, white/pink/brown noise, chip
  sample-and-hold noise; ADSR envelopes, pitch slides, arpeggios, vibrato, tremolo, sweeping filters.
- **Effects:** delay (with ping-pong), Freeverb-style reverb, bitcrush, drive, filter sweeps.
- **Music:** instruments (voice options or functions), built-in drum kit, tracker-style patterns
  with chords, holds, accents and swing. Songs loop seamlessly by default.
- **Reuse:** variants (`base` + `pitch`), `play()` to layer sounds, `at()` for timing, JS for everything else.
- **Game output:** WAV, OGG (`--ogg`, via ffmpeg), audio-sprite banks + Howler JSON. Silent tails are
  trimmed and loop tails wrap onto the start.
- **Agent ears:** spectrogram previews, `chirp info` pitch traces, clipping warnings, located errors.
- **Live player:** rebuilds on save, auto-plays the edited sound, loops, solos layers.

Agent workflow: [SKILL.md](SKILL.md) · Full API: [reference.md](reference.md)

## Use as a Claude Code skill

```bash
git clone https://github.com/uilianks/chirp ~/.claude/skills/chirp-game-audio
cd ~/.claude/skills/chirp-game-audio && npm install
```

Requires Node ≥ 22.18. `npm run check` typechecks and runs the tests.

## License

[MIT](LICENSE). Portions adapted from [claude-pxl](https://github.com/crsolver/claude-pxl)
(MIT, © crsolver), via vex.
