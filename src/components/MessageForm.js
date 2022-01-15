/* local import */
import Attachment from "./svg/Attachment";
import Send from "./svg/Send";
function MessageForm({ handleSubmit, text, setText, setImg }) {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ fontSize: "18px" }}
        />
      </div>
      <div>
        <button className="send">
          <Send />
        </button>
      </div>
    </form>
  );
}

export default MessageForm;
