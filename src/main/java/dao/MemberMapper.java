package dao;

import java.util.List;
import model.Member;

public interface MemberMapper {
	
	int insertMember(Member member);
	
	int checkId(String id);
	
	int checkEmail(String email);
	
	String getPass(String id);
	
	Member selectMemberById(String id);
}
