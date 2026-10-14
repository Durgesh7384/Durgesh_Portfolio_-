// ==========================================
// DURGESH JANGALE - PORTFOLIO INTERACTIVITY
// Unified Single JavaScript Engine
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPING TEXT EFFECT IN HERO
  const typingElement = document.querySelector('.typed-text');
  if (typingElement) {
    const roles = [
      'Computer Engineering Student',
      'Full Stack Web Developer',
      'AI & Python Enthusiast',
      'Tech Innovator & Founder'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 400; // Pause before new word
      }

      setTimeout(type, typingDelay);
    }
    type();
  }

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const pillNav = document.querySelector('.pill-nav');
  const navLinks = document.querySelectorAll('.nav-item');

  if (mobileToggle && pillNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      pillNav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        pillNav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 3. SCROLL SPY & NAVBAR ACTIVE STATE
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollY = window.pageYOffset + 150;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.pill-nav a[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });

    // Header background blur intensification on scroll
    const header = document.querySelector('.header-container');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to Top Button Visibility
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 4. SCROLL TO TOP HANDLER
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. ANIMATED NUMERICAL COUNTER
  const statsElements = document.querySelectorAll('.counter-number');
  let countersStarted = false;

  const countUp = () => {
    statsElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);
        counter.innerText = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          countUp();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);
  }

  // 7. PROJECT FILTERING SYSTEM
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.classList.remove('hidden-project');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden-project');
          }, 300);
        }
      });
    });
  });

  // 8. 3D CARD TILT & MOUSE GLOW EFFECT
  const tiltCards = document.querySelectorAll('.tilt-effect');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Glow coordinates
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Gentle 3D tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 9. CERTIFICATE VERIFICATION MODAL SYSTEM
  const certModal = document.getElementById('certModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCertTitle = document.getElementById('modalCertTitle');
  const modalCertIssuer = document.getElementById('modalCertIssuer');
  const modalCertId = document.getElementById('modalCertId');
  const modalCertDate = document.getElementById('modalCertDate');
  const modalCertSkills = document.getElementById('modalCertSkills');

  const verifyButtons = document.querySelectorAll('.verify-cert-trigger');

  verifyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.cert-card');
      if (!card || !certModal) return;

      const title = card.getAttribute('data-title') || card.querySelector('h3').innerText;
      const issuer = card.getAttribute('data-issuer') || card.querySelector('.cert-issuer').innerText;
      const certId = card.getAttribute('data-id') || 'VERIFIED-DJ-2026';
      const date = card.getAttribute('data-date') || '2026';
      const skills = card.getAttribute('data-skills') || 'Software Engineering, Development';

      modalCertTitle.innerText = title;
      modalCertIssuer.innerText = issuer;
      modalCertId.innerText = certId;
      modalCertDate.innerText = date;

      // Populate skills tags
      modalCertSkills.innerHTML = '';
      skills.split(',').forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'modal-skill-pill';
        tag.innerText = skill.trim();
        modalCertSkills.appendChild(tag);
      });

      certModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
