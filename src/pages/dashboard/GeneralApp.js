import React from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/conversation";
import { useTheme } from "@emotion/react";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar } = useSelector((store) => store?.app);
console.log(sideBar);
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
        {sideBar.open && 
        <Contact />
      }
      </Stack>
    </>
  );
};

export default GeneralApp;
