import React from "react";
import { Box } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Unit, UnitDetails } from "../ArmyUnitTypes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ArmyViewerInterface {
  units: { [key: string]: UnitDetails<Unit> };
}

const ArmyViewerDesktop: React.FC<ArmyViewerInterface> = ({ units }) => {
  return (
    <Box sx={style}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Unit</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Equipment&nbsp;Options</TableCell>
              <TableCell align="right">Armour&nbsp;Melee(Shooting)</TableCell>
              <TableCell align="right">
                Aggression&nbsp;Melee(Shooting)
              </TableCell>
              <TableCell align="right">Special Rules</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(units).map((unit) => (
              <TableRow
                key={unit.equipmentOptions}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {unit.unit}
                </TableCell>
                <TableCell align="right">{unit.unitSize}</TableCell>
                <TableCell align="right">{unit.equipmentOptions}</TableCell>
                <TableCell align="right">{`${unit.armour.melee}(${unit.armour.shooting})`}</TableCell>
                <TableCell align="right">{`${unit.aggression.melee}(${unit.aggression.shooting})`}</TableCell>
                <TableCell align="right" width={250}>
                  {unit.specialRules.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ArmyViewerDesktop;
