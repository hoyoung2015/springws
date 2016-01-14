package net.hoyoung.springws.ws.interceptor;

import java.net.URI;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Component
public class HandshakeInterceptor extends HttpSessionHandshakeInterceptor {
	private Logger log = Logger.getLogger(HandshakeInterceptor.class);

	@Override
	public boolean beforeHandshake(ServerHttpRequest request,
			ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		log.info("Before Handshake");
		log.info("request:"+request.toString());
		
//		return super.beforeHandshake(request, response, wsHandler, attributes);
		return super.beforeHandshake(request, response, wsHandler, attributes);
	}

	@Override
	public void afterHandshake(ServerHttpRequest request,
			ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception ex) {
		log.info("After Handshake");
		super.afterHandshake(request, response, wsHandler, ex);
	}

}
