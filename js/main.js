(function() {
  const html = document.documentElement;
  const desktopToggle = document.getElementById('desktop-theme-toggle');
  const mobileToggle = document.getElementById('mobile-theme-toggle');
  const toggleThumbs = document.querySelectorAll('.toggle-thumb');

  const savedTheme = localStorage.getItem('theme');
  let currentTheme = savedTheme || 'dark';

  function setTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      toggleThumbs.forEach(el => el.textContent = '☀️');
    } else {
      html.removeAttribute('data-theme');
      toggleThumbs.forEach(el => el.textContent = '🌙');
    }
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  }

  if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);

  setTheme(currentTheme);
})();


(function () {
  const roles = [
    'CS Student & Developer',
  ];
  const el = document.getElementById('typed-text');
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, 350);
        return;
      }
    }
    setTimeout(tick, deleting ? 45 : 80);
  }
  setTimeout(tick, 900);
})();


document.querySelectorAll('.project-card[data-tilt]').forEach(function (card) {
  card.addEventListener('mousemove', function (e) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
    const rotX = (y - 50) / 20;
    const rotY = (50 - x) / 20;
    card.style.transform =
      'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateY(-2px)';
  });
  card.addEventListener('mouseleave', function () {
    card.style.transform = '';
  });
});

// ── SCROLL REVEAL ──────────────────────────────────────────
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
  revealObserver.observe(el);
});

var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.sidebar-nav a');
var navObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(function (s) {
  navObserver.observe(s);
});


var backTop = document.getElementById('back-top');
window.addEventListener('scroll', function () {
  if (window.scrollY > 600) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});
backTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}


if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.project-card[data-tilt]').forEach(function (c) {
    c.style.transition = 'none';
    c.addEventListener('mousemove', function () {});
    c.addEventListener('mouseleave', function () {});
  });
}