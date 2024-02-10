import Avatar from "./Avatar";

export default function ChatListItems({ active, image, isOnline, name }) {

  const selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };


  return (
    <div
      onClick={selectChat}
      className={`chatlist__item ${
        active ? active : ""
      } `}
    >
      <Avatar
        image={
          image ? image : "http://placehold.it/80x80"
        }
        isOnline={isOnline}
      />

      <div className="userMeta">
        <p>{name}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );

} 