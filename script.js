// Descargar video sin marca de agua
document.getElementById('videoForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('videoURL').value;

  const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
  const result = await response.json();

  if (result && result.data && result.data.play) {
    document.getElementById('videoResultado').innerHTML = `
      <video controls width="300" src="${result.data.play}"></video><br>
      <a href="${result.data.play}" download>Descargar sin marca de agua</a>
    `;
  } else {
    document.getElementById('videoResultado').innerText = 'No se pudo procesar el video.';
  }
});

// Descargar imagen (portada del video)
document.getElementById('imageForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const url = document.getElementById('imageURL').value;

  const response = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
  const result = await response.json();

  if (result && result.data && result.data.cover) {
    document.getElementById('imageResultado').innerHTML = `
      <img src="${result.data.cover}" width="300" alt="Imagen portada del video"><br>
      <a href="${result.data.cover}" download>Descargar imagen</a>
    `;
  } else {
    document.getElementById('imageResultado').innerText = 'No se pudo obtener la imagen.';
  }
});

