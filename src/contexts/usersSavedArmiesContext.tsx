import React from "react";
import {
  usersSavedArmiesActions,
  usersSavedArmiesReducer,
} from "../reducers/usersSavedArmiesReducer";
import { factions, Unit, UnitDetails } from "../ArmyUnitTypes";

interface UserSavedArmy {
  id: string;
  armyName: string;
  faction: typeof factions[number];
  units: UnitDetails<Unit>[];
  initialPoints: number;
  currentPoints: number;
}

interface UsersSavedArmiesInitialState {
  usersSavedArmies: UserSavedArmy[];
  setUserSavedArmy: (army: UserSavedArmy) => void;
  deleteUserSavedArmy: (id: string) => void;
}

const usersSavedArmiesInitialState: UsersSavedArmiesInitialState = {
  usersSavedArmies: [],
  setUserSavedArmy: (army: UserSavedArmy) => {},
  deleteUserSavedArmy: (id: string) => {},
};

const UsersSavedArmiesContext = React.createContext(
  usersSavedArmiesInitialState
);

const UsersSavedArmiesProvider: React.FC<any> = ({ children, value }) => {
  const usersSavedArmies = localStorage.getItem("usersSavedArmies");
  let initialStateSavedArmies: UsersSavedArmiesInitialState =
    usersSavedArmiesInitialState;
  if (usersSavedArmies) {
    initialStateSavedArmies = {
      ...initialStateSavedArmies,
      usersSavedArmies: JSON.parse(usersSavedArmies),
    };
  }
  if (value) {
    initialStateSavedArmies = {
      ...initialStateSavedArmies,
      usersSavedArmies: [...initialStateSavedArmies.usersSavedArmies, value],
    };
  }

  const [state, dispatch] = React.useReducer(
    usersSavedArmiesReducer,
    initialStateSavedArmies
  );

  const data = {
    usersSavedArmies: state.usersSavedArmies,
    setUserSavedArmy: (army: UserSavedArmy) => {
      dispatch({
        type: usersSavedArmiesActions.SET_USER_SAVED_ARMY,
        payload: army,
      });
    },
    deleteUserSavedArmy: (id: string) => {
      dispatch({
        type: usersSavedArmiesActions.DELETE_USER_SAVED_ARMY_BY_ID,
        payload: id,
      });
    },
  };

  return (
    <UsersSavedArmiesContext.Provider value={data}>
      {children}
    </UsersSavedArmiesContext.Provider>
  );
};

export type { UsersSavedArmiesInitialState, UserSavedArmy };

export { UsersSavedArmiesProvider, UsersSavedArmiesContext };
