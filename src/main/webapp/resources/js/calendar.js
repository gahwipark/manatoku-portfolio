var calendar;
// [수정] Bootstrap 관련 초기화 코드 삭제

$(document).ready(function() {

    initCalendar(); // 캘린더 초기화 함수 호출

    // [추가] 모달 닫기 버튼 이벤트 (취소 버튼)

    $("#btnClose").click(function() {

        $("#eventModal").hide();

    });

});


//캘린더 초기화 함수 (캘린더 높이 및 비율 설정)
function initCalendar() {

    var calendarEl = document.getElementById('calendar');

    if (!calendarEl) return;

    calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',

        locale: 'ja',

        // 높이를 특정하지 않고 내부 비율에 맡김

        height: 'auto',

        contentHeight: 'auto',

        aspectRatio: 1.35,     // 가로 대비 세로 비율 고정 (숫자가 작을수록 칸이 길어짐)

        expandRows: true,      // 일정이 적어도 칸 크기 유지

        // [틀 깨짐 방지] 일정이 많아도 5개까지만 노출하고 높이를 유지함

        dayMaxEvents: 5,

        dayMaxEventRows: 5,

        expandRows: true,       // 일정이 적은 날도 칸 높이를 동일하게 맞춤

        headerToolbar: {

            left: 'prev,next today',

            center: 'title',

            right: 'dayGridMonth,timeGridWeek,listWeek'

        },


        /*  멀티 소스 일정 데이터 조회 */

        eventSources: [

            {

                // 1. 내 DB 일정 (Controller.handleGet() 메서드 연동)

                events: function(info, successCallback, failureCallback) {
                    $.ajax({
                        url: '/cal.do',
                        type: 'GET',
                        data: { command: 'list' },
                        success: function(response) {
                            console.log("✅ 서버에서 일정 데이터 로드:", response);
                            successCallback(response);
                        },
                        error: function() {
                            console.error("❌ 일정 데이터 로드 실패");
                            failureCallback();
                        }
                    });
                }
            },
            {
                // 2. 구글 공휴일 API (2027년 이후 자동 갱신용)

                url: 'https://calendar.google.com/calendar/ical/ja.japanese%23holiday%40group.v.calendar.google.com/public/basic.ics',

                format: 'ics',

                className: 'holiday-event', // JSP 내 CSS 스타일 적용

                editable: false,

                display: 'block'

            }

        ],


        /*  연도와 상관없이 공휴일 판별 및 스타일 적용 */
        // 서버에서 받은 JSON 데이터를 FullCalendar 형식으로 변환
        // 공휴일 여부를 판별하여 => Holiday / Personal 스타일 각각 적용

        eventDataTransform: function(event) {

            // DB 필드명을 FullCalendar 표준 필드명으로 매핑 (DB 컬럼명 -> FC 속성명)

            event.id = event.calendar_id || event.id;


            // 공휴일 판별용 날짜 피싱
            // 날짜 피싱이란? "1-1", "5-5" 같은 월-일 형태로 변환하여 * - 연도와 상관없이 매년 반복되는 공휴일을 찾기 위함
            /* [공휴일 판별 3가지 방법]
               1) 출처가 구글 API → 무조건 공휴일
               2) DB의 calendar_type이 'HOLIDAY' → 가상 공휴일
               3) 제목에 키워드 포함 → 변동 날짜 공휴일 */

            var eventDate = new Date(event.start);

            var month = eventDate.getMonth() + 1; // 1~12

            var date = eventDate.getDate();       // 1~31

            var monthDay = month + "-" + date;    // 예: "1-1", "5-5"

            var title = event.title || "";


            // 1. 날짜 고정 공휴일 (연도와 상관없이 매년 동일한 날짜 반복복)

            var fixedHolidays = [

                "1-1",   // 元日 (신정)

                "2-11",  // 建国記念の日 (건국기념일)

                "2-23",  // 天皇誕生日 (천황탄생일)

                "4-29",  // 昭和の日 (쇼와의 날)

                "5-3",   // 憲法記念日 (헌법기념일)

                "5-4",   // みどりの日 (녹색의 날)

                "5-5",   // こどもの日 (어린이날)

                "8-11",  // 山の日 (산의 날)

                "11-3",  // 文化の日 (문화의 날)

                "11-23", // 勤労感謝の日 (근로감사의 날)

                "12-25"  // クリスマス (크리스마스)

            ];

            // 2. 키워드 기반 공휴일 (날짜가 매년 변하는 '해피 먼데이' 대응)

            var holidayKeywords = [

                "祝日", "成人の日", "春分の日", "海の日", "敬老の日", "秋分の日", "スポーツの日"

            ];

            var isHoliday = false;


// 4. [중요] 출처 및 타입 확인

            var isGoogle = (event.source && event.source.url && event.source.url.includes('google.com'));

            var type = event.calendar_type || (event.extendedProps && event.extendedProps.calendar_type);

            // [체크 1+2+3] 날짜가 고정 공휴일 리스트에 있는가?

            // 제목에 공휴일 키워드가 포함되어 있는가?

            // DB에서 아예 HOLIDAY 타입으로 넘어왔는가?

            var isHoliday = isGoogle ||

                (type === 'HOLIDAY') ||

                (holidayKeywords.some(function (kw) {

                    return title.includes(kw);

                }));

            // 결과에 따른 개별 스타일 적용 (중요: 여기서 각각의 '이벤트'에 스타일을 부여함)

            if (isHoliday) {

                // 공휴일 스타일: 살구색, 수정불가

                event.classNames = ['holiday-event'];

                event.color = '#ff9f89';

                event.allDay = true;

                event.editable = false;

                event.display = 'block';


                // 개인 일정: 5가지 색상 중 자동 할당
            } else {
                var colors = ['#3788d8', '#e67e22', '#27ae60', '#8e44ad', '#c0392b'];
                var colorIndex = (event.calendar_id || event.id) % 5;

                event.classNames = ['personal-event'];
                event.color = colors[colorIndex];
                event.editable = true;
                event.display = 'block';
            }

            return event;
        },  // eventDataTransform 함수 종료

        /* [기능 2] 날짜 선택 시 (신규 일정 등록) */

        selectable: true,

        select: function(info) {

            $("#eventTitle").val('');

            $("#eventContent").val('');

            var start = info.startStr.includes("T") ? info.startStr.substring(0, 16) : info.startStr + "T09:00";

            var end = info.endStr && info.endStr.includes("T") ? info.endStr.substring(0, 16) : info.startStr + "T18:00";

            $("#eventStart").val(start);

            $("#eventEnd").val(end);

            // 버튼 제어 및 모달 표시 (jQuery)

            $("#btnInsert").show().data("mode", "insert").data("id", "");

            $("#btnUpdate, #btnDelete").hide();

            $("#modalTitle").text("📅 予定の登録");

            $("#eventModal").show();

            calendar.unselect();

        },

        /* [기능 추가] 이벤트 클릭 시 추가 */

        eventClick: function(info) {

            if (info.event.classNames.includes('holiday-event')) return;

            // FullCalendar의 표준 ID 혹은 extendedProps에서 직접 가져오기
            var eventId = info.event.id || info.event.extendedProps.calendar_id;

            $("#eventTitle").val(info.event.title);

            $("#eventContent").val(info.event.extendedProps.content || '');

            if (info.event.start) $("#eventStart").val(info.event.startStr.substring(0, 16));

            if (info.event.end) {

                $("#eventEnd").val(info.event.endStr.substring(0, 16));

            } else {

                $("#eventEnd").val('');

            }

            var eventId = info.event.id;

            // [수정] 버튼 제어 및 모달 표시 (jQuery)

            $("#btnInsert").hide();

            $("#btnUpdate, #btnDelete").show().data("id", eventId);

            $("#modalTitle").text("📅 予定の修正");

            $("#eventModal").show(); // 커스텀 모달 열기

        }

    });

    calendar.render();

}

