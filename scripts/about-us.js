// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('mobileDrawer');

if (menuBtn && drawer) {
  menuBtn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
},{threshold:0.15});
revealEls.forEach(el => io.observe(el));
// Animated counters
function animateCounter(el) {
  const target = Number(el.dataset.target || el.getAttribute('data-target') || 0);
  const numEl = el.querySelector('.num');
  if (!numEl) return;

  const duration = 1200; // ms
  const startTime = performance.now();

  function tick(now) {
    const p = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(p * target);
    numEl.textContent = value.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Setup intersection observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);  // run animation
      observer.unobserve(entry.target); // stop observing after run
    }
  });
}, { threshold: 0.5 }); // triggers when 50% visible

// Attach observer to all counters
document.querySelectorAll('[data-counter]').forEach(el => {
  observer.observe(el);
});

// Accordion
document.querySelectorAll('.a-item').forEach(item => {
  const header = item.querySelector('.a-header');
  const panel = item.querySelector('.a-panel');
  const chev = item.querySelector('.chev');

  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // close others
    document.querySelectorAll('.a-item.open').forEach(o => {
      if(o !== item){ o.classList.remove('open'); o.querySelector('.a-header').setAttribute('aria-expanded','false'); }
    });
    // toggle current
    item.classList.toggle('open');
    header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    chev.textContent = isOpen ? '+' : '–';
    // smooth height (handled by CSS max-height)
    if(!isOpen){
      const h = panel.scrollHeight;
      panel.style.maxHeight = h + 'px';
      setTimeout(()=> panel.style.maxHeight = '', 260);
    }
  });
});
