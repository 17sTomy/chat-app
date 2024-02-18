import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function ChatListItems({ id, name, image, active, isOnline, lastMessage, isRead, senderId }) {
  return (
    <Link to={`/inbox/${id}`}>
      <div
        className={`chatlist__item ${active ? active : ""}`}
      >
        <Avatar image={image} isOnline={isOnline} />
        <div className="userMeta">
          <p>{name}</p>
          {senderId !== 1 ? 
          (<span className="activeTime" style={{ color: isRead ? '#8d8a93' : 'black', fontWeight: isRead ? 'normal' : 'bold'  }}>{lastMessage}</span>
          ) : (
            <span className="activeTime">You: {lastMessage}</span>
          )}
        </div>
      </div>
    </Link>
  );
} 