package com.safevoice.controller.Alert;

import java.io.BufferedReader;
import java.util.stream.Collectors;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.safevoice.controller.Command;

public class SaveSubscriptionService implements Command {
    public static String lastSubscriptionJson = "";

    public String execute(HttpServletRequest request, HttpServletResponse response) {
    	
    	try {
            System.out.println("🔥 SaveSubscriptionService 진입!!"); // 💥 로그 1
            BufferedReader reader = request.getReader();
            String json = reader.lines().collect(Collectors.joining());
            System.out.println("📦 받은 JSON: " + json); // 💥 로그 2

            lastSubscriptionJson = json;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
