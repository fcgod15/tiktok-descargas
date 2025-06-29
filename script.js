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

