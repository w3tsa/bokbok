/* local import */
import Attachment from "./svg/Attachment";
import Send from "./svg/Send";
function MessageForm() {
  return (
    <form className="message_form">
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />
      <div>
        <input type="text" placeholder="Enter message" />
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
