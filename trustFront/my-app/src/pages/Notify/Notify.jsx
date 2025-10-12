import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react"; // install via: npm install lucide-react

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // assuming token stored here

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.notifications);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Notification Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200"
      >
        <Bell size={24} />
        {/* Unread badge */}
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute top-1 right-1 bg-red-500 rounded-full h-2 w-2"></span>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
          <div className="p-3 border-b text-gray-700 font-semibold">
            Notifications
          </div>
          <div className="max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-3 text-gray-500 text-sm">Loading...</div>
            ) : notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`p-3 border-b hover:bg-gray-50 text-sm ${
                    !notif.isRead ? "font-medium text-gray-800" : "text-gray-600"
                  }`}
                >
                  {notif.message}
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-500 text-sm">
                No notifications yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
