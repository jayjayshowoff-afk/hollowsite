// ==============================================================================
// HOLLOW — Interactive Controller
// Provides subtle human-crafted 3D perspective tilt on the frameless screenshot
// and natural scroll elevation for the navigation pill.
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. Subtle Human 3D Window Tilt (Hero Showcase)
  // --------------------------------------------------
  const heroWrapper = document.querySelector('.hero-window-wrapper');
  const heroWindow = document.getElementById('hero-window-card');

  if (heroWrapper && heroWindow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let animFrame = null;

    heroWrapper.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!animFrame) animFrame = requestAnimationFrame(updateTilt);
    });

    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      mouseX = x * 5; // Max 2.5 deg rotation
      mouseY = -y * 5;
    });

    heroWrapper.addEventListener('mouseleave', () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
    });

    function updateTilt() {
      // Spring damping interpolation
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      heroWindow.style.transform = `perspective(1200px) rotateX(${currentY.toFixed(2)}deg) rotateY(${currentX.toFixed(2)}deg)`;

      if (isHovering || Math.abs(mouseX - currentX) > 0.01 || Math.abs(mouseY - currentY) > 0.01) {
        animFrame = requestAnimationFrame(updateTilt);
      } else {
        heroWindow.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        animFrame = null;
      }
    }
  }

  // --------------------------------------------------
  // 2. Subtle Scroll Depth on Top Bar
  // --------------------------------------------------
  const topNavPill = document.querySelector('.nav-pill');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (topNavPill) {
      if (currentScrollY > 40) {
        topNavPill.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.06)';
      } else {
        topNavPill.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)';
      }
    }
  }, { passive: true });

  // --------------------------------------------------
  // 3. Newsletter Submission Simulated Failure
  // --------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterError = document.getElementById('newsletter-error');
  const btnNewsletterSubmit = document.getElementById('btn-newsletter-submit');

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!newsletterError) return;

    if (btnNewsletterSubmit) {
      btnNewsletterSubmit.disabled = true;
      btnNewsletterSubmit.style.opacity = '0.7';
      btnNewsletterSubmit.innerHTML = '<span>Connecting to server...</span>';
    }

    setTimeout(() => {
      newsletterError.style.display = 'block';
      if (btnNewsletterSubmit) {
        btnNewsletterSubmit.disabled = false;
        btnNewsletterSubmit.style.opacity = '1';
        btnNewsletterSubmit.innerHTML = '<span>Subscribe to Dispatch</span>';
      }
    }, 700);
  });
});
