document.addEventListener('DOMContentLoaded', () => {
  const settingBtn = document.querySelector('.setting-btn');
  const settingMenu = document.querySelector('.setting-menu');
  const settingLabel = document.querySelector('.sos-setting-label');
  const backButton = document.querySelector(".back-button");

  
  // ✅ 저장된 값 불러오기
  const savedSetting = localStorage.getItem('sosRepeatSetting');
  if (savedSetting) {
    settingLabel.textContent = savedSetting;
  }

  // 버튼 클릭 시 메뉴 열기/닫기
  settingBtn.addEventListener('click', () => {
    settingMenu.style.display = settingMenu.style.display === 'block' ? 'none' : 'block';
  });

  // 메뉴 항목 클릭 시 라벨 변경 + 저장 + 메뉴 닫기
  settingMenu.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const selected = item.textContent;
      settingLabel.textContent = selected;

      // ✅ localStorage에 저장
      localStorage.setItem('sosRepeatSetting', selected);

      settingMenu.style.display = 'none';
    });
  });

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!settingBtn.contains(e.target) && !settingMenu.contains(e.target)) {
      settingMenu.style.display = 'none';
    }
  });
  
  if (backButton) {
      backButton.addEventListener("click", () => history.back());
    }
});
