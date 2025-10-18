// Preloader 
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');

  setTimeout(() => {
    preloader.classList.add('loaded');
  }, 1000);

  // Time updater
  function updateCurrentTime() {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    if (timeElement) {
      timeElement.textContent = `⏱️ Current Time (ms): ${Date.now()}`;
    }
  }
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  // Read More / Read Less Toggle
  const learnMoreLink = document.querySelector('[data-testid="test-user-learn-more-link"]');
  const learnBox = document.querySelector('[data-testid="test-user-learn-more-box"]');
  const hiddenGroup = document.querySelector('.hidden-group');

  hiddenGroup.classList.add('hidden-section');

  learnMoreLink.addEventListener('click', (e) => {
    e.preventDefault();

    const isHidden = hiddenGroup.classList.contains('hidden-section');

    if (isHidden) {
   
      hiddenGroup.classList.remove('hidden-section');
      hiddenGroup.classList.add('visible-section');
      learnBox.textContent = 'Read Less';
    } else {

      hiddenGroup.classList.remove('visible-section');
      hiddenGroup.classList.add('hidden-section');
      learnBox.textContent = 'Learn More';
    }
  });
});
