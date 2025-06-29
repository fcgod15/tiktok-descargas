document.getElementById('tiktokForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const area = document.getElementById('tiktokURL');
  const links = area.value.trim().split('\n').filter(Boolean);
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '<p>Cargando...</p>';

  for (let link of links) {
    try {
      // Limpia parámetros extra del enlace
      const cleanLink = link.split('?')[0];
      
      const response = await fetch(`/api/tiktok?url=${encodeURIComponent(cleanLink)}`);
      const data = await response.json();
      
      if (!data.play) throw new Error("No se encontró el video");
      
      resultado.innerHTML += crearCardHTML(data, links.indexOf(link));
      actualizarHistorial(cleanLink);
    } catch (error) {
      resultado.innerHTML += `<p class="error">Error con ${link}: ${error.message}</p>`;
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Evita bloqueos
  }
});
