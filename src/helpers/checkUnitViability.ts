import { Unit, UnitDetails } from "../ArmyUnitTypes";
import { errorMessages } from "../data/errorMessages";

const checkUnitViability = (
  unit: UnitDetails<Unit>,
  units: UnitDetails<Unit>[],
  currentPoints: number
): string | boolean => {
  const rules = unit.rules || {};
  let error = "";
  Object.entries(rules).forEach(([ruleName, rule]) => {
    if (rule(units)) {
      // @ts-ignore
      error = errorMessages[ruleName];
    }
  });

  if (error) return error;

  if (currentPoints - (unit.cost?.points || 0) < 0) {
    return errorMessages.insufficientPoints;
  }

  return true;
};

export { checkUnitViability };
