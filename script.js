const preguntas = [
  {
    pregunta: "¿Qué es phishing?",
    opciones: ["Un tipo de ataque", "Un navegador", "Un antivirus"],
    correcta: 0
  },
  {
    pregunta: "¿Qué debes hacer con correos sospechosos?",
    opciones: ["Responder rápido", "Ignorarlos o reportarlos", "Compartirlos"],
    correcta: 1
  },
  {
    pregunta: "¿Qué es una contraseña segura?",
    opciones: ["123456", "miNombre", "K2$rT!9vLx"],
    correcta: 2
  }
];

let preguntaActual = 0;
let puntaje = 0;
let nombreUsuario = "";

function iniciarSimulador() {
  nombreUsuario = document.getElementById("nombre").value.trim();
  if (!nombreUsuario) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }
  document.getElementById("inicioContainer").style.display = "none";
  document.getElementById("simulador").style.display = "block";
  mostrarPregunta();
}

function mostrarPregunta() {
  const p = preguntas[preguntaActual];
  const contenedor = document.getElementById("preguntaContainer");
  contenedor.innerHTML = `
    <h2>${p.pregunta}</h2>
    ${p.opciones.map((opcion, i) =>
      `<button onclick="responderPregunta(${i})">${opcion}</button>`
    ).join("")}
  `;
}

function responderPregunta(indice) {
  if (indice === preguntas[preguntaActual].correcta) {
    puntaje++;
  }

  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById("preguntaContainer").innerHTML = `
    <h2>Simulación completada</h2>
    <p>Puntaje: ${puntaje} de ${preguntas.length}</p>
    <button onclick="guardarResultado()">Guardar Resultado</button>
  `;
}

function guardarResultado() {
  fetch('https://script.google.com/macros/s/AKfycbz0KyGJwqtKv6NrbyyvwWtqFB1itYgV9okbSDkZPQdTziiP9LIkDwqfQxkNGpbWqwv8iQ/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombreUsuario,
      puntaje: puntaje
    })
  })
  .then(response => response.text())
  .then(data => {
    alert("✅ Resultado guardado correctamente.");
  })
  .catch(error => {
    alert("❌ Error al guardar: " + error);
  });
}

document.getElementById("inicio").addEventListener("click", iniciarSimulador);
