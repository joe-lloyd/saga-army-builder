import React from "react";
import {
  actions,
  initialState,
  pointsReducer,
} from "../reducers/pointsReducer";

interface PointsProviderState {
  initialPoints: number;
  currentPoints: number;
  setInitialPoints: (points: number) => void;
  spendPoints: (points: number) => void;
  receivePoints: (points: number) => void;
  resetPoints: () => void;
}

//Context and Provider
const PointsContext = React.createContext(initialState);

const PointsProvider: React.FC<any> = ({ children }) => {
  const currentPoints = localStorage.getItem("points");
  const hydratedInitialState = currentPoints
    ? { ...initialState, currentPoints: parseInt(currentPoints) }
    : initialState;

  const [state, dispatch] = React.useReducer(
    pointsReducer,
    hydratedInitialState
  );

  const value: PointsProviderState = {
    initialPoints: state.initialPoints,
    currentPoints: state.currentPoints,
    setInitialPoints: (points: number) => {
      dispatch({ type: actions.SET_INITIAL_POINTS, points });
    },
    spendPoints: (points: number) => {
      dispatch({ type: actions.SPEND_POINTS, points });
    },
    receivePoints: (points: number) => {
      dispatch({ type: actions.RECEIVE_POINTS, points });
    },
    resetPoints: () => {
      dispatch({ type: actions.RESET_POINTS });
    },
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};

export type { PointsProviderState };

export { PointsProvider, PointsContext };
