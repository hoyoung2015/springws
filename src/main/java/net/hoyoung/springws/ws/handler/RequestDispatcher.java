package net.hoyoung.springws.ws.handler;

import javax.annotation.PostConstruct;

import net.hoyoung.springws.ws.domain.Request;
import net.hoyoung.springws.ws.domain.Response;
import net.hoyoung.springws.ws.util.WebSockedUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class RequestDispatcher implements ApplicationContextAware{
	private Logger log = Logger.getLogger(getClass());
	@Autowired
	private TaskExecutor taskExecutor;

	private ApplicationContext applicationContext;
	public void dispatch(final WebSocketSession wss,final Request request){
        try{
            final DispatcherHandler handler = (DispatcherHandler) applicationContext.getBean(request.getMethod()+"Handler");
            taskExecutor.execute(new Runnable() {
                @Override
                public void run() {
                    Response response = new Response(request.getMethod());
                    response.setTime(System.currentTimeMillis()/1000);
                    handler.doHandle(wss, request,response);
                }
            });
        }catch (NoSuchBeanDefinitionException e){
            Response response = new Response(request.getMethod());
            response.setTime(System.currentTimeMillis()/1000);
            response.setStatus(1);
            response.setMessage("没有这个方法");
            log.warn("没有"+request.getMethod()+"方法");
            WebSockedUtils.sendMessage(wss,response);
        }

	}
	@Value("#{config['com.wiipu.ws.domain.TaskCheckExecutor.sleeptime']}")
	private int sleeptime;
	@Value("#{config['com.wiipu.distance.range']}")
	private double innerDistance;
	@Value("#{config['com.wiipu.ws.domain.TaskCheckExecutor.isEnable']}")
	private boolean isEnable = false;
	@PostConstruct//实例化之后执行
	public void init() {

	}

	@Override
	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		this.applicationContext = context;
		log.info(applicationContext);
	}
}
