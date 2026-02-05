// product-page.js
import { PRODUCTS } from "./products.js";
import { addToCart } from "./cart.js";
import { formatCLP, setActiveNav, updateCartBadge } from "./ui.js";

function getId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderDetail(product) {
  const title = document.getElementById("productTitle");
  const img = document.getElementById("productImage");
  const price = document.getElementById("productPrice");
  const desc = document.getElementById("productDescription");
  const tag = document.getElementById("productTag");

  title.textContent = product.name;
  img.src = product.image;
  img.alt = product.alt;
  price.textContent = formatCLP(product.price);
  desc.textContent = product.description;
  tag.textContent = product.tag;

  const addBtn = document.getElementById("addToCartBtn");
  addBtn.addEventListener("click", () => {
    addToCart(product.id, 1);
    updateCartBadge();
    addBtn.textContent = "Agregado ✓";
    setTimeout(() => (addBtn.textContent = "Agregar al carrito"), 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  updateCartBadge();

  const id = getId();
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    document.getElementById("detailArea").innerHTML = `
      <div class="alert alert-warning" role="alert">
        Producto no encontrado. Vuelve al <a href="index.html" class="alert-link">inicio</a>.
      </div>
    `;
    return;
  }
  renderDetail(product);
});