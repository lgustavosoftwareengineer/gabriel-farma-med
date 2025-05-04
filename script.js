import { diseases } from "./diseases.js";

function showCategory(categoryId) {
  document.querySelectorAll(".content").forEach((section) => {
    section.classList.add("hidden");
  });
  document.getElementById(categoryId).classList.remove("hidden");
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function search() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  document.querySelectorAll(".info-card").forEach((card) => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
}

function populateNeglectedDiseases() {
  const section = document.getElementById("negligenciadasContainer");
  section.innerHTML = "";
  diseases.forEach((disease) => {
    if (disease.category === "negligenciada") {
      const card = document.createElement("div");
      card.className = "info-card";
      card.innerHTML = `
        <strong>${disease.name}</strong>
        <p>${disease.causes}</p>
      `;
      card.addEventListener("click", () => {
        window.location.href = `detalhe-doenca.html?doenca=${encodeURIComponent(
          disease.name
        )}&origem=negligenciadas`;
      });
      section.appendChild(card);
    }
  });
}

function populateChronicDiseases() {
  const section = document.getElementById("cronicasContainer");
  section.innerHTML = "";
  diseases.forEach((disease) => {
    if (disease.category === "cronica") {
      const card = document.createElement("div");
      card.className = "info-card";
      card.innerHTML = `
        <strong>${disease.name}</strong>
        <p>${disease.causes}</p>
      `;
      card.addEventListener("click", () => {
        window.location.href = `detalhe-doenca.html?doenca=${encodeURIComponent(
          disease.name
        )}&origem=cronicas`;
      });
      section.appendChild(card);
    }
  });
}

function populateMedicamentos() {
  const section = document.getElementById("medicamentosContainer");
  section.innerHTML = "";
  const medicineMap = new Map();

  diseases.forEach((disease) => {
    if (disease.medicines) {
      disease.medicines.forEach((medicine) => {
        const key = medicine.name;
        if (!medicineMap.has(key)) {
          medicineMap.set(key, medicine);
        }
      });
    }
  });

  medicineMap.forEach((medicine) => {
    const card = document.createElement("div");
    card.className = "info-card";

    const bulaBtn = medicine.leafletUrl
      ? `<a class="bula-button" href="${medicine.leafletUrl}" target="_blank" rel="noopener noreferrer">📄 Bula</a>`
      : "";

    card.innerHTML = `
      <strong>${medicine.name}</strong>
      <p>${medicine.indication}</p>
      <div class="med-buttons">
        <button onclick="window.location.href='detalhe-medicamento.html?medicamento=${encodeURIComponent(
          medicine.name
        )}&origem=medicamentos'">Ver Detalhes</button>
        ${bulaBtn}
      </div>
    `;

    section.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
  populateNeglectedDiseases();
  populateChronicDiseases();
  populateMedicamentos();
});

window.showCategory = showCategory;
window.toggleDarkMode = toggleDarkMode;
window.scrollToTop = scrollToTop;
window.search = search;
