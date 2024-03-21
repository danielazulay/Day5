import { useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { AppHeader } from "../cmps/AppHeader";
import { AppsideMenu } from "../cmps/AppsideMenu";
import { MailCompose } from '../cmps/MailCompose.jsx';
import { eventBusService } from "../services/createEventEmitter.js";
import { mailService } from "../services/mail.service.js";
import { MailList } from "./MailList";
import { utilService } from "../services/util.service.js";

const MAIL = "emails";

export function MailIndex() {
  const [emails, setMails] = useState(null);
  const [filter, setFilter] = useState({ status: "", txt: "", isRead: null });
  const [compose, setCompose] = useState(null)
  const [qsParams, setQsParams] = useSearchParams()


  const params = useParams()

  useEffect(() => {
    loadMails();
    handleIscompose()

  }, [filter, qsParams]);

  function handleIscompose() {
    if (qsParams.get('compose') === "new") setCompose(true)
    else { setCompose(false) }
  }

 function openCompose() {
    setQsParams(prevState => {
      return {
        ...prevState,
        compose: 'new'
      }
    })
  }

  function closeCompose() {
    setQsParams({})
  }

  async function handleDelete(ev, emailId) {


    const eli = ev.currentTarget.closest("section")

    try {
      let email = await mailService.getById(emailId);

      if (email.removedAt === false) {
   
        email.removedAt = true;

        let emailUpdated = await mailService.updateEmail(email);
 
        await  utilService.animateCSS(eli,`zoomOut`)

        eventBusService.emit("show-user-msg", { type: "sucess", txt: "Email move to trash successfully",color:"yellow" })

        setMails((prev) => {
          return prev.filter((current) => {
            if (current.id !== emailId) {
              return current;
            }
          });
        });

        console.log("email delete ",emails)

      } else {
        await mailService.remove(emailId);
            await  utilService.animateCSS(eli,`zoomOut`)
        eventBusService.emit("show-user-msg", { type: "sucess", txt: "Email delete successfully",color:"red" })
        
        setMails((prev) => {
          return prev.filter((current) => current.id !== emailId);
        });
    
      
     

      }
    } catch (err) {
      console.log("->", err);
    }
  }

  async function loadMails() {
    try {
      let mails = await mailService.query(filter);

      setMails(mails);
    } catch (err) {
      console.log("erro : ", err);
    }
  }

  async function onAnimate(){
    await utilService.animateCSS()
  }

  if (!emails) return <>loading...</>;

  return (

    <main className="index-container">
      <AppHeader filter={filter} setFilter={setFilter} />
      <AppsideMenu filter={filter} setFilter={setFilter} openCompose={openCompose} qsParams={qsParams} params={params} />
      {!params.emailId && <MailList
        emails={emails}
        handleDelete={handleDelete}
        setMails={setMails}
      />}

      {params.emailId && <Outlet />}

      {compose && <MailCompose closeCompose={closeCompose} />}
    </main>
  );
}
