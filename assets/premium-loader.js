// ========================================
// 🎬 LVLIA - SYSTÈME DE LOADING PREMIUM
// Loaders animés, splash screens, transitions
// ========================================

// ========================================
// 💫 LOADER PRINCIPAL (PAGE LOAD)
// ========================================
class PremiumLoader {
  constructor(options = {}) {
    this.duration = options.duration || 1500;
    this.logo = options.logo || '🌱';
    this.text = options.text || 'Chargement...';
    this.gradient = options.gradient || 'linear-gradient(135deg, #059669, #0F766E)';
    
    this.createLoader();
  }
  
  createLoader() {
    // Ne créer que si pas déjà présent
    if (document.querySelector('.premium-page-loader')) return;
    
    const loader = document.createElement('div');
    loader.className = 'premium-page-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-logo">${this.logo}</div>
        <div class="loader-spinner"></div>
        <p class="loader-text">${this.text}</p>
        <div class="loader-progress">
          <div class="loader-progress-bar"></div>
        </div>
      </div>
    `;
    
    // Styles inline pour garantir le fonctionnement
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${this.gradient};
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    document.body.appendChild(loader);
    this.loader = loader;
    
    // Injecter les styles
    this.injectStyles();
    
    // Simuler la progression
    this.animateProgress();
  }
  
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .loader-content {
        text-align: center;
        color: white;
      }
      
      .loader-logo {
        font-size: 5rem;
        margin-bottom: 24px;
        animation: loaderPulse 1.5s infinite ease-in-out;
      }
      
      .loader-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        margin: 0 auto 24px;
        animation: spin 1s linear infinite;
      }
      
      .loader-text {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 32px;
        animation: loaderPulse 2s infinite;
      }
      
      .loader-progress {
        width: 300px;
        height: 4px;
        background: rgba(255,255,255,0.2);
        border-radius: 999px;
        overflow: hidden;
        margin: 0 auto;
      }
      
      .loader-progress-bar {
        height: 100%;
        background: white;
        border-radius: 999px;
        width: 0%;
        transition: width 0.3s ease;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes loaderPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(0.95); }
      }
    `;
    document.head.appendChild(style);
  }
  
  animateProgress() {
    const bar = this.loader.querySelector('.loader-progress-bar');
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 100) progress = 100;
      bar.style.width = progress + '%';
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => this.hide(), 300);
      }
    }, 150);
  }
  
  hide() {
    this.loader.style.opacity = '0';
    this.loader.style.visibility = 'hidden';
    setTimeout(() => this.loader.remove(), 500);
  }
}

// ========================================
// ⏳ LOADER INLINE (pour sections)
// ========================================
class InlineLoader {
  constructor(container, options = {}) {
    this.container = container;
    this.size = options.size || 'medium';
    this.color = options.color || '#059669';
    this.text = options.text || '';
    
    this.create();
  }
  
  create() {
    const sizes = {
      small: { spinner: 24, fontSize: 14 },
      medium: { spinner: 40, fontSize: 16 },
      large: { spinner: 60, fontSize: 20 }
    };
    
    const config = sizes[this.size];
    
    this.element = document.createElement('div');
    this.element.className = 'inline-loader';
    this.element.innerHTML = `
      <div class="inline-loader-spinner" style="
        width: ${config.spinner}px;
        height: ${config.spinner}px;
        border: 3px solid rgba(0,0,0,0.1);
        border-top-color: ${this.color};
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto;
      "></div>
      ${this.text ? `<p style="margin-top: 12px; font-size: ${config.fontSize}px; color: ${this.color};">${this.text}</p>` : ''}
    `;
    
    this.element.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
    `;
    
    this.container.appendChild(this.element);
  }
  
  remove() {
    this.element.style.opacity = '0';
    this.element.style.transition = 'opacity 0.3s';
    setTimeout(() => this.element.remove(), 300);
  }
}

// ========================================
// 🌊 LOADER SKELETON (pour contenu)
// ========================================
class SkeletonLoader {
  static createCard() {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton-img"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    `;
    return skeleton;
  }
  
  static createLine(width = '100%') {
    const line = document.createElement('div');
    line.className = 'skeleton-line';
    line.style.width = width;
    return line;
  }
  
  static injectStyles() {
    if (document.querySelector('#skeleton-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'skeleton-styles';
    style.textContent = `
      .skeleton-card {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      
      .skeleton-img {
        height: 200px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
        margin-bottom: 16px;
      }
      
      .skeleton-text {
        height: 16px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 12px;
      }
      
      .skeleton-text.short {
        width: 60%;
      }
      
      .skeleton-line {
        height: 12px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 8px;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ========================================
// 🎯 LOADER AVEC TIPS
// ========================================
class LoaderWithTips {
  constructor(container, tips = []) {
    this.container = container;
    this.tips = tips.length ? tips : [
      '🌱 Saviez-vous ? Les micro-serres LVLIA économisent 90% d\'eau',
      '💡 Production 365 jours par an, même en hiver',
      '🎯 ROI moyen constaté : 9 mois',
      '✨ Monitoring temps réel depuis votre smartphone',
      '🌍 Fabriqué en Normandie avec amour'
    ];
    
    this.currentTip = 0;
    this.create();
  }
  
  create() {
    this.element = document.createElement('div');
    this.element.className = 'loader-with-tips';
    this.element.innerHTML = `
      <div class="loader-spinner" style="
        width: 50px;
        height: 50px;
        border: 4px solid rgba(5,150,105,0.2);
        border-top-color: #059669;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 24px;
      "></div>
      <p class="loader-tip" style="
        font-size: 1.1rem;
        color: #059669;
        text-align: center;
        max-width: 500px;
        margin: 0 auto;
        min-height: 60px;
        animation: fadeIn 0.5s;
      ">${this.tips[0]}</p>
    `;
    
    this.container.appendChild(this.element);
    this.rotateTips();
  }
  
  rotateTips() {
    this.interval = setInterval(() => {
      this.currentTip = (this.currentTip + 1) % this.tips.length;
      const tipElement = this.element.querySelector('.loader-tip');
      tipElement.style.opacity = '0';
      
      setTimeout(() => {
        tipElement.textContent = this.tips[this.currentTip];
        tipElement.style.opacity = '1';
      }, 300);
    }, 4000);
  }
  
  remove() {
    clearInterval(this.interval);
    this.element.style.opacity = '0';
    this.element.style.transition = 'opacity 0.3s';
    setTimeout(() => this.element.remove(), 300);
  }
}

// ========================================
// 🎨 AUTO-INIT AU CHARGEMENT DE PAGE
// ========================================
window.addEventListener('load', () => {
  // Auto-hide du loader si présent
  const existingLoader = document.querySelector('.page-loader, .premium-page-loader');
  if (existingLoader) {
    setTimeout(() => {
      existingLoader.style.opacity = '0';
      setTimeout(() => existingLoader.remove(), 500);
    }, 800);
  }
});

// Injecter les styles skeleton au chargement
SkeletonLoader.injectStyles();

// ========================================
// 📤 EXPORT GLOBAL
// ========================================
window.LVLIALoaders = {
  PremiumLoader,
  InlineLoader,
  SkeletonLoader,
  LoaderWithTips
};

console.log('⏳ LVLIA Premium Loaders chargés !');
