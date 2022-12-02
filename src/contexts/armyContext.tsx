import React from "react";
import { armyActions, armyReducer } from "../reducers/armyReducer";
import { ArmyInterface } from "../ArmyUnitTypes";
import { armyData } from "../data/armies";

interface ArmyInitialState {
  army?: ArmyInterface;
  armies: ArmyInterface[];
  setArmy: (army: ArmyInterface) => void;
}

const armyInitialState: ArmyInitialState = {
  army: undefined,
  armies: armyData,
  setArmy: (army: ArmyInterface) => {},
};

const ArmyContext = React.createContext(armyInitialState);

const ArmyProvider: React.FC<any> = ({ children }) => {
  const factionName = localStorage.getItem("army");
  const army = armyInitialState.armies.find(({ name }) => name === factionName);

  const loadedState = army ? { ...armyInitialState, army } : armyInitialState;
  const [state, dispatch] = React.useReducer(armyReducer, loadedState);

  const value = {
    army: state.army,
    armies: state.armies,
    setArmy: (army: ArmyInterface) => {
      dispatch({ type: armyActions.SET_ARMY, payload: army });
    },
  };

  return <ArmyContext.Provider value={value}>{children}</ArmyContext.Provider>;
};

export type { ArmyInitialState };

export { ArmyProvider, ArmyContext };
