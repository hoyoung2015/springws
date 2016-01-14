package net.hoyoung.springws.ws.domain;

import java.util.HashMap;
import java.util.Map;

public class Response {
	private int status;
	private long time;
	private String message;
	private String method;
	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}
	private Map<String, Object> data;

	public Response(String method) {
		super();
		this.method = method;
	}

	public Response() {
		super();
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "Response [status=" + status + ", time=" + time + ", message="
				+ message + ", method=" + method + ", data=" + data + "]";
	}

	public Map<String, Object> getData() {
		return data;
	}
	public void putData(String key,Object value){
		if(data==null){
			data = new HashMap<String, Object>();
		}
		data.put(key, value);
	}
	public void setData(Map<String, Object> data) {
		this.data = data;
	}
}
