import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data/index";
import { Gear } from "phosphor-react";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";

const DashboardLayout = () => {
  const theme = useTheme();
  const { onToggleMode } = useSettings();
  const [selected, setSelected] = useState(0);
  return (
    <>
    <Stack direction="row">
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          height: "100vh",
          width: 100,
        }}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%" }}
      
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 54,
                width: 54,
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt={"Chat app logo"} />
            </Box>
            <Stack
              sx={{ width: "max-content" }}
              direction="column"
              alignItems={"center"}
              spacing={3}
            >
              {Nav_Buttons.map((ele) =>
                ele.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={ele.index}
                    >
                      {ele.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => setSelected(ele.index)}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                    key={ele.index}
                  >
                    {ele.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{ width: "max-content", color: "#fff" }}
                    key={3}
                  >
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => setSelected(3)}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  key={3}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>

          <Stack spacing={3} alignItems={"center"}>
            <Switch onChange={() => onToggleMode()} defaultChecked />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
