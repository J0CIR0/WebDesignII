let nombre = "Josue";
let edad = 25;
let esEmprendedor = true;
let productos = ["Web", "Bot", "Inventario"];
let calificacion = 4.7;

document.getElementById("contenido").innerHTML = `
    <p>String: ${nombre} → tipo: ${typeof nombre}</p>
    <p>Number: ${edad} → tipo: ${typeof edad}</p>
    <p>Boolean: ${esEmprendedor} → tipo: ${typeof esEmprendedor}</p>
    <p>Array: ${productos} → tipo: ${typeof productos}</p>
    <p>Number decimal: ${calificacion} → tipo: ${typeof calificacion}</p>
`;

console.log("String:", nombre, typeof nombre);
console.log("Number:", edad, typeof edad);
console.log("Boolean:", esEmprendedor, typeof esEmprendedor);