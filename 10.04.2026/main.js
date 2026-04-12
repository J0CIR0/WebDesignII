const parrafo = document.getElementById('miParrafo');
const boton = document.getElementById('miBoton');
let iteracion = 0;
boton.addEventListener('click', function() {
    iteracion += 1;
    parrafo.textContent = `iteracion ${iteracion}`;
}
);