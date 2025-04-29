package com.safevoice.controller;

import javax.mail.*;
import javax.mail.internet.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Properties;

@WebServlet("/sendEmail.do")
public class FindPassword extends HttpServlet implements Command {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String host = "smtp.gmail.com"; // SMTP 서버 (예: gmail)
        String username = "your_email@gmail.com"; // 보내는 사람 이메일
        String password = "your_app_password"; // 앱 비밀번호 써야 함!

        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587"); // TLS 포트
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(userEmail));
            message.setSubject("비밀번호 재설정 링크입니다");

            // 보낼 링크에 토큰이나 이메일 주소를 같이 보내야 함
            String resetLink = "http://localhost:8080/yourProject/resetPasswordForm.jsp?email=" + userEmail;
            message.setText("비밀번호 재설정을 원하시면 아래 링크를 클릭하세요:\n" + resetLink);

            Transport.send(message);
            System.out.println("이메일 전송 완료!");

            response.sendRedirect("emailSent.jsp"); // 이메일 보냈다고 알려주는 페이지로 이동

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

	@Override
	public String execute(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
}