import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default function ChatItem({ user, message }) {

  const getFormatDate = (stringDate) => {
    const dateObject = new Date(stringDate);
  
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months in JavaScript are 0-based
    const year = dateObject.getFullYear().toString();
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  
    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
    return formattedDate;
  };
  
  return (
    <div
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{message.message}</div>
        <div className="chat__meta">
        <span>{getFormatDate(message.date)}</span>
        </div>
      </div>
      <Avatar isOnline="active" image={!message.sender_profile.image ? message.sender_profile.image : "/src/assets/default_profile_image.png"} />
    </div>
  );
}