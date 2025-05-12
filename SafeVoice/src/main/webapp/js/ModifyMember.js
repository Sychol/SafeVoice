// 다크 모드 토글
(function() {
  const toggleButton = document.getElementById("toggleMode");
  if (!toggleButton) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleButton.textContent = "☀️";
  }

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
})();

// 우편번호 검색 레이어 제어
(function() {
  const btnPost   = document.getElementById("btnPostcode");
  const layerBg   = document.getElementById("postcodeLayer");
  const layerWrp  = document.getElementById("postcodeContainer");
  const btnClose  = document.getElementById("closePostcodeLayer");
  if (!btnPost || !layerBg || !layerWrp || !btnClose) return;

  function onComplete(data) {
    let addr = data.userSelectedType === "R"
      ? data.roadAddress
      : data.jibunAddress;
    let extra = "";
    if (data.userSelectedType === "R") {
      if (data.bname && /[\uB3D9|\uB85C|\uAC00]$/.test(data.bname)) extra += data.bname;
      if (data.buildingName && data.apartment === "Y") {
        extra += extra ? `, ${data.buildingName}` : data.buildingName;
      }
      if (extra) addr += ` ${extra}`;
    }
    document.getElementById("postcode").value = data.zonecode;
    document.getElementById("address").value  = addr;
    document.getElementById("detailAddress").focus();
    layerBg.classList.remove("show");
  }

  window.execDaumPostcode = function execDaumPostcode() {
    layerBg.classList.add("show");
    setTimeout(() => {
      const oldWrap = layerWrp.querySelector(".wrap");
      if (oldWrap) oldWrap.remove();
      try {
        new daum.Postcode({
          oncomplete: onComplete,
          width: "100%",
          height: "100%"
        }).embed(layerWrp);
      } catch {
        new daum.Postcode({ oncomplete: onComplete }).open();
      }
    }, 0);
  };

  btnPost.addEventListener("click", execDaumPostcode);
  btnClose.addEventListener("click", () => layerBg.classList.remove("show"));
})();

// 페이지 로드 후 각종 기능 바인딩
document.addEventListener("DOMContentLoaded", () => {
  // 회원 구분 섹션 토글
  const radios     = document.querySelectorAll('input[name="memberType"]');
  const parentRows = document.querySelectorAll(".parent-info");
  const childRows  = document.querySelectorAll(".child-info");
  function toggleSections() {
    const isParent = document.querySelector('input[name="memberType"][value="parent"]').checked;
    childRows.forEach(r => r.style.display = isParent ? "table-row" : "none");
    parentRows.forEach(r  => r.style.display = isParent ? "none" : "table-row");
  }
  toggleSections();
  radios.forEach(r => r.addEventListener("change", toggleSections));

  // 자녀 정보 추가
  const addBtn = document.getElementById("addChildBtn");
  const list   = document.getElementById("myChildrenList");
  const form   = document.getElementById("modifyForm");
  if (addBtn && list && form) {
    addBtn.addEventListener("click", () => {
      const nameEl   = document.getElementById("childNameInput");
      const genderEl = document.querySelector('input[name="childGenderInput"]:checked');
      const birthEl  = document.getElementById("childBirthDateInput");
      const phoneEl  = document.getElementById("childPhoneInput");
      const name   = nameEl.value.trim();
      const gender = genderEl.value;
      const birth  = birthEl.value;
      const phone  = phoneEl.value.trim();
      if (!name || !birth || !phone) {
        alert("모든 자녀 정보를 입력해 주세요.");
        return;
      }
      const idx = list.querySelectorAll(".child-item").length;
      [
        { name:`children[${idx}].name`,      value:name   },
        { name:`children[${idx}].gender`,    value:gender },
        { name:`children[${idx}].birthDate`, value:birth  },
        { name:`children[${idx}].phone`,     value:phone  }
      ].forEach(f => {
        const inp = document.createElement("input");
        inp.type  = "hidden";
        inp.name  = f.name;
        inp.value = f.value;
        form.appendChild(inp);
      });
      const item = document.createElement("div");
      item.className   = "child-item";
      item.textContent = `${name} (${gender==="M"?"남":"여"}), ${birth}, ${phone}`;
      list.appendChild(item);
      nameEl.value = "";
      document.querySelector('input[name="childGenderInput"][value="M"]').checked = true;
      birthEl.value = "";
      phoneEl.value = "";
    });
  }

  // 비밀번호 형식 검사 + 일치 확인
  const pw1 = document.getElementById("pw1");
  const pw2 = document.getElementById("pw2");
  const msg1 = document.getElementById("pw1-msg");
  const msg2 = document.getElementById("pw2-msg");

  if (pw1 && pw2 && msg1 && msg2) {
    const checkMatch = () => {
      if (!pw2.value) {
        msg2.textContent = "";
        msg2.className = "message";
        return;
      }
      const match = pw1.value === pw2.value;
      msg2.textContent = match ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.";
      msg2.className = `message ${match ? "green" : "red"}`;
    };

    pw1.addEventListener("focus", () => {
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
      msg1.textContent = valid
        ? "안전한 비밀번호 형식입니다."
        : "비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.";
      msg1.className = `message ${valid ? "blue" : "red"}`;
    });

    pw1.addEventListener("input", () => {
      const valid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
      if (document.activeElement === pw1) {
        msg1.textContent = valid
          ? "안전한 비밀번호 형식입니다."
          : "비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.";
        msg1.className = `message ${valid ? "blue" : "red"}`;
      }
      checkMatch();
    });

    pw1.addEventListener("blur", () => {
      msg1.textContent = "";
      msg1.className = "message";
    });

    pw2.addEventListener("input", checkMatch);
  }

  // 이메일 결합
  const emailId   = document.getElementById("email-id");
  const domainTxt = document.getElementById("domain-txt");
  const domainSel = document.getElementById("domain-list");
  const emailFull = document.getElementById("email-full");

  if (emailId && domainTxt && domainSel && emailFull) {
    function updateEmail() {
      if (domainSel.value.trim() === "type") {
        if (domainTxt.disabled) {
          domainTxt.value = "";
        }
        domainTxt.removeAttribute("disabled");
        domainTxt.disabled = false;
        domainTxt.focus();
      } else {
        domainTxt.setAttribute("disabled", "disabled");
        domainTxt.disabled = true;
        domainTxt.value = domainSel.value.trim();
      }
      emailFull.value = `${emailId.value}@${domainTxt.value}`;
    }

    domainSel.addEventListener("change", updateEmail);
    emailId.addEventListener("input", updateEmail);
    domainTxt.addEventListener("input", updateEmail);
    updateEmail();
  }

  // 전화번호 자동 포커스 + 결합
  [["phone1","phone2","phone3","MyNum"]].forEach(([p1,p2,p3,out]) => {
    const els = [p1,p2,p3].map(id => document.getElementById(id));
    const outEl = document.getElementById(out);
    if (els.every(x => x) && outEl) {
      els.forEach((el,i,arr) => {
        el.addEventListener("input", () => {
          el.value = el.value.replace(/\D/g,"");
          if (el.value.length === el.maxLength) {
            if (i < 2) arr[i+1].focus();
            else {
              const val = `${els[0].value}-${els[1].value}-${els[2].value}`;
              outEl.textContent = val;
              document.getElementById("tel").value = val;
            }
          }
        });
      });
    }
  });
});

