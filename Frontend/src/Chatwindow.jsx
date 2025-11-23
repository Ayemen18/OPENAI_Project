import "./Chatwindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect, use } from "react";
import { ClipLoader } from "react-spinners";
import { useAuth } from "./AuthContext.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Chatwindow() {
  const { logout } = useAuth();
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    const tokenToCheck = localStorage.getItem('token');
    console.log("🚀 Sending Request to:", `${backendUrl}/api/chat`);
    console.log("🔑 Token being sent:", tokenToCheck);
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        message: prompt,
        threadid: currThreadId,

      }),
    };

    try {
      const response = await fetch(`${backendUrl}/api/chat`, options);
      const data = await response.json();
      console.log(data);
      setReply(data.reply);
    } catch (error) {
      console.error("Error fetching reply:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
    <div className="chatwindow">
      <div className="navbar">
        <span>
          GPT <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIconDiv" onClick={() => setIsOpen(!isOpen)}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i class="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-gear"></i> Settings
          </div>
          <div
            className="dropDownItem"
            onClick={() => {
              console.log("Logout Clicked!"); // <--- Watch for this in the console
              logout();
            }}
          >
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </div>
        </div>
      )}

      <Chat></Chat>
      <ClipLoader color="#fff" loading={loading}></ClipLoader>
      <div className="Chatinput">
        <div className="userInput">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          GPT may produce inaccurate information about people, places, or facts.
        </p>
      </div>
    </div>
  );
}

export default Chatwindow;
