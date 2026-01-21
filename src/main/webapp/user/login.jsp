<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>マナトーク ログイン</title>
<link href="user_style.css" rel="stylesheet" type="text/css">
<style>
	.input-box {
		width: 250px;
		height: 25px;
	}
</style>
</head>
<body bgcolor = "#f0f3f3">

	<c:if test="${not empty error}">
		<script>
			alert("${error}");
		</script>
	</c:if>
	
	<c:if test="${not empty sessionScope.flashMsg}">
    	<script>
       		alert("${sessionScope.flashMsg}");
    	</script>
    	<c:remove var="flashMsg" scope="session"/>
	</c:if>
	
<form action ="loginProc" name="login" method="post">
	<div class="container">
		<div>
		  <h1 align="center" style="color:#61c3f4;"><b>マナトーク</b></h1>
			<table>
				<tr align="center" width="500">
					<td bgcolor="#a9def9" width="100">ID</td>
					<td><input class="input-box" type="text" name="id" value="${id}"></td>
				</tr>
				<tr align="center" width="500">
					<td bgcolor="#a9def9" width="100">Password</td>
					<td><input class="input-box" type="password" name="pw"></td>
				</tr>
				<tr align="center">
					<td colspan="2">
						<input type="submit" value="Login">
						<input type="button" value="Sign in" onClick="location.href='regForm.jsp'">
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>

</body>
</html>