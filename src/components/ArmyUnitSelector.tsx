import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { ArmyContext } from "../contexts/armyContext";
import { ArmyTable } from "./ArmyTable";

const ArmyUnitSelector: React.FC<{}> = () => {
  const { army } = React.useContext(ArmyContext);

  if (!army) {
    return null;
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
      <Typography gutterBottom>{army.name} Units</Typography>
      {(army?.units || []).map(({ unitName, variants }) => (
        <Accordion key={`${army.name}-${unitName}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{unitName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ArmyTable units={variants} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export { ArmyUnitSelector };
