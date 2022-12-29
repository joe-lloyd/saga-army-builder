import { PointsProvider } from "../contexts/pointsContext";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ArmyProvider } from "../contexts/armyContext";
import { ErrorProvider } from "../contexts/errorContext";
import { SuccessProvider } from "../contexts/successContext";
import { UnitProvider } from "../contexts/unitContext";
import { UsersSavedArmiesProvider } from "../contexts/usersSavedArmiesContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Providers: React.FC<any> = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ErrorProvider>
        <SuccessProvider>
          <UnitProvider>
            <PointsProvider>
              <ArmyProvider>
                <UsersSavedArmiesProvider>{children}</UsersSavedArmiesProvider>
              </ArmyProvider>
            </PointsProvider>
          </UnitProvider>
        </SuccessProvider>
      </ErrorProvider>
    </ThemeProvider>
  );
};

export { Providers };
