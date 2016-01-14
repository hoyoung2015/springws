package net.hoyoung.springws.ws.util;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.TreeMap;

import net.hoyoung.springws.ws.domain.Request;
import net.hoyoung.springws.ws.domain.Response;
import net.hoyoung.springws.ws.domain.ResponseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WebSockedUtils {
	
	private static ObjectMapper objectMapper;
	static{
		objectMapper = new ObjectMapper();
	}
	public ObjectMapper getObjectMapper() {
		return objectMapper;
	}
	public static void sendMessage(WebSocketSession wss,Response response){
		synchronized (wss) {
			if(wss.isOpen()){
				try {
					wss.sendMessage(new TextMessage(objectMapper.writeValueAsString(response), true));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	private String responsePattenJson(String method) throws JsonProcessingException{
		Response res = new Response(method);
		res.setTime(System.currentTimeMillis()/1000);
		res.setStatus(ResponseStatus.SERVER_ERROR);
		res.setMessage("系统出错");
		String json = null;
		json = this.objectMapper.writeValueAsString(res);
		return json;
	}
	public TextMessage getResponseTextMessage(Response res){
		String json = null;
		try {
			json = this.objectMapper.writeValueAsString(res);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return new TextMessage(json,true);
	}
	public Request getRequestFromJson(String json) {
		Request request = null;
		try {
			request = this.objectMapper.readValue(json, Request.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return request;
	}
	public String getSign(Request request){
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
	public boolean isAccess(Request request){
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
	private boolean isNeed(Method m){
		String name = m.getName();
		if(name.endsWith("Sign") || name.endsWith("Data"))
			return false;
		else
			return true;
	}
}
