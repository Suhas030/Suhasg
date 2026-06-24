/* ===================================================
   SUHAS G — PORTFOLIO  |  script.js
   =================================================== */

// ── NAVBAR SCROLL BEHAVIOUR ──
const navbar = document.getElementById('navbar');
const scrollUpBtn = document.getElementById('scrollUpBtn');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Solid bg on scroll
  if (y > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll-up button visibility
  if (y > 400) {
    scrollUpBtn.classList.add('visible');
  } else {
    scrollUpBtn.classList.remove('visible');
  }

  // Active nav highlight
  highlightNav();
});


// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id], div[id="achievements"]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) {
      link.classList.add('active');
    }
  });
}


// ── SMOOTH SCROLL FOR NAV ──
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.section;
    const target = document.getElementById(targetId);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});


// ── MODALS ──
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});


// ── CERT MODAL ──
function openCert(title, imgPath) {
  const modal = document.getElementById('certModal');
  const titleEl = document.getElementById('certModalTitle');
  const tagEl = document.getElementById('certModalTag');
  const imgEl = document.getElementById('certModalImg');
  const placeholder = document.getElementById('certModalPlaceholder');

  if (!modal) return;

  titleEl.textContent = title;
  tagEl.textContent = '// CERTIFICATE';

  // Try loading image — show placeholder if missing
  imgEl.src = imgPath;
  imgEl.style.display = 'none';
  placeholder.style.display = 'flex';

  imgEl.onload = () => {
    imgEl.style.display = 'block';
    placeholder.style.display = 'none';
  };
  imgEl.onerror = () => {
    imgEl.style.display = 'none';
    placeholder.style.display = 'flex';
  };

  openModal('certModal');
}


// ── SCROLL REVEAL (lightweight, no lib) ──
const revealEls = document.querySelectorAll(
  '.timeline-item, .cert-card, .ach-card, .stat-card, .skills-block, .blog-platform-card, .blog-coming'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});


// ── TERMINAL TYPEWRITER (home section) ──
const output = document.querySelector('.t-output');
if (output) {
  const lines = output.querySelectorAll('p');
  lines.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transition = 'opacity .4s ease';
    setTimeout(() => {
      p.style.opacity = '1';
    }, 400 + i * 350);
  });
}


// ── INIT ──
highlightNav();
