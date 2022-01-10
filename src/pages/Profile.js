import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/* local import */
import Images from "../assets/Images";
import Camera from "../components/svg/Camera";
import Delete from "../components/svg/Delete";
import { storage, db, auth } from "../firebase";

export default function Profile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();

  function handleChange(e) {
    setImg(e.target.files[0]);
  }

  async function deleteImage() {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });

        // localStorage.removeItem("defaultImg");

        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      async function uploading() {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user && user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (error) {
          console.log(error.message);
        }
      }

      uploading();
    }
    // localSaveImage();
  }, [img]);

  let defaultAvatar =
    // localStorage.getItem("defaultImg") ||
    Images[Math.floor(Math.random() * Images.length)];

  function localSaveImage() {
    window.localStorage.setItem("defaultImg", defaultAvatar);
  }

  return (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={(user && user.avatar) || defaultAvatar} alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              {user && user.avatar ? (
                <Delete deleteImage={deleteImage} />
              ) : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user && user.name}</h3>
          <p>{user && user.email}</p>
          <hr />
          <small>
            Joined on: {user && user.createdAt.toDate().toDateString()}
          </small>
        </div>
      </div>
    </section>
  );
}
