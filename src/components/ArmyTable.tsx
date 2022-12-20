import { IconButton } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { Unit, UnitDetails } from "../ArmyUnitTypes";
import { PointsContext } from "../contexts/pointsContext";
import {
  checkUnitCanBeBoughtWithAnyUnitInCurrentArmy,
  checkUnitViabilityPoints,
} from "../helpers/checkUnitViabilityPoints";
import { ErrorContext } from "../contexts/errorContext";
import { SuccessContext } from "../contexts/successContext";
import { UnitContext } from "../contexts/unitContext";
import { UnitCostDialog } from "./UnitCostDialog";

const ArmyTable: React.FC<{ units: UnitDetails<Unit>[]; army: string }> = ({
  units,
  army,
}) => {
  const [openUnitCostDialog, setOpenUnitCostDialog] = React.useState(false);
  const { spendPoints, receivePoints, currentPoints } =
    React.useContext(PointsContext);
  const {
    addUnit,
    removeUnit,
    units: currentUnits,
  } = React.useContext(UnitContext);
  const { setError } = React.useContext(ErrorContext);
  const { setSuccess } = React.useContext(SuccessContext);

  const handleAddUnitPoints = (unit: UnitDetails<Unit>) => {
    const isUnitViable = checkUnitViabilityPoints(
      unit,
      currentUnits,
      currentPoints
    );
    if (typeof isUnitViable === "string") {
      setError(isUnitViable);
      setSuccess("");
    } else {
      addUnit(unit);
      spendPoints(unit.cost.points || 0);
      setSuccess(`${unit.unit} ${unit.equipmentOptions} added`);
      setError("");
    }
  };

  const handleRemoveUnitPoints = (unit: UnitDetails<Unit>) => {
    receivePoints(unit.cost.points || 0);
    removeUnit(unit);
    setSuccess(`${unit.unit} ${unit.equipmentOptions} removed`);
  };

  const handleRemoveUnitUnits = (unit: UnitDetails<Unit>) => {
    const thisUnitInYourUnitsList = currentUnits.find(
      (currentUnit) => currentUnit.unit === unit.unit
    ) as UnitDetails<Unit>;
    const unitYouUsedToPayFor = currentUnits.find(
      (currentUnit) =>
        currentUnit.unitPaidFor === thisUnitInYourUnitsList.costId
    ) as UnitDetails<Unit>;

    removeUnit(unit);
    removeUnit(unitYouUsedToPayFor);

    setSuccess(`${unit.unit} ${unit.equipmentOptions} removed`);
  };

  const unitExists = (unit: UnitDetails<Unit>) =>
    currentUnits.some(
      (currentUnit) =>
        currentUnit.unit === unit.unit &&
        currentUnit.equipmentOptions === unit.equipmentOptions
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label={`${army}-army-table`}>
        <TableHead>
          <TableRow>
            <TableCell>Equipment&nbsp;Options</TableCell>
            <TableCell align="right">Armour&nbsp;Melee(Shooting)</TableCell>
            <TableCell align="right">Aggression&nbsp;Melee(Shooting)</TableCell>
            <TableCell align="right">Special Rules</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {units.map((unit) => (
            <TableRow
              key={unit.equipmentOptions}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row" width={200}>
                {unit.equipmentOptions.split(/(?=[A-Z])/).join(" ")}
              </TableCell>
              <TableCell align="right">{`${unit.armour.melee}(${unit.armour.shooting})`}</TableCell>
              <TableCell align="right">{`${unit.aggression.melee}(${unit.aggression.shooting})`}</TableCell>
              <TableCell align="right" width={250}>
                {unit.specialRules.join(", ")}
              </TableCell>
              <TableCell align="right" width={80}>
                {!!unit.cost.units &&
                  checkUnitCanBeBoughtWithAnyUnitInCurrentArmy(
                    unit,
                    currentUnits
                  ) && (
                    <>
                      <IconButton
                        aria-label={`add-${unit.unit}-with-units`}
                        onClick={() => setOpenUnitCostDialog(true)}
                      >
                        <AddIcon />
                      </IconButton>
                      <UnitCostDialog
                        unit={unit}
                        setOpen={setOpenUnitCostDialog}
                        open={openUnitCostDialog}
                      />
                    </>
                  )}
                {typeof unit.cost.points === "number" && (
                  <IconButton
                    aria-label={`add-${unit.unit}-with-points`}
                    onClick={() => handleAddUnitPoints(unit)}
                  >
                    <AddIcon />
                  </IconButton>
                )}
                {unitExists(unit) && (
                  <IconButton
                    aria-label={`delete-${unit.unit}`}
                    onClick={
                      "points" in unit.cost
                        ? () => handleRemoveUnitPoints(unit)
                        : () => handleRemoveUnitUnits(unit)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ArmyTable };
