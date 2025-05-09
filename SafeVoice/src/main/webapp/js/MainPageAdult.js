document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

	// 프로필 이미지 클릭 이벤트
	const childProfiles = document.querySelectorAll('.child-profile');
	childProfiles.forEach(profile => {
	    profile.addEventListener('click', function() {
	        const img = this.dataset.img;
	        const name = this.dataset.name;
	        const alert = this.dataset.alert;
	        const date = this.dataset.date;
	        const time = this.dataset.time;

	        document.getElementById('main-profile-img').src = `${contextPath}/image/${img}`;
	        document.getElementById('main-profile-name').textContent = name;
	        document.getElementById('main-profile-alert').textContent = alert;
	        document.getElementById('main-profile-date').textContent = date;
	        document.getElementById('main-profile-time').textContent = time;

	        console.log(`자녀 "${name}" 선택됨`);
	    });
	});

    // 액션 버튼 클릭 이벤트
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            console.log(`${buttonText} 버튼이 클릭되었습니다.`);
            
            if(buttonText.includes('위치확인')) {
                showLocationModal();
            } else if(buttonText.includes('전화걸기')) {
                makePhoneCall();
            } else if(buttonText.includes('알림내역확인')) {
                showNotifications();
            }
        });
    });

    // 알림 클릭 이벤트
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        alert.addEventListener('click', function() {
            const alertType = this.querySelector('.alert-text').textContent;
            console.log(`${alertType}이 클릭되었습니다.`);
        });
    });

	// 알림 개수 연동 fetch 포함!
	fetch('/SafeVoice/GetAlertHistory.do')
	  .then(res => res.json())
	  .then(data => {
	    let sos = 0, danger = 0, caution = 0;

	    data.forEach(item => {
	      if (item.alertType === 'S') sos++;
	      else if (item.alertType === 'D') danger++;
	      else if (item.alertType === 'C') caution++;
	    });

	    // 알림 개수 출력
	    document.getElementById("sos-count").textContent = `${sos}회`;
	    document.getElementById("danger-count").textContent = `${danger}회`;
	    document.getElementById("caution-count").textContent = `${caution}회`;

	    // 🔽 날씨 이미지 변경 로직 추가
	    const weatherImg = document.querySelector('.weather-icon img');
	    if (Number(sos) >= 1) {
	      weatherImg.src = `${contextPath}/image/rainy.png`;
	      weatherImg.alt = "비";
	    } else if (Number(sos) === 0) {
	      weatherImg.src = `${contextPath}/image/cloudy.png`;
	      weatherImg.alt = "흐림";
	    } else {
	      weatherImg.src = `${contextPath}/image/sunny.png`;
	      weatherImg.alt = "맑음";
	    }

	  })
});
