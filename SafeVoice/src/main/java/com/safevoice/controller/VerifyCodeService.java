package com.safevoice.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class VerifyCodeService implements Command {
	
	// 자녀 연결 (자녀 메일로 간 코드랑 입력한 코드 일치하는지 확인)
	
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		String realCode = (String) session.getAttribute("realCode");
		String inputCode = request.getParameter("inputCode");
		
        try {
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();

        if (inputCode.equals(realCode)) { // 입력한 코드 = 진짜 코드
            out.println("<script>");
            out.println("alert('인증 성공');");
            out.println("location.href = 'MenuMain.jsp';"); // 성공하면 어디로 가는 게 좋을까요...?
            out.println("</script>");
            
        } else {

            out.println("<script>");
            out.println("alert('인증 실패');");
            out.println("history.back();");
            out.println("</script>");
        }
        out.flush();
    } catch (IOException e) {
        e.printStackTrace();
    }

    return null;
}
}