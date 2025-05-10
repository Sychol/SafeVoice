// SignIn.js
'use strict';

document.addEventListener('DOMContentLoaded', ()=> {
  const path = window.path;  // JSP 에서 정의한 contextPath

  /*** 1) 카카오 우편번호 팝업 ***/
  const btnPost = document.getElementById('btnPostcode');
  const layerBg = document.getElementById('postcodeLayer');
  const layerWrp= document.getElementById('postcodeContainer');
  const btnClose= document.getElementById('closePostcodeLayer');

  function execDaumPostcode(){
    layerBg.style.display = 'flex';
    // 이전 embed 내용 제거
    const old = layerWrp.querySelector('.wrap');
    if(old) old.remove();

    new daum.Postcode({
      oncomplete(data){
        let addr = data.userSelectedType==='R'
          ? data.roadAddress
          : data.jibunAddress;
        let extra = '';
        if(data.userSelectedType==='R'){
          if(data.bname && /[동|로|가]$/.test(data.bname)) extra += data.bname;
          if(data.buildingName && data.apartment==='Y'){
            extra += extra? `, ${data.buildingName}`: data.buildingName;
          }
          if(extra) addr += ` ${extra}`;
        }
        document.getElementById('postcode').value     = data.zonecode;
        document.getElementById('address').value      = addr;
        document.getElementById('detailAddress').focus();
        layerBg.style.display = 'none';
      },
      width: '100%', height:'100%'
    }).embed(layerWrp);
  }

  if(btnPost) btnPost.addEventListener('click', execDaumPostcode);
  if(btnClose) btnClose.addEventListener('click', ()=> {
    layerBg.style.display = 'none';
  });

  /*** 2) 입력 요소 초기화 함수 ***/
  function initSignInFeatures(){
    // 2-1) 자동 ID 중복검사
    const usernameInput = document.getElementById('username');
    const usernameMsg   = document.getElementById('username-msg');
    const checkBtn      = document.getElementById('check-username');
    let debounceTimer;

    async function checkDuplicate(username){
      const res = await fetch(
        `${path}/users/duplicated/0?str=${encodeURIComponent(username)}`,
        { cache:'no-store' }
      );
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.success;
    }

    if(usernameInput && usernameMsg){
      usernameInput.addEventListener('input', ()=>{
        const v = usernameInput.value.trim();
        const valid = /^[0-9A-Za-z]{4,10}$/.test(v);

        clearTimeout(debounceTimer);
        if(!valid){
          usernameMsg.textContent = '아이디는 영문+숫자 조합, 4~10자이어야 합니다.';
          usernameMsg.className   = 'message red';
          return;
        }
        usernameMsg.textContent = '형식이 올바릅니다. 중복 확인 중…';
        usernameMsg.className   = 'message';

        debounceTimer = setTimeout(async ()=>{
          try{
            const ok = await checkDuplicate(v);
            usernameMsg.textContent = ok
              ? '사용 가능한 아이디입니다.'
              : '이미 사용 중인 아이디입니다.';
            usernameMsg.className   = `message ${ok?'green':'red'}`;
          }catch{
            usernameMsg.textContent = '서버 오류가 발생했습니다.';
            usernameMsg.className   = 'message red';
          }
        }, 500);
      });
    }

    if(checkBtn && usernameInput){
      checkBtn.addEventListener('click', ()=>{
        usernameInput.dispatchEvent(new Event('input'));
      });
    }

    // 2-2) 비밀번호 검사
    const pw1 = document.getElementById('pw1');
    const pw2 = document.getElementById('pw2');
    const msg1= document.getElementById('pw1-msg');
    const msg2= document.getElementById('pw2-msg');
    if(pw1 && pw2 && msg1 && msg2){
      const checkMatch = ()=>{
        if(!pw2.value){
          msg2.textContent = '';
          msg2.className = 'message';
          return;
        }
        const m = pw1.value===pw2.value;
        msg2.textContent = m?'비밀번호가 일치합니다.':'비밀번호가 일치하지 않습니다.';
        msg2.className   = `message ${m?'green':'red'}`;
      };
      pw1.addEventListener('input', ()=>{
        const ok = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
        msg1.textContent = ok
          ? '안전한 비밀번호 형식입니다.'
          : '비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.';
        msg1.className   = `message ${ok?'blue':'red'}`;
        checkMatch();
      });
      pw2.addEventListener('input', checkMatch);
    }

    // 2-3) 이메일 결합
    const emailId  = document.getElementById('email-id');
    const domainTxt= document.getElementById('domain-txt');
    const domainSel= document.getElementById('domain-list');
    const emailFull= document.getElementById('email-full');
    function updateEmail(){
      if(domainSel.value==='type'){
        domainTxt.disabled=false; domainTxt.value=''; domainTxt.focus();
      } else {
        domainTxt.disabled=true; domainTxt.value=domainSel.value;
      }
      emailFull.value = `${emailId.value}@${domainTxt.value}`;
    }
    if(emailId && domainTxt && domainSel && emailFull){
      emailId.addEventListener('input', updateEmail);
      domainSel.addEventListener('change', updateEmail);
      domainTxt.addEventListener('input', updateEmail);
      updateEmail();
    }

    // 2-4) 전화번호 자동포커스
    [['phone1','phone2','phone3','MyNum']].forEach(([p1,p2,p3,out])=>{
      const els = [p1,p2,p3].map(id=>document.getElementById(id));
      const outEl = document.getElementById(out);
      if(els.every(x=>x)&&outEl){
        els.forEach((el,i,arr)=>{
          el.addEventListener('input',()=>{
            el.value=el.value.replace(/\D/g,'');
            if(el.value.length===el.maxLength){
              if(i<2) arr[i+1].focus();
              else {
                const val=`${els[0].value}-${els[1].value}-${els[2].value}`;
                outEl.textContent=val;
                document.getElementById('tel').value=val;
              }
            }
          });
        });
      }
    });

    // 2-5) 다크모드 토글
    const toggleBtn = document.getElementById('toggleMode');
    if(toggleBtn){
      if(localStorage.getItem('theme')==='dark'){
        document.body.classList.add('dark-mode');
        toggleBtn.textContent='☀️';
      }
      toggleBtn.addEventListener('click', ()=>{
        const dark = document.body.classList.toggle('dark-mode');
        toggleBtn.textContent= dark?'☀️':'🌙';
        localStorage.setItem('theme', dark?'dark':'light');
      });
    }

    // 2-6) 약관 모달
    const openTerms  = document.getElementById('openTerms');
    const termsModal = document.getElementById('termsModal');
    const closeTerms = document.getElementById('closeTerms');
    const agreeBtn   = document.getElementById('agreeBtn');
    const cancelBtn  = document.getElementById('cancelBtn');
    const agreeAll   = document.getElementById('agreeAll');
    const consentMsg = document.getElementById('consent-msg');
    const form       = document.getElementById('signForm');

    if(openTerms && termsModal){
      openTerms.addEventListener('click', e=>{
        e.preventDefault();
        termsModal.style.display='flex';
      });
    }
    if(closeTerms) closeTerms.addEventListener('click', ()=>termsModal.style.display='none');
    if(cancelBtn) cancelBtn.addEventListener('click', ()=>termsModal.style.display='none');
    if(agreeBtn){
      agreeBtn.addEventListener('click', ()=>{
        agreeAll.checked=true;
        consentMsg.style.display='none';
        termsModal.style.display='none';
      });
    }
    if(termsModal){
      termsModal.addEventListener('click', e=>{
        if(e.target===termsModal) termsModal.style.display='none';
      });
    }
    if(form){
      form.addEventListener('submit', e=>{
        if(!agreeAll.checked){
          e.preventDefault();
          consentMsg.style.display='block';
        }
      });
    }
  }

  /*** 3) 생년월일 오늘까지 제한 ***/
  function restrictBirthToToday(){
    const b = document.getElementById('birth');
    if(!b) return;
    const d = new Date(), y=d.getFullYear(),
          m=String(d.getMonth()+1).padStart(2,'0'),
          dd=String(d.getDate()).padStart(2,'0');
    b.max=`${y}-${m}-${dd}`;
  }

  /*** 4) 가입 제출 & 환영 모달 ***/
  function bindSubmit(){
    const formEl      = document.getElementById('signForm');
    const welcomeModal= document.getElementById('welcomeModal');
    const welcomeMsg  = document.getElementById('welcomeMessage');
    const welcomeOk   = document.getElementById('welcomeOk');
    if(!formEl||!welcomeModal||!welcomeMsg||!welcomeOk) return;

    formEl.addEventListener('submit', e=>{
      e.preventDefault();
      // 간단 유효성 (HTML5 + JS)
      const u  = document.getElementById('username').value.trim();
      const p1 = document.getElementById('pw1').value;
      const p2 = document.getElementById('pw2').value;
      const bd = document.getElementById('birth').value;
      if(!/^[0-9A-Za-z]{4,10}$/.test(u))
        return alert('아이디 조건을 확인해주세요.');
      if(!/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(p1))
        return alert('비밀번호 형식을 확인해주세요.');
      if(p1!==p2) return alert('비밀번호가 일치하지 않습니다.');
      if(bd>new Date().toISOString().split('T')[0])
        return alert('생년월일을 잘못 입력하셨습니다.');

      const fd = new FormData(formEl);
      fetch(formEl.action, { method: formEl.method, body: fd })
        .then(r=>r.json())
        .then(res=>{
          if(res.success){
            const typ = document.querySelector('input[name="div"]:checked')?.value;
            const nm  = document.getElementById('name').value.trim();
            welcomeMsg.textContent = typ==='parent'
              ? `${nm}님, 부모님 회원가입을 환영합니다!`
              : `${nm}님, 자녀 회원가입을 축하합니다!`;
            welcomeModal.style.display='flex';
          } else {
            alert('회원가입 실패: '+res.msg);
          }
        })
        .catch(()=>{
          alert('서버 오류가 발생했습니다.');
        });
    });

    welcomeOk.addEventListener('click', ()=>{
      location.href = `${path}/Login.do`;
    });
  }

  // **초기화 호출**
  initSignInFeatures();
  restrictBirthToToday();
  bindSubmit();
});