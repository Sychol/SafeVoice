package com.safevoice.model;

public class AlertVO {

	String memberId; // 참조한 멤버 아이디
	String alertType; // 알림 타입 -> SOS, 경고, 위험, 심각 등
	String alertTime; // 알림 시간
	String lat; // 위도 = latitude
	String lon; // 경도 = longitude
	String alertContext;
	
	public AlertVO(String memberId, String alertType, String alertTime, String lat, String lon, String alertContext) {
		super();
		this.memberId = memberId;
		this.alertType = alertType;
		this.alertTime = alertTime;
		this.lat = lat;
		this.lon = lon;
		this.alertContext = alertContext;
	}
	
	public AlertVO() {
		
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getAlertType() {
		return alertType;
	}

	public void setAlertType(String alertType) {
		this.alertType = alertType;
	}

	public String getAlertTime() {
		return alertTime;
	}

	public void setAlertTime(String alertTime) {
		this.alertTime = alertTime;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getAlertContext() {
		return alertContext;
	}

	public void setAlertContext(String alertContext) {
		this.alertContext = alertContext;
	}
	
}
