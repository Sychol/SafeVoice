<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>웹 푸시 알림 테스트</title>

  <script>
    const contextPath = "<%= request.getContextPath() %>";

    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
    }

    window.addEventListener('DOMContentLoaded', () => {
      const publicKey = "BLxkhYVKxY8xeJtMMEMIlLCgH48T17wp1BUviC7fJvGhfn73kSBZEEAEHq3b5jAimOhEOlp8lKMmxa6EAQxeGqo"; // 👈 반드시 base64url!

      navigator.serviceWorker.register(contextPath + '/sw.js')
        .then(() => Notification.requestPermission())
        .then(permission => {
          if (permission !== 'granted') throw new Error('알림 권한 없음!');
          return navigator.serviceWorker.ready;
        })
        .then(reg => {
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
          });
        })
        .then(subscription => {
          console.log("✅ 구독 객체:", subscription);
          return fetch(contextPath + '/SaveSubscription.do', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
          });
        })
        .then(() => {
          console.log("✅ 구독 정보 저장 성공!");
        })
        .catch(err => {
          console.error("💥 구독 중 에러:", err);
        });
    });
  </script>
</head>
<body>
  <h1>🔔 웹 푸시 알림 연습!</h1>
  <button id="testPushBtn">📥 알림 보내기</button>

  <script>
  document.getElementById('testPushBtn').addEventListener('click', () => {
	  fetch(contextPath + "/test/SendPush.do", {
	    method: 'POST'
	  })
	    .then(res => res.text())
	    .then(result => alert(result))
	    .catch(err => alert("❌ 에러 발생: " + err));
	});
  </script>
</body>
</html>
