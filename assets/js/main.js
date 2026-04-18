// Les 4 Mâts · comportements UI
(() => {
  const body = document.body;
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const overlay = document.getElementById('navOverlay');

  // --- Header state on scroll ---
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

  // --- Burger menu toggle ---
  function closeMenu() {
    body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  }
  function openMenu() {
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
  // close on overlay link click
  if (overlay) {
    overlay.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeMenu);
    });
  }
  // close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) closeMenu();
  });

  // --- Reveal on scroll ---
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

  // --- Dynamic reservation moment ---
  // Maj le texte de la section Réserver selon l'heure et le jour.
  // Ouvert mardi → dimanche · fermé lundi · Déjeuner 12h-14h30 · Dîner 19h-23h
  function getReservationMoment() {
    const now = new Date();
    const day = now.getDay();          // 0 dim, 1 lun, 2 mar, ... 6 sam
    const t = now.getHours() + now.getMinutes() / 60;

    // Lundi : toute la journée, resto fermé
    if (day === 1) return "cette semaine";

    // Dimanche tard : lundi fermé, on propose mardi
    if (day === 0 && t >= 22.5) return "pour mardi";

    // Samedi tard : lendemain = dimanche (ouvert)
    // Jours ouverts mardi→samedi : lendemain ouvert normal
    // Dimanche classique : on gère via la règle day=0 au-dessus

    // Avant 11h : encore temps pour le déjeuner
    if (t < 11) return "ce midi";

    // 11h → 14h : service du déjeuner en cours/imminent
    if (t < 14) return "ce midi";

    // 14h → 22h : on propose le dîner du soir même
    if (t < 22) return "ce soir";

    // Après 22h : service terminé, on propose demain
    // (sauf dimanche gerée ci-dessus)
    return "pour demain";
  }

  function updateReservationCTA() {
    const moment = getReservationMoment();
    document.querySelectorAll('[data-reservation-moment]').forEach((el) => {
      el.textContent = moment + ".";
    });
  }
  updateReservationCTA();
  // Refresh toutes les 5 minutes au cas où la page reste ouverte
  setInterval(updateReservationCTA, 5 * 60 * 1000);

  // --- Smooth scroll for in-page anchors with header offset compensation ---
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
