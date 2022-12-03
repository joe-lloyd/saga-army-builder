import React from "react";
import {
  unitActions,
  initialState,
  unitReducer,
} from "../reducers/unitReducer";
import { Unit, UnitDetails } from "../ArmyUnitTypes";

interface UnitProviderState {
  units: UnitDetails<Unit>[];
  setInitialUnits: (units: UnitDetails<Unit>[]) => void;
  addUnit: (unit: UnitDetails<Unit>) => void;
  removeUnit: (unit: UnitDetails<Unit>) => void;
  resetUnits: () => void;
}

//Context and Provider
const UnitContext = React.createContext(initialState);

const UnitProvider: React.FC<any> = ({ children }) => {
  const units = localStorage.getItem("units");
  const hydratedInitialState = units
    ? { ...initialState, units: JSON.parse(units) }
    : initialState;

  const [state, dispatch] = React.useReducer(unitReducer, hydratedInitialState);

  const value: UnitProviderState = {
    units: state.units,
    setInitialUnits: (units: UnitDetails<Unit>[]) => {
      dispatch({ type: unitActions.SET_INITIAL_UNITS, payload: units });
    },
    addUnit: (unit: UnitDetails<Unit>) => {
      dispatch({ type: unitActions.ADD_UNIT, payload: unit });
    },
    removeUnit: (unit: UnitDetails<Unit>) => {
      dispatch({ type: unitActions.REMOVE_UNIT, payload: unit });
    },
    resetUnits: () => {
      dispatch({ type: unitActions.RESET_UNITS });
    }
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};

export type { UnitProviderState };

export { UnitProvider, UnitContext };
