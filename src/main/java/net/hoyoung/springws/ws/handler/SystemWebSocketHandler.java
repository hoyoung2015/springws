/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.hoyoung.springws.ws.handler;


import java.io.IOException;

import net.hoyoung.springws.entity.User;
import net.hoyoung.springws.ws.domain.SessionContext;
import net.hoyoung.springws.ws.domain.Request;
import net.hoyoung.springws.ws.util.WebSockedUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;


/**
 *
 */
@Component
public class SystemWebSocketHandler implements WebSocketHandler {
    
	private Logger log = Logger.getLogger(getClass());
    @Autowired
	private RequestDispatcher requestDispatcher;
	@Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("WebSocketSession ID:"+session.getId());
		log.info(session.getHandshakeHeaders().toString());
        log.info("成功连接websocket");
    }
	/**
	 * 
	 */
    @Override
    public void handleMessage(WebSocketSession wss, WebSocketMessage<?> wsm) {
    	log.info("WebSocketSession ID:"+wss.getId());
    	log.info("服务器接收到的json:"+wsm.getPayload());
		Request request = WebSockedUtils.getRequestFromJson(wsm.getPayload().toString());
		/**
		 * 检验签名
		 */
		if(!WebSockedUtils.isAccess(request)){
			/**
			 * 校验失败，关闭当前连接
			 */
			log.info("校验失败，准备断开当前连接");
			try {
				wss.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else{
			/**
			 * 分发处理
			 */
            log.info("分发处理"+request.getMethod());
			this.requestDispatcher.dispatch(wss, request);
		}
    	log.info("SystemWebSocketHandler:"+this.hashCode());
    	log.info("WebSocketSession:"+wss.hashCode());
    }
	@Override
    public void handleTransportError(WebSocketSession wss, Throwable thrwbl) throws Exception {
        if(wss.isOpen()){
            wss.close();
        }
       log.info("websocket connection closed......");
    }
	private SessionContext gameContext;
    @Override
    public void afterConnectionClosed(WebSocketSession wss, CloseStatus cs) throws Exception {
    	/**
    	 * 主动调用session close方法或者tomcat关闭
    	 */
        log.info("websocket connection closed......");
        //将用户持久到数据库
        User user = (User) wss.getAttributes().get("user");
        if(user != null){
        	//将用户session移除
        	gameContext.removeWebSocketSession(wss);
        }
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
