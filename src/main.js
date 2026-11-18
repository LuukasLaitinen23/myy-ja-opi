const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;

    if (y > lastScrollY && y > 60) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollY = y;
  },
  { passive: true }
);
