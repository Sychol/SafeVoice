const vapidPublicKey = "BIgMt72kNgFlf4tOc2cYGSr71JQqUUzl8HjW4Ap2OgPCGDWZ9TOsUK5-IUGKLIdMmf-zAY9PY9elZEcSnnDO414";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

window.addEventListener('DOMContentLoaded', () => {
	navigator.serviceWorker.register('/SafeVoice/sw.js', { scope: '/SafeVoice/' })
    .then(() => Notification.requestPermission())
    .then(permission => {
      if (permission !== 'granted') throw new Error('알림 권한 없음');
      return navigator.serviceWorker.ready;
    })
    .then(reg => reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    }))
    .then(subscription => fetch('/SaveSubscription.do', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    }))
    .then(() => console.log("✅ 구독 저장 성공"))
    .catch(console.error);
});