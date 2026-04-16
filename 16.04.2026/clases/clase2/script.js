let nombre = "Josue";
let edad = 25;
let esEmprendedor = true;
let productos = ["Web", "Bot", "Inventario"];
let calificacion = 4.7;

document.getElementById("contenido").innerHTML = `
    <p><strong>String:</strong> ${nombre} → tipo: ${typeof nombre}</p>
    <p><strong>Number:</strong> ${edad} → tipo: ${typeof edad}</p>
    <p><strong>Boolean:</strong> ${esEmprendedor} → tipo: ${typeof esEmprendedor}</p>
    <p><strong>Array:</strong> ${productos} → tipo: ${typeof productos}</p>
    <p><strong>Number decimal:</strong> ${calificacion} → tipo: ${typeof calificacion}</p>
    <hr>
    <p><strong>Ejercicio 1:</strong> Crea una variable con tu ciudad (string).</p>
    <p><strong>Ejercicio 2:</strong> Crea una variable con tu altura (number).</p>
    <p><strong>Ejercicio 3:</strong> Crea una variable booleana que indique si estudias.</p>
`;

console.log("String:", nombre, typeof nombre);
console.log("Number:", edad, typeof edad);
console.log("Boolean:", esEmprendedor, typeof esEmprendedor);