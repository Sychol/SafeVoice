package com.safevoice.controller.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.controller.Command;
import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class ChangePasswordService implements Command {
	
	// 비밀번호 변경

	public String execute(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");
        String updatePw = request.getParameter("updatePw");
        String confirmPw = request.getParameter("confirmPassword");

        if (!updatePw.equals(confirmPw)) {
            request.setAttribute("errorMsg", "비밀번호가 일치하지 않습니다!");
            return "GoChangePassword.do";
        } 
        
        MemberVO vo = new MemberVO();
        vo.setId(id);
        vo.setPw(updatePw);

        MemberDAO dao = new MemberDAO();
        int row = dao.updatePw(vo);

        if (row > 0) {
            request.getSession().setAttribute("successMsg", "비밀번호가 성공적으로 변경되었습니다!");
            return "GoLogin.do";
        } else {
            request.setAttribute("errorMsg", "비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            return "GoChangePassword.do";
        }		
	}

}
