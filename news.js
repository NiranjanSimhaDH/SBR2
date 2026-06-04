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
document.getElementById('currentYear').textContent = new Date().getFullYear();
window.addEventListener('scroll', () => { document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60); });
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) { spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)'; spans[1].style.opacity = '0'; spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)'; }
  else { spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; }); }
});
const dt = document.querySelector('.dropdown-toggle');
const nd = document.querySelector('.nav-dropdown');
if (dt && nd) { dt.addEventListener('click', e => { if (window.innerWidth <= 768) { e.preventDefault(); const io = nd.classList.toggle('mobile-open'); const a = dt.querySelector('.arrow'); if (a) a.classList.toggle('rotated', io); } }); }
const ro = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0) scale(1)'; ro.unobserve(e.target); } }); }, { threshold: 0.1 });
document.querySelectorAll('.news-item').forEach((c, i) => { c.style.opacity = '0'; c.style.transform = 'translateY(60px) scale(0.95)'; c.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.15}s`; ro.observe(c); });

const modal = document.getElementById('newsModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.news-modal-close');

document.querySelectorAll('.read-more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.news-item');
    const title = item.querySelector('h3').textContent;
    const content = item.querySelector('p').innerHTML;
    
    modalTitle.textContent = title;
    // Format text inside the modal
    modalBody.innerHTML = content.split('\n').filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join('');
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});
