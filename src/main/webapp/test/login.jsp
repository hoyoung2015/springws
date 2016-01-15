<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% 
String path = request.getContextPath(); 
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";//返回形式http://localhost:8080/upload/ 
request.setAttribute("basePath", basePath);
%> 
<!DOCTYPE html>
<html style="height: 100%;">
<head>
<title>WebSocket</title>
<style type="text/css">
.page.unitBox{
	height:100%;
}
#allmap {
	height: 100%;
	width: 100%;
}
.wrap{
	height: 100%;
}
#control {
	width: 100%;
}
#mapBar {
	padding: 5px;
	overflow: auto;
}

#mapBar .left {
	float: left;
}
#mapBar .right {
	float: right;
}
#suggestId {
	width: 360px;
	height: 24px;
	font-size: 14px;
}
</style>
<jsp:include page="res.jsp"></jsp:include>
</head>
<body style="height: 100%;">
<div class="wrap">
<input name="userId" id="userId" placeholder="用户id"/>
<button class="btn btn-primary" id="btnLogin">登录</button>
<button class="btn btn-primary" id="btnUpdateAvatar">修改头像</button>
<input name="userId" id="energy" value="1" placeholder="能量值"/>
<button class="btn btn-primary" id="btnAddEnergy">加能量</button>
<button class="btn btn-primary" id="btnGetEnergyPoints">获得附近能量点可能位置</button>
<button class="btn btn-primary" id="btnGetTaskView">获取任务视图</button>
<button class="btn btn-primary" id="btnGetTaskAccept">获取已接受任务</button>
<button class="btn btn-primary" id="btnGetTaskFinished">获取已完成任务</button>
<input for="btnAbortTask" placeholder="放弃的任务id"/>
<button class="btn btn-primary" id="btnAbortTask">放弃任务</button>
<button class="btn btn-primary" id="btnListProperty">获取道具列表</button>
<input for="btnEquipProperty1" placeholder="被替换道具id"/><input for="btnEquipProperty2" placeholder="道具id"/>
<button class="btn btn-primary" id="btnEquipProperty">装备道具</button>
<input for="btnAnswerTask1" placeholder="任务id"/><input for="btnAnswerTask2" placeholder="输入内容"/>
<button class="btn btn-primary" id="btnAnswerTask">任务答题</button>
<input for="scanBarcode" placeholder="输入内容"/>
<button class="btn btn-primary" id="scanBarcode">扫码</button>
<input for="userAdvice" placeholder="输入内容"/>
<button class="btn btn-primary" id="userAdvice">用户反馈</button>
<!-- <div class="panel panel-default">
  <div class="panel-heading">控制台<button class="btn btn-sm btn-default" id="btnClean">清空</button></div>
  <div class="panel-body" id="content">
   
  </div>
</div> -->
<div id="mapBar" class="clearfix">
		<div class="left">
			<div id="r-result">
				输入地点:<input type="text" id="suggestId" size="20" value="" />
			</div>
			<div id="searchResultPanel"
				style="border: 1px solid #C0C0C0; width: 150px; height: auto; display: none;"></div>
		</div>
		<div class="right">
		</div>
	</div>
<div style="height: 100%">
<div style="float:left;width:18%;">
已接受任务列表：
<ul id="ulAccepted">
<li></li>
</ul>
已完成任务列表：
<ul id="ulFinished">
<li></li>
</ul>
</div>
<div style="float:right;width: 82%;height: 100%">
<div id="allmap"></div>
</div>
</div>
</div>
<script type="text/javascript" src="login.js"></script>
<script type="text/javascript" src="map.js"></script>
</body>
</html>