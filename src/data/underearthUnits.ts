import { ArmyInterface } from "../ArmyUnitTypes";
import {
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
        createMonster("Behemoth"),
        createMonster("Titan"),
        createMonster("ScourgeFlight"),
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
        createWarriors("Crossbow"),
        // createWarriors("Firearm"),
      ],
    },
    {
      unitName: "Levies",
      variants: [createLevies("None"), createLevies("Bow")],
    },
    {
      unitName: "War Machines",
      variants: [
        createWarMachine("Static"),
        createWarMachine("Mobile"),
        createWarMachine("Flying"),
      ],
    },
    // {
    //   unitName: "Destruction Team",
    //   variants: [
    //     createDestructionTeam("None"),
    //   ],
    // },
  ],
};

export { underearthUnits };
