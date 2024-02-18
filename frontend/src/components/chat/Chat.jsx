import { useState, useEffect } from "react";
import "./chat.css";
import ChatList from "./chatList/ChatList";
import ChatContent from "./chatContent/ChatContent";
import axios from 'axios';

export default function Chat() {
  const [chatMessages, setChatMessages] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/my-messages/1/');
      setChatMessages(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const getContacts = (userId) => {
    chatMessages.forEach(msg => {
      contacts.some(contact => contact.id === msg.receiver_profile.id) ? null : contacts.push(msg.receiver_profile)
      contacts.some(contact => contact.id === msg.sender_profile.id) ? null : contacts.push(msg.sender_profile)
    });

    const filteredContacts = contacts.filter(contact => contact.id !== userId);
    console.log("Contactos:", filteredContacts);
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
    console.log("Mensajes:", chatMessages);
    const contactos = getContacts(1);
    setContacts(contactos)
  }, [chatMessages]);
  
  useEffect(() => {
    const ultimosMensajes = getLastMessages();
    console.log(ultimosMensajes);
    setLastMessages(ultimosMensajes);
  }, [contacts]);


  return (
    <div className="main__chatbody">
      <ChatList contacts={contacts} lastMessages={lastMessages} />
      <ChatContent contacts={contacts} chatMessages={chatMessages} />
    </div>
  );
}