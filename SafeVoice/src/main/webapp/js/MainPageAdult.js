document.addEventListener('DOMContentLoaded', function () {
  const popupOverlay = document.getElementById('schoolAlertPopup');
  const popupBox = document.querySelector('.popup');

  popupOverlay.addEventListener('click', function (e) {
    if (!popupBox.contains(e.target)) {
      popupOverlay.style.display = 'none';
    }
  });

  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', function () {
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const childProfiles = document.querySelectorAll('.child-profile');
  childProfiles.forEach(profile => {
    profile.addEventListener('click', function () {
      const img = this.dataset.img;
      const name = this.dataset.name;
      const alert = this.dataset.alert;
      const date = this.dataset.date;
      const time = this.dataset.time;

      document.getElementById('main-profile-img').src = contextPath + "/image/" + img;
      document.getElementById('main-profile-name').textContent = name;
      document.getElementById('main-profile-alert').textContent = alert;
      document.getElementById('main-profile-date').textContent = date;
      document.getElementById('main-profile-time').textContent = time;
    });
  });

  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    alert.addEventListener('click', function () {
      const alertType = this.querySelector('.alert-text').textContent;
      console.log(alertType + "이 클릭되었습니다.");
    });
  });

  fetch('/SafeVoice/GetAlertHistory.do')
    .then(res => res.json())
    .then(data => {
      let sos = 0, danger = 0, caution = 0;

      const profileCircle = document.getElementById("popup-profile");
      popupBox.classList.remove('sos', 'warning', 'caution');
      if (profileCircle) profileCircle.classList.remove('sos', 'warning', 'caution');

      data.forEach(item => {
        const type = item.alertType;
        if (type === 'S') sos++;
        else if (type === 'D') danger++;
        else if (type === 'C') caution++;
      });

      const latest = data[0];
      if (latest) {
        const title = document.getElementById("alert-title");
        const desc = document.getElementById("alert-desc");
        const level = document.getElementById("alert-level");

        if (latest.alertType === 'S') {
          title.innerHTML = "긴급 위험 감지";
          desc.textContent = "자녀의 통화에서 긴급 상황이 감지되었습니다";
          level.textContent = "SOS";
          level.className = "sos";
          popupBox.classList.add("sos");
          if (profileCircle) profileCircle.classList.add("sos");
        } else if (latest.alertType === 'D') {
          title.innerHTML = "학교폭력 위험감지";
          desc.textContent = "자녀의 통화에서 위험이 감지되었습니다";
          level.textContent = "경고";
          level.className = "warning";
          popupBox.classList.add("warning");
          if (profileCircle) profileCircle.classList.add("warning");
        } else if (latest.alertType === 'C') {
          title.innerHTML = "주의 필요";
          desc.textContent = "자녀의 통화에서 주의가 필요한 내용이 감지되었습니다";
          level.textContent = "주의";
          level.className = "caution";
          popupBox.classList.add("caution");
          if (profileCircle) profileCircle.classList.add("caution");
        }

        // ✅ 팝업 띄울지 말지 결정
        setTimeout(function () {
          let levelText = "";
          const levelElem = document.getElementById('alert-level');
          if (levelElem) {
            levelText = levelElem.textContent.trim();
          }

          let confirmedLevel = localStorage.getItem('confirmedAlertLevel');
          if (confirmedLevel) {
            confirmedLevel = confirmedLevel.trim();
          }

          if (levelText !== confirmedLevel) {
            popupOverlay.style.display = 'flex';
          } else {
            popupOverlay.style.display = 'none';
          }

          const alertConfirmBtn = document.querySelector('.popup .alert-actions button:last-child');
          if (alertConfirmBtn) {
            alertConfirmBtn.addEventListener('click', function () {
              localStorage.setItem('confirmedAlertLevel', levelText);
              popupOverlay.style.display = 'none';
            });
          }
        }, 0);
      }

      // ✅ 카운트 반영
      document.getElementById("sos-count").textContent = sos + "회";
      document.getElementById("danger-count").textContent = danger + "회";
      document.getElementById("caution-count").textContent = caution + "회";

      // ✅ 날씨 반영
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

      // ✅ 알림 배지 표시
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
    }); // ← fetch().then(...)

}); // ← document.addEventListener
