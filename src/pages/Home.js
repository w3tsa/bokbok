import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
/* local import */
import { db, auth, storage } from "../firebase";
import User from "../components/User";
import MessageForm from "../components/MessageForm";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState();

  const self = auth.currentUser.uid;
  useEffect(() => {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [self]));
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

  async function handleSubmit(e) {
    e.preventDefault();

    const user2 = chat.uid;
    const id = self > user2 ? `${self + user2}` : `${user2 + self}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    // messages => chat => id
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: self,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    setText("");
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
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
}
