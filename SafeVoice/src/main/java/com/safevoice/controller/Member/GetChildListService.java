package com.safevoice.controller.Member;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.safevoice.controller.Command;
import com.safevoice.db.MemberDAO;
import com.safevoice.model.MemberVO;


public class GetChildListService implements Command {

	public String execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// 조회하려는 사람의 아이디를 session 에서 가져오기
		// 일단은 id를 ID11로 고정
		String id = (String) request.getSession().getAttribute("loginId");
		//String id = "ID11";
		
		// memberDAO 생성
		MemberDAO dao = new MemberDAO();
		
		// dao 의 getChildList 메서드를 실행시키고 결과값을 list 에 저장
		
		List<MemberVO> childList = dao.getChildList(id);
		
		// List 형태로 온 데이터를 json 형식으로 변경
		Gson gson = new Gson();
		String childJson = gson.toJson(childList);
		
		response.setContentType("applicaton/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(childJson);
		
		return null;
	}

}
