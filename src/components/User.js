import { useEffect, useState } from "react/cjs/react.development";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

/* local imports */
import Images from "../assets/Images";

export default function User({ chat, user1, user, selectUser }) {
  let defaultImage = Images[Math.floor(Math.random() * Images.length)];
  const [data, setData] = useState("");

  const user2 = user?.uid;
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMessage", id), (doc) => {
      setData(doc.data());
    });

    return () => unsub();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
        onClick={() => {
          selectUser(user);
        }}
      >
        <div className="user_info">
          <div className="user_detail">
            <img
              src={user.avatar || defaultImage}
              alt="avatar"
              className="avatar"
            />
            <h4>{user.name}</h4>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {/* {data && (
        <p className="truncate">
          <strong>{data.from === user1 ? "Me:" : null}</strong>
          {data.text}
        </p>
      )} */}
      </div>
      <div
        className={`sm_container sm_screen ${
          chat.name === user.name && "selected_user"
        }`}
        onClick={() => {
          selectUser(user);
        }}
      >
        <img
          src={user.avatar || defaultImage}
          alt="avatar"
          className="avatar"
        />
      </div>
    </>
  );
}
