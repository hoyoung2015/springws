package net.hoyoung.springws.ws.handler;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import com.wiipu.service.UserService;
import com.wiipu.ws.domain.GameContext;
import com.wiipu.ws.domain.Request;
import com.wiipu.ws.domain.Response;
import com.wiipu.ws.domain.TaskCheckExecutor;
import com.wiipu.ws.fb.FbContext;
@Component
public class RequestDispatcher implements ApplicationContextAware{
	private Logger log = Logger.getLogger(RequestDispatcher.class);
	@Autowired
	private TaskExecutor taskExecutor;
	@Autowired
	private GameContext gameContext;
	@Autowired
	private UserService userService;
	
	private ApplicationContext applicationContext;
	public void dispatch(final WebSocketSession wss,final Request request){
		final DispatcherHandler handler = (DispatcherHandler) applicationContext.getBean(request.getMethod()+"Handler");
		if(handler==null){
			return;
		}
		taskExecutor.execute(new Runnable() {
			@Override
			public void run() {
				Response response = new Response(request.getMethod());
				response.setTime(System.currentTimeMillis()/1000);
				handler.doHandle(wss, request,response);
			}
		});
	}
	@Value("#{config['com.wiipu.ws.domain.TaskCheckExecutor.sleeptime']}")
	private int sleeptime;
	@Value("#{config['com.wiipu.distance.range']}")
	private double innerDistance;
	@Value("#{config['com.wiipu.ws.domain.TaskCheckExecutor.isEnable']}")
	private boolean isEnable = false;
	@Autowired
	private FbContext fbContext;
	@PostConstruct//实例化之后执行
	public void init() {
		/**
		 * 启动任务前置规则监测轮训器
		 */
		log.info("启动任务前置规则监测轮训器");
		TaskCheckExecutor taskCheckExecutor = new TaskCheckExecutor();
		taskCheckExecutor.setSleeptime(sleeptime);
		taskCheckExecutor.setGameContext(gameContext);
		taskCheckExecutor.setUserService(userService);
		taskCheckExecutor.setInnerDistance(innerDistance);
		taskCheckExecutor.setEnable(isEnable);
		taskCheckExecutor.setFbContext(fbContext);
		taskExecutor.execute(taskCheckExecutor);
		
		log.info("-----------------------------------isEnable-------------"+isEnable);
	}

	@Override
	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		this.applicationContext = context;
		log.info(applicationContext);
	}
}
