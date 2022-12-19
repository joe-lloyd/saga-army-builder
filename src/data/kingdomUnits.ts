import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import {
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

const createKingdomsWarlord = (
  equipmentOptions:
    | "None"
    | "HeavyWeapon"
    | "MountAnimal"
    | "WingedMount"
    | "MountBeast"
    | "MountFlyingBeast"
): UnitDetails<Unit> => {
  let warlord;
  if (equipmentOptions === "WingedMount") {
    warlord = {
      ...createWarlord("MountAnimal"),
      equipmentOptions: "WingedMount",
    };
  } else {
    warlord = createWarlord(equipmentOptions);
  }

  return warlord;
};

const createCaptain = (
  equipmentOptions: "None" | "HeavyWeapon" | "MountAnimal" | "WingedMount"
): UnitDetails<Unit> => {
  let lieutenant;
  if (equipmentOptions === "WingedMount") {
    lieutenant = {
      ...createLieutenant("MountAnimal"),
      equipmentOptions: "WingedMount",
    };
  } else {
    lieutenant = createLieutenant(equipmentOptions);
  }

  return {
    ...lieutenant,
    specialRules: [...lieutenant.specialRules, "Captain"],
  };
};

const createPaladin = (
  equipmentOptions: "None" | "HeavyWeapon" | "MountAnimal" | "WingedMount"
): UnitDetails<Unit> => {
  return {
    unit: "Paladin",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: {
        None: 5,
        HeavyWeapon: 4,
        MountAnimal: 5,
        WingedMount: 5,
      }[equipmentOptions],
      shooting: {
        None: 5,
        HeavyWeapon: 5,
        MountAnimal: 4,
        WingedMount: 4,
      }[equipmentOptions],
    },
    aggression: {
      melee: 5,
      shooting: 0,
    },
    specialRules: ["Determination", "Heroic Presence", "Resilience(1)"],
    cost: {
      units: {
        Hearthguards: 2,
        Warriors: 4,
        Levies: 6,
      },
    },
  };
};

const createKingdomsSorcerer = (
  equipmentOptions: "None" | "MountAnimal" | "WingedMount"
): UnitDetails<Unit> => {
  let warlord;
  if (equipmentOptions === "WingedMount") {
    warlord = {
      ...createSorcerer("MountAnimal"),
      equipmentOptions: "WingedMount",
    };
  } else {
    warlord = createSorcerer(equipmentOptions);
  }

  return warlord;
};

const createKingdomsHearthguards = (
  equipmentOptions: "None" | "HeavyWeapon" | "MountedAnimal" | "WingedMount"
): UnitDetails<Unit> => {
  let warlord;
  if (equipmentOptions === "WingedMount") {
    warlord = {
      ...createHearthguards("MountedAnimal"),
      equipmentOptions: "WingedMount",
    };
  } else {
    warlord = createHearthguards(equipmentOptions);
  }

  return warlord;
};

const createKingdomsCreature = (
  equipmentOptions: "Biped" | "Quadruped"
): UnitDetails<Unit> => {
  const creature = createCreatures(equipmentOptions);
  return {
    ...creature,
    rules: { onlyOneUnitOfCreatures: rules.onlyOneUnitOfCreatures },
  };
};

const rules = {
  onlyOneUnitOfCreatures: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Creatures";
    });
  },
};

const kingdomUnits: ArmyInterface = {
  name: "Kingdoms",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createKingdomsWarlord("None"),
        createKingdomsWarlord("HeavyWeapon"),
        createKingdomsWarlord("MountAnimal"),
        createKingdomsWarlord("WingedMount"),
        createKingdomsWarlord("MountBeast"),
        createKingdomsWarlord("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [
        createCaptain("None"),
        createCaptain("HeavyWeapon"),
        createCaptain("MountAnimal"),
        createCaptain("WingedMount"),
      ],
    },
    {
      unitName: "Paladin",
      variants: [
        createPaladin("None"),
        createPaladin("HeavyWeapon"),
        createPaladin("MountAnimal"),
        createPaladin("WingedMount"),
      ],
    },
    {
      unitName: "Sorcerer",
      variants: [
        createKingdomsSorcerer("None"),
        createKingdomsSorcerer("MountAnimal"),
        createKingdomsSorcerer("WingedMount"),
      ],
    },
    {
      unitName: "Monsters",
      variants: [
        createMonster("Behemoth"),
        createMonster("Titan"),
        createMonster("ScourgeFlight"),
      ],
    },
    {
      unitName: "Creatures",
      variants: [
        createKingdomsCreature("Biped"),
        createKingdomsCreature("Quadruped"),
      ],
    },
    {
      unitName: "Hearthguards",
      variants: [
        createKingdomsHearthguards("None"),
        createKingdomsHearthguards("HeavyWeapon"),
        createKingdomsHearthguards("MountedAnimal"),
        createKingdomsHearthguards("WingedMount"),
      ],
    },
    {
      unitName: "Warriors",
      variants: [createWarriors("None"), createWarriors("MountedAnimal")],
    },
    {
      unitName: "Levies",
      variants: [
        createLevies("Bow"),
        createLevies("Crossbow"),
        createLevies("Firearms"),
      ],
    },
    {
      unitName: "War Machines",
      variants: [
        createWarMachine("Static"),
        createWarMachine("Mobile"),
        createWarMachine("Flying"),
      ],
    },
  ],
};

export { kingdomUnits };
