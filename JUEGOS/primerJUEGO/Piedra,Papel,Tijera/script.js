// 1️⃣ Definir reglas
const reglas = {
    abanderado: ["profugo", "flash", "viajero", "fisicoculturista"],
    borracho: ["flash", "fisicoculturista", "viajero", "abanderado"],
    fachero: ["viajero", "fisicoculturista", "abanderado", "borracho"],
    fisicoculturista: ["flash", "profugo", "homosexual", "mascota"],
    flash: ["profugo", "fachero", "mascota", "homosexual"],
    mascota: ["borracho", "fachero", "homosexual", "abanderado"],
    homosexual: ["viajero", "borracho", "abanderado", "fachero"],
    viajero: ["profugo","flash","fisicoculturista", "mascota"],
    profugo: ["borracho","fachero", "homosexual", "mascota"],
    intelectual: [] 
};


// 2️⃣ Tomar todos los botones
const botones = document.querySelectorAll(".opciones button");

// 3️⃣ Agregar click listener a cada botón
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const eleccionUsuario = boton.id.toLowerCase();
        jugar(eleccionUsuario);
    });
});

// 4️⃣ Función jugar
function jugar(eleccionUsuario) {
    const opciones = Object.keys(reglas);
    const eleccionComputadora = opciones[Math.floor(Math.random() * opciones.length)];

    let mensaje = `Vos elegiste ${eleccionUsuario}. La computadora eligió ${eleccionComputadora}.\n`;

    if (eleccionUsuario === eleccionComputadora) {
        mensaje += "¡Empate!";
    } else if (eleccionComputadora === "intelectual") {
        prompt(`ERROR EN EL SISTEMA, DEBE APAGAR LA PC, DEMASIADO PODER`);
    } else if (reglas[eleccionUsuario].includes(eleccionComputadora)) {
        mensaje += "¡Ganaste!";
    } else {
        mensaje += "¡Perdiste!";
    }

    document.getElementById("mensaje").innerText = mensaje;
}
