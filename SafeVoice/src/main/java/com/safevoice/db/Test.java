package com.safevoice.db;
import com.safevoice.model.MemberVO;

public class Test {
	
		public static void main(String[] args) {
			String id = "test";
			String div = "test";
			String pw = "test";
			String name = "test";
			String tel = "test";
			String email = "test";
			String birth = "test";
			String gender = "test";
			String address = "test";
			String ptel = "test";
			
			MemberVO member = new MemberVO(id, pw, name, tel, email, gender, address, ptel);
			
			MemberDAO dao = new MemberDAO();
			
			int row = dao.join(member);
			
			if (row > 0) {
				System.out.println("성공");
			} else {
				System.out.println("실패");
			}
			
		}
		
}
