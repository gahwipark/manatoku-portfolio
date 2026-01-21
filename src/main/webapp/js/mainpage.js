document.getElementById("friendsListBtn").addEventListener("click", () => {
	loadPanel("friends");
	document.querySelectorAll(".tabs .nav button").forEach(b => b.classList.remove("active"));
	document.getElementById("friendsListBtn").classList.add("active");
});

document.getElementById("roomsListBtn").addEventListener("click", () => {
	loadPanel("rooms");
	document.querySelectorAll(".tabs .nav button").forEach(b => b.classList.remove("active"));
	document.getElementById("roomsListBtn").classList.add("active");
	
});

document.getElementById("panelContainer").addEventListener("click", (e) => {
	const btn = e.target.closest(".chat-btn");
	if (!btn) return;
	const friendUcode = btn.dataset.friendUcode;
	loadChat("friends",friendUcode);
});

function showPanel(targetId) {
  // 1. 모든 패널 숨기기
  const panels = document.querySelectorAll(".content-panel");
  panels.forEach(panel => {
    panel.style.display = "none";
  });

const target = document.getElementById(targetId);
  if (target) {
    target.style.display = "block";
  }
}

function loadPanel(type) {
if(type === "friends") {
	fetch(`${CTX}/api/friends`)
    	.then(res => res.json())
    	.then(renderFriends);
  } else {
	fetch(`${CTX}/api/rooms`)
		.then(res => res.json())
		.then(renderRooms);
  }
}

function renderFriends(list) {
	document.getElementById("panelName").textContent = "친구 목록";
	const panel = document.getElementById("panelContainer");
	panel.innerHTML = list.map(f => `<button class="chat-btn active" data-friend-ucode="${f.friendUcode}" data-stat="${f.friendStat}" data-friendname="${f.friendName}"><span class="name">${f.friendName}</span><span class="id">${f.friendId}</span><span class="status">${f.friendStat}</span></button>`).join("");
}

function renderRooms(list) {
	document.getElementById("panelName").textContent = "채팅 목록";
	const panel = document.getElementById("panelContainer");
	panel.innerHTML = list.map(r => `<div>${r.roomName}</div>`).join("");
}

async function loadChat(type,friendUcode) {
if(type === "friends") {
	const result = await fetch(`${CTX}/chat/friends?friendUcode=${encodeURIComponent(friendUcode)}`);
    const data = await result.json();
	document.getElementById("chatname").textContent = data.friend.name;
	renderMessages(data.messages);
	JoinRoom(data.roomId);
  }
}

function renderMessages(messages) {
	const box = document.querySelector("#chatMessages");
	box.innerHTML = ""; 
	for (const m of messages) {
		box.insertAdjacentHTML("beforeend", messageHtml(m));
		box.scrollTop = box.scrollHeight;
	}
}

function messageHtml(m) {
  // 서버가 isMine을 내려주면 가장 편함(아래 서버 예시에 포함)
  const cls = m.isMine ? "msg mine" : "msg other";
  const sender = m.isMine ? "" : `<div class="sender">${escapeHtml(m.senderName)}</div>`;

  return `
    <div class="${cls}">
      ${sender}
      <div class="bubble">${escapeHtml(m.content)}</div>
      <div class="time">${escapeHtml(m.createdAt)}</div>
    </div>
  `;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[c]));
}
