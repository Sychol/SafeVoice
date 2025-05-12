<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>회원 정보 수정</title>
  <% String failMsg = (String) session.getAttribute("failMsg");
     if (failMsg != null) { %>
    <script>alert('<%= failMsg %>');</script>
  <% session.removeAttribute("failMsg"); } %>

  <!-- 전역 contextPath -->
  <script>const contextPath = '${pageContext.request.contextPath}';</script>

  <!-- 카카오 우편번호 API -->
  <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

  <!-- CSS -->
  <link rel="stylesheet" href="<c:url value='/css/ModifyMember.css'/>" />

  <!-- JS -->
  <script src="<c:url value='/js/ModifyMember.js'/>" defer></script>

  <!-- favicon.ico 404 방지 -->
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>

<body>
  <div class="sign-container">

    <!-- 헤더 -->
    <div class="form-header-bar">
      <a href="<c:url value='/GoMenuMain.do'/>" class="back-btn" title="뒤로가기">
        <img src="<c:url value='/image/BackIcon.png'/>" alt="뒤로가기" />
      </a>
      <div class="mode-toggle">
        <button id="toggleMode">🌙</button>
      </div>
      <h1>회원 정보</h1>
    </div>

    <!-- 폼 -->
    <form id="modifyForm"
          action="${pageContext.request.contextPath}/ModifyMember.do"
          method="post">

      <!-- 섹션 1: 회원 구분 -->
      <div class="section-card">
        <div class="card-title">회원 구분</div>
        <div class="card-content">
          <div class="info-row">
            <div class="label">회원구분</div>
            <div class="value">
              <label><input type="radio" name="memberType" value="parent"
                ${form.memberType=='child'?'':'checked'} /> 부모회원</label>
              <label><input type="radio" name="memberType" value="child"
                ${form.memberType=='child'?'checked':''} /> 자녀회원</label>
            </div>
          </div>
        </div>
      </div>

      <!-- 섹션 2: 계정 정보 + 주소 -->
      <div class="section-card">
        <div class="card-title">계정 정보</div>
        <div class="card-content">

          <!-- 아이디 -->
          <div class="info-row">
            <div class="label">아이디</div>
            <div class="value">${form.member_id}</div>
          </div>

<!-- 이메일 결합 -->
<div class="info-row">
  <div class="label">이메일</div>
  <div class="value">
    <input type="text"
           id="email-id"
           placeholder="아이디"
           value="${fn:substringBefore(form.email,'@')}" />
    @
    <select id="domain-list">
      <!-- 직접입력 -->
      <option value="type"
        ${fn:contains(form.email,'@') ? '' : ''}>
        직접입력
      </option>

      <!-- naver.com : 이메일이 비어 있거나 naver.com 일 때 선택 -->
      <option value="naver.com"
        ${empty form.email || fn:substringAfter(form.email,'@')=='naver.com' ? 'selected' : ''}>
        naver.com
      </option>

      <option value="gmail.com"
        ${fn:substringAfter(form.email,'@')=='gmail.com'?'selected':''}>
        gmail.com
      </option>

      <option value="hanmail.net"
        ${fn:substringAfter(form.email,'@')=='hanmail.net'?'selected':''}>
        hanmail.net
      </option>

      <option value="kakao.com"
        ${fn:substringAfter(form.email,'@')=='kakao.com'?'selected':''}>
        kakao.com
      </option>
    </select>

    <!-- 도메인 입력란은 기본으로 비활성화 -->
    <input type="text"
           id="domain-txt"
           placeholder="도메인"
           value="${empty form.email ? 'naver.com' : fn:substringAfter(form.email,'@')}"
           disabled />

    <input type="hidden"
           id="email-full"
           name="email"
           value="${form.email}" />
  </div>
</div>

<!-- 비밀번호 변경 -->
<div class="info-row">
  <div class="label">비밀번호 변경</div>
  <div class="value">
    <input type="password" id="pw1" name="pw2" placeholder="새 비밀번호" />
    <div id="pw1-msg" class="message"></div> <!-- 위치 조정: span → div, 아래로 -->
  </div>
