document.getElementById('tiktokForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const area = document.getElementById('tiktokURL');
  const links = area.value.trim().split('\n').filter(Boolean);
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';

  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    try {
      // 1. Validar el enlace (ejemplo básico)
      if (!link.includes("tiktok.com")) {
        resultado.innerHTML += `<p class="error">Enlace no válido: ${link}</p>`;
        continue;
      }

      // 2. Simular una petición a tu backend/API (reemplaza con tu lógica real)
      const response = await fetch(`/api/tiktok?url=${encodeURIComponent(link)}`);
      if (!response.ok) throw new Error("Error al procesar el enlace");

      const data = await response.json();

      // 3. Crear y mostrar la card
      resultado.innerHTML += crearCardHTML(data, i);
      actualizarHistorial(link);

    } catch (error) {
      resultado.innerHTML += `<p class="error">Error con ${link}: ${error.message}</p>`;
    }
  }
});
