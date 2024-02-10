import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversation";

const Message = ({ menu }) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat
  );

  console.log(
    conversations,
    current_messages,
    "console conversations current_messages"
  );
  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);

    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      // data => list of messages
      dispatch(FetchCurrentMessages({ messages: data }));
    });
    dispatch(SetCurrentConversation(current));
  }, []);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {current_messages.map((ele) => {
          switch (ele.type) {
            case "divider":
              return <Timeline ele={ele} />;

            case "msg":
              switch (ele.subtype) {
                case "img":
                  // Image msg
                  return <MediaMsg ele={ele} menu={menu} />;
                case "doc":
                  // doc msg
                  return <DocMsg ele={ele} menu={menu} />;
                case "link":
                  // link msg
                  return <LinkMsg ele={ele} menu={menu} />;
                case "reply":
                  // reply msg
                  return <ReplyMsg ele={ele} menu={menu} />;
                default:
                  // text msg
                  return <TextMsg ele={ele} menu={menu} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
