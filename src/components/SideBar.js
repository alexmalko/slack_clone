import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import SiderbarOption from "./SiderbarOption";

function SideBar() {
  const [channels] = useCollection(db.collection("rooms"));

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2> Alex Malko HQ</h2>
          <h3>
            <FiberManualRecordIcon />
            Hello
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SiderbarOption Icon={InsertCommentIcon} title="Threads" />
      <SiderbarOption Icon={InboxIcon} title="Mentioned & Reactions" />
      <SiderbarOption Icon={DraftsIcon} title="Saved Items" />
      <SiderbarOption Icon={BookmarkIcon} title="Channel browser" />
      <SiderbarOption Icon={PeopleAltIcon} title="People & User groups" />
      <SiderbarOption Icon={AppsIcon} title="Apps" />
      <SiderbarOption Icon={FileCopyIcon} title="File Browser" />
      <SiderbarOption Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SiderbarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SiderbarOption Icon={AddIcon} title="Add Channels" addChannelOption />
      {/* get values from Firestore DB */}
      {channels?.docs.map((doc) => (
        <SiderbarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default SideBar;

const SidebarContainer = styled.div`
  background-color: var(--spack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
