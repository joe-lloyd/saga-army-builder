import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { checkUnitCanBeBoughtWithAnyUnitInCurrentArmy } from "../helpers/checkUnitViabilityPoints";
import { UnitCostDialog } from "./UnitCostDialog";
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

const StyledCard = styled(Card)({
  minWidth: 275,
  marginBottom: "8px",
});

const ArmyCard: React.FC<UnitsProps> = ({
  units,
  currentUnits,
  setOpenUnitCostDialog,
  openUnitCostDialog,
  handleAddUnitPoints,
  unitExists,
  handleRemoveUnitPoints,
  handleRemoveUnitUnits,
}) => {
  return (
    <div style={{ width: "100%", overflow: "auto", display: "flex" }}>
      {units.map((unit, index) => (
        <StyledCard
          key={`${unit.unit}-${unit.equipmentOptions}`}
          sx={{
            marginRight: `${
              units.length === 1 || units.length - 1 === index ? "auto" : "8px"
            }`,
            minWidth: `${units.length === 1 ? "auto" : "calc(90vw - 16px)"}`,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              {unit.unit}
              {unit.equipmentOptions === "None"
                ? ""
                : `: ${unit.equipmentOptions.split(/(?=[A-Z])/).join(" ")}`}
            </Typography>
            <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ padding: "8px" }} align="left">
                    Armour Melee(Shooting)
                  </TableCell>
                  <TableCell sx={{ padding: "8px" }} align="left">
                    Aggression Melee(Shooting)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    sx={{ padding: "8px" }}
                    align="center"
                  >{`${unit.armour.melee}(${unit.armour.shooting})`}</TableCell>
                  <TableCell
                    sx={{ padding: "8px" }}
                    align="center"
                  >{`${unit.aggression.melee}(${unit.aggression.shooting})`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {!!unit.specialRules.length && (
              <Typography variant="body2" component="p">
                Special rules: {unit.specialRules.join(", ")}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {!!unit.cost.units &&
              checkUnitCanBeBoughtWithAnyUnitInCurrentArmy(
                unit,
                currentUnits
              ) && (
                <>
                  <Button
                    size="small"
                    onClick={() => setOpenUnitCostDialog({ [index]: true })}
                  >
                    Add Unit
                  </Button>
                  <UnitCostDialog
                    index={index}
                    unit={unit}
                    setOpen={setOpenUnitCostDialog}
                    open={openUnitCostDialog[index]}
                  />
                </>
              )}
            {typeof unit.cost.points === "number" && (
              <Button size="small" onClick={() => handleAddUnitPoints(unit)}>
                Add Unit
              </Button>
            )}
            {unitExists(unit) && (
              <Button
                size="small"
                onClick={
                  "points" in unit.cost
                    ? () => handleRemoveUnitPoints(unit)
                    : () => handleRemoveUnitUnits(unit)
                }
              >
                Remove Unit
              </Button>
            )}
          </CardActions>
        </StyledCard>
      ))}
    </div>
  );
};

export default ArmyCard;
