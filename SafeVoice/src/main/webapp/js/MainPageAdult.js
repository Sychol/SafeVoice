// 네비게이션 버튼 활성화 기능
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

	        // 메인 프로필에 반영
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
            
            // 버튼별 기능 구현
            if(buttonText.includes('위치확인')) {
                // 위치확인 기능
                showLocationModal();
            } else if(buttonText.includes('전화걸기')) {
                // 전화걸기 기능
                makePhoneCall();
            } else if(buttonText.includes('알림내역확인')) {
                // 알림내역 기능
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
});

// 위치확인 모달창 표시 함수
function showLocationModal() {
    alert('아이의 위치를 확인합니다.');
    // 실제 구현에서는 모달창 또는 지도 표시
}

// 전화걸기 함수
function makePhoneCall() {
    alert('아이에게 전화를 겁니다.');
    // 실제 구현에서는 전화 연결 기능
}

// 알림내역 표시 함수
function showNotifications() {
    alert('알림 내역을 표시합니다.');
    // 실제 구현에서는 알림 내역 페이지로 이동 또는 모달창 표시
}

// 화면 크기 변경 감지 및 레이아웃 조정
window.addEventListener('resize', function() {
    adjustLayout();
});

// 초기 로드 시 레이아웃 조정
window.addEventListener('load', function() {
    adjustLayout();
});

// 레이아웃 조정 함수
function adjustLayout() {
    const isMobile = window.innerWidth < 768;
    const container = document.querySelector('.container');
    const alertsSection = document.querySelector('.alerts-section');
    
    if (isMobile) {
        container.style.height = 'auto';
        alertsSection.style.position = 'static';
    } else {
        // 데스크탑 레이아웃 조정
        container.style.position = 'relative';
        container.style.minHeight = '100vh';
    }
}
