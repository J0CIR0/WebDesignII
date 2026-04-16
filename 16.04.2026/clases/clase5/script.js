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
        resultado = "<p>Opción no válida. Recarga la página y elige 1, 2, 3 o 4.</p>";
}

let dia = new Date().getDay();
let mensajeDia = "";

switch (dia) {
    case 0:
        mensajeDia = "Domingo - Cerrados";
        break;
    case 6:
        mensajeDia = "Sábado - 9am a 1pm";
        break;
    default:
        mensajeDia = "Lunes a Viernes - 9am a 6pm";
}

document.getElementById("contenido").innerHTML = `
    <p><strong>Tu elección:</strong></p>
    ${resultado}
    <hr>
    <p><strong>Horario:</strong> ${mensajeDia}</p>
    <hr>
    <p><strong>Ejercicio 1:</strong> Crea un switch que pregunte el mes (1-12) y muestre la estación.</p>
    <p><strong>Ejercicio 2:</strong> Pregunta el día de la semana y muestra si es laboral.</p>
`;

console.log("Opción elegida:", menu);
console.log("Día de la semana:", dia);