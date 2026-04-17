let nombreEmprendedor = "Josue Claros";
let nombreNegocio = "JociroPy";
let github = "J0CIR0";
let añosExperiencia = 3;
let certificaciones = ["Embajador Estudiantil Microsoft Learn", "IA y Machine Learning"];

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

let catalogoServicios = {
    _servicios: {
        pagina_web: {
            clave: "pagina_web",
            nombre: "Pagina web empresarial",
            precioBase: 2000,
            tiempoBase: 5,
            descripcion: "Desarrollo de pagina web responsive para negocio o marca personal"
        },
        programa_escritorio: {
            clave: "programa_escritorio",
            nombre: "Programa de escritorio",
            precioBase: 5000,
            tiempoBase: 15,
            descripcion: "Aplicacion de escritorio para procesos internos de tu empresa"
        },
        migracion_sistema: {
            clave: "migracion_sistema",
            nombre: "Migracion de sistema",
            precioBase: 8000,
            tiempoBase: 20,
            descripcion: "Migracion de sistemas antiguos a plataformas modernas"
        },
        base_datos: {
            clave: "base_datos",
            nombre: "Base de datos",
            precioBase: 3000,
            tiempoBase: 8,
            descripcion: "Diseno y optimizacion de base de datos segura"
        },
        entrenamiento_ia: {
            clave: "entrenamiento_ia",
            nombre: "Entrenamiento de IA",
            precioBase: 10000,
            tiempoBase: 30,
            descripcion: "Entrenamiento de modelos de IA para tareas personalizadas"
        }
    },
    get servicios() {
        return this._servicios;
    },
    set servicios(nuevoServicio) {
        if(
            !nuevoServicio ||
            !nuevoServicio.clave ||
            !nuevoServicio.nombre ||
            typeof nuevoServicio.precioBase !== "number" ||
            typeof nuevoServicio.tiempoBase !== "number" ||
            !nuevoServicio.descripcion
        ) {
            console.warn("Servicio invalido. Debe incluir clave, nombre, precioBase, tiempoBase y descripcion.");
            return;
        }

        this._servicios[nuevoServicio.clave] = nuevoServicio;
    },
    getServicio(clave) {
        return this._servicios[clave] || null;
    },
    buscarServicios(termino) {
        let texto = normalizarTexto(termino);

        return Object.values(this._servicios).filter((servicio) => {
            let nombre = normalizarTexto(servicio.nombre);
            let descripcion = normalizarTexto(servicio.descripcion);
            let clave = normalizarTexto(servicio.clave.replace(/_/g, " "));
            return nombre.includes(texto) || descripcion.includes(texto) || clave.includes(texto);
        });
    }
};

catalogoServicios.servicios = {
    clave: "tienda_online",
    nombre: "Tienda online (E-commerce)",
    precioBase: 7000,
    tiempoBase: 18,
    descripcion: "Creacion de tienda online con carrito, pagos y panel de administracion"
};

catalogoServicios.servicios = {
    clave: "app_movil",
    nombre: "Aplicacion movil",
    precioBase: 12000,
    tiempoBase: 35,
    descripcion: "Desarrollo de app movil Android/iOS para tu emprendimiento"
};

catalogoServicios.servicios = {
    clave: "api_backend",
    nombre: "API y backend",
    precioBase: 6000,
    tiempoBase: 16,
    descripcion: "Desarrollo de APIs y logica de negocio para sistemas web o moviles"
};

catalogoServicios.servicios = {
    clave: "automatizacion",
    nombre: "Automatizacion de procesos",
    precioBase: 4500,
    tiempoBase: 12,
    descripcion: "Automatizacion de tareas repetitivas para aumentar productividad"
};

catalogoServicios.servicios = {
    clave: "mantenimiento",
    nombre: "Mantenimiento y soporte tecnico",
    precioBase: 1800,
    tiempoBase: 4,
    descripcion: "Correccion de errores, mejoras y acompanamiento tecnico continuo"
};

catalogoServicios.servicios = {
    clave: "seo_analitica",
    nombre: "SEO y analitica web",
    precioBase: 2800,
    tiempoBase: 7,
    descripcion: "Mejoras SEO, analitica de trafico y optimizacion de conversion"
};

