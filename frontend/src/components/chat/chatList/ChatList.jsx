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
        {contacts.length === 0 && <h5 style={{ textAlign: "center" }}>Search for a contact 🔍</h5>}
        
        {contacts.map((contact) => {
          const lastMessage = lastMessages.find((msg) => msg.sender === contact.id || msg.receiver === contact.id)
          
          return (
            <ChatListItems
              key={contact.id}
              id={contact.id}
              name={contact.full_name}
              active={"active"}
              isOnline={"active"}
              image={contact.image}
              lastMessage={lastMessage ? lastMessage.message : "No hay mensajes"}
              isRead={lastMessage ? lastMessage.is_read : "Error"}
              senderId={lastMessage ? lastMessage.sender : "Error"}
            />
          );
        })}
      </div>
    </div>
  );
}