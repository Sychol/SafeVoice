document.addEventListener("DOMContentLoaded", function () {
  const alertList = document.querySelector('.alert-list');
  const backButton = document.querySelector('.back-button');

  // 뒤로가기 버튼 기능
  if (backButton) {
    backButton.addEventListener('click', () => history.back());
  }

  // 알림 항목 추가 함수
  function addAlert(date, time, type) {
    if (!alertList) return;
    const article = document.createElement('article');
    article.className = 'alert-item';
    article.innerHTML = `
      <div class="alert-content">
        <div class="alert-date">${date}</div>
        <div class="alert-time">${time}</div>
        <div class="alert-type toggle-details" style="display: none;">${type}</div>
      </div>
      <div class="alert-icon">!</div>
    `;

    // 클릭 시 상세 정보 토글
    article.addEventListener('click', () => {
      const detail = article.querySelector('.toggle-details');
      if (detail) {
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
      }
    });

    alertList.prepend(article);
  }

  // ✅ 테스트용 알림 데이터 (alertVO처럼 구성)
  
  // 1. 프론트로부터 검색하려는 id를 받아오기
  const id = 'ID 1'
  // 2. id를 MemberVO에 담기
  
  const alertData = [
    {
      memberId: '학생001',
      alertType: 'SOS',
      // rat: '38.1654',
      // lon: '129.2485',
      // alertContext: '비명 감지됨',
      date: '2025-05-02',
      time: '16:30:44'
    },
    {
      memberId: '학생002',
      alertType: '주의',
      // rat: '38.1654',
      // lon: '129.2485',
      // alertContext: '이상 행동',
      date: '2025-05-02'
    },
    {
      memberId: '학생003',
      alertType: '경고',
      // rat: '38.1654',
      // lon: '129.2485',
      // alertContext: '위험 감지',
      date: '2025-05-02'
    }
  ];

  // 알림 데이터 화면에 추가
  if (Array.isArray(alertData)) {
    alertData.forEach(alert => {
      addAlert(
  	`${alert.memberId}`,
  	`${alert.date}<br>${alert.time || ''}`,   // 날짜와 시간 사이에 줄바꿈
  	`${alert.alertType} - ${alert.alertContext || ''}`
);
    });
  } else {
    console.warn("⚠️ alertData가 정의되지 않았거나 배열이 아님");
  }
});
