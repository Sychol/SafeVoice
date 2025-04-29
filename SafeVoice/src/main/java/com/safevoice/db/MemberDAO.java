package com.safevoice.db;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.safevoice.model.MemberVO;

public class MemberDAO {

	private SqlSessionFactory factory = MySqlSessionManager.getFactory();

	public int SignIn(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.insert("SignIn", member);
		return row;
	}
	
	
	public MemberVO Login(MemberVO mvo) {
		
		SqlSession sqlsession = factory.openSession(true);
		MemberVO resultVO = sqlsession.selectOne("Login", mvo);
		sqlsession.close();
		return resultVO;
	}
	
	public void IdDuplicateCheck() {
		
	}

//	public int SetFamilyCode(MemberVO family)  {
//		SqlSession sqlsession = factory.openSession(true);
//		int row = sqlsession.update("SetFamilyCode",family);
//		return row;
//	}
	
	public void FcDuplicateCheck() {
		
	}

	public void FcNullCheck() {
		
	}
	
	public void MatchChild() {
		
	}
	
	public void Update(MemberVO paravo) {

	}
	
	public void FindPw() {
		
	}
	
	public int SignOut(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.delete("SignOut", member);
		return row;
	}

}
