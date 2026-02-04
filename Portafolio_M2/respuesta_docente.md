# respuesta_docente.md — Portafolio M2 (E-commerce Frontend)

> **Modelo CMA2 (Contexto → Marco conceptual → Aplicación → Aseguramiento/Autoevaluación)**  
> Objetivo: construir el **MVP del frontend** de un e-commerce cumpliendo pauta y rúbrica (HTML semántico, Bootstrap responsivo, JS DOM para carrito, Git/GitHub y README).

---

## 1) Contexto (C)

### 1.1 Problema a resolver
Se solicita desarrollar la **primera versión (MVP)** del frontend de una tienda online, con:
- Home con grilla de productos.
- Detalle de producto accesible desde Home.
- Carrito simulado con **contador en navbar** (se sugiere localStorage).
- Diseño responsivo (móvil ≤420px y escritorio ≥1024px).
- Entrega como proyecto `.zip`, con `README.md` y buenas prácticas para GitHub.

### 1.2 Enfoque de solución
Se implementó un sitio **estático** (sin backend), usando:
- **HTML5 semántico** para estructura clara.
- **Bootstrap por CDN** para layout y componentes.
- **JavaScript modular (ES Modules)** para:
  - Renderizar productos en Home desde un arreglo.
  - Gestionar carrito en `localStorage`.
  - Actualizar el contador (badge) en tiempo real.

---

## 2) Marco conceptual (M)

### 2.1 HTML5 semántico
Se usan etiquetas: `header`, `nav`, `main`, `section`, `article`, `footer`.
Propósito: mejorar legibilidad, accesibilidad y mantenibilidad.

### 2.2 Bootstrap y diseño responsivo (mobile-first)
- **Grid**: `container`, `row`, `col-*` para que las cards cambien según ancho.
- **Componentes**: `navbar`, `card`, `button`, `badge`.
- **Utilidades**: espaciados (`mt-*`, `py-*`), tipografía (`fw-bold`, `text-secondary`).

### 2.3 DOM + eventos (JS)
- `querySelector`, `getElementById`, `addEventListener`.
- Manejo de estado simple: carrito en `localStorage`.
- Eventos `click` para agregar/quitar elementos y actualizar UI.

### 2.4 Git/GitHub (buenas prácticas)
- Repo público sugerido: `ecommerce-frontend-m2`.
- Commits atómicos (mínimo 3), mensajes descriptivos.
- `.gitignore` y protección de `.env` (si existiera).

---

## 3) Aplicación (A) — Construcción paso a paso

> **Carpeta de trabajo:** `ecommerce-frontend-m2/`

### Paso 1 — Estructura base del proyecto
Se creó la siguiente estructura:

```
ecommerce-frontend-m2/
├─ index.html
├─ product.html
├─ cart.html
├─ contact.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  ├─ products.js
│  │  ├─ cart.js
│  │  ├─ ui.js
│  │  ├─ home.js
│  │  ├─ product-page.js
│  │  └─ cart-page.js
│  └─ img/
│     └─ *.jpg (placeholders)
├─ README.md
├─ .gitignore
└─ .env.example
```

**Decisión técnica:** separar responsabilidades (catálogo / carrito / UI / páginas).  
Esto puntúa en “Calidad de código”.

### Paso 2 — Navbar y contador (badge)
- Navbar con links a Home, Carrito y Contacto.
- Badge `#cartBadge` muestra cantidad total (suma de cantidades).
- Se actualiza en tiempo real con `updateCartBadge()`.

**Archivo clave:** `assets/js/ui.js`  
- `updateCartBadge()` lee carrito y actualiza el badge.

### Paso 3 — Catálogo de productos
**Archivo:** `assets/js/products.js`  
- Se define `PRODUCTS` como arreglo de objetos (`id`, `name`, `price`, etc.).
- Home renderiza cards con `PRODUCTS.map()`.

### Paso 4 — Home: grilla de productos
**Archivo:** `index.html` + `assets/js/home.js`  
- `render()` genera cards Bootstrap y las inserta en `#productsGrid`.
- Botón “Agregar” ejecuta `addToCart(id)` y actualiza badge.

### Paso 5 — Detalle de producto
**Archivo:** `product.html` + `assets/js/product-page.js`  
- Se lee `id` desde querystring: `product.html?id=p001`.
- Se busca el producto en `PRODUCTS`.
- Se renderiza imagen, descripción, precio y botón “Agregar”.

### Paso 6 — Carrito simulado
**Archivo:** `cart.html` + `assets/js/cart-page.js`  
- `readCart()` obtiene items desde localStorage.
- Se renderiza tabla con nombre, precio, cantidad, total.
- Acciones:
  - Incrementar/decrementar cantidad.
  - Eliminar producto.
  - Vaciar carrito.

### Paso 7 — Responsive y accesibilidad mínima
- Grid: `col-12 col-sm-6 col-lg-4` (móvil → desktop).
- Enfoque visible (`:focus-visible`) en `styles.css`.
- `aria-label` en botones de acciones del carrito.

### Paso 8 — README, .gitignore y entorno
- `README.md` explica ejecución y estructura.
- `.gitignore` ignora `.env`, carpetas de editor y builds.
- `.env.example` se deja como guía; **.env real no se versiona**.

---

## 4) Aseguramiento y Autoevaluación (A2)

### 4.1 Checklist de rúbrica (auto-revisión)
- **HTML semántico:** presente en todas las páginas.
- **Bootstrap responsivo:** grid + componentes + utilidades; probado en móvil y desktop.
- **JS/DOM:** contador en navbar en tiempo real; eventos click; código legible.
- **Navegación/UX:** navbar clara; flujo Home → Detalle → Carrito.
- **Calidad de código:** separación por archivos; nombres coherentes; comentarios útiles.
- **Git/README:** proyecto listo para repo público + commits atómicos (a realizar al subir).

### 4.2 Pruebas sugeridas (rápidas)
1. Abrir Home → agregar 2 productos → verificar badge.
2. Ir a Detalle desde “Ver detalle” → agregar → verificar badge.
3. Ir a Carrito → revisar cantidades y totales.
4. Probar móvil (ancho ~375px) y escritorio (~1366px).

---

## 5) Recomendación de industria: ¿Git Bash para subir a GitHub?

**Conclusión práctica:** *no es obligatorio*, pero **sí es recomendable**.

### Opción A — Git CLI (Git Bash) (más profesional)
Ventajas:
- Control total de ramas, commits, tags.
- Mensajes de commit consistentes.
- Flujo estándar de industria.

Cuándo usarlo:
- Si quieres que tus repos queden “como empresa”: historial limpio y trazable.

### Opción B — GitHub Desktop
Ventajas:
- Muy simple para comenzar.
- Reduce errores de comandos.

Cuándo usarlo:
- Si priorizas rapidez y estás enseñando a alumnos principiantes.

**Recomendación docente:**  
- Para tu portafolio profesional: **Git Bash** + convención de commits.  
- Para alumnos con carga cognitiva alta: iniciar con **GitHub Desktop** y luego migrar a CLI.

---

## 6) Entregable
Este portafolio queda listo para:
- abrir en VSCode,
- ejecutarse en navegador (idealmente con Live Server),
- subirse a GitHub con buenas prácticas (`README.md`, `.gitignore`, sin secretos).