package com.safevoice.controller.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.safevoice.controller.Command;
public class LogoutService implements Command {
	
	public String execute (HttpServletRequest request, HttpServletResponse response) {
		
		// 로그아웃

		HttpSession session = request.getSession(false);
		if (session != null) {
            // 🚨 메시지 따로 저장!
            String logoutMsg = "👋 로그아웃이 완료되었습니다!";
            session.invalidate();

            // 👉 새 세션 만들어 메시지 저장!
            session = request.getSession(true);
            session.setAttribute("logoutMsg", logoutMsg);
        }

        return "redirect:/GoLogin.do";
    }

}

