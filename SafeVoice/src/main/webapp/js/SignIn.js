/**
 * 회원가입 전체 스크립트 (초세밀 주석 버전 + 전체 기능 통합)
 * 기능 목록:
 * 1. 카카오 주소 API embed
 * 2. 회원가입 입력 요소 초기화 (아이디, 비밀번호, 이메일, 전화번호, 약관, 다크모드)
 * 3. 생년월일 max 제한
 * 4. 회원가입 유효성 검사 및 축하 모달
 */

// ✅ 1. 주소 검색 레이어 팝업 (카카오 API)
function execDaumPostcode() {
  const layerBg = document.getElementById('postcodeLayer');
  const layerWrp = document.getElementById('postcodeContainer');
  layerBg.style.display = 'block';
  new daum.Postcode({
    oncomplete: function(data) {
      let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
      let extra = '';
      if (data.userSelectedType === 'R') {
        if (data.bname && /[동|로|가]$/.test(data.bname)) extra += data.bname;
        if (data.buildingName && data.apartment === 'Y') extra += extra ? `, ${data.buildingName}` : data.buildingName;
        if (extra) addr += ` ${extra}`;
      }
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById('address').value = addr;
      document.getElementById('detailAddress').focus();
      layerBg.style.display = 'none';
    },
    width: '100%', height: '100%'
  }).embed(layerWrp);
}

