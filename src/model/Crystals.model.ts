import { AbilityName } from "./Abilities.model";
import { FamilyType } from "./Families.model";

enum CrystalName {
  Shimmering,
  Fleeting,
  Pulsing,
  Wellspring,
  Soothing,
  Hungry,
  Abounding,
}

type CrystalAbilityMap = {
  [key in CrystalName]?: AbilityName;
};

type RecipesByFamily = {
  [family in FamilyType]: CrystalAbilityMap;
};

const familyMapper: RecipesByFamily = {
  [FamilyType.A]: {
    [CrystalName.Shimmering]: AbilityName.FireBoost,
    [CrystalName.Fleeting]: AbilityName.MagicHaste,
    [CrystalName.Pulsing]: AbilityName.LeafBracer,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.HPBoost,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.LinkPrizePlus,
  },
  [FamilyType.B]: {
    [CrystalName.Shimmering]: AbilityName.FireBoost,
    [CrystalName.Fleeting]: AbilityName.ReloadBoost,
    [CrystalName.Pulsing]: AbilityName.FinishBoost,
    [CrystalName.Wellspring]: AbilityName.OnceMore,
    [CrystalName.Soothing]: AbilityName.DamageSyphon,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.EXPChance,
  },
  [FamilyType.C]: {
    [CrystalName.Shimmering]: AbilityName.FireScreen,
    [CrystalName.Fleeting]: AbilityName.AttackHaste,
    [CrystalName.Pulsing]: AbilityName.FinishBoost,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.HPBoost,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.LinkPrizePlus,
  },
  [FamilyType.D]: {
    [CrystalName.Shimmering]: AbilityName.FireScreen,
    [CrystalName.Fleeting]: AbilityName.AttackHaste,
    [CrystalName.Pulsing]: AbilityName.LeafBracer,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.HPBoost,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.LinkPrizePlus,
  },
  [FamilyType.E]: {
    [CrystalName.Shimmering]: AbilityName.BlizzardBoost,
    [CrystalName.Fleeting]: AbilityName.MagicHaste,
    [CrystalName.Pulsing]: AbilityName.LeafBracer,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.ItemBoost,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.F]: {
    [CrystalName.Shimmering]: AbilityName.BlizzardBoost,
    [CrystalName.Fleeting]: AbilityName.ReloadBoost,
    [CrystalName.Pulsing]: AbilityName.SecondChance,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.DamageSyphon,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.G]: {
    [CrystalName.Shimmering]: AbilityName.BlizzardScreen,
    [CrystalName.Fleeting]: AbilityName.AttackHaste,
    [CrystalName.Pulsing]: AbilityName.LeafBracer,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.ItemBoost,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.H]: {
    [CrystalName.Shimmering]: AbilityName.BlizzardScreen,
    [CrystalName.Fleeting]: AbilityName.MagicHaste,
    [CrystalName.Pulsing]: AbilityName.ComboFBoost,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.ItemBoost,
    [CrystalName.Hungry]: AbilityName.HPPrizePlus,
    [CrystalName.Abounding]: AbilityName.EXPWalker,
  },
  [FamilyType.I]: {
    [CrystalName.Shimmering]: AbilityName.ThunderBoost,
    [CrystalName.Fleeting]: AbilityName.MagicHaste,
    [CrystalName.Pulsing]: AbilityName.ComboFBoost,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.HPBoost,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.LinkPrizePlus,
  },
  [FamilyType.J]: {
    [CrystalName.Shimmering]: AbilityName.ThunderBoost,
    [CrystalName.Fleeting]: AbilityName.ReloadBoost,
    [CrystalName.Pulsing]: AbilityName.ComboFBoost,
    [CrystalName.Wellspring]: AbilityName.OnceMore,
    [CrystalName.Soothing]: AbilityName.Defender,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.EXPChance,
  },
  [FamilyType.K]: {
    [CrystalName.Shimmering]: AbilityName.ThunderScreen,
    [CrystalName.Fleeting]: AbilityName.AttackHaste,
    [CrystalName.Pulsing]: AbilityName.FinishBoost,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.HPBoost,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.LinkPrizePlus,
  },
  [FamilyType.L]: {
    [CrystalName.Shimmering]: AbilityName.ThunderScreen,
    [CrystalName.Fleeting]: AbilityName.AttackHaste,
    [CrystalName.Pulsing]: AbilityName.FinishBoost,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.HPBoost,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.M]: {
    [CrystalName.Shimmering]: AbilityName.CureBoost,
    [CrystalName.Fleeting]: AbilityName.MagicHaste,
    [CrystalName.Pulsing]: AbilityName.ComboFBoost,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.ItemBoost,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.N]: {
    [CrystalName.Shimmering]: AbilityName.CureBoost,
    [CrystalName.Fleeting]: AbilityName.ReloadBoost,
    [CrystalName.Pulsing]: AbilityName.SecondChance,
    [CrystalName.Wellspring]: AbilityName.ComboPlus,
    [CrystalName.Soothing]: AbilityName.Defender,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.O]: {
    [CrystalName.Shimmering]: AbilityName.DarkScreen,
    [CrystalName.Fleeting]: AbilityName.AttackHaste,
    [CrystalName.Pulsing]: AbilityName.FinishBoost,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.ItemBoost,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.LuckyStrike,
  },
  [FamilyType.P]: {
    [CrystalName.Shimmering]: AbilityName.DarkScreen,
    [CrystalName.Fleeting]: AbilityName.MagicHaste,
    [CrystalName.Pulsing]: AbilityName.ComboFBoost,
    [CrystalName.Wellspring]: AbilityName.AirComboPlus,
    [CrystalName.Soothing]: AbilityName.ItemBoost,
    [CrystalName.Hungry]: AbilityName.TreasureMagnet,
    [CrystalName.Abounding]: AbilityName.EXPWalker,
  },
};

export { CrystalName, FamilyType, familyMapper };
