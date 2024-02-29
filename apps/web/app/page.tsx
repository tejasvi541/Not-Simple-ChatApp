"use client";

import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";
import { useState } from "react";
export default function Page() {
  const { sendMessage, messages } = useSocket();

  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <input
          placeholder="Message"
          className={classes["chat-input"]}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={classes["button"]}
          onClick={(e) => sendMessage(message)}>
          Send
        </button>
      </div>
      <ul>
        {messages.map((message, index) => (
          <li className={classes["li"]} key={index}>
            {message.split(":")[1]?.split('"')[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}
