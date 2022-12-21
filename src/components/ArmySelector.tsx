import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { factions, ArmyInterface } from "../ArmyUnitTypes";
import React, { FC } from "react";
import { ArmyContext } from "../contexts/armyContext";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";
import { PointsContext } from "../contexts/pointsContext";
import { UnitContext } from "../contexts/unitContext";

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

const ArmySelectorDropdown: FC<{
  handleSetArmy: handleArmyType;
  armyName?: typeof factions[number];
}> = ({ armyName, handleSetArmy }) => {
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
      <FormControl fullWidth>
        <InputLabel id="army-select-label">Army</InputLabel>
        <Select
          labelId="army-select-label"
          id="army-select-select"
          value={armyName}
          label="Army"
          onChange={(event) =>
            handleSetArmy(event.target.value as typeof factions[number])
          }
        >
          {factions.map((faction) => (
            <MenuItem value={faction} key={faction}>
              {faction}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select you army</FormHelperText>
      </FormControl>
    </Box>
  );
};

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
