import React from "react";
import {
  usersSavedArmiesActions,
  usersSavedArmiesReducer,
} from "../reducers/usersSavedArmiesReducer";
import { factions, Unit, UnitDetails } from "../ArmyUnitTypes";

interface UserSavedArmy {
  armyName: string;
  faction: typeof factions[number];
  units: UnitDetails<Unit>[];
  points: {
    initialPoints: number;
    currentPoints: number;
  };
}

interface UsersSavedArmiesInitialState {
  usersSavedArmies: UserSavedArmy[];
  setUserSavedArmy: (army: UserSavedArmy) => void;
  deleteUserSavedArmy: (indexToDelete: number) => void;
}

const usersSavedArmiesInitialState: UsersSavedArmiesInitialState = {
  usersSavedArmies: [],
  setUserSavedArmy: (army: UserSavedArmy) => {},
  deleteUserSavedArmy: (indexToDelete: number) => {},
};

const UsersSavedArmiesContext = React.createContext(
  usersSavedArmiesInitialState
);

const UsersSavedArmiesProvider: React.FC<any> = ({ children }) => {
  const usersSavedArmies = localStorage.getItem("usersSavedArmies");
  const loadedState = !!usersSavedArmies?.length
    ? {
        ...usersSavedArmiesInitialState,
        usersSavedArmies: JSON.parse(usersSavedArmies),
      }
    : usersSavedArmiesInitialState;
  const [state, dispatch] = React.useReducer(
    usersSavedArmiesReducer,
    loadedState
  );

  const value = {
    usersSavedArmies: state.usersSavedArmies,
    setUserSavedArmy: (army: UserSavedArmy) => {
      dispatch({
        type: usersSavedArmiesActions.SET_USER_SAVED_ARMY,
        payload: army,
      });
    },
    deleteUserSavedArmy: (indexToDelete: number) => {
      dispatch({
        type: usersSavedArmiesActions.DELETE_USER_SAVED_ARMY_BY_INDEX,
        payload: indexToDelete,
      });
    },
  };

  return (
    <UsersSavedArmiesContext.Provider value={value}>
      {children}
    </UsersSavedArmiesContext.Provider>
  );
};

export type { UsersSavedArmiesInitialState, UserSavedArmy };

export { UsersSavedArmiesProvider, UsersSavedArmiesContext };
