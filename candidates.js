
// ===== GLOBAL LOGIC (Cursor, Nav, Footer) =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
let cursorVisible = false;

const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches || ('ontouchstart' in window);

if (!isTouchDevice() && cursor && cursorDot) {
  cursor.style.opacity = '0';
  cursorDot.style.opacity = '0';

  document.addEventListener('mousemove', e => {
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
      curX = e.clientX;
      curY = e.clientY;
    }
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
} else if (cursor && cursorDot) {
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
}

const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => { 
    navbar.classList.toggle('scrolled', window.scrollY > 60); 
  });
}

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) { 
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)'; 
      spans[1].style.opacity = '0'; 
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)'; 
    }
    else { 
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; }); 
    }
  });
}

const dt = document.querySelector('.dropdown-toggle');
const nd = document.querySelector('.nav-dropdown');
if (dt && nd) { 
  dt.addEventListener('click', e => { 
    if (window.innerWidth <= 768) { 
      e.preventDefault(); 
      const io = nd.classList.toggle('mobile-open'); 
      const a = dt.querySelector('.arrow'); 
      if (a) a.classList.toggle('rotated', io); 
    } 
  }); 
}

// ===== CANDIDATES CARD LOGIC =====
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      
      const cell = e.target.closest('.candidate-cell');
      if (cell && !cell.dataset.hintShown) {
        cell.dataset.hintShown = 'true';
        setTimeout(() => {
          cell.classList.add('flipped');
          setTimeout(() => cell.classList.remove('flipped'), 800);
        }, 500); 
      }
      
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.candidate-card').forEach((c, i) => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(28px)';
  c.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  ro.observe(c);
});

document.querySelectorAll('.candidate-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const isFlipped = cell.classList.contains('flipped');
    document.querySelectorAll('.candidate-cell').forEach(c => c.classList.remove('flipped'));
    if (!isFlipped) {
      cell.classList.add('flipped');
    }
  });
});
