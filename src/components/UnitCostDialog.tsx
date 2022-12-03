import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Unit, UnitDetails, UnitsToSpend } from "../ArmyUnitTypes";
import { UnitContext } from "../contexts/unitContext";
import { combinedUnits } from "../helpers/combinedUnits";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { checkUnitViabilityUnits } from "../helpers/checkUnitViabilityPoints";
import { ErrorContext } from "../contexts/errorContext";
import { SuccessContext } from "../contexts/successContext";

const style = {
  width: "100%",
};

interface UnitCostDialogInterface {
  unit: UnitDetails<Unit>;
  setOpen: (open: boolean) => void;
  open: boolean;
}

const UnitCostDialog: React.FC<UnitCostDialogInterface> = ({
  unit,
  setOpen,
  open,
}) => {
  const { units, addUnit } = React.useContext(UnitContext);
  const { setError } = React.useContext(ErrorContext);
  const { setSuccess } = React.useContext(SuccessContext);
  if (!open) return null;

  const handleAddUnitForUnits = (unitToTrade: UnitDetails<Unit>) => {
    const isUnitViable = checkUnitViabilityUnits(unit, units, unitToTrade);
    if (typeof isUnitViable === "string") {
      setError(isUnitViable);
      setSuccess("");
    } else {
      addUnit(unit);
      // @ts-ignore
      addUnit({ ...unitToTrade, unitSize: -unit.cost.units[unitToTrade.unit] });
      setSuccess(`${unit.unit} ${unit.equipmentOptions} added`);
      setError("");
    }
  };

  const viableUnitsToSpend = () => {
    return Object.values(combinedUnits(units)).filter((unitInArmy) => {
      return Object.keys(unit.cost.units as UnitsToSpend).some(
        (unitName) => unitName === unitInArmy.unit
      );
    });
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Fill the form</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <List sx={style} component="nav">
            {viableUnitsToSpend().map((unit, index) => (
              <React.Fragment key={`${unit.unit}-${unit.equipmentOptions}`}>
                {index > 0 && <Divider />}
                <ListItem button onClick={() => handleAddUnitForUnits(unit)}>
                  <ListItemText
                    primary={`${unit.unit}-${unit.equipmentOptions} (${unit.unitSize})`}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export { UnitCostDialog };
