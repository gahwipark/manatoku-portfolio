<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="${pageContext.request.contextPath}/css/regForm.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="user_script.js"></script>
<style>
	.input-box {
		width: 250px;
		height: 25px;
	}
	.input-box2 {
		width: 50px;
		height: 25px;
		align: center;
	}
	select {
		font-size : 18px;
	}
</style>
<title>ManaToku Sign-in</title>
</head>
<body>
	<form action="regProc" method="post" name="regForm">
	<c:if test="${not empty error}">
		<script>
			alert("${error}");
		</script>
	</c:if>
	<div class="container">
		<table>
			<tr>
				<td>E-Mail</td>
				<td><input class="input-box" type="email" name="email" value="${member.email}" required></td>
			</tr>
			<tr>
				<td>ID</td>
				<td><input class="input-box" type="text" name="id" value="${member.id}" required></td>
			</tr>
			<tr>
				<td>Username</td>
				<td><input class="input-box" type="text" name="name" value="${member.name}" required></td>
			</tr>
			<tr>
				<td rowspan="2">Password</td>
				<td>
				<input class="input-box" type="password" name="passwd" value="${member.pass}" required></td>
			</tr>
			<tr>
				<td colspan="2">
				<input class="input-box" type="password" name="passwd_2" value="${member.pass}" required></td>
			</tr>
			<tr>
				<td>Birth</td>
				<td>
				<select name="birth1">
					<%for(int year=1900; year<=2025; year++) { %>
					<option value="<%=year %>"><%=year %></option>
					<%} %>
				</select>
				&nbsp;
					<select name="birth2">
					<%for(int mon=1; mon<=12; mon++) { %>
					<option value="<%=mon %>"><%=mon %></option>
					<%} %>
				</select>
				&nbsp;
					<select name="birth3">
					<%for(int day=1; day<=31; day++) { %>
					<option value="<%=day %>"><%=day %></option>
					<%} %>
				</select>
				</td>
			</tr>
			<tr>
				<td>Phone</td>
				<td>
					<input class="input-box2" type="text" name="phone1" required>
					<input class="input-box2" type="text" name="phone2" required>
					<input class="input-box2" type="text" name="phone3" required>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<input type="button" value="Sign in" onclick="inputCheck()">
				</td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>