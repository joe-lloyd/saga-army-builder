import { SuccessProviderState } from "../contexts/successContext";

enum successActions {
  CLEAR_SUCCESS = "CLEAR_SUCCESS",
  SET_SUCCESS = "SET_SUCCESS",
}

interface ArmyActions {
  type: successActions;
  payload?: string;
}

const initialState: SuccessProviderState = {
  successMessage: "",
  setSuccess: (success: string) => {},
  clearSuccess: () => {},
};

//Reducer to Handle Actions
const successReducer = (
  state: SuccessProviderState,
  action: ArmyActions
): SuccessProviderState => {
  const { type, payload } = action;

  switch (type) {
    case successActions.SET_SUCCESS: {
      return {
        ...state,
        successMessage: payload as string,
      };
    }
    case successActions.CLEAR_SUCCESS: {
      return {
        ...state,
        successMessage: "",
      };
    }
    default:
      return state;
  }
};

export { successReducer, successActions, initialState };
