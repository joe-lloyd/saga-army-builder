enum ErrorMessages {
  insufficientPoints = "insufficientPoints",
  onlyOne = "onlyOne",
  onlyOneMonster = "onlyOneMonster",
  onlyOneWarlordOrNecromancer = "onlyOneWarlordOrNecromancer",
}

const errorMessages: { [key in ErrorMessages]: string } = {
  insufficientPoints: "You dont have enough points for that.",
  onlyOne: "You may only have one of that",
  onlyOneMonster: "You may only have one Monster",
  onlyOneWarlordOrNecromancer: "You may only have one Warlord or Necromancer",
};

export { errorMessages, ErrorMessages };
