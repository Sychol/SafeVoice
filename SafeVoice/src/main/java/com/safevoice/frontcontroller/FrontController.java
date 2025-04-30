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

import com.safevoice.controller.ChangePasswordService;
import com.safevoice.controller.Command;
import com.safevoice.controller.SignInService;
import com.safevoice.controller.SignOutService;
import com.safevoice.controller.VerifyIdentityService;
import com.safevoice.controller.LoginService;
import com.safevoice.controller.LogoutService;

@WebServlet("*.do")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private HashMap<String, Command> map = new HashMap<String, Command>();

	@Override
	public void init() throws ServletException {
		map.put("SignIn.do", new SignInService());
		map.put("Login.do", new LoginService());
		map.put("Logout.do", new LogoutService());
		map.put("ChangePassword.do", new ChangePasswordService());
		map.put("VerifyIdentity.do", new VerifyIdentityService());
		map.put("SignOut.do", new SignOutService());
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
