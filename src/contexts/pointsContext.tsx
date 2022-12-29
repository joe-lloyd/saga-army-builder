import React from "react";
import {
  actions,
  initialPointsState,
  pointsReducer,
} from "../reducers/pointsReducer";

interface PointsProviderState {
  initialPoints: number;
  currentPoints: number;
  setInitialPoints: (points: number) => void;
  setPoints: (points: { initialPoints: number, currentPoints: number }) => void;
  spendPoints: (points: number) => void;
  receivePoints: (points: number) => void;
  resetPoints: () => void;
}

//Context and Provider
const PointsContext = React.createContext(initialPointsState);

const PointsProvider: React.FC<any> = ({ children }) => {
  const currentPoints = localStorage.getItem("points");
  const initialPoints = localStorage.getItem("initialPoints");
  const hydratedInitialState = currentPoints && initialPoints
    ? { ...initialPointsState, currentPoints: parseInt(currentPoints), initialPoints: parseInt(initialPoints) }
    : initialPointsState;

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
    setPoints: (points: { initialPoints: number, currentPoints: number }) => {
      dispatch({ type: actions.SET_POINTS, points });
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
