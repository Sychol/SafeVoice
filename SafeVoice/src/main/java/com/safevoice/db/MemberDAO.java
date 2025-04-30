package com.safevoice.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.safevoice.model.MemberVO;

public class MemberDAO {

	private SqlSessionFactory factory = MySqlSessionManager.getFactory();

	public int signIn(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.insert("SignIn", member);
		return row;
	}
	
	
	public MemberVO login(MemberVO mvo) {
		
		SqlSession sqlsession = factory.openSession(true);
		MemberVO resultVO = sqlsession.selectOne("Login", mvo);
		sqlsession.close();
		return resultVO;
	}
	
	public void idDuplicateCheck() { // 아이디중복체크
		
	}

//	public int SetFamilyCode(MemberVO family)  {
//		SqlSession sqlsession = factory.openSession(true);
//		int row = sqlsession.update("SetFamilyCode",family);
//		return row;
//	}
	
	public void fcDuplicateCheck() {
		
	}

	public void fcNullCheck() {
		
	}
	
	public void matchChild() {
		
	}
	

	public void update(MemberVO paravo) {
		
		SqlSession sqlsession = factory.openSession(true);
//		int row = sqlsession.update("");

	}
	
	public void findPw() {
		
		SqlSession sqlsession = factory.openSession(true);
		
	}
	
	public int signOut(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.delete("signOut", member);
		return row;
	}


	public int findMember(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.selectOne("findMember", member);
	    	    
	    return row;

	}

}
