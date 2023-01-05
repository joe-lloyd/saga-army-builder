import { UnitDetails, Unit } from "../ArmyUnitTypes";

const createWarlord = (
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
  const specialRules = [
    "Bodyguards",
    "Determination",
    "Presence",
    "Pride",
    "Resilience(1)",
    "We Obey",
  ];
  const beastSpecialRules = [
    "Determination",
    "Imposing",
    "Presence",
    "Pride",
    "Resilience(2)",
  ];
  return {
    unit: "Warlord",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: {
        None: 5,
        HeavyWeapon: 4,
        Bow: 4,
        MountedAnimal: 5,
        Flying: 5,
        MountedAnimalCompositeBow: 4,
        MountBeast: 5,
        MountFlyingBeast: 5,
      }[equipmentOptions],
      shooting: {
        None: 5,
        HeavyWeapon: 5,
        Bow: 4,
        MountedAnimal: 4,
        Flying: 4,
        MountedAnimalCompositeBow: 4,
        MountBeast: 5,
        MountFlyingBeast: 4,
      }[equipmentOptions],
    },
    aggression: {
      melee: {
        None: 8,
        HeavyWeapon: 8,
        Bow: 8,
        MountedAnimal: 8,
        Flying: 8,
        MountedAnimalCompositeBow: 8,
        MountBeast: 10,
        MountFlyingBeast: 10,
      }[equipmentOptions],
      shooting: 4,
    },
    specialRules: {
      None: specialRules,
      HeavyWeapon: specialRules,
      Bow: specialRules,
      MountedAnimal: specialRules,
      Flying: specialRules,
      MountedAnimalCompositeBow: specialRules,
      MountBeast: beastSpecialRules,
      MountFlyingBeast: beastSpecialRules,
    }[equipmentOptions],
    cost: {
      points: 0,
    },
    rules: { onlyOneWarlord: baseOrSharedRules.onlyOneWarlord },
  };
};

const createLieutenant = (
  equipmentOptions: "None" | "HeavyWeapon" | "Bow" | "MountedAnimal" | "Flying"
): UnitDetails<Unit> => {
  return {
    unit: "Lieutenant",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: {
        None: 5,
        HeavyWeapon: 4,
        Bow: 4,
        MountedAnimal: 5,
        Flying: 5,
      }[equipmentOptions],
      shooting: {
        None: 5,
        HeavyWeapon: 5,
        Bow: 4,
        MountedAnimal: 4,
        Flying: 4,
      }[equipmentOptions],
    },
    aggression: {
      melee: 4,
      shooting: 2,
    },
    specialRules: ["Determination", "Presence", "Resilience(1)"],
    cost: {
      units: {
        Creatures: 1,
        Hearthguards: 2,
        Warriors: 4,
      },
    },
  };
};

const createSorcerer = (
  equipmentOptions: "None" | "MountedAnimal"
): UnitDetails<Unit> => {
  return {
    unit: "Sorcerer",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: 3,
      shooting: {
        None: 4,
        MountedAnimal: 3,
        Volant: 3,
      }[equipmentOptions],
    },
    aggression: {
      melee: 2,
      shooting: 0,
    },
    specialRules: [
      "Bodyguard",
      "Determination",
      "Magic",
      "Presence",
      "Resilience(1)",
      "Unarmed",
    ],
    cost: {
      points: 1,
    },
  };
};

const createMonster = (
  equipmentOptions: "Behemoth" | "Titan" | "ScourgeFlight"
): UnitDetails<Unit> => {
  const behemothSpecialRules = [
    "Imposing",
    "Presence",
    "Primitive",
    "Resilience(2)",
  ];
  const titanSpecialRules = [
    "Imposing",
    "Presence",
    "Primitive",
    "Resilience(2)",
    "Slow",
  ];
  const scourgeSpecialRules = [
    "Breath",
    "Imposing",
    "Presence",
    "Primitive",
    "Resilience(2)",
  ];
  return {
    unit: "Monsters",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: { Behemoth: 4, Titan: 5, ScourgeFlight: 4 }[equipmentOptions],
      shooting: { Behemoth: 4, Titan: 5, ScourgeFlight: 4 }[equipmentOptions],
    },
    aggression: {
      melee: { Behemoth: 14, Titan: 12, ScourgeFlight: 10 }[equipmentOptions],
      shooting: { Behemoth: 0, Titan: 0, ScourgeFlight: 4 }[equipmentOptions],
    },
    specialRules: {
      Behemoth: behemothSpecialRules,
      Titan: titanSpecialRules,
      ScourgeFlight: scourgeSpecialRules,
    }[equipmentOptions],
    cost: { points: 1 },
  };
};

const createCreatures = (
  equipmentOptions: "Biped" | "Quadruped" | "Flyers"
): UnitDetails<Unit> => {
  const bipedSpecialRules = ["Imposing", "Presence", "Resilience(1)"];
  const quadrupedSpecialRules = [
    "Imposing",
    "Presence",
    "Resilience(1)",
    "Swift",
  ];
  const flyersSpecialRules = bipedSpecialRules;
  return {
    unit: "Creatures",
    unitSize: 2,
    equipmentOptions,
    armour: {
      melee: 4,
      shooting: { Biped: 4, Quadruped: 3, Flyers: 3 }[equipmentOptions],
    },
    aggression: {
      melee: { Biped: 5, Quadruped: 5, Flyers: 4 }[equipmentOptions],
      shooting: 1,
    },
    specialRules: {
      Biped: bipedSpecialRules,
      Quadruped: quadrupedSpecialRules,
      Flyers: flyersSpecialRules,
    }[equipmentOptions],
    cost: {
      points: 1,
    },
  };
};

