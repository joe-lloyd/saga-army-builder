import { Box, Typography } from "@mui/material";
import React from "react";
import { ArmyContext } from "../contexts/armyContext";
import { PurchaseUnits } from "./PurchaseUnits";

const ArmyUnitSelector: React.FC<{}> = () => {
  const { army } = React.useContext(ArmyContext);

  if (!army) {
    return null;
  }

  return (
    <Box>
      <Typography gutterBottom>{army.name} Units</Typography>
      {(army?.units || []).map(({ unitName, variants }) => (
        <PurchaseUnits key={`${army.name}-${unitName}`} units={variants} army={army.name} unitName={unitName} />
      ))}
    </Box>
  );
};

export { ArmyUnitSelector };
