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

document.addEventListener('DOMContentLoaded', () => {
  // 섹션 토글
  const radios     = document.querySelectorAll('input[name="memberType"]');
  const parentRows = document.querySelectorAll('.parent-info');
  const childRows  = document.querySelectorAll('.child-info');

  function toggleSections() {
    const isChild = document.querySelector('input[name="memberType"][value="child"]').checked;
    parentRows.forEach(r => r.style.display = isChild ? 'table-row' : 'none');
    childRows.forEach(r  => r.style.display = isChild ? 'none'       : 'table-row');
  }

  toggleSections();
  radios.forEach(r => r.addEventListener('change', toggleSections));

  // 자녀 추가
  const addBtn = document.getElementById('addChildBtn');
  const list   = document.getElementById('myChildrenList');
  const form   = document.getElementById('modifyForm');

  addBtn.addEventListener('click', () => {
    const name   = document.getElementById('childNameInput').value.trim();
    const gender = document.querySelector('input[name="childGenderInput"]:checked').value;
    const birth  = document.getElementById('childBirthDateInput').value;
    const phone  = document.getElementById('childPhoneInput').value.trim();

    if (!name || !birth || !phone) {
      alert('모든 자녀 정보를 입력해 주세요.');
      return;
    }

    const idx = list.querySelectorAll('.child-item').length;
    // hidden inputs
    [
      { name: `children[${idx}].name`,      value: name   },
      { name: `children[${idx}].gender`,    value: gender },
      { name: `children[${idx}].birthDate`, value: birth  },
      { name: `children[${idx}].phone`,     value: phone  }
    ].forEach(f => {
      const inp = document.createElement('input');
      inp.type  = 'hidden';
      inp.name  = f.name;
      inp.value = f.value;
      form.appendChild(inp);
    });

    const item = document.createElement('div');
    item.className = 'child-item';
    item.innerHTML = `${name} (${gender==='M'?'남':'여'}), ${birth}, ${phone}`;
    list.appendChild(item);

    // clear inputs
    document.getElementById('childNameInput').value = '';
    document.querySelector('input[name="childGenderInput"][value="M"]').checked = true;
    document.getElementById('childBirthDateInput').value = '';
    document.getElementById('childPhoneInput').value = '';
  });
});
