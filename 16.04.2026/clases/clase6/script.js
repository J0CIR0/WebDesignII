let precios = [15000, 8000, 25000, 1250, 20];
let productos = ["Web básica", "Bot redes", "Sistema inventario", "Hola", "Hola mundo"];

let listaProductos = "<ul>";
let sumaPrecios = 0;

for (let i = 0; i < productos.length; i++) {
    listaProductos += `<li>${productos[i]} - Bs ${precios[i]}</li>`;
    sumaPrecios += precios[i];
}

let promedio = sumaPrecios / precios.length;

let numeros = "";
for (let i = 1; i <= 10; i++) {
    numeros += i + " ";
}

document.getElementById("contenido").innerHTML = `
    <p><strong>Productos y precios:</strong></p>
    ${listaProductos}
    <p><strong>Suma total:</strong> Bs ${sumaPrecios}</p>
    <p><strong>Promedio:</strong> Bs ${promedio.toFixed(2)}</p>
    <hr>
    <p><strong>Números 1 al 10:</strong> ${numeros}</p>
    <hr>
    <p><strong>Ejercicio 1:</strong> Usa un for para mostrar los números pares del 2 al 20.</p>
    <p><strong>Ejercicio 2:</strong> Crea un array con 5 nombres y muéstralos con un for.</p>
`;

console.log("Productos:", productos);
console.log("Suma de precios:", sumaPrecios);
console.log("Promedio:", promedio);