import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
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
          <div className="email-goup">
      <div className="sent-details">
      <Avatar alt={email.from} src="/static/images/avatar" />
  
        </div>
        <div className="sent-sender">
        <h5>
          {mailService.getName(email.from)}
          {new Date(email.sentAt).toLocaleString().substring(10)}
        </h5>
       <h5 >
        To {mailService.getName(email.to)}
          {email.to ? " <" + email.to + "> " : " <" + email.to + "> "}
        </h5>
        </div>
        </div>

      <pre className="email-body">{email.body}</pre>

      <div className="reply-button">
        <button>&#11170; Reply</button> <button>&#11171; Forward</button>
      </div>
    </div>
  );
}
