package chat;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.time.Instant;
import java.util.Set;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/ws/chat/{roomId}")
public class ChatEndpoint {

    // roomId -> sessions
    private static final Map<String, Set<Session>> ROOMS = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") String roomId) {
        ROOMS.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);
        session.getUserProperties().put("roomId", roomId);
    }

    @OnClose
    public void onClose(Session session) {
        removeSession(session);
    }

    @OnError
    public void onError(Session session, Throwable t) {
        removeSession(session);
    }

    private void removeSession(Session session) {
        Object rid = session.getUserProperties().get("roomId");
        if (rid == null) return;

        String roomId = String.valueOf(rid);
        Set<Session> set = ROOMS.get(roomId);
        if (set != null) {
            set.remove(session);
            if (set.isEmpty()) ROOMS.remove(roomId);
        }
    }

    @OnMessage
    public void onMessage(String message, Session sender) throws IOException {
        // message는 JSON 추천: {"type":"chat","roomId":"...","content":"..."}
        // 여기서는 최소로 그냥 roomId는 sender에서 꺼내고, 그대로 브로드캐스트 처리
        String roomId = String.valueOf(sender.getUserProperties().get("roomId"));
        if (roomId == null) return;

        // TODO: 여기서 DB 저장(권장) -> senderUcode는 인증에서 꺼내는 게 맞음
        String payload = message; // 실제로는 서버에서 createdAt, senderName 등을 붙여서 내려주는 걸 추천

        Set<Session> peers = ROOMS.get(roomId);
        if (peers == null) return;

        for (Session s : peers) {
            if (s.isOpen()) s.getBasicRemote().sendText(payload);
        }
    }
}