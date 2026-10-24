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
