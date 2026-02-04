package com.manatoku.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.manatoku.dto.MemberForm;
import com.manatoku.model.LoginResult;
import com.manatoku.model.Member;
import com.manatoku.model.RegisterResult;
import com.manatoku.service.MemberService;

@Controller
@RequestMapping("/user")
public class MemberController {
	
	private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
	
    /* 로그인 페이지 매핑 */
	@RequestMapping("/login")
	public String login() {
		return "login";
	}
	
	/* 회원가입 프록시 맵핑 */
	@PostMapping("/loginProc")
	public String loginProc(@RequestParam String id, @RequestParam String pw,HttpSession session,Model model) {
		
		/* 로그인 서비스 호출하여 결과 LoginResult 객체에 저장 */
		LoginResult res = memberService.login(id, pw);
		
		if(res.isSuccess()) { // 로그인 성공시
			
			/* Member 객체 정보와 같이 리다이렉트 */
			session.setAttribute("loginInfo", res.getMember());
			return "redirect:/mainpage";
		}
		else { // 로그인 실패시
			
			/* 에러 메시지 포함해서 Login 페이지로 리턴 */
			model.addAttribute("flashMsg", res.getMessage());
			return "login";
		}
	}
	
	/* 회원가입 페이지 맵핑 */
	@RequestMapping("/regForm")
	public String regForm() {
		return "regForm";
	}
	
	/* 회원가입 프록시 맵핑 */
	@PostMapping("/regProc")
	public String regProc(@RequestParam MemberForm form,Model model,HttpSession session){
		
		/* Member 객체 초기화 */
		Member member = new Member();
		
		/* Member 객체에 파라미터 호출 */
		member.setEmail(form.getEmail());
		member.setId(form.getId());
		member.setName(form.getName());
		member.setPass(form.getPasswd());
		member.setPhone(form.getPhone1()+"-"+form.getPhone2()+"-"+form.getPhone3());
		member.setBirth(form.getBirth1()+"/"+form.getBirth2()+"/"+form.getBirth3());
		
		/* 회원가입 서비스 호출 결과 RegisterResult 객체의 저장 */
		RegisterResult res = memberService.register(member);
		
		if(res.isSuccess()) { //회원 가입 성공시
			
			/* 가입 축하 메세지 포함해서 Login 페이지로 리다이렉트 */
			model.addAttribute("flashMsg","登録が完了しました。");
			return "login";
		}
		else { //회원 가입 실패시
			
			/* 파라미터값 리턴 */
			form.setPasswd(""); //비밀번호값 비우기
			
			/* 실패 에러 메시지 포함하여 regForm 페이지로 리턴 */
			model.addAttribute("flashMsg", res.getMessage()); 
			model.addAttribute("form", form);
			return "regForm";
		}
	}

}
