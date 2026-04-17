let edad = 18;
let presupuesto = 15000;

let mensaje = "";

if (edad >= 18) {
    mensaje += "<p>Eres mayor de edad, puedes contratar servicios.</p>";
} else {
    mensaje += "<p>Eres menor de edad, necesitas autorización.</p>";
}

if (presupuesto >= 10000) {
    mensaje += "<p>Tu presupuesto es suficiente para un proyecto básico.</p>";
} else {
    mensaje += "<p>Tu presupuesto es bajo, podemos buscar alternativas.</p>";
}

document.getElementById("contenido").innerHTML = mensaje;

let respuesta = prompt("¿Quieres aprender JavaScript? (si/no)");
if (respuesta === "si" || respuesta === "sí") {
    document.getElementById("contenido").innerHTML += "<p>Excelente. Sigue practicando.</p>";
} else {
    document.getElementById("contenido").innerHTML += "<p>Anímate. JavaScript es muy útil.</p>";
}

console.log("Edad:", edad, "Mayor de edad:", edad >= 18);