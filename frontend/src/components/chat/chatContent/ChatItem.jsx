import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default function ChatItem({ user, msg, image }) {
    return (
      <div
        className={`chat__item ${user ? user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{msg}</div>
          <div className="chat__meta">
            <span>16 mins ago</span>
          </div>
        </div>
        <Avatar isOnline="active" image={image} />
      </div>
    );
}