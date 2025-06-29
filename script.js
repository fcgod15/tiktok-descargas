// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.get('/api/tiktok', async (req, res) => {
  const { url } = req.query;
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extraer datos del HTML (¡Esto puede cambiar con el tiempo!)
    const scriptData = JSON.parse($('#__NEXT_DATA__').html() || '{}');
    const videoData = scriptData.props?.pageProps?.itemInfo?.itemStruct || {};

    const result = {
      title: videoData.desc || 'Sin título',
      play: videoData.video?.downloadAddr || videoData.video?.playAddr,
      cover: videoData.video?.cover,
      music: videoData.music?.playUrl,
      author: videoData.author,
      play_count: videoData.stats?.playCount
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el enlace' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
