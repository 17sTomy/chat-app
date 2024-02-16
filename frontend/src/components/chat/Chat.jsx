import { useState, useEffect } from "react";
import "./chat.css";
import ChatList from "./chatList/ChatList";
import ChatContent from "./chatContent/ChatContent";
import axios from 'axios';

export default function Chat() {
  const [chatMessages, setChatMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/my-messages/1/');
      setChatMessages(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const getContacts = (messages, userId) => {
    messages.forEach(msg => {
      contacts.some(contact => contact.id === msg.receiver_profile.id) ? null : contacts.push(msg.receiver_profile)
      contacts.some(contact => contact.id === msg.sender_profile.id) ? null : contacts.push(msg.sender_profile)
    });

    const filteredContacts = contacts.filter(contact => contact.id !== userId);
    console.log("Contactos:", filteredContacts);
    return filteredContacts;
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log("Mensajes:", chatMessages);
    const contactos = getContacts(chatMessages, 1)
    setContacts(contactos)
  }, [chatMessages]);


  return (
    <div className="main__chatbody">
      <ChatList contacts={contacts} />
      <ChatContent chatMessages={chatMessages} />
    </div>
  );
}