import Images from "../assets/Images";

export default function User({ user, selectUser }) {
  let defaultImage = Images[Math.floor(Math.random() * Images.length)];
  return (
    <div
      className="user_wrapper"
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
        </div>
        <div
          className={`user_status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
}
