<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>マナトーク</title>

<link href="${pageContext.request.contextPath}/resources/css/mainpage.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/info.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/navTabs.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/panel.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/header.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/calendar.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/chatbot.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/buttonPanel.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/chat.css" rel="stylesheet" type="text/css">
<link href="${pageContext.request.contextPath}/resources/css/star.css" rel="stylesheet" type="text/css">

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- FullCalendar -->
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/locales-all.global.min.js"></script>

<!-- Bootstrap -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/bootstrap.min.css">
<script src="${pageContext.request.contextPath}/resources/js/bootstrap.bundle.min.js"></script>

</head>
<body>
<!-- 페이지 시작 -->
<div class="main-wrapper">
	
	<!-- 배경 우주,별 -->
	<div class="galaxy"></div>
	<div class="stars"></div>
	
 	<!-- 사이드 바 시작 -->
	<div class="sidebar">
		<jsp:include page="layout/info.jsp"/>
		<jsp:include page="layout/buttonPanel.jsp"/>
		<jsp:include page="layout/navTabs.jsp"/>
		<jsp:include page="layout/panel.jsp"/>
	</div>
	<!-- 사이드 바 끝 -->
	
	<!-- 메인 페이지 시작 -->
	<div class="content">	
	
		<!-- 메인 페이지 헤더 -->
		<div class="header" style="display:none;">
			<jsp:include page="layout/header.jsp"/>			
		</div>
		
		<!-- 메인 콘텐츠 창 시작 -->
		<main class="main">
			<div id="mainpage">
				<div class="content-panel" id="siritoriPanel" style="display:none;">
    				<jsp:include page="chatbot/siritoriMain.jsp"/>
				</div>
				<div class="content-panel" id="calendarPanel" style="display:none;">
    				<jsp:include page="calendar/calendar.jsp"/>
				</div>
				<div class="content-panel" id="chatPanel" style="display:none;">
					<jsp:include page="layout/chat.jsp"/>
				</div>
			</div>
		</main>
		<!-- 메인 콘텐츠 창 종료 -->
	</div>
	
</div>
<!-- 페이지 종료 -->

<script>
	/* js 경로 변수 저장 */
 	const CTX = "${pageContext.request.contextPath}";
 	
 	/* js 사용자 코드 변수 저장 */
    const ucode = "${sessionScope.ucode}";
</script>

<script src="${pageContext.request.contextPath}/js/calendar.js"></script>
<script src="${pageContext.request.contextPath}/js/mainpage.js"></script>
<script src="${pageContext.request.contextPath}/js/chatbot.js"></script>
<script src="${pageContext.request.contextPath}/js/star.js"></script>

</body>
</html>
