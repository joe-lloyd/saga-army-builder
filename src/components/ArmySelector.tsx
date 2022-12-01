import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { factions, ArmyInterface } from "../ArmyUnitTypes";
import React from "react";
import { ArmyContext } from "../contexts/armyContext";
import { armyData } from "../data/armies";
import { addUnitsToLocalStorage } from '../helpers/localstorage';

const ArmySelector = () => {
  const { setArmy } = React.useContext(ArmyContext);

  const handleSetArmy = (faction: typeof factions[number]) => {
    setArmy(
      armyData.find(({ name }) => name === faction) as ArmyInterface
    )
    addUnitsToLocalStorage('army', faction)
  }

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
          <Button
            key={faction}
            onClick={() => handleSetArmy(faction)}>
            {faction}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export { ArmySelector };
