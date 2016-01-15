package net.hoyoung.springws.ws.util;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.TreeMap;

import com.alibaba.fastjson.JSON;
import net.hoyoung.springws.util.Constants;
import net.hoyoung.springws.util.MD5Utils;
import net.hoyoung.springws.ws.domain.Request;
import net.hoyoung.springws.ws.domain.Response;
import net.hoyoung.springws.ws.domain.ResponseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;

public class WebSockedUtils {
	
	public static void sendMessage(WebSocketSession wss,Response response){
		synchronized (wss) {
			if(wss.isOpen()){
				try {
					wss.sendMessage(new TextMessage(JSON.toJSONString(response), true));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	private static String responsePattenJson(String method) throws JsonProcessingException{
		Response res = new Response(method);
		res.setTime(System.currentTimeMillis()/1000);
		res.setStatus(ResponseStatus.SERVER_ERROR);
		res.setMessage("系统出错");
		String json = null;
		json = JSON.toJSONString(res);
		return json;
	}
	public static TextMessage getResponseTextMessage(Response res){
		String json = null;
		json = JSON.toJSONString(res);
		return new TextMessage(json,true);
	}
	public static Request getRequestFromJson(String json) {
		Request request = null;
        request = JSON.parseObject(json, Request.class);
		return request;
	}
	public static String getSign(Request request){
		if(request == null){
			return null;
		}
		TreeMap<String, Object> map = new TreeMap<String, Object>();
		// 将request外层除Sign外的内容放入map
		Method[] methods = request.getClass().getDeclaredMethods();
		for(Method m : methods){
			if(ReflectUtil.isGetterMethod(m) && isNeed(m)){
				map.put(ReflectUtil.getName(m), ReflectUtil.getValue(m, request));
			}
		}
		// 将request中data的内容放入map中
		if(request.getData() != null){
			map.putAll(request.getData());
		}
		// 设置固定格式，并将secret追加到最后
		String result = map.toString().replace("{", "").replace("}", "").replace(", ", "&") + "&secret=" + Constants.SECRET;
		// 进行MD5签名
		return MD5Utils.string2MD5(result);
	}
	/**
	 * 检验签名
	 */
	public static boolean isAccess(Request request){
		TreeMap<String, Object> map = new TreeMap<String, Object>();
		// 将request外层除Sign外的内容放入map
		Method[] methods = request.getClass().getDeclaredMethods();
		for(Method m : methods){
			if(ReflectUtil.isGetterMethod(m) && isNeed(m)){
				map.put(ReflectUtil.getName(m), ReflectUtil.getValue(m, request));
			}
		}
		// 将request中data的内容放入map中
		if(request.getData() != null){
			map.putAll(request.getData());
		}
		// 设置固定格式，并将secret追加到最后
		String result = map.toString().replace("{", "").replace("}", "").replace(", ", "&") + "&secret=" + Constants.SECRET;
		// 进行MD5签名
		String sign = MD5Utils.string2MD5(result);
		System.out.println("服务拼接值:"+result);
		System.out.println("服务器签名值:"+sign);
		if(sign != null && sign.equals(request.getSign())){
			return true;
		}
		return false;
	}
	/**
	 * 判断是否是需要的方法
	 */
	private static boolean isNeed(Method m){
		String name = m.getName();
		if(name.endsWith("Sign") || name.endsWith("Data"))
			return false;
		else
			return true;
	}
}
