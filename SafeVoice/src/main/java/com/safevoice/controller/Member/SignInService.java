package com.safevoice.controller.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.controller.Command;
import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class SignInService implements Command {
	
	// 회원가입

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
		
		MemberVO member = new MemberVO();
		member.setId(id);
		member.setMemType(memType);
		member.setPw(pw);
		member.setEmail(email);
		member.setName(name);
		member.setBirthDate(birthDate);
		member.setPhone(phone);
		member.setPostcode(postcode);
		member.setAddress(address);
		member.setDetailAddress(detailAddress);
		member.setGender(gender);

		MemberDAO mdao = new MemberDAO();

		int row = mdao.signIn(member);

		if (row > 0) {
			return "GoLogin.do";
		} else {
			return "SignIn.do";
		}
	}

}