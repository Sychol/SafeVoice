package com.safevoice.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.db.MemberDAO;


public class RequestConnectionService implements Command {
	
	public String execute (HttpServletRequest request, HttpServletResponse response) throws IOException{
        String id = request.getParameter("id");
        String email = request.getParameter("email");
        
        MemberDAO mdao = new MemberDAO();
        // dao 실행
        
        
		
		
		return null;
	}

}
