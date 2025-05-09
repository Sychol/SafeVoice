/**
 * 회원가입 전체 스크립트 (초세밀 주석 버전 + 전체 기능 통합)
 * 기능 목록:
 * 1. 카카오 주소 API embed
 * 2. 자동 ID 중복 검사 (입력 시 & 버튼 클릭)
 * 3. 비밀번호, 이메일, 전화번호, 약관, 다크모드
 * 4. 생년월일 max 제한
 * 5. 가입 제출 & 축하 모달
 */

'use strict';

// 1. 카카오 주소 검색 레이어 팝업
function execDaumPostcode() {
  const layerBg  = document.getElementById('postcodeLayer');
  const layerWrp = document.getElementById('postcodeContainer');
  layerBg.style.display = 'flex'; // flex 중앙 정렬

  new daum.Postcode({
    oncomplete(data) {
      let addr = data.userSelectedType === 'R'
        ? data.roadAddress
        : data.jibunAddress;
      let extra = '';
      if (data.userSelectedType === 'R') {
        if (data.bname && /[동|로|가]$/.test(data.bname)) extra += data.bname;
        if (data.buildingName && data.apartment === 'Y') {
          extra += extra ? `, ${data.buildingName}` : data.buildingName;
        }
        if (extra) addr += ` ${extra}`;
      }
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById('address').value   = addr;
      document.getElementById('detailAddress').focus();
      layerBg.style.display = 'none';
    },
    width: '100%',
    height: '100%'
  }).embed(layerWrp);
}

// 레이어 열기/닫기 바인딩
document.getElementById('btnPostcode')
  .addEventListener('click', execDaumPostcode);
document.getElementById('closePostcodeLayer')
  .addEventListener('click', () => {
    document.getElementById('postcodeLayer').style.display = 'none';
  });

/**
 * 2. 입력 요소 초기화 기능
 *    • 자동 ID 중복 검사
 *    • 비번 검사
 *    • 이메일 조합
 *    • 전화번호 자동 포커스
 *    • 다크모드 토글
 *    • 약관 모달
 */
