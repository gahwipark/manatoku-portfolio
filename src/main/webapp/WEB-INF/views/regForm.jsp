<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>マナトーク 会員登録</title>
<link href="${pageContext.request.contextPath}/resources/css/regForm.css" rel="stylesheet" type="text/css">
</head>

<body>
	
	<!-- 회원가입 에러 메세지 출력 -->
	<c:if test="${not empty error}">
		<script>
			alert("${error}");
		</script>
	</c:if>

	<!-- 페이지 시작 -->
	<div class="login-wrapper">

		<!-- 우주 배경, 별똥별 -->
		<div class="stars"></div>
		<div class="shooting-stars">
			<span class="shooting-star"></span> <span class="shooting-star"></span>
			<span class="shooting-star"></span> <span class="shooting-star"></span>
			<span class="shooting-star"></span> <span class="shooting-star"></span>
		</div>

		<!-- 회원가입 -->
		<div class="login-card">
			<div class="login-title">会員登録</div>

			<form action="regProc" method="post" name="regForm">
				<input class="login-input" type="email" name="email"
					value="${form.email}" placeholder="E-Mail"> <input class="login-input"
					type="text" name="id" value="${form.id}" placeholder="ID"> <input
					class="login-input" type="text" name="name" value="${form.name}" placeholder="名前">
				<input class="login-input" type="password" name="passwd"
					placeholder="パスワード"> <input class="login-input"
					type="password" name="passwd_2" placeholder="パスワード確認">
				<div class="birth-wrap">
					<select name="birth1">
						<%
						for (int year = 1900; year <= 2025; year++) {
						%>
						<option value="<%=year%>"><%=year%></option>
						<%
						}
						%>
					</select>
					<select name="birth2">
						<%
						for (int mon = 1; mon <= 12; mon++) {
						%>
						<option value="<%=mon%>"><%=mon%></option>
						<%
						}
						%>
					</select>
					<select name="birth3">
						<%
						for (int day = 1; day <= 31; day++) {
						%>
						<option value="<%=day%>"><%=day%></option>
						<%
						}
						%>
					</select>
				</div>
				<div class="phone-wrap">
					<input type="text" align="left" name="phone1" value="${form.phone1}" placeholder="010" required>
					<input type="text" align="left" name="phone2" value="${form.phone2}"placeholder="1234" required>
					<input type="text" align="left" name="phone3" value="${form.phone3}" placeholder="5678" required>
				</div>

				<input class="login-btn" type="button" value="アカウント作成"
					onclick="inputCheck()"> <input class="join-btn"
					type="button" value="ログインへ戻る" onclick="location.href='login'">
			</form>
		</div>

	</div>
	
	<!-- 페이지 종료 -->

</body>
<script src="${pageContext.request.contextPath}/resources/js/user_script.js"></script>
</html>