import React from "react";
import { useTheme } from "@emotion/react";
import { Stack, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

const Conversation = () => {
  const theme = useTheme();
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* chat header */}
      <Header />

      {/* chats */}
      <Box
        width={"100%"}
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "0.1em",
          },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.mode === "light" ? "#f1f1f1" : "#555",
          },
          "&::-webkit-scrollbar-thumb": {
            background: theme.palette.mode === "light" ? "#555" : "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#888",
          },
        }}
      >
        <Message />
      </Box>

      {/* chat footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
