<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>マナトーク ログイン</title>

<link href="${pageContext.request.contextPath}/resources/css/login.css" rel="stylesheet" type="text/css">
</head>
<body>
	
	<!-- 알림 메세지 출력 -->
	<c:if test="${not empty flashMsg}">
		<script>
			alert("${flashMsg}");
		</script>
	</c:if>
	
	<!-- 페이지 시작 -->
	<div class="login-wrapper">

		

		<!-- 별똥별 총 6개 -->
		<div class="stars"></div>
		
		<div class="shooting-stars">
			<span class="shooting-star"></span> <span class="shooting-star"></span>
			<span class="shooting-star"></span> <span class="shooting-star"></span>
			<span class="shooting-star"></span> <span class="shooting-star"></span>
		</div>

		<!-- 로그인 -->
		<div class="login-card">
			<div class="login-title">マナトーク</div>

			<form action="loginProc" method="post">
				<input class="login-input" type="text" name="id" placeholder="ID">
				<input class="login-input" type="password" name="pw"
					placeholder="パスワード"> <input class="login-btn" type="submit"
					value="ログイン"> <input class="join-btn" type="button"
					value="会員登録" onclick="location.href='regForm'">
			</form>
		</div>

	</div>
	<!-- 페이지 종료 -->

</body>
</html>