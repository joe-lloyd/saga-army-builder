import { AppBar, Button, Modal, Toolbar, Typography } from "@mui/material";
import React from "react";
import { ArmyViewerForward } from "./ArmyViewer";
import { PointsContext } from "../contexts/pointsContext";

const StickyBottomBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentPoints } = React.useContext(PointsContext);

  return (
    <>
      <div style={{ marginTop: "58px" }} />
      <AppBar position={"fixed"} sx={{ bottom: 0, top: "auto" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="inherit" noWrap>
            Points Remaining: {currentPoints}
          </Typography>
          <Button onClick={handleOpen}>View Army</Button>
        </Toolbar>
      </AppBar>
      <Modal
        sx={{ overflow: "scroll", marginTop: "16px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ArmyViewerForward setOpen={setOpen} />
      </Modal>
    </>
  );
};

export { StickyBottomBar };
