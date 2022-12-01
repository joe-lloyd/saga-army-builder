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
  createWarriors,
} from "./baseUnits";

const wildUnits: ArmyInterface = {
  name: "Wild",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("Bow"),
        createWarlord("MountAnimal"),
        createWarlord("MountAnimalCompositeBow"),
        createWarlord("MountBeast"),
        createWarlord("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [createLieutenant("None"), createLieutenant("Bow")],
    },
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
      variants: [
        createLevies("Javelins"),
        // createLevies("Swarm"),
      ],
    },
  ],
};

export { wildUnits };
