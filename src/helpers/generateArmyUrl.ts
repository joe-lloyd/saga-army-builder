import { UserSavedArmy } from "../contexts/usersSavedArmiesContext";

const generateArmyUrl = (army: UserSavedArmy) => {
  if (!army) return;
  const params = new URLSearchParams();
  params.set("initialPoints", army.initialPoints.toString());
  params.set("currentPoints", army.currentPoints.toString());
  params.set("id", army.id);
  params.set("armyName", army.armyName);
  params.set("faction", army.faction);
  params.set("units", JSON.stringify(army.units));

  const url = new URL(window.location.href);
  // @ts-ignore
  url.search = params;

  return url.toString();
};

const decodeUrlParams = () => {
  const currentUrl = window.location.href;
  const searchParams = new URL(currentUrl).searchParams;
  if (!searchParams) return;
  /// check id first
  const id = searchParams.get("id") as string;
  if (!id) return;

  const initialPoints = searchParams.get("initialPoints") as string;
  const currentPoints = searchParams.get("currentPoints") as string;
  const faction = searchParams.get("faction") as string;
  const armyName = decodeURIComponent(searchParams.get("armyName") as string);
  const units = JSON.parse(
    decodeURIComponent(searchParams.get("units") as string)
  );

  return { initialPoints, currentPoints, id, armyName, faction, units };
};

export { generateArmyUrl, decodeUrlParams };
