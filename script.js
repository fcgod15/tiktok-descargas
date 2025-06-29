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

      <img src="${data.cover}" alt="Miniatura" width="200"><br>
      <a href="${data.cover}" download>🖼 Descargar imagen de portada</a><br><br>

      <audio controls src="${data.music}"></audio><br>
      <a href="${data.music}" download>🎵 Descargar música del video</a><br><br>

      <p>👤 Usuario: @${data.author.unique_id}</p>
      <p>📝 Descripción: ${data.title}</p>
      <p>👁️‍🗨️ Vistas: ${data.play_count}</p>
    `;
  } else {
    document.getElementById('resultado').innerText = 'No se pudo obtener información del video.';
  }
});

