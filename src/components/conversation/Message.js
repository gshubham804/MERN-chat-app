import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from "./MsgTypes";

const Message = ({menu}) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((ele) => {
          switch (ele.type) {
            case "divider":
              return <Timeline ele={ele} />;

            case "msg":
              switch (ele.subtype) {
                case "img":
                  // Image msg
                  return <MediaMsg ele={ele} menu={menu}/>;
                case "doc":
                  // doc msg
                 return <DocMsg ele={ele} menu={menu}/>
                case "link":
                  // link msg
                  return <LinkMsg ele={ele} menu={menu}/>
                case "reply":
                  // reply msg
                  return <ReplyMsg ele={ele} menu={menu}/>
                default:
                  // text msg
                  return <TextMsg ele={ele} menu={menu}/>;
              }
              break;

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
