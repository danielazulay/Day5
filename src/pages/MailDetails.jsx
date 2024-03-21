import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { mailService } from "../services/mail.service";


const MAIL = "emails";
const from = 'me'

export function MailDetails() {
  const [email, setMail] = useState();
  let navigate = useNavigate();
  const params = useParams();


  useEffect(() => {
    loadMails();

  }, []);

  function getSender(email){
    return email.from.split("@")[0]
  }

  async function loadMails() {
    try {
      let mail = await mailService.getById(params.emailId);
      setMail(mail);
    } catch (err) {
      console.log("erro : ", err);
    }
  }

  if(!email) return <div>loading...</div>

  return (
    <div>
      <nav>
        <span onClick={()=>{navigate(`/mail/${params.folder}`)}}>&#8592;</span>{" "}
        <button className="trash-button">&#128465;</button>
      </nav>
      <h1 className="subjectdetails">{email.subject}</h1>

      <aside className="sent-details">
        <div className="logo-name">{email.from?email.from[0].toUpperCase():from}</div>
        <h5>
          {email.from?"from  "+email.from.split("@")[0]:"from Me"}
          </h5>
        <h3 className="time-sent">
          {new Date(email.sentAt).toLocaleString().substring(10)}
        </h3>
      </aside>

      <pre className="email-body">{email.body}</pre>

      <div className="reply-button">
        <button>&#11170; Reply</button> <button>&#11171; Forward</button>
      </div>
    </div>
  );
}
