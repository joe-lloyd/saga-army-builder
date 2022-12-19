const factions = [
  "Undead",
  "Wild",
  "Kingdoms",
  "Underearth",
  "Otherworld",
  "Horde",
] as const;

const units = [
  //generic
  "Warlord",
  "Lieutenant",
  "Sorcerer",
  "Monsters",
  "Creatures",
  "Hearthguards",
  "Warriors",
  "War Machines",
  "Levies",

  // undead
  "Necromancer",
  "Mindless",

  // kingdoms
  "Paladin",

  // wild
  "Swarm",

  // horde
  "WarChariot",

  // otherworld
  "Hunters",
] as const;

interface UnitsToSpend {
  Creatures?: number;
  Hearthguards?: number;
  Warriors?: number;
  Levies?: number;
}

interface UnitDetails<T> {
  unit: T;
  equipmentOptions: string;
  armour: {
    melee: number;
    shooting: number;
  };
  aggression: {
    melee: number;
    shooting: number;
  };
  specialRules: Array<string>;
  cost: {
    points?: number;
    units?: UnitsToSpend;
  };
  unitSize: number;
  rules?: { [key: string]: (units: UnitDetails<Unit>[]) => boolean };
  unitPaidFor?: number;
  costId?: number;
}

type Unit = typeof units[number];

interface ArmyInterface {
  name: typeof factions[number];
  units: { unitName: Unit; variants: UnitDetails<Unit>[] }[];
}

export type { ArmyInterface, UnitDetails, Unit, UnitsToSpend };
export { units, factions };
