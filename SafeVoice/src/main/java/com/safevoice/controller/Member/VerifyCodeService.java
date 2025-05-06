package com.safevoice.controller.Member;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Member;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.safevoice.controller.Command;
import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;


public class VerifyCodeService implements Command {
	
	// 자녀 연결 (자녀 메일로 간 코드랑 입력한 코드 일치하는지 확인)
	
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		String realCode = (String) session.getAttribute("realCode");
		String inputCode = request.getParameter("inputCode");
        String loginId = (String) session.getAttribute("loginId");
        String receiverId = (String) session.getAttribute("receiverId");
        
        MemberDAO mdao = new MemberDAO();
		
        try {
        	
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            
            

            if (realCode != null && realCode.equals(inputCode)) {
                MemberVO vo = new MemberVO();
                vo.setId(loginId);           // 기준 ID
                vo.setChildId(receiverId); // 업데이트 대상

                int row = mdao.updateFamilyCd(vo); // SQL에서 family_cd 지정 처리

                if (row > 0) {
                    out.println("<script>");
                    out.println("alert('인증 성공! 가족으로 연결되었습니다.');");
                    out.println("location.href = 'MenuMain.jsp';");
                    out.println("</script>");
                } else {
                    out.println("<script>");
                    out.println("alert('가족 등록에 실패했습니다.');");
                    out.println("history.back();");
                    out.println("</script>");
                }
            } else {
                out.println("<script>");
                out.println("alert('인증 코드가 일치하지 않습니다.');");
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