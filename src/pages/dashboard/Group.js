import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { ChatList } from "../../data/index";
import ChatElement from "../../components/ChatElement";

const Group = () => {
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." />
              </Search>
            </Stack>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              spacing={2}
              direction="column"
              sx={{
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "0.1em",
                },
                "&::-webkit-scrollbar-track": {
                  background:
                    theme.palette.mode === "light" ? "#f1f1f1" : "#555",
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    theme.palette.mode === "light" ? "#555" : "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#888",
                },
                flexGrow: 1,
                overflow: "auto",
                height: "100%",
              }}
            >
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {/* Chat List */}
                {ChatList.filter((ele) => ele.pinned).map((ele) => {
                  return (
                    <>
                      <ChatElement key={ele.id} {...ele} />
                    </>
                  );
                })}
              </Stack>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {/* Chat List */}
                {ChatList.filter((ele) => !ele.pinned).map((ele) => {
                  return (
                    <>
                      <ChatElement key={ele.id} {...ele} />
                    </>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
    </>
  );
};

export default Group;
