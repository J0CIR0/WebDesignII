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
    <p>${a} + ${b} = ${suma}</p>
    <p>${a} - ${b} = ${resta}</p>
    <p>${a} × ${b} = ${multiplicacion}</p>
    <p>${a} ÷ ${b} = ${division}</p>
    <p>10 === 10 → ${comparacion1}</p>
    <p>10 === "10" → ${comparacion2}</p>
    <p>10 > 5 → ${comparacion3}</p>
    <p>3 < 1 → ${comparacion4}</p>
`;

console.log("Suma:", suma);
console.log("10 === '10':", comparacion2);