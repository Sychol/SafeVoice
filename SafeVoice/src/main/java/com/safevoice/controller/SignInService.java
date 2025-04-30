package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class SignInService implements Command {

	public String execute(HttpServletRequest request, HttpServletResponse response) {
				
		String id = request.getParameter("id"); // 아이디
		String memType = request.getParameter("memType"); // 부모자녀선택
		String pw = request.getParameter("pw"); // 비밀번호
		String email = request.getParameter("email"); // 이메일
		String name = request.getParameter("name"); // 이름
		String birthDate = request.getParameter("birthDate"); // 생년월일
		String phone = request.getParameter("phone"); // 전화번호
		String postcode = request.getParameter("postcode"); // 우편번호
		String address = request.getParameter("address"); // 주소
		String detailAddress = request.getParameter("detailAddress"); // 상세주소
		String gender = request.getParameter("gender");
		String familyCode = request.getParameter("familyCode"); // 가족 번호
		
		MemberVO member = new MemberVO(email, id, pw, name, birthDate, phone, postcode, address, detailAddress, gender, familyCode, memType);

		System.out.println(email);
		System.out.println(id);
		System.out.println(pw);
		System.out.println(name);
		System.out.println(birthDate);
		System.out.println(phone);
		System.out.println(postcode);
		System.out.println(address);
		System.out.println(detailAddress);
		System.out.println(gender);
		System.out.println(familyCode);
		System.out.println(memType);
		
		System.out.println(member);
		
		MemberDAO mdao = new MemberDAO();

		int row = mdao.signIn(member);

		if (row > 0) {
			return "SignIn.do";
		} else {
			return "redirect:/MenuMain.do";
		}
	}

}