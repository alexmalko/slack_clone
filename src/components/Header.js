import React from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import SearchIcon from "@material-ui/icons/Search";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import TemporaryDrawer from "./Drawer";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      {/* Header left */}
      <HeaderLeft>
        <HeaderAvatar src={user?.photoURL} alt={user?.displayName} />
        <Button variant="contained" onClick={() => auth.signOut()}>
          Sign out
        </Button>
        <AccessAlarmIcon />
      </HeaderLeft>
      {/* header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="search spack"></input>
      </HeaderSearch>
      {/* Header right */}
      <HeaderRight>
        <TemporaryDrawer />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--spack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }

  > .MuiButton-contained {
    margin-right: 20px;
    margin-left: 20px;
  }
`;

// example of how to style your own element
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderRight = styled.div`
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
