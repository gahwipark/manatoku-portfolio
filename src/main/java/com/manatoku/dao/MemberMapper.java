package com.manatoku.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.manatoku.model.Member;

public interface MemberMapper {
	
	/* 로그인 체크 */
	int checkId(@Param("id") String id); //가입된 아이디인지 확인

	int insertMember(Member member);
	
	int checkEmail(String email);
	
	
	
	String getPassWithUcode(int ucode);
	
	Member selectMemberById(String id);
	
	void deleteMember(int ucode);
	
	void updateName(@Param("ucode") int ucode,@Param("name") String name);

}
