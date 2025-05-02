package com.safevoice.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.safevoice.model.MemberVO;

public class MemberDAO {

	private SqlSessionFactory factory = MySqlSessionManager.getFactory();

	// 회원 가입
	public int signIn(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.insert("signIn", member);
		sqlsession.close();
		return row;
	}
	
	// 로그인에서는 세션에 저장할 정보를 받아야 하기 때문에 
	// resultVO 객체 형식으로 데이터를 받아 리턴한다.
	public MemberVO login(MemberVO mvo) {
		
		SqlSession sqlsession = factory.openSession(true);
		MemberVO resultVO = sqlsession.selectOne("login", mvo);
		sqlsession.close();
		return resultVO;
	}
	
	// 아이디 중복 확인
	public Integer idDuplicateCheck(String id) { 
		SqlSession sqlsession = factory.openSession(true);
		Integer count = sqlsession.selectOne("idDuplicateCheck", id);
		sqlsession.close();
		return (count != null) ? count : 0;
	}

	// 회원정보 수정
	public int updateMember(MemberVO paravo) { 
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.update("updateMember", paravo);
		sqlsession.close();
		return row;

	}
	
	// 패밀리 코드 갱신
	public int updateFamilyCd(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.update("updateFamilyCd", member);
		sqlsession.close();
		return row;
	}
	
	// 회원 탈퇴
	public int signOut(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.delete("signOut", member);
		sqlsession.close();
		return row;
	}

	// 비밀번호 수정 - 아이디 확인하기
	// Integer 변수로 변환하지 않아도 괜찮은지 연결해서 확인해야 함
	public int findMember(MemberVO member) {
		
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.selectOne("findMember", member);
		sqlsession.close();	    
	    return row;

	}
	
	// 비밀번호 수정 - 비밀번호 갱신
	public int updatePw(MemberVO member) {
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.update("updatePw", member);
		sqlsession.close();
		return row;
	}

}
