(function() {
	
	// ─── 다크모드 토글 ───
	  const toggleButton = document.getElementById("toggleMode");
	  if (toggleButton) {
	    if (localStorage.getItem("theme") === "dark") {
	      document.body.classList.add("dark-mode");
	      toggleButton.textContent = "☀️";
	    }
	    toggleButton.addEventListener("click", () => {
	      const isDark = document.body.classList.toggle("dark-mode");
	      toggleButton.textContent = isDark ? "☀️" : "🌙";
	      localStorage.setItem("theme", isDark ? "dark" : "light");
	    });
	  }

  // 1) URL에서 token 추출
  const token = new URLSearchParams(location.search).get('token');

  // 2) DOM 참조
  const findC    = document.getElementById('findContainer');
  const resetC   = document.getElementById('resetContainer');
  const findF    = document.getElementById('findForm');
  const resetF   = document.getElementById('resetForm');
  const findMsg  = document.getElementById('findMsg');
  const resetMsg = document.getElementById('resetMsg');

  // 3) 토큰 유무에 따라 폼 전환
  if (token) {
    findC.classList.add('hidden');
    resetC.classList.remove('hidden');
  }

  // 4) 비밀번호 찾기(form#findForm) 처리
  findF.addEventListener('submit', async e => {
    e.preventDefault();
    findMsg.textContent = '';
    findMsg.className = 'message';

    const email = document.getElementById('emailInput').value.trim();
    if (!email) {
      findMsg.textContent = '이메일을 입력해 주세요.';
      findMsg.classList.add('error');
      return;
    }

    try {
      const res = await fetch(`${contextPath}/find-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email })
      });
      findMsg.textContent = res.ok
        ? '메일을 전송했습니다. 메일함을 확인해 주세요.'
        : '이메일 전송에 실패했어요.';
      findMsg.classList.add(res.ok ? 'success' : 'error');
    } catch (err) {
      console.error(err);
      findMsg.textContent = '서버와 통신 중 오류가 발생했습니다.';
      findMsg.classList.add('error');
    }
  });

  // 5) 비밀번호 재설정 폼 유효성 검사 & 일치 확인
  const pw1  = document.getElementById('pw1');
  const pw2  = document.getElementById('pw2');
  const msg1 = document.getElementById('pw1-msg');
  const msg2 = document.getElementById('pw2-msg');

  if (pw1 && pw2 && msg1 && msg2) {
    // 비밀번호 일치 여부 체크
    const checkMatch = () => {
      if (!pw2.value) {
        msg2.textContent = '';
        msg2.className = 'message';
        return;
      }
      const match = pw1.value === pw2.value;
      msg2.textContent = match
        ? '비밀번호가 일치합니다.'
        : '비밀번호가 일치하지 않습니다.';
      msg2.className = `message ${match ? 'green' : 'red'}`;
    };

    // 1) 형식 검사 (영문+숫자 포함, 8자 이상)
    pw1.addEventListener('input', () => {
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
      msg1.textContent = valid
        ? '안전한 비밀번호 형식입니다.'
        : '비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.';
      msg1.className = `message ${valid ? 'blue' : 'red'}`;
      checkMatch();
    });

    // 2) 확인 필드 입력 시 일치 체크
    pw2.addEventListener('input', checkMatch);
  }

  // 6) 비밀번호 재설정(form#resetForm) 처리
  resetF.addEventListener('submit', async e => {
    e.preventDefault();
    resetMsg.textContent = '';
    resetMsg.className = 'message';

    const pw = pw1.value;
    const cf = pw2.value;

    // 최종 검증
    if (!/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw)) {
      resetMsg.textContent = '올바른 비밀번호 형식을 사용해 주세요.';
      resetMsg.classList.add('error');
      return;
    }
    if (pw !== cf) {
      resetMsg.textContent = '비밀번호가 일치하지 않습니다.';
      resetMsg.classList.add('error');
      return;
    }

    try {
      const res = await fetch(`${contextPath}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ token, password: pw, confirm: cf })
      });
      if (res.ok) {
        resetMsg.textContent = '비밀번호가 성공적으로 변경되었습니다.';
        resetMsg.classList.add('success');
      } else {
        resetMsg.textContent = '유효하지 않거나 만료된 링크입니다.';
        resetMsg.classList.add('error');
      }
    } catch (err) {
      console.error(err);
      resetMsg.textContent = '서버와 통신 중 오류가 발생했습니다.';
      resetMsg.classList.add('error');
    }
  });
})();
