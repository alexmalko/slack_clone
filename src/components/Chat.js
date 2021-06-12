import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoIcon from "@material-ui/icons/Info";
import { selectRoodId } from "../features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);

  const roomId = useSelector(selectRoodId);

  // to query for a message

  // to query for on document
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  // to query for one collection
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong># {roomDetails?.data().name}</strong>
                <StarBorderIcon />
              </h4>
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, picture } = doc.data();
              console.log("Message id is: " + doc.id);
              return (
                <Message
                  key={doc.id}
                  id={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={picture}
                  channelId={roomId}
                />
              );
            })}
          </ChatMessages>

          <ChatBottom ref={chatRef} />
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          ></ChatInput>
        </>
      )}
    </ChatContainer>
  );
}

// channelName={} channelId={roomId}

export default Chat;

const ChatBottom = styled.div`
  margin-bottom: 200px;
`;

const ChatMessages = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 20px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  /* creates scroll effect */
  overflow-y: scroll;
  margin-top: 60px;
  /* margin-bottom: 100px; */
`;
