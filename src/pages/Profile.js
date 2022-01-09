/* local import */
import Images from "../assets/Images";
import Camera from "../components/svg/Camera";

export default function Profile() {
  return (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img
            src={Images[Math.floor(Math.random() * Images.length)]}
            alt="avatar"
          />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera />
              </label>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>User Name</h3>
          <p>User email</p>
          <hr />
          <small>Joined on: ....</small>
        </div>
      </div>
    </section>
  );
}
