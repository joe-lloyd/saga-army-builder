import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import {
  createCreatures,
  createHearthguards,
  createLieutenant,
  createMonster,
  createSorcerer,
  createWarlord,
  createWarriors,
} from "./baseUnits";

const addWings = (baseUnit: UnitDetails<Unit>): UnitDetails<Unit> => {
  return {
    ...baseUnit,
    equipmentOptions: "Winged",
    armour: {
      ...baseUnit.armour,
      shooting: baseUnit.armour.shooting - 1,
    },
  };
};

const createHunters = (): UnitDetails<Unit> => {
  return {
    unit: "Hunters",
    unitSize: 12,
    equipmentOptions: "None",
    armour: {
      melee: 3,
      shooting: 3,
    },
    aggression: {
      melee: 1,
      shooting: 0,
    },
    specialRules: ["Hunt", "Primitive", "Cannot close ranks"],
    cost: {
      points: 1,
    },
    rules: {
      onlyHalfOfYourWarriorsCanBeHunters:
        rules.onlyHalfOfYourWarriorsCanBeHunters,
    },
  };
};

const createOtherworldMonster = (
  equipmentOptions: "Behemoth" | "ScourgeFlight"
) => {
  const creatures = createMonster(equipmentOptions);

  return {
    ...creatures,
    rules: { onlyThreeMonsters: rules.onlyThreeMonsters },
  };
};

const createOtherworldCreatures = (
  equipmentOptions: "Biped" | "Quadruped" | "Flyers"
) => {
  const creatures = createCreatures(equipmentOptions);

  return {
    ...creatures,
    rules: { onlyTwoCreatures: rules.onlyTwoCreatures },
  };
};

const rules = {
  onlyHalfOfYourWarriorsCanBeHunters: (units: UnitDetails<Unit>[]): boolean => {
    const hunterCount = units.filter(({ unit }) => unit === "Hunters").length;
    const warriorCount = units.filter(({ unit }) => unit === "Warriors").length;
    return warriorCount <= hunterCount;
  },
  onlyThreeMonsters: (units: UnitDetails<Unit>[]): boolean => {
    const { length } = units.filter(({ unit }) => {
      return unit === "Monsters";
    });
    return 3 <= length;
  },
  onlyTwoCreatures: (units: UnitDetails<Unit>[]): boolean => {
    const { length } = units.filter(({ unit }) => {
      return unit === "Creatures";
    });
    return 2 <= length;
  },
};

const otherworldUnits: ArmyInterface = {
  name: "Otherworld",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("HeavyWeapon"),
        addWings(createWarlord("None")),
        createWarlord("MountBeast"),
        createWarlord("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [createLieutenant("None"), addWings(createLieutenant("None"))],
    },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None"), addWings(createSorcerer("None"))],
    },
    {
      unitName: "Monsters",
      variants: [
        createOtherworldMonster("Behemoth"),
        createOtherworldMonster("ScourgeFlight"),
      ],
    },
    {
      unitName: "Creatures",
      variants: [
        createOtherworldCreatures("Biped"),
        createOtherworldCreatures("Quadruped"),
        createOtherworldCreatures("Flyers"),
      ],
    },
    {
      unitName: "Hearthguards",
      variants: [
        createHearthguards("None"),
        createHearthguards("HeavyWeapon"),
        addWings(createHearthguards("None")),
      ],
    },
    {
      unitName: "Warriors",
      variants: [
        createWarriors("None"),
        createWarriors("HeavyWeapon"),
        addWings(createWarriors("None")),
      ],
    },
    {
      unitName: "Hunters",
      variants: [createHunters()],
    },
  ],
};

export { otherworldUnits };
