// 아이디 입력 후 비밀번호 수정 폼 표시
document.getElementById("findForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const findMsg = document.getElementById("findMsg");
  const id = document.getElementById("idInput").value.trim();

  if (!id) {
    findMsg.textContent = "아이디를 입력해 주세요.";
    findMsg.classList.add("error");
    return;
  }

  try {
    const res = await fetch(`${contextPath}/find-user-id`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id }),
    });

    if (res.ok) {
      findMsg.textContent = "아이디가 확인되었습니다. 비밀번호를 수정할 수 있습니다.";
      findMsg.classList.add("success");
      // 비밀번호 수정 폼으로 전환
      document.getElementById("findContainer").classList.add("hidden");
      document.getElementById("resetContainer").classList.remove("hidden");
    } else {
      findMsg.textContent = "아이디가 존재하지 않습니다.";
      findMsg.classList.add("error");
    }
  } catch (err) {
    findMsg.textContent = "서버와 통신 중 오류가 발생했습니다.";
    findMsg.classList.add("error");
  }
});

// 비밀번호 수정 폼 처리
document.getElementById("resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const resetMsg = document.getElementById("resetMsg");
  const id = document.getElementById("idInput").value.trim();
  const newPassword = document.getElementById("pw1").value.trim();
  const confirmPassword = document.getElementById("pw2").value.trim();

  // 비밀번호 확인
  if (newPassword !== confirmPassword) {
    resetMsg.textContent = "비밀번호가 일치하지 않습니다.";
    resetMsg.classList.add("error");
    return;
  }

  try {
    const res = await fetch(`${contextPath}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id, password: newPassword }),
    });

    if (res.ok) {
      resetMsg.textContent = "비밀번호가 성공적으로 변경되었습니다.";
      resetMsg.classList.add("success");
    } else {
      resetMsg.textContent = "아이디가 존재하지 않거나 비밀번호 변경에 실패했습니다.";
      resetMsg.classList.add("error");
    }
  } catch (err) {
    resetMsg.textContent = "서버와 통신 중 오류가 발생했습니다.";
    resetMsg.classList.add("error");
  }
});
