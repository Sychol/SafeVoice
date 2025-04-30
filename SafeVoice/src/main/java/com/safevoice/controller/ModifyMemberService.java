package com.safevoice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;

public class ModifyMemberService implements Command {

    public String execute(HttpServletRequest request, HttpServletResponse response) {
        String id = request.getParameter("id");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String address = request.getParameter("address");
        String pw = request.getParameter("pw");
        String confirmPw = request.getParameter("confirmPw");

        MemberVO mvo = new MemberVO();
        mvo.setId(id); // WHERE 조건 걸 id
        
        // 
        
        if (email != null && !email.isBlank()) {
            mvo.setEmail(email);
        }

        if (phone != null && !phone.isBlank()) {
            mvo.setPhone(phone);
        }

        if (address != null && !address.isBlank()) {
            mvo.setAddress(address);
        }

        if (pw != null && !pw.isBlank()) {
            if (pw.equals(confirmPw)) {
                mvo.setPw(pw);
            } else {
                request.setAttribute("errorMsg", "비밀번호가 일치하지 않아요!");
                return "GoModifyMember.do";
            }
        }

        int row = new MemberDAO().updateMember(mvo);

        if (row > 0) {
            request.setAttribute("successMsg", "회원 정보 수정 완료");
            return "Gomypage.do"; // 마이페이지로 이동
        } else {
            request.setAttribute("FailMsg", "수정 실패");
            return "GoModifyMember.do";
        }
    }

}
