// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel .card');
const carousel = document.querySelector('.carousel-track');

function showSlide(n) {
  if (n >= slides.length) {
    currentSlide = 0;
  } else if (n < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = n;
  }

  // Translate the carousel to show the current slide
  const offset = -currentSlide * 100;
  carousel.style.transform = `translateX(${offset}%)`;
  
  // Update active indicator (optional)
  updateIndicators();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.remove('active');
    if (index === currentSlide) {
      indicator.classList.add('active');
    }
  });
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
  showSlide(0);
  
  // Optional: Auto-advance carousel every 5 seconds
  setInterval(nextSlide, 5000);
});
