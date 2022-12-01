import { ArmyInterface, UnitDetails, Unit } from "../ArmyUnitTypes";
import {
  createCreatures,
  createCreatureWithUnits,
  createHearthguards,
  createLieutenant,
  createMonster,
  createSorcerer,
  createWarlord,
  createWarMachine,
  createWarriors,
} from "./baseUnits";

const createNecromancer = (
  equipmentOptions: "None" | "MountAnimal" | "MountBeast" | "MountFlyingBeast"
): UnitDetails<Unit> => {
  const specialRules = [
    "Bodyguards",
    "Determination",
    "Magic",
    "Presence",
    "Resilience(1)",
    "We Obey",
  ];
  const beastSpecialRules = [
    "Determination",
    "Imposing",
    "Magic",
    "Presence",
    "Resilience(2)",
  ];
  return {
    unit: "Necromancer",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: 4,
      shooting: {
        None: 4,
        MountAnimal: 3,
        MountBeast: 4,
        MountFlyingBeast: 3,
      }[equipmentOptions],
    },
    aggression: {
      melee: {
        None: 2,
        MountAnimal: 2,
        MountBeast: 4,
        MountFlyingBeast: 4,
      }[equipmentOptions],
      shooting: 0,
    },
    specialRules: {
      None: specialRules,
      MountAnimal: specialRules,
      MountBeast: beastSpecialRules,
      MountFlyingBeast: beastSpecialRules,
    }[equipmentOptions],
    cost: {
      points: 0,
    },
    rules: { onlyOneWarlordOrNecromancer: rules.onlyOneWarlordOrNecromancer },
  };
};

const createMindless = (): UnitDetails<Unit> => {
  return {
    unit: "Mindless",
    unitSize: 20,
    equipmentOptions: "none",
    armour: {
      melee: 4,
      shooting: 4,
    },
    aggression: {
      melee: 0.2,
      shooting: 0,
    },
    specialRules: ["Horde", "Mindless", "Slow"],
    cost: {
      points: 1,
    },
  };
};

const createWarlordWithUndeadRules = (
  equipmentOptions:
    | "None"
    | "HeavyWeapon"
    | "Bow"
    | "MountAnimal"
    | "Flying"
    | "MountAnimalCompositeBow"
    | "MountBeast"
    | "MountFlyingBeast"
): UnitDetails<Unit> => {
  const warlord = createWarlord(equipmentOptions);
  return {
    ...warlord,
    rules: { onlyOneWarlordOrNecromancer: rules.onlyOneWarlordOrNecromancer },
  };
};

const createMonsterWithUndeadRules = (
  equipmentOptions: "Behemoth" | "Titan" | "ScourgeFlight"
): UnitDetails<Unit> => {
  const warlord = createMonster(equipmentOptions);
  return {
    ...warlord,
    rules: { onlyOneMonster: rules.onlyOneMonster },
  };
};

const rules = {
  onlyOneMonster: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Monsters";
    });
  },
  onlyOneWarlordOrNecromancer: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(
      ({ unit }) => unit === "Warlord" || unit === "Necromancer"
    );
  },
};

const undeadUnits: ArmyInterface = {
  name: "Undead",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlordWithUndeadRules("None"),
        createWarlordWithUndeadRules("MountAnimal"),
        createWarlordWithUndeadRules("MountBeast"),
        createWarlordWithUndeadRules("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Necromancer",
      variants: [
        createNecromancer("None"),
        createNecromancer("MountAnimal"),
        createNecromancer("MountBeast"),
        createNecromancer("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [createLieutenant("None"), createLieutenant("MountAnimal")],
    },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None"), createSorcerer("MountAnimal")],
    },
    {
      unitName: "Monsters",
      variants: [
        createMonsterWithUndeadRules("Behemoth"),
        createMonsterWithUndeadRules("Titan"),
        createMonsterWithUndeadRules("ScourgeFlight"),
      ],
    },
    {
      unitName: "Creatures",
      variants: [
        createCreatures("Biped"),
        createCreatureWithUnits("Biped"),
        createCreatures("Quadruped"),
        createCreatureWithUnits("Quadruped"),
        createCreatures("Flyers"),
        createCreatureWithUnits("Flyers"),
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
      variants: [createWarriors("None"), createWarriors("Bow")],
    },
    {
      unitName: "Mindless",
      variants: [createMindless()],
    },
    {
      unitName: "War Machines",
      variants: [createWarMachine("Static")],
    },
  ],
};

export { undeadUnits };