</div>

<!-- 비밀번호 확인 -->
<div class="info-row">
  <div class="label">비밀번호 확인</div>
  <div class="value">
    <input type="password" id="pw2" name="pw3" placeholder="새 비밀번호 확인" />
    <div id="pw2-msg" class="message"></div> <!-- 위치 조정 -->
  </div>
</div>

          <!-- 주소 -->
          <div class="info-row">
            <div class="label">주소</div>
            <div class="value">
              <input type="text" id="postcode" name="postcode"
                     placeholder="우편번호" value="${form.postcode}" readonly />
              <button id="btnPostcode" type="button" onclick="execDaumPostcode()">우편번호 찾기</button><br/>
              <input type="text" id="address" name="address"
                     placeholder="기본 주소" value="${form.address}" readonly /><br/>
              <input type="text" id="detailAddress" name="address_detail"
                     placeholder="상세 주소" value="${form.address_detail}" />

              <!-- 우편번호 레이어 -->
              <div id="postcodeLayer" class="postcode-layer">
                <div id="postcodeContainer" class="postcode-wrap">
                  <button type="button" id="closePostcodeLayer" class="postcode-close-btn">✕</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 섹션 3: 부모 및 자녀 정보 -->
      <div class="section-card">
        <div class="card-title">부모 및 자녀 정보</div>
        <div class="card-content">
          <div class="info-row parent-info">
            <div class="label">부모</div>
            <div class="value">
              ${form.parentName} (${form.parentGender=='M'?'남':'여'}), 생일: ${form.parentBirthDate}, 전화: ${form.parentPhone}
            </div>
          </div>
          <div class="info-row child-info">
            <div class="label">자녀</div>
            <div class="value">
              <input type="text" id="childNameInput" placeholder="이름" />
              <div class="radio-group">
                <label><input type="radio" name="childGenderInput" value="M" checked /> 남</label>
                <label><input type="radio" name="childGenderInput" value="F" /> 여</label>
              </div>
              <input type="date" id="childBirthDateInput" />
              <input type="tel" id="childPhoneInput" placeholder="전화번호" />
              <button type="button" id="addChildBtn">자녀 추가</button>
            </div>
          </div>
          <div class="info-row child-info">
            <div class="label">나의 자녀</div>
            <div class="value" id="myChildrenList">
              <c:forEach var="child" items="${form.children}" varStatus="status">
                <div class="child-item">
                  ${child.name} (${child.gender=='M'?'남':'여'}), ${child.birthDate}, ${child.phone}
                  <input type="hidden" name="children[${status.index}].name" value="${child.name}" />
                  <input type="hidden" name="children[${status.index}].gender" value="${child.gender}" />
                  <input type="hidden" name="children[${status.index}].birthDate" value="${child.birthDate}" />
                  <input type="hidden" name="children[${status.index}].phone" value="${child.phone}" />
                </div>
              </c:forEach>
            </div>
          </div>
        </div>
      </div>

      <!-- 버튼 영역 -->
      <div class="btnArea type2">
        <button type="submit" form="modifyForm" class="btnSubmit">회원정보수정</button>
        <a href="<c:url value='/GoMenuMain.do'/>" class="btnEm">취소</a>
      </div>

    </form>

    <!-- 하단 네비게이션 -->
    <footer>
      <div class="bottom-navbar">
        <a href="<c:url value='/GoAlertHistory.do'/>">
          <img src="<c:url value='/image/알림1.png'/>" alt="알림"/><span>알림</span>
        </a>
        <a href="<c:url value='/GoMainPageAdult.do'/>">
          <img src="<c:url value='/image/홈.png'/>" alt="홈"/><span>홈</span>
        </a>
        <a href="<c:url value='/GoMenuMain.do'/>">
          <img src="<c:url value='/image/메뉴.png'/>" alt="메뉴"/><span>메뉴</span>
        </a>
      </div>
    </footer>

  </div><!-- /.sign-container -->
</body>
</html>
