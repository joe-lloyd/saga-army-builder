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
}

//Context and Provider
const PointsContext = React.createContext(initialState);

const PointsProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = React.useReducer(pointsReducer, initialState);

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
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};

export type { PointsProviderState };

export { PointsProvider, PointsContext };
