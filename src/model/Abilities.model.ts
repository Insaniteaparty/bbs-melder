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

const abilities: Record<AbilityName, Ability> = {
  // Item/Prize
  [AbilityName.TreasureMagnet]: new Ability(
    AbilityName.TreasureMagnet,
    AbilityType.Prize,
    5,
    "item"
  ),
  [AbilityName.HPPrizePlus]: new Ability(
    AbilityName.HPPrizePlus,
    AbilityType.Prize,
    3,
    "prize"
  ),
  [AbilityName.LinkPrizePlus]: new Ability(
    AbilityName.LinkPrizePlus,
    AbilityType.Prize,
    3,
    "prize"
  ),
  [AbilityName.LuckyStrike]: new Ability(
    AbilityName.LuckyStrike,
    AbilityType.Prize,
    5,
    "item"
  ),

  // Stats
  [AbilityName.HPBoost]: new Ability(
    AbilityName.HPBoost,
    AbilityType.Stat,
    3,
    "stat"
  ),
  [AbilityName.FireBoost]: new Ability(
    AbilityName.FireBoost,
    AbilityType.Stat,
    3,
    "boost"
  ),
  [AbilityName.BlizzardBoost]: new Ability(
    AbilityName.BlizzardBoost,
    AbilityType.Stat,
    3,
    "boost"
  ),
  [AbilityName.ThunderBoost]: new Ability(
    AbilityName.ThunderBoost,
    AbilityType.Stat,
    3,
    "boost"
  ),
  [AbilityName.CureBoost]: new Ability(
    AbilityName.CureBoost,
    AbilityType.Stat,
    3,
    "boost"
  ),
  [AbilityName.ItemBoost]: new Ability(
    AbilityName.ItemBoost,
    AbilityType.Stat,
    3,
    "boost"
  ),
  [AbilityName.AttackHaste]: new Ability(
    AbilityName.AttackHaste,
    AbilityType.Stat,
    5,
    "haste"
  ),
  [AbilityName.MagicHaste]: new Ability(
    AbilityName.MagicHaste,
    AbilityType.Stat,
    5,
    "haste"
  ),
  [AbilityName.ComboFBoost]: new Ability(
    AbilityName.ComboFBoost,
    AbilityType.Stat,
    2,
    "haste"
  ),
  [AbilityName.FinishBoost]: new Ability(
    AbilityName.FinishBoost,
    AbilityType.Stat,
    2,
    "boost"
  ),
  [AbilityName.FireScreen]: new Ability(
    AbilityName.FireScreen,
    AbilityType.Stat,
    2,
    "defense"
  ),
  [AbilityName.BlizzardScreen]: new Ability(
    AbilityName.BlizzardScreen,
    AbilityType.Stat,
    2,
    "defense"
  ),
  [AbilityName.ThunderScreen]: new Ability(
    AbilityName.ThunderScreen,
    AbilityType.Stat,
    2,
    "defense"
  ),
  [AbilityName.DarkScreen]: new Ability(
    AbilityName.DarkScreen,
    AbilityType.Stat,
    2,
    "defense"
  ),
  [AbilityName.ReloadBoost]: new Ability(
    AbilityName.ReloadBoost,
    AbilityType.Stat,
    1,
    "haste"
  ),
  [AbilityName.Defender]: new Ability(
    AbilityName.Defender,
    AbilityType.Stat,
    1,
    "survival"
  ),

  // Supports
  [AbilityName.ZeroEXP]: new Ability(
    AbilityName.ZeroEXP,
    AbilityType.Support,
    1,
    "EXP"
  ),
  [AbilityName.ComboPlus]: new Ability(
    AbilityName.ComboPlus,
    AbilityType.Support,
    3,
    "utility"
  ),
  [AbilityName.AirComboPlus]: new Ability(
    AbilityName.AirComboPlus,
    AbilityType.Support,
    3,
    "utility"
  ),
  [AbilityName.EXPChance]: new Ability(
    AbilityName.EXPChance,
    AbilityType.Support,
    1,
    "EXP"
  ),
  [AbilityName.EXPWalker]: new Ability(
    AbilityName.EXPWalker,
    AbilityType.Support,
    1,
    "EXP"
  ),
  [AbilityName.DamageSyphon]: new Ability(
    AbilityName.DamageSyphon,
    AbilityType.Support,
    1,
    "utility"
  ),
  [AbilityName.SecondChance]: new Ability(
    AbilityName.SecondChance,
    AbilityType.Support,
    1,
    "survival"
  ),
  [AbilityName.OnceMore]: new Ability(
    AbilityName.OnceMore,
    AbilityType.Support,
    1,
    "survival"
  ),
  [AbilityName.Scan]: new Ability(
    AbilityName.Scan,
    AbilityType.Support,
    1,
    "utility"
  ),
  [AbilityName.LeafBracer]: new Ability(
    AbilityName.LeafBracer,
    AbilityType.Support,
    1,
    "utility"
  ),
};

export { Ability, AbilityName, AbilityType, abilities };
