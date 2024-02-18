import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function ChatListItems({ id, name, image, active, isOnline}) {

  // al hacer click en cada chat, este es un NavLink q cambia la url poniendo su id /inbox/<user_id>/
  // esto sirve para poder renderizar el chat de cada usuario

  const selectChat = (e) => {
    for (let index = 0; index < e.currentTarget.parentNode.children.length; index++) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  return (
    <Link to={`/inbox/${id}`}>
      <div
        onClick={selectChat}
        className={`chatlist__item ${active ? active : ""}`}
      >
        <Avatar
          image={image}
          isOnline={isOnline}
        />
  
        <div className="userMeta">
          <p>{name}</p>
          <span className="activeTime">Hola como estas</span>
        </div>
      </div>
    </Link>
  );

} 