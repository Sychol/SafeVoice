package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
public class LogoutService implements Command {
	
	public String execute (HttpServletRequest request, HttpServletResponse response) {
		
		// 로그아웃

		HttpSession session = request.getSession();

		session.invalidate();

		return "redirect:/GoLogin.do";

	
	}

}

