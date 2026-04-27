document.addEventListener('DOMContentLoaded', () => {
  // Fullscreen Menu Toggle
  const menuBtn = document.querySelector('.js-menu-btn');
  const closeBtn = document.querySelector('.js-menu-close');
  const fullMenu = document.querySelector('.js-full-menu');

  if (menuBtn && closeBtn && fullMenu) {
    menuBtn.addEventListener('click', () => {
      fullMenu.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
      fullMenu.classList.remove('open');
    });
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Optional: add slight zoom effect to bg image
        const bg = entry.target.parentElement.querySelector('.section-bg');
        if(bg) {
            bg.style.transform = 'scale(1.05)';
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.content').forEach(content => {
    observer.observe(content);
  });

  // Jump Nav highlighting
  const sections = document.querySelectorAll('section');
  const jumpBtns = document.querySelectorAll('.jump-btn');

  const navObserverOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(sections).indexOf(entry.target);
        jumpBtns.forEach(btn => btn.classList.remove('active'));
        if(jumpBtns[index]) {
            jumpBtns[index].classList.add('active');
        }
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Smooth scroll for jump nav
  jumpBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
