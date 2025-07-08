const preguntas = [
  {
    texto: "¿Cuál es una contraseña segura?",
    opciones: ["123456", "miNombre123", "K!9$eR#2"],
    correcta: 2
  },
  {
    texto: "¿Qué es phishing?",
    opciones: ["Un tipo de ataque", "Un navegador", "Un antivirus"],
    correcta: 0
  }
];

let actual = 0, puntos = 0;

function mostrarPregunta() {
  const q = preguntas[actual];
  document.getElementById("question").textContent = q.texto;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  q.opciones.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => {
      if (i === q.correcta) puntos++;
      actual++;
      if (actual < preguntas.length) mostrarPregunta();
      else guardarYMostrar();
    };
    answersDiv.appendChild(btn);
  });
}

function guardarYMostrar() {
  const nombre = document.getElementById("nombre").value;
  if (!nombre) {
    alert("Por favor escribe tu nombre");
    return;
  }

  const datos = {
    nombre,
    puntaje: puntos
  };

  fetch("https://script.google.com/macros/s/AKfycbz7a7qYd-LVbW8OpW5aPze6SxnHD3Ie6ii4XRRKVK2qVyYs6EEJsf-C0W7eKJr-octN/exec", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(resp => {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("final").style.display = "block";
    document.getElementById("final").innerText =
      `¡Gracias ${nombre}! Obtuviste ${puntos}/${preguntas.length}. Tus datos han sido registrados.`;
  })
  .catch(err => alert("Error al guardar: " + err));
}

document.getElementById("nextBtn").onclick = mostrarPregunta;
mostrarPregunta();
