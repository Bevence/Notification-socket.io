import { useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3333");
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    socket.on("new-notification", (notification) => {
      console.log(notification);
      toast(notification.message, {
        icon: () => (
          <img
            src={notification.image}
            alt="Notification"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        ),
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Realtime Notification</p>
      </header>
    </div>
  );
}

export default App;
