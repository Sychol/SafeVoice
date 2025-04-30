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
        String tel = request.getParameter("tel");
        
        // 유저 정보 불러오기
        MemberDAO dao = new MemberDAO();
        MemberVO vo = new MemberVO();
        vo.setId(id);
        vo.setTel(tel);
        
        // dao.findMember 실행
        int row = dao.findMember(vo);
        
        // 입력한 아이디 / 전화번호 > 해당하는 유저 있나 확인
        if (row != 0) {
        	// 동일
            request.setAttribute("id", id);
            response.sendRedirect("changePassword.do"); //?id=" + id);
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