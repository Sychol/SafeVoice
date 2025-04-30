package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;

import com.safevoice.model.MemberVO;
import com.safevoice.db.MemberDAO;

public class SignInService implements Command {
	
	public String execute(HttpServletRequest request) {
				
		String id = request.getParameter("id"); // 아이디
		String div = request.getParameter("div"); // 부모자녀선택
		String pw = request.getParameter("pw"); // 비밀번호
		String email = request.getParameter("email"); // 이메일
		String name = request.getParameter("name"); // 이름
		String birth = request.getParameter("birth"); // 생년월일
		String tel = request.getParameter("tel"); // 전화번호
		String postcode = request.getParameter("postcode"); // 우편번호
		String address = request.getParameter("address"); // 주소
		String detailAddress = request.getParameter("detailAddress"); // 상세주소
		String extraAddress = request.getParameter("extraAddress");
		String gender = request.getParameter("gender");
		String familyCode = request.getParameter("familyCode"); // 가족 번호
		
		MemberVO member = new MemberVO(email, id, pw, name, birth, tel, postcode, address, detailAddress, extraAddress, gender, familyCode, div);
		
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
		
		System.out.println(member);
		
		MemberDAO dao = new MemberDAO();
		
		int row = dao.SignIn(member);
		
		if (row > 0) {
			return "SignIn.do";
		} else {
			return "redirect:/MenuMain.do";
		}
	}

}