import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { ChatList } from "../../data/index";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";

const Chats = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </Search>
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>
          <Divider />
        </Stack>
        <Stack
          spacing={2}
          direction="column"
          sx={{
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
            flexGrow: 1,
            overflow: "auto",
            height: "100%",
          }}
        >
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              Pinned
            </Typography>
            {ChatList.filter((ele) => ele.pinned).map((ele) => {
              return (
                <>
                  <ChatElement key={ele.id} {...ele} />
                </>
              );
            })}
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Chats
              </Typography>
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
      </Stack>
    </Box>
  );
};

export default Chats;
