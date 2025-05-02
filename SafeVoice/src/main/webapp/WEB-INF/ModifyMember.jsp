<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원 정보 수정</title>
<%
    String failMsg = (String) session.getAttribute("failMsg"); // 개인정보 수정 실패 alert
    if (failMsg != null) {
%>
    <script>
        alert('<%= failMsg %>');
    </script>
<%
        session.removeAttribute("failMsg"); // 한 번만 쓰고 지우기
    }
%>
</head>

<body>

	<h2>회원 정보 수정</h2>
	
	

	<form action="ChangePassword.do" method="post">
	비밀번호 <input type = "password" value="dummyPassword" readonly name = "pw">
		<input type="hidden" name="id" value="testuser123">
		<input type="submit" value="비밀번호 변경">
	</form>

	<form action="ModifyMember.do" method="post">

		<input type="password" name="confirmPw"><br>
		<br> <input type="submit" value="회원정보 수정">
	</form>


</body>
</html>