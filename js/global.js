/* NEXTGEN — fonctionnalités communes à toutes les pages */
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loading-page');
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mobileNav');

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
