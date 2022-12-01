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
] as const;

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
    units?: {
      creature: number;
      hearthguards: number;
      warriors: number;
      levies?: number;
    };
  };
  unitSize: number;
  rules?: {[key: string]: (units: UnitDetails<Unit>[]) => boolean};
}

type Unit = typeof units[number];

interface ArmyInterface {
  name: typeof factions[number];
  units: { unitName: Unit; variants: UnitDetails<Unit>[] }[];
}

export type { ArmyInterface, UnitDetails, Unit };
export { units, factions };
