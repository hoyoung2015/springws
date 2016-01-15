package net.hoyoung.springws.ws.domain;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.web.socket.WebSocketSession;

/**
 * 
 * @author hoyoung
 */
public class SessionContext {
	private static ConcurrentMap<String,WebSocketSession> clients;

	static {
        clients = new ConcurrentHashMap<String,WebSocketSession>();
    }
	public static void addWebSocketSession(WebSocketSession session){
		clients.put(session.getId(), session);
	}
	public static Map<String, WebSocketSession> getClients() {
		return clients;
	}

	public static void removeWebSocketSession(WebSocketSession session){
		if(clients !=null){
			clients.remove(session.getId());
		}
	}
}
