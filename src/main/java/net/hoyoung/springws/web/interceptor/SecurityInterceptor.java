package net.hoyoung.springws.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


public class SecurityInterceptor implements HandlerInterceptor {

	private final static String LOGIN_URL = "authorized/login";
	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object object, Exception except)
			throws Exception {
		
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2, ModelAndView arg3) throws Exception {

	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object arg2) throws Exception {
		System.out.println("SecurityInterceptor preHandle");
		HttpSession session = request.getSession(); 
		// 从session 里面获取用户名的信息  
		Object admin = session.getAttribute("admin");
        // 判断如果没有取到用户信息，就跳转到登陆页面，提示用户进行登陆  
        if (admin == null || "".equals(admin.toString())) {  
        	System.out.println("没有登录----------");
        	response.sendRedirect(LOGIN_URL);  
        	return false;//一定要有return
        }  
        return true; 
	}

}
