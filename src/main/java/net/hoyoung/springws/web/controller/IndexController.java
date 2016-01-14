package net.hoyoung.springws.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2016/1/14.
 */
@Controller
public class IndexController {
    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }
}
