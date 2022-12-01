import { ArmyInterface } from "../ArmyUnitTypes";
import {
  createCreatures,
  createCreatureWithUnits,
  createHearthguards,
  createLieutenant,
  createMonster,
  createSorcerer,
  createWarlord,
  createWarriors,
} from "./baseUnits";

const otherworldUnits: ArmyInterface = {
  name: "Otherworld",
  units: [
    {
      unitName: "Warlord",
      variants: [
        createWarlord("None"),
        createWarlord("HeavyWeapon"),
        // createWarlord("Winged"),
        createWarlord("MountBeast"),
        createWarlord("MountFlyingBeast"),
      ],
    },
    {
      unitName: "Lieutenant",
      variants: [
        createLieutenant("None"),
        // createLieutenant("Winged"),
      ],
    },
    {
      unitName: "Sorcerer",
      variants: [
        createSorcerer("None"),
        // createSorcerer("Winged"),
      ],
    },
    {
      unitName: "Monsters",
      variants: [createMonster("Behemoth"), createMonster("ScourgeFlight")],
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
        // createHearthguards("Winged"),
      ],
    },
    {
      unitName: "Warriors",
      variants: [
        createWarriors("None"),
        createWarriors("HeavyWeapon"),
        // createWarriors("Winged"),
        // createWarriors("Hunters"),
      ],
    },
  ],
};

export { otherworldUnits };