// ✅ 2. 입력 요소 초기화 기능
function initSignInFeatures(path) {
  const usernameInput = document.getElementById('username');
  const usernameMsg = document.getElementById('username-msg');
  const checkBtn = document.getElementById('check-username');
  let isValidUsername = false;
  if (usernameInput && usernameMsg && checkBtn) {
    usernameInput.addEventListener('input', function () {
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/.test(this.value.trim());
      usernameMsg.textContent = valid ? '형식이 올바릅니다. 중복 확인을 해주세요.' : '아이디는 영문+숫자 조합, 4~10자이어야 합니다.';
      usernameMsg.className = `message ${valid ? 'blue' : 'red'}`;
      isValidUsername = valid;
    });
    checkBtn.addEventListener('click', function () {
      if (!isValidUsername) {
        usernameMsg.textContent = '형식을 먼저 올바르게 입력하세요.';
        usernameMsg.className = 'message red';
        return;
      }
      fetch(`${path}/users/duplicated/0?str=${encodeURIComponent(usernameInput.value.trim())}`)
        .then(res => res.json())
        .then(data => {
          usernameMsg.textContent = data.success ? '사용 가능한 아이디입니다.' : data.msg;
          usernameMsg.className = `message ${data.success ? 'green' : 'red'}`;
        })
        .catch(() => {
          usernameMsg.textContent = '서버 오류가 발생했습니다.';
          usernameMsg.className = 'message red';
        });
    });
  }

  const pw1 = document.getElementById('pw1');
  const pw2 = document.getElementById('pw2');
  const msg1 = document.getElementById('pw1-msg');
  const msg2 = document.getElementById('pw2-msg');
  if (pw1 && msg1 && pw2 && msg2) {
    const checkPasswordMatch = () => {
      if (pw2.value === '') {
        msg2.textContent = '';
        msg2.className = 'message';
        return;
      }
      const match = pw1.value === pw2.value;
      msg2.textContent = match ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
      msg2.className = `message ${match ? 'green' : 'red'}`;
    };
    pw1.addEventListener('blur', () => { msg1.textContent = ''; });
    pw1.addEventListener('input', () => {
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
      msg1.textContent = valid ? '안전한 비밀번호 형식입니다.' : '비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.';
      msg1.className = `message ${valid ? 'blue' : 'red'}`;
      checkPasswordMatch();
    });
    pw2.addEventListener('input', checkPasswordMatch);
  }

  const emailId = document.getElementById('email-id');
  const domainTxt = document.getElementById('domain-txt');
  const domainSel = document.getElementById('domain-list');
  const emailFull = document.getElementById('email-full');
  function updateEmail() {
    if (domainSel.value === 'type') {
      domainTxt.disabled = false;
      domainTxt.value = '';
      domainTxt.focus();
    } else {
      domainTxt.disabled = true;
      domainTxt.value = domainSel.value;
    }
    emailFull.value = `${emailId.value}@${domainTxt.value}`;
  }
  if (emailId && domainTxt && domainSel && emailFull) {
    emailId.addEventListener('input', updateEmail);
    domainSel.addEventListener('change', updateEmail);
    domainTxt.addEventListener('input', updateEmail);
    updateEmail();
  }

  const phoneGroups = [[ 'phone1', 'phone2', 'phone3', 'MyNum' ]];
  phoneGroups.forEach(([p1, p2, p3, outputId]) => {
    const ip1 = document.getElementById(p1);
    const ip2 = document.getElementById(p2);
    const ip3 = document.getElementById(p3);
    const outputEl = document.getElementById(outputId);
    if (ip1 && ip2 && ip3 && outputEl) {
      [ip1, ip2, ip3].forEach((el, idx, arr) => {
        el.addEventListener('input', () => {
          el.value = el.value.replace(/\D/g, '');
          if (el.value.length === el.maxLength) {
            if (idx < arr.length - 1) {
              arr[idx + 1].focus();
            } else {
              const val = `${ip1.value}-${ip2.value}-${ip3.value}`;
              outputEl.textContent = val;
              if (outputId === 'MyNum') document.getElementById('tel').value = val;
            }
          }
        });
      });
    }
  });

  const toggleBtn = document.getElementById('toggleMode');
  if (toggleBtn) {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️';
    }
    toggleBtn.addEventListener('click', () => {
      const dark = document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = dark ? '☀️' : '🌙';
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  const openTerms = document.getElementById('openTerms');
  const termsModal = document.getElementById('termsModal');
  const closeTerms = document.getElementById('closeTerms');
  const agreeBtn = document.getElementById('agreeBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const agreeAllChk = document.getElementById('agreeAll');
  const consentMsg = document.getElementById('consent-msg');
  const form = document.getElementById('signForm');
  if (openTerms && termsModal) openTerms.addEventListener('click', e => { e.preventDefault(); termsModal.style.display = 'block'; });
  if (closeTerms) closeTerms.addEventListener('click', () => { termsModal.style.display = 'none'; });
  if (cancelBtn) cancelBtn.addEventListener('click', () => { termsModal.style.display = 'none'; });
  if (agreeBtn) agreeBtn.addEventListener('click', () => {
    agreeAllChk.checked = true;
    consentMsg.style.display = 'none';
    termsModal.style.display = 'none';
  });
  if (termsModal) termsModal.addEventListener('click', e => { if (e.target === termsModal) termsModal.style.display = 'none'; });
  if (form) form.addEventListener('submit', e => {
    if (!agreeAllChk.checked) {
      e.preventDefault();
      consentMsg.style.display = 'block';
    }
  });
}

// ✅ 3. 생년월일 입력 필드에 오늘까지만 허용
function restrictBirthToToday() {
  const birthInput = document.getElementById('birth');
  if (birthInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const maxDate = `${yyyy}-${mm}-${dd}`;
    birthInput.max = maxDate;
  }
}

// ✅ 4. 회원가입 제출 & 축하 모달 처리 + 유효성 검사
const formEl = document.getElementById('signForm');
const welcomeModal = document.getElementById('welcomeModal');
const welcomeMsg = document.getElementById('welcomeMessage');
const welcomeOk = document.getElementById('welcomeOk');
if (formEl && welcomeModal && welcomeMsg && welcomeOk) {
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const pw1Val = document.getElementById('pw1').value;
    const pw2Val = document.getElementById('pw2').value;
    const birthVal = document.getElementById('birth').value;
    const isUsernameValid = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/.test(username);
    const isPasswordValid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1Val);
    const isPasswordMatch = pw1Val === pw2Val;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const isBirthValid = birthVal <= todayStr;
    if (!isUsernameValid) return alert('아이디 조건을 확인해주세요.');
    if (!isPasswordValid) return alert('비밀번호 형식을 확인해주세요.');
    if (!isPasswordMatch) return alert('비밀번호가 일치하지 않습니다.');
    if (!isBirthValid) return alert('생년월일을 잘못 입력하셨습니다.');
    const formData = new FormData(formEl);
    fetch(formEl.action, { method: formEl.method, body: formData })
      .then(res => res.json())
      .then(result => {
		if (result.success) {
          const selectedType = document.querySelector('input[name="div"]:checked')?.value;
          const userName = document.getElementById('name').value.trim();
          welcomeMsg.textContent = selectedType === 'parent'
            ? `${userName}님, 부모님 회원가입을 진심으로 환영합니다!`
            : `${userName}님, 자녀 회원가입을 축하합니다!`;
          welcomeModal.style.display = 'block';
        } else {
          alert('회원가입 실패: ' + result.msg);
        }
      })
      .catch(() => alert('서버 오류가 발생했습니다.'));
  });A
  welcomeOk.addEventListener('click', function () {
    window.location.href = window.path + '/Login.do';
  });
}

// ✅ 5. 초기화 실행
// 페이지 로드 후 주소검색 버튼, 회원가입 폼 기능, 생년월일 max 제한 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.execDaumPostcode = execDaumPostcode;
  const btn = document.getElementById('btnPostcode');
  if (btn) btn.addEventListener('click', execDaumPostcode);
  initSignInFeatures(window.path);
  restrictBirthToToday();
});
