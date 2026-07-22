(() => {
  const gate = document.getElementById('gate');
  const site = document.getElementById('site');
  const subscribeBtn = document.getElementById('subscribeBtn');
  const enterBtn = document.getElementById('enterBtn');
  const gateNote = document.getElementById('gateNote');

  const STORAGE_KEY = 'emperoreal_entered';

  function unlockEnterButton() {
    enterBtn.disabled = false;
    enterBtn.classList.add('is-ready');
    gateNote.textContent = "You're in — tap \"Enter EmperoReal\" to step onto the pitch.";
    gateNote.classList.add('is-unlocked');
  }

  function enterSite() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* storage unavailable, continue anyway */ }
    gate.setAttribute('hidden', '');
    site.removeAttribute('hidden');
    window.scrollTo(0, 0);
    initReveal();
  }

  // Skip the gate for returning visitors who already confirmed.
  try {
    if (localStorage.getItem(STORAGE_KEY) === '1') {
      enterSite();
    }
  } catch (e) { /* storage unavailable, show gate as normal */ }

  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      // We can't verify the subscription itself (YouTube doesn't expose
      // that to a static site), so this runs on trust: clicking through
      // to subscribe unlocks the confirm step.
      unlockEnterButton();
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      if (!enterBtn.disabled) enterSite();
    });
  }

  // ---------- scroll reveal ----------
  function initReveal() {
    const targets = document.querySelectorAll('.card, .watch__panel, .squad__grid > div, .hero__stats, .form');
    targets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      targets.forEach(el => io.observe(el));
    } else {
      targets.forEach(el => el.classList.add('is-visible'));
    }
  }

  // ---------- contact form (front-end only placeholder) ----------
  const form = document.getElementById('joinForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = "Thanks — we've got it. We'll follow up by email.";
      form.reset();
      // NOTE: this form does not send anywhere yet. Wire it up to
      // Formspree, Getform, a mailto link, or your own backend —
      // see README.md for options.
    });
  }
})();
