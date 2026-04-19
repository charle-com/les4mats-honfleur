(() => {
  const body = document.body;
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const overlay = document.getElementById('navOverlay');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 40) header.classList.add('scrolled');
          else header.classList.remove('scrolled');
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
  let savedScrollY = 0;
  function closeMenu() {
    body.classList.remove('menu-open');
    body.style.removeProperty('--scroll-top');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.setAttribute('aria-hidden', 'true');
      overlay.scrollTop = 0;
    }
    window.scrollTo(0, savedScrollY);
    if (burger) {
      burger.style.display = 'none';
      burger.offsetHeight;
      burger.style.display = '';
    }
  }
  function openMenu() {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    body.style.setProperty('--scroll-top', `-${savedScrollY}px`);
    body.classList.add('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
  }
  if (burger) {
    burger.addEventListener('click', () => {
      if (body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });
  }
  if (overlay) {
    overlay.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });
    const closeBtn = overlay.querySelector('.nav-overlay__close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) closeMenu();
  });
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
  const LANG = (document.documentElement.lang || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
  const MOMENTS = {
    fr: { lunch: "ce midi", tonight: "ce soir", tomorrow: "pour demain", tuesday: "pour mardi", week: "cette semaine" },
    en: { lunch: "for lunch today", tonight: "tonight", tomorrow: "tomorrow", tuesday: "on Tuesday", week: "this week" },
  };

  function getReservationMoment() {
    const now = new Date();
    const day = now.getDay();
    const t = now.getHours() + now.getMinutes() / 60;
    const m = MOMENTS[LANG];

    if (day === 1) return m.week;
    if (day === 0 && t >= 22.5) return m.tuesday;
    if (t < 14) return m.lunch;
    if (t < 22) return m.tonight;
    return m.tomorrow;
  }

  function updateReservationCTA() {
    const moment = getReservationMoment();
    document.querySelectorAll('[data-reservation-moment]').forEach((el) => {
      el.textContent = moment + ".";
    });
  }
  updateReservationCTA();
  setInterval(updateReservationCTA, 5 * 60 * 1000);
  function getLiveStatus() {
    const now = new Date();
    const day = now.getDay();
    const t = now.getHours() + now.getMinutes() / 60;
    const STATES_FR = {
      openLunch:   { state: 'is-open',   text: 'Ouvert · Service du midi' },
      openDinner:  { state: 'is-open',   text: 'Ouvert · Service du soir' },
      beforeLunch: { state: 'is-soon',   text: 'Ouvre à 12h' },
      between:     { state: 'is-soon',   text: 'Entre services · 19h' },
      afterLast:   { state: 'is-closed', text: 'Fermé · Demain 12h' },
      sundayNight: { state: 'is-closed', text: 'Fermé · Mardi 12h' },
      mondayAll:   { state: 'is-closed', text: 'Fermé · Mardi 12h' },
    };
    const STATES_EN = {
      openLunch:   { state: 'is-open',   text: 'Open · Lunch service' },
      openDinner:  { state: 'is-open',   text: 'Open · Dinner service' },
      beforeLunch: { state: 'is-soon',   text: 'Opens at 12pm' },
      between:     { state: 'is-soon',   text: 'Between services · 7pm' },
      afterLast:   { state: 'is-closed', text: 'Closed · Tomorrow 12pm' },
      sundayNight: { state: 'is-closed', text: 'Closed · Tuesday 12pm' },
      mondayAll:   { state: 'is-closed', text: 'Closed · Tuesday 12pm' },
    };
    const S = LANG === 'en' ? STATES_EN : STATES_FR;

    if (day === 1) return S.mondayAll;
    if (day === 0 && t >= 23) return S.sundayNight;
    if (day === 2 && t < 12) {
      return { state: 'is-soon', text: LANG === 'en' ? 'Opens at 12pm' : 'Ouvre à 12h' };
    }
    if (t < 12) return S.beforeLunch;
    if (t < 14.5) return S.openLunch;
    if (t < 19) return S.between;
    if (t < 23) return S.openDinner;
    return S.afterLast;
  }
  function updateLiveStatus() {
    const live = getLiveStatus();
    document.querySelectorAll('[data-live-status]').forEach((el) => {
      el.classList.remove('is-open', 'is-soon', 'is-closed');
      el.classList.add(live.state);
      const txt = el.querySelector('[data-live-status-text]');
      if (txt) txt.textContent = live.text;
    });
  }
  updateLiveStatus();
  setInterval(updateLiveStatus, 60 * 1000);
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 10;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
