import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import { UnitProviderState } from "../contexts/unitContext";
import { addToLocalStorage, LocalstorageKeys } from "../helpers/localstorage";

enum unitActions {
  SET_INITIAL_UNITS = "SET_INITIAL_UNITS",
  ADD_UNIT = "ADD_UNIT",
  REMOVE_UNIT = "REMOVE_UNIT",
  RESET_UNITS = "RESET_UNITS",
}

interface ArmyActions {
  type: unitActions;
  payload?: UnitDetails<Unit>[] | UnitDetails<Unit> | ArmyInterface;
}

const initialUnitsState: UnitProviderState = {
  units: [],
  setInitialUnits: (units: UnitDetails<Unit>[]) => {},
  addUnit: (unit: UnitDetails<Unit>) => {},
  removeUnit: (unit: UnitDetails<Unit>) => {},
  resetUnits: () => {},
};

//Reducer to Handle Actions
const unitReducer = (
  state: UnitProviderState,
  action: ArmyActions
): UnitProviderState => {
  const { type, payload } = action;

  switch (type) {
    case unitActions.SET_INITIAL_UNITS:
      addToLocalStorage(LocalstorageKeys.units, JSON.stringify(payload));
      return {
        ...state,
        units: payload as UnitDetails<Unit>[],
      };
    case unitActions.ADD_UNIT: {
      addToLocalStorage(
        LocalstorageKeys.units,
        JSON.stringify([...state.units, payload])
      );
      return {
        ...state,
        units: [...state.units, payload as UnitDetails<Unit>],
      };
    }
    case unitActions.REMOVE_UNIT: {
      const unitsInitialCopy = [...state.units];
      const indexOfUnitToRemove = unitsInitialCopy.findIndex(
        ({ unit, equipmentOptions, unitPaidFor }) => {
          if ("unitPaidFor" in (payload as UnitDetails<Unit>)) {
            return (payload as UnitDetails<Unit>).unitPaidFor === unitPaidFor;
          }

          return (
            (payload as UnitDetails<Unit>).unit === unit &&
            (payload as UnitDetails<Unit>).equipmentOptions === equipmentOptions
          );
        }
      );

      delete unitsInitialCopy[indexOfUnitToRemove];
      addToLocalStorage(
        LocalstorageKeys.units,
        JSON.stringify(unitsInitialCopy.filter(Boolean))
      );

      return {
        ...state,
        units: unitsInitialCopy.filter(Boolean),
      };
    }
    case unitActions.RESET_UNITS: {
      addToLocalStorage(LocalstorageKeys.units, "");
      return initialUnitsState;
    }
    default:
      return state;
  }
};

export { unitReducer, unitActions, initialUnitsState };
