import { useState } from "react"; 
import "./chatList.css";
import ChatListItems from "./ChatListItems";

const userInbox = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    id: 1,
    name: "Tim Hover",
    active: true,
    isOnline: true,
  },
  {
    image:
      "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    id: 2,
    name: "Ayub Rossi",
    active: false,
    isOnline: false,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
    id: 3,
    name: "Hamaad Dejesus",
    active: false,
    isOnline: false,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
    id: 4,
    name: "Eleni Hobbs",
    active: false,
    isOnline: true,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
    id: 5,
    name: "Elsa Black",
    active: false,
    isOnline: false,
  },
  {
    image:
      "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
    id: 6,
    name: "Kayley Mellor",
    active: false,
    isOnline: true,
  },
  {
    image:
      "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
    id: 7,
    name: "Hasan Mcculloch",
    active: false,
    isOnline: true,
  },
];

export default function ChatList({ contacts }) {
  const [chats, setChats] = useState(userInbox)

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
        {chats.map((item) => {
          return (
            <ChatListItems
              name={item.name}
              key={item.id}
              active={item.active ? "active" : ""}
              isOnline={item.isOnline ? "active" : ""}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
}