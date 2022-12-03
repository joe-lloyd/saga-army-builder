import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { factions, ArmyInterface } from "../ArmyUnitTypes";
import React from "react";
import { ArmyContext } from "../contexts/armyContext";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";
import { PointsContext } from '../contexts/pointsContext';
import { UnitContext } from '../contexts/unitContext';

const ArmySelector = () => {
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

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography gutterBottom>Select a Faction</Typography>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {factions.map((faction) => (
          <Button key={faction} onClick={() => handleSetArmy(faction)}>
            {faction}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export { ArmySelector };
