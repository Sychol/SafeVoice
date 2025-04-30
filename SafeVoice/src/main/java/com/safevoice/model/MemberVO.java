package com.safevoice.model;

public class MemberVO {
	
	String email;
	String id;
	String pw;
	String name;
	String birth;
	String tel;
	String postcode;
	String address;
	String detailAddress;
	String gender;
	String familyCode;
	String div;
	String ChildId;
	
	public MemberVO(String email, String id, String pw, String name, String birth, String tel, String postcode,
			String address, String detailAddress, String gender, String familyCode, String div) {
		super();
		this.email = email;
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.birth = birth;
		this.tel = tel;
		this.postcode = postcode;
		this.address = address;
		this.detailAddress = detailAddress;
		this.gender = gender;
		this.familyCode = familyCode;
		this.div = div;
	}
	
	public MemberVO() {
		
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDetailAddress() {
		return detailAddress;
	}

	public void setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getFamilyCode() {
		return familyCode;
	}

	public void setFamilyCode(String familyCode) {
		this.familyCode = familyCode;
	}

	public String getDiv() {
		return div;
	}

	public void setDiv(String div) {
		this.div = div;
	}

	public String getChildId() {
		return ChildId;
	}

	public void setChildId(String childId) {
		ChildId = childId;
	}

	
	
}
