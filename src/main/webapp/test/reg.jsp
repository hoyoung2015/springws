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
<script type="text/javascript">
//var str = "108.123456,34.123546";
var str = "108.123456,34.123546";
//var reg = /^d+(.d+)?[,]d+(.d+)?$/;
//var reg = /^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
var reg = /^[0-9]+\.[0-9]+[,]([0-9]+\.[0-9]+)$/;
if(reg.test(str))
    alert("符合要求！");
else
    alert("不符合要求！");
    </script>
</body>
</html>