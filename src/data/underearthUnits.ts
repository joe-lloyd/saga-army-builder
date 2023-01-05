import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import {
  baseOrSharedRules,
  createCreatures,
  createHearthguards,
  createLevies,
  createLieutenant,
  createMonster,
  createSorcerer,
  createWarlord,
  createWarMachine,
  createWarriors,
} from "./baseUnits";

const createUnderearthMonster = (
  equipmentOptions: "Behemoth" | "Titan" | "ScourgeFlight"
): UnitDetails<Unit> => {
  const monster = createMonster(equipmentOptions);
  return {
    ...monster,
    rules: { onlyOneMonster: baseOrSharedRules.onlyOneMonster },
  };
};

const createUnderearthCreature = (
  equipmentOptions: "Biped" | "Quadruped"
): UnitDetails<Unit> => {
  const creature = createCreatures(equipmentOptions);
  return {
    ...creature,
    rules: { onlyOneUnitOfCreatures: baseOrSharedRules.onlyOneUnitOfCreatures },
  };
};

const createUnderearthWarMachine = (
  equipmentOptions: "Static" | "Mobile" | "Flying"
): UnitDetails<Unit> => {
  const warMachine = createWarMachine(equipmentOptions);
  return {
    ...warMachine,
    rules: { onlyTwoWarMachines: rules.onlyTwoWarMachines },
  };
};

const createWarriorsWithFirearms = (): UnitDetails<Unit> => {
  const warriors = createWarriors("Crossbow");
  return {
    ...warriors,
    equipmentOptions: "Firearms",
  };
};

const createDestructionTeam = (): UnitDetails<Unit> => {
  return {
    unit: "Destruction Team",
    unitSize: 1,
    equipmentOptions: "None",
    armour: {
      melee: 3,
      shooting: 4,
    },
    aggression: {
      melee: 1,
      shooting: 3,
    },
    specialRules: ["Firearms", "Resilience(1)", "Unstable and Dangerous"],
    cost: {
      units: {
        Warriors: 2,
      },
    },
    rules: {
      onlyTwoDestructionTeams: rules.onlyTwoDestructionTeams,
    },
  };
};

const rules = {
  onlyTwoWarMachines: (units: UnitDetails<Unit>[]): boolean => {
    const { length } = units.filter(({ unit }) => {
      return unit === "War Machines";
    });
    return 2 <= length;
  },
  onlyTwoDestructionTeams: (units: UnitDetails<Unit>[]): boolean => {
    const { length } = units.filter(({ unit }) => {
      return unit === "Destruction Team";
    });
    return 2 <= length;
  },
};

const underearthUnits: ArmyInterface = {
  name: "Underearth",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("HeavyWeapon"),
        createWarlord("MountBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [createLieutenant("None")],
    },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None")],
    },
    {
      unitName: "Monsters",
      variants: [
        createUnderearthMonster("Behemoth"),
        createUnderearthMonster("Titan"),
        createUnderearthMonster("ScourgeFlight"),
      ],
    },
    {
      unitName: "Creatures",
      variants: [
        createUnderearthCreature("Biped"),
        createUnderearthCreature("Quadruped"),
      ],
    },
    {
      unitName: "Hearthguards",
      variants: [
        createHearthguards("None"),
        createHearthguards("HeavyWeapon"),
        createHearthguards("MountedAnimal"),
      ],
    },
    {
      unitName: "Warriors",
      variants: [
        createWarriors("None"),
        createWarriors("HeavyWeapon"),
        createWarriors("Crossbow"),
        createWarriorsWithFirearms(),
      ],
    },
    {
      unitName: "Levies",
      variants: [createLevies("None"), createLevies("Bow")],
    },
    {
      unitName: "War Machines",
      variants: [
        createUnderearthWarMachine("Static"),
        createUnderearthWarMachine("Mobile"),
        createUnderearthWarMachine("Flying"),
      ],
    },
    {
      unitName: "Destruction Team",
      variants: [createDestructionTeam()],
    },
  ],
};

export { underearthUnits };
