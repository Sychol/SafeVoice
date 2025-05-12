<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>가족 연결 요청</title>
</head>
<body>

<c:if test="${not empty errorMsg}">
    <script>alert('${errorMsg}');</script>
</c:if>


<!-- 1. 이메일 인증 요청 폼 -->
<form action="RequestConnection.do" method="post">
    <label>상대방 ID:</label>
    <input type="text" name="targetId" required />

    <br><label>상대방 이메일:</label>
    <input type="email" name="targetEmail" required />

    <input type="submit" value="이메일로 인증번호 보내기" />
</form>

<!-- 2. 인증번호 입력 폼: realCode 세션에 저장되어 있으면 보여주기 -->
<c:if test="${not empty sessionScope.realCode}">
	<p style="color: green;">📩 인증번호가 입력하신 이메일로 전송되었습니다.</p>
    <form action="VerifyCode.do" method="post">
        인증번호 입력: <input type="text" name="inputCode" required />
        <input type="submit" value="확인" />
    </form>
</c:if>

</body>
</html>
