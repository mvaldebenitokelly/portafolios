// cart-page.js
import { PRODUCTS } from "./products.js";
import { readCart, removeFromCart, clearCart, addToCart } from "./cart.js";
import { formatCLP, setActiveNav, updateCartBadge } from "./ui.js";

function toProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function computeTotals(lines) {
  const subtotal = lines.reduce((acc, ln) => acc + ln.price * ln.qty, 0);
  return { subtotal };
}

function render() {
  const tbody = document.getElementById("cartBody");
  const empty = document.getElementById("cartEmpty");
  const tableWrap = document.getElementById("cartTableWrap");

  const cart = readCart();
  if (!cart.length) {
    empty.classList.remove("d-none");
    tableWrap.classList.add("d-none");
    document.getElementById("cartSubtotal").textContent = formatCLP(0);
    return;
  }

  empty.classList.add("d-none");
  tableWrap.classList.remove("d-none");

  const lines = cart
    .map((it) => {
      const p = toProduct(it.id);
      if (!p) return null;
      return { id: p.id, name: p.name, price: p.price, qty: it.qty };
    })
    .filter(Boolean);

  tbody.innerHTML = lines
    .map(
      (ln) => `
    <tr>
      <th scope="row">${ln.name}</th>
      <td class="text-nowrap">${formatCLP(ln.price)}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-secondary" data-dec="${ln.id}" aria-label="Disminuir cantidad de ${ln.name}">-</button>
          <span class="fw-semibold" aria-label="Cantidad">${ln.qty}</span>
          <button class="btn btn-sm btn-outline-secondary" data-inc="${ln.id}" aria-label="Aumentar cantidad de ${ln.name}">+</button>
        </div>
      </td>
      <td class="text-nowrap fw-semibold">${formatCLP(ln.price * ln.qty)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-danger" data-remove="${ln.id}" aria-label="Eliminar ${ln.name} del carrito">
          Eliminar
        </button>
      </td>
    </tr>
  `
    )
    .join("");

  const { subtotal } = computeTotals(lines);
  document.getElementById("cartSubtotal").textContent = formatCLP(subtotal);
}

function bind() {
  document.addEventListener("click", (ev) => {
    const rm = ev.target.closest("[data-remove]");
    const inc = ev.target.closest("[data-inc]");
    const dec = ev.target.closest("[data-dec]");
    const clr = ev.target.closest("[data-clear]");

    if (rm) {
      removeFromCart(rm.getAttribute("data-remove"));
      updateCartBadge();
      render();
      return;
    }
    if (clr) {
      clearCart();
      updateCartBadge();
      render();
      return;
    }
    if (inc) {
      addToCart(inc.getAttribute("data-inc"), 1);
      updateCartBadge();
      render();
      return;
    }
    if (dec) {
      const id = dec.getAttribute("data-dec");
      const cart = readCart();
      const item = cart.find((x) => x.id === id);
      if (!item) return;
      if (item.qty <= 1) removeFromCart(id);
      else {
        item.qty -= 1;
        localStorage.setItem("m2_cart", JSON.stringify(cart));
      }
      updateCartBadge();
      render();
      return;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  updateCartBadge();
  render();
  bind();
});