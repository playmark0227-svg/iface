// =====================================
// iface — interactions
// =====================================
(function () {
  const header = document.getElementById('siteHeader');

  // Slide-out nav panel
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('globalNav');
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    nav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) setOpen(false);
  });

  // Page indicator
  const pageEm = document.querySelector('#pageNo em');
  const sections = document.querySelectorAll('main > section[data-page]');
  const updatePage = () => {
    if (!pageEm) return;
    const mid = window.innerHeight / 2;
    let active = '1';
    sections.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.top < mid && r.bottom > mid) active = s.dataset.page || active;
    });
    pageEm.textContent = active;
  };
  document.addEventListener('scroll', updatePage, { passive: true });
  updatePage();

  // Reveal on scroll
  const targets = document.querySelectorAll(
    '.script-eyebrow, .head-jp, .philo-title, .philo-body, .feat-list li, .pillars-grid article, .biz-card, .biz-photo, .company-list, .lead-jp, .contact-form'
  );
  targets.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('visible'));
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
