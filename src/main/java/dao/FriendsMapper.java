package dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import model.Friends;

public interface FriendsMapper {
	
	List<Friends> getFriendsList(@Param("ucode") Integer ucode);
	
}
