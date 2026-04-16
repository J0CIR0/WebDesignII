const nombreEmprendedor = "Josue Claros";
let nombreNegocio = "JociroPy";
let rubro = "Desarrollo de software";
let añoFundacion = 2019;
let productos = ["Página web básica", "Bot para redes sociales", "Sistema de inventario", "hola", "hola mundo"];
let precios = [15000, 8000, 25000, 1250, 20];
let estaActivo = false;
let calificacion = 4.7;

console.log("=== DATOS DEL EMPRENDEDOR Y NEGOCIO ===");
console.log("nombreEmprendedor:", nombreEmprendedor, "-> Tipo:", typeof nombreEmprendedor);
console.log("nombreNegocio:", nombreNegocio, "-> Tipo:", typeof nombreNegocio);
console.log("rubro:", rubro, "-> Tipo:", typeof rubro);
console.log("añoFundacion:", añoFundacion, "-> Tipo:", typeof añoFundacion);
console.log("productos:", productos, "-> Tipo:", typeof productos);
console.log("precios:", precios, "-> Tipo:", typeof precios);
console.log("estaActivo:", estaActivo, "-> Tipo:", typeof estaActivo);
console.log("calificacion:", calificacion, "-> Tipo:", typeof calificacion);

let totalProductos = productos.length;
console.log("\nTotal de productos disponibles:", totalProductos);

console.log(0 === false);
document.getElementById("contenido").innerHTML += "<p><strong>Comparación 0 === false:</strong> " + (0 === false) + "</p>";

console.log("" === false);
document.getElementById("contenido").innerHTML += "<p><strong>Comparación '' === false:</strong> " + ("" === false) + "</p>";

console.log(null === undefined);
document.getElementById("contenido").innerHTML += "<p><strong>Comparación null === undefined:</strong> " + (null === undefined) + "</p>";

console.log(5 === false);
document.getElementById("contenido").innerHTML += "<p><strong>Comparación 5 === false:</strong> " + (5 === false) + "</p>";

let sumaPrecios = 0;
for (let i = 0; i < precios.length; i++) {
    sumaPrecios += precios[i];
}
let promedioPrecios = sumaPrecios / precios.length;
console.log("Promedio de precios:", promedioPrecios.toFixed(3));

if (estaActivo === true) {
    console.log("El negocio está ACTIVO.");
} else {
    console.log("El negocio está INACTIVO.");
}

document.getElementById("contenido").innerHTML += "<h2>Información del emprendimiento</h2>";
document.getElementById("contenido").innerHTML += "<p><strong>Emprendedor:</strong> " + nombreEmprendedor + " (tipo: " + typeof nombreEmprendedor + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>Negocio:</strong> " + nombreNegocio + " (tipo: " + typeof nombreNegocio + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>Rubro:</strong> " + rubro + " (tipo: " + typeof rubro + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>Año de fundación:</strong> " + añoFundacion + " (tipo: " + typeof añoFundacion + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>Productos:</strong> " + productos + " (tipo: " + typeof productos + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>Precios:</strong> " + precios + " (tipo: " + typeof precios + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>¿Activo?</strong> " + estaActivo + " (tipo: " + typeof estaActivo + ")</p>";
document.getElementById("contenido").innerHTML += "<p><strong>Calificación:</strong> " + calificacion + " (tipo: " + typeof calificacion + ")</p>";
document.getElementById("contenido").innerHTML += "<h3>Total de productos disponibles: " + totalProductos + "</h3>";
document.getElementById("contenido").innerHTML += "<h3>Promedio de precios: Bs " + promedioPrecios.toFixed(3) + "</h3>";

if (estaActivo) {
    document.getElementById("contenido").innerHTML += "<h3 style='color: lightgreen;'>El negocio está ACTIVO. Aceptamos nuevos proyectos.</h3>";
} else {
    document.getElementById("contenido").innerHTML += "<h3 style='color: orange;'>El negocio está INACTIVO. Contacta para más información.</h3>";
}