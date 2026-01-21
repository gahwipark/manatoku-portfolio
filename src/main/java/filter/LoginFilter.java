package filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter("/main/*")
public class LoginFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse res = (HttpServletResponse)response;
		
		HttpSession session = req.getSession(false);
		String loginId = (session == null) ? null : (String) session.getAttribute("loginId");
		if(loginId == null) {
			
			req.getSession().setAttribute("flashMsg", "로그인이 필요합니다.");
			res.sendRedirect(req.getContextPath() + "/user/login.jsp");
            return;
		}
		
		chain.doFilter(request, response);
		

	}

}
