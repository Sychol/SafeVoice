// SignIn.js
// 전역으로 정의된 path 변수를 사용하여 API 호출 경로 설정

// 1. 카카오 주소(다음 우편번호) API 기능: 우편번호 찾기 팝업을 띄우고, 선택된 주소를 폼에 자동 입력
export function execDaumPostcode() {
    new daum.Postcode({
        // 우편번호 API 창에서 주소 선택 완료 시 호출되는 콜백
        oncomplete: function(data) {
            let addr = '';
            let extraAddr = '';

            // 도로명 주소(R)가 선택된 경우 추가 정보(동, 로, 가, 건물명 등)를 처리
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress; // 메인 도로명 주소
                if (data.bname && /[동|로|가]$/.test(data.bname)) extraAddr += data.bname; // 법정동
                if (data.buildingName && data.apartment === 'Y') {
                    // 아파트명
                    extraAddr += extraAddr ? `, ${data.buildingName}` : data.buildingName;
                }
                if (extraAddr) extraAddr = ` (${extraAddr})`; // 괄호로 묶기
                document.getElementById('extraAddress').value = extraAddr;
            } else {
                // 지번 주소(J) 선택 시
                addr = data.jibunAddress;
                document.getElementById('extraAddress').value = '';
            }

            // 우편번호, 주소, 상세주소 입력필드에 값 설정
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value  = addr;
            document.getElementById('detailAddress').focus(); // 상세주소 필드로 포커스 이동
        }
    }).open(); // 팝업 열기
}

// 2. 회원가입 폼 기능 초기화: 아이디 검증, 중복확인, 생년월일 select 옵션 생성, 이메일 도메인 선택, 전화번호 자동 포커스, 다크 모드 토글
export function initSignInFeatures(path) {
    // 2-1. 아이디 유효성 검사 및 중복 확인
    const usernameInput = document.getElementById('username'); // 아이디 입력 요소
    const usernameMsg   = document.getElementById('username-msg'); // 상태 메시지 요소
    const checkBtn      = document.getElementById('check-username'); // 중복 확인 버튼
    let isValidUsername = false; // 형식 검증 통과 여부

    if (usernameInput && usernameMsg && checkBtn) {
        // 입력할 때마다 실시간 형식 검증 수행
        usernameInput.addEventListener('input', function () {
            const str = this.value.trim();
			// 최소 숫자 1자, 알파벳 1자 포함, 총 4~10자
			const valid = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/.test(str);
            usernameMsg.textContent = valid
                ? '형식이 올바릅니다. 중복 확인을 해주세요.'
                : '아이디는 영문+숫자 조합, 4~10자로 입력하세요.';
            usernameMsg.className = `message ${valid ? 'blue' : 'red'}`;
            isValidUsername = valid;
        });

        // 중복 확인 버튼 클릭 시 서버에 AJAX 요청
        checkBtn.addEventListener('click', function () {
            const str = usernameInput.value.trim();
            if (!isValidUsername) {
                usernameMsg.textContent = '형식을 먼저 올바르게 입력하세요.';
                usernameMsg.className = 'message red';
                return;
            }
            // fetch API로 중복 체크
            fetch(`${path}/users/duplicated/0?str=${encodeURIComponent(str)}`)
                .then(res => res.json())
                .then(data => {
                    usernameMsg.textContent = data.success
                        ? '사용 가능한 아이디입니다.'
                        : data.msg;
                    usernameMsg.className = `message ${data.success ? 'green' : 'red'}`;
                })
                .catch(() => {
                    usernameMsg.textContent = '서버 오류가 발생했습니다.';
                    usernameMsg.className = 'message red';
                });
        });
    }

    // 2-2. 생년월일(년/월/일) select 옵션 생성 및 일수 조정
    const yearEl  = document.getElementById('birth-year');
    const monthEl = document.getElementById('birth-month');
    const dayEl   = document.getElementById('birth-day');
    let yearDone = false, monthDone = false;

    // 윤년 계산 함수
    function isLeap(y) {
        return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    }

    // 월이 변경되거나 년 변경 시 일 옵션 재생성
    function fillDays() {
        const y = parseInt(yearEl.value, 10) || new Date().getFullYear();
        const m = parseInt(monthEl.value, 10);
        if (!m) return;
        const counts = [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        dayEl.innerHTML = '<option value="">일</option>';
        for (let d = 1; d <= counts[m - 1]; d++) {
            dayEl.add(new Option(d, d));
        }
    }

    // 년(select) 포커스 시 옵션 한번만 생성
    if (yearEl) {
        yearEl.addEventListener('focus', () => {
            if (!yearDone) {
                yearDone = true;
                const current = new Date().getFullYear();
                for (let y = 1940; y <= current; y++) yearEl.add(new Option(y, y));
            }
        });
        yearEl.addEventListener('change', fillDays);
    }
    // 월(select) 포커스 시 옵션 한번만 생성
    if (monthEl) {
        monthEl.addEventListener('focus', () => {
            if (!monthDone) {
                monthDone = true;
                for (let m = 1; m <= 12; m++) monthEl.add(new Option(m, m));
            }
        });
        monthEl.addEventListener('change', fillDays);
    }

    // 2-3. 이메일 도메인 선택: 선택값에 따라 직접 입력 활성화/비활성화
    const domainList = document.getElementById('domain-list');
    const domainTxt  = document.getElementById('domain-txt');
    if (domainList && domainTxt) {
        domainList.addEventListener('change', e => {
            const val = e.target.value;
            domainTxt.value = val !== 'type' ? val : '';
            domainTxt.disabled = val !== 'type';
            if (val === 'type') domainTxt.focus();
        });
    }

    // 2-4. 전화번호 입력: 자동 포커스 이동 및 숫자만 허용
    [['phone1','phone2','phone3','MyNum'], ['phone4','phone5','phone6','FamilyNum']]
        .forEach(ids => {
            const elems = ids.map(id => document.getElementById(id));
            const [p1, p2, p3, output] = elems;
            if (p1 && p2 && p3) {
                [p1, p2, p3].forEach((el, idx, arr) => {
                    el.addEventListener('input', () => {
                        el.value = el.value.replace(/\D/g, ''); // 숫자 외 문자 제거
                        if (el.value.length === el.maxLength) {
                            if (idx < 2) arr[idx + 1].focus(); // 다음 필드로 포커스 이동
                            else if (output) output.textContent = `입력한 전화번호: ${p1.value}-${p2.value}-${p3.value}`;
                        }
                    });
                });
            }
        });

    // 2-5. 다크 모드 토글: 로컬스토리지에 상태 저장
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
}
