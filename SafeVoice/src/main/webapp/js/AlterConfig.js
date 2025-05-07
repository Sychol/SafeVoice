document.addEventListener("DOMContentLoaded", function () {
  // 뒤로가기 버튼 동작
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.addEventListener("click", function () {
      history.back();
    });
  }

  // 자녀 추가 동작
  const addBtn = document.querySelector(".add-child");
  const list = document.querySelector(".child-list");

  if (addBtn && list) {
    addBtn.addEventListener("click", function () {
      const newChild = document.createElement("div");
      newChild.className = "child-item";
      newChild.innerHTML = `
        <img src="${contextPath}/image/child_new.png" class="child-avatar" />
        <div class="child-info">
          <div class="child-name">새 자녀</div>
          <div class="child-date">최근 조회 날짜<br>${new Date().toISOString().slice(0, 10)}</div>
        </div>
        <div class="child-actions">
          <img src="${contextPath}/image/휴지통.png" alt="삭제" />
          <img src="${contextPath}/image/연필.png" alt="수정" />
          <img src="${contextPath}/image/메뉴.png" alt="메뉴" />
        </div>
      `;
      list.appendChild(newChild);
    });
  }
});
