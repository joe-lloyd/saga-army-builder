import { PointsProviderState } from "../contexts/pointsContext";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";

enum actions {
  SET_INITIAL_POINTS = "SET_INITIAL_POINTS",
  SPEND_POINTS = "SPEND_POINTS",
  RECEIVE_POINTS = "RECEIVE_POINTS",
  RESET_POINTS = "RESET_POINTS",
}

interface Actions {
  type: actions;
  points?: number;
}

const initialState = {
  initialPoints: 8,
  currentPoints: 8,
  setInitialPoints: (points: number) => {},
  spendPoints: (points: number) => {},
  receivePoints: (points: number) => {},
  resetPoints: () => {},
};

//Reducer to Handle Actions
const pointsReducer = (
  state: PointsProviderState,
  action: Actions
): PointsProviderState => {
  const { type, points } = action;

  switch (type) {
    case actions.SET_INITIAL_POINTS:
      if (typeof points !== "number") return state;
      addToLocalStorage(LocalstorageKeys.points, `${points}`);
      return {
        ...state,
        initialPoints: points,
        currentPoints: points,
      };
    case actions.SPEND_POINTS: {
      if (typeof points !== "number") return state;
      if (state.currentPoints - points >= 0) {
        addToLocalStorage(
          LocalstorageKeys.points,
          `${state.currentPoints - points}`
        );
        return {
          ...state,
          currentPoints: state.currentPoints - points,
        };
      }
      return {
        ...state,
      };
    }
    case actions.RECEIVE_POINTS: {
      if (typeof points !== "number") return state;
      if (state.currentPoints + points <= state.initialPoints) {
        addToLocalStorage(
          LocalstorageKeys.points,
          `${state.currentPoints + points}`
        );
        return {
          ...state,
          currentPoints: state.currentPoints + points,
        };
      }
      return { ...state };
    }
    case actions.RESET_POINTS: {
      addToLocalStorage(LocalstorageKeys.points, 8);
      return initialState;
    }
    default:
      return state;
  }
};

export { pointsReducer, actions, initialState };
