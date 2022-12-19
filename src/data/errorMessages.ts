enum ErrorMessages {
  insufficientPoints = "insufficientPoints",
  insufficientUnits = "insufficientUnits",
  costOfUnitUndefined = "costOfUnitUndefined",
  onlyOne = "onlyOne",
  onlyOneMonster = "onlyOneMonster",
  onlyOneWarlordOrNecromancer = "onlyOneWarlordOrNecromancer",
  onlyOneWarlord = "onlyOneWarlord",
  onlyOneSwarm = "onlyOneSwarm",
  onlyTwoMonsters = "onlyTwoMonsters",
  onlyHalfOfYourPointsCanBeSpentOnMindless = "onlyHalfOfYourPointsCanBeSpentOnMindless",
  onlyTwoWarChariots = "onlyTwoWarChariots",
}

const errorMessages: { [key in ErrorMessages]: string } = {
  insufficientPoints: "You dont have enough points for that.",
  insufficientUnits: "You dont have enough types of this unit for that.",
  costOfUnitUndefined: "Cost of the unit is undefined, this is a bug (oops).",
  onlyOne: "You may only have one of that",
  onlyOneMonster: "You may only have one Monster",
  onlyOneWarlordOrNecromancer: "You may only have one Warlord or Necromancer",
  onlyOneWarlord: "You may only have one Warlord",
  onlyOneSwarm: "You may only have one Swarm",
  onlyTwoMonsters: "You may only have upto 2 monsters",
  onlyHalfOfYourPointsCanBeSpentOnMindless: "Only half of your army (points) can be Mindless",
  onlyTwoWarChariots: "You may only have upto 2 war chariots in your army",
};

export { errorMessages, ErrorMessages };
