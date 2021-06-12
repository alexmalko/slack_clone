import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

const SiderbarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();
  // firebase DB entry
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");
    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  const selectChannel = () => {
    console.log("ID IS: " + id);
    if (id) {
      dispatch(
        enterRoom({
          roomID: id,
        })
      );
    }
  };

  return (
    <SiderbarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {/* Icon is a component that is why its capitalized */}
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SiderbarOptionContainer>
  );
};

export default SiderbarOption;

const SiderbarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
