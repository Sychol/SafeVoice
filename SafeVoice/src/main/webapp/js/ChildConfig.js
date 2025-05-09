function confirmAlert() {
  localStorage.setItem('schoolAlertConfirmed', 'true');
  document.getElementById('schoolAlertPopup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const confirmed = localStorage.getItem('schoolAlertConfirmed');
  const popupOverlay = document.getElementById('schoolAlertPopup');
  const popupBox = document.querySelector('.popup');

  if (!confirmed) {
    popupOverlay.style.display = 'flex';
  }

  // 바깥 영역 클릭 시 팝업 닫기
  popupOverlay.addEventListener('click', function (e) {
    if (!popupBox.contains(e.target)) {
      popupOverlay.style.display = 'none';
    }
  });
});


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
		
	const latest = data[0];  // 제일 최근 알림 하나만 기준
	if (latest) {
	  const title = document.getElementById("alert-title");
	  const desc = document.getElementById("alert-desc");
	  const level = document.getElementById("alert-level");

	  if (latest.alertType === 'S') {
	    title.innerHTML = "긴급 위험<br>감지";
	    desc.textContent = "자녀의 통화에서 긴급 상황이 감지되었습니다";
	    level.textContent = "SOS";
	    level.className = "sos";
	  } else if (latest.alertType === 'D') {
	    title.innerHTML = "학교폭력<br>위험감지";
	    desc.textContent = "자녀의 통화에서 위험이 감지되었습니다";
	    level.textContent = "경고";
	    level.className = "warning";
	  } else if (latest.alertType === 'C') {
	    title.innerHTML = "주의<br>필요";
	    desc.textContent = "자녀의 통화에서 주의가 필요한 내용이 감지되었습니다";
	    level.textContent = "주의";
	    level.className = "caution";
	  }
	}
	    document.getElementById("sos-count").textContent = `${sos}회`;
	    document.getElementById("danger-count").textContent = `${danger}회`;
	    document.getElementById("caution-count").textContent = `${caution}회`;
	  })
	    .catch(err => {
	        console.error("❌ 알림 요약 가져오기 실패:", err);
	      });
	  });
	  
	  
	  
	  
