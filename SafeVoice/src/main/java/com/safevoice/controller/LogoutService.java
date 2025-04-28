package com.safevoice.controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.safevoice.controller.Command;

public class LogoutService implements Command {
	
	public String execute (HttpServletRequest request) {

		HttpSession session = request.getSession();

		session.invalidate();

		return "redirect:/Gomain.do";

	
	}

}