function initSignInFeatures(path) {
  // --- 자동 ID 중복 검사 ---
  const usernameInput = document.getElementById('username');
  const usernameMsg   = document.getElementById('username-msg');
  const checkBtn      = document.getElementById('check-username');
  let debounceTimer;

  // 서버 중복 확인 함수
  async function checkDuplicate(username) {
    const res = await fetch(
      `${path}/users/duplicated/0?str=${encodeURIComponent(username)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.success;
  }

  // 입력 시 디바운스 걸고 검사
  if (usernameInput && usernameMsg) {
    usernameInput.addEventListener('input', () => {
      console.log('[DEBUG] input event fired, 현재 값:', usernameInput.value);

      const v     = usernameInput.value.trim();
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9A-Za-z]{4,10}$/.test(v);

      clearTimeout(debounceTimer);
      if (!valid) {
        usernameMsg.textContent = '아이디는 영문+숫자 조합, 4~10자이어야 합니다.';
        usernameMsg.className   = 'message red';
        return;
      }

      usernameMsg.textContent = '형식이 올바릅니다. 중복 확인 중…';
      usernameMsg.className   = 'message';

      debounceTimer = setTimeout(async () => {
        console.log('[DEBUG] 500ms 후 중복 검사 시작:', v);
        try {
          const ok = await checkDuplicate(v);
          console.log('[DEBUG] 서버 응답, available?:', ok);
          if (ok) {
            usernameMsg.textContent = '사용 가능한 아이디입니다.';
            usernameMsg.className   = 'message green';
          } else {
            usernameMsg.textContent = '이미 사용 중인 아이디입니다.';
            usernameMsg.className   = 'message red';
          }
        } catch (err) {
          console.error('[DEBUG] 중복 검사 에러:', err);
          usernameMsg.textContent = '서버 오류가 발생했습니다.';
          usernameMsg.className   = 'message red';
        }
      }, 500);
    });
  }


  // 버튼 눌러도 동일 검사
  if (checkBtn && usernameInput) {
    checkBtn.addEventListener('click', () => {
      usernameInput.dispatchEvent(new Event('input'));
    });
  }

  // --- 비밀번호 검사 ---
  const pw1 = document.getElementById('pw1');
  const pw2 = document.getElementById('pw2');
  const msg1 = document.getElementById('pw1-msg');
  const msg2 = document.getElementById('pw2-msg');
  if (pw1 && pw2 && msg1 && msg2) {
    const checkMatch = () => {
      if (!pw2.value) {
        msg2.textContent = '';
        msg2.className   = 'message';
        return;
      }
      const match = pw1.value === pw2.value;
      msg2.textContent = match
        ? '비밀번호가 일치합니다.'
        : '비밀번호가 일치하지 않습니다.';
      msg2.className = `message ${match ? 'green' : 'red'}`;
    };
    pw1.addEventListener('input', () => {
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
      msg1.textContent = valid
        ? '안전한 비밀번호 형식입니다.'
        : '비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.';
      msg1.className = `message ${valid ? 'blue' : 'red'}`;
      checkMatch();
    });
    pw2.addEventListener('input', checkMatch);
  }

  // --- 이메일 조합 ---
  const emailId   = document.getElementById('email-id');
  const domainTxt = document.getElementById('domain-txt');
  const domainSel = document.getElementById('domain-list');
  const emailFull = document.getElementById('email-full');
  function updateEmail() {
    if (domainSel.value === 'type') {
      domainTxt.disabled = false;
      domainTxt.value    = '';
      domainTxt.focus();
    } else {
      domainTxt.disabled = true;
      domainTxt.value    = domainSel.value;
    }
    emailFull.value = `${emailId.value}@${domainTxt.value}`;
  }
  if (emailId && domainTxt && domainSel && emailFull) {
    emailId.addEventListener('input', updateEmail);
    domainSel.addEventListener('change', updateEmail);
    domainTxt.addEventListener('input', updateEmail);
    updateEmail();
  }

  // --- 전화번호 자동 포커스 ---
  [['phone1','phone2','phone3','MyNum']].forEach(([p1,p2,p3,out]) => {
    const a = [document.getElementById(p1),
               document.getElementById(p2),
               document.getElementById(p3)];
    const outEl = document.getElementById(out);
    if (a.every(x=>x) && outEl) {
      a.forEach((el,i,arr)=>{
        el.addEventListener('input', ()=>{
          el.value = el.value.replace(/\D/g,'');
          if (el.value.length===el.maxLength){
            if (i<2) arr[i+1].focus();
            else {
              const val = `${a[0].value}-${a[1].value}-${a[2].value}`;
              outEl.textContent = val;
              document.getElementById('tel').value = val;
            }
          }
        });
      });
    }
  });

  // --- 다크모드 토글 ---
  const toggleBtn = document.getElementById('toggleMode');
  if (toggleBtn) {
    if (localStorage.getItem('theme')==='dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️';
    }
    toggleBtn.addEventListener('click', ()=>{
      const dark = document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = dark ? '☀️' : '🌙';
      localStorage.setItem('theme', dark?'dark':'light');
    });
  }

  // --- 약관 모달 ---
  const openTerms  = document.getElementById('openTerms');
  const termsModal = document.getElementById('termsModal');
  const closeTerms = document.getElementById('closeTerms');
  const agreeBtn   = document.getElementById('agreeBtn');
  const cancelBtn  = document.getElementById('cancelBtn');
  const agreeAll   = document.getElementById('agreeAll');
  const consentMsg = document.getElementById('consent-msg');
  const form       = document.getElementById('signForm');

  if (openTerms && termsModal) {
    openTerms.addEventListener('click', e => {
      e.preventDefault();
      termsModal.style.display = 'flex';
    });
  }
  if (closeTerms)  closeTerms.addEventListener('click', ()=> termsModal.style.display='none');
  if (cancelBtn)  cancelBtn.addEventListener('click', ()=> termsModal.style.display='none');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', ()=>{
      agreeAll.checked = true;
      consentMsg.style.display = 'none';
      termsModal.style.display = 'none';
    });
  }
  if (termsModal) {
    termsModal.addEventListener('click', e => {
      if (e.target===termsModal) termsModal.style.display='none';
    });
  }
  if (form) {
    form.addEventListener('submit', e => {
      if (!agreeAll.checked) {
        e.preventDefault();
        consentMsg.style.display = 'block';
      }
    });
  }
}

// 3. 생년월일 오늘까지 제한
function restrictBirthToToday() {
  const b = document.getElementById('birth');
  if (b) {
    const d = new Date(), y=d.getFullYear(),
          m=String(d.getMonth()+1).padStart(2,'0'),
          dd=String(d.getDate()).padStart(2,'0');
    b.max = `${y}-${m}-${dd}`;
  }
}

// 4. 가입 제출 & 축하 모달
function bindSubmit() {
  const formEl      = document.getElementById('signForm');
  const welcomeModal= document.getElementById('welcomeModal');
  const welcomeMsg  = document.getElementById('welcomeMessage');
  const welcomeOk   = document.getElementById('welcomeOk');

  if (!formEl||!welcomeModal||!welcomeMsg||!welcomeOk) return;

  formEl.addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('username').value.trim();
    const p1= document.getElementById('pw1').value;
    const p2= document.getElementById('pw2').value;
    const bd= document.getElementById('birth').value;
    const validId = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9A-Za-z]{4,10}$/.test(u);
    const validPw = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(p1);
    const match   = p1===p2;
    const today   = new Date().toISOString().split('T')[0];
    const validBd = bd<=today;
    if (!validId) return alert('아이디 조건을 확인해주세요.');
    if (!validPw) return alert('비밀번호 형식을 확인해주세요.');
    if (!match)   return alert('비밀번호가 일치하지 않습니다.');
    if (!validBd) return alert('생년월일을 잘못 입력하셨습니다.');

    const fd = new FormData(formEl);
    fetch(formEl.action, { method:formEl.method, body:fd })
      .then(r=>r.json())
      .then(res => {
        if (res.success) {
          const typ = document.querySelector('input[name="div"]:checked')?.value;
          const name= document.getElementById('name').value.trim();
          welcomeMsg.textContent = typ==='parent'
            ? `${name}님, 부모님 회원가입을 환영합니다!`
            : `${name}님, 자녀 회원가입을 축하합니다!`;
          welcomeModal.style.display = 'flex';
        } else {
          alert('회원가입 실패: '+res.msg);
        }
      })
      .catch(()=>alert('서버 오류입니다.'));
  });

  welcomeOk.addEventListener('click', ()=>{
    location.href = `${window.path}/Login.do`;
  });
}

// 5. 초기화
document.addEventListener('DOMContentLoaded', ()=>{
  window.execDaumPostcode = execDaumPostcode;
  const btn = document.getElementById('btnPostcode');
  if (btn) btn.addEventListener('click', execDaumPostcode);
  initSignInFeatures(window.path);
  restrictBirthToToday();
  bindSubmit();
});


