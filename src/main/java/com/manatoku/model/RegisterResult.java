package com.manatoku.model;

public class RegisterResult {
	private boolean success;
	private String message;
	private Member member;
	
	private RegisterResult(boolean success, String message, Member member) {
		this.success = success;
		this.message = message;
		this.member = member;
	}
	
	public static RegisterResult success(Member member) {
        member.setPass(""); // 비밀번호 제거
        return new RegisterResult(true, null, member);
    }

    public static RegisterResult fail(String message, Member member) {
    	member.setPass("");
        return new RegisterResult(false, message, member);
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
