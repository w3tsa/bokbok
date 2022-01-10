import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

/* local import */
import { db, auth } from "../firebase";
import User from "../components/User";
import MessageForm from "../components/MessageForm";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    // execute the query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });

    return () => unsub();
  }, []);
  function selectUser(user) {
    setChat(user);
  }
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => {
          return <User key={user.uid} user={user} selectUser={selectUser} />;
        })}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <img src={chat.avatar} alt="user" id="messaging_user" />
              <h3>{chat.name}</h3>
            </div>
            <MessageForm />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
}
