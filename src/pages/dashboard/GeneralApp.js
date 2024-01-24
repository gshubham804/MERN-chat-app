import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/conversation";
import { useTheme } from "@emotion/react";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessaged";

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar } = useSelector((store) => store?.app);
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Chats />
        <Box
          sx={{
            height: "100%",
            width: sideBar.open ? `calc(100vw - 740px)` : `calc(100vw - 420px)`,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#fff"
                : theme.palette.background.default,
          }}
        >
          <Conversation />
        </Box>

        {/* Contact */}
        {sideBar?.open &&
          (() => {
            switch (sideBar?.type) {
              case "CONTACT":
                return <Contact />;

              case "SHARED":
                return <SharedMessages />;

              case "STARRED":
                return <StarredMessages/>;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
