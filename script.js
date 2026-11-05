document.addEventListener("DOMContentLoaded", () => {
  // Coloca los datos del archivo datos.js en los textos de la invitación.
  document.querySelectorAll("[data-field]").forEach((element) => {
    const key = element.dataset.field;
    if (datosInvitacion[key]) element.textContent = datosInvitacion[key];
  });

  document.querySelector('[data-map="iglesia"]').href = datosInvitacion.mapaIglesia;
  document.querySelector('[data-map="salon"]').href = datosInvitacion.mapaSalon;

  // Al tocar "Abrir invitación", se desplaza al contenido.
  document.getElementById("openInvitation").addEventListener("click", () => {
    document.getElementById("invitacion").scrollIntoView({ behavior: "smooth" });
  });

  // Cuenta regresiva basada en la fecha configurada en datos.js.
  const target = new Date(datosInvitacion.fechaEvento).getTime();
  const countdownMessage = document.getElementById("countdownMessage");
  function updateCountdown() {
    const remaining = target - Date.now();
    if (Number.isNaN(target) || remaining <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach(id => document.getElementById(id).textContent = "00");
      countdownMessage.textContent = remaining <= 0 ? "¡Llegó el gran día!" : "Agrega la fecha del evento en datos.js.";
      return;
    }
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // El audio solo empieza tras una acción del visitante; los navegadores bloquean autoplay.
  const audio = document.getElementById("invitationAudio");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = musicToggle.querySelector(".music-label");
  musicToggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        musicToggle.setAttribute("aria-pressed", "true");
        musicLabel.textContent = "Pausar música";
      } catch {
        musicLabel.textContent = "Añade el archivo de audio";
        alert("Para activar la música, agrega un archivo MP3 que tengas derecho a usar en la carpeta assets y nómbralo tu-sangre-en-mi-cuerpo.mp3.");
      }
    } else {
      audio.pause();
      musicToggle.setAttribute("aria-pressed", "false");
      musicLabel.textContent = "Activar música";
    }
  });
});
