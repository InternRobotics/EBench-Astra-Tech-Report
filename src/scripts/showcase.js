function initShowcase() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-open-case]');
    if (link) {
      if (link.dataset.openCase === 'mobile') {
        document.getElementById('mobile').scrollIntoView({ behavior: 'smooth' });
        return;
      }
      openSelectedCase(link.dataset.openCase);
    }
    const limit = e.target.closest('[data-limit]');
    if (limit) {
      document.querySelectorAll('#limits-content video').forEach((v) => {
        v.pause();
        observer.unobserve(v);
      });
      renderLimits(limit.dataset.limit);
      document
        .querySelectorAll('[data-limit]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === limit)));
    }
  });
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
}
function enhanceCaseControls(area) {
  const trio = area.querySelector('.evidence-trio');
  const tools = document.createElement('div');
  tools.className = 'demo-toolbar';
  tools.innerHTML =
    (trio
      ? '<div class="focus-switch" aria-label="Focus a model"><span>VIEW</span><button data-focus="all" aria-pressed="true">Compare all</button><button data-focus="0" aria-pressed="false">GPT-6-Astra</button><button data-focus="1" aria-pressed="false">π₀.₅</button><button data-focus="2" aria-pressed="false">OpenWAM</button></div>'
      : '') + '<button class="case-play" aria-pressed="false">Play all ▷</button>';
  const videos = area.querySelector('.case-videos');
  videos.before(tools);
  tools.addEventListener('click', async (e) => {
    const focus = e.target.closest('[data-focus]');
    if (focus) {
      trio.dataset.focus = focus.dataset.focus;
      tools
        .querySelectorAll('[data-focus]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === focus)));
      trio.querySelectorAll('.evidence-video').forEach((fig, i) => {
        const hidden = focus.dataset.focus !== 'all' && +focus.dataset.focus !== i;
        fig.hidden = hidden;
        if (hidden) fig.querySelector('video').pause();
      });
    }
    const play = e.target.closest('.case-play');
    if (play) {
      const visible = [...area.querySelectorAll('.evidence-video:not([hidden]) video')],
        start = visible.every((v) => v.paused);
      for (const v of visible) {
        if (start) {
          v.muted = true;
          try {
            await v.play();
          } catch {
            v.controls = true;
          }
        } else v.pause();
      }
      play.textContent = start ? 'Pause all Ⅱ' : 'Play all ▷';
      play.setAttribute('aria-pressed', String(start));
    }
  });
}
function kitComparisonTable(kind) {
  const general = kind === 'generalization',
    groups = general
      ? ['object', 'background', 'instruction', 'mix']
      : ['Low', 'Medium', 'High', 'Mobile', 'Fixed', 'Short Horizon', 'Long Horizon'],
    labels = general
      ? ['Object', 'Background', 'Instruction', 'Mixed']
      : ['Low', 'Medium', 'High', 'Mobile', 'Tabletop', 'Short', 'Long'];
  const cell = (v, best, metric = 'sr') =>
    `<td>${v === best ? '<strong>' : ''}${metric === 'sr' ? (v * 100).toFixed(2) + '%' : v.toFixed(4)}${v === best ? '</strong>' : ''}</td>`;
  const maxima = groups.map((g) =>
    Math.max(...reportFigures.models.map((m) => (general ? m.generalization[g] : m.groups[g]).sr)),
  );
  return `<p>${general ? 'Task-averaged success rates under object, background, instruction and mixed perturbations. These results compare the sensitivity of the evaluated models to changes in scene appearance, target objects and task specification.' : 'Overall performance and task-attribute comparisons across eight models. Success rate measures complete task execution; Score captures credited intermediate progress. The precision, mobility and horizon groups characterize where each model’s aggregate performance is gained or lost.'}</p><div class="table-scroll full-comparison" tabindex="0" role="region" aria-label="Scrollable benchmark comparison"><table><thead><tr><th rowspan="2">Model</th>${general ? '' : '<th colspan="2">Overall</th>'}${general ? '<th colspan="4">Perturbation SR</th>' : '<th colspan="3">Precision SR</th><th colspan="2">Mobility SR</th><th colspan="2">Horizon SR</th>'}</tr><tr>${general ? '' : '<th>SR</th><th>Score</th>'}${labels.map((l) => `<th>${l}</th>`).join('')}</tr></thead><tbody>${reportFigures.models.map((m) => `<tr class="${m.id === 'Astra (ICL)' ? 'highlight' : ''}"><th scope="row">${m.label}</th>${general ? '' : cell(m.sr, Math.max(...reportFigures.models.map((m) => m.sr))) + cell(m.score, Math.max(...reportFigures.models.map((m) => m.score)), 'score')}${groups.map((g, i) => cell((general ? m.generalization[g] : m.groups[g]).sr, maxima[i])).join('')}</tr>`).join('')}</tbody></table></div><p class="fineprint">${general ? 'In the mixed condition, GPT-6-Astra completes 60 of 130 episodes and OpenWAM-α completes 58.' : '26 tasks / 510 episodes per model. Precision: 14 / 8 / 4 tasks; mobility: 19 / 7; horizon: 19 / 7. Attribute groups overlap.'}</p><a class="appendix-link" href="data/report-${general ? 'generalization' : 'main-results'}.csv" download>Download source table CSV ↗</a>`;
}
