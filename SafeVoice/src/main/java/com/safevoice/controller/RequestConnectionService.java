package com.safevoice.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jakarta.mail.*;
import jakarta.mail.internet.*;

import com.safevoice.db.MemberDAO;


public class RequestConnectionService implements Command {
	
	// 자녀 연결 (자녀에게 인증번호 (메일) 보내기)
	
	public String execute (HttpServletRequest request, HttpServletResponse response) throws IOException{
        String id = request.getParameter("id");
        String email = request.getParameter("email");
        
        MemberDAO mdao = new MemberDAO();
        // dao 실행
//        int row = mdao.sendCode(id, email);
        int row = 0;
        
		if (row > 0) {
			String code = String.valueOf((int)((Math.random() * 900000) + 100000)); // 랜덤 6자리 수 생성
//			mdao.saveCode(id, code);
			
            String fromEmail = "j200chi@gmail.com"; // 메일 보내는 사람 (나) 이메일
            String appPassword = "jmrtsbrncmqeikjj"; // 2단계 인증 앱 비밀번호 (일회용)
			
			Properties props = new Properties(); // 이거 걍 SMTP 서버 설정 코드
            props.put("mail.smtp.host", "smtp.gmail.com"); // host -> gmail
            props.put("mail.smtp.port", "587"); // port -> 587 (Gmail이 TLS 보안 연결에 사용하는 포트 번호)
            props.put("mail.smtp.auth", "true"); // 인증 필요 여부
            props.put("mail.smtp.starttls.enable", "true"); // 보안 연결 사용할 거임? -> 넹 (이러면 암호화돼서 전송)
            
            Session session = Session.getInstance(props, new Authenticator() { // 로그인 정보 전달
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(fromEmail, appPassword); // 이메일 / 비밀번호 보내주기 (로그인)
                }
            });
            
            try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(fromEmail)); // 발신자
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email)); // 수신자
                message.setSubject("인증번호 안내"); // 제목
                message.setText("인증번호는 " + code + " 입니다."); // 내용
                Transport.send(message); // 보내기!
                HttpSession codeSession = request.getSession();
                codeSession.setAttribute("realCode", code); // code Session에 저장
            } catch (MessagingException e) {
                e.printStackTrace();
                response.setContentType("text/html; charset=UTF-8");
                PrintWriter out = response.getWriter();
                out.println("<script>");
                out.println("alert('이메일 전송 실패! 이메일 주소나 네트워크를 확인해주세요.');");
                out.println("history.back();");
                out.println("</script>");
                out.flush(); // 이거 안 하면 버퍼에만 남고 브라우저에 안 뜰 수 있어서 해야 함
                return null; 
            }

            request.setAttribute("id", id); // 이메일 전송 성공시 EnterCode로 이동하면서 수신자 id 넘겨주기
            return "EnterCode.jsp";
        } else { // 입력한 id / email 일치하는 사용자 없을 경우
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();

            out.println("<script>");
            out.println("alert('입력하신 ID와 이메일이 일치하는 사용자가 없어요! 다시 확인해주세요!');");
            out.println("history.back();");
            out.println("</script>");
            out.flush();

            return null;
        }
 
		
	}

}
