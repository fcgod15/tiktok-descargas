document.getElementById('tiktokForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('tiktokURL').value.trim();
  const resultadoDiv = document.getElementById('resultado');
  
  // Validación básica de URL
  if (!url.includes('tiktok.com')) {
    resultadoDiv.innerHTML = '<p class="error">Por favor, ingresa una URL válida de TikTok</p>';
    return;
  }
  
  // Mostrar spinner de carga
  resultadoDiv.innerHTML = '<div class="spinner"></div>';
  
  try {
    const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (!result?.data) {
      throw new Error('No se encontraron datos del video');
    }
    
    const data = result.data;
    
    resultadoDiv.innerHTML = `
      <article class="tiktok-video">
        <header>
          <h2>${data.title || 'Video TikTok'}</h2>
          <p>👤 @${data.author.unique_id} | 👁️‍🗨️ ${data.play_count} vistas</p>
        </header>
        
        <section class="video-container">
          <video controls src="${data.play}" width="100%" max-width="500"></video>
          <div class="download-buttons">
            <a href="${data.play}" download="tiktok-video-sin-marca.mp4" class="download-btn">📥 Descargar video</a>
          </div>
        </section>
        
        <section class="media-grid">
          <div class="media-item">
            <h3>Portada estática</h3>
            <img src="${data.cover}" alt="Portada" loading="lazy">
            <a href="${data.cover}" download="tiktok-portada.jpg" class="download-btn">Descargar</a>
          </div>
          
          <div class="media-item">
            <h3>Portada original</h3>
            <img src="${data.origin_cover}" alt="Portada original" loading="lazy">
            <a href="${data.origin_cover}" download="tiktok-portada-original.jpg" class="download-btn">Descargar</a>
          </div>
          
          <div class="media-item">
            <h3>Portada animada</h3>
            <img src="${data.dynamic_cover}" alt="Portada animada" loading="lazy">
            <a href="${data.dynamic_cover}" download="tiktok-portada-animada.mp4" class="download-btn">Descargar</a>
          </div>
        </section>
        
        <section class="music-section">
          <h3>🎵 Música</h3>
          <audio controls src="${data.music}"></audio>
          <a href="${data.music}" download="tiktok-musica.mp3" class="download-btn">Descargar música</a>
        </section>
      </article>
    `;
    
  } catch (error) {
    resultadoDiv.innerHTML = `
      <div class="error">
        <p>Error al procesar el video: ${error.message}</p>
        <p>Intenta con otro enlace o verifica que la URL sea correcta.</p>
      </div>
    `;
    console.error('Error:', error);
  }
});
