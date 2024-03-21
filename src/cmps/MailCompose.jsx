import { useEffect, useState } from "react";
import { mailService } from "../services/mail.service";
import { useParams } from "react-router";
import { Button, Input } from '@mui/material';
import { eventBusService } from "../services/createEventEmitter";

export function MailCompose({ closeCompose }) {
    const { emailId } = useParams()
    const [compose, setcompose] = useState(false)
    const [email, setEmail] = useState({ from: "", to: "", body: "" })

    useEffect(() => {

        if (emailId) loadEmail()

    }, [compose])

    async function loadEmail() {
        try {
            const email = await mailService.getById(emailId)
            setEmail({ ...email })
        } catch (err) {
            console.log('Had issues loading robot', err);
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        setEmail(preEmail => ({ ...preEmail, [field]: value }))
    }
    
    async function handleSubmit(ev) {
        ev.preventDefault()
        try{

           await mailService.sendEmail(email)
           eventBusService.emit("show-user-msg", { type: "sucess", txt: "Email sent",color:"green" })
        closeCompose() 
     

        }catch(err){
            console.log(err)
        }
    }

    return (
        
        <form className="compose-modal" onSubmit={handleSubmit}>
            <div className="composeExit" onClick={closeCompose}>x</div>
            <Input defaultValue="To" type="email" name="to" placeholder="email to" value={email.to} onChange={handleChange}  />
            <Input type="text" name="subject" placeholder="subject" value={email.subject} onChange={handleChange} />
            {/* <input type="email" name="to" placeholder="email to" value={email.to} onChange={handleChange}></input> */}
            {/* <input type="text" name="subject" placeholder="subject" value={email.subject} onChange={handleChange}></input> */}
            <textarea type="text" name="body" placeholder="body of email ..." className="body-input" value={email.body} onChange={handleChange}></textarea>
            <div className="send-menu">
            <Button className="SendButton" type="submit" variant="contained" >
            Send
            </Button>
            </div>
            </form>

    )
}