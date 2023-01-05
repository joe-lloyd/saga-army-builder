import { ArmyInterface, Unit, UnitDetails } from "../ArmyUnitTypes";
import {
  createCreatures,
  createCreatureWithUnits,
  createHearthguards,
  createLevies,
  createLieutenant,
  createMonster,
  createSorcerer,
  createWarlord,
  createWarriors,
} from "./baseUnits";

const createRanger = (equipmentOptions: "None" | "Bow") => {
  const ranger = createLieutenant(equipmentOptions);

  return {
    ...ranger,
    specialRules: [...ranger.specialRules, "Ranger"],
  };
};

const createWildMonster = (
  equipmentOptions: "Behemoth" | "Titan" | "ScourgeFlight"
) => {
  const monster = createMonster(equipmentOptions);

  return {
    ...monster,
    rules: { onlyTwoMonsters: rules.onlyTwoMonsters },
  };
};

const createSwarm = (): UnitDetails<Unit> => {
  return {
    unit: "Swarm",
    unitSize: 12,
    equipmentOptions: "None",
    armour: {
      melee: 4,
      shooting: 3,
    },
    aggression: {
      melee: 0.5,
      shooting: 0,
    },
    specialRules: ["Insignificant", "Primitive", "Tiny"],
    cost: {
      units: {
        Levies: 12,
      },
    },
    rules: { onlyOneSwarm: rules.onlyOneSwarm },
  };
};

const rules = {
  onlyOneSwarm: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Swarm";
    });
  },
  onlyTwoMonsters: (units: UnitDetails<Unit>[]): boolean => {
    const { length } = units.filter(({ unit }) => {
      return unit === "Monsters";
    });
    return 2 <= length;
  },
};

const wildUnits: ArmyInterface = {
  name: "Wild",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("Bow"),
        createWarlord("MountedAnimal"),
        createWarlord("MountedAnimalCompositeBow"),
        createWarlord("MountBeast"),
        createWarlord("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [createRanger("None"), createRanger("Bow")],
    },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None"), createSorcerer("MountedAnimal")],
    },
    {
      unitName: "Monsters",
      variants: [
        createWildMonster("Behemoth"),
        createWildMonster("Titan"),
        createWildMonster("ScourgeFlight"),
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
        createHearthguards("Bow"),
        createHearthguards("HeavyWeapon"),
        createHearthguards("MountedAnimal"),
        createHearthguards("MountedAnimalCompositeBow"),
      ],
    },
    {
      unitName: "Warriors",
      variants: [
        createWarriors("None"),
        createWarriors("Bow"),
        createWarriors("MountedAnimal"),
        createWarriors("MountedAnimalCompositeBow"),
      ],
    },
    {
      unitName: "Levies",
      variants: [createLevies("Javelins")],
    },
    {
      unitName: "Swarm",
      variants: [createSwarm()],
    },
  ],
};

export { wildUnits };
