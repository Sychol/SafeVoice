document.addEventListener("DOMContentLoaded", function () {
  const alertList = document.querySelector('.alert-list');
  const backButton = document.querySelector('.back-button');

  // 뒤로가기 버튼 기능
  if (backButton) {
    backButton.addEventListener('click', () => history.back());
  }
});