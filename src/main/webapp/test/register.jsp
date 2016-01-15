<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% 
String path = request.getContextPath(); 
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";//返回形式http://localhost:8080/upload/ 
request.setAttribute("basePath", basePath);
%> 
<!DOCTYPE html>
<html>
<head>
<title>WebSocket</title>
<jsp:include page="res.jsp"></jsp:include>
</head>
<body>
<button class="btn btn-primary" id="btnSend">注册</button>
<button class="btn btn-primary" id="btnTurist">游客注册</button>
<div class="panel panel-default">
  <div class="panel-heading">控制台<button class="btn btn-sm btn-default" id="btnClean">清空</button></div>
  <div class="panel-body" id="content">
   2851713729${basePath }${request }
  </div>
</div>
<script type="text/javascript">
var request = {
		method:"register",
		time:1423125642,
		sn:"sn",
		data:{
			//username:"rob"+Math.round(Math.random()*100000),
			username:"%E5%99%AC%E9%AD%82",
			openId:"rob"+Math.round(Math.random()*100000),
			photo:"http://d.hiphotos.baidu.com/baike/c0%3Dbaike72%2C5%2C5%2C72%2C24/sign=a5ed40412a381f308a1485fbc868276d/37d12f2eb9389b507400922b8735e5dde6116ecf.jpg"
		}
}
var userId = 0;
var mySocket = new MySocket("content",{
	onmessage:function(event){
		var response = JSON.parse(event.data);
		console.log(response);
	}
});
$("#btnSend").click(function(){
	mySocket.send(json(request));
});
$("#btnTurist").click(function(){
	var request = {
			method:"register",
			time:1423125642,
			sn:"sn",
			data:{
				username:"",
				openId:"",
				photo:""
			}
	}
	var str = json(request);
	var count = 1;
	var t = window.setInterval(function(){
		mySocket.send(str);
		if(--count<=0){
			window.clearInterval(t);
		}
	}, 200);
});
    </script>
</body>
</html>