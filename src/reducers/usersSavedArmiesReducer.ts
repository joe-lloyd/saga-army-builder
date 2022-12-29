import {
  UsersSavedArmiesInitialState,
  UserSavedArmy,
} from "../contexts/usersSavedArmiesContext";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";

enum usersSavedArmiesActions {
  SET_USER_SAVED_ARMY = "SET_USER_SAVED_ARMY",
  DELETE_USER_SAVED_ARMY_BY_ID = "DELETE_USER_SAVED_ARMY_BY_ID",
}

interface UsersSavedArmiesActions {
  type: usersSavedArmiesActions;
  payload: UserSavedArmy | string;
}

const usersSavedArmiesReducer = (
  state: UsersSavedArmiesInitialState,
  action: UsersSavedArmiesActions
): UsersSavedArmiesInitialState => {
  const { type, payload } = action;

  switch (type) {
    case usersSavedArmiesActions.SET_USER_SAVED_ARMY:
      addToLocalStorage(
        LocalstorageKeys.usersSavedArmies,
        JSON.stringify([...state.usersSavedArmies, payload])
      );
      return {
        ...state,
        usersSavedArmies: [...state.usersSavedArmies, payload as UserSavedArmy],
      };
    case usersSavedArmiesActions.DELETE_USER_SAVED_ARMY_BY_ID:
      const newUsersSavedArmies = state.usersSavedArmies.filter(
        ({ id }) => id !== payload
      );
      addToLocalStorage(
        LocalstorageKeys.usersSavedArmies,
        JSON.stringify(newUsersSavedArmies)
      );
      return {
        ...state,
        usersSavedArmies: newUsersSavedArmies,
      };
    default:
      return state;
  }
};

export { usersSavedArmiesReducer, usersSavedArmiesActions };
