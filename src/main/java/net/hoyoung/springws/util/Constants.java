package net.hoyoung.springws.util;

public class Constants {
	
	public static final String SN = "888";
	public static final String SECRET = "123456";
	public final static String DEFAULT_AVATAR = "http://192.168.0.102:8080/treasure/Public/images/avatars/default_avatar.jpg";
	
	
	public final static int RULE_COMPLETE = 0x7fffffff;
	//道具完备规则
	public final static int RULE_PROP = 0x01;//0000 0001
	//GPS规则
	public final static int RULE_GPS = 0x02;//0000 0010
//	public final static int RULE_SCAN = 0x04;//0000 0010
	public final static int RULE_SCAN = 0x04;//0000 0010
	//所有前置规则通过
	public final static int RULE_PREPOSE = RULE_PROP|RULE_GPS|RULE_SCAN;
	//结束任务规则
	public final static int RULE_FINAL = RULE_COMPLETE^(RULE_PREPOSE);//1111 1100
	
}
