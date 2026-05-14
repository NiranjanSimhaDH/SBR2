/* =============================================
   SOUTH BLOC REPORTS — script.js
   ============================================= */

/* ══ SUPABASE CONFIG ══ */
const SUPABASE_URL = window.CONFIG?.SUPABASE_URL;
const SUPABASE_KEY = window.CONFIG?.SUPABASE_KEY;
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ==================== CUSTOM CURSOR (desktop only) ==================== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
  ('ontouchstart' in window);

if (!isTouchDevice()) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
} else {
  /* Hide cursor elements on touch devices */
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
}

/* ==================== LIVE TIME ==================== */
function updateTime() {
  const now = new Date();

  // Format: DD MMM YYYY | HH:MM:SS
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timeStr = `${day} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
  const el = document.getElementById('liveTime');
  if (el) el.textContent = timeStr;

  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = year;
}
updateTime();
setInterval(updateTime, 1000);

/* ==================== NAVBAR SCROLL ==================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ==================== MOBILE NAV TOGGLE ==================== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => {
      s.style.transform = ''; s.style.opacity = '';
    });
  });
});

/* ==================== STATS COUNTER ==================== */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statsObserver.observe(statsSection);

/* ==================== SCROLL REVEAL ==================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

const revealTargets = document.querySelectorAll(
  '.coverage-card, .service-node, .pub-card, .article-card, .about-grid > *'
);
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

/* Stagger coverage cards */
document.querySelectorAll('.coverage-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* ==================== ARTICLE FILTER ==================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const articleCards = document.querySelectorAll('.article-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    articleCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.classList.add('hidden');
      }
    });

    // Re-handle featured logic
    const visible = [...articleCards].filter(c => !c.classList.contains('hidden'));
    articleCards.forEach(c => c.classList.remove('featured'));
    if (visible.length > 0) visible[0].classList.add('featured');
  });
});

/* ==================== ARTICLE MODAL ==================== */
// Modal logic removed as articles now redirect to Twitter.

/* ==================== COVERAGE CARD HOVER ==================== */
document.querySelectorAll('.coverage-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.querySelector('.card-glow').style.background =
      `radial-gradient(ellipse at ${x}% ${y}%, rgba(154,138,58,0.2) 0%, transparent 70%)`;
  });
});

/* ==================== GLITCH TITLE EFFECT ==================== */
const heroTitle = document.querySelector('.hero-title');
let glitchInterval;

function glitchEffect() {
  heroTitle.classList.add('glitch');
  setTimeout(() => heroTitle.classList.remove('glitch'), 150);
}

// Random glitch
setInterval(() => {
  if (Math.random() > 0.85) glitchEffect();
}, 4000);

/* ==================== PARALLAX GRID ==================== */
// Grid is position:absolute inside .hero — no transform needed

/* ==================== ACTIVE NAV LINK ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav-active');
    }
  });
});

/* ==================== PROJECT CARD STAGGER ==================== */
document.querySelectorAll('.pub-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

/* ==================== TYPING EFFECT IN HERO EYEBROW ==================== */
// Small text scramble on load
function scrambleText(el, finalText, duration = 1000) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let frame = 0;
  const totalFrames = Math.floor(duration / 50);
  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (frame / totalFrames > i / finalText.length) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    frame++;
    if (frame > totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 50);
}

window.addEventListener('load', () => {
  const secureLabel = document.querySelector('.hero-eyebrow .mono:last-child');
  if (secureLabel) {
    setTimeout(() => scrambleText(secureLabel, 'SECURE FEED ACTIVE', 1200), 600);
  }
});

/* ==================== SBR DIFFERENTIATOR SLIDER ==================== */
const diffSlides = document.querySelectorAll('.diff-slide');
const diffDots = document.querySelectorAll('.diff-dot');
const diffNext = document.getElementById('diffNext');
const diffPrev = document.getElementById('diffPrev');
const diffProgress = document.getElementById('diffProgress');

let currentDiffSlide = 0;
let diffAutoPlay;
const diffDuration = 8000; // 8 seconds per slide

function showDiffSlide(index) {
  // Remove active classes
  diffSlides.forEach(s => s.classList.remove('active'));
  diffDots.forEach(d => d.classList.remove('active'));

  // Update current index
  currentDiffSlide = (index + diffSlides.length) % diffSlides.length;

  // Add active classes
  diffSlides[currentDiffSlide].classList.add('active');
  diffDots[currentDiffSlide].classList.add('active');

  // Reset and restart progress bar
  resetDiffProgress();
}

function resetDiffProgress() {
  diffProgress.style.transition = 'none';
  diffProgress.style.width = '0%';

  // Force reflow
  void diffProgress.offsetWidth;

  diffProgress.style.transition = `width ${diffDuration}ms linear`;
  diffProgress.style.width = '100%';
}

function nextDiffSlide() {
  showDiffSlide(currentDiffSlide + 1);
  restartDiffAutoPlay();
}

function prevDiffSlide() {
  showDiffSlide(currentDiffSlide - 1);
  restartDiffAutoPlay();
}

function restartDiffAutoPlay() {
  clearInterval(diffAutoPlay);
  diffAutoPlay = setInterval(nextDiffSlide, diffDuration);
}

// Event Listeners
if (diffNext) diffNext.addEventListener('click', nextDiffSlide);
if (diffPrev) diffPrev.addEventListener('click', prevDiffSlide);

diffDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showDiffSlide(i);
    restartDiffAutoPlay();
  });
});

// Initialize
if (diffSlides.length > 0) {
  showDiffSlide(0);
  restartDiffAutoPlay();
}

/* ==================== CONSOLE EASTER EGG ==================== */
console.log('%c SOUTH BLOC REPORTS ', 'background:#0d1209;color:#c4a832;font-family:monospace;font-size:18px;font-weight:bold;padding:10px 20px;border:1px solid #9a8a3a;');
console.log('%c TERRORISM · GEO-POLITICS · WARFARE · INTELLIGENCE ', 'background:#0d1209;color:#6b5f28;font-family:monospace;font-size:11px;letter-spacing:3px;padding:5px 20px;');
console.log('%c © 2026 — Developed by Niranjan Simha DH ', 'color:#5a5438;font-family:monospace;font-size:10px;padding:4px 0;');

/* ==================== SBR ADMIN INTEGRATION ==================== */
/* Loads articles published via admin.html from Supabase into the Intel Feed grid */
async function loadAdminArticles() {
  // Fetch from Supabase
  const { data: stored, error } = await db
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database Error:', error.message, error.details);
    return;
  }

  const grid = document.getElementById('articlesGrid');
  if (!grid) return;

  // Clear previously injected dynamic articles
  grid.querySelectorAll('.article-card.dynamic').forEach(el => el.remove());

  if (!stored || !stored.length) return;

  const catMap = {
    'terrorism': 'TERRORISM', 'geo-politics': 'GEO-POLITICS',
    'intelligence': 'INTELLIGENCE', 'warfare': 'WARFARE'
  };

  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  // Separate articles into Hot (within 24h) and Cold (older)
  // 'stored' is already newest first
  const hotArticles = stored.filter(a => (now - new Date(a.created_at)) < oneDay);
  const coldArticles = stored.filter(a => (now - new Date(a.created_at)) >= oneDay);

  const createArticleEl = (article) => {
    const el = document.createElement('article');
    el.className = 'article-card dynamic';
    el.dataset.category = article.category;

    const imgHTML = article.image
      ? `<div class="article-image"><img src="${article.image}" alt="${article.headline}" /></div>`
      : '';
    const linkHTML = article.link
      ? `<a href="${article.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">Read full article</a>`
      : '';

    el.innerHTML = `
      ${imgHTML}
      <div class="article-content">
        <div class="article-category mono">${catMap[article.category] || article.category.toUpperCase()}</div>
        <div class="article-body">
          <span class="article-date mono">${article.date}</span>
          <h3>${article.headline}</h3>
          <p>${article.description}</p>
          <div class="article-actions">${linkHTML}</div>
        </div>
      </div>`;
    return el;
  };

  // 1. Append Cold articles to the bottom (below static ones)
  coldArticles.forEach(article => {
    const el = createArticleEl(article);
    grid.appendChild(el);
  });

  // 2. Prepend Hot articles to the top (above static ones)
  // We reverse the newest-first array so that the newest ends up at the very top
  hotArticles.slice().reverse().forEach(article => {
    const el = createArticleEl(article);
    grid.insertBefore(el, grid.firstChild);
  });

  /* Re-run scroll reveal on injected cards */
  if (typeof revealObserver !== 'undefined') {
    grid.querySelectorAll('.article-card.dynamic').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(card);
    });
  }

  /* Re-run filter to honour currently active button */
  const activeFilter = document.querySelector('.filter-btn.active');
  if (activeFilter && activeFilter.dataset.filter !== 'all') {
    const filter = activeFilter.dataset.filter;
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

// Initial load
window.addEventListener('DOMContentLoaded', loadAdminArticles);

// Listen for changes (Optional: Supabase has Realtime but this simple fetch works well)
window.addEventListener('focus', loadAdminArticles);
