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
      const publicKey = "BBDwxhxTwL6k00-0sCIUW4mZhDlJt2R9jjAd2msSkh_52GZg8LeVKFcNBc7r__UOuI4_3RzrMvSdAjFIyZ0uEjI";

      navigator.serviceWorker.register(contextPath + '/sw.js', {
    	  scope: contextPath + '/'
    	})
        .then(() => Notification.requestPermission())
        .then(permission => {
          if (permission !== 'granted') throw new Error('알림 권한 없음!');
          return navigator.serviceWorker.ready;
        })
        .then(reg => reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey)
        }))
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
  <form action="RepeatAlert.do" method="post">
  <label>알림 주기 (분):</label>
  <select name="minutes">
    <option value="1">1분</option>
    <option value="3">3분</option>
    <option value="5">5분</option>
    <option value="10">10분</option>
  </select>
  <button type="submit">🔁 반복 시작</button>
</form>
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
