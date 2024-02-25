import { useState, useRef, useContext } from "react";
import { useParams } from 'react-router-dom';
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import useAxios from "../../../hooks/useAxios";
import AuthContext from "../../../context/authContext";

export default function ChatList({ contacts, lastMessages }) {
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState([]);
  let refInput = useRef();
  const { user } = useContext(AuthContext);
  const api = useAxios();
  console.log(user);

  const addContact = async (id) => {
    try {
      const response = await api.post(
        '/send-message/', 
        {
          sender: user.user_id,
          receiver: id,
          message: "👋",
          is_read: false,
        },
      );

        if (response.status !== 200) {

        }
    } catch (error) {
      console.log("A error ocurred:", error);
      refInput.current.value = "";
    };
    refInput.current.value = "";
    setUsers([]);
  };

  const handleSearch = async () => {
    let user = refInput.current.value;
    setSearching(true);
    try {
      const response = await api.get(`/search/${user}/`);
      const result = await response.data;
      setUsers(result);
      setSearching(false);
    } catch (error) {
      setUsers([]);
      setSearching(false);
    }
  };

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
          <input type="text" placeholder="Search..." ref={refInput} required />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {contacts.length === 0 && <h5 style={{ textAlign: "center" }}>Search for a contact 🔍</h5>}

        {refInput.current ? (
          refInput.current.value.length !== 0 ? (
            <>
            <h5 style={{ textAlign: "center" }}>Searching for a contact...🔍</h5>
            {users.map((user) => {
              const lastMessage = lastMessages.find((msg) => 
                msg.sender === user.id || msg.receiver === user.id
              );

              return (
                <ChatListItems
                  key={user.id}
                  id={user.id}
                  name={user.full_name}
                  active={"active"}
                  isOnline={"active"}
                  image={user.image}
                  lastMessage={lastMessage ? lastMessage.message : ""}
                  isRead={lastMessage ? lastMessage.is_read : "Error"}
                  senderId={lastMessage ? lastMessage.sender : "Error"}
                  addContact={() => addContact(user.id)}
                />
              );
            })}
            </>
          ) : (
            contacts.map((contact) => {
              const lastMessage = lastMessages.find((msg) => 
                msg.sender === contact.id || msg.receiver === contact.id
              );
              
              return (
                <ChatListItems
                  key={contact.id}
                  id={contact.id}
                  name={contact.full_name}
                  active={"active"}
                  isOnline={"active"}
                  image={contact.image}
                  lastMessage={lastMessage ? lastMessage.message : ""}
                  isRead={lastMessage ? lastMessage.is_read : "Error"}
                  senderId={lastMessage ? lastMessage.sender : "Error"}
                />
              );
            })
          )
        ) : (
          null
        )}
      </div>
    </div>
  );
}