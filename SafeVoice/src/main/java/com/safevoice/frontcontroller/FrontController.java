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

import com.cloud.controller.Command;
import com.cloud.controller.EmailCheckService;
import com.cloud.controller.JoinService;
import com.cloud.controller.LoginService;
import com.cloud.controller.LogoutService;
import com.cloud.controller.SelectAllService;
import com.cloud.controller.UpdateService;

@WebServlet("*.do")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private HashMap<String, Command> map = new HashMap<String, Command>();

	@Override
	public void init() throws ServletException {
		map.put("Join.do", new JoinService());
		map.put("Login.do", new LoginService());
		map.put("Logout.do", new LogoutService());
	}

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String uri = request.getRequestURI();

		String cp = request.getContextPath();

		String finalPath = uri.substring(cp.length() + 1);

		request.setCharacterEncoding("UTF-8");

		String moveUrl = "";
		Command com = null;

		com = map.get(finalPath);

		if (com != null) {
			moveUrl = com.execute(request);
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
