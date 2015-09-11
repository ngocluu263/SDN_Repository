package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "UserDetailsDto")
public class UserDetailsDto {

	private String userId;
	private String name;
	private String username;
	private String password;
	private String emailId;
	private String userType;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	@Override
	public String toString() {
		return "UserDetailsDto [userId="+userId+", name=" + name + ", username=" + username
				+ ", password=" + password + ", emailId=" + emailId
				+ ", userType=" + userType + "]";
	}

}