let serviciosActuales = catalogoServicios.servicios;
let programas = Object.values(serviciosActuales).map((servicio) => servicio.nombre);

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
let clavesServicios = Object.keys(serviciosActuales);
for(let i = 0; i < clavesServicios.length; i++) {
    let claveServicio = clavesServicios[i];
    let servicio = serviciosActuales[claveServicio];
    opciones += `<option value="${claveServicio}">${servicio.nombre} - Desde Bs ${servicio.precioBase}</option>`;
}

let buscadorHTML = `
    <h2>Busca lo que necesitas</h2>
    <p>Escribe una palabra clave, por ejemplo: desarrollar pagina, app movil o base de datos.</p>
    <input type="text" id="buscarServicio" placeholder="Ejemplo: desarrollar pagina">
    <button onclick="buscarServicio()">Buscar servicio</button>
    <div id="resultadoBusqueda"></div>
`;

document.getElementById("cotizador").innerHTML = buscadorHTML;

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
    <input type="number" id="modulos" min="1" max="10" value="1">
    <button onclick="calcularCosto()">Calcular costo aproximado</button>
    <div id="resultadoCotizacion"></div>
`;

document.getElementById("formulario").innerHTML = formularioHTML;

function calcularCosto() {
    let claveServicio = document.getElementById("tipoProyecto").value;
    let soporte = document.getElementById("soporte").value;
    let modulos = parseInt(document.getElementById("modulos").value);

    if(isNaN(modulos) || modulos < 1) {
        modulos = 1;
    }

    if(modulos > 10) {
        modulos = 10;
    }

    let servicio = catalogoServicios.getServicio(claveServicio);
    if(!servicio) {
        document.getElementById("resultadoCotizacion").innerHTML = "<p>No se encontro el servicio seleccionado.</p>";
        return;
    }
    
    let precioBase = servicio.precioBase;
    let tiempoBase = servicio.tiempoBase;
    
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
        <p>Tipo de proyecto: ${servicio.nombre}</p>
        <p>Módulos/secciones: ${modulos}</p>
        <p>Soporte: ${soporte}</p>
        <p>Tiempo estimado: ${tiempo} días hábiles</p>
        <p><strong>Costo aproximado: Bs ${costo}</strong></p>
    `;
    
    document.getElementById("resultadoCotizacion").innerHTML = resultado;
    
    console.log("Cotización generada:");
    console.log("Tipo:", servicio.nombre);
    console.log("Costo final:", costo);
    console.log("Tiempo:", tiempo);
}

function buscarServicio() {
    let termino = document.getElementById("buscarServicio").value.trim();

    if(!termino) {
        document.getElementById("resultadoBusqueda").innerHTML = "<p>Escribe un termino para buscar.</p>";
        return;
    }

    let resultados = catalogoServicios.buscarServicios(termino);

    if(resultados.length === 0) {
        document.getElementById("resultadoBusqueda").innerHTML = "<p>No se encontraron servicios con ese criterio.</p>";
        return;
    }

    let lista = resultados.map((servicio) => {
        return `
            <div class="servicio-card">
                <h3>${servicio.nombre}</h3>
                <p>${servicio.descripcion}</p>
                <p><strong>Desde Bs ${servicio.precioBase}</strong> | Tiempo estimado: ${servicio.tiempoBase} dias</p>
            </div>
        `;
    }).join("");

    document.getElementById("resultadoBusqueda").innerHTML = lista;
}

let preguntar = prompt("¿Quieres saber qué tipo de software puedo desarrollar para ti? (si/no)");
if(preguntar === "si" || preguntar === "sí") {
    let menuServicios = Object.values(catalogoServicios.servicios).slice(0, 8);
    let opcionesMenu = menuServicios.map((servicio, index) => `${index + 1}. ${servicio.nombre}`).join("\n");
    let opcion = prompt(`Elige una opcion:\n${opcionesMenu}`);
    let indice = parseInt(opcion) - 1;

    if(!isNaN(indice) && menuServicios[indice]) {
        let servicioSeleccionado = menuServicios[indice];
        alert(`${servicioSeleccionado.nombre} cuesta desde Bs ${servicioSeleccionado.precioBase} y tarda ${servicioSeleccionado.tiempoBase} dias. ${servicioSeleccionado.descripcion}.`);
    } else {
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
console.log("Servicios (getter):", catalogoServicios.servicios);