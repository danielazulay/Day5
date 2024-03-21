import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { mailService } from "../services/mail.service";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material-next/Button';

const MAIL = "emails";

export function MailPreview({ email, handleDelete, setMails }) {
  async function onToggleSection(email) {
    email.isRead = true;
    let emailUpdated = await mailService.updateEmail(email);

    setMails((prev) => {
      return prev.map((curent) => {
        if (curent.id === email.id) {
          return emailUpdated;
        } else {
          return curent;
        }
      });
    });
  }

  return (
    <>
      <section
        id="readId"
        className={`mail ${email.isRead ? "is-read" : "not-read"}`}
        onClick={() => onToggleSection(email)}
      >
        <Link to={`${email.id}`} className="email-list">
          <h6 className="emailsubject">{email.subject}</h6>
          <h6 className="emailbody">{email.body}</h6>
          <h6 className="emailsent">
            {new Date(email.sentAt).toLocaleString()}
          </h6>
        </Link>

        <a
          className="deleteemail"
          onClick={(ev) => {
            handleDelete(ev, email.id);
          }}
        >
          <IconButton aria-label="delete" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </a>

      </section>
    </>
  );
}
