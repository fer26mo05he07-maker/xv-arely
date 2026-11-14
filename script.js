
/* ==============================
   DATOS DE LA INVITACIÓN
============================== */

const datos = window.datosInvitacion || {};

/* ==============================
   MOSTRAR DATOS DE datos.js
============================== */

document.querySelectorAll("[data-field]").forEach(function (elemento) {
  const campo = elemento.dataset.field;

  if (datos[campo] !== undefined && datos[campo] !== "") {
    elemento.textContent = datos[campo];
  }
});

/* ==============================
   ENLACES DE UBICACIÓN
============================== */

document.querySelectorAll("[data-map]").forEach(function (enlace) {
  const lugar = enlace.dataset.map;

  const mapa =
    lugar === "iglesia" ? datos.mapaIglesia :
    lugar === "salon" ? datos.mapaSalon :
    "";

  if (mapa) {
    enlace.href = mapa;
  }
});

/* ==============================
   ABRIR INVITACIÓN Y REPRODUCIR MÚSICA
============================== */

const botonAbrir = document.getElementById("openInvitation");
const portada = document.getElementById("inicio");
const musica = document.getElementById("invitationAudio");

if (botonAbrir && portada) {
  botonAbrir.addEventListener("click", async function () {
    portada.classList.add("portada-oculta");

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    if (musica) {
      try {
        await musica.play();
      } catch (error) {
        console.warn(
          "El navegador no permitió reproducir la música.",
          error
        );
      }
    }
  });
}

/* ==============================
   CUENTA REGRESIVA
============================== */

const elementoDias = document.getElementById("days");
const elementoHoras = document.getElementById("hours");
const elementoMinutos = document.getElementById("minutes");
const elementoSegundos = document.getElementById("seconds");
const mensajeCuenta = document.getElementById("countdownMessage");

function actualizarCuentaRegresiva() {
  if (
    !elementoDias ||
    !elementoHoras ||
    !elementoMinutos ||
    !elementoSegundos
  ) {
    return;
  }

  if (!datos.fechaEvento) {
    return;
  }

  const fechaEvento = new Date(datos.fechaEvento);
  const ahora = new Date();

  if (Number.isNaN(fechaEvento.getTime())) {
    return;
  }

  const diferencia = fechaEvento.getTime() - ahora.getTime();

  if (diferencia <= 0) {
    elementoDias.textContent = "00";
    elementoHoras.textContent = "00";
    elementoMinutos.textContent = "00";
    elementoSegundos.textContent = "00";

    if (mensajeCuenta) {
      mensajeCuenta.textContent =
        "¡Hoy es un día muy especial!";
    }

    return;
  }

  const dias = Math.floor(
    diferencia / (1000 * 60 * 60 * 24)
  );

  const horas = Math.floor(
    (diferencia / (1000 * 60 * 60)) % 24
  );

  const minutos = Math.floor(
    (diferencia / (1000 * 60)) % 60
  );

  const segundos = Math.floor(
    (diferencia / 1000) % 60
  );

  elementoDias.textContent = String(dias).padStart(2, "0");
  elementoHoras.textContent = String(horas).padStart(2, "0");
  elementoMinutos.textContent = String(minutos).padStart(2, "0");
  elementoSegundos.textContent = String(segundos).padStart(2, "0");
}

actualizarCuentaRegresiva();
setInterval(actualizarCuentaRegresiva, 1000);

/* ==============================
   GALERÍA DE TRES FOTOGRAFÍAS
============================== */

const fotos = [
  {
    src: "assets/foto1.jpg",
    texto: "Un recuerdo especial ♡",
    orientacion: "horizontal-photo",
    alt: "Fotografía horizontal de Arely"
  },
  {
    src: "assets/foto2.jpg",
    texto: "Momentos para recordar ✨",
    orientacion: "horizontal-photo",
    alt: "Fotografía horizontal de Arely"
  },
  {
    src: "assets/foto3.jpg",
    texto: "Un día lleno de ilusión ♡",
    orientacion: "vertical-photo",
    alt: "Fotografía vertical de Arely"
  }
];

let indiceFoto = 0;

const imagenGaleria = document.getElementById("gallery-photo");
const marcoGaleria = document.getElementById("gallery-frame");
const textoFoto = document.getElementById("gallery-caption");
const contadorFotos = document.getElementById("gallery-counter");
const botonAnterior = document.getElementById("gallery-prev");
const botonSiguiente = document.getElementById("gallery-next");

function mostrarFoto(indice) {
  if (!imagenGaleria || !marcoGaleria) {
    return;
  }

  indiceFoto = (indice + fotos.length) % fotos.length;

  const foto = fotos[indiceFoto];

  imagenGaleria.src = foto.src;
  imagenGaleria.alt = foto.alt;

  marcoGaleria.classList.remove(
    "horizontal-photo",
    "vertical-photo"
  );

  marcoGaleria.classList.add(foto.orientacion);

  if (textoFoto) {
    textoFoto.textContent = foto.texto;
  }

  if (contadorFotos) {
    contadorFotos.textContent =
      String(indiceFoto + 1).padStart(2, "0") +
      " / " +
      String(fotos.length).padStart(2, "0");
  }
}

if (botonAnterior) {
  botonAnterior.addEventListener("click", function () {
    mostrarFoto(indiceFoto - 1);
  });
}

if (botonSiguiente) {
  botonSiguiente.addEventListener("click", function () {
    mostrarFoto(indiceFoto + 1);
  });
}

/* Permitir cambiar las fotos deslizando en el celular */

if (marcoGaleria) {
  let inicioDeslizamiento = 0;

  marcoGaleria.addEventListener("touchstart", function (evento) {
    inicioDeslizamiento = evento.changedTouches[0].clientX;
  }, { passive: true });

  marcoGaleria.addEventListener("touchend", function (evento) {
    const finDeslizamiento = evento.changedTouches[0].clientX;
    const movimiento = finDeslizamiento - inicioDeslizamiento;

    if (Math.abs(movimiento) < 45) {
      return;
    }

    if (movimiento < 0) {
      mostrarFoto(indiceFoto + 1);
    } else {
      mostrarFoto(indiceFoto - 1);
    }
  }, { passive: true });
}

mostrarFoto(0);
document.querySelector(".back-top").addEventListener("click", function (e) {
  e.preventDefault();

  const portada = document.getElementById("inicio");
  const invitacion = document.getElementById("invitacion");

  portada.classList.remove("portada-oculta");
  invitacion.style.display = "none";

  document.body.classList.add("portada-bloqueada");

  window.scrollTo(0, 0);
});
