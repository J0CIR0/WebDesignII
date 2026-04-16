let edad = 18;
let tieneExperiencia = false;
let presupuesto = 15000;

let mensaje = "";

if (edad >= 18) {
    mensaje += "<p>Eres mayor de edad, puedes contratar servicios.</p>";
} else {
    mensaje += "<p>Eres menor de edad, necesitas autorización.</p>";
}

if (tieneExperiencia) {
    mensaje += "<p>Tienes experiencia, podemos hacer un proyecto avanzado.</p>";
} else {
    mensaje += "<p>No tienes experiencia, te ayudamos desde cero.</p>";
}

if (presupuesto >= 10000) {
    mensaje += "<p>Tu presupuesto es suficiente para un proyecto básico.</p>";
} else {
    mensaje += "<p>Tu presupuesto es bajo, podemos buscar alternativas.</p>";
}

document.getElementById("contenido").innerHTML = `
    ${mensaje}
    <hr>
    <p><strong>Ejercicio 1:</strong> Pregunta al usuario su edad con prompt y muestra si es mayor de edad.</p>
    <p><strong>Ejercicio 2:</strong> Pregunta si tiene carnet y muestra un mensaje.</p>
`;

let respuesta = prompt("¿Quieres aprender JavaScript? (si/no)");
if (respuesta === "si" || respuesta === "sí") {
    document.getElementById("contenido").innerHTML += "<p style='color: lightgreen;'>Excelente. Sigue practicando.</p>";
} else {
    document.getElementById("contenido").innerHTML += "<p style='color: orange;'>Anímate. JavaScript es muy útil.</p>";
}

console.log("Edad:", edad, "Mayor de edad:", edad >= 18);