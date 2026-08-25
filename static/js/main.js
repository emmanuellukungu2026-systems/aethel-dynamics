// Improved carousel functionality: robust initialization, indicators, auto-advance pause, touch support
document.addEventListener('DOMContentLoaded', function() {
  let currentSlide = 0;

  const carouselEl = document.querySelector('.carousel');
  if (!carouselEl) return; // no carousel on page

  const track = carouselEl.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.card'));
  const prevBtn = carouselEl.querySelector('.carousel-btn.prev');
  const nextBtn = carouselEl.querySelector('.carousel-btn.next');

  // Ensure indicators container exists
  let indicatorsContainer = carouselEl.querySelector('.carousel-indicators');
  if (!indicatorsContainer) {
    indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    carouselEl.appendChild(indicatorsContainer);
  }

  function renderIndicators() {
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const span = document.createElement('span');
      span.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
      span.addEventListener('click', () => showSlide(i));
      indicatorsContainer.appendChild(span);
    });
  }

  function showSlide(n) {
    if (!slides.length) return;
    if (n >= slides.length) currentSlide = 0;
    else if (n < 0) currentSlide = slides.length - 1;
    else currentSlide = n;

    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateIndicators();
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function prevSlide() { showSlide(currentSlide - 1); }

  function updateIndicators() {
    const indicators = Array.from(indicatorsContainer.querySelectorAll('.carousel-indicator'));
    indicators.forEach((ind, idx) => ind.classList.toggle('active', idx === currentSlide));
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  renderIndicators();
  showSlide(0);

  // Auto-advance with pause on hover/focus
  // let autoId = setInterval(nextSlide, 5000);
  // carouselEl.addEventListener('mouseenter', () => clearInterval(autoId));
  // carouselEl.addEventListener('mouseleave', () => { autoId = setInterval(nextSlide, 5000); });
  // carouselEl.addEventListener('focusin', () => clearInterval(autoId));
  // carouselEl.addEventListener('focusout', () => { autoId = setInterval(nextSlide, 5000); });

  // Recalculate position on resize
  window.addEventListener('resize', () => showSlide(currentSlide));

  // Basic touch/swipe support
  let startX = 0;
  let isDragging = false;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; });
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return; isDragging = false;
    const endX = e.changedTouches[0].clientX; const dx = endX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextSlide(); else prevSlide();
    }
  });
});
