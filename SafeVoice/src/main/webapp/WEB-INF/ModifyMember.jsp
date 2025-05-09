<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>회원 정보 수정</title>
  <% String failMsg = (String) session.getAttribute("failMsg");
     if (failMsg != null) { %>
    <script>alert('<%= failMsg %>');</script>
  <% session.removeAttribute("failMsg"); } %>

  <script>const contextPath = '${pageContext.request.contextPath}';</script>
  <!-- 카카오 우편번호 API -->
  <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  <link rel="stylesheet" href="<c:url value='/css/ModifyMember.css'/>"/>
  <script src="<c:url value='/js/ModifyMember.js'/>" defer></script>
</head>

<body>
  <!-- 전체 컨테이너 -->


  <div class="sign-container">

    <!-- 상단 헤더 -->
    <div class="form-header-bar">
    <!-- 뒤로가기 버튼 -->
      <a href="<c:url value='/GoLogin.do'/>" class="back-btn" title="로그인으로 이동">
        <img src="<c:url value='/image/BackIcon.png'/>" alt="뒤로가기"/>
      </a>
      <!-- 다크 모드 토글 -->
    <div class="mode-toggle">
      <button id="toggleMode">🌙</button>
    </div>
      <h1>회원 정보</h1>
    </div>
    
    <!-- 섹션 1: 회원 구분 -->
    <div class="section-card">
      <div class="card-title">회원 구분</div>
      <div class="card-content">
        <div class="info-row">
          <div class="label">회원구분</div>
          <div class="value">
            <div class="radio-group">
              <label><input type="radio" name="memberType" value="parent"
                ${form.memberType=='child'?'':'checked'} /> 부모회원</label>
              <label><input type="radio" name="memberType" value="child"
                ${form.memberType=='child'?'checked':''} /> 자녀회원</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 섹션 2: 계정 정보 + 주소 -->
    <form id="modifyForm"
          action="${pageContext.request.contextPath}/ModifyMember.do"
          method="post">
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
              <input type="email" name="email"
                     value="${form.email}" required />
            </div>
          </div>
          <div class="info-row">
            <div class="label">비밀번호</div>
            <div class="value">********</div>
          </div>
          <div class="info-row">
            <div class="label">비밀번호 변경</div>
            <div class="value">
              <input type="password" name="pw2" placeholder="새 비밀번호" />
            </div>
          </div>
          <div class="info-row">
            <div class="label">비밀번호 확인</div>
            <div class="value">
              <input type="password" name="pw3" placeholder="새 비밀번호 확인" />
            </div>
          </div>
          <div class="info-row">
            <div class="label">주소</div>
            <div class="value">
              <input type="text" id="postcode" name="postcode"
                     placeholder="우편번호" value="${form.postcode}"
                     readonly />
              <button type="button" onclick="execDaumPostcode()">우편번호 찾기</button><br/>
              <input type="text" id="address" name="address"
                     placeholder="기본 주소" value="${form.address}"
                     readonly /><br/>
              <input type="text" id="detailAddress" name="address_detail"
                     placeholder="상세 주소" value="${form.address_detail}" />
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
              ${form.parentName} (${form.parentGender=='M'?'남':'여'}),
              생일: ${form.parentBirthDate},
              전화: ${form.parentPhone}
            </div>
          </div>
          <div class="info-row child-info">
            <div class="label">자녀</div>
            <div class="value">
              <input type="text" id="childNameInput"
                     placeholder="이름" />
              <div class="radio-group">
                <label><input type="radio"
                      name="childGenderInput"
                      value="M" checked /> 남</label>
                <label><input type="radio"
                      name="childGenderInput"
                      value="F" /> 여</label>
              </div>
              <input type="date" id="childBirthDateInput" />
              <input type="tel" id="childPhoneInput"
                     placeholder="전화번호" />
              <button type="button" id="addChildBtn">자녀 추가</button>
            </div>
          </div>
          <div class="info-row child-info">
            <div class="label">나의 자녀</div>
            <div class="value" id="myChildrenList">
              <c:forEach var="child" items="${form.children}" varStatus="status">
                <div class="child-item">
                  ${child.name} (${child.gender=='M'?'남':'여'}),
                  ${child.birthDate}, ${child.phone}
                  <input type="hidden"
                         name="children[${status.index}].name"
                         value="${child.name}" />
                  <input type="hidden"
                         name="children[${status.index}].gender"
                         value="${child.gender}" />
                  <input type="hidden"
                         name="children[${status.index}].birthDate"
                         value="${child.birthDate}" />
                  <input type="hidden"
                         name="children[${status.index}].phone"
                         value="${child.phone}" />
                </div>
              </c:forEach>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- 버튼 영역 -->
    <div class="btnArea type2">
      <button type="submit" form="modifyForm" class="btnSubmit">
        회원정보수정
      </button>
      <a href="${pageContext.request.contextPath}/mypage.jsp"
         class="btnEm">
        취소
      </a>
    </div>

  </div><!-- /.sign-container -->

  <!-- 우편번호 검색 레이어 -->
  <div id="postcodeLayer" class="postcode-layer">
    <div id="postcodeContainer" class="postcode-wrap"></div>
  </div>
</body>
</html>
