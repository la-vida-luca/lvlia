/**
 * LVLIA - Simulateur ROI Interactif avec Chart.js
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Éléments DOM
  const nbPersonnesInput = document.getElementById('nbPersonnes');
  const consoLegumesInput = document.getElementById('consoLegumes');
  const prixLegumesInput = document.getElementById('prixLegumes');
  const calculateBtn = document.getElementById('calculateROI');
  const resultsDiv = document.getElementById('results');
  
  // Instance Chart.js
  let chartInstance = null;
  
  // Vérifier que les éléments existent
  if (!nbPersonnesInput || !consoLegumesInput || !prixLegumesInput || !calculateBtn || !resultsDiv) {
    console.warn('ROI Calculator: Éléments DOM manquants');
    return;
  }
  
  // === UPDATE SLIDERS DISPLAY ===
  function updateSliderValue(input, outputId) {
    const output = document.getElementById(outputId);
    if (output) {
      output.textContent = input.value;
    }
  }
  
  nbPersonnesInput.addEventListener('input', function() {
    updateSliderValue(this, 'nbPersonnesValue');
  });
  
  consoLegumesInput.addEventListener('input', function() {
    updateSliderValue(this, 'consoLegumesValue');
  });
  
  // === CALCUL ROI ===
  function calculateROI() {
    // Récupérer valeurs
    const nbPersonnes = parseInt(nbPersonnesInput.value);
    const consoLegumes = parseFloat(consoLegumesInput.value);
    const prixLegumes = parseFloat(prixLegumesInput.value);
    
    // Validation
    if (isNaN(nbPersonnes) || isNaN(consoLegumes) || isNaN(prixLegumes)) {
      alert('Veuillez remplir tous les champs correctement.');
      return;
    }
    
    if (consoLegumes === 0) {
      alert('La consommation de légumes doit être supérieure à 0.');
      return;
    }
    
    // === CALCULS ===
    // Économies hebdomadaires
    const economiesHebdo = consoLegumes * prixLegumes;
    
    // Économies annuelles
    const economiesAnnuelles = Math.round(economiesHebdo * 52);
    
    // Coût Pack Essentiel 1m² (le plus accessible)
    const coutAchat = 2990;
    const coutAbonnementMensuel = 89;
    const coutAbonnementAnnuel = coutAbonnementMensuel * 12; // 1068€
    
    // Coût total année 1
    const coutTotalAn1 = coutAchat + coutAbonnementAnnuel;
    
    // Économies nettes année 1 (après avoir payé achat + abonnement)
    const economiesNettesAn1 = economiesAnnuelles - coutAbonnementAnnuel;
    
    // ROI en mois (combien de temps pour rembourser l'investissement initial)
    const roiMois = Math.ceil(coutAchat / (economiesNettesAn1 / 12));
    
    // === AFFICHAGE RÉSULTATS ===
    document.getElementById('economiesAnnuelles').textContent = economiesAnnuelles.toLocaleString('fr-FR') + ' €';
    document.getElementById('coutTotal').textContent = coutTotalAn1.toLocaleString('fr-FR') + ' €';
    document.getElementById('roiMois').textContent = roiMois;
    
    // Afficher section résultats
    resultsDiv.style.display = 'block';
    
    // === DONNÉES GRAPHIQUE ÉCONOMIES CUMULÉES 5 ANS ===
    const economiesCumulees = [];
    let cumulative = -coutAchat; // Investissement initial négatif
    
    economiesCumulees.push(cumulative); // An 0 (achat)
    
    for (let year = 1; year <= 5; year++) {
      cumulative += economiesAnnuelles - coutAbonnementAnnuel;
      economiesCumulees.push(Math.round(cumulative));
    }
    
    // === CRÉER GRAPHIQUE CHART.JS ===
    const ctx = document.getElementById('roiChart');
    
    if (!ctx) {
      console.error('Canvas #roiChart non trouvé');
      return;
    }
    
    // Détruire ancien graphique si existe
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    // Créer nouveau graphique
    chartInstance = new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Achat', 'An 1', 'An 2', 'An 3', 'An 4', 'An 5'],
        datasets: [{
          label: 'Économies cumulées (€)',
          data: economiesCumulees,
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#059669',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(5, 150, 105, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return context.parsed.y.toLocaleString('fr-FR') + ' €';
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return value.toLocaleString('fr-FR') + ' €';
              },
              font: {
                size: 14,
                family: 'Inter, sans-serif'
              }
            },
            grid: {
              color: '#e5e7eb',
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14,
                weight: '600',
                family: 'Inter, sans-serif'
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
    
    // === TRACKING GA4 ===
    if (typeof gtag !== 'undefined') {
      gtag('event', 'roi_calculated', {
        'event_category': 'engagement',
        'event_label': 'simulateur_tarifs',
        'value': economiesAnnuelles
      });
    }
    
    // Tracking custom si fonction existe
    if (typeof window.trackLVLIAEvent === 'function') {
      window.trackLVLIAEvent('roi_calculated', 'conversion', 'simulateur', economiesAnnuelles);
    }
    
    // Scroll smooth vers résultats
    resultsDiv.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    
    console.log('✅ ROI calculé:', {
      economiesAnnuelles: economiesAnnuelles + '€',
      coutTotal: coutTotalAn1 + '€',
      roiMois: roiMois + ' mois',
      economiesCumulees5ans: economiesCumulees[5] + '€'
    });
  }
  
  // === EVENT LISTENER BOUTON CALCULER ===
  calculateBtn.addEventListener('click', calculateROI);
  
  // Calculer aussi avec Enter sur les inputs
  [nbPersonnesInput, consoLegumesInput, prixLegumesInput].forEach(function(input) {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        calculateROI();
      }
    });
  });
  
  // === TOGGLE PAIEMENT 1X / 3X ===
  const paymentToggleButtons = document.querySelectorAll('.payment-toggle button');
  
  paymentToggleButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Retirer active de tous
      paymentToggleButtons.forEach(function(b) {
        b.classList.remove('active');
      });
      
      // Ajouter active au cliqué
      this.classList.add('active');
      
      const mode = this.getAttribute('data-mode');
      
      // Afficher/masquer prix
      const prixSimples = document.querySelectorAll('.pricing-card .price');
      const prixMensuels = document.querySelectorAll('.pricing-card .price-monthly');
      
      if (mode === '3x') {
        prixSimples.forEach(function(el) {
          el.style.display = 'none';
        });
        prixMensuels.forEach(function(el) {
          el.style.display = 'block';
        });
      } else {
        prixSimples.forEach(function(el) {
          el.style.display = 'block';
        });
        prixMensuels.forEach(function(el) {
          el.style.display = 'none';
        });
      }
      
      // Tracking GA4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'toggle_paiement', {
          'event_category': 'engagement',
          'event_label': mode
        });
      }
    });
  });
  
  console.log('✅ ROI Calculator initialized');
});
