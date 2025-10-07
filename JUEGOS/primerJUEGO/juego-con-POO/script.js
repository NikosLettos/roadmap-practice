// Clase base Personaje
class Personaje {
  constructor(nombre, vida, ataque) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
  }

  recibirDanio(danio) {
    this.vida -= danio;
    if (this.vida < 0) this.vida = 0;
  }

  estaVivo() {
    return this.vida > 0;
  }
}

// Subclase Jugador
class Jugador extends Personaje {
  atacar(enemigo) {
    enemigo.recibirDanio(this.ataque);
    return `${this.nombre} ataca y causa ${this.ataque} de daño.`;
  }
}

// Subclase Enemigo
class Enemigo extends Personaje {
  atacar(jugador) {
    jugador.recibirDanio(this.ataque);
    return `${this.nombre} ataca y causa ${this.ataque} de daño.`;
  }
}

// Crear instancias
const jugador = new Jugador("Heroe", 100, 10);
const enemigo = new Enemigo("Villano", 100, 8);

// Referencias al DOM
const vidaJugador = document.getElementById("vidaJugador");
const vidaEnemigo = document.getElementById("vidaEnemigo");
const mensaje = document.getElementById("mensaje");
const botonAtacar = document.getElementById("atacar");

// Función de batalla
function batalla() {
  // Jugador ataca
  let msg = jugador.atacar(enemigo);

  // Si enemigo sigue vivo, ataca
  if (enemigo.estaVivo()) {
    msg += "<br>" + enemigo.atacar(jugador);
  }

  // Actualizar vida en pantalla
  vidaJugador.textContent = `Vida: ${jugador.vida}`;
  vidaEnemigo.textContent = `Vida: ${enemigo.vida}`;

  // Mostrar mensaje
  mensaje.innerHTML = msg;

  // Verificar fin de juego
  if (!jugador.estaVivo() || !enemigo.estaVivo()) {
    botonAtacar.disabled = true;
    mensaje.innerHTML += "<br><strong>¡Juego Terminado!</strong>";
  }
}

// Evento botón
botonAtacar.addEventListener("click", batalla);
