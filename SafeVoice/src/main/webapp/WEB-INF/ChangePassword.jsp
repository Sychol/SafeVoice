<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<form action="GoChangePassword.do" method="post">
    <input type="hidden" name="userId" value="${userId}">
    새 비밀번호: <input type="password" name="newPassword"><br>
    새 비밀번호 확인: <input type="password" name="confirmPassword"><br>
    <button type="submit">비밀번호 변경</button>
</form>
</body>
</html>