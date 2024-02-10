import React, { useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import { Stack, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { useSelector } from "react-redux";

const Conversation = () => {
  const theme = useTheme();

  const messageListRef = useRef(null);

  const { current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* chat header */}
      <Header />

      {/* chats */}
      <Box
        ref={messageListRef}
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
        <Message menu={true} />
      </Box>

      {/* chat footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
