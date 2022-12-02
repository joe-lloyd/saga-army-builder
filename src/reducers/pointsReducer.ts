import { PointsProviderState } from "../contexts/pointsContext";
import { addToLocalStorage } from "../helpers/localstorage";

enum actions {
  SET_INITIAL_POINTS = "SET_INITIAL_POINTS",
  SPEND_POINTS = "SPEND_POINTS",
  RECEIVE_POINTS = "RECEIVE_POINTS",
}

interface Actions {
  type: actions;
  points: number;
}

const initialState = {
  initialPoints: 8,
  currentPoints: 8,
  setInitialPoints: (points: number) => {},
  spendPoints: (points: number) => {},
  receivePoints: (points: number) => {},
};

//Reducer to Handle Actions
const pointsReducer = (
  state: PointsProviderState,
  action: Actions
): PointsProviderState => {
  const { type, points } = action;

  switch (type) {
    case actions.SET_INITIAL_POINTS:
      addToLocalStorage("points", `${points}`);
      return {
        ...state,
        initialPoints: points,
        currentPoints: points,
      };
    case actions.SPEND_POINTS: {
      if (state.currentPoints - points >= 0) {
        addToLocalStorage("points", `${state.currentPoints - points}`);
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
      if (state.currentPoints + points <= state.initialPoints) {
        addToLocalStorage("points", `${state.currentPoints + points}`);
        return {
          ...state,
          currentPoints: state.currentPoints + points,
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export { pointsReducer, actions, initialState };
