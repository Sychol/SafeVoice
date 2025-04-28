<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
 <link rel="stylesheet"
        href="${pageContext.request.contextPath}/css/SignIn.css">
<script src="${pageContext.request.contextPath}/js/SignIn.js" defer></script>
</head>
<body>
<div class="container">
    <!-- 다크 모드 토글 -->
    <div class="mode-toggle">
      <button id="toggleMode">🌙</button>
    </div>
    <form action="Join" method="post">
	    <h5>회원가입</h5>
		<input class="input-field" type="text" placeholder="Email을 입력하세요" name="email"><br>
		<input class="input-field" type="text" placeholder="아이디를 입력하세요" name="id"><br>
		<input class="input-field" type="password" placeholder="PW를 입력하세요" name="pw"><br>
		<input class="input-field" type="text" placeholder="이름을 입력하세요" name="name"><br>
		<input type="date" name="birth"><br>
		<input type="text" id="sample6_postcode" placeholder="우편번호" name = "postcode">
		<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
		<input type="text" id="sample6_address" placeholder="주소" name = "address">
		<input type="text" id="sample6_extraAddress" placeholder="참고항목" name = "extraAddress"><br>
		<input type="text" id="sample6_detailAddress" placeholder="상세주소" name = "detailAddress">

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

			<br><input type="text" placeholder="전화번호 입력" name="tel">
			<br><select name = "gender">
				  <option value = "woman">여성</option>
        		  <option value = "man">남성</option>
      			  </select>
			<input type="text" placeholder="가족 번호를 입력하세요" name="pTel"><br>
			<input type="radio" name="pOrC" value = "parent"> 부모
			<input type="radio" name="pOrC" value = "child"> 자녀
			
			<br><input type="submit" value="JoinUs" class="button fit">
			</form>
    <div class="small-text"> 이미 계정이 있으신가요?
  <a href="${pageContext.request.contextPath}/Login.jsp">로그인</a>
</div>

<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>


</body>
</html>