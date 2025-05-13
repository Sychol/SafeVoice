document.addEventListener('DOMContentLoaded', function () {
	const popupOverlay = document.getElementById('schoolAlertPopup');
	const popupBox = document.querySelector('.popup');

	popupOverlay.addEventListener('click', function (e) {
		if (!popupBox.contains(e.target)) {
			popupOverlay.style.display = 'none';
		}
	});

	fetch('/SafeVoice/GetAlertHistory.do')
		.then(res => res.json())
		.then(data => {
			console.log("alert data:", data);
			// 확인되지 않은 데이터 변수 
			const uncheckedAlerts = data.filter(item => item.viewOrNot === 0); // 확인되지 않은 알림만 추출
			
			console.log("확인되지 않은 알림 목록:", uncheckedAlerts);
			
			// 만약 확인되지 않은 데이터 변수가 없다면 팝업창을 출력하지 않음
			if(uncheckedAlerts.length === 0){
				popupOverlay.style.display = 'none';
				return;
			}
			const profileCircle = document.getElementById("popup-profile");
			
			let sos = 0, danger = 0, caution = 0;

			if (popupBox) popupBox.classList.remove('sos', 'warning', 'caution');
			if (profileCircle) profileCircle.classList.remove('sos', 'warning', 'caution');

			data.forEach(item => {
				const type = item.alertType;
				if (type === 'SOS') sos++;
				else if (type === '위험') danger++;
				else if (type === '경고') caution++;
			});

			// 확인하지 않은 아이 알람 중 가장 최근 데이터만 팝업
			const latest = uncheckedAlerts[0];
			if (latest && latest.alertType && latest.alertTime) {
				const alertId = latest.alertType + "_" + latest.alertTime;
				const confirmedId = localStorage.getItem('confirmedAlertId');

				const title = document.getElementById("alert-title");
				const desc = document.getElementById("alert-desc");
				const level = document.getElementById("alert-level");

				if (latest.alertType === 'SOS') {
					title.innerHTML = "긴급 위험 감지";
					desc.textContent = "자녀의 통화에서 긴급 상황이 감지되었습니다";
					level.textContent = "SOS";
					level.className = "sos";
					if (popupBox) popupBox.classList.add("sos");
					if (profileCircle) profileCircle.classList.add("sos");
				} else if (latest.alertType === '위험') {
					title.innerHTML = "학교폭력 위험감지";
					desc.textContent = "자녀의 통화에서 위험이 감지되었습니다";
					level.textContent = "경고";
					level.className = "warning";
					if (popupBox) popupBox.classList.add("warning");
					if (profileCircle) profileCircle.classList.add("warning");
				} else if (latest.alertType === '경고') {
					title.innerHTML = "주의 필요";
					desc.textContent = "자녀의 통화에서 주의가 필요한 내용이 감지되었습니다";
					level.textContent = "주의";
					level.className = "caution";
					if (popupBox) popupBox.classList.add("caution");
					if (profileCircle) profileCircle.classList.add("caution");
				}

				if (alertId !== confirmedId) {
					popupOverlay.style.display = 'flex';

					const alertConfirmBtn = document.querySelector('.popup .alert-actions button:last-child');
					if (alertConfirmBtn) {
						alertConfirmBtn.addEventListener('click', function () {
							localStorage.setItem('confirmedAlertId', alertId);
							popupOverlay.style.display = 'none';
						});
					}
				} else {
					popupOverlay.style.display = 'none';
				}
			}

			// 알림 개수 표시
			document.getElementById("sos-count").textContent = sos + "회";
			document.getElementById("danger-count").textContent = danger + "회";
			document.getElementById("caution-count").textContent = caution + "회";

			// 날씨 이미지 변경
			const weatherImg = document.querySelector('.weather-icon img');
			if (weatherImg) {
				if (sos >= 1) {
					weatherImg.src = contextPath + "/image/rainy.png";
					weatherImg.alt = "비";
				} else if (sos === 0) {
					weatherImg.src = contextPath + "/image/cloudy.png";
					weatherImg.alt = "흐림";
				} else {
					weatherImg.src = contextPath + "/image/sunny.png";
					weatherImg.alt = "맑음";
				}
			}

			// 🔴 뱃지 표시 여부 결정
			const alertBadge = document.querySelector('.badge');
			const alertChecked = localStorage.getItem('alertChecked') === 'true';

			if (alertBadge) {
				if (!alertChecked && sos > 0) {
					alertBadge.textContent = sos;
					alertBadge.style.display = 'inline-block';
				} else {
					alertBadge.textContent = '0';
					alertBadge.style.display = 'none';
				}
			}
		});
});
