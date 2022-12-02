import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import { ArmyInitialState } from "../contexts/armyContext";

enum armyActions {
  SET_ARMY = "SET_ARMY",
}

interface ArmyActions {
  type: armyActions;
  payload?: UnitDetails<Unit>[] | UnitDetails<Unit> | ArmyInterface;
}

//Reducer to Handle Actions
const armyReducer = (
  state: ArmyInitialState,
  action: ArmyActions
): ArmyInitialState => {
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

export { armyReducer, armyActions };
