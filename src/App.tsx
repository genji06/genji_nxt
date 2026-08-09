import "./App.css";

import Header from "./Header.tsx";
import Body from "./Body.tsx";
import SplashScreen from "./SplashScreen.tsx";

import { useState } from "react";

import type { NavImage, MessageType, ItemType } from "./Header.tsx";


type AddMessage = (
  role: "user" | "assistant",
  content: string,
  buttons?: string[],
  images?: NavImage[],
  type?: ItemType,
  sticker?: string
) => void;



function App(): React.ReactElement {

  const [showSplash, setShowSplash] =
    useState<boolean>(true);


  const [messages, setMessages] =
    useState<MessageType[]>([]);


  const [input, setInput] =
    useState<string>("");


  const [isTyping, setIsTyping] =
    useState<boolean>(false);


  const [usedButtons, setUsedButtons] =
    useState<string[]>([]);



  const addMessage: AddMessage = (
    role,
    content,
    buttons,
    images,
    type,
    sticker
  ): void => {

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(), role, content, buttons, images, type, time: new Date(), sticker,
      },
    ]);
  };

  function handleNewChat(): void { setMessages([]); setInput(""); setUsedButtons([]); setIsTyping(false);}

  return (
    <>
      { showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false) }
          minDuration={2600}/>
        ) : (
          <div className="flex h-screen overflow-hidden bg-[#0A0F1F]  text-gray-100  selection:bg-sky-500/30  selection:text-white">

            <Header onNewChat={handleNewChat} addMessage={addMessage} setIsTyping={setIsTyping} messages={messages} setUsedButtons={setUsedButtons}
              isTyping={isTyping}/>
            <Body
              messages={messages}
              setMessages={setMessages}
              input={input}
              setInput={setInput}
              addMessage={addMessage}
              isTyping={isTyping}
              setIsTyping={setIsTyping}
              usedButtons={usedButtons}
              setUsedButtons={setUsedButtons}/>
          </div>
        )
      }
    </>
  );
}

export default App;