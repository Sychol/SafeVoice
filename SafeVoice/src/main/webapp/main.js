function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const contextPath = window.location.pathname.split("/")[1];
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

// 실제 등록 코드! 페이지 로딩 이후 실행
window.addEventListener('DOMContentLoaded', () => {
	const vapidPublicKey = "BLxkhYVKxY8xeJtMMEMIlLCgH48T17wp1BUviC7fJvGhfn73kSBZEEAEHq3b5jAimOhEOlp8lKMmxa6EAQxeGqo";
	

  console.log("🧃 페이지 로드됨! 서비스워커 등록 시작");

  navigator.serviceWorker.register('/sw.js')
    .then(() => {
      console.log("✅ 서비스워커 등록 완료");
      return Notification.requestPermission();
    })
    .then(permission => {
      console.log("🔔 알림 권한 상태:", permission);
      if (permission !== 'granted') throw new Error('알림 권한 거부됨!');
      return navigator.serviceWorker.ready;
    })
    .then(reg => {
      console.log("📬 구독 시도 중...");
      return reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });
    })
    .then(subscription => {
      console.log("📦 구독 성공! 서버로 전송 중...");
      return fetch(`/${contextPath}/SaveSubscription.do`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
    })
    .then(() => {
      console.log("✅ 서버에 구독 정보 저장 완료!");
    })
    .catch(err => {
      console.error("💥 에러 발생:", err);
    });
});

