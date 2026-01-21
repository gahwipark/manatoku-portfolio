<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Manatoku mainpage</title>
<link href="${pageContext.request.contextPath}/css/mainpage.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/css/info.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/css/navTabs.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/css/panel.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/css/header.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/css/calendar.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/css/chatbot.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="container">
	<div class="sidebar">
		<jsp:include page="/main/layout/info.jsp"/>
		<jsp:include page="/main/layout/navTabs.jsp"/>
		<jsp:include page="/main/layout/panel.jsp"/>
	</div>
	<div class="content">
		<div class="header" style="display:none;">
			<jsp:include page="/main/layout/header.jsp"/>
		</div>
		<main class="main">
			<div id="mainpage">
			<%-- <jsp:include page="/main/layout/chatMain.jsp"/> --%>
				<div class="content-panel" id="siritoriPanel" style="display:none;">
    				<jsp:include page="/main/layout/chatbot/siritoriMain.jsp"/>
				</div>
				<div class="content-panel" id="callendarPanel" style="display:none;">
    				<jsp:include page="/main/layout/calendar/calendar.jsp"/>
				</div>
				<div class="content-panel" id="chatPanel" style="display:none;">
				</div>
			</div>
		</main>
	</div>
</div>
<script>
 	const CTX = "${pageContext.request.contextPath}";
    const ucode = "${sessionScope.ucode}";
</script>
</script>
<script src="${pageContext.request.contextPath}/js/mainpage.js"></script>
<script src="${pageContext.request.contextPath}/js/chatbot.js"></script>
<script src="${pageContext.request.contextPath}/js/calendar.js"></script>
</body>
</html>