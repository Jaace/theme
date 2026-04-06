// Jaace Theme — Terminal animation component
// https://github.com/Jaace/theme
//
// Usage:
//   TerminalDemo.run({
//     demo: '#terminal-demo',      // selector or element
//     replay: '#terminal-replay',  // selector or element (optional)
//     examples: [
//       {
//         prompt:  'text to type at the prompt',
//         verb:    'Thinking',   // shown during spinner (e.g. 'Analysing', 'Planning')
//         sec:     3,            // spinner duration in seconds
//         result:  'outcome',    // highlighted output (short, one line)
//         label:   'Result: ',   // optional, defaults to 'Result: '
//         note:    '...',        // optional: dim explanation after result
//         footer:  '...',        // optional: muted follow-up line
//       }
//     ]
//   });
//
// Call after the DOM elements exist (bottom of <body> or DOMContentLoaded).

var TerminalDemo = (function () {

  const sparkleSeq = [
    ['\u00b7', 160], ['\u273b', 120], ['\u273d', 120], ['\u2736', 120], ['\u2733', 120],
    ['\u2722', 160], ['\u2733', 120], ['\u2736', 120], ['\u273d', 120], ['\u273b', 120]
  ];

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function run(opts) {
    const demoEl  = typeof opts.demo   === 'string' ? document.querySelector(opts.demo)   : opts.demo;
    const replayEl = typeof opts.replay === 'string' ? document.querySelector(opts.replay) : opts.replay;
    const examples = opts.examples;

    if (!demoEl) return;

    const terminalEl = demoEl.closest('.terminal');
    let paused = false;
    let running = false;

    const pausable = ms => new Promise(resolve => {
      let rem = ms, last = Date.now();
      const tick = () => {
        const now = Date.now();
        if (!paused) rem -= now - last;
        last = now;
        rem <= 0 ? resolve() : setTimeout(tick, 50);
      };
      setTimeout(tick, 50);
    });

    const gate = () => new Promise(resolve => {
      const check = () => paused ? setTimeout(check, 100) : resolve();
      check();
    });

    async function typeInto(el, text, speed) {
      for (const ch of text) {
        await gate();
        el.textContent += ch;
        await sleep(speed);
      }
    }

    const mkSpan = (parent, cls, text) => {
      const s = document.createElement('span');
      if (cls)  s.className   = cls;
      if (text) s.textContent = text;
      parent.appendChild(s);
      return s;
    };

    const addLine = cls => {
      const d = document.createElement('div');
      d.className = 't-line' + (cls ? ' ' + cls : '');
      demoEl.appendChild(d);
      return d;
    };

    const addSpacer = () => {
      const d = document.createElement('div');
      d.className = 't-spacer';
      demoEl.appendChild(d);
    };

    async function runExample(ex) {
      const promptLine = addLine();
      mkSpan(promptLine, 't-accent', '> ');
      const pt     = mkSpan(promptLine, 't-text');
      const cursor = mkSpan(promptLine, 'typing-cursor', '\u2588');

      await pausable(500);
      await typeInto(pt, ex.prompt, 40);
      cursor.remove();
      await pausable(600);

      addSpacer();
      const thinkLine = addLine();
      const sparkle   = mkSpan(thinkLine, 'sparkle-active');
      mkSpan(thinkLine, 't-muted', ex.verb + '\u2026');
      const ts = mkSpan(thinkLine, 't-dim');

      let sparkleActive = true, sFrame = 0;
      const tickSparkle = () => {
        if (!sparkleActive) return;
        if (paused) { setTimeout(tickSparkle, 50); return; }
        const [ch, ms] = sparkleSeq[sFrame % sparkleSeq.length];
        sparkle.textContent = ch + ' ';
        sFrame++;
        setTimeout(tickSparkle, ms);
      };
      tickSparkle();

      for (let s = 1; s <= ex.sec; s++) {
        await pausable(1000);
        ts.textContent = s < ex.sec ? ` (${s}s)` : ` (thought for ${s}s)`;
        if (s === ex.sec) {
          sparkleActive = false;
          sparkle.textContent = '\u273b ';
          sparkle.className = 'sparkle-done';
        }
      }

      await pausable(400);
      addSpacer();

      const recLine = addLine();
      const bullet  = mkSpan(recLine, 't-accent');
      const rl      = mkSpan(recLine, 't-label');
      const rv      = mkSpan(recLine, 't-accent');
      const rat     = mkSpan(recLine, 't-dim');
      await typeInto(bullet, '\u23fa ', 20);
      await typeInto(rl, ex.label || 'Result: ', 20);
      await typeInto(rv, ex.result, 20);
      if (ex.note) await typeInto(rat, ` \u2014 ${ex.note}`, 20);

      if (ex.footer) {
        addSpacer();
        const footerLine = addLine('t-muted');
        await typeInto(mkSpan(footerLine), '  ' + ex.footer, 20);
      }
    }

    async function runAll() {
      running = true;
      if (replayEl) replayEl.style.display = 'none';

      for (let i = 0; i < examples.length; i++) {
        demoEl.innerHTML  = '';
        demoEl.style.opacity = '1';
        await runExample(examples[i]);
        if (i < examples.length - 1) {
          await pausable(4000);
          demoEl.style.opacity = '0';
          await pausable(300);
        }
      }

      await pausable(2000);
      if (replayEl) replayEl.style.display = 'block';
      running = false;
    }

    if (terminalEl) {
      new IntersectionObserver(entries => {
        paused = !entries[0].isIntersecting;
      }, { threshold: 0.3 }).observe(terminalEl);
    }

    if (replayEl) {
      replayEl.addEventListener('click', () => { if (!running) runAll(); });
    }

    runAll();
  }

  return { run };

})();
