import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3070/api/notifications', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setNotifications(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification._id}>
          <p>{notification.type} from {notification.fromUser.username}</p>
          {notification.post && <p>Post: {notification.post.text}</p>}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
