<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safe Voice - 로그인</title>
  
  <!-- CSS/JS 경로 -->
  <link rel="stylesheet"
        href="${pageContext.request.contextPath}/css/Login.css">
  <script src="${pageContext.request.contextPath}/js/Login.js" defer></script>
</head>
<body>
  <div class="container">
    <!-- 다크 모드 토글 -->
    <div class="mode-toggle">
      <button id="toggleMode">🌙</button>
    </div>
    <!-- 로고 & 타이틀 -->
    <img src="${pageContext.request.contextPath}/image/Safe_Voice.png"
         alt="Safe Voice 로고" class="logo">
    <h1 class="title">Safe Voice</h1>
    <p class="subtitle">
      당신의 아이를 지키는 작은 관심<br><br>
      - AI 음성 분석 기반 학교폭력 조기감지 서비스 -
    </p>

    <!-- 로그인 폼: LoginServlet 으로 POST -->
    <form id="loginForm" action="${pageContext.request.contextPath}/LoginServlet" method="post">
      <input class="input-field" 
             type="text" 
             name="username" 
             placeholder="아이디"
             value="${fn:escapeXml(param.username)}" />

      <input class="input-field" 
             type="password" 
             name="password" 
             placeholder="비밀번호" />

      <div class="login-options">
        <label><input type="checkbox" name="saveId" /> 아이디 저장</label>
        <label><input type="checkbox" name="autoLogin" /> 자동 로그인</label>
      </div>

      <button type="submit" class="submit-button">로그인</button>
    </form>

    <!-- 소셜 로그인 버튼 -->
    <div class="social-login">
      <button class="kakao-login">
        <img src="${pageContext.request.contextPath}/image/kakao_icon.png"
             alt="카카오 아이콘" class="social-icon">
        카카오로 로그인
      </button>
      <button class="naver-login">
        <img src="${pageContext.request.contextPath}/image/naver.png"
             alt="네이버 아이콘" class="social-icon">
        네이버로 로그인
      </button>
    </div>

    <!-- 회원가입 · 비밀번호 찾기 -->
    <div class="small-text">
      <a href="${pageContext.request.contextPath}/sign_up.jsp">회원가입</a> |
      <a href="#">비밀번호 찾기</a>
    </div>
  </div>

  <!-- 로그인 성공/실패 알림창 -->
  <div id="successModal" class="modal">
    <div class="modal-content">
      <p>✅ 로그인 성공!</p>
      <button id="closeModalBtn">확인</button>
    </div>
  </div>
  <div id="errorModal" class="modal">
    <div class="modal-content">
      <p>❌ 로그인 실패!</p>
      <button id="closeErrorModalBtn">확인</button>
    </div>
  </div>

  <!--  JSP 페이지에서 서버가 로그인(또는 다른 처리)을 마친 뒤에
?result=success 혹은 ?result=error 를 URL 파라미터로 던져주면,
그 값을 보고 알림 창을 띄워주는 로직 -->
  <c:if test="${param.result == 'success'}">
    <script>
      document.getElementById('successModal').style.display = 'flex';
    </script>
  </c:if>
  <c:if test="${param.result == 'error'}">
    <script>
      document.getElementById('errorModal').style.display = 'flex';
    </script>
  </c:if>
</body>
</html>
