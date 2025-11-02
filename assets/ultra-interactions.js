/**
 * 🔥 LVLIA ULTRA INTERACTIONS V3.0
 * JavaScript révolutionnaire avec effets jamais vus
 * Copyright 2025 - LVLIA Design System
 */

// ========================================
// 🎨 EFFET MAGNETIC CURSOR AVANCÉ
// ========================================
class MagneticCursor {
  constructor() {
    this.cursor = null;
    this.init();
  }

  init() {
    if (window.innerWidth < 768) return; // Pas sur mobile

    // Créer le curseur custom
    this.cursor = document.createElement('div');
    this.cursor.className = 'magnetic-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid var(--brand-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(this.cursor);

    // Suivre la souris
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    });

    // Effet magnétique sur éléments
    const magneticElements = document.querySelectorAll('.btn, .magnetic-btn, .card, a');
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.width = '60px';
        this.cursor.style.height = '60px';
        this.cursor.style.backgroundColor = 'rgba(5, 150, 105, 0.1)';
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.style.width = '40px';
        this.cursor.style.height = '40px';
        this.cursor.style.backgroundColor = 'transparent';
      });

      el.addEventListener('click', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
        setTimeout(() => {
          this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
      });
    });
  }
}

// ========================================
// 💫 SYSTÈME DE PARTICULES AVANCÉ
// ========================================
class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.particles = [];
    this.options = {
      count: options.count || 50,
      speed: options.speed || 1,
      size: options.size || 3,
      color: options.color || 'rgba(5, 150, 105, 0.6)',
      ...options
    };
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  createParticles() {
    for (let i = 0; i < this.options.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: Math.random() * this.options.size + 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      // Mettre à jour position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Rebond sur les bords
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Dessiner particule
      this.ctx.fillStyle = this.options.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Connecter particules proches
      this.particles.forEach(other => {
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.strokeStyle = `rgba(5, 150, 105, ${0.2 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// 🎭 EFFET PARALLAX MULTI-COUCHES
// ========================================
class ParallaxSystem {
  constructor() {
    this.layers = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.layers.length === 0) return;

    window.addEventListener('scroll', () => this.update());
    window.addEventListener('mousemove', (e) => this.mouseParallax(e));
  }

  update() {
    const scrollTop = window.pageYOffset;

    this.layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallax) || 0.5;
      const yPos = -(scrollTop * speed);
      layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  mouseParallax(e) {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    this.layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 1;
      const moveX = mouseX * depth * 50;
      const moveY = mouseY * depth * 50;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  }
}

// ========================================
// ✨ EFFET TEXT REVEAL AU SCROLL
// ========================================
class TextReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-text-reveal]');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealText(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.elements.forEach(el => observer.observe(el));
  }

  revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.animation = `fadeInChar 0.1s ease-out ${index * 0.03}s forwards`;
      element.appendChild(span);
    });
  }
}

// Ajouter l'animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInChar {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ========================================
// 🎨 EFFET MORPHING BACKGROUND
// ========================================
class MorphingBackground {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.style.background = 'linear-gradient(135deg, #059669, #0F766E, #2ec4b6)';
    this.element.style.backgroundSize = '400% 400%';
    
    let hue = 0;
    setInterval(() => {
      hue = (hue + 1) % 360;
      this.element.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);
  }
}

// ========================================
// 🌟 EFFET CONSTELLATION
// ========================================
class Constellation {
  constructor(container) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.init();
  }

  init() {
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;
    this.container.appendChild(this.canvas);
    this.resize();
    this.createStars(100);
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
  }

  createStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        twinkleSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.stars.forEach(star => {
      // Effet scintillement
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0) {
        star.twinkleSpeed *= -1;
      }

      // Dessiner étoile
      this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Effet glow
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'white';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// 🎯 EFFET RIPPLE AU CLIC
// ========================================
class RippleEffect {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      this.createRipple(e.clientX, e.clientY);
    });
  }

  createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(5, 150, 105, 0.4), transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      animation: rippleExpand 1s ease-out;
      left: ${x - 10}px;
      top: ${y - 10}px;
    `;
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1000);
  }
}

// Ajouter animation ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleExpand {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(50);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ========================================
// 🔮 EFFET HOLOGRAM
// ========================================
class HologramEffect {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.style.position = 'relative';
    
    const scanline = document.createElement('div');
    scanline.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, transparent, rgba(0, 240, 255, 0.8), transparent);
      animation: scanlineMove 2s linear infinite;
      pointer-events: none;
    `;
    this.element.appendChild(scanline);

    const noise = document.createElement('div');
    noise.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence baseFrequency="0.9"/></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
      pointer-events: none;
      mix-blend-mode: overlay;
    `;
    this.element.appendChild(noise);
  }
}

// Animation scanline
const hologramStyle = document.createElement('style');
hologramStyle.textContent = `
  @keyframes scanlineMove {
    from { top: 0; }
    to { top: 100%; }
  }
`;
document.head.appendChild(hologramStyle);

// ========================================
// 🚀 INITIALISATION AUTOMATIQUE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Curseur magnétique
  new MagneticCursor();

  // Système de particules sur hero
  const heroSections = document.querySelectorAll('.hero');
  heroSections.forEach(hero => {
    if (hero.classList.contains('hero-hydro') || hero.classList.contains('hero-autonomie')) {
      // Déjà des particules inline
    } else {
      new ParticleSystem(hero, {
        count: 30,
        speed: 0.5,
        color: 'rgba(5, 150, 105, 0.4)'
      });
    }
  });

  // Parallax
  new ParallaxSystem();

  // Text reveal
  new TextReveal();

  // Ripple effect
  new RippleEffect();

  // Constellation sur sections dark
  const darkSections = document.querySelectorAll('.section.dark, .hero-autonomie, .hero-hydro');
  darkSections.forEach(section => {
    if (section.querySelector('canvas') === null) {
      // Éviter de dupliquer si déjà présent
      new Constellation(section);
    }
  });

  // Hologram sur cards spéciales
  const hologramCards = document.querySelectorAll('[data-hologram]');
  hologramCards.forEach(card => new HologramEffect(card));

  console.log('🔥 LVLIA Ultra Effects activés !');
});

// ========================================
// 🎨 EXPORT POUR UTILISATION GLOBALE
// ========================================
window.LVLIAUltra = {
  MagneticCursor,
  ParticleSystem,
  ParallaxSystem,
  TextReveal,
  MorphingBackground,
  Constellation,
  RippleEffect,
  HologramEffect
};
