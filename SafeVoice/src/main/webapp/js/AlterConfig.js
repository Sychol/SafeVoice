document.addEventListener("DOMContentLoaded", function () {
  // "자녀 추가하기" 버튼과 자녀 리스트 영역을 찾음
  const addBtn = document.querySelector(".add-child");
  const list = document.querySelector(".child-list");
  const backButton = document.querySelector('.back-button');
  // 버튼과 리스트가 실제로 존재할 경우에만 실행
  
  if (backButton) {
     backButton.addEventListener('click', () => history.back());
   }
   
  if (addBtn && list) {
    // "자녀 추가하기" 버튼 클릭 이벤트
    addBtn.addEventListener("click", function () {
      const today = new Date().toISOString().slice(0, 10); // 오늘 날짜 (YYYY-MM-DD 형식)

      // 새로운 자녀 요소(div)를 생성
      const newChild = document.createElement("div");
      newChild.className = "child-item"; // 스타일 적용을 위한 클래스

      // 자녀 정보를 HTML 구조로 삽입
      newChild.innerHTML = `
        <img src="${contextPath}/image/child_new.png" class="child-avatar" />
        <div class="child-info">
          <div class="child-name">새 자녀</div>
          <div class="child-date">최근 조회 날짜<br>${today}</div>
        </div>
        <div class="child-actions">
          <img src="${contextPath}/image/휴지통.png" alt="삭제" class="delete-btn" />
          <img src="${contextPath}/image/연필.png" alt="수정" />
          <img src="${contextPath}/image/메뉴.png" alt="메뉴" class="drag-handle" />
        </div>
      `;

      // 자녀 리스트에 새로 만든 자녀 항목을 추가
      list.appendChild(newChild);
    });

    // 자녀 리스트 전체에 클릭 이벤트 위임 (삭제 기능)
    list.addEventListener("click", function (e) {
      // 클릭한 요소가 "휴지통 아이콘"일 경우
      if (e.target && e.target.classList.contains("delete-btn")) {
        // 클릭된 버튼의 부모인 자녀 박스를 찾아서 삭제
        const childItem = e.target.closest(".child-item");
        if (childItem) {
          childItem.remove(); // DOM에서 해당 자녀 제거
        }
      }
    });

    // 자녀 리스트에 드래그 정렬 기능 활성화
    Sortable.create(list, {
      handle: ".drag-handle", // 이 클래스가 있는 요소(햄버거 버튼)를 눌러야 드래그 가능
      animation: 150 // 드래그 시 부드러운 이동 효과 (ms 단위)
    });
  }
});
