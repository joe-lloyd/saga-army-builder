import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  styled,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
  AccordionSummary,
  Accordion,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { Dispatch, SetStateAction } from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const StyledCard = styled(Card)({
  minWidth: 275,
  marginBottom: "8px",
});

// @ts-ignore
const ArmyCard: React.FC<UnitsProps> = ({
  units,
  army,
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

const PurchaseUnits: React.FC<{
  units: UnitDetails<Unit>[];
  army: string;
  unitName: string;
}> = ({ units, army, unitName }) => {
  const theme = useTheme();
  const isScreenSizeLarge = useMediaQuery(theme.breakpoints.up("sm"));

  const [openUnitCostDialog, setOpenUnitCostDialog] = React.useState<{
    [key: number]: boolean;
  }>({});
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

  return isScreenSizeLarge ? (
    <ArmyTable
      units={units}
      army={army}
      currentUnits={currentUnits}
      setOpenUnitCostDialog={setOpenUnitCostDialog}
      openUnitCostDialog={openUnitCostDialog}
      handleAddUnitPoints={handleAddUnitPoints}
      unitExists={unitExists}
      handleRemoveUnitPoints={handleRemoveUnitPoints}
      handleRemoveUnitUnits={handleRemoveUnitUnits}
      unitName={unitName}
    />
  ) : (
    <ArmyCard
      units={units}
      army={army}
      currentUnits={currentUnits}
      setOpenUnitCostDialog={setOpenUnitCostDialog}
      openUnitCostDialog={openUnitCostDialog}
      handleAddUnitPoints={handleAddUnitPoints}
      unitExists={unitExists}
      handleRemoveUnitPoints={handleRemoveUnitPoints}
      handleRemoveUnitUnits={handleRemoveUnitUnits}
    />
  );
};

export { PurchaseUnits };
