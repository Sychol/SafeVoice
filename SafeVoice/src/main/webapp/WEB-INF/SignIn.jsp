<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>회원가입</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/SignIn.css">

  <!-- 전역 contextPath 변수 정의 -->
  <script>
    window.path = '${pageContext.request.contextPath}';
  </script>

  <!-- JS 모듈 로드 -->
  <script type="module" defer>
    import { initSignInFeatures, execDaumPostcode } from '${pageContext.request.contextPath}/js/SignIn.js';

    // 전역 함수 노출
    window.execDaumPostcode = execDaumPostcode;

    document.addEventListener('DOMContentLoaded', () => {
      initSignInFeatures(window.path);
    });
  </script>

  <!-- 카카오 주소 API -->
  <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</head>
<body>
  <!-- 다크 모드 토글 -->
  <div class="mode-toggle">
    <button id="toggleMode">🌙</button>
  </div>

  <form action="${pageContext.request.contextPath}/Sign.do" method="post">
    <h5>회원가입</h5>

    <!-- 아이디 -->
    <div class="form-group">
      <label for="username">아이디</label>
      <input type="text" id="username" name="username" placeholder="영문+숫자 4~10자">
      <div id="username-msg" class="message"></div>
      <button type="button" id="check-username">중복 확인</button>
    </div>

    <!-- 비밀번호 -->
    <div class="form-group">
      <label for="pw1">비밀번호</label>
      <input class="input-field" type="password" id="pw1" name="pw1" placeholder="PW를 입력하세요"><br>
      <label for="pw2">비밀번호 확인</label>
      <input class="input-field" type="password" id="pw2" name="pw2" placeholder="PW 확인하세요">
      <div id="pw-msg" class="message"></div>
    </div>

    <!-- 이메일 -->
    <div class="form-group">
      <label for="email-id">이메일</label>
      <input type="text" id="email-id" name="emailId" placeholder="Email을 입력하세요"> @
      <input type="text" id="domain-txt" name="emailDomain" value="naver.com" disabled>
      <select id="domain-list">
        <option value="gmail.com">gmail.com</option>
        <option value="naver.com" selected>naver.com</option>
        <option value="daum.net">daum.net</option>
        <option value="type">직접 입력</option>
      </select>
    </div>

    <!-- 이름 -->
    <div class="form-group">
      <label for="name">이름</label>
      <input class="input-field" type="text" id="name" name="name" placeholder="이름을 입력하세요">
    </div>

    <!-- 생년월일 -->
    <div id="info__birth" class="form-group">
      <label>생년월일</label><br>
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
    <div class="form-group">
      <label for="postcode">우편번호 & 주소</label><br>
      <input type="text" id="postcode" name="postcode" placeholder="우편번호">
      <input type="button" onclick="execDaumPostcode()" value="우편번호 찾기"><br>
      <input type="text" id="address" name="address" placeholder="주소"><br>
      <input type="text" id="extraAddress" name="extraAddress" placeholder="참고항목"><br>
      <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소">
    </div>

    <!-- 전화번호 -->
    <div class="form-group">
      <label>전화번호</label><br>
      <input type="text" id="phone1" name="phonePart1" maxlength="3" placeholder="010"> -
      <input type="text" id="phone2" name="phonePart2" maxlength="4" placeholder="1234"> -
      <input type="text" id="phone3" name="phonePart3" maxlength="4" placeholder="5678">
      <div id="MyNum"></div>
    </div>

    <!-- 성별 -->
    <div class="form-group">
      <label for="gender">성별</label>
      <select id="gender" name="gender">
        <option value="woman">여성</option>
        <option value="man">남성</option>
      </select>
    </div>

    <!-- 가족 전화번호 -->
    <div class="form-group">
      <label>가족 전화번호</label><br>
      <input type="text" id="phone4" name="famPhone1" maxlength="3" placeholder="010"> -
      <input type="text" id="phone5" name="famPhone2" maxlength="4" placeholder="1234"> -
      <input type="text" id="phone6" name="famPhone3" maxlength="4" placeholder="5678">
      <div id="FamilyNum"></div>
    </div>

    <!-- 부모/자녀 구분 -->
    <div class="form-group">
      <label>구분</label><br>
      <input type="radio" id="pOrC-parent" name="pOrC" value="parent">
      <label for="pOrC-parent">부모</label>
      <input type="radio" id="pOrC-child" name="pOrC" value="child">
      <label for="pOrC-child">자녀</label>
    </div>

    <div class="form-group">
      <input type="submit" value="JoinUs" class="button fit">
    </div>
  </form>

  <div class="small-text">
    이미 계정이 있으신가요? <a href="${pageContext.request.contextPath}/Login.do">로그인</a>
  </div>
</body>
</html>
