/***********************
   * UI interactions + animations
   ***********************
document.addEventListener('DOMContentLoaded', () => {
  // NAV hamburger toggles (robust: click, click-outside, Escape)
  const hamb = document.getElementById('hambtn');
  const mobile = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav .links a');

  function openMobile() {
    if (!mobile) return;
    hamb.setAttribute('aria-expanded', 'true');
    mobile.hidden = false;
    // allow CSS transitions if any
    mobile.style.opacity = '1';
    mobile.style.transform = 'translateY(0)';
    // ensure mobile menu appears above everything
    mobile.style.zIndex = '99999';
    document.body.classList.add('mobile-menu-open');
  }

  function closeMobile() {
    if (!mobile) return;
    hamb.setAttribute('aria-expanded', 'false');
    // animate close (if you have transitions)
    mobile.style.opacity = '0';
    mobile.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      try { mobile.hidden = true; } catch (e) { /* ignore */ }
    }, 220);
    document.body.classList.remove('mobile-menu-open');
  }

  if (hamb && mobile) {
    // toggle on click
    hamb.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const expanded = hamb.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMobile();
      else openMobile();
    });

    // click outside closes menu
    document.addEventListener('click', (e) => {
      if (!mobile.hidden && !mobile.contains(e.target) && !hamb.contains(e.target)) {
        closeMobile();
      }
    });

    // Escape closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamb.getAttribute('aria-expanded') === 'true') {
        closeMobile();
        hamb.focus();
      }
    });
  }

  // On load: mark active nav link and focus it (prevent scroll)
  try {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      // compare last segment only (works with index.html, about.html, contact.html)
      const hrefFile = href.split('/').pop();
      if (hrefFile === currentPath || (hrefFile === 'index.html' && currentPath === '')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        // ensure it's focusable and focusable programmatically without scrolling
        link.setAttribute('tabindex', '0');
        try {
          // focus without causing scroll jump
          link.focus({ preventScroll: true });
        } catch (err) {
          // older browsers fallback
          link.focus();
        }
      }
    });
  } catch (err) {
    // non-fatal
    console.warn('Active nav focus failed:', err);
  }

  // Entrance animations: ContactInfo slide from left, ContactForm fade in
  const info = document.getElementById('contact-info');
  const formPanel = document.getElementById('contact-form-panel');

  // small delay to allow page to settle
  setTimeout(() => {
    if (info) info.classList.add('in');
    if (formPanel) formPanel.classList.add('in');
  }, 160);

  // Social icons animate up sequentially
  const socialLinks = document.querySelectorAll('.sci a');
  socialLinks.forEach((a, idx) => {
    setTimeout(() => a.classList.add('up'), 420 + idx * 140);
  });

  /***********************
   * Lottie icons (mail/home) - play forward on hover/focus and reverse on leave/blur
   * Only initialize if element has data-json attribute
   ***********************/
  document.querySelectorAll('.lottie-icon[data-json]').forEach(icon => {
    const json = icon.getAttribute('data-json');
    if (!json) return;

    const anim = lottie.loadAnimation({
      container: icon,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: json
    });

    let reversing = false;
    const playForward = () => { reversing = false; anim.setDirection(1); anim.play(); };
    const playReverse = () => { reversing = true; anim.setDirection(-1); anim.play(); };

    icon.addEventListener('mouseenter', playForward);
    icon.addEventListener('focus', playForward);
    icon.addEventListener('touchstart', playForward);

    icon.addEventListener('mouseleave', playReverse);
    icon.addEventListener('blur', playReverse);
    icon.addEventListener('touchend', playReverse);

    anim.addEventListener('complete', () => {
      if (reversing) anim.stop();
    });
  });

  /***********************
   * Form validation (client-side) — improved accessibility
   ***********************/
  const form = document.getElementById('contact-form');
  const nameEl = document.getElementById('fullName');
  const emailEl = document.getElementById('email');
  const subjectEl = document.getElementById('subject');
  const messageEl = document.getElementById('message');

  const errName = document.getElementById('test-contact-error-name');
  const errEmail = document.getElementById('test-contact-error-email');
  const errSubject = document.getElementById('test-contact-error-subject');
  const errMessage = document.getElementById('test-contact-error-message');
  const successEl = document.getElementById('form-success');

  // map error element id -> input id for reliable focus targeting
  const errorToInput = {
    'test-contact-error-name': 'fullName',
    'test-contact-error-email': 'email',
    'test-contact-error-subject': 'subject',
    'test-contact-error-message': 'message'
  };

  function validateEmail(val) {
    // simple but effective email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function clearErrors() {
    [errName, errEmail, errSubject, errMessage].forEach(e => {
      if (e) e.textContent = '';
    });
    // remove aria-invalid from all inputs
    [nameEl, emailEl, subjectEl, messageEl].forEach(i => {
      if (i) i.removeAttribute('aria-invalid');
    });
    if (successEl) {
      successEl.style.display = 'none';
      successEl.removeAttribute('tabindex');
    }
  }

  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      clearErrors();
      let valid = true;

      if (!nameEl.value || !nameEl.value.trim()) {
        if (errName) errName.textContent = 'Please enter your full name.';
        if (nameEl) nameEl.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!emailEl.value || !emailEl.value.trim() || !validateEmail(emailEl.value.trim())) {
        if (errEmail) errEmail.textContent = 'Email must be valid (name@example.com).';
        if (emailEl) emailEl.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!subjectEl.value || !subjectEl.value.trim()) {
        if (errSubject) errSubject.textContent = 'Please enter the subject.';
        if (subjectEl) subjectEl.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!messageEl.value || !messageEl.value.trim() || messageEl.value.trim().length < 10) {
        if (errMessage) errMessage.textContent = 'Message must be at least 10 characters.';
        if (messageEl) messageEl.setAttribute('aria-invalid', 'true');
        valid = false;
      }

      if (!valid) {
        // focus first error (use mapping)
        const firstError = [errName, errEmail, errSubject, errMessage].find(e => e && e.textContent);
        if (firstError && firstError.id) {
          const inputId = errorToInput[firstError.id];
          const target = document.getElementById(inputId);
          if (target) {
            // focus and bring into view
            try {
              target.focus({ preventScroll: false });
            } catch (e) {
              target.focus();
            }
          }
        }
        return;
      }

      // If valid, show success message (actual sending via backend optional)
      if (successEl) {
        successEl.style.display = 'block';
        successEl.textContent = '✅ Message validated — ready to send. (This demo does not submit to a server.)';
        // make it focusable for screen readers
        successEl.setAttribute('tabindex', '-1');
        try {
          successEl.focus({ preventScroll: true });
        } catch (e) {
          successEl.focus();
        }
      }

      // optionally reset after a pause and remove aria-invalid
      setTimeout(() => {
        form.reset();
        clearErrors();
      }, 850);
    });
  }
}); // end DOMContentLoaded

;