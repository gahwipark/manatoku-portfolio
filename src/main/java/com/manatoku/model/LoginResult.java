package com.manatoku.model;

public class LoginResult {
	private boolean success;
	private String message;
	private Member member;
	
	private LoginResult(boolean success, String message, Member member) {
		this.success = success;
		this.message = message;
		this.member = member;
	}
	
	public static LoginResult success(Member member) {
        member.setPass(""); // 비밀번호 제거
        return new LoginResult(true, null, member);
    }

    public static LoginResult fail(String message) {
        return new LoginResult(false, message, null);
    }

	public boolean isSuccess() {
		return success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}
}