/* =====================

    저장 및 삭제 AJAX 핸들러

   ===================== */

// 1. [등록] 버튼 클릭 핸들러

$(document).on('click', '#btnInsert', function() {

    var mode = $(this).data("mode") || "insert"; // JSP에 data-mode="insert"가 있으면 가져옴

    var eventData = {

        command: mode,

        ucode : (typeof currentUcode !== 'undefined') ? currentUcode : "",

        calendarId: "", // 등록 시에는 ID가 필요 없음

        title: $('#eventTitle').val(),

        content: $('#eventContent').val(),

        start: $('#eventStart').val(),

        end: $('#eventEnd').val()

    };

    console.log("등록 요청 데이터:", eventData);

    if (!eventData.title) {

        alert('タイトルを入力してください。');

        return;

    }

    ajaxCall(eventData);

});

// 2. [수정] 버튼 클릭 핸들러

$(document).on('click', '#btnUpdate', function() {

    var mode = $(this).data("mode") || "update";

    var eventId = $(this).data("id"); // eventClick 시점에 주입된 ID

    var eventData = {

        command: mode,

        ucode : (typeof currentUcode !== 'undefined') ? currentUcode : "",

        calendarId: eventId, // 수정 시 반드시 필요

        title: $('#eventTitle').val(),

        content: $('#eventContent').val(),

        start: $('#eventStart').val(),

        end: $('#eventEnd').val()

    };

    console.log("수정 요청 데이터:", eventData);

    if (!eventData.title) {

        alert('タイトルを入力してください。');

        return;

    }

    ajaxCall(eventData);

});

