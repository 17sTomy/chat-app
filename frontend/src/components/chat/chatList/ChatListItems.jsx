import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function ChatListItems({ id, name, image, active, isOnline, lastMessage, isRead}) {
  return (
    <Link to={`/inbox/${id}`}>
      <div
        className={`chatlist__item ${active ? active : ""}`}
      >
        <Avatar image={image} isOnline={isOnline} />
        <div className="userMeta">
          <p>{name}</p>
          <span className="activeTime" style={{ color: isRead ? '#ceccd3' : 'black', fontWeight: isRead ? 'normal' : 'bold'  }}>{lastMessage}</span>
        </div>
      </div>
    </Link>
  );
} 