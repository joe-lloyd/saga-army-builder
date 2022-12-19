enum ErrorMessages {
  insufficientPoints = "insufficientPoints",
  insufficientUnits = "insufficientUnits",
  costOfUnitUndefined = "costOfUnitUndefined",
  onlyOneMonster = "onlyOneMonster",
  onlyOneWarlordOrNecromancer = "onlyOneWarlordOrNecromancer",
  onlyOneWarlord = "onlyOneWarlord",
  onlyOneSwarm = "onlyOneSwarm",
  onlyTwoMonsters = "onlyTwoMonsters",
  onlyHalfOfYourPointsCanBeSpentOnMindless = "onlyHalfOfYourPointsCanBeSpentOnMindless",
  onlyTwoWarChariots = "onlyTwoWarChariots",
  onlyOneUnitOfCreatures = "onlyOneUnitOfCreatures",
  onlyHalfOfYourWarriorsCanBeHunters = "onlyHalfOfYourWarriorsCanBeHunters",
  onlyThreeMonsters = "onlyThreeMonsters",
  onlyTwoCreatures = "onlyTwoCreatures",
  onlyOneWarMachine = "onlyOneWarMachine",
  onlyTwoWarMachines = "onlyTwoWarMachines",
  onlyTwoDestructionTeams = "onlyTwoDestructionTeams",
}

const errorMessages: { [key in ErrorMessages]: string } = {
  insufficientPoints: "You dont have enough points for that.",
  insufficientUnits: "You dont have enough types of this unit for that.",
  costOfUnitUndefined: "Cost of the unit is undefined, this is a bug (oops).",
  onlyOneWarlord: "You may only have one Warlord",
  onlyOneWarlordOrNecromancer: "You may only have one Warlord or Necromancer",
  onlyOneSwarm: "You may only have one Swarm",
  onlyOneMonster: "You may only have one Monster",
  onlyTwoMonsters: "You may only have upto 2 monsters",
  onlyThreeMonsters: "You may only have upto 3 Monsters in your army",
  onlyHalfOfYourPointsCanBeSpentOnMindless:
    "Only half of your army (points) can be Mindless",
  onlyTwoWarChariots: "You may only have upto 2 war chariots in your army",
  onlyOneUnitOfCreatures: "You may only have one unit of creatures",
  onlyTwoCreatures: "You may only have upto 2 units of Creatures in your army",
  onlyHalfOfYourWarriorsCanBeHunters:
    "Only half of your warriors can be hunters",
  onlyOneWarMachine: "You may only have one War Machine",
  onlyTwoWarMachines: "You may only have two War Machines",
  onlyTwoDestructionTeams: "You may only have two Destruction Teams",
};

export { errorMessages, ErrorMessages };
