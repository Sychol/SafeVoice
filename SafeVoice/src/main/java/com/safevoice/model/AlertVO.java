package com.safevoice.model;

public class AlertVO {

	String memberId;
	String alertType;
	String rat;
	String lon;
	String alertContext;
	
	public AlertVO(String memberId, String alertType, String rat, String lon, String alertContext) {
		super();
		this.memberId = memberId;
		this.alertType = alertType;
		this.rat = rat;
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

	public String getRat() {
		return rat;
	}

	public void setRat(String rat) {
		this.rat = rat;
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
