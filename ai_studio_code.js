/**
 * Galvaneyes Roofing - Client Interactions & Lead Generation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header elevation on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Hamburger Navigation
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('open');
    mainNav.classList.toggle('open');
    navBackdrop.classList.toggle('open');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  };

  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('open');
    mainNav.classList.remove('open');
    navBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  navToggle.addEventListener('click', toggleMenu);
  navBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 3. Lead Generation Form Validation & Submission Preparation
  const leadForm = document.getElementById('leadForm');
  const formFeedback = document.getElementById('formFeedback');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs to validate
      const fullName = document.getElementById('fullName');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const address = document.getElementById('propertyAddress');
      const service = document.getElementById('serviceNeeded');

      const fields = [
        { el: fullName, validator: val => val.trim().length >= 2 },
        { el: phone, validator: val => val.trim().length >= 7 },
        { el: email, validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
        { el: address, validator: val => val.trim().length >= 4 },
        { el: service, validator: val => val !== '' && val !== null }
      ];

      fields.forEach(({ el, validator }) => {
        const group = el.closest('.form-group');
        if (!validator(el.value)) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      });

      if (isValid) {
        // Prepare submit payload
        const submitBtn = leadForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending Request...</span>';

        // Simulation for frontend demonstration (Ready for form services like Formspree or Netlify forms)
        setTimeout(() => {
          leadForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Thank you! Your estimate request has been received. We will contact you shortly.';

          setTimeout(() => {
            formFeedback.style.display = 'none';
          }, 8000);
        }, 1000);
      }
    });

    // Remove error class on input keystroke
    leadForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });
  }
});

/**
 * Helper to dynamically select a service in the estimate form
 * when a user clicks 'Schedule Inspection', 'Request a Repair', or 'Get an Estimate'
 */
function preselectService(serviceName) {
  const serviceSelect = document.getElementById('serviceNeeded');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }
}