import { useEffect, useState } from "react";
import { mailService } from "../services/mail.service";
import { useParams } from "react-router";
import { Button, Input, InputAdornment } from "@mui/material";
import { eventBusService } from "../services/createEventEmitter";
import CloseIcon from "@mui/icons-material/Close";

export function MailCompose({ closeCompose }) {
  const { emailId } = useParams();
  const [compose, setcompose] = useState(false);
  const [email, setEmail] = useState({ from: "", to: "", body: "" });

  useEffect(() => {
    if (emailId) loadEmail();
  }, [compose]);

  async function loadEmail() {
    try {
      const email = await mailService.getById(emailId);
      setEmail({ ...email });
    } catch (err) {
      console.log("Had issues loading robot", err);
    }
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target;
    setEmail((preEmail) => ({ ...preEmail, [field]: value }));
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await mailService.sendEmail(email);
      eventBusService.emit("show-user-msg", {
        type: "sucess",
        txt: "Email sent",
        color: "green",
      });
      closeCompose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="compose-modal" onSubmit={handleSubmit}>
      <div className="composeExit">
        <h5>New Message</h5>
        <CloseIcon onClick={closeCompose}></CloseIcon>
      </div>
      <Input
        className="inputcompose"
        defaultValue="To"
        type="email"
        name="to"
        placeholder="Recipient"
        startAdornment={<InputAdornment position="start">To</InputAdornment>}
        value={email.to}
        onChange={handleChange}
      />
      <Input
        className="inputcompose"
        type="text"
        name="Subject"
        placeholder="subject"
        value={email.subject}
        onChange={handleChange}
      />
      <textarea
        type="text"
        name="body"
        className="body-input"
        value={email.body}
        onChange={handleChange}
      ></textarea>
      <div className="send-menu">
        <Button className="SendButton" type="submit" variant="contained">
          Send
        </Button>
      </div>
    </form>
  );
}
