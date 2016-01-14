package net.hoyoung.springws.ws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

import com.wiipu.ws.domain.GameContext;
import com.wiipu.ws.fb.FbContext;
import com.wiipu.ws.fb.FbText;
import com.wiipu.ws.handler.SystemWebSocketHandler;
import com.wiipu.ws.interceptor.HandshakeInterceptor;
import com.wiipu.ws.util.WebSockedUtils;

@Configuration
@EnableWebMvc
@EnableWebSocket
public class WebSocketConfig extends WebMvcConfigurerAdapter implements
        WebSocketConfigurer {

    public WebSocketConfig() {
    }
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(systemWebSocketHandler(), "/api")
        .addInterceptors(new HandshakeInterceptor());
    }

    @Bean
    public WebSocketHandler systemWebSocketHandler() {
        return new SystemWebSocketHandler();
    }
    @Bean
    public WebSockedUtils wsUtils() {
        return new WebSockedUtils();
    }
    @Bean
    public GameContext gameContext() {
        return new GameContext();
    }
    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        //设置缓冲大小
        container.setMaxTextMessageBufferSize(8192*2);
        container.setMaxBinaryMessageBufferSize(8192);
        return container;
    }
    
}
