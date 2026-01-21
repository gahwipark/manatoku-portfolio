<%@ page contentType="text/html; charset=UTF-8" %>
<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>WebSocket Chat</title>
</head>
<body>
  <div id="log" style="height:240px; overflow:auto; border:1px solid #ccc; padding:8px;"></div>

  <input id="msg" type="text" placeholder="메시지 입력" />
  <button id="sendBtn">전송</button>

  <script>
    // contextPath 포함해서 ws URL 만들기
    const ctx = "<%= request.getContextPath() %>";
    const wsUrl = (location.protocol === "https:" ? "wss://" : "ws://")
      + location.host + ctx + "/chat";

    const socket = new WebSocket(wsUrl);

    const log = document.getElementById("log");
    const msg = document.getElementById("msg");
    const sendBtn = document.getElementById("sendBtn");

    function append(text) {
      const div = document.createElement("div");
      div.textContent = text;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    socket.onopen = () => append("[system] connected");
    socket.onclose = () => append("[system] disconnected");
    socket.onerror = () => append("[system] error");
    socket.onmessage = (e) => append(e.data);

    function send() {
      const text = msg.value.trim();
      if (!text) return;
      socket.send(text);
      msg.value = "";
      msg.focus();
    }

    sendBtn.addEventListener("click", send);
    msg.addEventListener("keydown", (e) => {
      if (e.key === "Enter") send();
    });
  </script>
</body>
</html>