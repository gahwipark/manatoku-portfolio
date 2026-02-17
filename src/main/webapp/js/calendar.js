var calendar;
var eventModal;

$(document).ready(function() {
    var modalEl = document.getElementById('eventModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
        eventModal = new bootstrap.Modal(modalEl);
    }
    initCalendar();
});

function initCalendar() {
    var calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

   calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
         locale: 'ja',
        
        // 🔥 [수정] 높이를 특정하지 않고 내부 비율에 맡김
        height: 'auto',
        contentHeight: 'auto',
        aspectRatio: 1.35,     // 가로 대비 세로 비율 고정 (숫자가 작을수록 칸이 길어짐)
        
        expandRows: true,      // 일정이 적어도 칸 크기 유지
        
        // 🔥 [틀 깨짐 방지] 일정이 많아도 5개까지만 노출하고 높이를 유지함
        dayMaxEvents: 5,       
        dayMaxEventRows: 5,
        expandRows: true,       // 일정이 적은 날도 칸 높이를 동일하게 맞춤

        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },

        /* 🔥 [수정] 멀티 소스 일정 데이터 조회 */
        eventSources: [
            {
                // 1. 내 DB 일정 (Servlet 연동)
                url: '/manatoku/cal.do?command=list'
            },
            {
                // 2. 구글 제공 일본 공휴일 (2027년 이후 자동 갱신용)
                url: 'https://calendar.google.com/calendar/ical/ja.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics',
                format: 'ics',
                className: 'holiday-event', // JSP 내 CSS 스타일 적용
                editable: false,
                display: 'block'
            }
        ],

    /* 🔥 [수정된 기능] 연도와 상관없이 공휴일 판별 및 스타일 적용 */
eventDataTransform: function(event) {
    var eventDate = new Date(event.start);
    var month = eventDate.getMonth() + 1; // 1~12
    var date = eventDate.getDate();       // 1~31
    var monthDay = month + "-" + date;    // 예: "1-1", "5-5"

    // 1. 날짜 고정 공휴일 (연도와 상관없이 매년 동일한 날짜)
    var fixedHolidays = [
        "1-1",   // 元日 (신정)
        "2-11",  // 建国記念の日 (건국기념일)
        "2-23",  // 天皇誕生日 (천황탄생일)
        "4-29",  // 昭和の日 (쇼와의 날)
        "5-3",   // 憲法記念日 (헌법기념일)
        "5-4",   // みどりの日 (녹색의 날)
        "5-5",   // こどもの日 (어린이날)
        "8-11",  // 山の日 (산의 날)
        "11-3",  // 文化の日 (문화의 날)
        "11-23", // 勤労感謝の日 (근로감사의 날)
        "12-25"  // クリスマス (크리스마스)
    ];

    // 2. 키워드 기반 공휴일 (날짜가 매년 변하는 '해피 먼데이' 대응)
    var holidayKeywords = [
        "祝日", "成人の日", "春分の日", "海の日", "敬老の日", "秋分の日", "スポーツの日"
    ];

    var isHoliday = false;

    // 판별 로직 A: 날짜 체크 (고정 공휴일)
    if (fixedHolidays.includes(monthDay)) {
        isHoliday = true;
    }

    // 판별 로직 B: DB 타입 체크
    if (!isHoliday && event.extendedProps && event.extendedProps.calendar_type === 'HOLIDAY') {
        isHoliday = true;
    }

    // 판별 로직 C: 키워드 체크
    if (!isHoliday) {
        for (var i = 0; i < holidayKeywords.length; i++) {
            if (event.title && event.title.includes(holidayKeywords[i])) {
                isHoliday = true;
                break;
            }
        }
    }

    // 공휴일 스타일 적용
    if (isHoliday) {
        event.classNames = ['holiday-event'];
        event.allDay = true;
        event.editable = false;
        event.display = 'block';
    }

    return event;
},

        /* [기능 2] 날짜 선택 시 (신규 일정 등록) */
        selectable: true,
        select: function(info) {
            $("#eventTitle").val('');
            $("#eventContent").val('');

            var start = info.startStr.includes("T")
                ? info.startStr.substring(0, 16)
                : info.startStr + "T09:00";

            var end = info.endStr && info.endStr.includes("T")
                ? info.endStr.substring(0, 16)
                : info.startStr + "T18:00";

            $("#eventStart").val(start);
            $("#eventEnd").val(end);

            $("#saveEvent").data("mode", "insert").data("id", "");
            $("#deleteEvent").hide();

			$("#modalTitle").text("📅 予定の登録"); 

            if (eventModal) eventModal.show();
            calendar.unselect();
        },

        /* [기능 3] 이벤트 클릭 시 (일정 수정/삭제) */
        eventClick: function(info) {
            // 공휴일(구글 또는 DB 공휴일)은 클릭 시 모달창을 띄우지 않음
            if (info.event.classNames.includes('holiday-event')) {
                return;
            }

            $("#eventTitle").val(info.event.title);
            $("#eventContent").val(info.event.extendedProps.content || '');

            if (info.event.start) {
                $("#eventStart").val(info.event.startStr.substring(0, 16));
            }
            if (info.event.end) {
                $("#eventEnd").val(info.event.endStr.substring(0, 16));
            } else {
                $("#eventEnd").val('');
            }

            var eventId = info.event.id;
            $("#saveEvent").data("mode", "update").data("id", eventId);
            $("#deleteEvent").data("id", eventId).show();
			
			$("#modalTitle").text("📅 予定の修正");
            if (eventModal) eventModal.show();
        }
    });

    calendar.render();
}

/* =====================
    저장 및 삭제 AJAX 핸들러
   ===================== */

$(document).on('click', '#saveEvent', function() {
    var mode = $(this).data("mode");
    var eventData = {
        command: mode,
                ucode : `${ucode}`,
                id: $(this).data("id") || "",
        title: $('#eventTitle').val(),
        content: $('#eventContent').val(),
        start: $('#eventStart').val(),
        end: $('#eventEnd').val()
    };

    if (!eventData.title) {
        alert('タイトルを入力してください。');
        return;
    }

    ajaxCall(eventData);
});

$(document).on('click', '#deleteEvent', function() {
    var id = $(this).data("id");
    if (!id) return;

    if (confirm("この予定を削除しますか？")) {
        ajaxCall({ command: "delete", id: id });
    }
});

function ajaxCall(data) {
    $.ajax({
        url: '/manatoku/cal.do',
        type: 'POST',
        data: data,
        success: function(res) {
            if (res.trim() === "1") {
                alert("完了しました。");
                if (eventModal) eventModal.hide();
                calendar.refetchEvents();
            } else if (res.trim() === "-1") {
                alert("該当時間に既に予定があります. (重複チェック)");
            } else {
                alert("失敗: " + res);
            }
        },
        error: function() {
            alert("通信エラーが発生しました。");
        }
    });
}