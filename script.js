// Cambiar tema claro/oscuro
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Aplicar tema al cargar
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}

// Utilidades
function crearCardHTML(data, index) {
  const id = `video-${index}`;
  return `
    <div class="card" id="${id}">
      <h3>${data.title || 'Video TikTok'}</h3>
      <video controls src="${data.play}" width="300"></video><br>
      <button onclick="iniciarDescarga('${data.play}', 'video-${index}.mp4')">Descargar video</button><br><br>

      <img src="${data.cover}" alt="Miniatura" width="200"><br>
      <button onclick="iniciarDescarga('${data.cover}', 'portada-${index}.jpg')">Descargar imagen</button><br><br>

      <audio controls src="${data.music}"></audio><br>
      <button onclick="iniciarDescarga('${data.music}', 'audio-${index}.mp3')">Descargar música</button><br><br>

      <p><strong>👤 Usuario:</strong> @${data.author?.unique_id || 'desconocido'}</p>
      <p><strong>📝 Descripción:</strong> ${data.title}</p>
      <p><strong>👁️‍🗨️ Vistas:</strong> ${data.play_count}</p>
      <p><strong>📅 Fecha:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
  `;
}

function iniciarDescarga(url, nombreArchivo) {
  const temporizador = 3;
  const original = event.target;
  original.disabled = true;
  original.innerText = `Espera ${temporizador}s...`;

  let s = temporizador;
  const intervalo = setInterval(() => {
    s--;
    original.innerText = `Espera ${s}s...`;
    if (s === 0) {
      clearInterval(intervalo);
      original.innerText = 'Descargando...';
      const a = document.createElement('a');
      a.href = url;
      a.download = nombreArchivo;
      document.body.appendChild(a);
      a.click();
      a.remove();
      original.innerText = 'Descargar de nuevo';
      original.disabled = false;

      // Contador de clics
      let total = parseInt(localStorage.getItem('descargas') || '0');
      localStorage.setItem('descargas', ++total);
    }
  }, 1000);
}

function actualizarHistorial(link) {
  let historial = JSON.parse(localStorage.getItem('historial') || '[]');
  historial.unshift(link);
  historial = historial.slice(0, 5);
  localStorage.setItem('historial', JSON.stringify(historial));
  renderizarHistorial();
}

function renderizarHistorial() {
  const historial = JSON.parse(localStorage.getItem('historial') || '[]');
  const lista = document.getElementById('listaHistorial');
  lista.innerHTML = '';
  historial.forEach(link => {
    const li = document.createElement('li');
    li.innerText = link;
    lista.appendChild(li);
  });
}

renderizarHistorial();

// Procesar links
document.getElementById('tiktokForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const area = document.getElementById('tiktokURL');
  const links = area.value.trim().split('\n').filter(Boolean);
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';
  for (let i = 0; i < links.length; i++)
