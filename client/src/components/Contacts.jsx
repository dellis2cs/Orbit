/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";
import { useNavigate } from "react-router";
import {
  ChevronDown,
  ChevronUp,
  PlusIcon,
  ChevronLeft,
  ChevronRight,
  DeleteIcon,
  Edit2Icon,
  SaveIcon,
} from "lucide-react";

export default function Contacts() {
  const navigate = useNavigate();
  //holds the list of contacts in the db
  const [contacts, setContacts] = useState([]);
  //holds the filtered contacts with the corresponding user_id
  const [filteredContacts, setFilteredContacts] = useState([]);
  //holds the current logged in user
  const location = useLocation();
  const { userId, username } = location.state || {};
  //holds the sorting fields for db queries
  const [sorting, setSorting] = useState({
    field: "first_name",
    order: "DESC",
  });
  //holds the current page
  const [currentPage, setCurrentPage] = useState(0);
  //holds the total db entries
  const [totalRows, setTotalRows] = useState(0);
  //controls whether the modals are showing
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  //holds the selected contact for editing
  const [selectedContact, setSelectedContact] = useState(null);

  //edit the selected contact
  const handleEditClick = async (id) => {
    const response = await fetch(`http://localhost:8080/contacts/${id}`);
    const jsonResponse = await response.json();
    setSelectedContact(jsonResponse);
    setShowEditModal(true);
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  //delete contact with the corresponding id
  const handleDeleteCLick = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/contacts/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
    getContacts();
  };

  //show the add modal
  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const logout = () => {
    navigate("/users/login");
  };

  //fetch all contacts from db
  const getContacts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/contacts?sortField=${sorting.field}&sortOrder=${
          sorting.order
        }&currentPage=${currentPage * 10}`
      );
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data.filter((item) => item.user_id === userId)); // filter
    } catch (err) {
      console.error(err.message);
    }
  };

  //fetch the total rows from the db
  const getTotalRows = async () => {
    try {
      const body = { user_id: userId };
      const response = await fetch("http://localhost:8080/contacts/count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      let totalRows = jsonResponse.rows[0].count;
      setTotalRows(totalRows);
    } catch (err) {
      console.error(err.message);
    }
  };

  //move to the next page
  const increasePage = () => {
    if (totalRows - currentPage * 11 > 1) {
      let prevPage = currentPage;
      let newPage = prevPage + 1;
      setCurrentPage(newPage);
    }
  };

  //go back to the previous page
  const decreasePage = () => {
    if (currentPage > 0) {
      let prevPage = currentPage;
      let newPage = prevPage - 1;
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    getContacts();
    getTotalRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, currentPage]);

  //toggle the sorting direction and column
  const toggleSort = (field) => {
    setSorting((prev) => ({
      field,
      order: prev.field === field && prev.order === "ASC" ? "DESC" : "ASC",
    }));
  };

  //handle the sorting icon based on the sorting direction
  const SortIcon = ({ field }) => {
    if (sorting.field !== field) return null;
    return sorting.order === "ASC" ? (
      <ChevronDown className="inline ml-1 w-4 h-4" />
    ) : (
      <ChevronUp className="inline ml-1 w-4 h-4" />
    );
  };

  return (
    <>
      {showEditModal && (
        <EditModal
          contact={selectedContact}
          onClose={() => setShowEditModal(false)}
          onUpdate={() => getContacts()}
        />
      )}
      {showCreateModal && (
        <CreateModal
          userId={userId}
          onClose={() => setShowCreateModal(false)}
          onUpdate={() => getContacts()}
        />
      )}
      <div className="min-h-screen bg-black text-gray-100 flex flex-col">
        <header className="container mx-auto px-4 py-6 sm:py-8">
          <nav className="flex justify-between items-center">
            <Link to="/">
              <div className="text-xl sm:text-3xl font-semibold text-white">
                Orbit
              </div>
            </Link>
            <div className="text-xl sm:text-xl font-semibold text-white">
              <button onClick={() => logout()}>{username}</button>
            </div>
            {!username && (
              <div className="flex">
                <Link to="/users/login">
                  <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-600 rounded-md text-gray-200 hover:bg-gray-800 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link to="/users/signup">
                  <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-600 rounded-md text-gray-200 hover:bg-gray-800 transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </header>

        <main className="container mx-auto px-4 py-6 sm:py-8 flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              ALL CONTACTS ({totalRows})
            </h1>
            <div className="flex">
              <button
                className="flex items-center text-sm sm:text-base border border-gray-600 rounded-md px-3 py-1 sm:px-4 sm:py-2 text-gray-200 hover:bg-gray-800 transition-colors"
                onClick={() => handleRefresh()}
              >
                <SaveIcon className="w-4 h-4 mr-2" />
                SAVE
              </button>
              <button
                className="flex items-center text-sm sm:text-base border border-gray-600 rounded-md px-3 py-1 sm:px-4 sm:py-2 text-gray-200 hover:bg-gray-800 transition-colors"
                onClick={() => handleCreateClick()}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                ADD
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-mono text-xs sm:text-sm font-medium text-gray-400">
                    <button
                      onClick={() => toggleSort("first_name")}
                      className="flex items-center"
                    >
                      First Name
                      <SortIcon field="first_name" />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-mono text-xs sm:text-sm font-medium text-gray-400">
                    <button
                      onClick={() => toggleSort("last_name")}
                      className="flex items-center"
                    >
                      Last Name
                      <SortIcon field="last_name" />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-mono text-xs sm:text-sm font-medium text-gray-400">
                    <button
                      onClick={() => toggleSort("email")}
                      className="flex items-center"
                    >
                      Email
                      <SortIcon field="email" />
                    </button>
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-mono text-xs sm:text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact.contact_id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm whitespace-nowrap">
                      {contact.first_name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm whitespace-nowrap">
                      {contact.last_name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm whitespace-nowrap">
                      {contact.email}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-mono text-xs sm:text-sm whitespace-nowrap">
                      <button
                        className="hover:bg-gray-700 text-gray-200 font-semibold py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm border border-gray-600 rounded shadow transition-colors flex "
                        onClick={() => handleEditClick(contact.contact_id)}
                      >
                        <Edit2Icon className="w-6 h-4 " />
                      </button>
                      <button
                        className="hover:bg-gray-700 text-gray-200 font-semibold py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-sm border border-gray-600 rounded shadow transition-colors"
                        onClick={() => handleDeleteCLick(contact.contact_id)}
                      >
                        <DeleteIcon className="w-6 h-4 " />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center text-bold gap-3 mt-6">
            <button
              className="border p-1 sm:p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => decreasePage()}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <h1 className="text-sm sm:text-base">{currentPage + 1}</h1>
            <button
              className="border p-1 sm:p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => increasePage()}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
