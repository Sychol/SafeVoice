package com.safevoice.db;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.safevoice.model.AlertVO;
import com.safevoice.model.MemberVO;

public class AlertDAO {

	private SqlSessionFactory factory = MySqlSessionManager.getFactory();
	
	// 조회하려는 아이디에 따른 모든 Alert 를 확인하는 메서드 
	public List<AlertVO> getAlertHistory(MemberVO member) {
		SqlSession sqlsession = factory.openSession(true);
		List<AlertVO> alertList = sqlsession.selectList("getAlertHistory", member);
		sqlsession.close();
		return alertList;
	}
	
	// 분석 결과를 DB에 입력하려는 메서드
	public int setAlertInfo(AlertVO alert) {
		SqlSession sqlsession = factory.openSession(true);
		int row = sqlsession.insert("setAlertInfo", alert);
		sqlsession.close();
		return row;
	}
	
	
}