const createCreatureWithUnits = (
  equipmentOptions: "Biped" | "Quadruped" | "Flyers"
): UnitDetails<Unit> => {
  const creature = createCreatures(equipmentOptions);
  return {
    ...creature,
    equipmentOptions: `${equipmentOptions} (1)`,
    unitSize: 1,
    cost: {
      units: {
        Creatures: 1,
        Hearthguards: 2,
        Warriors: 4,
      },
    },
  };
};

const createHearthguards = (
  equipmentOptions:
    | "None"
    | "Bow"
    | "HeavyWeapon"
    | "MountedAnimal"
    | "Flying"
    | "MountedAnimalCompositeBow"
): UnitDetails<Unit> => {
  return {
    unit: "Hearthguards",
    unitSize: 4,
    equipmentOptions,
    armour: {
      melee: {
        None: 5,
        Bow: 5,
        HeavyWeapon: 4,
        MountedAnimal: 5,
        Flying: 5,
        MountedAnimalCompositeBow: 4,
      }[equipmentOptions],
      shooting: {
        None: 5,
        Bow: 5,
        HeavyWeapon: 5,
        MountedAnimal: 4,
        Flying: 4,
        MountedAnimalCompositeBow: 4,
      }[equipmentOptions],
    },
    aggression: {
      melee: 2,
      shooting: 1,
    },
    specialRules: [],
    cost: {
      points: 1,
    },
  };
};

const createWarriors = (
  equipmentOptions:
    | "None"
    | "Bow"
    | "Crossbow"
    | "HeavyWeapon"
    | "MountedAnimal"
    | "Flying"
    | "MountedAnimalCompositeBow"
): UnitDetails<Unit> => {
  return {
    unit: "Warriors",
    unitSize: 8,
    equipmentOptions,
    armour: {
      melee: {
        None: 4,
        Bow: 3,
        Crossbow: 3,
        HeavyWeapon: 3,
        MountedAnimal: 4,
        Flying: 3,
        MountedAnimalCompositeBow: 3,
      }[equipmentOptions],
      shooting: {
        None: 4,
        Bow: 4,
        Crossbow: 3,
        HeavyWeapon: 3,
        MountedAnimal: 3,
        Flying: 3,
        MountedAnimalCompositeBow: 3,
      }[equipmentOptions],
    },
    aggression: {
      melee: 1,
      shooting: 0.5,
    },
    specialRules: [],
    cost: {
      points: 1,
    },
  };
};

const createLevies = (
  equipmentOptions: "None" | "Javelins" | "Bow" | "Crossbow" | "Firearms"
): UnitDetails<Unit> => {
  return {
    unit: "Levies",
    unitSize: 12,
    equipmentOptions,
    armour: {
      melee: {
        None: 4,
        Javelins: 3,
        Bow: 3,
        Crossbow: 3,
        Firearms: 3,
      }[equipmentOptions],
      shooting: {
        None: 4,
        Javelins: 4,
        Bow: 3,
        Crossbow: 3,
        Firearms: 3,
      }[equipmentOptions],
    },
    aggression: {
      melee: {
        None: 0.5,
        Javelins: 0.33,
        Bow: 0.33,
        Crossbow: 0.33,
        Firearms: 0.33,
      }[equipmentOptions],
      shooting: 0.5,
    },
    specialRules: [],
    cost: {
      points: 1,
    },
  };
};

const createWarMachine = (
  equipmentOptions: "Static" | "Mobile" | "Flying"
): UnitDetails<Unit> => {
  const staticSpecialRules = [
    "Cumbersome",
    "Powerful Shot (aggression 2 or 4)",
    "Presence",
    "Resilience(1)",
    "Unarmed",
  ];
  const mobileSpecialRules = [
    "Firearms",
    "Presence",
    "Resilience(1)",
    "Unarmed",
  ];
  const flyingSpecialRules = [
    "Firearms",
    "Presence",
    "Resilience(1)",
    "Unarmed",
  ];
  return {
    unit: "War Machines",
    unitSize: 1,
    equipmentOptions,
    armour: {
      melee: {
        Static: 3,
        Mobile: 4,
        Flying: 4,
      }[equipmentOptions],
      shooting: 4,
    },
    aggression: {
      melee: {
        Static: 1,
        Mobile: 2,
        Flying: 1,
      }[equipmentOptions],
      shooting: {
        Static: 2,
        Mobile: 4,
        Flying: 4,
      }[equipmentOptions],
    },
    specialRules: {
      Static: staticSpecialRules,
      Mobile: mobileSpecialRules,
      Flying: flyingSpecialRules,
    }[equipmentOptions],
    cost: {
      units: {
        Warriors: 4,
        Levies: 6,
      },
    },
    rules: { onlyOneWarMachine: baseOrSharedRules.onlyOneWarMachine },
  };
};

const baseOrSharedRules = {
  onlyOneWarlord: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Warlord";
    });
  },
  onlyOneMonster: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Monsters";
    });
  },
  onlyOneWarMachine: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Monsters";
    });
  },
  onlyOneUnitOfCreatures: (units: UnitDetails<Unit>[]): boolean => {
    return units.some(({ unit }) => {
      return unit === "Creatures";
    });
  },
};

export {
  createWarlord,
  createLieutenant,
  createSorcerer,
  createMonster,
  createCreatures,
  createCreatureWithUnits,
  createHearthguards,
  createWarriors,
  createLevies,
  createWarMachine,
  baseOrSharedRules,
};
