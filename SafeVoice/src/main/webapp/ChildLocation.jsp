<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
  <title>위치 확인</title>

  <!-- CSS 연결 -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/ChildLocation.css"/>

  <!-- Kakao Maps SDK: JS 키는 web.xml 또는 컨텍스트 파라미터로 관리 -->
  <script
    src="https://dapi.kakao.com/v2/maps/sdk.js"
    data-appkey="${fn:escapeXml(initParam.KAKAO_JS_KEY)}"
    data-autoload="false">
  </script>
</head>
<body>
  <div class="sign-container">
    <!-- 1. 상단 검색 바 -->
    <div class="search-bar">
      <div class="menu-icon">☰</div>
      <input type="text" placeholder="주소 검색"/>
      <div class="search-icon">🔍</div>
    </div>

    <!-- 2. 위치 타입 토글 -->
    <div class="type-toggle">
      <button id="btnChild" class="active">아이 위치</button>
      <button id="btnInst">기관 위치</button>
    </div>

    <!-- 3. 지도 표시 영역 -->
    <div id="map"></div>

    <!-- 4. 스카이뷰 전환 -->
    <button id="skyToggle" class="sky-toggle" type="button"></button>

    <!-- 5. 하단 내비게이션 -->
    <div class="bottom-nav">
      <div class="nav-item active" id="locateBtn">
        <div class="icon">📍</div>
        <div class="label">위치 확인</div>
      </div>
      <div class="nav-item" id="alertBtn">
        <div class="icon">🔔</div>
        <div class="label">알림 확인</div>
      </div>
      <div class="nav-item" id="menuBtn">
        <div class="icon">☰</div>
        <div class="label">메뉴</div>
      </div>
    </div>
  </div>

  <!-- JSP에서 contextPath 전역 변수로 선언 (XSS 방지) -->
  <script>
    const contextPath = '${fn:escapeXml(pageContext.request.contextPath)}';
  </script>

  <!-- JS 로드 -->
  <script src="${pageContext.request.contextPath}/js/ChildLocation.js"></script>
</body>
</html>
