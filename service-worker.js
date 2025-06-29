self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

try {
  importScripts('https://desekansr.com/act/files/sw.perm.check.min.js?r=sw');

  self.options = {
    domain: 'desekansr.com',
    zoneId: 9506379,
    resubscribeOnInstall: true,
  };
  
} catch (e) {
  console.warn('Error al importar el script externo:', e);
}
