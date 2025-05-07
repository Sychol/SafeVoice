package com.safevoice.controller.Alert;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import com.safevoice.controller.Command;


public class InputFileService implements Command {
    public String execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	
    	String directory = "C:/Users/smhrd/Desktop/uploaded"; // 업로드된 파일이 저장될 디렉토리 위치

    	int sizeLimit = 100 * 1024 * 1024; // 100MB 제한
    	
    	MultipartRequest mtr = new MultipartRequest(request, directory, sizeLimit, "UTF-8", new DefaultFileRenamePolicy());
    	// 나중에 파일명같은거 혹시라도 꺼내 쓸 수 있으니까 일단 선언
    	
    	return null;
    }
}
