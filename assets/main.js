// Smooth scroll to anchors via data-scroll
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = document.querySelector(btn.getAttribute('data-scroll'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
// Mobile nav toggle
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
if (burger && mainNav) {
  burger.addEventListener('click', () => {
    const isOpen = mainNav.style.display === 'flex';
    mainNav.style.display = isOpen ? 'none' : 'flex';
  });
}
// Netlify Forms spam honeypot (basic)
const form = document.querySelector('form[name="contact"]');
if (form && !form.querySelector('input[name="bot-field"]')) {
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = 'bot-field';
  honeypot.style.display = 'none';
  form.prepend(honeypot);
}