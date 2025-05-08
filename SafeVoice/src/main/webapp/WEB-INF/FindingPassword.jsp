<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>비밀번호 찾기 / 재설정</title>
  <!-- CSS 파일 연결 -->
  <link rel="stylesheet" href="<c:url value='/css/FindingPassword.css'/>"/>
</head>
<body>
  <!-- JSP 컨텍스트패스를 JS에서 사용하기 위해 전역 변수 선언 -->
  <script>
    const contextPath = '${pageContext.request.contextPath}';
  </script>
  
  <!-- 1) 비밀번호 찾기 폼 영역 -->
  
  <!-- 토큰 파라미터 없을 때만 보이고, 있으면 숨김(hidden) 처리됨 --> 
   <div id="findContainer" class="mobile-container">
   
   <!-- 다크 모드 토글 -->
    <div class="mode-toggle">
      <button id="toggleMode">🌙</button>
    </div>
   
    <!-- 뒤로가기 버튼: 클릭 시 Login.do 로 이동 -->
 <a href="<c:url value='/GoLogin.do'/>" class="back-btn" title="로그인으로 이동">
  <img src="<c:url value='/image/뒤로가기.png'/>" alt="뒤로가기"/>
</a>


    <!-- 로고 & 타이틀 -->
    <img src="${pageContext.request.contextPath}/image/Safe_Voice.png"
         alt="Safe Voice 로고" class="logo">
         <h3 class="title">비밀번호 찾기</h3>
    <form id="findForm">
      <!-- 이메일 입력 필드 -->
      <input type="email"
             id="emailInput"
             placeholder="가입하신 이메일을 입력하세요"
             required/>
      <!-- 제출 버튼 -->
      <button type="submit">이메일로 링크 받기</button>
      <!-- 결과 메시지 표시 영역 -->
      <p id="findMsg" class="message"></p>
    </form>
  </div>

  <!-- 2) 비밀번호 재설정 폼 영역 -->
  <!-- 토큰 파라미터가 있으면 보이고, 없으면 숨김 처리됨 -->
  <div id="resetContainer" class="mobile-container hidden">
    <!-- 뒤로가기 버튼: 동일하게 로그인 페이지로 이동 -->
    <a href="<c:url value='/Login.do'/>" class="back-btn" title="로그인으로 이동">
      <img src="<c:url value='/images/back-icon.png'/>" alt="뒤로가기"/>
    </a>

    <!-- 로고 & 타이틀 -->
    <img src="${pageContext.request.contextPath}/image/Safe_Voice.png"
         alt="Safe Voice 로고" class="logo">
         <h3 class="title">비밀번호 재설정</h3>
    <form id="resetForm">
      <!-- 1) 새 비밀번호 입력 -->
      <input type="password"
             id="pw1"
             placeholder="새 비밀번호 (영문+숫자 포함, 8자 이상)"
             required/>
      <!-- 1) 비밀번호 형식 검사 메시지 -->
      <p id="pw1-msg" class="message"></p>

      <!-- 2) 비밀번호 확인 입력 -->
      <input type="password"
             id="pw2"
             placeholder="비밀번호 확인"
             required/>
      <!-- 2) 비밀번호 일치 여부 메시지 -->
      <p id="pw2-msg" class="message"></p>

      <!-- 제출 버튼 -->
      <button type="submit">비밀번호 변경</button>
      <!-- 최종 처리 결과 메시지 -->
      <p id="resetMsg" class="message"></p>
    </form>
  </div>

  <!-- JS 파일 로드 -->
  <script src="<c:url value='/js/FindingPassword.js'/>"></script>
</body>
</html>
