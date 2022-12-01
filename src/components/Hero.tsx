import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  InputAdornment,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { PointsContext } from "../contexts/pointsContext";
import { ArmyViewer } from "./ArmyViewer";

const Hero = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { initialPoints, currentPoints, setInitialPoints } =
    React.useContext(PointsContext);

  return (
    <>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Saga: Age of magic
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          Army builder
        </Typography>
        <Card
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              value={initialPoints}
              onChange={(event: any) => {
                setInitialPoints(parseInt(event.target.value) || 0);
              }}
              endAdornment={<InputAdornment position="end">pts</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <FormHelperText id="outlined-weight-helper-text">
              Set your points
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: "20ch" }} variant="outlined">
            <OutlinedInput
              id="points-remaining"
              value={currentPoints}
              endAdornment={<InputAdornment position="end">pts</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              disabled
            />
            <FormHelperText id="outlined-weight-helper-text">
              Points Remaining
            </FormHelperText>
          </FormControl>
          <Button
            sx={{
              marginRight: 1,
            }}
            onClick={handleOpen}
          >
            View Army
          </Button>
        </Card>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ArmyViewer />
      </Modal>
    </>
  );
};

export { Hero };
