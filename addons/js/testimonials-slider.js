(function () {
  const slider = document.querySelector('[data-testimonials-slider]');
  if (!slider) return;

  const cards = Array.from(slider.children);
  let index = 0;

  const update = () => {
    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  const next = () => {
    index = (index + 1) % cards.length;
    update();
  };

  const prev = () => {
    index = (index - 1 + cards.length) % cards.length;
    update();
  };

  document.querySelector('[data-testimonials-next]')?.addEventListener('click', next);
  document.querySelector('[data-testimonials-prev]')?.addEventListener('click', prev);

  let autoPlay = setInterval(next, 7000);

  slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
  slider.addEventListener('focusin', () => clearInterval(autoPlay));

  slider.addEventListener('mouseleave', () => {
    autoPlay = setInterval(next, 7000);
  });
  slider.addEventListener('focusout', () => {
    autoPlay = setInterval(next, 7000);
  });
})();
