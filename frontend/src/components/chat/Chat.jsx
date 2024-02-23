import { useState, useEffect, useContext } from "react";
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
  
  const fetchData = async () => {
    try {
      const response = await api.get(`/get-messages/${user.user_id}/`)
      setChatMessages(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const getContacts = () => {
    chatMessages.forEach(msg => {
      contacts.some(contact => contact.id === msg.receiver_profile.id) ? null : contacts.push(msg.receiver_profile)
      contacts.some(contact => contact.id === msg.sender_profile.id) ? null : contacts.push(msg.sender_profile)
    });

    const filteredContacts = contacts.filter(contact => contact.id !== user.user_id);
    // console.log("Contactos:", filteredContacts);
    return filteredContacts;
  };

  const getLastMessages = () => {
    const lastMessagesCopy = [];

    contacts.forEach(contact => {
      let lastMessage = chatMessages.filter((msg) => msg.receiver_profile.id === contact.id || msg.sender_profile.id === contact.id).pop();
      lastMessagesCopy.push(lastMessage);
    });

    return lastMessagesCopy;
  };

  useEffect(() => {
    fetchData();
    window.onload = function() {
       if (window.location.href !== "http://127.0.0.1:5173/inbox") {
        window.location.href = "http://127.0.0.1:5173/inbox"
       }
    };
  }, []);
  
  useEffect(() => {
    // console.log("Mensajes:", chatMessages);
    const contactos = getContacts();
    setContacts(contactos)
  }, [chatMessages]);
  
  useEffect(() => {
    const ultimosMensajes = getLastMessages();
    // console.log(ultimosMensajes);
    setLastMessages(ultimosMensajes);
  }, [contacts]);


  return (
    <div className="main__chatbody">
      <ChatList contacts={contacts} lastMessages={lastMessages} />
      <ChatContent contacts={contacts} chatMessages={chatMessages} />
    </div>
  );
}