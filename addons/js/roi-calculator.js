(function () {
  const form = document.getElementById('roi-calculator');
  if (!form) return;

  const resultsEl = document.getElementById('roi-results');
  const exportButton = document.getElementById('roi-export');

  const formatCurrency = (value) => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);

  const getPlan = ({ surface, budget, autonomy }) => {
    const models = [
      { name: 'Micro-serre Mistral 6', surface: 6, price: 8900, yieldPerM2: 18 },
      { name: 'Micro-serre Boréale 10', surface: 10, price: 13900, yieldPerM2: 20 },
      { name: 'Micro-serre Atlantique 20', surface: 20, price: 22900, yieldPerM2: 21 }
    ];

    const needs = {
      surfaceNeeded: Math.max(surface, (autonomy / 100) * 8),
      budgetYear: budget * 12
    };

    const recommended = models.reduce((best, model) => {
      const modelYield = model.surface * model.yieldPerM2;
      const autonomyReach = Math.min(100, (modelYield / (needs.surfaceNeeded * 15)) * 100);
      const payback = model.price / (needs.budgetYear || 1);
      const score = autonomyReach - payback * 2;
      if (!best || score > best.score) {
        return { model, autonomyReach, payback: Math.round(payback * 10) / 10, score };
      }
      return best;
    }, null);

    const energyCost = 12 * 0.18 * needs.surfaceNeeded;

    return {
      recommended,
      needs,
      energyCost
    };
  };

  const renderResults = (data) => {
    const { recommended, needs, energyCost } = data;
    const { model, autonomyReach, payback } = recommended;
    resultsEl.innerHTML = `
      <article class="roi-summary">
        <h3>Modèle conseillé : ${model.name}</h3>
        <p>Surface installée : <strong>${model.surface} m²</strong> (objectif ${needs.surfaceNeeded.toFixed(1)} m²).</p>
        <p>Autonomie estimée : <strong>${autonomyReach.toFixed(1)}%</strong> avec récoltes annuelles de ${Math.round(model.surface * model.yieldPerM2)} kg.</p>
        <p>Investissement : <strong>${formatCurrency(model.price)}</strong> (amortissement en environ <strong>${payback} ans</strong> avec votre budget actuel).</p>
        <p>Coût énergétique estimé : <strong>${formatCurrency(energyCost)}</strong> par an.</p>
      </article>
    `;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const inputs = {
      surface: Number(formData.get('surface')),
      budget: Number(formData.get('budget')),
      autonomy: Number(formData.get('autonomy'))
    };
    const plan = getPlan(inputs);
    renderResults(plan);
    form.dataset.plan = JSON.stringify(plan);
    document.dispatchEvent(new CustomEvent('roi:calculated', { detail: plan }));
  });

  exportButton?.addEventListener('click', async () => {
    if (!form.dataset.plan) {
      alert('Calculez votre plan avant d\'exporter.');
      return;
    }
    const jsPDF = await import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
    const plan = JSON.parse(form.dataset.plan);
    const doc = new jsPDF.jsPDF();
    doc.setFontSize(16);
    doc.text('Plan ROI Fermes Urbaines', 14, 20);
    doc.setFontSize(12);
    doc.text(`Modèle : ${plan.recommended.model.name}`, 14, 32);
    doc.text(`Autonomie estimée : ${plan.recommended.autonomyReach.toFixed(1)}%`, 14, 40);
    doc.text(`Amortissement : ${plan.recommended.payback} ans`, 14, 48);
    doc.text(`Budget annuel : ${formatCurrency(plan.needs.budgetYear)}`, 14, 56);
    doc.text(`Coût énergie : ${formatCurrency(plan.energyCost)}/an`, 14, 64);
    const fileName = `plan-roi-${Date.now()}.pdf`;
    doc.save(fileName);

    const arrayBuffer = doc.output('arraybuffer');
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    fetch('/api/roi-export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pdf: base64, fileName })
    }).catch(() => {});

    document.dispatchEvent(new CustomEvent('roi:exported', { detail: { fileName } }));
  });
})();
