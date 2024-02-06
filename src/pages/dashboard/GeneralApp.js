import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
import Conversation from "../../components/conversation";
import { useTheme } from "@emotion/react";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessaged";
import NoChat from "../../assets/Illustration/NoChat";
import { Link } from "react-router-dom";

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar, room_id, chat_type } = useSelector((store) => store?.app);
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
          {room_id != null && chat_type === "individual" ? <Conversation />:
          <Stack
          spacing={2}
          sx={{ height: "100%", width: "100%" }}
          alignItems="center"
          justifyContent={"center"}
        >
          <NoChat />
          <Typography variant="subtitle2">
            Select a conversation or start a{" "}
            <Link
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
              to="/"
            >
              new one
            </Link>
          </Typography>
        </Stack>}
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
                return <StarredMessages />;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
