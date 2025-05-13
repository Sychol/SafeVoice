<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>회원 정보 수정</title>

  <!-- 전역 경로 -->
  <script>const contextPath = '${pageContext.request.contextPath}';</script>

  <!-- CSS 연결 -->
  <link rel="stylesheet" href="<c:url value='/css/ModifyMember.css' />" />

  <!-- JS 연결 -->
  <script src="<c:url value='/js/ModifyMember.js' />" defer></script>

  <!-- favicon 방지 -->
  <link rel="icon" href="data:;base64,iVBORw0KGgo=">
</head>

<body>
  <div class="wrapper">
    <div class="sign-container">

      <!-- 헤더 -->
      <div class="form-header-bar">
        <div class="back-button"> 
            <img src="${pageContext.request.contextPath}/image/뒤로가기.png" alt="뒤로가기" />
          </div>
        <div class="mode-toggle">
          <button id="toggleMode">🌙</button>
        </div>
        <h1>회원 정보</h1>
      </div>

      <!-- 폼 시작 -->
      <form id="modifyForm" action="${pageContext.request.contextPath}/ModifyMember.do" method="post">

        <!-- 계정 정보 -->
        <div class="section-card">
          <div class="card-title">계정 정보</div>
          <div class="card-content">
            <div class="info-row">
              <div class="label">아이디</div>
              <div class="value">${form.member_id}</div>
            </div>

            <div class="info-row">
              <div class="label">이메일</div>
              <div class="value">
                <input type="text" id="email-id" placeholder="아이디"
                  value="${fn:substringBefore(form.email,'@')}" />
                @
                <select id="domain-list">
                  <option value="type">직접입력</option>
                  <option value="naver.com" ${fn:substringAfter(form.email,'@')=='naver.com'?'selected':''}>naver.com</option>
                  <option value="gmail.com" ${fn:substringAfter(form.email,'@')=='gmail.com'?'selected':''}>gmail.com</option>
                  <option value="hanmail.net" ${fn:substringAfter(form.email,'@')=='hanmail.net'?'selected':''}>hanmail.net</option>
                </select>
                <input type="text" id="domain-txt" value="${fn:substringAfter(form.email,'@')}" disabled />
                <input type="hidden" id="email-full" name="email" value="${form.email}" />
              </div>
            </div>

            <div class="info-row">
              <div class="label">비밀번호 변경</div>
              <div class="value">
                <input type="password" id="pw1" name="pw2" placeholder="새 비밀번호" />
                <div id="pw1-msg" class="message"></div>
              </div>
            </div>

            <div class="info-row">
              <div class="label">비밀번호 확인</div>
              <div class="value">
                <input type="password" id="pw2" name="pw3" placeholder="비밀번호 확인" />
                <div id="pw2-msg" class="message"></div>
              </div>
            </div>

            <div class="info-row">
              <div class="label">주소</div>
              <div class="value">
                <input type="text" id="postcode" name="postcode" placeholder="우편번호" value="${form.postcode}" readonly />
                <button type="button" onclick="execDaumPostcode()">우편번호 찾기</button><br />
                <input type="text" id="address" name="address" placeholder="기본 주소" value="${form.address}" readonly /><br />
                <input type="text" id="detailAddress" name="address_detail" placeholder="상세 주소" value="${form.address_detail}" />
              </div>
            </div>
          </div>
        </div>

        <!-- 부모 및 자녀 정보 -->
        <div class="section-card">
          <div class="card-title">부모 및 자녀 정보</div>
          <div class="card-content">
            <div class="info-row">
              <div class="label">부모</div>
              <div class="value">
                ${form.parentName} (${form.parentGender=='M'?'남':'여'}) / 생일: ${form.parentBirthDate} / 전화: ${form.parentPhone}
              </div>
            </div>

            <div class="info-row">
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

            <div class="info-row">
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

        <!-- 버튼 -->
        <div class="btnArea type2">
          <button type="submit" class="btnSubmit">회원정보수정</button>
          <a href="<c:url value='/GoMenuMain.do'/>" class="btnEm">취소</a>
        </div>
      </form>

      <!-- footer -->
       <footer>
            <div class="bottom-navbar">
                <a href = "GoAlertHistory.do"><img src="${pageContext.request.contextPath}/image/알림1.png" alt="알림" /><span>알림</span></a>
                <a href = "GoMainPageAdult.do"><img src="${pageContext.request.contextPath}/image/홈.png" alt="홈" /><span>홈</span></a>
                <a href = "GoMenuMain.do"><img src="${pageContext.request.contextPath}/image/메뉴.png" alt="메뉴" /><span>메뉴</span></a>
            </div>
        </footer>
    </div>

    </div> <!-- .sign-container -->
  </div> <!-- .wrapper -->
</body>
</html>
