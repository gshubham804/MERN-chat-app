import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackBar } from "../../redux/slices/app";
import {
  AddDirectConversation,
  AddDirectMessage,
  UpdateDirectConversation,
} from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const user_id = window.localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();
      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

      // "new_friend_request"
      socket.on("new_friend_request", (data) => {
        dispatch(
          showSnackBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      // "request_accepted"
      socket.on("request_accepted", (data) => {
        dispatch(
          showSnackBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      // "request_sent"
      socket.on("request_sent", (data) => {
        dispatch(
          showSnackBar({
            severity: "success",
            message: data.message,
          })
        );
      });

      socket.on("start_chat", (data) => {
        console.log(data);
        const existing_conversation = conversations.find(
          (el) => el.id === data._id
        );
        if (existing_conversation) {
          dispatch(UpdateDirectConversation({ conversation: data }));
        } else {
          dispatch(AddDirectConversation({ conversation: data }));
        }
        dispatch(SelectConversation({ room_id: data._id }));
      });
    }

    // clean-up function
    return () => {
      socket?.off("new_message");
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
    };
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
