import "./chat.css";
import ChatList from "./chatList/ChatList";
import ChatContent from "./chatContent/ChatContent";

export default function Chat() {
  return (
    <div className="main__chatbody">
      <ChatList />
      <ChatContent />
    </div>
  );
}