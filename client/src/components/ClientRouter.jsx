import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./Landing";
import Contacts from "./Contacts";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./dashboard";
import Tiptap from "./notes/Notes";

export default function ClientRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<Tiptap />} />
      </Routes>
    </BrowserRouter>
  );
}
