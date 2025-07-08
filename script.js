// Reemplaza con tu URL del Apps Script
const endpoint = "https://script.google.com/macros/s/AKfycbz0KyGJwqtKv6NrbyyvwWtqFB1itYgV9okbSDkZPQdTziiP9LIkDwqfQxkNGpbWqwv8iQ/exec";

// Variables de control
let nombreUsuario = "";
let puntajeFinal = 0;

// Capturar el nombre y ocultar el campo
document.addEventListener("DOMContentLoaded", function () {
  const nombreInput = document.getElementById("nombre");
  const botonInicio = document.getElementById("inicio");
  const seccionSimulador = document.getElementById("simulador");

  botonInicio.addEventListener("click", function () {
    nombreUsuario = nombreInput.value.trim();
    if (nombreUsuario === "") {
      alert("Por favor ingresa tu nombre.");
      return;
    }
    document.getElementById("inicioContainer").style.display = "none";
    seccionSimulador.style.display = "block";
  });
});

// Manejador de preguntas
function responderPregunta(puntaje) {
  puntajeFinal += puntaje;
  mostrarSiguientePregunta();
}

// Simulación simple: solo una pregunta para ejemplo
function mostrarSiguientePregunta() {
  document.getElementById("preguntaContainer").innerHTML = `
    <h2>Simulación completada</h2>
    <p>Tu puntaje final es: <strong>${puntajeFinal}</strong></p>
    <button onclick="guardarDatos()">Guardar resultado</button>
  `;
}

// Guardar en Google Sheets
function guardarDatos() {
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      nombre: nombreUsuario,
      puntaje: puntajeFinal
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.text())
    .then(data => {
      alert("✅ ¡Datos guardados correctamente!");
    })
    .catch(err => {
      alert("❌ Error al guardar: " + err);
    });
}
