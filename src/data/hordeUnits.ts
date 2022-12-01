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
        createLieutenant("None"),
        createLieutenant("HeavyWeapon"),
        createLieutenant("MountAnimal"),
      ],
    },
    // {
    //   unitName: "WarChariot",
    //   variants: [createWarChariot("Javelins")],
    // },
    {
      unitName: "Sorcerer",
      variants: [createSorcerer("None"), createSorcerer("MountAnimal")],
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
