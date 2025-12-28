enum AbilityType {
  Prize,
  Stat,
  Support,
}

enum AbilityName {
  TreasureMagnet,
  HPPrizePlus,
  LinkPrizePlus,
  LuckyStrike,
  HPBoost,
  FireBoost,
  BlizzardBoost,
  ThunderBoost,
  DarkBoost,
  CureBoost,
  ItemBoost,
  AttackHaste,
  MagicHaste,
  ComboFBoost,
  FinishBoost,
  FireScreen,
  BlizzardScreen,
  ThunderScreen,
  DarkScreen,
  ReloadBoost,
  Defender,
  ZeroEXP,
  ComboPlus,
  AirComboPlus,
  EXPChance,
  EXPWalker,
  DamageSyphon,
  SecondChance,
  OnceMore,
  Scan,
  LeafBracer,
}

class Ability {
  name: AbilityName;
  type: AbilityType;
  limit: number;
  family: string;

  constructor(
    name: AbilityName,
    type: AbilityType,
    limit: number,
    family: string
  ) {
    this.name = name;
    this.type = type;
    this.limit = limit;
    this.family = family;
  }
}

const abilities: Ability[] = [
  // Item/Prize
  new Ability(AbilityName.TreasureMagnet, AbilityType.Prize, 5, "item"),
  new Ability(AbilityName.HPPrizePlus, AbilityType.Prize, 3, "prize"),
  new Ability(AbilityName.LinkPrizePlus, AbilityType.Prize, 3, "prize"),
  new Ability(AbilityName.LuckyStrike, AbilityType.Prize, 5, "item"),

  // Stats
  new Ability(AbilityName.HPBoost, AbilityType.Stat, 3, "stat"),
  new Ability(AbilityName.FireBoost, AbilityType.Stat, 3, "boost"),
  new Ability(AbilityName.BlizzardBoost, AbilityType.Stat, 3, "boost"),
  new Ability(AbilityName.ThunderBoost, AbilityType.Stat, 3, "boost"),
  new Ability(AbilityName.CureBoost, AbilityType.Stat, 3, "boost"),
  new Ability(AbilityName.ItemBoost, AbilityType.Stat, 3, "boost"),
  new Ability(AbilityName.AttackHaste, AbilityType.Stat, 5, "haste"),
  new Ability(AbilityName.MagicHaste, AbilityType.Stat, 5, "haste"),
  new Ability(AbilityName.ComboFBoost, AbilityType.Stat, 2, "haste"),
  new Ability(AbilityName.FinishBoost, AbilityType.Stat, 2, "boost"),
  new Ability(AbilityName.FireScreen, AbilityType.Stat, 2, "defense"),
  new Ability(AbilityName.BlizzardScreen, AbilityType.Stat, 2, "defense"),
  new Ability(AbilityName.ThunderScreen, AbilityType.Stat, 2, "defense"),
  new Ability(AbilityName.DarkScreen, AbilityType.Stat, 2, "defense"),
  new Ability(AbilityName.ReloadBoost, AbilityType.Stat, 1, "haste"),
  new Ability(AbilityName.Defender, AbilityType.Stat, 1, "survival"),

  // Supports
  new Ability(AbilityName.ZeroEXP, AbilityType.Support, 1, "EXP"),
  new Ability(AbilityName.ComboPlus, AbilityType.Support, 3, "utility"),
  new Ability(AbilityName.AirComboPlus, AbilityType.Support, 3, "utility"),
  new Ability(AbilityName.EXPChance, AbilityType.Support, 1, "EXP"),
  new Ability(AbilityName.EXPWalker, AbilityType.Support, 1, "EXP"),
  new Ability(AbilityName.DamageSyphon, AbilityType.Support, 1, "utility"),
  new Ability(AbilityName.SecondChance, AbilityType.Support, 1, "survival"),
  new Ability(AbilityName.OnceMore, AbilityType.Support, 1, "survival"),
  new Ability(AbilityName.Scan, AbilityType.Support, 1, "utility"),
  new Ability(AbilityName.LeafBracer, AbilityType.Support, 1, "utility"),
];

export { Ability, AbilityName, AbilityType, abilities };
