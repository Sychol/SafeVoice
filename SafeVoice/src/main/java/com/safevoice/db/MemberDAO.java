package com.safevoice.db;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.safevoice.model.MemberVO;

public class MemberDAO {

	private SqlSessionFactory factory = MySqlSessionManager.getFactory();

	public int signIn() {

		SqlSession sqlsession = factory.openSession(true);
	//	int row = sqlsession.insert("join", member);
		return 1;
	}
	
	
	public int login(MemberVO mvo) {

		return 1;
	}

	public void logout() {
		
	}
	
	public void setFamilyCode() {
		
	}
	
	public void matchChild() {
		
	}
	
	public void update(MemberVO paravo) {

	}
	
	public void findPw() {

	}
	
	public void signOut() {
		
	}


	public MemberVO findUser(String userId, String phone) {
		// TODO Auto-generated method stub
		return null;
	}


}
