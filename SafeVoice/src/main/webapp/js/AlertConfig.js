document.addEventListener('DOMContentLoaded', () => {
  const settingBtn = document.querySelector('.setting-btn');
  const settingMenu = document.querySelector('.setting-menu');
  const settingLabel = document.querySelector('.sos-setting-label');
  const backButton = document.querySelector(".back-button");

  // ✅ 반복 주기 저장된 값 복원
  const savedSetting = localStorage.getItem('sosRepeatSetting');
  if (savedSetting) {
    settingLabel.textContent = savedSetting;
  }

  // 반복주기 설정 클릭 시 저장 및 닫기
  settingBtn.addEventListener('click', () => {
    settingMenu.style.display = settingMenu.style.display === 'block' ? 'none' : 'block';
  });

  settingMenu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const selected = item.textContent;
      settingLabel.textContent = selected;
      localStorage.setItem('sosRepeatSetting', selected);
      settingMenu.style.display = 'none';
    });
  });

  // 외부 클릭 시 설정 메뉴 닫기
  document.addEventListener('click', (e) => {
    if (!settingBtn.contains(e.target) && !settingMenu.contains(e.target)) {
      settingMenu.style.display = 'none';
    }
  });

  // ✅ 소리/진동 토글 상태 복원 + 저장
  document.querySelectorAll('.setting-toggle').forEach(toggle => {
    const saved = localStorage.getItem(toggle.id);
    if (saved !== null) {
      toggle.checked = saved === 'true';
    }

    toggle.addEventListener('change', () => {
      localStorage.setItem(toggle.id, toggle.checked);
    });
  });

  // 뒤로가기
  if (backButton) {
    backButton.addEventListener("click", () => history.back());
  }
});
