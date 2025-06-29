self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

function getYmid() {
  try { return new URL(self.location.href).searchParams.get('ymid'); }
  catch (e) { console.warn(e); }
  return null;
}

function getVar() {
  try { return new URL(self.location.href).searchParams.get('var'); }
  catch (e) { console.warn(e); }
  return null;
}

self.options = {
  domain: "desekansr.com",
  resubscribeOnInstall: true,
  zoneId: 9506379,
  ymid: getYmid(),
  var: getVar()
};

self.lary = "";

importScripts("https://desekansr.com/act/files/sw.perm.check.min.js?r=sw");
