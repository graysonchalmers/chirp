// Tracker-style patterns and the built-in drum kit.
import { ChirpError } from "./errors.ts";
import type { InstMake, Item, Voice, VoiceOpts } from "./model.ts";
import { freqOf } from "./util.ts";

export interface NoteEvent {
  step: number;
  /** Frequencies (several = chord); empty for drum hits. */
  freqs: number[];
  /** Steps it lasts (1 + following "-"). */
  len: number;
  accent: boolean;
}

/**
 * One token per step, separated by spaces; "|" marks bars and is ignored.
 *   C4  E#5  Bb3     a note        C4+E4+G4   a chord      x / X   a hit (drums)
 *   .               rest           -          hold the previous note one more step
 * A trailing "!" accents a note (C4!).
 */
export function parsePattern(src: string): { events: NoteEvent[]; steps: number } {
  const toks = src.split(/\s+/).filter((t) => t && t !== "|");
  const events: NoteEvent[] = [];
  let last: NoteEvent | undefined;
  toks.forEach((tok, step) => {
    if (tok === ".") { last = undefined; return; }
    if (tok === "-") {
      if (!last) throw new ChirpError(`pattern: '-' at step ${step + 1} has no note to hold`);
      last.len++;
      return;
    }
    const accent = tok.endsWith("!") || tok === "X";
    const body = tok.replace(/!$/, "");
    let freqs: number[] = [];
    if (body.toLowerCase() !== "x") {
      try { freqs = body.split("+").map((n) => freqOf(n, "note")); }
      catch (e) { throw new ChirpError(`pattern step ${step + 1}: '${tok}' is not a note, chord (C4+E4), x, . or -`); }
    }
    last = { step, freqs, len: 1, accent };
    events.push(last);
  });
  return { events, steps: toks.length };
}

const v = (kind: Voice["__voice"], opts: VoiceOpts, label: string): Voice => ({ __voice: kind, opts, step: { label } });

/** Synth drums: functions of (freq, dur, accent) like any instrument. Pitch is ignored. */
export const DRUMS: Record<string, InstMake> = {
  kick: (_f, _d, acc) => [
    v("tone", { wave: "sine", freq: 165, to: 42, slide: 0.11, dur: 0.06, env: [0.001, 0.14, 0, 0.1], vol: acc ? 1 : 0.85 }, "kick body"),
    v("noise", { dur: 0.006, env: [0, 0.006, 0, 0.01], filter: { type: "lp", cutoff: 4000 }, vol: 0.35 }, "kick click"),
  ],
  snare: (_f, _d, acc) => [
    v("noise", { dur: 0.07, env: [0.001, 0.12, 0, 0.09], filter: { type: "hp", cutoff: 1400 }, vol: acc ? 0.65 : 0.5 }, "snare noise"),
    v("tone", { wave: "triangle", freq: 200, to: 150, dur: 0.05, env: [0.001, 0.07, 0, 0.04], vol: 0.45 }, "snare body"),
  ],
  hat: (_f, _d, acc) => v("noise", { dur: 0.015, env: [0.001, 0.03, 0, 0.025], filter: { type: "hp", cutoff: 7500 }, vol: acc ? 0.35 : 0.25 }, "hat"),
  openhat: () => v("noise", { dur: 0.12, env: [0.001, 0.2, 0.2, 0.15], filter: { type: "hp", cutoff: 7000 }, vol: 0.22 }, "open hat"),
  clap: () => [0, 0.011, 0.022].map((t, i) => ({
    __at: t, step: { label: "clap" },
    items: [v("noise", { dur: i === 2 ? 0.06 : 0.008, env: [0.001, i === 2 ? 0.12 : 0.01, 0, 0.06], filter: { type: "bp", cutoff: 1200, q: 0.7 }, vol: 0.5 }, "clap")],
  })) as Item,
  tom: (_f, _d, acc) => v("tone", { wave: "sine", freq: 130, to: 75, slide: 0.18, dur: 0.1, env: [0.001, 0.2, 0, 0.12], vol: acc ? 0.95 : 0.8 }, "tom"),
};
