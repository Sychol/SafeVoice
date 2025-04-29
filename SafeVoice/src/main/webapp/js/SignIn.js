
// 전역으로 정의된 path 변수를 받아 사용
// Kakao 주소 API 함수 (독립 모듈)
export function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            let addr = '';
            let extraAddr = '';

            // 도로명 주소 선택 시 추가 정보 처리
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
                if (data.bname && /[동|로|가]$/.test(data.bname)) extraAddr += data.bname;
                if (data.buildingName && data.apartment === 'Y') {
                    extraAddr += extraAddr ? `, ${data.buildingName}` : data.buildingName;
                }
                if (extraAddr) extraAddr = ` (${extraAddr})`;
                document.getElementById('extraAddress').value = extraAddr;
            } else {
                // 지번 주소 선택 시
                addr = data.jibunAddress;
                document.getElementById('extraAddress').value = '';
            }

            // 우편번호 및 주소 할당
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value  = addr;
            document.getElementById('detailAddress').focus();
        }
    }).open();
}

// 모든 기능 초기화 함수
export function initSignInFeatures(path) {
    // 1. 아이디 유효성 검사 및 중복 확인
    const usernameInput = document.getElementById('username');
    const usernameMsg   = document.getElementById('username-msg');
    const checkBtn      = document.getElementById('check-username');
    let isValidUsername = false;

    if (usernameInput && usernameMsg && checkBtn) {
        usernameInput.addEventListener('input', function () {
            const str = this.value.trim();
            const valid = /^[0-9a-zA-Z]{4,10}$/.test(str);
            usernameMsg.textContent = valid
                ? '형식이 올바릅니다. 중복 확인을 해주세요.'
                : '아이디는 영문+숫자 조합, 4~10자로 입력하세요.';
            usernameMsg.className = `message ${valid ? 'blue' : 'red'}`;
            isValidUsername = valid;
        });

        checkBtn.addEventListener('click', function () {
            const str = usernameInput.value.trim();
            if (!isValidUsername) {
                usernameMsg.textContent = '형식을 먼저 올바르게 입력하세요.';
                usernameMsg.className = 'message red';
                return;
            }
            $.ajax({
                url: `${path}/users/duplicated/0?str=${encodeURIComponent(str)}`,
                type: 'GET', cache: false,
                success(data) {
                    usernameMsg.textContent = data.success
                        ? '사용 가능한 아이디입니다.'
                        : data.msg;
                    usernameMsg.className = `message ${data.success ? 'green' : 'red'}`;
                },
                error() {
                    usernameMsg.textContent = '서버 오류가 발생했습니다.';
                    usernameMsg.className = 'message red';
                }
            });
        });
    }

    // 2. 생년월일(년도, 월, 일) 옵션 생성 및 일 수 조정
    const yearEl  = document.getElementById('birth-year');
    const monthEl = document.getElementById('birth-month');
    const dayEl   = document.getElementById('birth-day');
    let yearDone = false, monthDone = false;

    function isLeap(y) {
        return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    }

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
    if (monthEl) {
        monthEl.addEventListener('focus', () => {
            if (!monthDone) {
                monthDone = true;
                for (let m = 1; m <= 12; m++) monthEl.add(new Option(m, m));
            }
        });
        monthEl.addEventListener('change', fillDays);
    }

    // 3. 이메일 도메인 선택
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

    // 4. 전화번호 자동 포커스 및 숫자만 허용
    [['phone1','phone2','phone3','MyNum'], ['phone4','phone5','phone6','FamilyNum']]
        .forEach(ids => {
            const elems = ids.map(id => document.getElementById(id));
            const [p1, p2, p3, output] = elems;
            if (p1 && p2 && p3) {
                [p1, p2, p3].forEach((el, idx, arr) => {
                    el.addEventListener('input', () => {
                        el.value = el.value.replace(/\D/g, '');
                        if (el.value.length === el.maxLength) {
                            if (idx < 2) arr[idx + 1].focus();
                            else if (output)
                                output.textContent = `입력한 전화번호: ${p1.value}-${p2.value}-${p3.value}`;
                        }
                    });
                });
            }
        });

    // 5. 다크 모드 토글
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

// 문서 준비 후 자동 초기화
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initSignInFeatures(window.path || '');
    });
}
