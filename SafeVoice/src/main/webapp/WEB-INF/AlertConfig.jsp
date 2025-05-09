<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>자녀 관리</title>

  <script>
    const contextPath = '<%= request.getContextPath() %>';
  </script>

  <!-- ✅ 외부 JS는 그 아래에서 불러와야 함 -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/AlterConfig.css">
  <script src="${pageContext.request.contextPath}/js/AlterConfig.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
  
</head>

<body>
  <div class="container">
    <!-- 헤더 -->
    <header>
      <img src="${pageContext.request.contextPath}/image/뒤로가기.png" alt="뒤로가기" class="back-button" />
      <h1>자녀 관리</h1>
      <img src="${pageContext.request.contextPath}/image/Mom.png" alt="부모 프로필" class="parent-icon" />
    </header>
 
    <!-- 자녀 리스트 -->
    <section class="child-list">
      <div class="child-item">
        <img src="${pageContext.request.contextPath}/image/child1.png" class="child-avatar" />
        <div class="child-info">
          <div class="child-name">나첫째</div>
          <div class="child-date">최근 조회 날짜<br>2025/04/22</div>
        </div>
        <div class="child-actions">
         <img src="${pageContext.request.contextPath}/image/휴지통.png" alt="삭제" />
          <img src="${pageContext.request.contextPath}/image/연필.png" alt="수정" />
          <img src="${pageContext.request.contextPath}/image/메뉴.png" alt="메뉴" />
        </div>
      </div>

      <div class="child-item">
        <img src="${pageContext.request.contextPath}/image/child2.png" class="child-avatar" />
        <div class="child-info">
          <div class="child-name">나둘째</div>
          <div class="child-date">최근 조회 날짜<br>2025/04/20</div>
        </div>
        <div class="child-actions">
          <img src="${pageContext.request.contextPath}/image/휴지통.png" alt="삭제" />
          <img src="${pageContext.request.contextPath}/image/연필.png" alt="수정" />
          <img src="${pageContext.request.contextPath}/image/메뉴.png" alt="메뉴" />
        </div>
      </div>

      <div class="child-item">
        <img src="${pageContext.request.contextPath}/image/child3.png" class="child-avatar" />
        <div class="child-info">
          <div class="child-name">나셋째</div>
          <div class="child-date">최근 조회 날짜<br>2025/04/21</div>
        </div>
        <div class="child-actions">
          <img src="${pageContext.request.contextPath}/image/휴지통.png" alt="삭제" />
          <img src="${pageContext.request.contextPath}/image/연필.png" alt="수정" />
          <img src="${pageContext.request.contextPath}/image/메뉴.png" alt="메뉴" />
        </div>
      </div>
    </section>

    <!-- 자녀 추가 -->
    <div class="add-child">
      <img src="${pageContext.request.contextPath}/image/추가.png" alt="추가" />
      <span>자녀 추가하기</span>
    </div>

    <!-- 하단 메뉴 -->
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
