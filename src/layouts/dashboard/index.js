import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { showSnackBar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const user_id = window.localStorage.getItem("user_id");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.reload();
      if (!socket) {
        connectSocket(user_id);
      }

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
    }

    // clean-up function
    return () => {
      socket.off("new_friend_request")
      socket.off("request_accepted")
      socket.off("request_sent");
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
