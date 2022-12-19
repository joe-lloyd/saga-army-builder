import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import {
  baseOrSharedRules,
  createCreatures,
  createCreatureWithUnits,
  createHearthguards,
  createLevies,
  createLieutenant,
  createMonster,
  createSorcerer,
  createWarlord,
  createWarMachine,
  createWarriors,
} from "./baseUnits";

const createHordeMonster = (
  equipmentOptions: "Behemoth" | "Titan" | "ScourgeFlight"
): UnitDetails<Unit> => {
  const monster = createMonster(equipmentOptions);
  return {
    ...monster,
    rules: { onlyOneMonster: baseOrSharedRules.onlyOneMonster },
  };
};

const createChampion = (
  equipmentOptions: "None" | "HeavyWeapon" | "MountAnimal"
): UnitDetails<Unit> => {
  const champion = createLieutenant(equipmentOptions);

  return {
    ...champion,
    specialRules: [...champion.specialRules, "Pride"],
  };
};

const createWarChariot = (): UnitDetails<Unit> => {
  return {
    unit: "WarChariot",
    unitSize: 1,
    equipmentOptions: "Javelins",
    armour: {
      melee: 5,
      shooting: 5,
    },
    aggression: {
      melee: 4,
      shooting: 2,
    },
    specialRules: [
      "Devastating Charge",
      "Javelins",
      "MountAnimal",
      "Presence",
      "Resilience(1)",
    ],
    cost: {
      points: 1,
    },
    rules: {
      onlyTwoWarChariots: rules.onlyTwoWarChariots,
    },
  };
};

const rules = {
  onlyTwoWarChariots: (units: UnitDetails<Unit>[]): boolean => {
    const { length } = units.filter(({ unit }) => {
      return unit === "WarChariot";
    });
    return 2 <= length;
  },
};

const hordeUnits: ArmyInterface = {
  name: "Horde",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("HeavyWeapon"),
        createWarlord("MountAnimal"),
        createWarlord("MountBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [
        createChampion("None"),
        createChampion("HeavyWeapon"),
        createChampion("MountAnimal"),
      ],
    },
    {
      unitName: "WarChariot",
      variants: [createWarChariot()],
    },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None"), createSorcerer("MountAnimal")],
    },
    {
      unitName: "Monsters",
      variants: [
        createHordeMonster("Behemoth"),
        createHordeMonster("Titan"),
        createHordeMonster("ScourgeFlight"),
      ],
    },
    {
      unitName: "Creatures",
      variants: [
        createCreatures("Biped"),
        createCreatureWithUnits("Biped"),
        createCreatures("Quadruped"),
        createCreatureWithUnits("Quadruped"),
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
        createWarriors("MountedAnimal"),
        createWarriors("MountedAnimalCompositeBow"),
      ],
    },
    {
      unitName: "Levies",
      variants: [createLevies("Bow")],
    },
    {
      unitName: "War Machines",
      variants: [createWarMachine("Static"), createWarMachine("Mobile")],
    },
  ],
};

export { hordeUnits };
