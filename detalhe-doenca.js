import { diseases } from './diseases.js';

const params = new URLSearchParams(window.location.search);
const diseaseName = params.get('doenca');
const origem = params.get('origem') || 'medicamentos';

const title = document.getElementById('diseaseName');
const container = document.getElementById('diseaseDetails');

const disease = diseases.find(d => d.name === diseaseName);

if (disease) {
  title.textContent = disease.name;

  // Card resumido clicável
  container.innerHTML = `
    <div class="info-card">
      <strong>Clique para ver detalhes da doença</strong>
      <p style="opacity: 0.7;">${disease.name}</p>
    </div>
  `;

  // Card detalhado oculto
  const detailCard = document.createElement('div');
  detailCard.className = 'info-card';
  detailCard.style.display = 'none';
  detailCard.innerHTML = `
    <p><strong>Causas:</strong> ${disease.causes}</p>
    <p><strong>Sintomas:</strong> ${disease.symptoms}</p>
    <p><strong>Tratamentos:</strong> ${disease.treatments}</p>
    <p><strong>Prevenção:</strong> ${disease.prevention}</p>
  `;
  container.appendChild(detailCard);

  // Mostrar detalhes ao clicar
  container.firstElementChild.addEventListener('click', () => {
    detailCard.style.display = 'block';
    container.firstElementChild.style.display = 'none';
  });

  // Medicamentos relacionados
  if (disease.medicines?.length > 0) {
    const heading = document.createElement('h2');
    heading.textContent = 'Medicamentos relacionados';
    container.appendChild(heading);

    disease.medicines.forEach(med => {
      const medCard = document.createElement('div');
      medCard.className = 'info-card';
      medCard.innerHTML = `
        <strong>${med.name}</strong>
        <p><strong>Indicação:</strong> ${med.indication}</p>
        <div class="med-buttons">
          <button class="view-more">Ver Detalhes</button>
          ${med.leafletUrl ? `<a class="bula-button" href="${med.leafletUrl}" target="_blank" rel="noopener noreferrer">📄 Bula</a>` : ''}
        </div>
      `;

      // Redirecionar ao clicar no botão "Ver Detalhes"
      medCard.querySelector('.view-more')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = `detalhe-medicamento.html?medicamento=${encodeURIComponent(med.name)}&origem=${origem}`;
      });

      container.appendChild(medCard);
    });
  }

} else {
  title.textContent = "Doença não encontrada";
}
