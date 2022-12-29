import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShieldIcon from "@mui/icons-material/Shield";
import { IconButton, Typography } from "@mui/material";
import { UsersSavedArmiesContext } from "../contexts/usersSavedArmiesContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { PointsContext } from "../contexts/pointsContext";
import { ArmyContext } from '../contexts/armyContext';
import { ArmyInterface } from "../ArmyUnitTypes";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";
import { UnitContext } from "../contexts/unitContext";
import { initialPointsState } from '../reducers/pointsReducer';

interface SideDrawerProps {
  toggleDrawer: (open: boolean) => void;
  open: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ toggleDrawer, open }) => {
  const { usersSavedArmies, deleteUserSavedArmy } = React.useContext(
    UsersSavedArmiesContext
  );
  const { setPoints } = React.useContext(PointsContext);
  const { setArmy, armies } = React.useContext(ArmyContext);
  const { setInitialUnits } = React.useContext(UnitContext);

  const loadArmy = (index: number) => {
    const selectedArmy = usersSavedArmies[index];
    setPoints(selectedArmy.points);
    setArmy(
      armies.find(({ name }) => name === selectedArmy.faction) as ArmyInterface
    );
    addToLocalStorage(LocalstorageKeys.army, selectedArmy.faction);
    setInitialUnits(selectedArmy.units);
    toggleDrawer(false);
  };

  const clearArmy = () => {
    setPoints(initialPointsState);
    setArmy(undefined);
    addToLocalStorage(LocalstorageKeys.army, '');
    setInitialUnits([]);
    toggleDrawer(false);
  };

  return (
    <Drawer anchor={"left"} open={open} onClose={() => toggleDrawer(false)}>
      <Box sx={{ width: { xs: "85vw", sm: "500px" } }} role="presentation">
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, p: "8px 16px" }}
        >
          Options
        </Typography>
        <ListItem disablePadding>
          <ListItemButton onClick={() => clearArmy()}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Clear current Army" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <List>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, p: "8px 16px" }}
          >
            Saved Armies
          </Typography>
          {usersSavedArmies.length === 0 && (
            <Typography sx={{ flexGrow: 1, p: "8px 16px" }}>
              You haven't saved any armies yet. When you create one, it will
              appear here.
            </Typography>
          )}
          {usersSavedArmies.map((army, index) => (
            <ListItem
              key={army.armyName}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteUserSavedArmy(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => loadArmy(index)}>
                <ListItemIcon>
                  <ShieldIcon />
                </ListItemIcon>
                <ListItemText primary={army.armyName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export { SideDrawer };
