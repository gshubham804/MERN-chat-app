import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from "./MsgTypes";

const Message = () => {
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
                  return <MediaMsg ele={ele}/>;
                case "doc":
                  // doc msg
                 return <DocMsg ele={ele}/>
                case "link":
                  // link msg
                  return <LinkMsg ele={ele}/>
                case "reply":
                  // reply msg
                  return <ReplyMsg ele={ele}/>
                default:
                  // text msg
                  return <TextMsg ele={ele} />;
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
