import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import { ArmyProviderState } from "../contexts/armyContext";

enum armyActions {
  SET_ARMY = "SET_ARMY",
}

interface ArmyActions {
  type: armyActions;
  payload?: UnitDetails<Unit>[] | UnitDetails<Unit> | ArmyInterface;
}

const initialState: ArmyProviderState = {
  army: undefined,
  setArmy: (army: ArmyInterface) => {},
};

//Reducer to Handle Actions
const armyReducer = (
  state: ArmyProviderState,
  action: ArmyActions
): ArmyProviderState => {
  const { type, payload } = action;

  switch (type) {
    case armyActions.SET_ARMY:
      return {
        ...state,
        army: payload as ArmyInterface,
      };
    default:
      return state;
  }
};

export { armyReducer, armyActions, initialState };
