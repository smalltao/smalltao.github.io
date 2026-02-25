/**
 * Ink Dust Theme - 水墨尘埃
 * Interactive behaviors and animations
 */

(function() {
  'use strict';

  // ===== Configuration =====
  const config = {
    inkSplatterEnabled: true,
    scrollRevealEnabled: true,
    smoothScrollEnabled: true,
    parallaxEnabled: true
  };

  // ===== Utility Functions =====
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  // Debounce function
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  // Throttle function
  const throttle = (fn, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ===== Ink Splatter Effect =====
  class InkSplatter {
    constructor(element) {
      this.element = element;
      this.particles = [];
      this.init();
    }

    init() {
      this.element.addEventListener('click', (e) => this.createSplatter(e));
    }

    createSplatter(e) {
      const rect = this.element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ink particles
      for (let i = 0; i < 12; i++) {
        this.createParticle(x, y);
      }
    }

    createParticle(x, y) {
      const particle = document.createElement('span');
      particle.className = 'ink-particle';

      const size = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 60 + 20;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      Object.assign(particle.style, {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        background: 'rgba(26, 26, 26, 0.6)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%) scale(1)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      this.element.appendChild(particle);

      // Animate particle
      requestAnimationFrame(() => {
        particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
        particle.style.opacity = '0';
      });

      // Remove particle after animation
      setTimeout(() => particle.remove(), 800);
    }
  }

  // ===== Scroll Reveal Animation =====
  class ScrollReveal {
    constructor(options = {}) {
      this.threshold = options.threshold || 0.1;
      this.rootMargin = options.rootMargin || '0px 0px -50px 0px';
      this.init();
    }

    init() {
      this.observer = new IntersectionObserver(
        (entries) => this.onIntersect(entries),
        { threshold: this.threshold, rootMargin: this.rootMargin }
      );

      // Observe elements
      $$('[data-reveal]').forEach(el => this.observer.observe(el));
    }

    onIntersect(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target);
        }
      });
    }

    observe(element) {
      this.observer.observe(element);
    }
  }

  // ===== Smooth Scroll =====
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#!') return;

        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== Parallax Effect =====
  class Parallax {
    constructor() {
      this.elements = $$('[data-parallax]');
      this.init();
    }

    init() {
      if (this.elements.length === 0) return;

      window.addEventListener('scroll', throttle(() => this.update(), 16));
      this.update();
    }

    update() {
      const scrollY = window.pageYOffset;

      this.elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const rect = el.getBoundingClientRect();
        const yPos = (scrollY * speed);

        el.style.transform = `translateY(${yPos}px)`;
      });
    }
  }

  // ===== Navbar Scroll Behavior =====
  function initNavbar() {
    const navbar = $('.navbar-custom');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', throttle(() => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > scrollThreshold) {
        navbar.classList.add('is-fixed');

        if (currentScroll > lastScroll && currentScroll > 200) {
          // Scrolling down - hide navbar
          navbar.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up - show navbar
          navbar.style.transform = 'translateY(0)';
          navbar.classList.add('is-visible');
        }
      } else {
        navbar.classList.remove('is-fixed', 'is-visible');
        navbar.style.transform = '';
      }

      lastScroll = currentScroll;
    }, 100));
  }

  // ===== Reading Progress =====
  function initReadingProgress() {
    const article = $('article');
    if (!article) return;

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    Object.assign(progressBar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '0%',
      height: '2px',
      background: 'linear-gradient(90deg, #c8402d 0%, #e85a4a 100%)',
      zIndex: '9999',
      transition: 'width 0.1s ease-out'
    });
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', throttle(() => {
      const rect = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleHeight = article.offsetHeight;
      const progress = Math.min(100, Math.max(0,
        ((-rect.top + windowHeight) / (articleHeight + windowHeight)) * 100
      ));
      progressBar.style.width = progress + '%';
    }, 50));
  }

  // ===== Font Loading =====
  function initFontLoading() {
    // Wait for fonts to load before revealing content
    if (document.fonts) {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    }
  }

  // ===== Add data-reveal attributes =====
  function addRevealAttributes() {
    $$('.post-preview, .sidebar-container').forEach((el, index) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
        el.style.transitionDelay = (index * 0.05) + 's';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      }
    });
  }

  // ===== CSS for revealed elements =====
  function injectRevealStyles() {
    const style = document.createElement('style');
    style.textContent = `
      [data-reveal].revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== Initialize =====
  function init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('Ink Dust Theme initialized');

    // Initialize components
    if (config.inkSplatterEnabled) {
      // Add ink splatter to interactive elements
      $$('a, button').forEach(el => new InkSplatter(el));
    }

    if (config.scrollRevealEnabled) {
      injectRevealStyles();
      addRevealAttributes();
      new ScrollReveal({ threshold: 0.1 });
    }

    if (config.smoothScrollEnabled) {
      initSmoothScroll();
    }

    if (config.parallaxEnabled) {
      new Parallax();
    }

    initNavbar();
    initReadingProgress();
    initFontLoading();

    // Re-observe dynamically added content
    const observer = new MutationObserver(() => {
      addRevealAttributes();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Expose to global scope
  window.InkDust = {
    init,
    ScrollReveal,
    Parallax,
    InkSplatter,
    config
  };

  // Auto-initialize
  init();

})();
