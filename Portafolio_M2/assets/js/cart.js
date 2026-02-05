// cart.js
// Carrito simulado con localStorage (sugerido en la pauta).
// Clave: 'm2_cart' -> [{id, qty}]
const CART_KEY = "m2_cart";

export function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function countCartItems() {
  return readCart().reduce((acc, it) => acc + (it.qty || 0), 0);
}

export function addToCart(productId, qty = 1) {
  const cart = readCart();
  const idx = cart.findIndex((x) => x.id === productId);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  writeCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = readCart().filter((x) => x.id !== productId);
  writeCart(cart);
  return cart;
}

export function clearCart() {
  writeCart([]);
  return [];
}