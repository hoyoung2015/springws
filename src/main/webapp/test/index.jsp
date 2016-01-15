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

<a href="register.jsp" class="btn btn-info" target="_blank">注册</a>
<a href="login.jsp" class="btn btn-info" target="_blank">登录</a>
<script type="text/javascript">
    </script>
</body>
</html>