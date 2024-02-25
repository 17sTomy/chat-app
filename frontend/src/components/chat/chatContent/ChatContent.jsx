import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from 'react-router-dom';
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import AuthContext from "../../../context/authContext";
import useAxios from "../../../hooks/useAxios";

function ChatContent({ chatMessages, contacts }) {
  const messagesEndRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState(""); 
  const [contact, setContact] = useState({}); 
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const api = useAxios();

  const getChat = () => {
    const conversation = [];
    chatMessages.forEach((msg) => {
      if ((msg.sender === parseInt(id)) || (msg.receiver === parseInt(id))) {
        conversation.push(msg)
      }
    });
    setChat(conversation);
  };

  const getContactInfo = () => contacts.find((contact) => contact.id === parseInt(id));
  
  const sendMessage = async () => {
    try {
      const response = await api.post(
        '/send-message/', 
        {
          sender: user.user_id,
          receiver: contact.id,
          message: msg,
          is_read: false,
        },
      );
      let newMsg = response.data;
      setChat([...chat, newMsg]);
      scrollToBottom();
      setMsg("");
    } catch (error) {
      console.log("An error has ocurred:", error);
    };
  };

  const readMessages = async () => {
    try {
      await api.patch(`/read-messages/${contact.id}/`)
    } catch (error) {
      console.log("An error has ocurred:", error);
    };
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
  }, [id, chatMessages]);

  useEffect(() => {
    contact.id !== undefined ? readMessages() : null;
  }, [contact]);
  
  return (
    <>
      {id ? (
        <div className="main__chatcontent">
            <div className="content__header">
              <div className="blocks">
                <div className="current-chatting-user">
                  <Avatar image={contact.image} />
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
                  user={msg.sender === parseInt(id) ? "other" : "me"}
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
          <h4>Click a chat in order to start or keep a conversation😃</h4>
        </div>
      )}
      </>
  );
};

export default ChatContent;
