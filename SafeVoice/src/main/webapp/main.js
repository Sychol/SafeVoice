const vapidPublicKey = "BIgMt72kNgFlf4tOc2cYGSr71JQqUUzl8HjW4Ap2OgPCGDWZ9TOsUK5-IUGKLIdMmf-zAY9PY9elZEcSnnDO414";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

window.addEventListener('DOMContentLoaded', async () => {
	
	try {
		// sw 등록
	navigator.serviceWorker.register('/SafeVoice/sw.js', { scope: '/SafeVoice/' })
	console.log("✅ 서비스워커 등록 완료");
		// 알림 권한 상태 확인
		let permission = Notification.permission;
		if (permission === 'default') {
		      // 사용자가 아직 선택 안 한 경우 → 알림 권한 요청
		   permission = await Notification.requestPermission();
	    }
		if (permission !== 'granted') {
		       // 허용이 아닌 경우 → 에러 발생시켜 중단
		    throw new Error(permission === 'denied'
		       	 ? '알림 권한 거부됨 - 설정에서 허용해주세요'
		         : '알림 권한 없음');
	    }
		
		// 3. 서비스워커 준비 완료 시점 기다리기
	const reg = await navigator.serviceWorker.ready;
	// 4. 푸시 구독 시도
	const subscription = await reg.pushManager.subscribe({
	  userVisibleOnly: true,
	  applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
	});
	await fetch('/SaveSubscription.do', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(subscription)
	});
    console.log("✅ 구독 저장 성공");
	  } catch (error) {
	    // 전체 과정 중 오류 발생 시 여기로 들어옴
	    alert("❗ " + error.message); // alert로 error 출력
	    console.error(error); // console에 error 출력
	  }
	});
	
	// 테스트 (수동 알림 전송) js
	  const testBtn = document.getElementById('testPushBtn');
	  if (testBtn) {
	    testBtn.addEventListener('click', () => {
	      fetch(contextPath + "/test/SendPush.do", {
	        method: 'POST'
	      })
	        .then(res => res.text())
	        .then(result => alert(result))
	        .catch(err => alert("❌ 에러 발생: " + err));
	    });
	  }

