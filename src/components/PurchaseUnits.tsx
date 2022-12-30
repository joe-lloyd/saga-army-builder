import { useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import loadable from "@loadable/component";
import { Unit, UnitDetails } from "../ArmyUnitTypes";
import { PointsContext } from "../contexts/pointsContext";
import { checkUnitViabilityPoints } from "../helpers/checkUnitViabilityPoints";
import { ErrorContext } from "../contexts/errorContext";
import { SuccessContext } from "../contexts/successContext";
import { UnitContext } from "../contexts/unitContext";
const ArmyTable = loadable(() => import("./PurchaseUnitsTable"));
const ArmyCard = loadable(() => import("./PurchaseUnitsCards"));

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
