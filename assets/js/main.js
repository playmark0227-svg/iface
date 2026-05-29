// =====================================
// iface — interactions
// =====================================
(function () {
  // Custom cursor (dot + ring follower)
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring && !matchMedia('(hover: none)').matches) {
    let tx = -100, ty = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    });
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();
    const hoverables = 'a, button, input, textarea, select, label, .menu-toggle';
    document.querySelectorAll(hoverables).forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });
  }

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
  // close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });

  // Page indicator with two-digit display
  const pageEm = document.querySelector('#pageNo em');
  const sections = document.querySelectorAll('main > section[data-page]');
  const updatePage = () => {
    if (!pageEm) return;
    const mid = window.innerHeight / 2;
    let active = '00';
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
    '.script-eyebrow, .head-jp, .section-num, .philo-title, .philo-body, .feat-list li, .pillars-grid article, .biz-card, .biz-photo, .company-list, .lead-jp, .contact-form, .hanko'
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

  // Respect reduced motion: pause looping hero/strip video
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach((v) => {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
