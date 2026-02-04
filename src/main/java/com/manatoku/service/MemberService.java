package com.manatoku.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manatoku.dao.MemberMapper;
import com.manatoku.model.LoginResult;
import com.manatoku.model.Member;
import com.manatoku.model.RegisterResult;

@Service
public class MemberService {
	
	/* MyBatis Mapper 등록 */
	private final MemberMapper mapper;
    public MemberService(MemberMapper mapper) {
        this.mapper = mapper;
    }
    
    /* 멤버 로그인 동작 */
	public LoginResult login(String id, String pw) {
		
		try {
			
			/* 아이디 체크 */
            int res = mapper.checkId(id);
            if(res<1) { //존재하지 않은 아이디
            	return LoginResult.fail("IDが正しくありません。");
            }
            Member member = new Member();
            member = mapper.selectMemberById(id);
            if(pw.equals(member.getPass())) { //비밀번호 일치
            	return LoginResult.success(member);
            } else { //비밀번호 불일치
            	return LoginResult.fail("パスワードが正しくありません。");
            }
            
		} catch (Exception e) { //에러 발생
			return LoginResult.fail("ログインが失敗しました。");
		}

	}
	
	/* 멤버 회원가입 동작 */
	@Transactional
	public RegisterResult register(Member member) {
		try {
			/* 아이디 중복 체크 */
			int res = mapper.checkId(member.getId());
			if(res>0) { // 이미 존재하는 아이디
				
				/* 에러 메세지와 함께 리턴 */
				return RegisterResult.fail("このIDは登録できません。",member);
			}
			
			/* 이메일 중복 체크 */
			res = mapper.checkEmail(member.getEmail());
			if(res>0) { // 이미 존재하는 이메일
				
				/* 에러 메세지와 함께 리턴 */
				return RegisterResult.fail("このメールアドレスは登録できません。", member);
			}
			
			/* DB Insert */
			mapper.insertMember(member);
			
			/* member 객체와 함께 리턴 */
			return RegisterResult.success(member);
			
		} catch (Exception e) { // 예기치못한 에러
			
			/* 에러 메세지와 함께 리턴 */
			return RegisterResult.fail("アカウントの作成に失敗しました。", member);
		}
	}
	
}
