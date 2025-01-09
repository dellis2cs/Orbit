/* eslint-disable react/prop-types */
import { X } from "lucide-react";

export default function DeleteModal({ id, onClose, onUpdate }) {
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return console.error("Unauthorized access");
      }

      const response = await fetch(`http://localhost:8080/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        if (onUpdate) {
          onUpdate();
        }
        onClose();
      } else {
        console.error("Failed to delete contact");
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
          <h2 className="text-xl font-semibold text-white">Delete Contact</h2>
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
          <div className="p-6 space-y-6"></div>
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
