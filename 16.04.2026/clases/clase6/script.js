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

let tablasHTML = "";
for(let i = 1; i <= 10; i++){
    tablasHTML += `<p><strong>Tabla del ${i}:</strong></p>`;
    for (let j = 1; j <= 10; j++){
        tablasHTML += `<p>${i} × ${j} = ${i * j}</p>`;
    }
}

document.getElementById("contenido").innerHTML = `
    <p><strong>Productos y precios:</strong></p>
    ${listaProductos}
    <p><strong>Suma total:</strong> Bs ${sumaPrecios}</p>
    <p><strong>Promedio:</strong> Bs ${promedio.toFixed(2)}</p>
    <p><strong>Números 1 al 10:</strong> ${numeros}</p>
    <p><strong>Tablas de multiplicar:</strong></p>
    ${tablasHTML}
`;

console.log("TABLA DE MULTIPLICAR")
for(let i = 1; i <= 10; i++){
    console.log(`Tabla del ${i}:`)
    for (let j = 1; j <= 10; j++){
        console.log(`${i} × ${j} = ${i * j}`);
    }
}

console.log("Productos:", productos);
console.log("Suma de precios:", sumaPrecios);
console.log("Promedio:", promedio);