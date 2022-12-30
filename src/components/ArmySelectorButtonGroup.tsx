import React, { FC } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { factions } from "../ArmyUnitTypes";

type handleArmyType = (faction: typeof factions[number]) => void;

const ArmySelectorButtonGroup: FC<{ handleSetArmy: handleArmyType }> = ({
  handleSetArmy,
}) => {
  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
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

export default ArmySelectorButtonGroup;
