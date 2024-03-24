import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { mailService } from "../services/mail.service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar } from "@mui/material";

export function MailDetails() {
  const [email, setMail] = useState();
  let navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    console.log(params);
    loadMails();
  }, []);

  async function loadMails() {
    try {
      let mail = await mailService.getById(params.emailId);
      setMail(mail);
    } catch (err) {
      console.log("erro : ", err);
    }
  }

  if (!email) return <div>loading...</div>;

  return (
    <div>
      <nav>
        <ArrowBackIcon
          fontSize="small"
          onClick={() => {
            navigate(`/mail/${params.folder}`);
          }}
        />
      </nav>
      <h1 className="subjectdetails">{email.subject}</h1>

      <div className="sent-details">
      <Avatar alt={email.from} src="/static/images/avatar" />

        <h5 className="sender">
          <span>{mailService.getName(email.from)}</span>
          {}
        </h5>
        <h3 className="time-sent">
          {new Date(email.sentAt).toLocaleString().substring(10)}
        </h3>

       <h5 className="senderto">
        To <span>{mailService.getName(email.to)}</span>
          {email.to ? " <" + email.to + "> " : " <" + email.to + "> "}
        </h5>

      </div>

      <pre className="email-body">{email.body}</pre>

      <div className="reply-button">
        <button>&#11170; Reply</button> <button>&#11171; Forward</button>
      </div>
    </div>
  );
}
