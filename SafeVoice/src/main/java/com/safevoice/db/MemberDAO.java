package com.safevoice.db;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.safevoice.model.MemberVO;

public class MemberDAO {

	private SqlSessionFactory factory = MySqlSessionManager.getFactory();

	public int join(MemberVO member) {

		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.insert("join", member);
		return row;
	}

	public int login(MemberVO mvo) {

		return 1;
	}

	public void pTelGrant() {
		
	}
	
	public void selectAllMember() {

	}

	public void update(MemberVO paravo) {

	}
	
	public void findPw() {

	}
	
	

}
