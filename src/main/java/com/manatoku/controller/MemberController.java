package com.manatoku.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.manatoku.model.Member;
import com.manatoku.model.MemberForm;
import com.manatoku.model.MemberResponse;
import com.manatoku.service.MemberService;
import com.manatoku.serviceModel.ServiceResult;

/* 컨트롤러 의존성 주입 */
@Controller
@RequestMapping("/user")
public class MemberController {

	/* @Service를 스프링에서 의존성 주입 생성자가 하나라면 @Autowired와 같은 동작 */
	/* @Autowired로 필드주입을 하지 않는 이유는 필드주입은 final을 선언할 수 없기 때문 */
	/* final은 필수는 아니지만, 서비스가 불변함을 (실수로 재선언 방지도 겸해서) 선언하기 위함 */
	private final MemberService memberService;

	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}
	/* @Service 객체 의존성 주입 종료 */

	/* 로그인 페이지 매핑 */
	@GetMapping("/login")
	public String login() {
		return "login";
		/*
		 * 요청이 들어오면 login.jsp로 보냄 (login만 적는 이유는 기본 path가
		 * 'src/main/webapp/WEB-INF/views/'가 기본path이고, .jsp을 인식하도록 설정이 되어 있음) 관련 설정은
		 * /WEB-INF/spring/servlet-context.xml 참조
		 */
	}

	/* 로그인 프록시 페이지 맵핑 */
	@PostMapping("/login/proc")
	@ResponseBody
	public ServiceResult<Void> loginProc(@RequestParam String id, @RequestParam String pw, HttpSession session, Model model) {

		/* 로그인 서비스 호출하여 결과 LoginResult 객체에 저장 */
		/* service패키지내의 MemberService자바의 login 메소드 참조 */
		ServiceResult<Member> res = memberService.login(id, pw);

		if (res.isSuccess()) { // 로그인 성공시
			MemberResponse response = memberService.modelToResponse(res.getData());
			/* Member 객체 정보를 가지고 mainpage로 맵핑된 Controller로 리다이렉트 */
			session.setAttribute("member", response);
			return ServiceResult.success();
		} else { // 로그인 실패시

			/* 에러 메시지를 가지고 Login 페이지로 리턴 */
			// flashMsg라는 이름의 파라미터를 LoginResult 객체의 Message 필드값을 넣어서 login 페이지로 리턴
			return ServiceResult.fail(res.getCode(),res.getMessage());
		}
	}

	/* 회원가입 페이지 맵핑 */
	@GetMapping("/reg")
	public String regForm() {
		return "regForm";
	}

	/* 회원가입 프록시 맵핑 */
	@PostMapping("/reg/proc")
	@ResponseBody
	public ServiceResult<Void> regProc(@ModelAttribute MemberForm form, Model model, HttpSession session) {
		/*
		 * @regForm의 파라미터를 MemberForm(자세한 내용은 dto에 MemberForm참조) 객체에 넣어서 가져온다
		 * (@ModelAttribute는 생략 가능하지만 구분용으로 넣음) Model은 request의 동작을 수행한다 (개념적으로 같은 것은
		 * 아님)
		 */

		/* Form 객체로 Member 객체로 변환 */
		Member member = memberService.formToModel(form);

		/* 회원가입 서비스 호출 결과 RegisterResult 객체의 저장 */
		ServiceResult<Void> res = memberService.register(member);

        return res;
    }

	/* 마이 페이지 맵핑 */
	@GetMapping("/my/mypage")
	public String mypage() {
		return "/mainpage/mypage/mypage";
	}

	/* 마이 페이지 - 회원정보 수정 페이지 맵핑 */
	@GetMapping("/my/update")
	public String updateForm() {
		return "/mainpage/mypage/updateForm";
	}

	/* 마이 페이지 - 회원정보 수정 프록시(updateProc) 맵핑 */
	@PostMapping("/my/update/proc")
	@ResponseBody
	public ServiceResult<Void> updateProc(@ModelAttribute MemberForm form, HttpSession session, Model model) {
		MemberResponse member = null;

		if (session != null) { // session 정보가 있을경우
			member = (MemberResponse)session.getAttribute("member"); // member 파라미터를 Member 객체로 형변환
		} else { // session 정보가 없을경우
			return ServiceResult.fail("ログイン情報の取得に失敗しました。"); // 로그인 페이지로 리턴
		}
		
		/* 업데이트 서비스 호출 */
		ServiceResult<Member> res = memberService.updateMember(member.getUcode(), form);
		if (res.isSuccess()) { // 결과값이 성공이면
			MemberResponse response = memberService.modelToResponse(res.getData());
			session.setAttribute("member", response); // session의 member 갱신
			return ServiceResult.success();
		} else {
			return ServiceResult.fail(res.getCode(),res.getMessage());
		}
	}

	/* 회원탈퇴 페이지 매핑 */
	@RequestMapping("/my/withdraw")
	public String withdrawForm() {
		return "/mainpage/mypage/withdrawForm";
	}

	/* 회원탈퇴 프록시 매핑 */
	@PostMapping("/my/withdraw/proc")
	@ResponseBody
	public ServiceResult<Void> withdrawProc(@RequestParam String pw, HttpSession session) {

		MemberResponse member = null;
		if (session != null) { // session 정보가 있을 경우
			member = (MemberResponse) session.getAttribute("member");
		} else {
			return ServiceResult.fail("ログイン情報の取得に失敗しました。");
		}

		ServiceResult<Void> res = memberService.withdraw(member.getUcode(), pw);

		if (res.isSuccess()) {
			session.invalidate(); // 🔥 세션 완전 삭제
		}

		return res;
	}

	/* 로그아웃 매핑 */
	@RequestMapping("/my/logout")
	public String logout(HttpSession session) {

		// 세션 전체 삭제
		session.invalidate();

		// 로그인 페이지 or 메인 페이지로 이동
		return "redirect:/user/login";
	}

	/* 크레딧 매핑 */
	@GetMapping("/credits")
	public String credits() {
		return "credits";
	}

}
