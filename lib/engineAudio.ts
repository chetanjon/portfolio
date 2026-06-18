// Procedural engine + record SFX via the Web Audio API. 100% generated in code,
// so there is nothing to license and nothing to infringe. Every node is created
// lazily on a user gesture (the record-player click), which also satisfies
// browsers' autoplay policy. Fails silently if Web Audio is unavailable.

export type Engine = {
  start: () => void;
  rev: () => void;
  stop: () => void;
  dispose: () => void;
};

export function createEngine(): Engine | null {
  if (typeof window === 'undefined') return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;

  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let running = false;
  const oscs: OscillatorNode[] = [];
  const sources: AudioBufferSourceNode[] = [];
  const revTargets: OscillatorNode[] = [];

  function noiseBuffer(seconds: number, amp: number): AudioBuffer {
    const c = ctx!;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * seconds), c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * amp;
    return buf;
  }

  function needleDrop() {
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    // short low thump
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.22);
  }

  function start() {
    if (running) return;
    if (!ctx) {
      ctx = new Ctx();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') void ctx.resume();
    if (!master) return;
    running = true;

    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t);
    master.gain.linearRampToValueAtTime(0.16, t + 0.4);

    // Two detuned saws -> lowpass = engine body
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 340;
    lp.Q.value = 5;
    lp.connect(master);

    const o1 = ctx.createOscillator();
    o1.type = 'sawtooth';
    o1.frequency.value = 58;
    const o2 = ctx.createOscillator();
    o2.type = 'sawtooth';
    o2.frequency.value = 87;
    o2.detune.value = -10;
    o1.connect(lp);
    o2.connect(lp);

    // LFO wobble -> a rough, lumpy idle
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 13;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 16;
    lfo.connect(lfoGain);
    lfoGain.connect(o1.frequency);
    lfoGain.connect(o2.frequency);

    // Combustion noise bed
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer(1.5, 0.5);
    noise.loop = true;
    const nLp = ctx.createBiquadFilter();
    nLp.type = 'lowpass';
    nLp.frequency.value = 760;
    const nGain = ctx.createGain();
    nGain.gain.value = 0.1;
    noise.connect(nLp);
    nLp.connect(nGain);
    nGain.connect(master);

    // Faint vinyl crackle (ties to the record player)
    const crackle = ctx.createBufferSource();
    crackle.buffer = noiseBuffer(2, 1);
    crackle.loop = true;
    const cHp = ctx.createBiquadFilter();
    cHp.type = 'highpass';
    cHp.frequency.value = 3500;
    const cGain = ctx.createGain();
    cGain.gain.value = 0.025;
    crackle.connect(cHp);
    cHp.connect(cGain);
    cGain.connect(master);

    o1.start(t);
    o2.start(t);
    lfo.start(t);
    noise.start(t);
    crackle.start(t);
    oscs.push(o1, o2, lfo);
    sources.push(noise, crackle);
    revTargets.push(o1, o2);

    needleDrop();
  }

  function rev() {
    if (!ctx || revTargets.length === 0) return;
    const t = ctx.currentTime;
    revTargets.forEach((o, i) => {
      const base = i === 0 ? 58 : 87;
      o.frequency.cancelScheduledValues(t);
      o.frequency.setValueAtTime(base, t);
      o.frequency.exponentialRampToValueAtTime(base * 3.4, t + 0.18);
      o.frequency.exponentialRampToValueAtTime(base, t + 0.9);
    });
    if (master) {
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0.26, t + 0.18);
      master.gain.linearRampToValueAtTime(0.16, t + 0.9);
    }
  }

  function stop() {
    if (!ctx || !master) {
      running = false;
      return;
    }
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0.0001, t + 0.35);
    const stopAt = t + 0.4;
    oscs.forEach((o) => {
      try { o.stop(stopAt); } catch { /* noop */ }
    });
    sources.forEach((s) => {
      try { s.stop(stopAt); } catch { /* noop */ }
    });
    oscs.length = 0;
    sources.length = 0;
    revTargets.length = 0;
    running = false;
  }

  function dispose() {
    stop();
    if (ctx) {
      const c = ctx;
      setTimeout(() => { void c.close().catch(() => {}); }, 500);
      ctx = null;
      master = null;
    }
  }

  return { start, rev, stop, dispose };
}
