// Cursor
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

// ===== INFOGRAPHIC DATA & INTERACTIVE LOGIC =====

const POLL_DATA = {
  sbr_average: {
    vance_total: 51,
    rostova_total: 59,
    segments: { vance: 47, sterling: 4, neutral: 10, rostova: 59 },
    parties: [
      { name: "Likud", sub: "// Netanyahu Coalition", seats: 23.0, bloc: "vance" },
      { name: "Together (BeYachad)", sub: "// Opposition Bloc", seats: 21.0, bloc: "rostova" },
      { name: "Yashar", sub: "// Opposition Bloc", seats: 19.0, bloc: "rostova" },
      { name: "Yisrael Beiteinu", sub: "// Opposition Bloc", seats: 10.0, bloc: "rostova" },
      { name: "The Democrats", sub: "// Opposition Bloc", seats: 9.0, bloc: "rostova" },
      { name: "Shas", sub: "// Netanyahu Coalition", seats: 9.0, bloc: "vance" },
      { name: "United Torah Judaism", sub: "// Netanyahu Coalition", seats: 8.0, bloc: "vance" },
      { name: "Otzma Yehudit", sub: "// Netanyahu Coalition", seats: 7.0, bloc: "vance" },
      { name: "Hadash-Ta'al", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Ra'am", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Religious Zionism", sub: "// Rel. Nationalist", seats: 4.0, bloc: "sterling" }
    ]
  },
  channel12: {
    vance_total: 52,
    rostova_total: 58,
    segments: { vance: 48, sterling: 4, neutral: 10, rostova: 58 },
    parties: [
      { name: "Likud", sub: "// Netanyahu Coalition", seats: 24.0, bloc: "vance" },
      { name: "Together (BeYachad)", sub: "// Opposition Bloc", seats: 21.0, bloc: "rostova" },
      { name: "Yashar", sub: "// Opposition Bloc", seats: 19.0, bloc: "rostova" },
      { name: "Yisrael Beiteinu", sub: "// Opposition Bloc", seats: 10.0, bloc: "rostova" },
      { name: "Shas", sub: "// Netanyahu Coalition", seats: 9.0, bloc: "vance" },
      { name: "The Democrats", sub: "// Opposition Bloc", seats: 8.0, bloc: "rostova" },
      { name: "United Torah Judaism", sub: "// Netanyahu Coalition", seats: 8.0, bloc: "vance" },
      { name: "Otzma Yehudit", sub: "// Netanyahu Coalition", seats: 7.0, bloc: "vance" },
      { name: "Hadash-Ta'al", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Ra'am", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Religious Zionism", sub: "// Rel. Nationalist", seats: 4.0, bloc: "sterling" }
    ]
  },
  kan_news: {
    vance_total: 52,
    rostova_total: 58,
    segments: { vance: 47, sterling: 5, neutral: 10, rostova: 58 },
    parties: [
      { name: "Together (BeYachad)", sub: "// Opposition Bloc", seats: 21.0, bloc: "rostova" },
      { name: "Likud", sub: "// Netanyahu Coalition", seats: 23.0, bloc: "vance" },
      { name: "Yashar", sub: "// Opposition Bloc", seats: 18.0, bloc: "rostova" },
      { name: "The Democrats", sub: "// Opposition Bloc", seats: 9.0, bloc: "rostova" },
      { name: "Yisrael Beiteinu", sub: "// Opposition Bloc", seats: 10.0, bloc: "rostova" },
      { name: "Shas", sub: "// Netanyahu Coalition", seats: 10.0, bloc: "vance" },
      { name: "United Torah Judaism", sub: "// Netanyahu Coalition", seats: 8.0, bloc: "vance" },
      { name: "Otzma Yehudit", sub: "// Netanyahu Coalition", seats: 6.0, bloc: "vance" },
      { name: "Hadash-Ta'al", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Ra'am", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Religious Zionism", sub: "// Rel. Nationalist", seats: 5.0, bloc: "sterling" }
    ]
  },
  i24_direct: {
    vance_total: 53,
    rostova_total: 57,
    segments: { vance: 49, sterling: 4, neutral: 10, rostova: 57 },
    parties: [
      { name: "Likud", sub: "// Netanyahu Coalition", seats: 23.0, bloc: "vance" },
      { name: "Together (BeYachad)", sub: "// Opposition Bloc", seats: 22.0, bloc: "rostova" },
      { name: "Yashar", sub: "// Opposition Bloc", seats: 18.0, bloc: "rostova" },
      { name: "Yisrael Beiteinu", sub: "// Opposition Bloc", seats: 9.0, bloc: "rostova" },
      { name: "Shas", sub: "// Netanyahu Coalition", seats: 9.0, bloc: "vance" },
      { name: "The Democrats", sub: "// Opposition Bloc", seats: 8.0, bloc: "rostova" },
      { name: "Otzma Yehudit", sub: "// Netanyahu Coalition", seats: 9.0, bloc: "vance" },
      { name: "United Torah Judaism", sub: "// Netanyahu Coalition", seats: 8.0, bloc: "vance" },
      { name: "Hadash-Ta'al", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Ra'am", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Religious Zionism", sub: "// Rel. Nationalist", seats: 4.0, bloc: "sterling" }
    ]
  },
  times_israel: {
    vance_total: 50,
    rostova_total: 60,
    segments: { vance: 46, sterling: 4, neutral: 10, rostova: 60 },
    parties: [
      { name: "Together (BeYachad)", sub: "// Opposition Bloc", seats: 21.0, bloc: "rostova" },
      { name: "Likud", sub: "// Netanyahu Coalition", seats: 23.0, bloc: "vance" },
      { name: "Yashar", sub: "// Opposition Bloc", seats: 19.0, bloc: "rostova" },
      { name: "The Democrats", sub: "// Opposition Bloc", seats: 10.0, bloc: "rostova" },
      { name: "Yisrael Beiteinu", sub: "// Opposition Bloc", seats: 10.0, bloc: "rostova" },
      { name: "Shas", sub: "// Netanyahu Coalition", seats: 9.0, bloc: "vance" },
      { name: "United Torah Judaism", sub: "// Netanyahu Coalition", seats: 8.0, bloc: "vance" },
      { name: "Otzma Yehudit", sub: "// Netanyahu Coalition", seats: 6.0, bloc: "vance" },
      { name: "Hadash-Ta'al", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Ra'am", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Religious Zionism", sub: "// Rel. Nationalist", seats: 4.0, bloc: "sterling" }
    ]
  },
  jpost_maariv: {
    vance_total: 52,
    rostova_total: 58,
    segments: { vance: 48, sterling: 4, neutral: 10, rostova: 58 },
    parties: [
      { name: "Likud", sub: "// Netanyahu Coalition", seats: 23.0, bloc: "vance" },
      { name: "Together (BeYachad)", sub: "// Opposition Bloc", seats: 20.0, bloc: "rostova" },
      { name: "Yashar", sub: "// Opposition Bloc", seats: 19.0, bloc: "rostova" },
      { name: "Yisrael Beiteinu", sub: "// Opposition Bloc", seats: 10.0, bloc: "rostova" },
      { name: "Shas", sub: "// Netanyahu Coalition", seats: 10.0, bloc: "vance" },
      { name: "The Democrats", sub: "// Opposition Bloc", seats: 9.0, bloc: "rostova" },
      { name: "United Torah Judaism", sub: "// Netanyahu Coalition", seats: 8.0, bloc: "vance" },
      { name: "Otzma Yehudit", sub: "// Netanyahu Coalition", seats: 7.0, bloc: "vance" },
      { name: "Hadash-Ta'al", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Ra'am", sub: "// Arab / Non-Aligned", seats: 5.0, bloc: "neutral" },
      { name: "Religious Zionism", sub: "// Rel. Nationalist", seats: 4.0, bloc: "sterling" }
    ]
  }
};

let activeSourceKey = 'channel12';
const seatRangeMax = 25.0;

// Elements
const pollDropdown = document.getElementById('pollDropdown');
const pollDropdownTrigger = document.getElementById('pollDropdownTrigger');
const pollDropdownMenu = document.getElementById('pollDropdownMenu');
const selectedPollSource = pollDropdownTrigger.querySelector('span');

// 1. Dropdown Toggle and Choice
pollDropdownTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  pollDropdown.classList.toggle('open');
});

document.addEventListener('click', () => {
  pollDropdown.classList.remove('open');
});

const dropdownItems = document.querySelectorAll('.custom-select-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const value = e.target.dataset.value;
    const label = e.target.textContent;
    activeSourceKey = value;

    dropdownItems.forEach(i => i.classList.remove('active'));
    e.target.classList.add('active');
    selectedPollSource.textContent = label;

    updateForecastData(value);
  });
});


// 3. Number Counter Eased Animation
function animateNumber(element, targetVal) {
  const startVal = parseFloat(element.textContent) || 0;
  if (startVal === targetVal) return;

  // Trigger pop animation
  element.classList.remove('number-pop');
  void element.offsetWidth; // force reflow
  element.classList.add('number-pop');

  const duration = 800;
  const startTime = performance.now();

  function update(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress * (2 - progress); // Ease out quad
    const current = startVal + (targetVal - startVal) * ease;
    element.textContent = Math.round(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetVal;
    }
  }
  requestAnimationFrame(update);
}

// 2. Render Party List
function filterAndRenderPartyList() {
  const container = document.getElementById('partyList');
  if (!container) return;

  const currentData = POLL_DATA[activeSourceKey];
  const parties = currentData.parties;

  // Sort descending by seats
  const processedParties = [...parties].sort((a, b) => b.seats - a.seats);

  container.innerHTML = '';

  if (processedParties.length === 0) {
    container.innerHTML = `<div class="mono" style="text-align: center; color: var(--text-dim); padding: 32px 0;">// NO FORMATIONS IN SELECTED RANGE</div>`;
    return;
  }

  processedParties.forEach((party, idx) => {
    const row = document.createElement('div');
    row.className = `party-row-item`;
    row.dataset.seats = party.seats;
    row.dataset.bloc = party.bloc;
    row.style.animation = `fadeInRow 0.35s ease forwards`;
    row.style.animationDelay = `${idx * 0.05}s`;
    row.style.opacity = '0';

    const fillWidth = (party.seats / seatRangeMax) * 100;

    row.innerHTML = `
      <div class="party-info">
        <span class="party-name-label">${party.name}</span>
        <span class="party-bloc-sub-label mono">${party.sub}</span>
      </div>
      <div class="party-bar-container">
        <div class="party-bar-fill fill-${party.bloc}" style="width: 0%;">
          <span class="party-seats-val mono">${party.seats.toFixed(1)}</span>
        </div>
      </div>
    `;

    container.appendChild(row);

    // Microtask delay to kick off width transition
    requestAnimationFrame(() => {
      const fill = row.querySelector('.party-bar-fill');
      if (fill) fill.style.width = `${fillWidth}%`;
    });
  });
}

// 5. Update Forecast Data and Bloc Bar
function updateForecastData(sourceKey) {
  const currentData = POLL_DATA[sourceKey];
  if (!currentData) return;

  // Animate head-to-head counts
  const vanceTextEl = document.getElementById('vanceSeatsText');
  const rostovaTextEl = document.getElementById('rostovaSeatsText');
  if (vanceTextEl) animateNumber(vanceTextEl, currentData.vance_total);
  if (rostovaTextEl) animateNumber(rostovaTextEl, currentData.rostova_total);

  // Update segmented coalition progress bar
  const totalSeats = 120;
  const segVance = document.getElementById('segVance');
  const segSterling = document.getElementById('segSterling');
  const segNeutral = document.getElementById('segNeutral');
  const segRostova = document.getElementById('segRostova');

  if (segVance) segVance.style.width = `${(currentData.segments.vance / totalSeats) * 100}%`;
  if (segSterling) segSterling.style.width = `${(currentData.segments.sterling / totalSeats) * 100}%`;
  if (segNeutral) segNeutral.style.width = `${(currentData.segments.neutral / totalSeats) * 100}%`;
  if (segRostova) segRostova.style.width = `${(currentData.segments.rostova / totalSeats) * 100}%`;

  // Render/filter party list
  filterAndRenderPartyList();
}

// Initialize party list on page load
filterAndRenderPartyList();

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.analysis-card, .poll-widget').forEach((c, i) => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(24px)';
  c.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  ro.observe(c);
});

