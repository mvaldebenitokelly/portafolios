// home.js
import { PRODUCTS } from "./products.js";
import { addToCart } from "./cart.js";
import { formatCLP, setActiveNav, updateCartBadge } from "./ui.js";

function productCard(p) {
  return `
    <article class="col-12 col-sm-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.alt}">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-start justify-content-between gap-2">
            <h2 class="h5 card-title mb-0">${p.name}</h2>
            <span class="badge text-bg-primary">${p.tag}</span>
          </div>
          <p class="card-text mt-2 text-secondary">${p.short}</p>
          <div class="mt-auto d-flex flex-wrap gap-2">
            <a class="btn btn-outline-secondary" href="product.html?id=${p.id}" aria-label="Ver detalle de ${p.name}">
              Ver detalle
            </a>
            <button class="btn btn-primary" data-add="${p.id}" type="button" aria-label="Agregar ${p.name} al carrito">
              Agregar al carrito
            </button>
          </div>
          <p class="mt-3 mb-0 fw-semibold">${formatCLP(p.price)}</p>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const container = document.getElementById("productsGrid");
  if (!container) return;
  container.innerHTML = PRODUCTS.map(productCard).join("");
}

function bindEvents() {
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-add]");
    if (!btn) return;
    const id = btn.getAttribute("data-add");
    addToCart(id, 1);
    updateCartBadge();
    // Feedback UX mínimo
    btn.blur();
    btn.textContent = "Agregado ✓";
    setTimeout(() => (btn.textContent = "Agregar al carrito"), 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  updateCartBadge();
  render();
  bindEvents();
});