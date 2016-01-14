package net.hoyoung.springws.ws.domain;

public class ResponseStatus {
	//正常
	public final static int OK = 200;
	//系统忙
	public final static int SERVER_ERROR = 500;
	//用户已注册
	public final static int REG_USER_EXISTS = 100;
	
	
	//用户不存在
	public final static int LOGIN_USER_NOT_EXISTS = 100;
	
	//用户已登录
	public final static int LOGIN_ONLINE = 101;
	
	
	public final static int WRONG_DATA = 400;
	public final static int WRONG_PLACE = 401;
	
	//前置规则未通过
	public final static int ANSWER_NO_PERMISSION = 403;
	
}
