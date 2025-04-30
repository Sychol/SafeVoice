package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class LoginService implements Command {
	
	public String execute (HttpServletRequest request, HttpServletResponse response) {

		String id = request.getParameter("id"); 
		String pw = request.getParameter("pw"); 

		MemberVO mvo = new MemberVO();
		mvo.setId(id);
		mvo.setPw(pw);

		MemberDAO mdao = new MemberDAO();

		MemberVO resultVo = mdao.login(mvo);
		
		if (resultVo != null) {
			HttpSession session = request.getSession();
			session.setAttribute("loginMember", resultVo);
		} else {
		}
		return "redirect:/login.do"; // 여기 수정해야됨!

		
	}

}
