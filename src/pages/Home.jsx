import { Link } from "react-router-dom";

export function Home() {
    return (
        <section className="home">
            <h1 className="animate__animated animate__bounce">HOME</h1>
            <Link to={"/mail/inbox"} className="compose-button">inbox</Link>
        </section>
    )
}
