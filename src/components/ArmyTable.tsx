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
import { checkUnitViability } from "../helpers/checkUnitViability";
import { ErrorContext } from "../contexts/errorContext";
import { SuccessContext } from "../contexts/successContext";
import { UnitContext } from "../contexts/unitContext";

const ArmyTable: React.FC<{ units: UnitDetails<Unit>[] }> = ({ units }) => {
  const { spendPoints, receivePoints, currentPoints } =
    React.useContext(PointsContext);
  const {
    addUnit,
    removeUnit,
    units: currentUnits,
  } = React.useContext(UnitContext);
  const { setError } = React.useContext(ErrorContext);
  const { setSuccess } = React.useContext(SuccessContext);

  const handleAddUnit = (unit: UnitDetails<Unit>) => {
    const isUnitViable = checkUnitViability(unit, currentUnits, currentPoints);
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

  const handleRemoveUnit = (unit: UnitDetails<Unit>) => {
    receivePoints(unit.cost.points || 0);
    removeUnit(unit);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleAddUnit(unit)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveUnit(unit)}
                >
                  <RemoveIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ArmyTable };
