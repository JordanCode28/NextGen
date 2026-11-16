/* NEXTGEN — fonctionnalités communes à toutes les pages */
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loading-page');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');
  const header = document.querySelector('.header-container');

  if (header) {
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'back-button';
    backButton.textContent = '← Retour';
    backButton.setAttribute('aria-label', 'Revenir à la page précédente');
    header.insertBefore(backButton, hamburger || header.firstChild);

    backButton.addEventListener('click', () => {
      const previousPageIsInternal = document.referrer &&
        new URL(document.referrer).origin === window.location.origin;

      if (previousPageIsInternal && window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  window.setTimeout(() => {
    if (loader) loader.classList.add('fade-out');
  }, 500);

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }
});
