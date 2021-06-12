import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { db } from "../firebase";

function Message({ message, timestamp, user, userImage, channelId, id }) {
  // const dispatch = useDispatch();

  const handleClick = () => {
    console.log("channel name: " + channelId);
    console.log("id is: " + id);

    db.collection("rooms")
      .doc(channelId)
      .collection("messages")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <MessageContainer>
      <div>
        <img src={userImage} alt="hello" />
        <MessageInfo>
          <h4>
            {user}
            {""}
            <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
          </h4>
          <p>{message}</p>
        </MessageInfo>
      </div>
      <div>
        <Button onClick={handleClick}>Delete</Button>
      </div>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  > div > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;
  > h4 > span {
    color: grey;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
