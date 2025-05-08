	package com.safevoice.controller.Alert;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.controller.Command;

public class SaveSubscriptionService implements Command {
    public static String lastSubscriptionJson = "";

    public String execute(HttpServletRequest request, HttpServletResponse response) {
    	
    	response.setContentType("text/html; charset=UTF-8");
    	response.setCharacterEncoding("UTF-8");
    	
    	 try {
    	        // 🔧 응답 인코딩 설정
    	        response.setContentType("text/html; charset=UTF-8");
    	        response.setCharacterEncoding("UTF-8");

    	        // 🔍 진입 로그
    	        System.out.println("📥 SaveSubscriptionService: 구독 정보 받는 중!");

    	        // 🔍 JSON 데이터 읽기
    	        BufferedReader reader = request.getReader();
    	        String json = reader.lines().collect(Collectors.joining());

    	        // ✅ 저장해두기
    	        lastSubscriptionJson = json;

    	        // 🔍 확인용 출력
    	        System.out.println("📦 받은 구독 JSON: " + json);

    	        response.getWriter().write("💌 구독 정보 저장 완료!");
    	    } catch (Exception e) {
    	        e.printStackTrace();
    	        try {
    	            response.getWriter().write("💥 에러 발생: " + e.getMessage());
    	        } catch (IOException ignored) {}
    	    }
    	    return null;
    	}
}