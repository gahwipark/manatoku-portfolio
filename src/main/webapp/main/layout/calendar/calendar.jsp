<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="jp"> 
<head>
    <meta charset="UTF-8">
    <title>My Smart Calendar</title>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- FullCalendar -->
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.20/index.global.min.js"></script>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/bootstrap.min.css">
    <script src="${pageContext.request.contextPath}/resource/bootstrap.bundle.min.js"></script>

    <!-- Custom CSS -->
<%--     <link rel="stylesheet" href="${pageContext.request.contextPath}/css/calendar.css"> --%>

    <!-- 🔥 JSP에서 공휴일 빨간색 처리 -->
    <style>
        body {
            margin: 0;
            padding: 40px 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            background-color: #fcfcfc;
        }

        #calendar {
            max-width: 1000px;
            margin: 0 auto;
        }

        /* 주말(토/일) */
        .fc-day-sun .fc-daygrid-day-number,
        .fc-day-sun .fc-col-header-cell-cushion,
        .fc-day-sat .fc-daygrid-day-number,
        .fc-day-sat .fc-col-header-cell-cushion {
            color: #ff0000 !important;
        }

        /* ============================
           🔥 공휴일 이벤트 전용 스타일
           ============================ */

        /* 파란 이벤트 박스 완전 제거 */
        .fc-event.holiday-event,
        .fc-daygrid-event.holiday-event,
        .fc-v-event.holiday-event,
        .fc-h-event.holiday-event {
            background: none !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }

        /* 공휴일 글자 빨간색 + 볼드 */
        .holiday-event .fc-event-title,
        .holiday-event .fc-event-main {
            color: #ff0000 !important;
            font-weight: bold !important;
        }

        /* 날짜 숫자도 빨간색 (공휴일이 있는 칸) */
        .fc-daygrid-day:has(.holiday-event)
        .fc-daygrid-day-number {
            color: #ff0000 !important;
            font-weight: bold;
        }

        /* 리스트 뷰 공휴일 */
        .fc-list-event.holiday-event {
            background-color: #fff0f0 !important;
        }

        .fc-list-event.holiday-event .fc-list-event-title,
        .fc-list-event.holiday-event .fc-list-event-dot {
            color: #ff0000 !important;
            border-color: #ff0000 !important;
        }

        /* 모달 */
        .modal-content {
            background: #ffffff;
            padding: 25px;
            border-radius: 10px;
        }

        .modal-content input,
        .modal-content textarea {
            width: 95%;
            padding: 8px;
            margin-top: 5px;
            margin-bottom: 10px;
        }
    </style>
</head>

<body>

    <div id="calendar"></div>

    <div class="modal fade" id="eventModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <h4 id="modalTitle">📅 일정 상세 정보</h4>
                <hr>

                <input type="hidden" id="eventId">

                <label>제목</label>
                <input type="text" id="eventTitle" placeholder="일정 제목을 입력하세요">

                <label>시작 시간</label>
                <input type="datetime-local" id="eventStart">

                <label>종료 시간</label>
                <input type="datetime-local" id="eventEnd">

                <label>내용</label>
                <textarea id="eventContent" rows="3" placeholder="상세 내용을 입력하세요"></textarea>

                <div class="d-flex justify-content-between mt-3">
                    <button id="deleteEvent" class="btn btn-danger">삭제</button>
                    <div>
                        <button id="saveEvent" class="btn btn-primary">저장</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%-- <script src="${pageContext.request.contextPath}/js/calendar.js"></script> --%>

    <script>
        // 삭제 버튼 클릭 이벤트 로직 (참고용)
        // 실제 구현은 calendar.js 내부에 있는 calendar 객체를 참조해야 합니다.
        $(document).ready(function() {
            $('#deleteEvent').on('click', function() {
                const eventId = $('#eventId').val();
                
                if (!eventId) {
                    alert("삭제할 일정을 선택해주세요.");
                    return;
                }

                if (confirm("정말로 이 일정을 삭제하시겠습니까?")) {
                    // 1. 서버 통신 (AJAX 등)으로 DB 삭제 처리
                    // 2. FullCalendar에서 해당 이벤트 제거 (calendar.getEventById(eventId).remove())
                    // 3. 모달 닫기
                    
                    // ※ 구체적인 삭제 함수 호출은 calendar.js에 정의된 전역 함수나 
                    // 이벤트를 통해 처리하시기 바랍니다.
                    console.log("Delete Event ID:", eventId);
                    
                    // 예시: 
                    // deleteCalendarEvent(eventId); 
                }
            });
        });
    </script>



</body>
</html>