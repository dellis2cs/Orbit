import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Save,
} from "lucide-react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [emailSortDirection, setEmailSortDirection] = useState("");

  const toggleEmailSortDirection = () => {
    if (emailSortDirection == "") {
      setEmailSortDirection("down");
    } else if (emailSortDirection == "down") {
      setEmailSortDirection("up");
    } else {
      setEmailSortDirection("");
    }
  };
  const getContacts = async () => {
    try {
      const response = await fetch("http://localhost:8080/contacts/");
      const jsonResponse = await response.json();
      setContacts(jsonResponse);
      console.log(contacts);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);
  return (
    <div className="min-h-screen  bg-black text-gray-100 flex flex-col">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link to="/">
            <div className="text-2xl font-semibold text-white ">Orbit</div>
          </Link>
          <button className="border-gray-600 text-gray-200 hover:bg-gray-800">
            Sign In
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl  font-bold text-white">ALL CONTACTS</h1>
          <button className="border-gray-600 text-gray-200 hover:bg-gray-800">
            <Save className="w-4 h-4 mr-2" />
            SAVE UPDATES
          </button>
        </div>

        <div className=" rounded-lg  overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  First Name
                </th>
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  Last Name
                </th>
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  <button onClick={() => toggleEmailSortDirection()}>
                    Email
                    {emailSortDirection === "" ? null : emailSortDirection ===
                      "down" ? (
                      <ChevronDown className="inline ml-1 w-4 h-4" />
                    ) : (
                      <ChevronUp className="inline ml-1 w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {contacts.map((contact) => (
                <tr
                  key={contact.contact_id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono whitespace-nowrap">
                    {contact.first_name}
                  </td>
                  <td className="px-6 py-4 font-mono whitespace-nowrap">
                    {contact.last_name}
                  </td>
                  <td className="px-6 py-4 font-mono whitespace-nowrap">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4 font-mono whitespace-nowrap">
                    <button className=" hover:bg-gray-700 text-gray-200 font-semibold py-2 px-4 border border-gray-600 rounded shadow">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
