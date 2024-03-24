import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
import { mailService } from "../services/mail.service";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material-next/Button';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

const MAIL = "emails";

export function MailPreview({ email, handleDelete, setMails }) {

  const [star,setStar] = useState(false)

 async function  handleChange({id}){

  let email = await mailService.getById(id);

  email.isStarred = !email.isStarred;

  let emailUpdated = await mailService.updateEmail(email);

  setStar(pastState=>!pastState)

  setMails((prev) => {
    return prev.map((curent) => {
      if (curent.id === id) {
        return emailUpdated;
      } else {
        return curent;
      }
    });
  });
}

 
  
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
       <div className="star"> {star?<StarIcon onClick={()=>{handleChange(email)}}/>:<StarBorderIcon  onClick={()=>{handleChange(email)}}/>}</div>  
        <Link to={`${email.id}`} className="email-list">
          <h6 className="emailsubject">{email.subject}</h6>
          <h6 className="emailbody">{email.body}</h6>
          <h6 className="emailsent">
            {new Date(email.sentAt).toLocaleString()}
          </h6>
        </Link>
        <div className="side-options">
        <a
          onClick={(ev) => {
            handleDelete(ev, email.id);
          }}
        >
          <IconButton  aria-label="delete" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </a>
          </div>
      </section>
    </>
  );
}
