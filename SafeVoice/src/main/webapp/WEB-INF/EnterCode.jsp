<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="VerifyCode.do" method="post">
		<input type="hidden" name="receverId" value="${receverId}" /> 인증번호 입력: <input
			type="text" name="inputCode" required /> <input type="submit"
			value="확인" />
	</form>
</body>
</html>