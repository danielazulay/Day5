import { useParams } from "react-router-dom";
import { MailPreview } from "./MailPreview";
import { useEffect } from "react";

export function MailList({ emails, handleDelete, setMails,setContIsRead,contIsRead}) {

  if(!emails.length) return <div>no mails</div>

  return (
    <div>
      { emails.map((email) => (
       
          <MailPreview
            key={email.id}
            email={email}
            setMails={setMails}
            handleDelete={handleDelete}
            contIsRead={contIsRead}
            setContIsRead = {setContIsRead}
          />
       
      ))
    }
    </div>
  )
}
