import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./chat.css";
import ChatList from "./chatList/ChatList";
import ChatContent from "./chatContent/ChatContent";
import AuthContext from "../../context/authContext";
import useAxios from "../../hooks/useAxios";

export default function Chat() {
  const [chatMessages, setChatMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const navigate = useNavigate();
  
  const fetchData = async () => {
    try {
      const response = await api.get(`/get-messages/`)
      setChatMessages(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const getContacts = () => {
    chatMessages.forEach(msg => {
      contacts.some(contact => contact.id === msg.receiver) 
        ? null 
        : contacts.push({...msg.receiver_profile, id: msg.receiver});

      contacts.some(contact => contact.id === msg.sender) 
        ? null 
        : contacts.push({...msg.sender_profile, id: msg.sender});
    });
    
    const filteredContacts = contacts.filter(contact => contact.id !== user.user_id);
    return filteredContacts;
  };

  const getLastMessages = () => {
    const lastMessagesCopy = [];

    contacts.forEach(contact => {
      let lastMessage = chatMessages.filter((msg) => msg.sender === contact.id || msg.receiver === contact.id).pop();
      lastMessagesCopy.push(lastMessage);
    });

    return lastMessagesCopy;
  };

  useEffect(() => {
    fetchData();
    window.addEventListener('load', () => navigate("/"));

    const intervalChats = setInterval(fetchData, 1000);

    return () => clearInterval(intervalChats);
  }, []);
  
  useEffect(() => {
    // console.log(chatMessages);
    const contactos = getContacts();
    setContacts(contactos)
  }, [chatMessages]);
  
  useEffect(() => {
    const ultimosMensajes = getLastMessages();
    setLastMessages(ultimosMensajes);
    // console.log(contacts);
  }, [contacts]);


  return (
    <div className="main__chatbody">
      <ChatList contacts={contacts} lastMessages={lastMessages} />
      <ChatContent contacts={contacts} chatMessages={chatMessages} />
    </div>
  );
}