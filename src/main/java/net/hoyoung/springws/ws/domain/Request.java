package net.hoyoung.springws.ws.domain;

import java.util.HashMap;
import java.util.Map;
public class Request {
	
	private long time;
	private String method;
	private String sign;
	private String sn;
	private Map<String, Object> data;
	public Request(String method) {
		super();
		this.method = method;
	}
	public Request() {
		super();
	}
	
	public void putData(String key,Object value){
		if(data == null){
			data = new HashMap<String, Object>();
		}
		data.put(key, value);
	}
	public Map<String, Object> getData() {
		return data;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getSn() {
		return sn;
	}

	@Override
	public String toString() {
		return "Request [time=" + time + ", method=" + method + ", sign="
				+ sign + ", sn=" + sn + ", data=" + data + "]";
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}

	public void setSn(String sn) {
		this.sn = sn;
	}
	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

}
