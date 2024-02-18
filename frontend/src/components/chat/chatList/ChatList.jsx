import "./chatList.css";
import ChatListItems from "./ChatListItems";


export default function ChatList({ contacts, lastMessages }) {
  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search..." required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {contacts.map((contact) => {
          const lastMessage = lastMessages.find((msg) => msg.receiver_profile.id === contact.id || msg.sender_profile.id === contact.id)

          return (
            <ChatListItems
              key={contact.id}
              id={contact.id}
              name={contact.full_name}
              active={"active"}
              isOnline={"active"}
              image={contact.image}
              lastMessage={lastMessage ? lastMessage.message : "No hay mensajes"}
              isRead={lastMessage ? lastMessage.isRead : "Error"}
              senderId={lastMessage ? lastMessage.sender_profile.id : "Error"}
            />
          );
        })}
      </div>
    </div>
  );
}