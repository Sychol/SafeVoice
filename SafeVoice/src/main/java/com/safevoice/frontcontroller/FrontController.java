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
import com.safevoice.controller.Alert.SendPushNotificationService;
import com.safevoice.controller.Member.ChangePasswordService;
import com.safevoice.controller.Member.LoginService;
import com.safevoice.controller.Member.LogoutService;
import com.safevoice.controller.Member.ModifyMemberService;
import com.safevoice.controller.Member.RequestConnectionService;
import com.safevoice.controller.Member.SignInService;
import com.safevoice.controller.Member.SignOutService;
import com.safevoice.controller.Member.VerifyCodeService;
import com.safevoice.controller.Member.VerifyIdentityService;
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
	    map.put("/test/SendPush.do", new SendPushNotificationService());
	    map.put("SaveSubscription.do", new SaveSubscriptionService());
	    map.put("InputFile.do", new InputFileService());
	    map.put("RepeatAlert.do", new RepeatAlertService());
	    map.put("StopNotification.do", new StopNotificationService());
	    map.put("GetAlertHistory.do", new GetAlertHistoryService());
	    map.put("MenuMain.do", new MenuMainService());
	    map.put("MainPageChild.do", new MainPageChildService());
	    map.put("ModifyMember.do", new ModifyMemberService());
	    
	}

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		

		String uri = request.getRequestURI();

		String cp = request.getContextPath();

		String finalPath = uri.substring(cp.length() + 1);

		request.setCharacterEncoding("UTF-8");
		
//		String email = request.getParameter("email");
		
		

		String moveUrl = "";
		Command com = null;

		com = map.get(finalPath);

		if (com != null) {
			moveUrl = com.execute(request, response);
		}

		if (moveUrl == null) {

		} else if (moveUrl.contains("redirect:/")) {
			response.sendRedirect(moveUrl.substring(10));
		} else {

			if (finalPath.contains("Go")) {
				moveUrl = finalPath.replace("Go", "").replace(".do", ".jsp");
				RequestDispatcher rd = request.getRequestDispatcher("WEB-INF/" + moveUrl);
				rd.forward(request, response);
			}
		}
	}

}
