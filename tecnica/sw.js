/* Técnica Neon: abre sem internet depois da primeira vez. Com internet, usa a versão mais nova.
   Os checks ao vivo vêm do Firebase (outro endereço) e não passam por aqui. */
var V='neon-tecnica-v1';
var FILES=['./','index.html','logo.png','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','mapa_kids.jpg','mapa_ta.jpg','luz_simulacao.jpg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match('index.html')})}))});
