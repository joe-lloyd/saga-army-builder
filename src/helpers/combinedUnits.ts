import { Unit, UnitDetails } from "../ArmyUnitTypes";

const combinedUnits = (
  units: UnitDetails<Unit>[]
): { [key: string]: UnitDetails<Unit> } => {
  return units.reduce((acc, unit) => {
    const unitKey = `${unit.unit}-${unit.equipmentOptions}`;
    // @ts-ignore
    if (!!acc[unitKey]) {
      // @ts-ignore
      acc[unitKey] = {
        // @ts-ignore
        ...acc[unitKey],
        // @ts-ignore
        unitSize: acc[unitKey].unitSize + unit.unitSize,
      };
    }

    // @ts-ignore
    acc[unitKey] ??= { ...unit };

    return acc;
  }, {});
};

export { combinedUnits };
