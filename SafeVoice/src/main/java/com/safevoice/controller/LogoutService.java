package com.safevoice.controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

@WebServlet("/LogoutService")
public class LogoutService extends HttpServlet implements Command {
	private static final long serialVersionUID = 1L;

	public String execute(HttpServletRequest request) {

		return null;
	}

}
