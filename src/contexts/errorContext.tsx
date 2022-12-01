import React from "react";
import {
  errorActions,
  initialState,
  errorReducer,
} from "../reducers/errorReducer";

interface ErrorProviderState {
  errorMessage: string;
  setError: (error: string) => void;
  clearError: () => void;
}

const ErrorContext = React.createContext(initialState);

const ErrorProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = React.useReducer(errorReducer, initialState);

  const value: ErrorProviderState = {
    errorMessage: state.errorMessage,
    setError: (error: string) => {
      dispatch({ type: errorActions.SET_ERROR, payload: error });
    },
    clearError: () => {
      dispatch({ type: errorActions.CLEAR_ERROR });
    },
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export type { ErrorProviderState };

export { ErrorProvider, ErrorContext };
