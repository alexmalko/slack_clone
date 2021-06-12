import { Button } from "@material-ui/core";
import styled from "styled-components";
import React, { useState } from "react";

import { db } from "../firebase";
import firebase from "firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");

  const [user] = useAuthState(auth);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      picture: user.photoURL,
    });
    await console.log("write successful");

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form action="">
        <input
          placeholder={`message ${channelName}`}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  > form > input {
    position: fixed;
    width: 60%;
    bottom: 30px;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 20px;
    outline: none;
  }
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > button {
    display: none;
  }
`;
