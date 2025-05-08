// 1) 스크립트 태그에서 서비스 키와 contextPath 한 번에 꺼내기
const _script = document.currentScript
              || Array.from(document.getElementsByTagName('script'))
                      .find(s => /ChildLocation\.js$/.test(s.src));

const contextPath = (_script.src.match(/^(?:https?:\/\/[^\/]+)?(\/[^\/]+)\/js\/ChildLocation\.js$/) || [])[1] || '';
const rawKey      = _script.dataset.serviceKey;  // 여기서 안전하게 가져와요!


// 2) 지도 초기화
kakao.maps.load(async function() {
  // 2-1) map 생성
  const map = new kakao.maps.Map(
    document.getElementById('map'),
    { center: new kakao.maps.LatLng(35.110841, 126.877338), level: 4 }
  );

  // 2-2) Geocoder 인스턴스 생성
  const geocoder = new kakao.maps.services.Geocoder();

  // 3) DOM 요소 참조
  const btnChild   = document.getElementById('btnChild');
  const btnInst    = document.getElementById('btnInst');
  const locateBtn  = document.getElementById('locateBtn');
  const skyToggle  = document.getElementById('skyToggle');

  // 4) 상태 변수 선언
  let instData       = [];
  let instMarkers    = [];
  let currentMarker  = null;
  let searchMarker   = null;
  let mode           = 'child';
  let isSkyView      = false;
 
 
  // 5) 기관 데이터 로드 URL (HTTPS 보장)
  const instUrl =
    `https://api.example.com/getTeenDscsnSrcnList?` +
    `serviceKey=${encodeURIComponent(rawKey)}` +
    `&pageNo=1&numOfRows=100&format=json`;

  // 6) 기관 데이터 비동기로 불러오기 (에러 로깅 포함)
  async function loadInstitutions() {
    try {
      const res = await fetch(instUrl);
      if (!res.ok) {
        console.error('기관 데이터 HTTP 오류:', res.status);
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      const items = (((json.response || {}).body || {}).items || {}).item || [];
      instData = items.map(item => ({
        position: new kakao.maps.LatLng(
          parseFloat(item.lat), parseFloat(item.lot)
        ),
        name:    item.centerNm   || '이름 없음',
        address: item.roadNmAddr || item.lotnoAddr || '주소 없음'
      }));
    } catch (err) {
      console.error('기관 로드 실패:', err);
      alert('기관 정보를 불러오는 동안 오류가 발생했습니다. 콘솔을 확인해주세요.');
    }
  }

  // 7) 기관 마커 표시 (반경 6km 이내)
  function showInstMarkers(center) {
    instMarkers.forEach(m => m.setMap(null));
    instMarkers = [];
    const radius = 6000;

    instData.forEach(d => {
      const dist = kakao.maps.geometry.spherical.computeDistanceBetween(center, d.position);
      if (dist <= radius) {
        const marker = new kakao.maps.Marker({ map, position: d.position });

        // 사용자/백엔드 데이터를 삽입할 때 XSS 방지
        const cleanName    = DOMPurify.sanitize(d.name);
        const cleanAddress = DOMPurify.sanitize(d.address);
        const infoContent  = `<div style="padding:5px;">
                                 <strong>${cleanName}</strong><br/>${cleanAddress}
                               </div>`;

        const info = new kakao.maps.InfoWindow({ content: infoContent });
        marker.addListener('mouseover', () => info.open(map, marker));
        marker.addListener('mouseout', ()  => info.close());
        instMarkers.push(marker);
      }
    });
  }

  // 8) 아이 위치 표시 (커스텀 마커)
  function showChildLocation() {
    const loc = new kakao.maps.LatLng(35.151048, 126.916022);
    if (currentMarker) currentMarker.setMap(null);
    const img = new kakao.maps.MarkerImage(
      contextPath + '/image/marker.png',
      new kakao.maps.Size(36,36),
      { offset: new kakao.maps.Point(18,36) }
    );
    currentMarker = new kakao.maps.Marker({ map, position: loc, image: img });
    map.setCenter(loc);
  }

  // 9) 주소 검색 (입력값 검증 및 XSS 방지)
  function searchAddress() {
    const raw = document.querySelector('.search-bar input').value.trim();
    if (!raw) return alert('주소를 입력해 주세요.');
    const addr = DOMPurify.sanitize(raw);
    geocoder.addressSearch(addr, (res, status) => {
      if (status === kakao.maps.services.Status.OK) {
        if (searchMarker) searchMarker.setMap(null);
        const loc = new kakao.maps.LatLng(res[0].y, res[0].x);
        searchMarker = new kakao.maps.Marker({ map, position: loc });
        map.setCenter(loc);
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
  }

  // 10) 버튼 이벤트 바인딩
  btnChild.addEventListener('click', () => {
    mode = 'child';
    btnChild.classList.add('active');
    btnInst.classList.remove('active');
  });

  btnInst.addEventListener('click', () => {
    mode = 'inst';
    btnInst.classList.add('active');
    btnChild.classList.remove('active');
    loadInstitutions();
  });

  document.querySelector('.search-icon')
          .addEventListener('click', searchAddress);
  document.querySelector('.search-bar input')
          .addEventListener('keypress', e => e.key === 'Enter' && searchAddress());

  // 11) 위치 확인 버튼 (geolocation 옵션 추가)
  locateBtn.addEventListener('click', () => {
    if (mode === 'child') {
      showChildLocation();
    } else {
      if (!navigator.geolocation) {
        return alert('위치 정보 지원 안 함');
      }
      navigator.geolocation.getCurrentPosition(
        pos => {
          const userLoc = new kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          map.setCenter(userLoc);

          if (instData.length === 0) loadInstitutions();
          showInstMarkers(userLoc);
        },
        err => {
          console.error('Geolocation 오류:', err);
          alert('현재 위치를 가져오는 데 실패했습니다. 위치 권한을 확인해주세요.');
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  });

  // 12) 스카이뷰 토글
  skyToggle.addEventListener('click', () => {
    isSkyView = !isSkyView;
    map.setMapTypeId(
      isSkyView ? kakao.maps.MapTypeId.HYBRID : kakao.maps.MapTypeId.ROADMAP
    );
    skyToggle.classList.toggle('on');
  });
});

// 알림 버튼, 팝업, 리스트, 닫기 버튼 참조
const alertBtn  = document.getElementById('alertBtn');
const popup     = document.getElementById('notificationPopup');
const list      = document.getElementById('notificationList');
const closeBtn  = document.getElementById('closePopupBtn');


// 13) 알림 확인 버튼 클릭 시
alertBtn.addEventListener('click', () => {
  fetch(`${contextPath}/api/notifications`)
    .then(res => {
      if (!res.ok) throw new Error('네트워크 응답 오류');
      return res.json();
    })
    .then(data => {
      // 기존 리스트 초기화
      list.innerHTML = '';
      if (data.length === 0) {
        const li = document.createElement('li');
        li.textContent = '새로운 알림이 없어요~';
        list.appendChild(li);
      } else {
        data.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `• ${item.title} (${item.timestamp})`;
          list.appendChild(li);
        });
      }
      // 팝업 표시
      popup.classList.remove('hidden');
    })
    .catch(err => {
      console.error(err);
      alert('알림 정보를 불러오는 중 문제가 생겼어요!'); 
    });
});

// 14) 닫기 버튼 클릭 시 팝업 닫기
closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});