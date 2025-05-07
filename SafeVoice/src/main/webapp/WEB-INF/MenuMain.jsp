<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safe Voice - 메뉴</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
 <link rel="stylesheet" href="${pageContext.request.contextPath}/css/MenuMain.css">
  
</head>

<body>
  <div class="menu-container">
    <header>
      <i class="fas fa-arrow-left"></i>
      <div class="header-title">메뉴</div>
      <img class="profile-img" src="${pageContext.request.contextPath}/image/Mom.png" alt="프로필">
    </header>

    <div class="user-info">
    <img src="${pageContext.request.contextPath}/image/Mom.png" alt="프로필">
      <div class="email">userEmail@example.com</div>
      <div class="name">성이름</div>
    </div>

    <ul class="menu-list">
        <li class="menu-item">
          <a href="account.html"><i class="fas fa-user"></i> 계정 정보</a>
        </li>
        <li class="menu-item">
          <a href="child-settings.html"><i class="fas fa-child"></i> 자녀 설정</a>
        </li>
        <li class="menu-item">
          <a href="notice.html"><i class="fas fa-bullhorn"></i> 공지사항</a>
        </li>
        <li class="menu-item">
          <a href="GoAlertConfig.do"><i class="fas fa-bell"></i> 자녀 관리</a>
        </li>
        <li class="menu-item">
          <a href="terms.html"><i class="fas fa-file-alt"></i> 이용약관</a>
        </li>
        <li class="menu-item">
          <a href="privacy.html"><i class="fas fa-shield-alt"></i> 개인정보 처리방침</a>
        </li>
        <li class="menu-item">
          <a href="program-info.html"><i class="fas fa-info-circle"></i> 프로그램 정보</a>
        </li>
      </ul>
      


       
      <footer>
        <div class="bottom-navbar">
            <a href = "GoAlertHistory.do"><img src="${pageContext.request.contextPath}/image/알림1.png" alt="알림" /><span>알림</span></a>
            <a href = "GoMainPageAdult.do"><img src="${pageContext.request.contextPath}/image/홈.png" alt="홈" /><span>홈</span></a>
            <a href = "GoMenuMain.do"><img src="${pageContext.request.contextPath}/image/메뉴.png" alt="메뉴" /><span>메뉴</span></a>
        </div>
    </footer>
</div>
</body>

</html>

