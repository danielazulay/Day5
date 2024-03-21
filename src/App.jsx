import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { MailIndex } from "./pages/MailIndex";
import { MailDetails } from "./pages/MailDetails";
import { UserMsg } from "./cmps/UserMsg";

import { Home } from "./pages/Home"
export function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mail/:folder" element={<MailIndex />}>
              <Route path="/mail/:folder/:emailId" element={<MailDetails />} />
          </Route>
        </Routes>
      </main>
      <UserMsg />
    </Router>
  );
}
