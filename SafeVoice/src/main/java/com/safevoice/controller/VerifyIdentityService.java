package com.safevoice.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class VerifyIdentityService implements Command {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	// 아이디 / 비밀번호 / 전화번호 입력받기
    	String id = request.getParameter("id");
    	String currentPw = request.getParameter("currentPw");
        String tel = request.getParameter("tel");
        
        // 유저 정보 불러오기
        MemberDAO dao = new MemberDAO();
        MemberVO user = dao.findUser(id, tel);

        
        // 입력받은 정보가 기존 정보랑 동일한지 확인
        if (user != null && user.getPw().equals(currentPw)) {
        	// 동일
            request.setAttribute("id", id);
            request.getRequestDispatcher("FindPassword.jsp").forward(request, response);
        } else {
            // 틀렸어!
            response.sendRedirect("verifyIdentity.jsp?error=true");
        }
    }

	@Override
	public String execute(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
}