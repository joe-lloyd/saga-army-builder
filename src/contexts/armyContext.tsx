import React from "react";
import {
  armyActions,
  initialState,
  armyReducer,
} from "../reducers/armyReducer";
import { ArmyInterface } from "../ArmyUnitTypes";

interface ArmyProviderState {
  army?: ArmyInterface;
  setArmy: (army: ArmyInterface) => void;
}

//Context and Provider
const ArmyContext = React.createContext(initialState);

const ArmyProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = React.useReducer(armyReducer, initialState);

  const value: ArmyProviderState = {
    army: state.army,
    setArmy: (army: ArmyInterface) => {
      dispatch({ type: armyActions.SET_ARMY, payload: army });
    },
  };

  return <ArmyContext.Provider value={value}>{children}</ArmyContext.Provider>;
};

export type { ArmyProviderState };

export { ArmyProvider, ArmyContext };
