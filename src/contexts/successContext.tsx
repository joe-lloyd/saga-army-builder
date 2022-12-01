import React from "react";
import {
  successActions,
  initialState,
  successReducer,
} from "../reducers/successReducer";

interface SuccessProviderState {
  successMessage: string;
  setSuccess: (success: string) => void;
  clearSuccess: () => void;
}

const SuccessContext = React.createContext(initialState);

const SuccessProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = React.useReducer(successReducer, initialState);

  const value: SuccessProviderState = {
    successMessage: state.successMessage,
    setSuccess: (success: string) => {
      dispatch({ type: successActions.SET_SUCCESS, payload: success });
    },
    clearSuccess: () => {
      dispatch({ type: successActions.CLEAR_SUCCESS });
    },
  };

  return (
    <SuccessContext.Provider value={value}>{children}</SuccessContext.Provider>
  );
};

export type { SuccessProviderState };

export { SuccessProvider, SuccessContext };
