/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditModal({ contact, onClose, onUpdate }) {
  const [firstName, setFirstName] = useState(contact?.first_name || "");
  const [lastName, setLastName] = useState(contact?.last_name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [contactId, setContactId] = useState(contact?.contact_id || "");

  useEffect(() => {
    setFirstName(contact[0]?.first_name || "");
    setLastName(contact[0]?.last_name || "");
    setEmail(contact[0]?.email || "");
    setContactId(contact[0]?.contact_id || "");
  }, [contact]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return console.error("Unauthorized access");
      }

      const body = { first_name: firstName, last_name: lastName, email };

      const response = await fetch(
        `http://localhost:8080/contacts/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        if (onUpdate) {
          onUpdate();
        }
        onClose();
      } else {
        console.error("Failed to update contact");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-black backdrop-blur w-full max-w-md rounded-lg shadow-lg overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Edit Contact</h2>
          {/* Close button */}
          <button
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitForm}>
          <div className="p-6 space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-400"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-400"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 px-6 py-4 bg-black">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white border border-gray-500 bg-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
