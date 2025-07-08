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

let actual = 0;
let puntos = 0;

function mostrarPregunta() {
  const q = preguntas[actual];
  document.getElementById("question").textContent = q.texto;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.opciones.forEach((opcion, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => {
      if (i === q.correcta) puntos++;
      actual++;
      if (actual < preguntas.length) {
        mostrarPregunta();
      } else {
        guardarYMostrar();
      }
    };
    answersDiv.appendChild(btn);
  });
}

function guardarYMostrar() {
  const nombre = document.getElementById("nombre").value;
  if (!nombre.trim()) {
    alert("Por favor escribe tu nombre");
    return;
  }

  const datos = {
    nombre: nombre,
    puntaje: puntos
  };

  // 👉 Asegúrate de que esta URL es la TUYA
  fetch("https://script.google.com/macros/s/AKfycby4fait2mpKh25ETpyzNm91h6NypbE_ENndTRHB0AzrgCRDzpNDyhCFss18j7n8fFg5tg/exec", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(resp => {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("final").style.display = "block";
    document.getElementById("final").innerText = `¡Gracias ${nombre}! Obtuviste ${puntos}/${preguntas.length}. Tus datos han sido registrados.`;
  })
  .catch(err => {
    alert("Error al guardar: " + err.message);
    console.error("Fetch error:", err);
  });
}

document.getElementById("nextBtn").onclick = mostrarPregunta;
mostrarPregunta();
