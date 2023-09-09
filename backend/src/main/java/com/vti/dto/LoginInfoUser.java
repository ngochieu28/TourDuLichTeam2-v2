package com.vti.dto;

import lombok.Data;

@Data
public class LoginInfoUser {

	private String token;

	private String userName;

	private String email;

	private String firstName;

	private String lastName;

	private String role;

	private String status;

	private Integer userId ;

	public LoginInfoUser(String token, String userName, String email, String firstName, String lastName, String role,
			String status , Integer userId) {
		this.token = token;
		this.userName = userName;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.status = status;
		this.userId = userId;
	}


}
