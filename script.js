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
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(resp => {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("final").style.display = "block";
    document.getElementById("final").innerText =
      `¡Gracias ${nombre}! Obtuviste ${puntos}/${preguntas.length}. Tus datos han sido registrados.`;
  })
  .catch(err => {
    alert("Error al guardar: " + err);
    console.error(err);
  });
}
