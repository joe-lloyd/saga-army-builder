import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { factions, ArmyInterface } from "../ArmyUnitTypes";
import React from "react";
import { ArmyContext } from "../contexts/armyContext";
import { addToLocalStorage } from "../helpers/localstorage";

const ArmySelector = () => {
  const { setArmy, armies } = React.useContext(ArmyContext);

  const handleSetArmy = (faction: typeof factions[number]) => {
    addToLocalStorage("army", faction);
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
