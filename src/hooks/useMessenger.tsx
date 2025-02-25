import React, { createContext, useContext, useState } from "react";

interface MessageType {
  content: string;
  type: "none" | "error" | "success" | "loading";
}

interface MessengerContextType {
  messageDetails: MessageType;
  showMessage: (content: string, type: MessageType["type"]) => void;
}

const MessengerContext = createContext<MessengerContextType | undefined>(
  undefined
);

export function MessengerProvider({ children }: { children: React.ReactNode }) {
  const [messageDetails, setMessageDetails] = useState<MessageType>({
    content: "",
    type: "none",
  });

  const showMessage = (content: string, type: MessageType["type"]) => {
    setMessageDetails({ content, type });

    if (type !== "loading") {
      setTimeout(() => {
        setMessageDetails({ content: "", type: "none" });
      }, 3000);
    }
  };

  return (
    <MessengerContext.Provider value={{ messageDetails, showMessage }}>
      {children}
    </MessengerContext.Provider>
  );
}

export function useMessenger() {
  const context = useContext(MessengerContext);
  if (!context) {
    throw new Error("useMessenger must be used within a MessengerProvider");
  }
  return context;
}
