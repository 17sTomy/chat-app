import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";

// let chatItms = [
//   {
//     key: 1,
//     image:
//       "https://media.istockphoto.com/id/1194645897/es/vector/retrato-de-una-mujer-fuerte-y-hermosa-de-perfil-con-el-pelo-rubio.jpg?s=612x612&w=0&k=20&c=IH1fHSzti02h2NhwBhUTkZgU9TEJ7a0DCIqr6JFZbe4=",
//     type: "",
//     msg: "Hi Tim, How are you?",
//   },
//   {
//     key: 2,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "I am fine.",
//   },
//   {
//     key: 3,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "What about you?",
//   },
//   {
//     key: 4,
//     image:
//       "https://media.istockphoto.com/id/1194645897/es/vector/retrato-de-una-mujer-fuerte-y-hermosa-de-perfil-con-el-pelo-rubio.jpg?s=612x612&w=0&k=20&c=IH1fHSzti02h2NhwBhUTkZgU9TEJ7a0DCIqr6JFZbe4=",
//     type: "",
//     msg: "Awesome these days.",
//   },
//   {
//     key: 5,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "Finally. What's the plan?",
//   },
//   {
//     key: 6,
//     image:
//       "https://media.istockphoto.com/id/1194645897/es/vector/retrato-de-una-mujer-fuerte-y-hermosa-de-perfil-con-el-pelo-rubio.jpg?s=612x612&w=0&k=20&c=IH1fHSzti02h2NhwBhUTkZgU9TEJ7a0DCIqr6JFZbe4=",
//     type: "",
//     msg: "what plan mate?",
//   },
//   {
//     key: 7,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "I'm taliking about the tutorial",
//   },
// ];
 
function ChatContent({ chatMessages, contacts }) {
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState(""); 
  const [contact, setContact] = useState({}); 
  const messagesEndRef = useRef(null);
  const { id } = useParams();

  const getChat = () => {
    const conversation = [];
    chatMessages.forEach((msg) => {
      if ((msg.sender_profile.id === parseInt(id)) || (msg.receiver_profile.id === parseInt(id))) {
        conversation.push(msg)
      }
    });
    setChat(conversation);
    console.log("Chat con un contacto:", conversation);
  };

  const getContactInfo = () => contacts.find((contact) => contact.id === parseInt(id));
  
  const sendMessage = (e) => {
    if (msg.trim() !== "") {
      const newChatItem = {
        key: 1,
        type: "",
        msg: msg,
        image:
          "https://media.istockphoto.com/id/1194645897/es/vector/retrato-de-una-mujer-fuerte-y-hermosa-de-perfil-con-el-pelo-rubio.jpg?s=612x612&w=0&k=20&c=IH1fHSzti02h2NhwBhUTkZgU9TEJ7a0DCIqr6JFZbe4=",
      };

      setChat([...chat, newChatItem]);
      scrollToBottom();
      setMsg("");
    }
  };
  
  const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };
    
  const onStateChange = (e) => {
      setMsg(e.target.value);
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        sendMessage();
        event.preventDefault();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    scrollToBottom();
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [msg, chat]);

  useEffect(() => {
    getChat();
    const contact = getContactInfo();
    contact ? setContact(contact) : null;
  }, [id]);
  
  return (
    <>
      {id ? (
        <div className="main__chatcontent">
            <div className="content__header">
              <div className="blocks">
                <div className="current-chatting-user">
                  <Avatar
                    isOnline="active"
                    image={contact.image}
                  />
                  <p>{contact.full_name}</p>
                </div>
              </div>
              <div className="blocks">
                <div className="settings">
                  <button className="btn-nobg">
                    <i className="fa fa-cog"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="content__body">
              <div className="chat__items">
                {chat.map((msg) => (
                  <ChatItem
                  key={msg.id}
                  user={msg.sender_profile.id === parseInt(id) ? "other" : "me"}
                  message={msg}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="content__footer">
              <div className="sendNewMessage">
                <button className="addFiles">
                  <i className="fa fa-plus"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message here"
                  onChange={onStateChange}
                  value={msg}
                />
                <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessage}>
                  <i className="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
        </div>
      ) : (
        <div className="main__chatcontent" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h4>Clickee un chat para empezar o seguir una conversación😃</h4>
        </div>
      )}
      </>
  );
};

export default ChatContent;
