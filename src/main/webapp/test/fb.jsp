<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% 
String path = request.getContextPath(); 
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";//������ʽhttp://localhost:8080/upload/ 
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
var fb = {
		type:0,
		content:"哈哈哈"
}
console.log(JSON.stringify(fb));
var points = [{"id":11,"lng":108.968243,"lat":34.186319,"info":"xxx"},{"id":22,"lng":108.969452,"lat":34.186644,"info":"x2xx"}]
    </script>
</body>
</html>