let nombreEmprendedor = "Josue Claros";
let nombreNegocio = "JociroPy";
let github = "J0CIR0";
let añosExperiencia = 3;
let programas = ["Pagina web", "Programa escritorio", "Migracion sistema", "Base datos", "Entrenamiento IA"];
let certificaciones = ["Embajador Estudiantil Microsoft Learn", "IA y Machine Learning"];
let preciosBase = {
    "Pagina web": 2000,
    "Programa escritorio": 5000,
    "Migracion sistema": 8000,
    "Base datos": 3000,
    "Entrenamiento IA": 10000
};
let tiemposBase = {
    "Pagina web": 5,
    "Programa escritorio": 15,
    "Migracion sistema": 20,
    "Base datos": 8,
    "Entrenamiento IA": 30
};

let presentacion = `
    <h2>Sobre mí</h2>
    <p>Hola, soy ${nombreEmprendedor}, fundador de ${nombreNegocio}.</p>
    <p>Soy desarrollador de software con ${añosExperiencia} años de experiencia.</p>
    <p>Puedo crear: ${programas.join(", ")}.</p>
    <p>Certificaciones: ${certificaciones.join(", ")}.</p>
    <p>Mi GitHub: <a href="https://github.com/${github}" target="_blank">github.com/${github}</a></p>
`;

document.getElementById("presentacion").innerHTML = presentacion;

let opciones = "";
for(let i = 0; i < programas.length; i++) {
    let nombrePrograma = programas[i];
    let precio = preciosBase[nombrePrograma];
    opciones += `<option value="${nombrePrograma}">${nombrePrograma} - Desde Bs ${precio}</option>`;
}

let formularioHTML = `
    <h2>Cotiza tu proyecto</h2>
    <p>Selecciona el tipo de proyecto que necesitas:</p>
    <select id="tipoProyecto">
        ${opciones}
    </select>
    <label>¿Necesitas soporte adicional?</label>
    <select id="soporte">
        <option value="no">Sin soporte</option>
        <option value="basico">Soporte básico (+20%)</option>
        <option value="premium">Soporte premium (+40%)</option>
    </select>
    <label>¿Cuántos módulos o secciones necesitas? (1-10)</label>
    <input type="number" id="modulos" min="1"x max="10" value="1">
    <button onclick="calcularCosto()">Calcular costo aproximado</button>
    <div id="resultadoCotizacion"></div>
`;

document.getElementById("formulario").innerHTML = formularioHTML;

function calcularCosto() {
    let tipo = document.getElementById("tipoProyecto").value;
    let soporte = document.getElementById("soporte").value;
    let modulos = parseInt(document.getElementById("modulos").value);
    
    let precioBase = preciosBase[tipo];
    let tiempoBase = tiemposBase[tipo];
    
    let multiplicadorModulos = 1;
    if(modulos > 5) {
        multiplicadorModulos = 1.5;
    } else if(modulos > 3) {
        multiplicadorModulos = 1.2;
    }
    
    let costo = precioBase * multiplicadorModulos;
    let tiempo = tiempoBase;
    
    if(modulos > 5) {
        tiempo = tiempoBase + 10;
    } else if(modulos > 3) {
        tiempo = tiempoBase + 5;
    }
    
    let porcentajeSoporte = 0;
    switch(soporte) {
        case "basico":
            porcentajeSoporte = 0.2;
            break;
        case "premium":
            porcentajeSoporte = 0.4;
            break;
        default:
            porcentajeSoporte = 0;
    }
    
    costo = costo + (costo * porcentajeSoporte);
    
    let resultado = `
        <h3>Resultado de cotización</h3>
        <p>Tipo de proyecto: ${tipo}</p>
        <p>Módulos/secciones: ${modulos}</p>
        <p>Soporte: ${soporte}</p>
        <p>Tiempo estimado: ${tiempo} días hábiles</p>
        <p><strong>Costo aproximado: Bs ${costo}</strong></p>
    `;
    
    document.getElementById("resultadoCotizacion").innerHTML = resultado;
    
    console.log("Cotización generada:");
    console.log("Tipo:", tipo);
    console.log("Costo final:", costo);
    console.log("Tiempo:", tiempo);
}

let preguntar = prompt("¿Quieres saber qué tipo de software puedo desarrollar para ti? (si/no)");
if(preguntar === "si" || preguntar === "sí") {
    let servicio = prompt("Elige una opción:\n1. Pagina web\n2. Programa escritorio\n3. Migracion sistema\n4. Base datos\n5. Entrenamiento IA");
    switch(servicio) {
        case "1":
            alert("Una pagina web cuesta desde Bs 2,000 y tarda 5 dias. Incluye diseño responsive.");
            break;
        case "2":
            alert("Un programa de escritorio cuesta desde Bs 5,000 y tarda 15 dias. Incluye interfaz personalizada.");
            break;
        case "3":
            alert("Una migracion de sistema cuesta desde Bs 8,000 y tarda 20 dias. Incluye respaldo y pruebas.");
            break;
        case "4":
            alert("Una base de datos cuesta desde Bs 3,000 y tarda 8 dias. Incluye optimizacion y seguridad.");
            break;
        case "5":
            alert("Entrenamiento de IA cuesta desde Bs 10,000 y tarda 30 dias. Incluye modelo personalizado.");
            break;
        default:
            alert("Opcion no valida. Contactame directamente para una cotizacion personalizada.");
    }
} else {
    alert("Gracias por visitar JociroPy. Cuando estes listo, aqui estoy para ayudarte.");
}

console.log("=== DATOS DEL EMPRENDEDOR ===");
console.log("Nombre:", nombreEmprendedor, "Tipo:", typeof nombreEmprendedor);
console.log("Negocio:", nombreNegocio, "Tipo:", typeof nombreNegocio);
console.log("Experiencia:", añosExperiencia, "Tipo:", typeof añosExperiencia);
console.log("Programas:", programas, "Tipo:", typeof programas);
console.log("Certificaciones:", certificaciones, "Tipo:", typeof certificaciones);