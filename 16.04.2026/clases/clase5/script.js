let menu = prompt("Elige un servicio:\n1. Página web\n2. Bot redes sociales\n3. Sistema inventario\n4. Consultoría");

let resultado = "";

switch (menu) {
    case "1":
        resultado = "<p>Elegiste Página web. Precio: Bs 15,000</p>";
        break;
    case "2":
        resultado = "<p>Elegiste Bot para redes. Precio: Bs 8,000</p>";
        break;
    case "3":
        resultado = "<p>Elegiste Sistema inventario. Precio: Bs 25,000</p>";
        break;
    case "4":
        resultado = "<p>Elegiste Consultoría. Contáctanos para cotizar.</p>";
        break;
    default:
        resultado = "<p>Opción no válida. Elige 1, 2, 3 o 4.</p>";
}

document.getElementById("contenido").innerHTML = resultado;

console.log("Opción elegida:", menu);