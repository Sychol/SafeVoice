package com.safevoice.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

@WebServlet("/JoinService")
public class JoinService extends HttpServlet implements Command {
	private static final long serialVersionUID = 1L;

	public String execute(HttpServletRequest request) {
		
		String id = "test";
		String pw = "test";
		String name = "test";
		String tell = "test";
		String email = "test";
		String gender = "test";
		String address = "test";
		String ptel = "test";
		
//		MemberVO member = new MemberVO(id, pw, name, tell, email, gender, address, ptel);
		
		MemberDAO dao = new MemberDAO();
		
//		int row = dao.join(member);
		int row = 1;
		
		if(row>0) {
			System.out.println("성공");
		}
		else {
			System.out.println("실패");
		}
		
		return null;
	}

}
