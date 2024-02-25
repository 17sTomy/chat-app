import { useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import AuthContext from "../../../context/authContext";

export default function ChatListItems({ id, name, image, active, lastMessage, isRead, senderId, addContact }) {
  const { user } = useContext(AuthContext);

  return (
    <Link to={`/${id}`} onClick={addContact}>
      <div className={`chatlist__item ${active ? active : ""}`}>
        <Avatar image={image} />
        <div className="userMeta">
          <p>{name}</p>
          {senderId !== user.user_id ? 
          (<span className="activeTime" style={{ color: isRead ? '#8d8a93' : 'black', fontWeight: isRead ? 'normal' : 'bold'  }}>{lastMessage}</span>
          ) : (
            <span className="activeTime">You: {lastMessage}</span>
          )}
        </div>
      </div>
    </Link>
  );
} 