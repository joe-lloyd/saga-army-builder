enum ErrorMessages {
  insufficientPoints = "insufficientPoints",
  insufficientUnits = "insufficientUnits",
  costOfUnitUndefined = "costOfUnitUndefined",
  onlyOne = "onlyOne",
  onlyOneMonster = "onlyOneMonster",
  onlyOneWarlordOrNecromancer = "onlyOneWarlordOrNecromancer",
}

const errorMessages: { [key in ErrorMessages]: string } = {
  insufficientPoints: "You dont have enough points for that.",
  insufficientUnits: "You dont have enough types of this unit for that.",
  costOfUnitUndefined: "Cost of the unit is undefined, this is a bug (oops).",
  onlyOne: "You may only have one of that",
  onlyOneMonster: "You may only have one Monster",
  onlyOneWarlordOrNecromancer: "You may only have one Warlord or Necromancer",
};

export { errorMessages, ErrorMessages };
