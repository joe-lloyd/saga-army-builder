import { ArmyInterface, UnitDetails, Unit } from "../ArmyUnitTypes";
import {
  baseOrSharedRules,
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
  equipmentOptions: "None" | "MountedAnimal" | "MountBeast" | "MountFlyingBeast"
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
        MountedAnimal: 3,
        MountBeast: 4,
        MountFlyingBeast: 3,
      }[equipmentOptions],
    },
    aggression: {
      melee: {
        None: 2,
        MountedAnimal: 2,
        MountBeast: 4,
        MountFlyingBeast: 4,
      }[equipmentOptions],
      shooting: 0,
    },
    specialRules: {
      None: specialRules,
      MountedAnimal: specialRules,
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
    equipmentOptions: "None",
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
    rules: {
      onlyHalfOfYourPointsCanBeSpentOnMindless:
        rules.onlyHalfOfYourPointsCanBeSpentOnMindless,
    },
  };
};

const createWarlordWithUndeadRules = (
  equipmentOptions:
    | "None"
    | "HeavyWeapon"
    | "Bow"
    | "MountedAnimal"
    | "Flying"
    | "MountedAnimalCompositeBow"
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
  const monster = createMonster(equipmentOptions);
  return {
    ...monster,
    rules: { onlyOneMonster: baseOrSharedRules.onlyOneMonster },
  };
};

const createUndeadWarMachine = (): UnitDetails<Unit> => {
  const warMachine = createWarMachine("Static");

  return {
    ...warMachine,
    cost: {
      units: {
        Warriors: 4,
      },
    },
  };
};

const rules = {
  onlyOneWarlordOrNecromancer: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(
      ({ unit }) => unit === "Warlord" || unit === "Necromancer"
    );
  },
  onlyHalfOfYourPointsCanBeSpentOnMindless: (
    units: UnitDetails<Unit>[]
  ): boolean => {
    // since cost of mindless is 1 then we can use length here.
    const pointsSpentOnMindless = units.filter(
      ({ unit }) => unit === "Mindless"
    ).length;

    const pointsSpentOnArmy = units
      .filter(({ unit }) => unit !== "Mindless")
      .reduce((acc, unit) => {
        if (typeof unit.cost.points === "number") {
          return acc + unit.cost.points;
        }
        return acc;
      }, 0);
    return pointsSpentOnArmy <= pointsSpentOnMindless;
  },
};

const undeadUnits: ArmyInterface = {
  name: "Undead",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlordWithUndeadRules("None"),
        createWarlordWithUndeadRules("MountedAnimal"),
        createWarlordWithUndeadRules("MountBeast"),
        createWarlordWithUndeadRules("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Necromancer",
      variants: [
        createNecromancer("None"),
        createNecromancer("MountedAnimal"),
        createNecromancer("MountBeast"),
        createNecromancer("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [createLieutenant("None"), createLieutenant("MountedAnimal")],
    },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None"), createSorcerer("MountedAnimal")],
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
      variants: [createUndeadWarMachine()],
    },
  ],
};

export { undeadUnits };
