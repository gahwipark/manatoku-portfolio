package dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import model.ChatMessage;
import model.Friends;

public interface ChatMapper {
	
	Integer findDirectRoomId(@Param("ucode") int ucode,@Param("friendUcode") int friendUcode);
	
	int insertChatRoomDirect(Map<String, Object> param);
	
	void insertRoomMember(@Param("roomId") int roomId,@Param("ucode") int ucode,@Param("role") String role);
	
	List<ChatMessage> selectRecentMessages(@Param("roomId") int roomId,@Param("limit") int limit);
	
	int getSenderUcode();
	
	Friends selectUserSummary(int friendUcode);
	
}
