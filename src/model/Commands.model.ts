import { Character } from "./Characters.model.js";
import { FamilyType } from "./Families.model.js";

enum CommandName {
  // Attack Commands
  QuickBlitz,
  Blitz,
  MagicHour,
  BarrierSurge,
  MeteorCrash,
  WishingEdge,
  SlidingDash,
  FireDash,
  DarkHaze,
  SonicBlade,
  ChaosBlade,
  Zantetsuken,
  StrikeRaid,
  FreezeRaid,
  TreasureRaid,
  SparkRaid,
  WindRaid,
  FireSurge,
  ThunderSurge,
  AerialSlam,
  ArsSolum,
  ArsArcanum,
  TimeSplicer,
  PoisonEdge,
  BlizzardEdge,
  StunEdge,
  SlotEdge,
  FireStrike,
  ConfusionStrike,
  BindingStrike,
  BrutalBlast,
  TornadoStrike,
  MagnetSpiral,
  Windcutter,
  LimitStorm,
  Salvation,
  CollisionMagnet,
  GeoImpact,
  Sacrifice,
  BreakTime,

  // Magic Commands
  Fire,
  Fira,
  Firaga,
  DarkFiraga,
  FissionFiraga,
  TripleFiraga,
  CrawlingFire,
  Blizzard,
  Blizzara,
  Blizzaga,
  TripleBlizzaga,
  Thunder,
  Thundara,
  Thundaga,
  ThundagaShot,
  Cure,
  Cura,
  Curaga,
  Esuna,
  MineShield,
  MineSquare,
  SeekerMine,
  ZeroGravity,
  ZeroGravira,
  ZeroGraviga,
  Magnet,
  Magnera,
  Magnega,
  MunnyMagnet,
  EnergyMagnet,
  DLinkMagnet,
  Aero,
  Aerora,
  Aeroga,
  Warp,
  Faith,
  DeepFreeze,
  Glacier,
  IceBarrage,
  Tornado,
  FiragaBurst,
  RagingStorm,
  MegaFlare,
  Quake,
  Meteor,
  Transcendence,
  Mini,
  Blackout,
  Ignite,
  Confuse,
  Bind,
  Poison,
  Slow,
  Stop,
  Stopra,
  Stopga,
  Sleep,

  // Movement Commands
  Jump,
  HighJump,
  DodgeRoll,
  ThunderRoll,
  AirSlide,
  IceSlide,
  Reversal,
  Glide,
  Superglide,
  FireGlide,
  Cartwheel,
  Firewheel,
  HomingSlide,
  SonicImpact,
  Slide,
  Teleport,
  Doubleflight,

  // Defense Commands
  Block,
  RenewalBlock,
  FocusBlock,
  StunBlock,
  PoisonBlock,
  Barrier,
  RenewalBarrier,
  FocusBarrier,
  ConfuseBarrier,
  StopBarrier,

  // Reprisal Commands
  CounterHammer,
  CounterRush,
  ReversalSlash,
  PaybackFang,
  PaybackRaid,
  CounterBlast,
  PaybackSurge,
  AerialRecovery,

  // Shotlock Commands
  MeteorShower,
  FlameSalvo,
  ChaosSnake,
  DarkVolley,
  Ragnarok,
  Thunderstorm,
  BioBarrage,
  PulseBomb,
  BubbleBlaster,
  PrismRain,
  PhotonCharge,
  AbsoluteZero,
  LightningRay,
  SonicShadow,
  Multivortex,
  Lightbloom,
  UltimaCannon,
}

enum CommandType {
  Attack,
  Magic,
  Movement,
  Defense,
  Reprisal,
  Shotlock,
}

class Recipe {
  ingredients: [CommandName, CommandName];
  family: FamilyType;
  chance?: number;

  constructor(
    ingredients: [CommandName, CommandName],
    family: FamilyType,
    chance?: number
  ) {
    this.ingredients = ingredients;
    this.family = family;
    this.chance = chance;
  }
}

class Command {
  name: CommandName;
  type: CommandType;
  availableTo: Character[];
  recipes?: Recipe[];

  constructor(
    name: CommandName,
    type: CommandType,
    availableTo: Character[],
    recipes?: Recipe[]
  ) {
    this.name = name;
    this.type = type;
    this.availableTo = availableTo;
    if (recipes && recipes.length === 0) this.recipes = undefined;
    else this.recipes = recipes;
  }
}