// ===== ANALYSIS CARD TILT EFFECT =====
document.querySelectorAll('.analysis-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;
    card.style.transform = `translateX(6px) translateY(-3px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== COALITION BAR SEGMENT HOVER TOOLTIP =====
const coalitionTooltip = document.createElement('div');
coalitionTooltip.className = 'coalition-tooltip';
coalitionTooltip.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  background: rgba(10,14,8,0.95); border: 1px solid var(--gold-dim);
  padding: 6px 14px; font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-primary);
  box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 0 12px var(--gold-glow);
  opacity: 0; transition: opacity 0.2s ease; white-space: nowrap;
`;
document.body.appendChild(coalitionTooltip);

const segNames = { segVance: 'Netanyahu Coalition', segSterling: 'Religious Nationalist', segNeutral: 'Arab / Non-Aligned', segRostova: 'Opposition Bloc' };
const segKeys = { segVance: 'vance', segSterling: 'sterling', segNeutral: 'neutral', segRostova: 'rostova' };

document.querySelectorAll('.coalition-bar-segment').forEach(seg => {
  seg.addEventListener('mouseenter', e => {
    const id = seg.id;
    const data = POLL_DATA[activeSourceKey];
    const seats = data.segments[segKeys[id]] || 0;
    coalitionTooltip.textContent = `${segNames[id]} — ${seats} seats`;
    coalitionTooltip.style.opacity = '1';
  });
  seg.addEventListener('mousemove', e => {
    coalitionTooltip.style.left = (e.clientX + 14) + 'px';
    coalitionTooltip.style.top = (e.clientY - 30) + 'px';
  });
  seg.addEventListener('mouseleave', () => {
    coalitionTooltip.style.opacity = '0';
  });
});

// ===== PARTY ROW STAGGER ENTRANCE ON SCROLL =====
const partySection = document.querySelector('.party-breakdown-section');
if (partySection) {
  const partyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rows = partySection.querySelectorAll('.party-row-item');
        rows.forEach((row, idx) => {
          row.style.opacity = '0';
          row.style.transform = 'translateX(-12px)';
          
          const bar = row.querySelector('.party-bar-fill');
          let targetWidth = '0%';
          if (bar) {
            targetWidth = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
          }

          setTimeout(() => {
            row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
            if (bar) bar.style.width = targetWidth;
          }, idx * 60 + 100);
        });
        partyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  partyObserver.observe(partySection);
}
