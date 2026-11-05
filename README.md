# Invitación web de XV años (mobile-first)

Plantilla inicial en HTML, CSS y JavaScript, diseñada primero para celulares.

## Archivos
- `index.html`: contenido de la invitación.
- `styles.css`: colores, diseño y adaptación a pantalla.
- `datos.js`: datos que se personalizan para cada evento.
- `script.js`: desplazamiento, cuenta regresiva, mapas y control de música.
- `assets/`: recursos opcionales (por ejemplo, audio autorizado).

## Cómo abrirla en tu computadora
1. Descomprime la carpeta.
2. Abre la carpeta `invitacion_xv_movil` desde Visual Studio Code.
3. Abre `index.html` en el navegador. Si tienes instalada la extensión Live Server, haz clic derecho en `index.html` y elige **Open with Live Server**.
4. Para probar el diseño de celular, abre las herramientas de desarrollador del navegador y activa la vista de dispositivo móvil.

## Cómo personalizar los datos
Edita `datos.js`. Cambia nombre, fecha, hora, direcciones y enlaces reales de Google Maps.
La fecha `fechaEvento` debe incluir fecha, hora y zona horaria ISO 8601. Ejemplo: `2026-11-21T17:00:00-06:00`.

## Música
Por defecto, el reproductor apunta a `assets/tu-sangre-en-mi-cuerpo.mp3`, pero ese archivo no está incluido.
Añade únicamente un archivo que tengas autorización para usar. No descargues ni publiques una copia de una canción comercial sin permiso. La música requiere que el visitante toque el botón; los navegadores normalmente bloquean el autoplay.

## Publicar con GitHub Pages
1. Crea un repositorio nuevo en GitHub. Para la publicación más sencilla con GitHub Free, configúralo como **Public**.
2. Sube los archivos de esta carpeta a la raíz del repositorio.
3. En el repositorio, abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**, elige `main` y `/ (root)`, y guarda.
5. Espera a que GitHub Pages publique el sitio; la dirección aparecerá en esa sección.

**Privacidad:** con un repositorio público, el código y los archivos publicados pueden ser visibles para cualquiera. Usa datos de muestra mientras aprendes y confirma qué datos desea hacer públicos la familia antes de publicar la invitación real.
