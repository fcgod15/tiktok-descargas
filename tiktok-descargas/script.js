// Descargar video sin marca de agua
document.getElementById('videoForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('videoURL').value;

  const response = await fetch(`https://api.tiklydown.me/download?url=${encodeURIComponent(url)}`);
  const result = await response.json();

  if (result && result.download && result.download.nowm) {
    document.getElementById('videoResultado').innerHTML = `
      <video controls src="${result.download.nowm}" width="300"></video><br>
      <a href="${result.download.nowm}" download>Descargar sin marca de agua</a>
    `;
  } else {
    document.getElementById('videoResultado').innerText = 'No se pudo descargar el video.';
  }
});

// Descargar imagen (portada del video)
document.getElementById('imageForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('imageURL').value;

  const response = await fetch(`https://api.tiklydown.me/download?url=${encodeURIComponent(url)}`);
  const result = await response.json();

  if (result && result.download && result.cover) {
    document.getElementById('imageResultado').innerHTML = `
      <img src="${result.download.cover}" width="300" alt="Portada del video"><br>
      <a href="${result.download.cover}" download>Descargar imagen</a>
    `;
  } else {
    document.getElementById('imageResultado').innerText = 'No se pudo obtener la imagen.';
  }
});
