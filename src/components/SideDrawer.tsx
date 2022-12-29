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
import { IconButton, Tooltip, Typography } from "@mui/material";
import { UsersSavedArmiesContext } from "../contexts/usersSavedArmiesContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { PointsContext } from "../contexts/pointsContext";
import { ArmyContext } from "../contexts/armyContext";
import { ArmyInterface } from "../ArmyUnitTypes";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";
import { UnitContext } from "../contexts/unitContext";
import { initialPointsState } from "../reducers/pointsReducer";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { generateArmyUrl } from "../helpers/generateArmyUrl";
import QRCode from "react-qr-code";

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

  const loadArmy = (id: string) => {
    const selectedArmy = usersSavedArmies.find((army) => army.id === id);
    if (!selectedArmy) return;
    setPoints({
      initialPoints: selectedArmy.initialPoints,
      currentPoints: selectedArmy.currentPoints,
    });
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
    addToLocalStorage(LocalstorageKeys.army, "");
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
                <>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteUserSavedArmy(army.id)}
                    sx={{ mr: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Use for linking army to your phone
                        </Typography>
                        <QRCode value={generateArmyUrl(army) as string} />
                      </React.Fragment>
                    }
                  >
                    <IconButton edge="end" aria-label="generate qr code">
                      <QrCodeIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItemButton onClick={() => loadArmy(army.id)}>
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
