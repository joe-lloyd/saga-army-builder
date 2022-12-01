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

const kingdomUnits: ArmyInterface = {
  name: "Kingdoms",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("HeavyWeapon"),
        createWarlord("MountAnimal"),
        // createWarlord("WingedMount"),
        createWarlord("MountBeast"),
        createWarlord("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [
        createLieutenant("None"),
        createLieutenant("HeavyWeapon"),
        createLieutenant("MountAnimal"),
        // createLieutenant("WingedMount"),
      ],
    },
    // {
    //   unitName: "Paladin",
    //   variants: [createPaladin("None")],
    // },
    {
      unitName: "Sorcerer",
      variants: [
        createSorcerer("None"),
        createSorcerer("MountAnimal"),
        // createSorcerer("Winged Mount")
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
        // createHearthguards("WingedMount"),
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
