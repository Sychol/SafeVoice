<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>회원가입</title>
  <link rel="stylesheet"
        href="${pageContext.request.contextPath}/css/SignIn.css">

  <!-- 1) contextPath 전역 변수 정의 -->
  <script>
    window.path = '${pageContext.request.contextPath}';
  </script>
  <!-- 2) 모듈이 아닌 일반 스크립트로 내보냈다면 -->
  <script src="${pageContext.request.contextPath}/js/SignIn.js" defer></script>
  <!-- 3) 모듈로 내보냈다면 type="module" 로 로드 -->
  <!--
  <script type="module" defer>
    import { initSignInFeatures, sample6_execDaumPostcode } from '${pageContext.request.contextPath}/js/SignIn.js';
    window.sample6_execDaumPostcode = sample6_execDaumPostcode;
    document.addEventListener('DOMContentLoaded', () => {
      initSignInFeatures(window.path);
    });
  </script>
  -->
</head>
<body>
  <!-- 다크 모드 토글 -->
  <div class="mode-toggle">
    <button id="toggleMode">🌙</button>
  </div>

  <form action="Sign.do" method="post">
    <h5>회원가입</h5>

    <!-- 4) 아이디 -->
    <div class="form-group">
      <label for="username">아이디</label>
      <input type="text" id="username" name="username" placeholder="영문+숫자 4~10자">
      <div id="username-msg" class="message"></div>
      <button type="button" id="check-username">중복 확인</button>
    </div>

    <!-- 비밀번호 -->
    <input class="input-field" type="password" name="pw1" placeholder="PW를 입력하세요"><br>
    <input class="input-field" type="password" name="pw2" placeholder="PW 확인하세요">
    <div id="pw-msg" class="message"></div><br>

    <!-- 이메일 -->
    <input type="text" id="email-id" name="emailId" placeholder="Email을 입력하세요">
    @ <input type="text" id="domain-txt" name="emailDomain" value="naver.com" disabled>
    <select id="domain-list">
      <option value="gmail.com">gmail.com</option>
      <option value="naver.com" selected>naver.com</option>
      <option value="daum.net">daum.net</option>
      <option value="type">직접 입력</option>
    </select><br>

    <!-- 이름 -->
    <input class="input-field" type="text" name="name" placeholder="이름을 입력하세요"><br>

    <!-- 생년월일 (커스텀 셀렉트) -->
    <div class="info" id="info__birth">
      <select id="birth-year" name="birthYear" class="box">
        <option disabled selected>출생 연도</option>
      </select>
      <select id="birth-month" name="birthMonth" class="box">
        <option disabled selected>월</option>
      </select>
      <select id="birth-day" name="birthDay" class="box">
        <option disabled selected>일</option>
      </select>
    </div>

    <!-- 주소 -->
    <input type="text" id="postcode" name="postcode" placeholder="우편번호">
    <input type="button" onclick="execDaumPostcode()" value="우편번호 찾기"><br>
    <input type="text" id="address" name="address" placeholder="주소">
    <input type="text" id="extraAddress" name="extraAddress" placeholder="참고항목"><br>
    <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소"><br>

    <!-- 전화번호 -->
    <label for="phone1">전화번호</label><br>
    <input type="text" id="phone1" name="phonePart1" maxlength="3" placeholder="010"> -
    <input type="text" id="phone2" name="phonePart2" maxlength="4" placeholder="1234"> -
    <input type="text" id="phone3" name="phonePart3" maxlength="4" placeholder="5678">
    <div id="MyNum"></div><br>

    <!-- 성별 -->
    <select name="gender">
      <option value="woman">여성</option>
      <option value="man">남성</option>
    </select><br>

    <!-- 가족 전화번호 -->
    <label for="phone4">가족전화번호</label><br>
    <input type="text" id="phone4" name="famPhone1" maxlength="3" placeholder="010"> -
    <input type="text" id="phone5" name="famPhone2" maxlength="4" placeholder="1234"> -
    <input type="text" id="phone6" name="famPhone3" maxlength="4" placeholder="5678">
    <div id="FamilyNum"></div><br>

    <!-- 부모/자녀 -->
    <input type="radio" name="pOrC" value="parent"> 부모
    <input type="radio" name="pOrC" value="child"> 자녀<br><br>

    <input type="submit" value="JoinUs" class="button fit">
  </form>

  <div class="small-text">
    이미 계정이 있으신가요? <a href="Login.do">로그인</a>
  </div>

  <!-- 카카오 주소 API -->
  <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
</html>
