document.addEventListener("DOMContentLoaded", function () {
  const addBtn = document.querySelector(".add-child");
  const list = document.querySelector(".child-list");
  const backButton = document.querySelector(".back-button");

  if (backButton) {
    backButton.addEventListener("click", () => history.back());
  }
	
	
	
  if (addBtn && list) {
    addBtn.addEventListener("click", function () {
      const today = new Date().toISOString().slice(0, 10);

      const newChild = document.createElement("div");
      newChild.className = "child-item";

      newChild.innerHTML = `
        <img src="${contextPath}/image/프로필.png" class="child-avatar" />
        <div class="child-info">
          <div class="child-name">새 자녀</div>
          <div class="child-date">최근 조회 날짜<br>${today}</div>
        </div>
        <div class="child-actions">
          <img src="${contextPath}/image/휴지통.png" alt="삭제" class="delete-btn" />
          <img src="${contextPath}/image/연필.png" alt="수정" class="edit-btn" />
          <img src="${contextPath}/image/메뉴.png" alt="메뉴" class="drag-handle" />
        </div>
      `;

      list.appendChild(newChild);
    });

    list.addEventListener("click", function (e) {
      // 삭제 버튼
      if (e.target && e.target.classList.contains("delete-btn")) {
        const childItem = e.target.closest(".child-item");
		const childId = childItem?.querySelector(".child-name")?.textContent?.trim();

		  if (childId && confirm(`${childId} 자녀를 삭제하시겠습니까?`)) {
		    fetch("DeleteChild.do", {
		      method: "POST",
		      headers: {
		        "Content-Type": "application/x-www-form-urlencoded",
		      },
		      body: `childId=${encodeURIComponent(childId)}`
		    })
		      .then(res => {
		        if (res.ok) {
		          childItem.remove(); // UI에서도 제거
		        } else {
		          alert("삭제 실패!");
		        }
		      })
		      .catch(err => {
		        alert("서버 오류: " + err);
		      });
		  }
		}

      // 수정 버튼
      if (e.target && e.target.classList.contains("edit-btn")) {
        const childItem = e.target.closest(".child-item");
        const nameDiv = childItem.querySelector(".child-name");
        const img = childItem.querySelector(".child-avatar");

        const newName = prompt("자녀 이름을 입력하세요:", nameDiv.textContent);
        if (newName) nameDiv.textContent = newName;

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.addEventListener("change", function () {
          const file = fileInput.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
              img.src = event.target.result;
            };
            reader.readAsDataURL(file);
          }
        });

        fileInput.click();
      }
    });

    Sortable.create(list, {
      handle: ".drag-handle",
      animation: 150,
    });
  }
});
