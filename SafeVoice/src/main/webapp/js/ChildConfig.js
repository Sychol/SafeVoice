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
