package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;

import com.safevoice.model.MemberVO;
import com.safevoice.db.MemberDAO;

public class SignInService implements Command {
	
	public String execute(HttpServletRequest request) {
				
		String id = request.getParameter("id"); 
		String div = request.getParameter("div"); // 부모자녀선택
		String pw = request.getParameter("pw"); 
		String email = request.getParameter("email");
		String name = request.getParameter("name");
		String birth = request.getParameter("birth");
		String tel = request.getParameter("tel");
		String postcode = request.getParameter("postcode");
		String address = request.getParameter("address");
		String detailAddress = request.getParameter("detailAddress");
		String extraAddress = request.getParameter("extraAddress");
		String gender = request.getParameter("gender");
		String familyCode = request.getParameter("familyCode"); // 가족 번호
		
//		MemberVO member = new MemberVO(email, id, pw, name, birth, tel, postcode, address, detailAddress, extraAddress, gender, familyCode, div);
		
		System.out.println(email);
		System.out.println(id);
		System.out.println(pw);
		System.out.println(name);
		System.out.println(birth);
		System.out.println(tel);
		System.out.println(postcode);
		System.out.println(address);
		System.out.println(detailAddress);
		System.out.println(extraAddress);
		System.out.println(gender);
		System.out.println(familyCode);
		System.out.println(div);
		
//		System.out.println(member);
		
//		MemberDAO dao = new MemberDAO();
//		
//		int row = dao.join(member);
		
		int row = 1;

		if (row > 0) {
			return "SignIn.do";
		} else {
			return "redirect:/MenuMain.do";
		}
	}

}