/***********************
   * UI interactions + animations
   ***********************/
  document.addEventListener('DOMContentLoaded', () => {
    // NAV hamburger toggles
    const hamb = document.getElementById('hambtn');
    const mobile = document.getElementById('mobileMenu');
    hamb.addEventListener('click', () => {
      const expanded = hamb.getAttribute('aria-expanded') === 'true';
      hamb.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        mobile.hidden = false;
      } else {
        mobile.hidden = true;
      }
    });

    // Entrance animations: ContactInfo slide from left, ContactForm fade in
    const info = document.getElementById('contact-info');
    const formPanel = document.getElementById('contact-form-panel');

    // small delay to allow page to settle
    setTimeout(() => {
      info.classList.add('in');
      formPanel.classList.add('in');
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
     * Form validation (client-side)
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

    function validateEmail(val){
      // simple but effective email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    function clearErrors(){
      [errName, errEmail, errSubject, errMessage].forEach(e => { e.textContent = ''; });
      successEl.style.display = 'none';
    }

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      clearErrors();
      let valid = true;

      if (!nameEl.value.trim()) {
        errName.textContent = 'Please enter your full name.';
        valid = false;
      }
      if (!emailEl.value.trim() || !validateEmail(emailEl.value.trim())) {
        errEmail.textContent = 'Email must be valid (name@example.com).';
        valid = false;
      }
      if (!subjectEl.value.trim()) {
        errSubject.textContent = 'Please enter the subject.';
        valid = false;
      }
      if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
        errMessage.textContent = 'Message must be at least 10 characters.';
        valid = false;
      }

      if (!valid) {
        // focus first error
        const firstError = [errName, errEmail, errSubject, errMessage].find(e => e.textContent);
        if (firstError) {
          const id = firstError.id.replace('test-contact-error-','');
          const target = document.getElementById(id === 'name' ? 'fullName' : id === 'message' ? 'message' : id);
          if (target) target.focus();
        }
        return;
      }

      // If valid, show success message (actual sending via backend optional)
      successEl.style.display = 'block';
      successEl.textContent = '✅ Message validated — ready to send. (This demo does not submit to a server.)';
      // optionally reset after a pause
      setTimeout(() => {
        form.reset();
      }, 850);
    });

  }); // end DOMContentLoaded