document.getElementById('tiktokForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('tiktokURL').value;

  const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
  const result = await response.json();

  if (result && result.data) {
    const data = result.data;
    document.getElementById('resultado').innerHTML = `
      <h2>${data.title || 'Video TikTok'}</h2>

      <video controls src="${data.play}" width="300"></video><br>
      <a href="${data.play}" download>📥 Descargar video sin marca de agua</a><br><br>

      <h3>🖼️ Imágenes disponibles</h3>
      <p>Portada estática:</p>
      <img src="${data.cover}" alt="Portada" width="200"><br>
      <a href="${data.cover}" download>Descargar portada</a><br><br>

      <p>Portada original:</p>
      <img src="${data.origin_cover}" alt="Original" width="200"><br>
      <a href="${data.origin_cover}" download>Descargar original</a><br><br>

      <p>Portada dinámica (gif o mp4):</p>
      <img src="${data.dynamic_cover}" alt="Dinámica" width="200"><br>
      <a href="${data.dynamic_cover}" download>Descargar portada animada</a><br><br>

      <h3>🎵 Música del video</h3>
      <audio controls src="${data.music}"></audio><br>
      <a href="${data.music}" download>Descargar música</a><br><br>

      <p>👤 Usuario: @${data.author.unique_id}</p>
      <p>📝 Descripción: ${data.title}</p>
      <p>👁️‍🗨️ Vistas: ${data.play_count}</p>
    `;
  } else {
    document.getElementById('resultado').innerText = 'No se pudo obtener información del video.';
  }
});
