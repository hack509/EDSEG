/* ============================================================
   EDSEG – Script principal
   École de Droit et des Sciences Économiques des Gonaïves
   ============================================================ */

/* ============================================================
   1. MENU MOBILE (hamburger)
   ============================================================ */
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');

menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
closeMenu.addEventListener('click', () => mobileNav.classList.remove('open'));

/**
 * Ferme le menu mobile (appelé par les liens du menu)
 */
function closeMobile() {
  mobileNav.classList.remove('open');
}


/* ============================================================
   2. NAVIGATION ACTIVE AU DÉFILEMENT
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


/* ============================================================
   3. ANIMATION AU DÉFILEMENT (Intersection Observer)
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

// Éléments à animer lors du scroll
const animatedElements = document.querySelectorAll(
  '.faculty-card, .acad-card, .news-card, .step, .contact-item, .cal-item, .welcome-grid, .admission-card'
);

animatedElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


/* ============================================================
   4. FORMULAIRE DE CONTACT
   ============================================================ */

/**
 * Valide et soumet le formulaire de contact
 */
function submitForm() {
  const prenom  = document.getElementById('prenom').value.trim();
  const nom     = document.getElementById('nom').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation simple
  if (!prenom || !nom || !email || !message) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Veuillez entrer une adresse email valide.');
    return;
  }

  // Confirmation (à remplacer par un vrai envoi serveur)
  alert('Merci ' + prenom + ' ! Votre message a été envoyé. L\'équipe de l\'EDSEG vous répondra dans les plus brefs délais.');

  // Réinitialiser le formulaire
  document.getElementById('contactForm').reset();
}


/* ============================================================
   5. BOUTON DE LANGUE (Français / Kreyòl)
   ============================================================ */
const langBtn = document.querySelector('.lang-btn');
let currentLang = 'fr';

if (langBtn) {
  langBtn.addEventListener('click', () => {
    if (currentLang === 'fr') {
      currentLang = 'ht';
      langBtn.textContent = '🇫🇷 FR';
      // Placeholder : ici on pourrait charger les traductions Kreyòl
      console.log('Langue changée en Kreyòl haïtien');
    } else {
      currentLang = 'fr';
      langBtn.textContent = '🇭🇹 Kreyòl';
      console.log('Langue changée en Français');
    }
  });
}


/* ============================================================
   6. COMPTEUR ANIMÉ (statistiques dans le Hero)
   ============================================================ */

/**
 * Anime un nombre de 0 à une valeur cible
 * @param {HTMLElement} el - L'élément à animer
 * @param {number} target  - La valeur finale
 * @param {string} suffix  - Suffixe optionnel (ex: "+")
 * @param {number} duration - Durée en ms
 */
function animateCounter(el, target, suffix = '', duration = 1500) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = start + suffix;
    }
  }, 16);
}

// Démarrer l'animation des compteurs quand le Hero est visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const counters = [
        { selector: '#count-facultes',   target: 3,   suffix: ''   },
        { selector: '#count-annees',     target: 4,   suffix: ''   },
        { selector: '#count-etudiants',  target: 500, suffix: '+'  },
        { selector: '#count-profs',      target: 25,  suffix: '+'  },
      ];
      counters.forEach(c => {
        const el = document.querySelector(c.selector);
        if (el) animateCounter(el, c.target, c.suffix);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(heroStats);
}
