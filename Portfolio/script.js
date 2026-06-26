/* ═══════════════════════════════════════════════════
   SUHAS G — PORTFOLIO v2  |  script.js
═══════════════════════════════════════════════════ */

/* ── ELEMENTS ── */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const fabTop     = document.getElementById('fabTop');
const allNavLinks = document.querySelectorAll('.nl, .mm-link');
const sections   = document.querySelectorAll('section[id]');

/* ══════════════════════════════════════════════════
   SCROLL HANDLER
══════════════════════════════════════════════════ */
function onScroll() {
  const y = window.scrollY;

  // Solidify navbar
  nav.classList.toggle('solid', y > 30);

  // Show/hide scroll-to-top button
  fabTop.classList.toggle('visible', y > 500);

  // Highlight active nav section
  let current = '';
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top <= 90) current = sec.id;
  });
  document.querySelectorAll('.nl').forEach(a => {
    a.classList.toggle('active-link', a.dataset.s === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run on load

/* ══════════════════════════════════════════════════
   SMOOTH SCROLL — all nav links
══════════════════════════════════════════════════ */
allNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.s);
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68);
    window.scrollTo({ top: offset, behavior: 'smooth' });
    // Close mobile menu if open
    closeHamburger();
  });
});

/* ══════════════════════════════════════════════════
   HAMBURGER / MOBILE MENU
══════════════════════════════════════════════════ */
function closeHamburger() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.classList.toggle('open', isOpen);
});

// Close when clicking outside
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) closeHamburger();
});

/* ══════════════════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════════════════ */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════════
   MODALS
══════════════════════════════════════════════════ */
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-bg.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});

/* ══════════════════════════════════════════════════
   CERTIFICATE MODAL
══════════════════════════════════════════════════ */
function openCert(title, imgSrc, issuer) {
  const labelEl      = document.getElementById('certLabel');
  const imgEl        = document.getElementById('certImg');
  const placeholder  = document.getElementById('certPlaceholder');

  // Set label
  if (labelEl) labelEl.textContent = '// ' + title;

  // Try to load image
  imgEl.src = '';
  imgEl.style.display = 'none';
  placeholder.style.display = 'flex';

  const testImg = new Image();
  testImg.onload = () => {
    imgEl.src = imgSrc;
    imgEl.style.display = 'block';
    placeholder.style.display = 'none';
  };
  testImg.onerror = () => {
    imgEl.style.display = 'none';
    placeholder.style.display = 'flex';
  };
  testImg.src = imgSrc;

  openModal('certModal');
}

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('in');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ══════════════════════════════════════════════════
   TERMINAL FADE-IN
══════════════════════════════════════════════════ */
const termLines = document.querySelectorAll('.t-out p');
termLines.forEach((p, i) => {
  p.style.opacity = '0';
  p.style.transition = 'opacity .4s ease';
  setTimeout(() => { p.style.opacity = '1'; }, 600 + i * 400);
});
