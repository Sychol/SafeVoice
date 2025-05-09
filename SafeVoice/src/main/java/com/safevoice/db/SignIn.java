package com.safevoice.db;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * /users/duplicated/0?str={username} → {"success":true} 사용 가능 →
 * {"success":false,"msg":"이미 사용 중인 아이디입니다."}
 */
@WebServlet("/users/duplicated/0")
public class SignIn extends HttpServlet {
	// JDBC 접속 정보 (테스트용)
	private static final String JDBC_URL = "jdbc:mysql://localhost:3306/your_database?useSSL=false&serverTimezone=UTC";
	private static final String JDBC_USER = "db_user";
	private static final String JDBC_PASSWORD = "db_password";

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 1) 요청 파라미터
		String username = req.getParameter("str");
		boolean exists = false;

		// 2) DB 조회
		try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
				PreparedStatement ps = conn.prepareStatement("SELECT COUNT(*) FROM users WHERE username = ?")) {

			ps.setString(1, username);
			try (ResultSet rs = ps.executeQuery()) {
				if (rs.next() && rs.getInt(1) > 0) {
					exists = true;
				}
			}
		} catch (SQLException e) {
			// 실제 운영에선 로깅 프레임워크 이용
			e.printStackTrace();
			resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}

		// 3) JSON 응답
		resp.setContentType("application/json; charset=UTF-8");
		PrintWriter out = resp.getWriter();
		if (resp.getStatus() == HttpServletResponse.SC_INTERNAL_SERVER_ERROR) {
			out.write("{\"success\":false,\"msg\":\"서버 오류가 발생했습니다.\"}");
		} else if (exists) {
			out.write("{\"success\":false,\"msg\":\"이미 사용 중인 아이디입니다.\"}");
		} else {
			out.write("{\"success\":true}");
		}
		out.flush();
	}

	@Override
	public void init() throws ServletException {
		super.init();
		try {
			// MySQL 드라이버 로드 (필요시)
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			throw new ServletException(e);
		}
	}
}
