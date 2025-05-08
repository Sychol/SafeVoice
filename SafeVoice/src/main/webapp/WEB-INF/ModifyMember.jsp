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
  <%  session.removeAttribute("failMsg"); }
  %>
  <!-- 전역 변수 선언 -->
  <script>
    const contextPath = '${pageContext.request.contextPath}';
  </script>
  <!-- css와 js 연결 -->
 <link rel="stylesheet" href="<c:url value='/css/ModifyMember.css'/>"/>
<script src="<c:url value='/js/ModifyMember.js'/>" defer></script>


  <!-- 카카오 우편번호 API -->
  <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

  <!-- 자녀/부모 토글 & 자녀추가 로직 -->
  <script src="<c:url value='/js/ModifyMember.js'/>" defer></script>
</head>

<body>
  <div module="member_edit">
    <h3>기본정보</h3>
    <div class="boardWrite">
      <form id="modifyForm"
            action="${pageContext.request.contextPath}/ModifyMember.do"
            method="post">
        <table border="1" summary="회원 기본정보">
          <caption>회원 기본정보</caption>
          <tbody>
            <!-- 1. 회원구분 -->
            <tr>
              <th scope="row">회원구분</th>
              <td>
                <label>
                  <input type="radio" name="memberType" value="parent"
                         ${form.memberType=='child'?'' : 'checked'} /> 부모회원
                </label>
                <label>
                  <input type="radio" name="memberType" value="child"
                         ${form.memberType=='child'?'checked':''} /> 자녀회원
                </label>
              </td>
            </tr>

            <!-- 2. 아이디 -->
            <tr>
              <th scope="row">아이디</th>
              <td>${form.member_id}</td>
            </tr>

            <!-- 3. 비밀번호 (수정불가) -->
            <tr>
              <th scope="row">비밀번호</th>
              <td>********</td>
            </tr>

            <!-- 4. 비밀번호 변경 -->
            <tr>
              <th scope="row">비밀번호 변경</th>
              <td><input type="password" name="pw2" placeholder="새 비밀번호" /></td>
            </tr>
            <tr>
              <th scope="row">비밀번호 변경 확인</th>
              <td><input type="password" name="pw3" placeholder="새 비밀번호 확인" /></td>
            </tr>

            <!-- 5. 이메일 -->
            <tr>
              <th scope="row">이메일</th>
              <td><input type="email" name="email" value="${form.email}" required /></td>
            </tr>

            <!-- 6. 주소 -->
            <tr>
              <th scope="row">주소</th>
              <td>
                <input type="text" id="postcode" name="postcode"
                       placeholder="우편번호" value="${form.postcode}" readonly />
                <button type="button" onclick="execDaumPostcode()">우편번호 찾기</button>
                <br/>
                <input type="text" id="address" name="address"
                       placeholder="주소" value="${form.address}" readonly />
                <br/>
                <input type="text" id="detailAddress" name="address_detail"
                       placeholder="상세주소" value="${form.address_detail}" />
              </td>
            </tr>

            <!-- 7. 부모 정보 (읽기용) -->
            <tr class="parent-info">
              <th scope="row">부모</th>
              <td>
                ${form.parentName} (${form.parentGender=='M'?'남':'여'}),
                생일: ${form.parentBirthDate},
                전화: ${form.parentPhone}
              </td>
            </tr>

            <!-- 8. 자녀 입력폼 -->
            <tr class="child-info">
              <th scope="row">자녀</th>
              <td>
                <input type="text" id="childNameInput" placeholder="이름" />
                <label><input type="radio" name="childGenderInput" value="M" checked /> 남</label>
                <label><input type="radio" name="childGenderInput" value="F" /> 여</label>
                <input type="date" id="childBirthDateInput" />
                <input type="tel" id="childPhoneInput" placeholder="전화번호" />
                <button type="button" id="addChildBtn">자녀 추가</button>
              </td>
            </tr>

            <!-- 9. 나의 자녀 리스트 -->
            <tr class="child-info">
              <th scope="row">나의 자녀</th>
              <td>
                <div id="myChildrenList">
                  <c:forEach var="child" items="${form.children}" varStatus="status">
                    <div class="child-item">
                      ${child.name} (${child.gender=='M'?'남':'여'}),
                      ${child.birthDate}, ${child.phone}
                      <input type="hidden" name="children[${status.index}].name" value="${child.name}" />
                      <input type="hidden" name="children[${status.index}].gender" value="${child.gender}" />
                      <input type="hidden" name="children[${status.index}].birthDate" value="${child.birthDate}" />
                      <input type="hidden" name="children[${status.index}].phone" value="${child.phone}" />
                    </div>
                  </c:forEach>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>

    <!-- 10. 버튼 영역 -->
    <div class="btnArea type2">
      <button type="submit" form="modifyForm" class="btnSubmit">
        회원정보수정
      </button>
      <a href="${pageContext.request.contextPath}/index.html" class="btnEm">취소</a>
    </div>
  </div>

  <!-- 우편번호 검색 레이어 -->
  <div id="postcodeLayer" class="postcode-layer">
    <div id="postcodeContainer" class="postcode-wrap"></div>
  </div>
</body>
</html>
