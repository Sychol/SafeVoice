package com.safevoice.controller;

//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.safevoice.controller.Command;
import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class LoginService implements Command {
	
	public String execute (HttpServletRequest request) {

		String id = request.getParameter("id"); 
		String pw = request.getParameter("pw"); 

		MemberVO mvo = new MemberVO();
		mvo.setId(id);
		mvo.setPw(pw);

//		MemberDAO dao = new MemberDAO();
//
//		MemberVO resultVo = dao.login(mvo);
		
		String resultVo = null;
		if (resultVo != null) {
			HttpSession session = request.getSession();
			session.setAttribute("loginvo", resultVo);
		} else {
		}
		return "redirect:/Gomain.do";

		
	}

}
