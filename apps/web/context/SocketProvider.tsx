"use client";
import React, { useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
  messages: string[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [messages, setMessages] = React.useState<string[]>([]);
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message: string) => {
      console.log(message);
      if (socket) socket.emit("event:message", { message: message });
    },
    [socket]
  );

  const onMessageServer = useCallback((msg: string) => {
    console.log("Message from Server", msg);
    const message = JSON.stringify(msg);
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageServer);
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageServer);
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
