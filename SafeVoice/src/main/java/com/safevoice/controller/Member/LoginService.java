package com.safevoice.controller.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.safevoice.controller.Command;
import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class LoginService implements Command {
	
	public String execute (HttpServletRequest request, HttpServletResponse response) {
		
		// 로그인

		String id = request.getParameter("id"); 
		String pw = request.getParameter("pw"); 

		MemberVO mvo = new MemberVO();
		mvo.setId(id);
		mvo.setPw(pw);

		MemberDAO mdao = new MemberDAO();

		MemberVO resultVo = mdao.login(mvo);
		
		if (resultVo != null) {
			HttpSession session = request.getSession();
			session.setAttribute("loginMember", resultVo); // 로그인한 회원 정보
			session.setAttribute("loginId", resultVo.getId()); // 로그인한 회원의 아이디
		} else {
		}
		return "redirect:/login.do"; // 여기 수정해야됨!

		
	}

}