// 3. [삭제] 버튼 클릭 핸들러

$(document).on('click', '#btnDelete', function() {

    var id = $(this).data("id");

    if (!id) {

        alert("削除する予定が見つかりません。");

        return;

    }

    if (confirm("この予定を削除しますか？")) {

        ajaxCall({

            command: "delete",

            calendarId: id

        });

    }

});

// [공통] AJAX 호출 함수

function ajaxCall(data) {

    $.ajax({

        url: '/cal.do',

        type: 'POST',

        data: data,

        success: function(res) {

            // res가 무엇이든(숫자든 객체든) 문자열로 변환 후 공백 제거
            var result = String(res).trim();

            if (result === "1") {

                alert("完了しました。");

                $("#eventModal").hide();

                // ✅ 캘린더 자동 새로고침
                if (calendar) { calendar.refetchEvents(); } // ← F5 없이 자동 갱신!
                console.log("✅ 캘린더 새로고침 완료");



            } else if (result === "-1") {

                alert("該当時間に既に予定があります。（重複チェック）");

            } else {

                alert("失敗しました: " + res);

            }

        },

        error: function() {

            alert("通信エラーが発生しました。");

        }

    });

}

/* =================================
    채팅=>날짜 입력시 캘린더 연동 함수
   ================================= */

// 채팅에서 캘린더 모달 열기 (전역 함수로 선언)
/* =================================
    채팅=>날짜 입력시 캘린더 연동 함수
   ================================= */
window.OpenCalendarFromChat = function(messageContent, detectedDate) {
    console.log('openCalendarFromChat 호출:', messageContent, detectedDate);

    /* 날짜 검증 */
    if (!detectedDate || detectedDate === 'undefined') {
        detectedDate = new Date().toISOString().substring(0, 10);
    }

    /* 메시지에서 날짜 부분 제거하여 타이틀 생성 */
    var title = messageContent.replace(/\d{4}[-/]\d{1,2}[-/]\d{1,2}/g, '').trim();

    /* 타이틀이 비어있으면 기본 메시지 사용 */
    if (!title) {
        title = 'チャットで生成された予定';
    }

    /* 모달 필드 설정 */
    $("#eventTitle").val(title);
    $("#eventContent").val("チャットから登録: " + messageContent);
    $("#eventStart").val(detectedDate + "T09:00");
    $("#eventEnd").val(detectedDate + "T10:00");

    /* 버튼 제어 */
    $("#btnInsert").show().data("mode", "insert").data("id", "");
    $("#btnUpdate, #btnDelete").hide();
    $("#modalTitle").text("📅 予定の登録");

    /* 모달 표시 */
    $("#eventModal").show();


    console.log('모달 설정 완료');
};