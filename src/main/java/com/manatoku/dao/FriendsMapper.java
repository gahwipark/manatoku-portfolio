package com.manatoku.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.manatoku.model.Member;

public interface FriendsMapper {
	
	List<Member> getFriendsList(@Param("ucode") Integer ucode);
	
}
