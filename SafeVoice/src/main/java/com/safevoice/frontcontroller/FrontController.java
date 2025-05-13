package com.safevoice.frontcontroller;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.controller.Command;
import com.safevoice.controller.MainPageChildService;
import com.safevoice.controller.MenuMainService;
import com.safevoice.controller.Alert.GetAlertHistoryService;
import com.safevoice.controller.Alert.InputFileService;
import com.safevoice.controller.Alert.SaveSubscriptionService;
//import com.safevoice.controller.Alert.SendPushNotificationService;
import com.safevoice.controller.Member.ChangePasswordService;
import com.safevoice.controller.Member.IdDuplicateCheckService;
import com.safevoice.controller.Member.LoginService;
import com.safevoice.controller.Member.LogoutService;
import com.safevoice.controller.Member.MarkAlertsAsRead;
import com.safevoice.controller.Member.ModifyMemberService;
import com.safevoice.controller.Member.RequestConnectionService;
import com.safevoice.controller.Member.SignInService;
import com.safevoice.controller.Member.SignOutService;
import com.safevoice.controller.Member.UpdateMemberService;
import com.safevoice.controller.Member.VerifyCodeService;
import com.safevoice.controller.Member.VerifyIdentityService;
import com.safevoice.controller.Member.ViewChildListService;
import com.safevoice.tomb.DeleteChildService;
import com.safevoice.tomb.RepeatAlertService;
import com.safevoice.tomb.StopNotificationService;

@WebServlet("*.do")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private HashMap<String, Command> map = new HashMap<String, Command>();

	@Override
	public void init() throws ServletException {
		map.put("SignIn.do", new SignInService()); // 회원가입
		map.put("Login.do", new LoginService()); // 로그인
		map.put("Logout.do", new LogoutService()); // 로그아웃
		map.put("ChangePassword.do", new ChangePasswordService()); // 비밀번호변경 - 진짜변경
		map.put("VerifyIdentity.do", new VerifyIdentityService()); // 비밀번호변경 - 본인확인
		map.put("SignOut.do", new SignOutService()); // 회원탈퇴
		map.put("ModifyMember.do", new ModifyMemberService()); // 회원정보수정
	    map.put("RequestConnection.do", new RequestConnectionService()); // 자녀 등록 - 자녀 연결 (코드 전송)
	    map.put("VerifyCode.do", new VerifyCodeService()); // 자녀 등록 - 자녀 연결 (코드 확인)
//	    map.put("/test/SendPush.do", new SendPushNotificationService());
	    map.put("SaveSubscription.do", new SaveSubscriptionService());
	    map.put("InputFile.do", new InputFileService());
	    map.put("RepeatAlert.do", new RepeatAlertService());
	    map.put("StopNotification.do", new StopNotificationService());
	    map.put("GetAlertHistory.do", new GetAlertHistoryService());
	    map.put("MenuMain.do", new MenuMainService());
	    map.put("MainPageChild.do", new MainPageChildService());
	    map.put("IdDuplicateCheck.do", new IdDuplicateCheckService());
	    map.put("ViewChildList.do", new ViewChildListService()); // 자녀 관리
	    map.put("DeleteChild.do", new DeleteChildService()); // 자녀 삭제
	    map.put("MarkAlertsAsRead.do", new MarkAlertsAsRead());
	    map.put("UpdateMember.do", new UpdateMemberService());
	    
	}
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		

		String uri = request.getRequestURI();
//		System.out.println("uri : " + uri);

		String cp = request.getContextPath();
//		System.out.println("cp : " + cp);

		String finalPath = uri.substring(cp.length() + 1);
//		System.out.println("finalPath : " + finalPath);

		request.setCharacterEncoding("UTF-8");
		
//		String email = request.getParameter("email");
		
		

		String moveUrl = "";
		Command com = null;

		com = map.get(finalPath);

		if (com != null) {
			moveUrl = com.execute(request, response);
//			System.out.println("🌐 요청 URI: " + uri);
//			System.out.println("➡️ 실행 후 이동 주소: " + moveUrl);
//			System.out.println("➡️ finalPath: " + finalPath);
		}

		if (moveUrl == null) {

		} else if (moveUrl.contains("redirect:/")) { // redirect:/ 로 시작하는 경우 sendRedirect 처리
			response.sendRedirect(request.getContextPath() + moveUrl.substring(9)); // contextPath 포함
		} else {
			if (moveUrl.contains("Go")) {
				moveUrl = moveUrl.replace("Go", "").replace(".do", ".jsp");
//				System.out.println("moveURL 1번 : " + moveUrl);
			}
			if (finalPath.contains("Go")) {
				moveUrl = finalPath.replace("Go", "").replace(".do", ".jsp");
//				System.out.println("moveURL 2번 : " + moveUrl);
			}
//			System.out.println("여기는 가니? : "+ moveUrl);
//			System.out.println("final Path? : "+ finalPath);
			RequestDispatcher rd = request.getRequestDispatcher("WEB-INF/" + moveUrl);
			rd.forward(request, response);
		}
	}
	
}
