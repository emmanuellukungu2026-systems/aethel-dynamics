if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function resetPageScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

window.addEventListener('pageshow', resetPageScroll);

document.addEventListener('DOMContentLoaded', function() {
  resetPageScroll();
  const heroTitle = document.querySelector('#hero-title');
  if (heroTitle) {
    const titleText = 'One Hub. Endless  ';
    const accentText = ' Possibilities';
    const accentClass = heroTitle.querySelector('.orangina')?.className || 'orangina';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      heroTitle.textContent = '';
      heroTitle.classList.add('is-typing');

      let characterIndex = 0;
      const typeNextCharacter = () => {
        if (characterIndex < titleText.length) {
          heroTitle.append(titleText[characterIndex]);
          characterIndex += 1;
          window.setTimeout(typeNextCharacter, 48);
          return;
        }

        const accent = document.createElement('span');
        accent.className = accentClass;
        heroTitle.append(accent);

        let accentIndex = 0;
        const typeAccentCharacter = () => {
          if (accentIndex < accentText.length) {
            accent.append(accentText[accentIndex]);
            accentIndex += 1;
            window.setTimeout(typeAccentCharacter, 48);
            return;
          }
          heroTitle.classList.remove('is-typing');
        };

        typeAccentCharacter();
      };

      typeNextCharacter();
    }
  }

  const siteNav = document.querySelector('.site-nav');
  const heroSection = document.querySelector('.welcome_band');
  if (!siteNav) return;

  const menuDropdown = siteNav.querySelector('.menu-dropdown');
  const closeMenu = () => {
    if (menuDropdown?.open) menuDropdown.removeAttribute('open');
  };

  if (menuDropdown) {
    window.addEventListener('scroll', closeMenu, { passive: true });
    document.addEventListener('pointerdown', (event) => {
      if (!menuDropdown.contains(event.target)) closeMenu();
    });
  }

  const flowVisual = document.querySelector('.flow-showcase-visual');

  function updateFlowVisual() {
    if (!flowVisual) return;
    const visualBounds = flowVisual.getBoundingClientRect();
    const travel = window.innerHeight + visualBounds.height;
    const progress = Math.min(1, Math.max(0, (window.innerHeight - visualBounds.top) / travel));
    flowVisual.style.setProperty('--flow-scroll', progress.toFixed(3));
  }

  function updateNavState() {
    const viewportWidth = window.innerWidth;
    const fullWidth = viewportWidth * 0.9;
    const scrollableHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
    const navWidth = Math.max(58, fullWidth - ((fullWidth - 58) * progress));
    const centeredLeft = Math.max(10, (viewportWidth - fullWidth) / 2);
    const navLeft = centeredLeft - ((centeredLeft - 16) * progress);
    const heroHasPassed = heroSection
      ? heroSection.getBoundingClientRect().bottom <= 0
      : progress >= 1;

    siteNav.style.setProperty('--nav-width', `${navWidth}px`);
    siteNav.style.setProperty('--nav-left', `${navLeft}px`);
    siteNav.style.setProperty('--nav-progress', progress.toFixed(3));
    siteNav.classList.toggle('is-compact', progress > 0);
    siteNav.classList.toggle('is-orb', heroHasPassed);
  }

  updateNavState();
  updateFlowVisual();
  window.addEventListener('scroll', updateNavState, { passive: true });
  window.addEventListener('scroll', updateFlowVisual, { passive: true });
  window.addEventListener('resize', updateNavState);
  window.addEventListener('resize', updateFlowVisual);
});

document.addEventListener('DOMContentLoaded', function() {
  const revealItems = document.querySelectorAll(
    '.section-heading, .options, .options .sol, .product-highlight, .fonctions, .fonctions .sol, .flow_flow, .flow_flow .sol, .ready_manage, .site-footer, .ecosystem-section, .ecosystem-intro, .ecosystem-core, .ecosystem-node, .flow-showcase-section, .flow-showcase-copy, .flow-showcase-visual'
  );
  if (!revealItems.length) return;

  revealItems.forEach((item, index) => {
    item.classList.add('scroll-reveal');
    item.style.setProperty('--reveal-delay', `${Math.min(index * 70, 280)}ms`);
  });

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
});

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
