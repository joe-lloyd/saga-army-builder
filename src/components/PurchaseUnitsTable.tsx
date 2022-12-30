import React, { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { checkUnitCanBeBoughtWithAnyUnitInCurrentArmy } from "../helpers/checkUnitViabilityPoints";
import AddIcon from "@mui/icons-material/Add";
import { UnitCostDialog } from "./UnitCostDialog";
import RemoveIcon from "@mui/icons-material/Remove";
import { Unit, UnitDetails } from "../ArmyUnitTypes";

interface UnitsProps {
  units: UnitDetails<Unit>[];
  army: string;
  currentUnits: UnitDetails<Unit>[];
  setOpenUnitCostDialog: Dispatch<SetStateAction<{ [key: number]: boolean }>>;
  openUnitCostDialog: { [key: number]: boolean };
  handleAddUnitPoints: (unit: UnitDetails<Unit>) => void;
  unitExists: (unit: UnitDetails<Unit>) => boolean;
  handleRemoveUnitPoints: (unit: UnitDetails<Unit>) => void;
  handleRemoveUnitUnits: (unit: UnitDetails<Unit>) => void;
  unitName?: string;
}

const ArmyTable: React.FC<UnitsProps> = ({
  units,
  army,
  currentUnits,
  setOpenUnitCostDialog,
  openUnitCostDialog,
  handleAddUnitPoints,
  unitExists,
  handleRemoveUnitPoints,
  handleRemoveUnitUnits,
  unitName,
}) => {
  return (
    <Accordion key={`${army}-${unitName}`}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${army}-${unitName}-panel1a-content`}
        id={`${army}-${unitName}-panel1a-header`}
      >
        <Typography>{unitName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label={`${army}-army-table`}>
            <TableHead>
              <TableRow>
                <TableCell>Equipment&nbsp;Options</TableCell>
                <TableCell align="right">Armour&nbsp;Melee(Shooting)</TableCell>
                <TableCell align="right">
                  Aggression&nbsp;Melee(Shooting)
                </TableCell>
                <TableCell align="right">Special Rules</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {units.map((unit, index) => (
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
                            onClick={() =>
                              setOpenUnitCostDialog({ [index]: true })
                            }
                          >
                            <AddIcon />
                          </IconButton>
                          <UnitCostDialog
                            index={index}
                            unit={unit}
                            setOpen={setOpenUnitCostDialog}
                            open={openUnitCostDialog[index]}
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
      </AccordionDetails>
    </Accordion>
  );
};

export default ArmyTable;
