(function () {
  'use strict';

  const portfolioData = [
    {
      title: 'FinTech Dashboard',
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      desc: 'A comprehensive financial analytics dashboard built with React and D3.js. Features real-time data visualization, portfolio tracking, and intuitive UX for complex financial data.',
      tags: ['React', 'D3.js', 'TypeScript', 'Tailwind']
    },
    {
      title: 'Brand Identity System',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
      desc: 'Complete brand identity overhaul including logo design, color palette, typography system, and brand guidelines for a tech startup entering the market.',
      tags: ['Figma', 'Illustrator', 'Branding', 'Guidelines']
    },
    {
      title: 'Luxury Fashion Campaign',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
      desc: 'High-end fashion campaign visuals spanning digital and print media. Minimalist aesthetic with bold typography and premium photography direction.',
      tags: ['Photoshop', 'Campaign', 'Print', 'Digital']
    },
    {
      title: 'E-Commerce Platform',
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
      desc: 'Full-stack e-commerce solution with seamless checkout, inventory management, and responsive design optimized for conversion across all devices.',
      tags: ['Next.js', 'Stripe', 'Node.js', 'MongoDB']
    },
    {
      title: 'Social Media Kit',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e939e113?w=1200&q=80',
      desc: 'Complete social media creative suite including Instagram posts, stories, LinkedIn banners, and YouTube thumbnails for consistent brand presence.',
      tags: ['Instagram', 'YouTube', 'LinkedIn', 'Templates']
    },
    {
      title: 'Startup Launch Assets',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315346d?w=1200&q=80',
      desc: 'Launch-ready brand package including pitch deck design, landing page, social assets, and email templates for a SaaS product launch.',
      tags: ['Pitch Deck', 'Landing Page', 'SaaS', 'Launch']
    }
  ];

  const loader = document.getElementById('loader');
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const heroCanvas = document.getElementById('heroCanvas');
  const portfolioModal = document.getElementById('portfolioModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialDots = document.getElementById('testimonialDots');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function initLoader() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        triggerHeroAnimations();
      }, 2000);
    });
  }

  function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .fade-up');
    heroElements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }

  function initCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .portfolio-item, .service-card, input, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  function initParticles() {
    if (!heroCanvas) return;

    const ctx = heroCanvas.getContext('2d');
    let particles = [];
    let animationId;
    let width, height;

    function resize() {
      width = heroCanvas.width = heroCanvas.offsetWidth;
      height = heroCanvas.height = heroCanvas.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 163, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    function createParticles() {
      const count = Math.min(Math.floor((width * height) / 12000), 80);
      particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(77, 163, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(); });
      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  function initNav() {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-up:not(.hero .fade-up)').forEach((el) => {
      observer.observe(el);
    });
  }

  function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            statNumbers.forEach((stat) => animateCounter(stat));
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            skillFills.forEach((fill, i) => {
              setTimeout(() => {
                fill.style.width = fill.dataset.width + '%';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
  }

  function initServiceCards() {
    document.querySelectorAll('.service-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        items.forEach((item) => {
          const category = item.dataset.category;
          const show = filter === 'all' || category === filter;

          if (show) {
            item.classList.remove('hidden');
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  function initPortfolioModal() {
    const modalImage = document.getElementById('modalImage');
    const modalCat = document.getElementById('modalCat');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');

    function openModal(index) {
      const project = portfolioData[index];
      if (!project) return;

      modalImage.style.backgroundImage = `url('${project.image}')`;
      modalCat.textContent = project.category;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');

      portfolioModal.classList.add('open');
      portfolioModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      portfolioModal.classList.remove('open');
      portfolioModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-item').forEach((item) => {
      const index = parseInt(item.dataset.index, 10);
      item.addEventListener('click', () => openModal(index));
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && portfolioModal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function initTestimonials() {
    const cards = testimonialTrack.querySelectorAll('.testimonial-card');
    let current = 0;
    let autoplayInterval;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      testimonialDots.appendChild(dot);
    });

    const dots = testimonialDots.querySelectorAll('button');

    function goTo(index) {
      cards[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + cards.length) % cards.length;
      cards[current].classList.add('active');
      dots[current].classList.add('active');
    }

    testimonialPrev.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
    testimonialNext.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

    function startAutoplay() {
      autoplayInterval = setInterval(() => goTo(current + 1), 6000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();
  }

  function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.classList.add('show');
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;

        setTimeout(() => formStatus.classList.remove('show'), 5000);
      }, 1500);
    });
  }

  function initParallax() {
    const aboutVisual = document.querySelector('.about-visual');
    if (!aboutVisual) return;

    window.addEventListener('scroll', () => {
      const rect = aboutVisual.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (rect.top - window.innerHeight * 0.5) * 0.06;
        aboutVisual.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  function initStaggerDelays() {
    document.querySelectorAll('.services-grid .fade-up, .portfolio-grid .fade-up, .skills-grid .fade-up').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  }

  function init() {
    initLoader();
    initCursor();
    initParticles();
    initNav();
    initScrollAnimations();
    initCounters();
    initSkillBars();
    initServiceCards();
    initPortfolioFilter();
    initPortfolioModal();
    initTestimonials();
    initContactForm();
    initParallax();
    initSmoothScroll();
    initStaggerDelays();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();