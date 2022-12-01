import { ErrorProviderState } from "../contexts/errorContext";

enum errorActions {
  CLEAR_ERROR = "CLEAR_ERROR",
  SET_ERROR = "SET_ERROR",
}

interface ArmyActions {
  type: errorActions;
  payload?: string;
}

const initialState: ErrorProviderState = {
  errorMessage: "",
  setError: (error: string) => {},
  clearError: () => {},
};

//Reducer to Handle Actions
const errorReducer = (
  state: ErrorProviderState,
  action: ArmyActions
): ErrorProviderState => {
  const { type, payload } = action;

  switch (type) {
    case errorActions.SET_ERROR: {
      return {
        ...state,
        errorMessage: payload as string,
      };
    }
    case errorActions.CLEAR_ERROR: {
      return {
        ...state,
        errorMessage: "",
      };
    }
    default:
      return state;
  }
};

export { errorReducer, errorActions, initialState };
