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
  
  // 전역에서 변수 선언
  let alertData = [];
  
  // json 형태의 알림 데이터 가져오기
    fetch('/SafeVoice/GetAlertHistory.do')
    	.then(res => res.json())
  		.then(data => {
			console.log(data);
  			data.forEach(item => {
				//  alerttime 의 날짜와 시간이 붙어 있으므로, 그것을 떼어준다.
				if(item.alertTime){
					const [date, time] = item.alertTime.split(' ');
					item.date = date;
					item.time = time;
				}
			});
		// 가져온 데이터를 전역 변수에 입력
		alertData = data;
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
  	})
  	.catch(error => {
  		console.error("오류:", error);
  	})
	

});
