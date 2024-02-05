import React, { useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Slide,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriends,
  FetchRequests,
  FetchUsers,
} from "../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers());
  }, []);
  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users &&
        users.map((el, idx) => {
          return <></>;
        })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);
  const { friends } = useSelector((state) => state.app);

  return (
    <>
      {friends &&
        friends.map((el, idx) => {
          return <></>;
        })}
    </>
  );
};

const RequestsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchRequests());
  }, []);
  const { friendRequests } = useSelector((state) => state.app);

  return (
    <>
      {friendRequests &&
        friendRequests.map((el, idx) => {
          return <></>;
        })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      {/* <DialogTitle>{"Friends"}</DialogTitle> */}
      <Box p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Box>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0: // display all users in this list
                  return <UsersList />;

                case 1: // display friends in this list
                  return <FriendsList />;

                case 2: // display request in this list
                  return <RequestsList />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
