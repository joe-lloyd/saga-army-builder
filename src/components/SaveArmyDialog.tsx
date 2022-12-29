import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { UsersSavedArmiesContext } from "../contexts/usersSavedArmiesContext";
import { ArmyContext } from "../contexts/armyContext";
import { UnitContext } from "../contexts/unitContext";
import { PointsContext } from "../contexts/pointsContext";
import { SuccessContext } from "../contexts/successContext";

interface SaveArmyDialogInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SaveArmyDialog: React.FC<SaveArmyDialogInterface> = ({
  open,
  setOpen,
}) => {
  const [armyName, setArmyName] = React.useState("");
  const { setUserSavedArmy } = React.useContext(UsersSavedArmiesContext);
  const { setSuccess } = React.useContext(SuccessContext);
  const { army } = React.useContext(ArmyContext);
  const { units } = React.useContext(UnitContext);
  const { initialPoints, currentPoints } = React.useContext(PointsContext);

  const handleSaveArmy = () => {
    if (armyName.length === 0 || !army) {
      return;
    }
    setOpen(false);
    const timestamp = Date.now().toString();
    setUserSavedArmy({
      id: timestamp,
      armyName,
      faction: army.name,
      units,
      initialPoints,
      currentPoints,
    });
    setArmyName("");
    setSuccess(`Army ${armyName} saved.`);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Save</DialogTitle>
      <DialogContent>
        <DialogContentText>Give your Army a name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Army Name"
          type="text"
          fullWidth
          variant="standard"
          value={armyName}
          onChange={(event: any) => setArmyName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => handleSaveArmy()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export { SaveArmyDialog };