const commands: Record<CommandName, Command> = {
  // Attack Commands
  [CommandName.QuickBlitz]: new Command(
    CommandName.QuickBlitz,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.Blitz]: new Command(
    CommandName.Blitz,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.StunEdge, CommandName.SlotEdge],
        FamilyType.K,
        90
      ),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.SlotEdge],
        FamilyType.O,
        90
      ),
    ]
  ),

  [CommandName.MagicHour]: new Command(
    CommandName.MagicHour,
    CommandType.Attack,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.Blitz, CommandName.ZeroGraviga],
        FamilyType.O,
        90
      ),
      new Recipe(
        [CommandName.BarrierSurge, CommandName.Aeroga],
        FamilyType.N,
        90
      ),
    ]
  ),

  [CommandName.BarrierSurge]: new Command(
    CommandName.BarrierSurge,
    CommandType.Attack,
    [Character.Aqua],
    [
      new Recipe([CommandName.FireDash, CommandName.Barrier], FamilyType.D),
      new Recipe([CommandName.StunEdge, CommandName.Barrier], FamilyType.K),
    ]
  ),

  [CommandName.MeteorCrash]: new Command(
    CommandName.MeteorCrash,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.FireStrike, CommandName.BrutalBlast],
        FamilyType.D
      ),
      new Recipe([CommandName.Blitz, CommandName.Quake], FamilyType.N),
    ]
  ),

  [CommandName.WishingEdge]: new Command(
    CommandName.WishingEdge,
    CommandType.Attack,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.StrikeRaid, CommandName.BarrierSurge],
        FamilyType.O
      ),
      new Recipe(
        [CommandName.BarrierSurge, CommandName.StunEdge],
        FamilyType.K
      ),
      new Recipe(
        [CommandName.StunEdge, CommandName.BindingStrike],
        FamilyType.J
      ),
    ]
  ),

  [CommandName.SlidingDash]: new Command(
    CommandName.SlidingDash,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.FireDash]: new Command(
    CommandName.FireDash,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.SlidingDash, CommandName.Fira], FamilyType.C),
      new Recipe([CommandName.SlidingDash, CommandName.Fire], FamilyType.D),
      new Recipe([CommandName.ConfusionStrike, CommandName.Fire], FamilyType.D),
    ]
  ),

  [CommandName.DarkHaze]: new Command(
    CommandName.DarkHaze,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.FireDash, CommandName.Blackout], FamilyType.A),
      new Recipe(
        [CommandName.FireSurge, CommandName.ZeroGravity],
        FamilyType.C
      ),
      new Recipe([CommandName.FireDash, CommandName.ZeroGravira], FamilyType.D),
    ]
  ),

  [CommandName.SonicBlade]: new Command(
    CommandName.SonicBlade,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Blitz, CommandName.DarkHaze], FamilyType.D, 90),
      new Recipe(
        [CommandName.FireDash, CommandName.ThunderSurge],
        FamilyType.K,
        90
      ),
      new Recipe([CommandName.Blitz, CommandName.AirSlide], FamilyType.N, 90),
    ]
  ),
  [CommandName.ChaosBlade]: new Command(
    CommandName.ChaosBlade,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.DarkHaze, CommandName.SonicBlade],
        FamilyType.B,
        90
      ),
    ]
  ),

  [CommandName.Zantetsuken]: new Command(
    CommandName.Zantetsuken,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.DarkHaze, CommandName.Stopga], FamilyType.B, 80),
      new Recipe(
        [CommandName.SonicBlade, CommandName.Stopga],
        FamilyType.F,
        80
      ),
    ]
  ),

  [CommandName.StrikeRaid]: new Command(
    CommandName.StrikeRaid,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.QuickBlitz, CommandName.SlidingDash],
        FamilyType.O
      ),
    ]
  ),

  [CommandName.FreezeRaid]: new Command(
    CommandName.FreezeRaid,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.StrikeRaid, CommandName.Blizzara], FamilyType.I),
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.BindingStrike],
        FamilyType.K
      ),
    ]
  ),

  [CommandName.TreasureRaid]: new Command(
    CommandName.TreasureRaid,
    CommandType.Attack,
    [Character.Ventus],
    [
      new Recipe([CommandName.StrikeRaid, CommandName.SlotEdge], FamilyType.O),
      new Recipe([CommandName.SlotEdge, CommandName.Magnet], FamilyType.D),
      new Recipe([CommandName.SlotEdge, CommandName.Magnera], FamilyType.K),
    ]
  ),

  [CommandName.SparkRaid]: new Command(
    CommandName.SparkRaid,
    CommandType.Attack,
    [Character.Ventus],
    [
      new Recipe([CommandName.FreezeRaid, CommandName.Magnega], FamilyType.J),
      new Recipe([CommandName.TreasureRaid, CommandName.Magnega], FamilyType.N),
      new Recipe(
        [CommandName.ThunderSurge, CommandName.DodgeRoll],
        FamilyType.P,
        20
      ),
      new Recipe(
        [CommandName.Thundaga, CommandName.DodgeRoll],
        FamilyType.L,
        20
      ),
      new Recipe(
        [CommandName.DodgeRoll, CommandName.StunBlock],
        FamilyType.L,
        20
      ),
    ]
  ),

  [CommandName.WindRaid]: new Command(
    CommandName.WindRaid,
    CommandType.Attack,
    [Character.Ventus],
    [
      new Recipe([CommandName.FreezeRaid, CommandName.Aeroga], FamilyType.B),
      new Recipe([CommandName.TreasureRaid, CommandName.Aeroga], FamilyType.F),
    ]
  ),

  [CommandName.FireSurge]: new Command(
    CommandName.FireSurge,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.FireStrike, CommandName.Fira], FamilyType.A),
      new Recipe([CommandName.FireDash, CommandName.Ignite], FamilyType.D),
      new Recipe([CommandName.BindingStrike, CommandName.Fira], FamilyType.K),
      new Recipe([CommandName.ConfusionStrike, CommandName.Fira], FamilyType.O),
    ]
  ),

  [CommandName.ThunderSurge]: new Command(
    CommandName.ThunderSurge,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.FireDash, CommandName.Thundara], FamilyType.D),
      new Recipe([CommandName.FreezeRaid, CommandName.Thundara], FamilyType.G),
      new Recipe([CommandName.StunEdge, CommandName.Thundara], FamilyType.I),
      new Recipe(
        [CommandName.ConfusionStrike, CommandName.Thundara],
        FamilyType.I,
        95
      ),
    ]
  ),

  [CommandName.AerialSlam]: new Command(
    CommandName.AerialSlam,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.FireDash, CommandName.HighJump], FamilyType.A),
      new Recipe(
        [CommandName.FireStrike, CommandName.Aerora],
        FamilyType.C,
        90
      ),
      new Recipe([CommandName.FireSurge, CommandName.Aero], FamilyType.D),
    ]
  ),

  [CommandName.ArsSolum]: new Command(
    CommandName.ArsSolum,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.DarkHaze, CommandName.SonicBlade],
        FamilyType.B,
        20
      ),
      new Recipe([CommandName.DarkHaze, CommandName.Stopga], FamilyType.B, 20),
      new Recipe(
        [CommandName.SonicBlade, CommandName.Stopga],
        FamilyType.F,
        20
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Thunder],
        FamilyType.K,
        5
      ),
      new Recipe(
        [CommandName.StrikeRaid, CommandName.Thunder],
        FamilyType.L,
        5
      ),
      new Recipe(
        [CommandName.StrikeRaid, CommandName.Thundara],
        FamilyType.K,
        5
      ),
      new Recipe(
        [CommandName.ConfusionStrike, CommandName.Thundara],
        FamilyType.I,
        5
      ),
    ]
  ),

  [CommandName.ArsArcanum]: new Command(
    CommandName.ArsArcanum,
    CommandType.Attack,
    [Character.Ventus],
    [
      new Recipe([CommandName.Blitz, CommandName.AerialSlam], FamilyType.F),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.SlotEdge],
        FamilyType.O,
        10
      ),
      new Recipe(
        [CommandName.FireStrike, CommandName.Aerora],
        FamilyType.C,
        10
      ),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Blizzard],
        FamilyType.G,
        5
      ),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Blizzara],
        FamilyType.H,
        5
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Blizzard],
        FamilyType.E,
        5
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Blizzara],
        FamilyType.G,
        5
      ),
      new Recipe([CommandName.PoisonEdge, CommandName.Cura], FamilyType.P, 5),
      new Recipe([CommandName.BlizzardEdge, CommandName.Cura], FamilyType.G, 5),
    ]
  ),

  [CommandName.TimeSplicer]: new Command(
    CommandName.TimeSplicer,
    CommandType.Attack,
    [Character.Ventus],
    [
      new Recipe([CommandName.AerialSlam, CommandName.Stopga], FamilyType.F),
      new Recipe(
        [CommandName.StunEdge, CommandName.SlotEdge],
        FamilyType.K,
        10
      ),
    ]
  ),

  [CommandName.PoisonEdge]: new Command(
    CommandName.PoisonEdge,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Poison],
        FamilyType.O,
        95
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Poison],
        FamilyType.K,
        95
      ),
      new Recipe(
        [CommandName.StrikeRaid, CommandName.Poison],
        FamilyType.D,
        95
      ),
    ]
  ),

  [CommandName.BlizzardEdge]: new Command(
    CommandName.BlizzardEdge,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Blizzard],
        FamilyType.G,
        95
      ),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Blizzara],
        FamilyType.H,
        95
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Blizzard],
        FamilyType.E,
        95
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Blizzara],
        FamilyType.G,
        95
      ),
    ]
  ),

  [CommandName.StunEdge]: new Command(
    CommandName.StunEdge,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.SlidingDash, CommandName.Thunder],
        FamilyType.K,
        95
      ),
      new Recipe(
        [CommandName.StrikeRaid, CommandName.Thunder],
        FamilyType.L,
        95
      ),
      new Recipe(
        [CommandName.StrikeRaid, CommandName.Thundara],
        FamilyType.K,
        95
      ),
    ]
  ),

  [CommandName.SlotEdge]: new Command(
    CommandName.SlotEdge,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.PoisonEdge, CommandName.Cura], FamilyType.P, 95),
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.Cura],
        FamilyType.G,
        95
      ),
      new Recipe(
        [CommandName.Curaga, CommandName.RenewalBlock],
        FamilyType.N,
        90
      ),
      new Recipe(
        [CommandName.Curaga, CommandName.FocusBlock],
        FamilyType.P,
        90
      ),
    ]
  ),

  [CommandName.FireStrike]: new Command(
    CommandName.FireStrike,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.PoisonEdge, CommandName.Fira], FamilyType.D),
      new Recipe([CommandName.StunEdge, CommandName.Fire], FamilyType.K),
    ]
  ),

  [CommandName.ConfusionStrike]: new Command(
    CommandName.ConfusionStrike,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.QuickBlitz, CommandName.Confuse], FamilyType.O),
      new Recipe(
        [CommandName.SlidingDash, CommandName.ZeroGravity],
        FamilyType.K
      ),
      new Recipe([CommandName.StrikeRaid, CommandName.Confuse], FamilyType.G),
    ]
  ),

  [CommandName.BindingStrike]: new Command(
    CommandName.BindingStrike,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.QuickBlitz, CommandName.Bind], FamilyType.K),
      new Recipe([CommandName.StrikeRaid, CommandName.Bind], FamilyType.O),
      new Recipe([CommandName.StunEdge, CommandName.ZeroGravity], FamilyType.I),
    ]
  ),

  [CommandName.BrutalBlast]: new Command(
    CommandName.BrutalBlast,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.StunEdge, CommandName.MineShield],
        FamilyType.O,
        70
      ),
      new Recipe(
        [CommandName.BindingStrike, CommandName.MineSquare],
        FamilyType.L,
        70
      ),
    ]
  ),

  [CommandName.TornadoStrike]: new Command(
    CommandName.TornadoStrike,
    CommandType.Attack,
    [Character.Ventus],
    [
      new Recipe(
        [CommandName.ConfusionStrike, CommandName.Aeroga],
        FamilyType.G
      ),
      new Recipe([CommandName.BindingStrike, CommandName.Aeroga], FamilyType.F),
    ]
  ),

  [CommandName.MagnetSpiral]: new Command(
    CommandName.MagnetSpiral,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.BindingStrike, CommandName.CollisionMagnet],
        FamilyType.K
      ),
      new Recipe(
        [CommandName.BindingStrike, CommandName.Magnega],
        FamilyType.J
      ),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Magnera],
        FamilyType.K,
        20
      ),
      new Recipe([CommandName.StunEdge, CommandName.Magnera], FamilyType.L, 20),
      new Recipe(
        [CommandName.ZeroGravira, CommandName.Magnet],
        FamilyType.I,
        20
      ),
    ]
  ),

  [CommandName.Windcutter]: new Command(
    CommandName.Windcutter,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.BindingStrike, CommandName.Aeroga], FamilyType.F),
      new Recipe(
        [CommandName.ConfusionStrike, CommandName.Aeroga],
        FamilyType.G
      ),
    ]
  ),

  [CommandName.LimitStorm]: new Command(
    CommandName.LimitStorm,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.BrutalBlast, CommandName.ConfusionStrike],
        FamilyType.G
      ),
      new Recipe(
        [CommandName.BrutalBlast, CommandName.BindingStrike],
        FamilyType.D
      ),
    ]
  ),

  [CommandName.Salvation]: new Command(
    CommandName.Salvation,
    CommandType.Attack,
    [Character.Ventus],
    [new Recipe([CommandName.WindRaid, CommandName.Curaga], FamilyType.N)]
  ),

  [CommandName.CollisionMagnet]: new Command(
    CommandName.CollisionMagnet,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Magnera],
        FamilyType.K,
        80
      ),
      new Recipe([CommandName.StunEdge, CommandName.Magnera], FamilyType.L, 80),
      new Recipe(
        [CommandName.ZeroGravira, CommandName.Magnet],
        FamilyType.I,
        80
      ),
    ]
  ),

  [CommandName.GeoImpact]: new Command(
    CommandName.GeoImpact,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.BrutalBlast, CommandName.BrutalBlast],
        FamilyType.N,
        70
      ),
    ]
  ),

  [CommandName.Sacrifice]: new Command(
    CommandName.Sacrifice,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.DarkHaze, CommandName.Warp], FamilyType.B),
      new Recipe([CommandName.PoisonEdge, CommandName.Warp], FamilyType.D),
    ]
  ),

  [CommandName.BreakTime]: new Command(
    CommandName.BreakTime,
    CommandType.Attack,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.Curaga, CommandName.RenewalBlock],
        FamilyType.N,
        10
      ),
      new Recipe(
        [CommandName.Curaga, CommandName.FocusBlock],
        FamilyType.P,
        10
      ),
    ]
  ),

  // Magic Commands
  [CommandName.Fire]: new Command(CommandName.Fire, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Fira]: new Command(
    CommandName.Fira,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.FireDash, CommandName.Fire], FamilyType.D),
      new Recipe([CommandName.FireStrike, CommandName.Fire], FamilyType.D),
      new Recipe([CommandName.Fire, CommandName.Fire], FamilyType.A),
      new Recipe([CommandName.Fire, CommandName.Ignite], FamilyType.C),
    ]
  ),

  [CommandName.Firaga]: new Command(
    CommandName.Firaga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.FireDash, CommandName.Fira], FamilyType.D, 90),
      new Recipe([CommandName.Fire, CommandName.Fira], FamilyType.A, 90),
      new Recipe([CommandName.Fira, CommandName.Fira], FamilyType.B, 90),
    ]
  ),

  [CommandName.DarkFiraga]: new Command(
    CommandName.DarkFiraga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.DarkHaze, CommandName.Firaga], FamilyType.D),
      new Recipe([CommandName.Firaga, CommandName.Blackout], FamilyType.B),
    ]
  ),

  [CommandName.FissionFiraga]: new Command(
    CommandName.FissionFiraga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Fira, CommandName.Aeroga], FamilyType.A, 80),
      new Recipe([CommandName.Firaga, CommandName.Aerora], FamilyType.A, 80),
      new Recipe([CommandName.Firaga, CommandName.Aeroga], FamilyType.B, 80),
    ]
  ),

  [CommandName.TripleFiraga]: new Command(
    CommandName.TripleFiraga,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.Fira, CommandName.Firaga], FamilyType.A, 95),
      new Recipe([CommandName.Blitz, CommandName.Firaga], FamilyType.D, 90),
      new Recipe([CommandName.Firaga, CommandName.Firaga], FamilyType.B, 90),
    ]
  ),

  [CommandName.CrawlingFire]: new Command(
    CommandName.CrawlingFire,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Firaga, CommandName.Slow], FamilyType.A, 80),
      new Recipe([CommandName.Firaga, CommandName.Stopra], FamilyType.D, 80),
      new Recipe([CommandName.Firaga, CommandName.Stopga], FamilyType.B, 80),
    ]
  ),

  [CommandName.Blizzard]: new Command(CommandName.Blizzard, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Blizzara]: new Command(
    CommandName.Blizzara,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.StrikeRaid, CommandName.Blizzard], FamilyType.G),
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.Blizzard],
        FamilyType.G
      ),
      new Recipe([CommandName.Blizzard, CommandName.Blizzard], FamilyType.E),
      new Recipe([CommandName.Blizzard, CommandName.Aero], FamilyType.H),
    ]
  ),

  [CommandName.Blizzaga]: new Command(
    CommandName.Blizzaga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.Blizzara],
        FamilyType.G
      ),
      new Recipe([CommandName.Blizzard, CommandName.Blizzara], FamilyType.E),
      new Recipe([CommandName.Blizzara, CommandName.Blizzara], FamilyType.F),
    ]
  ),

  [CommandName.TripleBlizzaga]: new Command(
    CommandName.TripleBlizzaga,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.Blitz, CommandName.Blizzaga], FamilyType.G),
      new Recipe([CommandName.Blizzara, CommandName.Blizzaga], FamilyType.E),
      new Recipe([CommandName.Blizzaga, CommandName.Blizzaga], FamilyType.F),
    ]
  ),

  [CommandName.Thunder]: new Command(CommandName.Thunder, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Thundara]: new Command(
    CommandName.Thundara,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.StunEdge, CommandName.Thunder], FamilyType.K),
      new Recipe([CommandName.Thunder, CommandName.Thunder], FamilyType.I),
      new Recipe([CommandName.ZeroGravity, CommandName.Magnet], FamilyType.L),
    ]
  ),

  [CommandName.Thundaga]: new Command(
    CommandName.Thundaga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.BindingStrike, CommandName.Thundara],
        FamilyType.K,
        90
      ),
      new Recipe([CommandName.Thunder, CommandName.Thundara], FamilyType.I, 90),
      new Recipe(
        [CommandName.Thundara, CommandName.Thundara],
        FamilyType.J,
        90
      ),
    ]
  ),

  [CommandName.ThundagaShot]: new Command(
    CommandName.ThundagaShot,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.StrikeRaid, CommandName.Thundaga],
        FamilyType.I,
        85
      ),
      new Recipe(
        [CommandName.FreezeRaid, CommandName.Thundaga],
        FamilyType.E,
        85
      ),
      new Recipe([CommandName.Firaga, CommandName.Thundaga], FamilyType.A, 85),
    ]
  ),

  [CommandName.Cure]: new Command(CommandName.Cure, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Cura]: new Command(
    CommandName.Cura,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Thunder, CommandName.Cure], FamilyType.I),
      new Recipe([CommandName.Cure, CommandName.Cure], FamilyType.M),
      new Recipe([CommandName.Cure, CommandName.Aero], FamilyType.O),
    ]
  ),

  [CommandName.Curaga]: new Command(
    CommandName.Curaga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Cure, CommandName.Cura], FamilyType.M),
      new Recipe([CommandName.Cura, CommandName.Cura], FamilyType.N),
    ]
  ),

  [CommandName.Esuna]: new Command(CommandName.Esuna, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.MineShield]: new Command(
    CommandName.MineShield,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Fira, CommandName.ZeroGravity], FamilyType.A),
      new Recipe([CommandName.Fira, CommandName.Block], FamilyType.C),
      new Recipe([CommandName.Ignite, CommandName.Stop], FamilyType.D),
      new Recipe([CommandName.Stopra, CommandName.Block], FamilyType.M),
    ]
  ),

  [CommandName.MineSquare]: new Command(
    CommandName.MineSquare,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Fira, CommandName.Stop], FamilyType.A),
      new Recipe([CommandName.Aerora, CommandName.Ignite], FamilyType.D),
    ]
  ),

  [CommandName.SeekerMine]: new Command(
    CommandName.SeekerMine,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.MineShield, CommandName.MineSquare],
        FamilyType.B
      ),
      new Recipe([CommandName.MineShield, CommandName.Magnega], FamilyType.C),
      new Recipe([CommandName.MineSquare, CommandName.Magnega], FamilyType.D),
    ]
  ),

  [CommandName.ZeroGravity]: new Command(
    CommandName.ZeroGravity,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.ZeroGravira]: new Command(
    CommandName.ZeroGravira,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.Thunder, CommandName.ZeroGravity],
        FamilyType.I,
        90
      ),
      new Recipe(
        [CommandName.ZeroGravity, CommandName.ZeroGravity],
        FamilyType.M,
        90
      ),
      new Recipe([CommandName.Magnet, CommandName.Aero], FamilyType.P, 90),
    ]
  ),

  [CommandName.ZeroGraviga]: new Command(
    CommandName.ZeroGraviga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.Thundara, CommandName.ZeroGravira],
        FamilyType.I,
        80
      ),
      new Recipe(
        [CommandName.ZeroGravity, CommandName.ZeroGravira],
        FamilyType.M,
        80
      ),
      new Recipe(
        [CommandName.ZeroGravira, CommandName.ZeroGravira],
        FamilyType.N,
        80
      ),
    ]
  ),

  [CommandName.Magnet]: new Command(
    CommandName.Magnet,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    []
  ),

  [CommandName.Magnera]: new Command(
    CommandName.Magnera,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.StunEdge, CommandName.Magnet], FamilyType.K),
      new Recipe([CommandName.Thunder, CommandName.Magnet], FamilyType.I),
      new Recipe([CommandName.Magnet, CommandName.Magnet], FamilyType.M),
    ]
  ),

  [CommandName.Magnega]: new Command(
    CommandName.Magnega,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Magnet, CommandName.Magnera], FamilyType.I),
      new Recipe([CommandName.Magnera, CommandName.Magnera], FamilyType.J),
    ]
  ),

  [CommandName.MunnyMagnet]: new Command(
    CommandName.MunnyMagnet,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.WishingEdge, CommandName.Magnera], FamilyType.K),
      new Recipe([CommandName.Thundara, CommandName.Magnera], FamilyType.I),
    ]
  ),

  [CommandName.EnergyMagnet]: new Command(
    CommandName.EnergyMagnet,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.Cure, CommandName.Magnera], FamilyType.M),
      new Recipe([CommandName.Cura, CommandName.Magnera], FamilyType.N),
    ]
  ),

  [CommandName.DLinkMagnet]: new Command(
    CommandName.DLinkMagnet,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.ZeroGravira, CommandName.Magnera], FamilyType.L),
      new Recipe([CommandName.Magnera, CommandName.Magnera], FamilyType.I),
      new Recipe([CommandName.Magnera, CommandName.Stopra], FamilyType.I),
    ]
  ),

  [CommandName.Aero]: new Command(
    CommandName.Aero,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    []
  ),

  [CommandName.Aerora]: new Command(
    CommandName.Aerora,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.QuickBlitz, CommandName.Aero], FamilyType.G, 95),
      new Recipe([CommandName.Thunder, CommandName.Aero], FamilyType.I, 95),
      new Recipe([CommandName.Aero, CommandName.Aero], FamilyType.E, 95),
    ]
  ),

  [CommandName.Aeroga]: new Command(
    CommandName.Aeroga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Aerora],
        FamilyType.O,
        90
      ),
      new Recipe([CommandName.Aero, CommandName.Aerora], FamilyType.M, 90),
      new Recipe([CommandName.Aerora, CommandName.Aerora], FamilyType.N, 90),
    ]
  ),

  [CommandName.Warp]: new Command(
    CommandName.Warp,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.Thundara, CommandName.ZeroGravira],
        FamilyType.I,
        20
      ),
      new Recipe(
        [CommandName.ZeroGravity, CommandName.ZeroGravira],
        FamilyType.M,
        20
      ),
      new Recipe(
        [CommandName.ZeroGravira, CommandName.ZeroGravira],
        FamilyType.N,
        20
      ),
      new Recipe(
        [CommandName.Thunder, CommandName.ZeroGravity],
        FamilyType.I,
        10
      ),
      new Recipe([CommandName.Magnet, CommandName.Aero], FamilyType.P, 10),
      new Recipe(
        [CommandName.ZeroGravity, CommandName.ZeroGravity],
        FamilyType.M,
        10
      ),
    ]
  ),

  [CommandName.Faith]: new Command(
    CommandName.Faith,
    CommandType.Magic,
    [Character.Ventus],
    [new Recipe([CommandName.WindRaid, CommandName.BreakTime], FamilyType.N)]
  ),

  [CommandName.DeepFreeze]: new Command(
    CommandName.DeepFreeze,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.FreezeRaid, CommandName.Blizzaga], FamilyType.G),
      new Recipe(
        [CommandName.BindingStrike, CommandName.Blizzaga],
        FamilyType.H
      ),
    ]
  ),

  [CommandName.Glacier]: new Command(
    CommandName.Glacier,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.Blizzaga, CommandName.DeepFreeze], FamilyType.E),
      new Recipe(
        [CommandName.TripleBlizzaga, CommandName.DeepFreeze],
        FamilyType.F
      ),
    ]
  ),

  [CommandName.IceBarrage]: new Command(
    CommandName.IceBarrage,
    CommandType.Magic,
    [Character.Aqua]
  ),

  [CommandName.Tornado]: new Command(
    CommandName.Tornado,
    CommandType.Magic,
    [Character.Ventus],
    [
      new Recipe([CommandName.Magnega, CommandName.Aeroga], FamilyType.N),
      new Recipe(
        [CommandName.QuickBlitz, CommandName.Aerora],
        FamilyType.O,
        10
      ),
      new Recipe([CommandName.Aero, CommandName.Aerora], FamilyType.M, 10),
      new Recipe([CommandName.Aerora, CommandName.Aerora], FamilyType.N, 10),
      new Recipe([CommandName.QuickBlitz, CommandName.Aero], FamilyType.G, 5),
      new Recipe([CommandName.Thunder, CommandName.Aero], FamilyType.I, 5),
      new Recipe([CommandName.Aero, CommandName.Aero], FamilyType.E, 5),
    ]
  ),

  [CommandName.FiragaBurst]: new Command(
    CommandName.FiragaBurst,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe([CommandName.Fira, CommandName.Aeroga], FamilyType.A, 20),
      new Recipe([CommandName.Firaga, CommandName.Aerora], FamilyType.A, 20),
      new Recipe([CommandName.Firaga, CommandName.Aeroga], FamilyType.B, 20),
      new Recipe([CommandName.Firaga, CommandName.Slow], FamilyType.A, 20),
      new Recipe([CommandName.Firaga, CommandName.Stopra], FamilyType.D, 20),
      new Recipe([CommandName.Firaga, CommandName.Stopga], FamilyType.B, 20),
    ]
  ),

  [CommandName.RagingStorm]: new Command(
    CommandName.RagingStorm,
    CommandType.Magic,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.FissionFiraga, CommandName.FiragaBurst],
        FamilyType.B
      ),
      new Recipe([CommandName.Blitz, CommandName.Firaga], FamilyType.D, 10),
      new Recipe([CommandName.FireDash, CommandName.Fira], FamilyType.D, 10),
      new Recipe(
        [CommandName.FireSurge, CommandName.Cartwheel],
        FamilyType.C,
        10
      ),
      new Recipe([CommandName.Fire, CommandName.Fira], FamilyType.A, 10),
      new Recipe([CommandName.Fira, CommandName.Fira], FamilyType.B, 10),
      new Recipe([CommandName.Fira, CommandName.Firaga], FamilyType.A, 10),
      new Recipe([CommandName.Firaga, CommandName.Firaga], FamilyType.B, 10),
    ]
  ),

  [CommandName.MegaFlare]: new Command(
    CommandName.MegaFlare,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.FissionFiraga, CommandName.CrawlingFire],
        FamilyType.B
      ),
    ]
  ),

  [CommandName.Quake]: new Command(
    CommandName.Quake,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.BrutalBlast, CommandName.ZeroGraviga],
        FamilyType.B,
        90
      ),
      new Recipe(
        [CommandName.BrutalBlast, CommandName.Magnega],
        FamilyType.C,
        90
      ),
      new Recipe(
        [CommandName.StunEdge, CommandName.MineShield],
        FamilyType.O,
        30
      ),
      new Recipe(
        [CommandName.BindingStrike, CommandName.MineSquare],
        FamilyType.L,
        30
      ),
      new Recipe(
        [CommandName.BrutalBlast, CommandName.BrutalBlast],
        FamilyType.N,
        30
      ),
    ]
  ),

  [CommandName.Meteor]: new Command(
    CommandName.Meteor,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.GeoImpact, CommandName.Quake], FamilyType.B),
      new Recipe(
        [CommandName.BrutalBlast, CommandName.ZeroGraviga],
        FamilyType.B,
        10
      ),
      new Recipe(
        [CommandName.BrutalBlast, CommandName.Magnega],
        FamilyType.C,
        10
      ),
    ]
  ),

  [CommandName.Transcendence]: new Command(
    CommandName.Transcendence,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.MagnetSpiral, CommandName.ZeroGraviga],
        FamilyType.J
      ),
    ]
  ),

  [CommandName.Mini]: new Command(
    CommandName.Mini,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Magnera, CommandName.Warp], FamilyType.N),
      new Recipe([CommandName.Magnega, CommandName.Magnega], FamilyType.J),
      new Recipe([CommandName.Magnega, CommandName.Bind], FamilyType.I),
    ]
  ),

  [CommandName.Blackout]: new Command(
    CommandName.Blackout,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.ZeroGravity, CommandName.Confuse], FamilyType.M),
      new Recipe([CommandName.ZeroGravira, CommandName.Confuse], FamilyType.N),
      new Recipe([CommandName.ZeroGravira, CommandName.Poison], FamilyType.P),
    ]
  ),

  [CommandName.Ignite]: new Command(
    CommandName.Ignite,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Fire, CommandName.Bind], FamilyType.A),
      new Recipe([CommandName.Fira, CommandName.Bind], FamilyType.C),
    ]
  ),

  [CommandName.Confuse]: new Command(CommandName.Confuse, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Bind]: new Command(CommandName.Bind, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Poison]: new Command(CommandName.Poison, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Slow]: new Command(CommandName.Slow, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Stop]: new Command(CommandName.Stop, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  [CommandName.Stopra]: new Command(
    CommandName.Stopra,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Slow, CommandName.Slow], FamilyType.L),
      new Recipe([CommandName.Slow, CommandName.Stop], FamilyType.K),
      new Recipe([CommandName.Stop, CommandName.Stop], FamilyType.I),
    ]
  ),

  [CommandName.Stopga]: new Command(
    CommandName.Stopga,
    CommandType.Magic,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Stop, CommandName.Stopra], FamilyType.I),
      new Recipe([CommandName.Stopra, CommandName.Stopra], FamilyType.J),
    ]
  ),

  [CommandName.Sleep]: new Command(CommandName.Sleep, CommandType.Magic, [
    Character.Terra,
    Character.Ventus,
    Character.Aqua,
  ]),

  // Movement Commands
  [CommandName.Jump]: new Command(
    CommandName.Jump,
    CommandType.Movement,
    [Character.Terra, Character.Ventus, Character.Aqua],
    []
  ),

  [CommandName.HighJump]: new Command(
    CommandName.HighJump,
    CommandType.Movement,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.DodgeRoll]: new Command(
    CommandName.DodgeRoll,
    CommandType.Movement,
    [Character.Ventus]
  ),

  [CommandName.ThunderRoll]: new Command(
    CommandName.ThunderRoll,
    CommandType.Movement,
    [Character.Ventus],
    [
      new Recipe(
        [CommandName.ThunderSurge, CommandName.DodgeRoll],
        FamilyType.P,
        80
      ),
      new Recipe(
        [CommandName.Thundaga, CommandName.DodgeRoll],
        FamilyType.L,
        80
      ),
      new Recipe(
        [CommandName.StunBlock, CommandName.DodgeRoll],
        FamilyType.L,
        80
      ),
    ]
  ),

  [CommandName.AirSlide]: new Command(
    CommandName.AirSlide,
    CommandType.Movement,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.IceSlide]: new Command(
    CommandName.IceSlide,
    CommandType.Movement,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.AirSlide],
        FamilyType.F
      ),
      new Recipe([CommandName.Blizzaga, CommandName.AirSlide], FamilyType.H),
    ]
  ),

  [CommandName.Reversal]: new Command(
    CommandName.Reversal,
    CommandType.Movement,
    [Character.Ventus]
  ),

  [CommandName.Glide]: new Command(CommandName.Glide, CommandType.Movement, [
    Character.Ventus,
  ]),

  [CommandName.Superglide]: new Command(
    CommandName.Superglide,
    CommandType.Movement,
    [Character.Ventus]
  ),

  [CommandName.FireGlide]: new Command(
    CommandName.FireGlide,
    CommandType.Movement,
    [Character.Ventus],
    [
      new Recipe([CommandName.FireSurge, CommandName.Glide], FamilyType.C),
      new Recipe([CommandName.Firaga, CommandName.Glide], FamilyType.B),
    ]
  ),

  [CommandName.Cartwheel]: new Command(
    CommandName.Cartwheel,
    CommandType.Movement,
    [Character.Aqua]
  ),

  [CommandName.Firewheel]: new Command(
    CommandName.Firewheel,
    CommandType.Movement,
    [Character.Aqua],
    [
      new Recipe([CommandName.Firaga, CommandName.Cartwheel], FamilyType.B),
      new Recipe(
        [CommandName.FissionFiraga, CommandName.Cartwheel],
        FamilyType.B
      ),
      new Recipe(
        [CommandName.FireSurge, CommandName.Cartwheel],
        FamilyType.C,
        90
      ),
    ]
  ),

  [CommandName.HomingSlide]: new Command(
    CommandName.HomingSlide,
    CommandType.Movement,
    [Character.Ventus],
    [
      new Recipe([CommandName.SlidingDash, CommandName.Magnera], FamilyType.P),
      new Recipe([CommandName.SlidingDash, CommandName.AirSlide], FamilyType.C),
      new Recipe([CommandName.Magnet, CommandName.AirSlide], FamilyType.L),
    ]
  ),

  [CommandName.SonicImpact]: new Command(
    CommandName.SonicImpact,
    CommandType.Movement,
    [Character.Terra]
  ),

  [CommandName.Slide]: new Command(
    CommandName.Slide,
    CommandType.Movement,
    [Character.Terra],
    []
  ),

  [CommandName.Teleport]: new Command(
    CommandName.Teleport,
    CommandType.Movement,
    [Character.Aqua]
  ),

  [CommandName.Doubleflight]: new Command(
    CommandName.Doubleflight,
    CommandType.Movement,
    [Character.Aqua]
  ),

  // Defense Commands
  [CommandName.Block]: new Command(
    CommandName.Block,
    CommandType.Defense,
    [Character.Terra, Character.Ventus, Character.Aqua],
    []
  ),

  [CommandName.RenewalBlock]: new Command(
    CommandName.RenewalBlock,
    CommandType.Defense,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Curaga, CommandName.Block], FamilyType.P),
      new Recipe([CommandName.Esuna, CommandName.Block], FamilyType.C),
    ]
  ),

  [CommandName.FocusBlock]: new Command(
    CommandName.FocusBlock,
    CommandType.Defense,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.StunBlock]: new Command(
    CommandName.StunBlock,
    CommandType.Defense,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.StunEdge, CommandName.Block], FamilyType.L),
      new Recipe([CommandName.Thundaga, CommandName.Block], FamilyType.I),
    ]
  ),

  [CommandName.PoisonBlock]: new Command(
    CommandName.PoisonBlock,
    CommandType.Defense,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.PoisonEdge, CommandName.Block], FamilyType.H, 80),
      new Recipe([CommandName.Poison, CommandName.Block], FamilyType.P, 80),
    ]
  ),

  [CommandName.Barrier]: new Command(CommandName.Barrier, CommandType.Defense, [
    Character.Aqua,
  ]),

  [CommandName.RenewalBarrier]: new Command(
    CommandName.RenewalBarrier,
    CommandType.Defense,
    [Character.Aqua],
    [
      new Recipe([CommandName.Curaga, CommandName.Barrier], FamilyType.P),
      new Recipe([CommandName.Esuna, CommandName.Barrier], FamilyType.N),
    ]
  ),

  [CommandName.FocusBarrier]: new Command(
    CommandName.FocusBarrier,
    CommandType.Defense,
    [Character.Aqua]
  ),

  [CommandName.ConfuseBarrier]: new Command(
    CommandName.ConfuseBarrier,
    CommandType.Defense,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.ConfusionStrike, CommandName.Barrier],
        FamilyType.C
      ),
      new Recipe([CommandName.Confuse, CommandName.Barrier], FamilyType.L),
    ]
  ),

  [CommandName.StopBarrier]: new Command(
    CommandName.StopBarrier,
    CommandType.Defense,
    [Character.Aqua],
    [new Recipe([CommandName.Stopga, CommandName.Barrier], FamilyType.C)]
  ),

  // Reprisal Commands
  [CommandName.CounterHammer]: new Command(
    CommandName.CounterHammer,
    CommandType.Reprisal,
    [Character.Terra]
  ),

  [CommandName.CounterRush]: new Command(
    CommandName.CounterRush,
    CommandType.Reprisal,
    [Character.Ventus]
  ),

  [CommandName.ReversalSlash]: new Command(
    CommandName.ReversalSlash,
    CommandType.Reprisal,
    [Character.Ventus]
  ),

  [CommandName.PaybackFang]: new Command(
    CommandName.PaybackFang,
    CommandType.Reprisal,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.SlidingDash, CommandName.CounterHammer],
        FamilyType.P
      ),
    ]
  ),

  [CommandName.PaybackRaid]: new Command(
    CommandName.PaybackRaid,
    CommandType.Reprisal,
    [Character.Ventus],
    [
      new Recipe(
        [CommandName.SlidingDash, CommandName.StrikeRaid],
        FamilyType.P
      ),
    ]
  ),

  [CommandName.CounterBlast]: new Command(
    CommandName.CounterBlast,
    CommandType.Reprisal,
    [Character.Aqua]
  ),

  [CommandName.PaybackSurge]: new Command(
    CommandName.PaybackSurge,
    CommandType.Reprisal,
    [Character.Aqua],
    [
      new Recipe(
        [CommandName.SlidingDash, CommandName.FireSurge],
        FamilyType.C
      ),
      new Recipe(
        [CommandName.SlidingDash, CommandName.ThunderSurge],
        FamilyType.L
      ),
    ]
  ),

  [CommandName.AerialRecovery]: new Command(
    CommandName.AerialRecovery,
    CommandType.Reprisal,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  // Shotlock Commands
  [CommandName.MeteorShower]: new Command(
    CommandName.MeteorShower,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.FlameSalvo]: new Command(
    CommandName.FlameSalvo,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.ChaosSnake]: new Command(
    CommandName.ChaosSnake,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.DarkVolley]: new Command(
    CommandName.DarkVolley,
    CommandType.Shotlock,
    [Character.Terra]
  ),

  [CommandName.Ragnarok]: new Command(
    CommandName.Ragnarok,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.Thunderstorm]: new Command(
    CommandName.Thunderstorm,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.BioBarrage]: new Command(
    CommandName.BioBarrage,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.PoisonEdge, CommandName.Block], FamilyType.P, 20),
      new Recipe([CommandName.Poison, CommandName.Block], FamilyType.P, 20),
      new Recipe([CommandName.QuickBlitz, CommandName.Poison], FamilyType.P, 5),
      new Recipe(
        [CommandName.SlidingDash, CommandName.Poison],
        FamilyType.P,
        5
      ),
      new Recipe([CommandName.StrikeRaid, CommandName.Poison], FamilyType.P, 5),
    ]
  ),

  [CommandName.PulseBomb]: new Command(
    CommandName.PulseBomb,
    CommandType.Shotlock,
    [Character.Ventus]
  ),

  [CommandName.BubbleBlaster]: new Command(
    CommandName.BubbleBlaster,
    CommandType.Shotlock,
    [Character.Aqua]
  ),

  [CommandName.PrismRain]: new Command(
    CommandName.PrismRain,
    CommandType.Shotlock,
    [Character.Aqua]
  ),

  [CommandName.PhotonCharge]: new Command(
    CommandName.PhotonCharge,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.AbsoluteZero]: new Command(
    CommandName.AbsoluteZero,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua]
  ),

  [CommandName.LightningRay]: new Command(
    CommandName.LightningRay,
    CommandType.Shotlock,
    [Character.Terra, Character.Ventus, Character.Aqua],
    [
      new Recipe([CommandName.Blitz, CommandName.DarkHaze], FamilyType.L, 10),
      new Recipe([CommandName.Blitz, CommandName.AirSlide], FamilyType.L, 10),
      new Recipe(
        [CommandName.FireDash, CommandName.ThunderSurge],
        FamilyType.L,
        10
      ),
      new Recipe(
        [CommandName.BindingStrike, CommandName.Thundara],
        FamilyType.L,
        10
      ),
      new Recipe([CommandName.Thunder, CommandName.Thundara], FamilyType.L, 10),
      new Recipe(
        [CommandName.Thundara, CommandName.Thundara],
        FamilyType.L,
        10
      ),
    ]
  ),

  [CommandName.SonicShadow]: new Command(
    CommandName.SonicShadow,
    CommandType.Shotlock,
    [Character.Terra]
  ),

  [CommandName.Multivortex]: new Command(
    CommandName.Multivortex,
    CommandType.Shotlock,
    [Character.Ventus]
  ),

  [CommandName.Lightbloom]: new Command(
    CommandName.Lightbloom,
    CommandType.Shotlock,
    [Character.Aqua]
  ),

  [CommandName.UltimaCannon]: new Command(
    CommandName.UltimaCannon,
    CommandType.Shotlock,
    [Character.Terra]
  ),
};

export { CommandName, CommandType, commands };
