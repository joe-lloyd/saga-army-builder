import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SideDrawer } from "./SideDrawer";
import { SaveArmyDialog } from "./SaveArmyDialog";

const AppBarWithMenu = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openSaveModal, setOpenSaveModal] = React.useState(false);

  return (
    <>
      <div style={{ marginTop: "58px" }} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SAGA
            </Typography>
            <Button color="inherit" onClick={() => setOpenSaveModal(true)}>
              Save Army
            </Button>
            <SaveArmyDialog open={openSaveModal} setOpen={setOpenSaveModal} />
          </Toolbar>
        </AppBar>
      </Box>
      <SideDrawer toggleDrawer={setOpenDrawer} open={openDrawer} />
    </>
  );
};

export { AppBarWithMenu };
