import { PointsProviderState } from "../contexts/pointsContext";

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
      return {
        ...state,
        initialPoints: points,
        currentPoints: points,
      };
    case actions.SPEND_POINTS: {
      return {
        ...state,
        currentPoints:
          state.currentPoints - points >= 0
            ? state.currentPoints - points
            : state.currentPoints,
      };
    }
    case actions.RECEIVE_POINTS: {
      return {
        ...state,
        currentPoints:
          state.currentPoints + points <= state.initialPoints
            ? state.currentPoints + points
            : state.currentPoints,
      };
    }
    default:
      return state;
  }
};

export { pointsReducer, actions, initialState };
