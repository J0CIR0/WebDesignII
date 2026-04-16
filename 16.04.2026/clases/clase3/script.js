let a = 10;
let b = 5;
let suma = a + b;
let resta = a - b;
let multiplicacion = a * b;
let division = a / b;

let comparacion1 = (10 === 10);
let comparacion2 = (10 === "10");
let comparacion3 = (10 > 5);
let comparacion4 = (3 < 1);

document.getElementById("contenido").innerHTML = `
    <p><strong>Operaciones:</strong></p>
    <p>${a} + ${b} = ${suma}</p>
    <p>${a} - ${b} = ${resta}</p>
    <p>${a} × ${b} = ${multiplicacion}</p>
    <p>${a} ÷ ${b} = ${division}</p>
    <hr>
    <p><strong>Comparaciones:</strong></p>
    <p>10 === 10 → ${comparacion1}</p>
    <p>10 === "10" → ${comparacion2}</p>
    <p>10 > 5 → ${comparacion3}</p>
    <p>3 < 1 → ${comparacion4}</p>
    <hr>
    <p><strong>Ejercicio 1:</strong> Calcula 15 + 30 y muestra el resultado.</p>
    <p><strong>Ejercicio 2:</strong> Compara si 20 es mayor que 15.</p>
`;

console.log("Suma:", suma);
console.log("10 === '10':", comparacion2);