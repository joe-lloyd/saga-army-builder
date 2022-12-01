import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import { UnitProviderState } from "../contexts/unitContext";

enum unitActions {
  SET_INITIAL_UNITS = "SET_INITIAL_UNITS",
  ADD_UNIT = "ADD_UNIT",
  REMOVE_UNIT = "REMOVE_UNIT",
}

interface ArmyActions {
  type: unitActions;
  payload?: UnitDetails<Unit>[] | UnitDetails<Unit> | ArmyInterface;
}

const initialState: UnitProviderState = {
  units: [],
  setInitialUnits: (units: UnitDetails<Unit>[]) => {},
  addUnit: (unit: UnitDetails<Unit>) => {},
  removeUnit: (unit: UnitDetails<Unit>) => {},
};

//Reducer to Handle Actions
const unitReducer = (
  state: UnitProviderState,
  action: ArmyActions
): UnitProviderState => {
  const { type, payload } = action;

  switch (type) {
    case unitActions.SET_INITIAL_UNITS:
      return {
        ...state,
        units: payload as UnitDetails<Unit>[],
      };
    case unitActions.ADD_UNIT: {
      return {
        ...state,
        units: [...state.units, payload as UnitDetails<Unit>],
      };
    }
    case unitActions.REMOVE_UNIT: {
      const unitsInitialCopy = [...state.units];
      const indexOfUnitToRemove = unitsInitialCopy.findIndex(
        ({ unit, equipmentOptions }) =>
          (payload as UnitDetails<Unit>).unit === unit &&
          (payload as UnitDetails<Unit>).equipmentOptions === equipmentOptions
      );

      delete unitsInitialCopy[indexOfUnitToRemove];

      return {
        ...state,
        units: unitsInitialCopy.filter(Boolean),
      };
    }
    default:
      return state;
  }
};

export { unitReducer, unitActions, initialState };
