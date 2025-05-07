/**
 * 
 */

console.log('🧨 sw.js 로딩됨!');

/**
self.addEventListener('push', function(event) {
  console.log('📥 푸시 이벤트 도착!');
  event.waitUntil(
    self.registration.showNotification('정민님 푸시 성공!!', {
      body: '드디어 성공했어요 🎉',
    })
  );
}); 테스트 코드
*/ 

self.addEventListener('push', function(event) {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    fetch('/SafeVoice/StopNotification.do', { method: 'POST' })
  );
});