// 모든 문구. 페이지 구조는 pages.js, 문구는 여기서만 고친다.

export const COPY = {
  en: {
    spec: 'Specimen No. 01',
    plain: 'In plain words',
    axis: ['Load', 'Stretch'],
    obs: 'Observation',

    jacket: { specimen: 'SPECIMEN', material: 'Material', test: 'Test', testVal: 'Tensile', status: 'Status', statusVal: 'In progress' },

    cover: {
      head: 'Tensile test report',
      sub: 'A tensile test report<br>on one career',
      plain: 'How a polymer engineering student became a designer — written up as a lab report.',
      fig: 'Specimen, before test',
    },

    p2: {
      sec: '01 — Materials', h: 'Specimen No. 01', foot: 'Materials',
      rows: [
        ['Origin', 'B.Eng. Polymer Engineering, 2020–2026'],
        ['Initial purpose', 'Cosmetic research (color, mixing)'],
        ['Processing', 'UI/UX bootcamp, 2025.02–2025.08 (6 months)'],
        ['Current application', 'Web designer at TK C&amp;CO, since 2025.11'],
        ['Test method', 'Tensile test — pull, and watch what changes'],
      ],
      keyHead: 'How to read this report',
      key: [
        ['Specimen', 'Me'],
        ['Load', 'New challenges'],
        ['Stretch', 'How much I changed'],
        ['Elastic', 'Stretched, but bounced back'],
        ['Yield point', 'Where I started growing in a new direction'],
        ['Chain alignment', 'Engineering habits, pointed at design'],
        ['Hardening', 'Aligned, and carrying more load'],
      ],
    },

    p3: {
      sec: '02 — Log 01', h: 'Elastic region', foot: 'Log 01',
      plain: 'I studied engineering. It stretched me, but I stayed the same.',
      fig: 'Pulled, then back to the original shape',
      obs: 'Load increased. Specimen stretched, but held its original form.',
    },

    spread: {
      sec: '03 — Log 02', h: 'Yield point', foot: 'Log 02',
      plain: 'I learned to code and found I needed design. Nothing broke — I started growing in a new direction.',
      yieldNote: 'Coding, 3 months<br>CSS<br>Decision: web designer',
      drawing: 'Cold drawing: chains aligning<br>Working holiday',
      obs: 'Specimen did not return to its original form. Its chains began to align with the load.',
      fig: 'Where the chains started to align',
    },

    p6: {
      sec: '04 — Discussion', h: 'Strain hardening', foot: 'Discussion',
      plain: 'Aligned chains carry more load. My engineering habits now work for design.',
      timeline: [['2025.02–08', 'UI/UX bootcamp, 6 months'], ['2025.11', 'Hired as a web designer, TK C&amp;CO'], ['2026.02', 'Graduated, Polymer Engineering']],
      obs: 'Under new loads, the specimen grew stronger.',
      loadsHead: ['Loads tested', 'Interest'],
      loads: ['Packaging', 'Web', 'Exhibition space', 'Content marketing'],
      result: 'Result', resultText: 'No loss of interest observed.',
    },

    p7: {
      sec: '05 — Future work', h: 'Test in progress', foot: 'Future work',
      plain: 'Here’s what I want to study next — the loads I’m choosing to take on.',
      obs: 'Next loads to apply — what I want to study:',
      list: ['Typography', 'Editorial design', 'Art history', '3D design', 'Sketching'],
      hyp: 'Hypothesis', hypText: 'A second process, from the beginning, will make the material stronger.',
      note: 'Note', noteText: 'The first test did not fail. It measured what I am made of.',
      running: 'Test in progress. Fracture not observed.',
    },

    p8: {
      sec: '06 — Colophon', h: 'Test record', foot: 'Colophon',
      rows: [
        ['Typefaces', 'IBM Plex Mono, Newsreader'],
        ['Paper', 'Snow 100 g, matte'],
        ['Format', 'A6, 105 × 148 mm, 8 pp.'],
        ['Printing', 'Digital'],
        ['Date', '2026.10'],
        ['Place', 'Busan'],
        ['Contact', 'Behance · Instagram'],
      ],
    },

    ui: {
      hudSub: 'Tensile lab · Bench 03 · Specimen No. 01',
      stretch: 'Stretch', load: 'Load', stage: 'Stage',
      turn: 'Turn page', open: 'Open jacket', close: 'Close report',
      prev: 'Previous page',
      hint: '← → keys · click or drag the page',
      states: [
        ['Jacket', 'Specimen sleeve', 'Pre-test'],
        ['p. 01 / 08', 'Cover', 'Ready'],
        ['p. 02–03 / 08', 'Materials · Elastic region', 'Elastic'],
        ['p. 04–05 / 08', 'Yield point', 'Yield point'],
        ['p. 06–07 / 08', 'Strain hardening · Future work', 'Hardening'],
        ['p. 08 / 08', 'Colophon', 'In progress'],
      ],
    },
  },

};
