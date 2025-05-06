// Kakao Maps SDK 비동기 로드 및 초기화
kakao.maps.load(function () {
  // 지도 생성 및 기본 설정
  const map = new kakao.maps.Map(document.getElementById('map'), {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청 좌표
    level: 4, // 확대 레벨
    mapTypeId: kakao.maps.MapTypeId.ROADMAP // 기본 지도 타입
  });

  // 현재 위치 마커를 저장할 변수
  let currentMarker = null;

  // 스카이뷰 상태를 저장할 변수
  let isSkyView = false;

  // 위치 확인 버튼 클릭 이벤트
  document.getElementById('locateBtn').addEventListener('click', () => {
    // 브라우저에서 Geolocation API 지원 여부 확인
    if (!navigator.geolocation) {
      alert('현재 위치를 지원하지 않는 브라우저입니다.');
      return;
    }

    // 현재 위치 요청
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lng);

        // 기존 마커 제거
        if (currentMarker) {
          currentMarker.setMap(null);
        }

        // 마커 이미지 설정
        const markerImage = new kakao.maps.MarkerImage(
          'https://cdn-icons-png.flaticon.com/512/684/684908.png', // 마커 이미지 URL
          new kakao.maps.Size(36, 36), // 이미지 크기
          { offset: new kakao.maps.Point(18, 36) } // 마커 기준점
        );

        // 새로운 마커 생성 및 지도에 표시
        currentMarker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
          image: markerImage
        });

        // 지도 중심을 현재 위치로 이동
        map.setCenter(locPosition);
      },
      (error) => {
        alert('위치 정보를 가져올 수 없습니다.');
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000
      }
    );
  });

  // 스카이뷰 버튼 클릭 이벤트
  document.getElementById('skyToggle').addEventListener('click', () => {
    isSkyView = !isSkyView;
    map.setMapTypeId(isSkyView ? kakao.maps.MapTypeId.HYBRID : kakao.maps.MapTypeId.ROADMAP);
    document.getElementById('skyToggle').innerText = isSkyView ? '지도보기' : '스카이뷰';
  });
});
