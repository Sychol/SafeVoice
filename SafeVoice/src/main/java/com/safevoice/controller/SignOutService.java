package com.safevoice.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class SignOutService extends HttpServlet implements Command {
	private static final long serialVersionUID = 1L;
       
	public String execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
        
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
        MemberDAO mdao = new MemberDAO();
        MemberVO mvo = new MemberVO();
        mvo.setId(id);
        mvo.setPw(pw);
        int row = mdao.signOut(mvo);

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();

        if (row > 0) {
            // 로그아웃 처리
            HttpSession session = request.getSession();
            session.invalidate();

            out.println("<script>");
            out.println("alert('회원 탈퇴 완료 💙');");
            out.println("location.href='GoLogin.do';");
            out.println("</script>");
        } else {
            out.println("<script>");
            out.println("alert('회원 탈퇴 실패 😢');");
            out.println("history.back();");
            out.println("</script>");
        }

        return null; // alert 후 리다이렉트 완료니까 null
        }
    }
