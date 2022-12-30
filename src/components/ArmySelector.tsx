import { useMediaQuery, useTheme } from "@mui/material";
import { factions, ArmyInterface } from "../ArmyUnitTypes";
import React from "react";
import { ArmyContext } from "../contexts/armyContext";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";
import { PointsContext } from "../contexts/pointsContext";
import { UnitContext } from "../contexts/unitContext";
import loadable from "@loadable/component";
const ArmySelectorButtonGroup = loadable(
  () => import("./ArmySelectorButtonGroup")
);
const ArmySelectorDropdown = loadable(() => import("./ArmySelectorDropdown"));

const ArmySelectorForScreenSize = () => {
  const theme = useTheme();
  const isScreenSizeLarge = useMediaQuery(theme.breakpoints.up("sm"));
  const { setArmy, armies, army } = React.useContext(ArmyContext);
  const { resetPoints } = React.useContext(PointsContext);
  const { resetUnits } = React.useContext(UnitContext);

  const handleSetArmy = (faction: typeof factions[number]) => {
    if (army && faction === army.name) return;
    addToLocalStorage(LocalstorageKeys.army, faction);
    resetPoints();
    resetUnits();
    setArmy(armies.find(({ name }) => name === faction) as ArmyInterface);
  };

  return isScreenSizeLarge ? (
    <ArmySelectorButtonGroup handleSetArmy={handleSetArmy} />
  ) : (
    <ArmySelectorDropdown handleSetArmy={handleSetArmy} armyName={army?.name} />
  );
};

export { ArmySelectorForScreenSize };
