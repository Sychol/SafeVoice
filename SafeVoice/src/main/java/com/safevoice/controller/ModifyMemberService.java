package com.safevoice.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ModifyMemberService implements Command {
	
	public String execute (HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// 비밀번호변경 / 이메일 / 전화번호 / 주소 <-- 얘네만 바꾸는거죠?
		return null;
		
	}
       

}
