/**
 * 
 */

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  self.registration.showNotification(data.title || "제목 없음", {
    body: data.body || "내용 없음"
  });
});
