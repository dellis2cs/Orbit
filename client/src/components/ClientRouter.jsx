import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Landing";
import Contacts from "./Contacts";
export default function ClientRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}
