<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<form action="RequestConnection.do" method="post">
    <label>상대방 ID:</label>
    <input type="text" name="id" required />

    <br> <label>상대방 이메일:</label>
    <input type="email" name="email" required />

    <input type="submit" value="이메일로 인증번호 보내기" />
</form>

</body>
</html>