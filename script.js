const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('site-nav');

if (btn && nav) {
  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('open', open);
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); btn.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !e.target.closest('.nav')) setOpen(false);
  });
}

// Highlight the nav link for the section currently in view.
const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const mark = (id) => links.forEach(a => {
    if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) mark(en.target.id); });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));
  window.addEventListener('scroll', () => {
    if (window.scrollY < 200) links.forEach(a => a.removeAttribute('aria-current'));
    else if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) mark('contact');
  }, { passive: true });
}
