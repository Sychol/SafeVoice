package com.safevoice.controller;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.safevoice.controller.Command;
import com.safevoice.model.MemberVO;
import com.safevoice.db.MemberDAO;

public class SignInService implements Command {
	
	public String execute(HttpServletRequest request) {
				
		String email = request.getParameter("email");
		String id = request.getParameter("id"); 
		String pw = request.getParameter("pw"); 
		String name = request.getParameter("name");
		String birth = request.getParameter("birth");
		String tel = request.getParameter("tel");
		String postcode = request.getParameter("postcode");
		String address = request.getParameter("address");
		String detailAddress = request.getParameter("detailAddress");
		String extraAddress = request.getParameter("extraAddress");
		String gender = request.getParameter("gender");
		String pTel = request.getParameter("pTel"); // 가족 번호
		String pOrC = request.getParameter("pOrC"); // 부모자녀선택
		
		MemberVO member = new MemberVO(email, id, pw, name, birth, tel, postcode, address, detailAddress, extraAddress, gender, pTel, pOrC);
		
		MemberDAO dao = new MemberDAO();
		
		int row = dao.SignIn(member);
		
		if (row > 0) {
			return "MenuMain.do";
		} else {
			return "redirect:/MenuMain.do";
		}
	}

}