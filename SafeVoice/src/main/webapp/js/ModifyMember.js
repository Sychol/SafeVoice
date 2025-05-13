document.addEventListener('DOMContentLoaded', () => {
  const emailId = document.getElementById('email-id');
  const domainSel = document.getElementById('domain-list');
  const domainTxt = document.getElementById('domain-txt');
  const emailFull = document.getElementById('email-full');

  function updateEmail() {
    if (domainSel.value === 'type') {
      domainTxt.disabled = false;
      domainTxt.style.display = 'block';
      domainTxt.value = '';
      domainTxt.focus();
    } else {
      domainTxt.disabled = true;
      domainTxt.style.display = 'none';
      domainTxt.value = domainSel.value;
    }
    emailFull.value = `${emailId.value}@${domainTxt.value}`;
  }

  if (domainSel) domainSel.addEventListener('change', updateEmail);
  if (emailId) emailId.addEventListener('input', updateEmail);
  if (domainTxt) domainTxt.addEventListener('input', updateEmail);

  updateEmail();

  const pw1 = document.getElementById('pw1');
  const pw2 = document.getElementById('pw2');
  const msg1 = document.getElementById('pw1-msg');
  const msg2 = document.getElementById('pw2-msg');

  if (pw1 && pw2 && msg1 && msg2) {
    pw1.addEventListener('input', () => {
      const isValid = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/.test(pw1.value);
      msg1.textContent = isValid ? '안전한 비밀번호 형식입니다.' : '비밀번호는 영문+숫자 포함 최소 8자 이상이어야 합니다.';
      msg1.className = `message ${isValid ? 'blue' : 'red'}`;
    });

    pw2.addEventListener('input', () => {
      const match = pw1.value === pw2.value;
      msg2.textContent = match ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.';
      msg2.className = `message ${match ? 'green' : 'red'}`;
    });
  }

  const btnPost = document.getElementById("btnPostcode");
  const layerBg = document.getElementById("postcodeLayer");
  const layerWrp = document.getElementById("postcodeContainer");
  const btnClose = document.getElementById("closePostcodeLayer");

  function execDaumPostcode() {
    layerBg.style.display = 'flex';
    const old = layerWrp.querySelector(".wrap");
    if (old) old.remove();

    new daum.Postcode({
      oncomplete(data) {
        let addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        let extra = '';
        if (data.userSelectedType === 'R') {
          if (data.bname && /[\uB3D9|\uB85C|\uAC00]$/.test(data.bname)) extra += data.bname;
          if (data.buildingName && data.apartment === 'Y') {
            extra += extra ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extra) addr += ` ${extra}`;
        }
        document.getElementById("postcode").value = data.zonecode;
        document.getElementById("address").value = addr;
        document.getElementById("detailAddress").focus();
        layerBg.style.display = 'none';
      },
      width: '100%',
      height: '100%'
    }).embed(layerWrp);
  }

  if (btnPost)  btnPost.addEventListener('click', execDaumPostcode);
  if (btnClose) btnClose.addEventListener('click', () => {
    layerBg.style.display = 'none';
  });
});
