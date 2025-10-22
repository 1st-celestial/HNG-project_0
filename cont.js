document.addEventListener('DOMContentLoaded', () => {

  const info = document.getElementById('contact-info');
  const formPanel = document.getElementById('contact-form-panel');

  setTimeout(() => {
    if (info) info.classList.add('in');
    if (formPanel) formPanel.classList.add('in');
  }, 160);

 /***********************
 * Social icons animation (only when visible)
 ***********************/
const socialLinks = document.querySelectorAll('.sci a');

if (socialLinks.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        socialLinks.forEach((a, idx) => {
          setTimeout(() => a.classList.add('up'), idx * 150);
        });
        // Trigger once and stop observing
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  // Observe any social icon (first is enough)
  observer.observe(socialLinks[0]);
}

  /***********************
   * Lottie icons 
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
   * Form validation
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

  // map error element id ->
  const errorToInput = {
    'test-contact-error-name': 'fullName',
    'test-contact-error-email': 'email',
    'test-contact-error-subject': 'subject',
    'test-contact-error-message': 'message'
  };

  function validateEmail(val) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function clearErrors() {
    [errName, errEmail, errSubject, errMessage].forEach(e => {
      if (e) e.textContent = '';
    });

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

        const firstError = [errName, errEmail, errSubject, errMessage].find(e => e && e.textContent);
        if (firstError && firstError.id) {
          const inputId = errorToInput[firstError.id];
          const target = document.getElementById(inputId);
          if (target) {

            try {
              target.focus({ preventScroll: false });
            } catch (e) {
              target.focus();
            }
          }
        }
        return;
      }


      if (successEl) {
        successEl.style.display = 'block';
        successEl.textContent = '✅ Message validated — ready to send. (This demo does not submit to a server.)';

        successEl.setAttribute('tabindex', '-1');
        try {
          successEl.focus({ preventScroll: true });
        } catch (e) {
          successEl.focus();
        }
      }


      setTimeout(() => {
        form.reset();
        clearErrors();
      }, 850);
    });
  }
// end DOMContentLoaded
});