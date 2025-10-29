async function fetchStats() {
  const response = await fetch('/api/stats');
  if (!response.ok) throw new Error('Impossible de charger les stats');
  return response.json();
}

function renderKpis({ sessions7d, leads7d, conversion }) {
  document.getElementById('kpi-sessions').textContent = sessions7d;
  document.getElementById('kpi-leads').textContent = leads7d;
  document.getElementById('kpi-conversion').textContent = `${conversion}%`;
}

function renderTopPages(pages) {
  const tbody = document.querySelector('#top-pages tbody');
  tbody.innerHTML = '';
  pages.forEach((page) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${page.path}</td><td>${page.sessions}</td>`;
    tbody.appendChild(tr);
  });
}

async function fetchEvents() {
  const response = await fetch('/api/events?limit=20');
  if (!response.ok) return [];
  return response.json();
}

function renderEvents(events) {
  const list = document.getElementById('events');
  list.innerHTML = '';
  events.forEach((event) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${event.name}</strong> — ${new Date(event.date).toLocaleString('fr-FR')}<br><small>${JSON.stringify(event.props || {})}</small>`;
    list.appendChild(item);
  });
}

async function init() {
  try {
    const [stats, events] = await Promise.all([fetchStats(), fetchEvents()]);
    renderKpis(stats);
    renderTopPages(stats.topPages);
    renderEvents(events);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', init);
