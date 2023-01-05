import { UserSavedArmy } from "../contexts/usersSavedArmiesContext";
import {
  factions,
  units,
  equipmentOptions,
  ArmyInterface,
  UnitDetails,
  Unit,
} from "../ArmyUnitTypes";
import { armyData } from "../data/armies";

const generateArmyUrl = (army: UserSavedArmy) => {
  if (!army) return;
  const params = new URLSearchParams();
  params.set("data", minifyData(army) as string);

  const url = new URL(window.location.href);
  // @ts-ignore
  url.search = params;

  return url.toString();
};

const factionsObj: { [key in typeof factions[number]]: string } = {
  Undead: "ud",
  Wild: "w",
  Kingdoms: "k",
  Underearth: "ue",
  Otherworld: "o",
  Horde: "h",
};

const unitsObj: { [key in typeof units[number]]: string } = {
  Warlord: "wl",
  Lieutenant: "lt",
  Sorcerer: "sc",
  Monsters: "mo",
  Creatures: "c",
  Hearthguards: "hg",
  Warriors: "wi",
  "War Machines": "wm",
  Levies: "lv",
  Necromancer: "n",
  Mindless: "mi",
  Paladin: "p",
  Swarm: "sm",
  WarChariot: "wc",
  Hunters: "ht",
  "Destruction Team": "d",
};

const equipmentObj: { [key in typeof equipmentOptions[number]]: string } = {
  None: "n",
  HeavyWeapon: "hw",
  Bow: "b",
  MountedAnimal: "ma",
  Flying: "f",
  MountedAnimalCompositeBow: "mac",
  MountBeast: "mb",
  MountFlyingBeast: "mfb",
  Behemoth: "bh",
  Titan: "t",
  ScourgeFlight: "sf",
  Biped: "bp",
  Quadruped: "q",
  Flyers: "fs",
  "Biped (1)": "bp1",
  "Quadruped (1)": "q1",
  "Flyers (1)": "fs1",
  Crossbow: "c",
  Javelins: "j",
  Firearms: "fa",
  Static: "s",
  Mobile: "m",
  WingedMount: "wm",
  Winged: "w",
};

const factionMap: { [key: string]: typeof factions[number] } = {
  ud: "Undead",
  w: "Wild",
  k: "Kingdoms",
  ue: "Underearth",
  o: "Otherworld",
  h: "Horde",
};

const unitMap: { [key: string]: typeof units[number] } = {
  wl: "Warlord",
  lt: "Lieutenant",
  sc: "Sorcerer",
  mo: "Monsters",
  c: "Creatures",
  hg: "Hearthguards",
  wi: "Warriors",
  wm: "War Machines",
  lv: "Levies",
  n: "Necromancer",
  mi: "Mindless",
  p: "Paladin",
  sm: "Swarm",
  wc: "WarChariot",
  ht: "Hunters",
  d: "Destruction Team",
};

const equipmentOptionsMap: { [key: string]: typeof equipmentOptions[number] } =
  {
    n: "None",
    hw: "HeavyWeapon",
    b: "Bow",
    ma: "MountedAnimal",
    f: "Flying",
    mac: "MountedAnimalCompositeBow",
    mb: "MountBeast",
    mfb: "MountFlyingBeast",
    bh: "Behemoth",
    t: "Titan",
    sf: "ScourgeFlight",
    bp: "Biped",
    q: "Quadruped",
    fs: "Flyers",
    bp1: "Biped (1)",
    q1: "Quadruped (1)",
    fs1: "Flyers (1)",
    c: "Crossbow",
    j: "Javelins",
    fa: "Firearms",
    s: "Static",
    m: "Mobile",
    wm: "WingedMount",
    w: "Winged",
  };

const minifyData = (army: UserSavedArmy) => {
  if (!army) return;
  let baseData = `${army.armyName},${army.initialPoints},${army.currentPoints},${army.id}`;
  baseData = `${baseData},${factionsObj[army.faction]}`;

  const unitString = army.units.reduce((acc, unit) => {
    const costId = unit.costId ? unit.costId : "";
    const unitPaidFor = unit.unitPaidFor
      ? `${Math.abs(unit.unitSize)}.${unit.unitPaidFor}`
      : "";
    const additionalData = costId || unitPaidFor ? costId || unitPaidFor : "";

    return `${acc}${`${additionalData}-` || ""}${unitsObj[unit.unit]}:${
      equipmentObj[unit.equipmentOptions]
    };`;
  }, "");
  return `${baseData},${unitString}`;
};

/**
 * This one is a mess, the logic is too complex.
 * @TODO: make this more readable.
 */
const decodeUrlParams = () => {
  const currentUrl = window.location.href;
  const searchParams = new URL(currentUrl).searchParams;
  if (!searchParams) return;
  /// check data first
  const dataEncoded = searchParams.get("data") as string;
  if (!dataEncoded) return;
  const data = decodeURIComponent(dataEncoded);

  const [
    armyName,
    initialPoints,
    currentPoints,
    id,
    factionShortHand,
    unitsShortHand,
  ] = data.split(",");

  const faction = factionMap[factionShortHand];
  const army = armyData.find(({ name }) => name === faction) as ArmyInterface;

  const units = unitsShortHand
    .split(";")
    .filter(Boolean)
    .map((unitAndEquipmentShortHand) => {
      let costId: string = "";
      let unitSizeCost: string = "";
      let unitPaidFor: string = "";
      let [unitShortHand, equipmentOptionsShortHand] =
        unitAndEquipmentShortHand.split(":");
      const holdValueForNegativeUnits = unitShortHand.split("-");
      if (holdValueForNegativeUnits.length === 2) {
        const [costAndId, unitShortHandStripped] = holdValueForNegativeUnits;
        unitShortHand = unitShortHandStripped;
        const costIdSplit = costAndId.split(".");
        if (costIdSplit.length === 2) {
          [unitSizeCost, unitPaidFor] = costIdSplit;
        } else {
          costId = costAndId;
        }
      }

      const unitName = unitMap[unitShortHand];
      const equipmentName = equipmentOptionsMap[equipmentOptionsShortHand];

      const unitVariants = (
        army.units.find(
          (unitData) => unitData.unitName === unitName
        ) as ArmyInterface["units"][number]
      ).variants;

      const unit = unitVariants.find(
        (variant) => variant.equipmentOptions === equipmentName
      ) as UnitDetails<Unit>;
      const enhancedUnit = !unitSizeCost
        ? unit
        : { ...unit, unitSize: parseInt(`-${unitSizeCost}`), unitPaidFor };
      return !costId ? enhancedUnit : { ...enhancedUnit, costId };
    });

  return { initialPoints, currentPoints, id, armyName, faction, units };
};

export { generateArmyUrl, decodeUrlParams };
