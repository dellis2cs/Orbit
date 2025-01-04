import { Link } from "react-router";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Save } from "lucide-react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [sorting, setSorting] = useState({
    field: "first_name",
    order: "DESC",
  });

  const getContacts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/contacts?sortField=${sorting.field}&sortOrder=${sorting.order}`
      );
      const jsonResponse = await response.json();
      setContacts(jsonResponse);
      console.log(contacts);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, [sorting]);

  const toggleSort = (field) => {
    setSorting((prev) => ({
      field,
      order: prev.field === field && prev.order === "ASC" ? "DESC" : "ASC",
    }));
  };

  const SortIcon = ({ field }) => {
    if (sorting.field !== field) return null;
    return sorting.order === "ASC" ? (
      <ChevronDown className="inline ml-1 w-4 h-4" />
    ) : (
      <ChevronUp className="inline ml-1 w-4 h-4" />
    );
  };
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
          <button className="border-gray-600 text-gray-200 hover:underline flex items-center">
            <Save className="w-4 h-4 mr-2" />
            SAVE UPDATES
          </button>
        </div>

        <div className=" rounded-lg  overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  <button onClick={() => toggleSort("first_name")}>
                    First Name
                    <SortIcon field="first_name" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  <button onClick={() => toggleSort("last_name")}>
                    Last Name
                    <SortIcon field="last_name" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left font-mono font-medium text-gray-400">
                  <button onClick={() => toggleSort("email")}>
                    Email
                    <SortIcon field="email" />
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
