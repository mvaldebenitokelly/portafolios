// ui.js
// Utilidades de UI: navbar activa, contador de carrito, formato moneda.

import { countCartItems } from "./cart.js";

export function formatCLP(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function setActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const target = a.getAttribute("href");
    if (target === path) a.classList.add("active");
    else a.classList.remove("active");
  });
}

export function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const n = countCartItems();
  badge.textContent = String(n);
  badge.setAttribute("aria-label", `Carrito: ${n} productos`);
}