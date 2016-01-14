package net.hoyoung.springws.ws.handler;

import net.hoyoung.springws.ws.domain.Request;
import net.hoyoung.springws.ws.domain.Response;
import org.springframework.web.socket.WebSocketSession;


public interface DispatcherHandler {
	public void doHandle(WebSocketSession wss, Request request, Response response);
}
