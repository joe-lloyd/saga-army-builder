import { Unit, UnitDetails, UnitsToSpend } from "../ArmyUnitTypes";
import { errorMessages } from "../data/errorMessages";

const checkUnitPassesRules = (
  unit: UnitDetails<Unit>,
  units: UnitDetails<Unit>[]
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

  return true;
};

const checkUnitCanBeBoughtWithUnitToTrade = (
  unit: UnitDetails<Unit>,
  unitToTrade: UnitDetails<Unit>
): string | boolean => {
  const unitToTradeName = unitToTrade.unit as keyof UnitsToSpend;
  const costWithUnit = (unit.cost.units as UnitsToSpend)[unitToTradeName];

  if (typeof costWithUnit === "undefined") {
    return `unit ${unit.unit}: ${errorMessages.costOfUnitUndefined}`;
  }

  if (unitToTrade.unitSize < costWithUnit) {
    return errorMessages.insufficientUnits;
  }

  return true;
};

const checkUnitCanBeBoughtWithAnyUnitInCurrentArmy = (
  unit: UnitDetails<Unit>,
  unitsToTrade: UnitDetails<Unit>[]
): boolean =>
  unitsToTrade.some((unitToTrade) =>
    Object.keys(unit.cost.units as UnitsToSpend).find(
      (unitName) => unitName === unitToTrade.unit
    )
  );

const checkUnitIsWithinPriceRange = (
  unit: UnitDetails<Unit>,
  currentPoints: number
): string | boolean => {
  if (currentPoints - (unit.cost?.points || 0) < 0) {
    return errorMessages.insufficientPoints;
  }

  return true;
};

const checkUnitViabilityPoints = (
  unit: UnitDetails<Unit>,
  units: UnitDetails<Unit>[],
  currentPoints: number
): string | boolean => {
  let viabilityResult: string | boolean;

  viabilityResult = checkUnitPassesRules(unit, units);

  if (typeof viabilityResult === "string") {
    return viabilityResult;
  }

  viabilityResult = checkUnitIsWithinPriceRange(unit, currentPoints);

  return viabilityResult;
};

const checkUnitViabilityUnits = (
  unit: UnitDetails<Unit>,
  units: UnitDetails<Unit>[],
  unitToTrade: UnitDetails<Unit>
): string | boolean => {
  let viabilityResult: string | boolean;

  viabilityResult = checkUnitPassesRules(unit, units);

  if (typeof viabilityResult === "string") {
    return viabilityResult;
  }

  viabilityResult = checkUnitCanBeBoughtWithUnitToTrade(unit, unitToTrade);

  return viabilityResult;
};

export {
  checkUnitViabilityPoints,
  checkUnitViabilityUnits,
  checkUnitCanBeBoughtWithAnyUnitInCurrentArmy,
};
