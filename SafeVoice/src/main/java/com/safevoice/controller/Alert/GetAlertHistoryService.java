package com.safevoice.controller.Alert;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.safevoice.controller.Command;
import com.safevoice.db.AlertDAO;
import com.safevoice.model.AlertVO;

public class GetAlertHistoryService implements Command {

	public String execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// 조회하려는 아이디를 session 에서 가져오기. 현재는 그냥 ID 1로 설정
		String id = (String) request.getSession().getAttribute("id");
		//String id = "ID 1";
		
		// AlertDAO 생성
		AlertDAO adao = new AlertDAO();
		
		// adao의 getAlertHistory 메서드를 실행시키고 결과값을 list에 저장
		List<AlertVO> alertList = adao.getAlertHistory(id);
		
		// List 형태로 온 데이터를 json 형식으로 변경
		Gson gson = new Gson();
		String alertJson = gson.toJson(alertList);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(alertJson);
		
		return null;
	}

}
