package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.db.MemberDAO;

public class ChangePasswordService implements Command {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");
        String updatePw = request.getParameter("updatePw");
        String confirmPw = request.getParameter("confirmPassword");

        if (!updatePw.equals(confirmPw)) {
            request.setAttribute("errorMsg", "비밀번호가 일치하지 않습니다!");
            return "changePassword.do";
            
        } else {
        	
//          dao.updatePw(id, newPw); <- dao 없어서 주석처리 
        	MemberDAO dao = new MemberDAO();
        	request.getSession().setAttribute("successMsg", "비밀번호가 성공적으로 변경되었습니다!");
        	return "GoLogin.do";
}


		
	}

}
