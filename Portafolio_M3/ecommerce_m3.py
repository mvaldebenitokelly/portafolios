"""
E-commerce CLI - Módulo 3 (Fundamentos de Python)

Ejecutar:
    python ecommerce_m3.py

Notas:
- Catálogo en memoria (lista de diccionarios).
- Carrito en memoria (diccionario por id).
- Enfoque: tipos de datos, condicionales, ciclos, estructuras y funciones.
"""

from __future__ import annotations

from typing import Dict, List, Optional, Tuple


def mostrar_menu() -> None:
    print("\nBienvenido/a a tu Ecommerce")
    print(" 1) Ver catálogo de productos")
    print(" 2) Buscar producto por nombre o categoría")
    print(" 3) Agregar producto al carrito")
    print(" 4) Ver carrito y total")
    print(" 5) Vaciar carrito")
    print(" 0) Salir")


def crear_catalogo_inicial() -> List[dict]:
    # Catálogo mínimo: 5 productos, con id único, nombre, categoría y precio > 0
    return [
        {"id": 1, "nombre": "Notebook 14'' (i5, 16GB, 512GB SSD)", "categoria": "tecnologia", "precio": 699990.0},
        {"id": 2, "nombre": "Mouse inalámbrico USB", "categoria": "tecnologia", "precio": 12990.0},
        {"id": 3, "nombre": "Polera básica algodón", "categoria": "ropa", "precio": 9990.0},
        {"id": 4, "nombre": "Zapatillas urbanas", "categoria": "ropa", "precio": 39990.0},
        {"id": 5, "nombre": "Set de tazas cerámica (x2)", "categoria": "hogar", "precio": 14990.0},
    ]


def obtener_producto_por_id(catalogo: List[dict], producto_id: int) -> Optional[dict]:
    for p in catalogo:
        if p["id"] == producto_id:
            return p
    return None


def listar_productos(catalogo: List[dict]) -> None:
    print("\n=== Catálogo de productos ===")
    print(f"{'ID':<4} {'Nombre':<45} {'Categoría':<12} {'Precio':>10}")
    print("-" * 78)
    for p in catalogo:
        print(f"{p['id']:<4} {p['nombre']:<45} {p['categoria']:<12} ${p['precio']:>9,.0f}")
    print("-" * 78)


def buscar_productos(catalogo: List[dict]) -> None:
    texto = input("\nIngrese texto de búsqueda (nombre o categoría): ").strip().lower()
    if not texto:
        print("⚠️  Búsqueda vacía. Intente nuevamente.")
        return

    resultados = []
    for p in catalogo:
        if texto in p["nombre"].lower() or texto in p["categoria"].lower():
            resultados.append(p)

    if not resultados:
        print("No se encontraron productos que coincidan con la búsqueda.")
        return

    print(f"\nSe encontraron {len(resultados)} producto(s):")
    listar_productos(resultados)


def leer_entero(mensaje: str) -> Optional[int]:
    valor = input(mensaje).strip()
    if not valor:
        return None
    try:
        return int(valor)
    except ValueError:
        return None


def leer_entero_positivo(mensaje: str) -> int:
    while True:
        n = leer_entero(mensaje)
        if n is None:
            print("⚠️  Debe ingresar un número entero.")
            continue
        if n <= 0:
            print("⚠️  El número debe ser mayor que 0.")
            continue
        return n


def agregar_al_carrito(catalogo: List[dict], carrito: Dict[int, dict]) -> None:
    print("\n=== Agregar producto al carrito ===")
    producto_id = leer_entero_positivo("Ingrese ID del producto: ")

    producto = obtener_producto_por_id(catalogo, producto_id)
    if producto is None:
        print("❌ Error: El ID ingresado no existe en el catálogo.")
        return

    cantidad = leer_entero_positivo("Ingrese cantidad (entero > 0): ")

    if producto_id in carrito:
        carrito[producto_id]["cantidad"] += cantidad
    else:
        carrito[producto_id] = {"producto": producto, "cantidad": cantidad}

    print(f"✅ Agregado: {cantidad} x {producto['nombre']}")


def mostrar_carrito_y_total(carrito: Dict[int, dict]) -> None:
    print("\n=== Carrito y total ===")

    if not carrito:
        print("El carrito está vacío.")
        return

    print(f"{'ID':<4} {'Nombre':<45} {'Cant':>5} {'P.Unit':>12} {'Subtotal':>12}")
    print("-" * 86)

    total = 0.0
    for item in carrito.values():
        p = item["producto"]
        c = item["cantidad"]
        subtotal = float(p["precio"]) * int(c)
        total += subtotal

        print(f"{p['id']:<4} {p['nombre']:<45} {c:>5} ${p['precio']:>11,.0f} ${subtotal:>11,.0f}")

    print("-" * 86)
    print(f"{'TOTAL A PAGAR':>70}  ${total:>11,.0f}")


def vaciar_carrito(carrito: Dict[int, dict]) -> None:
    if not carrito:
        print("\nEl carrito ya está vacío.")
        return
    carrito.clear()
    print("\n✅ Carrito vaciado correctamente.")


def ejecutar_app() -> None:
    catalogo = crear_catalogo_inicial()
    carrito: Dict[int, dict] = {}

    while True:
        mostrar_menu()
        opcion = input("\nSeleccione una opción: ").strip()

        if opcion == "1":
            listar_productos(catalogo)
        elif opcion == "2":
            buscar_productos(catalogo)
        elif opcion == "3":
            agregar_al_carrito(catalogo, carrito)
        elif opcion == "4":
            mostrar_carrito_y_total(carrito)
        elif opcion == "5":
            vaciar_carrito(carrito)
        elif opcion == "0":
            print("\nGracias por usar el Ecommerce. ¡Hasta luego!")
            break
        else:
            print("⚠️  Opción inválida. Intente nuevamente.")


if __name__ == "__main__":
    ejecutar_app()
