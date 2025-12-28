import { Character } from "./Characters.model.js";
import { FamilyType } from "./Families.model.js";

enum CommandName {
  // Attack Commands
  QuickBlitz,
  Blitz,
  MeteorCrash,
  SlidingDash,
  FireDash,
  DarkHaze,
  SonicBlade,
  ChaosBlade,
  Zantetsuken,
  StrikeRaid,
  FreezeRaid,
  FireSurge,
  ThunderSurge,
  AerialSlam,
  ArsSolum,
  PoisonEdge,
  BlizzardEdge,
  StunEdge,
  SlotEdge,
  FireStrike,
  ConfusionStrike,
  BindingStrike,
  BrutalBlast,
  MagnetSpiral,
  Windcutter,
  LimitStorm,
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
  CrawlingFire,
  Blizzard,
  Blizzara,
  Blizzaga,
  Thunder,
  Thundara,
  Thundaga,
  Cure,
  Cura,
  Curaga,
  Esuna,
  MineShield,
  MineSquare,
  ZeroGravity,
  ZeroGravira,
  ZeroGraviga,
  Magnet,
  Magnera,
  Magnega,
  Aero,
  Aerora,
  Aeroga,
  Warp,
  DeepFreeze,
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
  AirSlide,
  IceSlide,
  SonicImpact,
  Slide,

  // Defense Commands
  Block,
  RenewalBlock,
  FocusBlock,
  StunBlock,
  PoisonBlock,

  // Reprisal Commands
  CounterHammer,
  PaybackFang,
  AerialRecovery,

  // Shotlock Commands
  MeteorShower,
  FlameSalvo,
  ChaosSnake,
  DarkVolley,
  Ragnarok,
  Thunderstorm,
  BioBarrage,
  PhotonCharge,
  AbsoluteZero,
  LightningRay,
  SonicShadow,
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
  ingedients: [CommandName, CommandName];
  family: FamilyType;
  chance?: number;

  constructor(
    ingedients: [CommandName, CommandName],
    family: FamilyType,
    chance?: number
  ) {
    this.ingedients = ingedients;
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

const commands: Command[] = [
  // Attack Commands
  new Command(CommandName.QuickBlitz, CommandType.Attack, [Character.Terra]),

  new Command(
    CommandName.Blitz,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
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

  new Command(CommandName.SlidingDash, CommandType.Attack, [Character.Terra]),

  new Command(
    CommandName.FireDash,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.SlidingDash, CommandName.Fira], FamilyType.C),
      new Recipe([CommandName.SlidingDash, CommandName.Fire], FamilyType.D),
      new Recipe([CommandName.ConfusionStrike, CommandName.Fire], FamilyType.D),
    ]
  ),

  new Command(
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

  new Command(
    CommandName.SonicBlade,
    CommandType.Attack,
    [Character.Terra],
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
  new Command(
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

  new Command(
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

  new Command(
    CommandName.StrikeRaid,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.QuickBlitz, CommandName.SlidingDash],
        FamilyType.O
      ),
    ]
  ),

  new Command(
    CommandName.FreezeRaid,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.StrikeRaid, CommandName.Blizzara], FamilyType.I),
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.BindingStrike],
        FamilyType.K
      ),
    ]
  ),

  new Command(
    CommandName.FireSurge,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.FireStrike, CommandName.Fira], FamilyType.A),
      new Recipe([CommandName.FireDash, CommandName.Ignite], FamilyType.D),
      new Recipe([CommandName.BindingStrike, CommandName.Fira], FamilyType.K),
      new Recipe([CommandName.ConfusionStrike, CommandName.Fira], FamilyType.O),
    ]
  ),

  new Command(
    CommandName.ThunderSurge,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
    CommandName.AerialSlam,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
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

  new Command(
    CommandName.PoisonEdge,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
    CommandName.BlizzardEdge,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
    CommandName.StunEdge,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
    CommandName.SlotEdge,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
    CommandName.FireStrike,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.PoisonEdge, CommandName.Fira], FamilyType.D),
      new Recipe([CommandName.StunEdge, CommandName.Fire], FamilyType.K),
    ]
  ),

  new Command(
    CommandName.ConfusionStrike,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.QuickBlitz, CommandName.Confuse], FamilyType.O),
      new Recipe(
        [CommandName.SlidingDash, CommandName.ZeroGravity],
        FamilyType.K
      ),
      new Recipe([CommandName.StrikeRaid, CommandName.Confuse], FamilyType.G),
    ]
  ),

  new Command(
    CommandName.BindingStrike,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.QuickBlitz, CommandName.Bind], FamilyType.K),
      new Recipe([CommandName.StrikeRaid, CommandName.Bind], FamilyType.O),
      new Recipe([CommandName.StunEdge, CommandName.ZeroGravity], FamilyType.I),
    ]
  ),

  new Command(
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

  new Command(
    CommandName.MagnetSpiral,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
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

  new Command(
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

  new Command(
    CommandName.CollisionMagnet,
    CommandType.Attack,
    [Character.Terra],
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

  new Command(
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

  new Command(
    CommandName.Sacrifice,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.DarkHaze, CommandName.Warp], FamilyType.B),
      new Recipe([CommandName.PoisonEdge, CommandName.Warp], FamilyType.D),
    ]
  ),

  new Command(
    CommandName.BreakTime,
    CommandType.Attack,
    [Character.Terra],
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
  new Command(CommandName.Fire, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.Fira,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.FireDash, CommandName.Fire], FamilyType.D),
      new Recipe([CommandName.FireStrike, CommandName.Fire], FamilyType.D),
      new Recipe([CommandName.Fire, CommandName.Fire], FamilyType.A),
      new Recipe([CommandName.Fire, CommandName.Ignite], FamilyType.C),
    ]
  ),

  new Command(
    CommandName.Firaga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.FireDash, CommandName.Fira], FamilyType.D, 90),
      new Recipe([CommandName.Fire, CommandName.Fira], FamilyType.A, 90),
      new Recipe([CommandName.Fira, CommandName.Fira], FamilyType.B, 90),
    ]
  ),

  new Command(
    CommandName.DarkFiraga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.DarkHaze, CommandName.Firaga], FamilyType.D),
      new Recipe([CommandName.Firaga, CommandName.Blackout], FamilyType.B),
    ]
  ),

  new Command(
    CommandName.FissionFiraga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Fira, CommandName.Aeroga], FamilyType.A, 80),
      new Recipe([CommandName.Firaga, CommandName.Aerora], FamilyType.A, 80),
      new Recipe([CommandName.Firaga, CommandName.Aeroga], FamilyType.B, 80),
    ]
  ),

  new Command(
    CommandName.CrawlingFire,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Firaga, CommandName.Slow], FamilyType.A, 80),
      new Recipe([CommandName.Firaga, CommandName.Stopra], FamilyType.D, 80),
      new Recipe([CommandName.Firaga, CommandName.Stopga], FamilyType.B, 80),
    ]
  ),

  new Command(CommandName.Blizzard, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.Blizzara,
    CommandType.Magic,
    [Character.Terra],
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

  new Command(
    CommandName.Blizzaga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.Blizzara],
        FamilyType.G
      ),
      new Recipe([CommandName.Blizzard, CommandName.Blizzara], FamilyType.E),
      new Recipe([CommandName.Blizzara, CommandName.Blizzara], FamilyType.F),
    ]
  ),

  new Command(CommandName.Thunder, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.Thundara,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.StunEdge, CommandName.Thunder], FamilyType.K),
      new Recipe([CommandName.Thunder, CommandName.Thunder], FamilyType.I),
      new Recipe([CommandName.ZeroGravity, CommandName.Magnet], FamilyType.L),
    ]
  ),

  new Command(
    CommandName.Thundaga,
    CommandType.Magic,
    [Character.Terra],
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

  new Command(CommandName.Cure, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.Cura,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Thunder, CommandName.Cure], FamilyType.I),
      new Recipe([CommandName.Cure, CommandName.Cure], FamilyType.M),
      new Recipe([CommandName.Cure, CommandName.Aero], FamilyType.O),
    ]
  ),

  new Command(
    CommandName.Curaga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Cure, CommandName.Cura], FamilyType.M),
      new Recipe([CommandName.Cura, CommandName.Cura], FamilyType.N),
    ]
  ),

  new Command(CommandName.Esuna, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.MineShield,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Fira, CommandName.ZeroGravity], FamilyType.A),
      new Recipe([CommandName.Fira, CommandName.Block], FamilyType.C),
      new Recipe([CommandName.Ignite, CommandName.Stop], FamilyType.D),
      new Recipe([CommandName.Stopra, CommandName.Block], FamilyType.M),
    ]
  ),

  new Command(
    CommandName.MineSquare,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Fira, CommandName.Stop], FamilyType.A),
      new Recipe([CommandName.Aerora, CommandName.Ignite], FamilyType.D),
    ]
  ),

  new Command(CommandName.ZeroGravity, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.ZeroGravira,
    CommandType.Magic,
    [Character.Terra],
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

  new Command(
    CommandName.ZeroGraviga,
    CommandType.Magic,
    [Character.Terra],
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

  new Command(CommandName.Magnet, CommandType.Magic, [Character.Terra], []),

  new Command(
    CommandName.Magnera,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.StunEdge, CommandName.Magnet], FamilyType.K),
      new Recipe([CommandName.Thunder, CommandName.Magnet], FamilyType.I),
      new Recipe([CommandName.Magnet, CommandName.Magnet], FamilyType.M),
    ]
  ),

  new Command(
    CommandName.Magnega,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Magnet, CommandName.Magnera], FamilyType.I),
      new Recipe([CommandName.Magnera, CommandName.Magnera], FamilyType.J),
    ]
  ),

  new Command(CommandName.Aero, CommandType.Magic, [Character.Terra], []),

  new Command(
    CommandName.Aerora,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.QuickBlitz, CommandName.Aero], FamilyType.G, 95),
      new Recipe([CommandName.Thunder, CommandName.Aero], FamilyType.I, 95),
      new Recipe([CommandName.Aero, CommandName.Aero], FamilyType.E, 95),
    ]
  ),

  new Command(
    CommandName.Aeroga,
    CommandType.Magic,
    [Character.Terra],
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

  new Command(
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

  new Command(
    CommandName.DeepFreeze,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.FreezeRaid, CommandName.Blizzaga], FamilyType.G),
      new Recipe(
        [CommandName.BindingStrike, CommandName.Blizzaga],
        FamilyType.H
      ),
    ]
  ),

  new Command(
    CommandName.MegaFlare,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.FissionFiraga, CommandName.CrawlingFire],
        FamilyType.B
      ),
    ]
  ),

  new Command(
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

  new Command(
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

  new Command(
    CommandName.Transcendence,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.MagnetSpiral, CommandName.ZeroGraviga],
        FamilyType.J
      ),
    ]
  ),

  new Command(
    CommandName.Mini,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Magnera, CommandName.Warp], FamilyType.N),
      new Recipe([CommandName.Magnega, CommandName.Magnega], FamilyType.J),
      new Recipe([CommandName.Magnega, CommandName.Bind], FamilyType.I),
    ]
  ),

  new Command(
    CommandName.Blackout,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.ZeroGravity, CommandName.Confuse], FamilyType.M),
      new Recipe([CommandName.ZeroGravira, CommandName.Confuse], FamilyType.N),
      new Recipe([CommandName.ZeroGravira, CommandName.Poison], FamilyType.P),
    ]
  ),

  new Command(
    CommandName.Ignite,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Fire, CommandName.Bind], FamilyType.A),
      new Recipe([CommandName.Fira, CommandName.Bind], FamilyType.C),
    ]
  ),

  new Command(CommandName.Confuse, CommandType.Magic, [Character.Terra]),

  new Command(CommandName.Bind, CommandType.Magic, [Character.Terra]),

  new Command(CommandName.Poison, CommandType.Magic, [Character.Terra]),

  new Command(CommandName.Slow, CommandType.Magic, [Character.Terra]),

  new Command(CommandName.Stop, CommandType.Magic, [Character.Terra]),

  new Command(
    CommandName.Stopra,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Slow, CommandName.Slow], FamilyType.L),
      new Recipe([CommandName.Slow, CommandName.Stop], FamilyType.K),
      new Recipe([CommandName.Stop, CommandName.Stop], FamilyType.I),
    ]
  ),

  new Command(
    CommandName.Stopga,
    CommandType.Magic,
    [Character.Terra],
    [
      new Recipe([CommandName.Stop, CommandName.Stopra], FamilyType.I),
      new Recipe([CommandName.Stopra, CommandName.Stopra], FamilyType.J),
    ]
  ),

  new Command(CommandName.Sleep, CommandType.Magic, [Character.Terra]),

  // Movement Commands
  new Command(CommandName.Jump, CommandType.Movement, [Character.Terra], []),

  new Command(CommandName.HighJump, CommandType.Movement, [Character.Terra]),

  new Command(CommandName.AirSlide, CommandType.Movement, [Character.Terra]),

  new Command(
    CommandName.IceSlide,
    CommandType.Movement,
    [Character.Terra],
    [
      new Recipe(
        [CommandName.BlizzardEdge, CommandName.AirSlide],
        FamilyType.F
      ),
      new Recipe([CommandName.Blizzaga, CommandName.AirSlide], FamilyType.H),
    ]
  ),

  new Command(CommandName.SonicImpact, CommandType.Movement, [Character.Terra]),

  new Command(CommandName.Slide, CommandType.Movement, [Character.Terra], []),

  // Defense Commands
  new Command(CommandName.Block, CommandType.Defense, [Character.Terra], []),

  new Command(
    CommandName.RenewalBlock,
    CommandType.Defense,
    [Character.Terra],
    [
      new Recipe([CommandName.Curaga, CommandName.Block], FamilyType.P),
      new Recipe([CommandName.Esuna, CommandName.Block], FamilyType.C),
    ]
  ),

  new Command(CommandName.FocusBlock, CommandType.Defense, [Character.Terra]),

  new Command(
    CommandName.StunBlock,
    CommandType.Defense,
    [Character.Terra],
    [
      new Recipe([CommandName.StunEdge, CommandName.Block], FamilyType.L),
      new Recipe([CommandName.Thundaga, CommandName.Block], FamilyType.I),
    ]
  ),

  new Command(
    CommandName.PoisonBlock,
    CommandType.Defense,
    [Character.Terra],
    [
      new Recipe([CommandName.PoisonEdge, CommandName.Block], FamilyType.H, 80),
      new Recipe([CommandName.Poison, CommandName.Block], FamilyType.P, 80),
    ]
  ),

  // Reprisal Commands
  new Command(CommandName.CounterHammer, CommandType.Reprisal, [
    Character.Terra,
  ]),

  new Command(
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

  new Command(
    CommandName.AerialRecovery,
    CommandType.Reprisal,
    [Character.Terra],
    [
      new Recipe([CommandName.Block, CommandName.AirSlide], FamilyType.I),
      new Recipe([CommandName.Block, CommandName.Jump], FamilyType.I),
    ]
  ),

  // Shotlock Commands
  new Command(CommandName.MeteorShower, CommandType.Shotlock, [
    Character.Terra,
  ]),

  new Command(CommandName.FlameSalvo, CommandType.Shotlock, [Character.Terra]),

  new Command(CommandName.ChaosSnake, CommandType.Shotlock, [Character.Terra]),

  new Command(CommandName.DarkVolley, CommandType.Shotlock, [Character.Terra]),

  new Command(CommandName.Ragnarok, CommandType.Shotlock, [Character.Terra]),

  new Command(CommandName.Thunderstorm, CommandType.Shotlock, [
    Character.Terra,
  ]),

  new Command(
    CommandName.BioBarrage,
    CommandType.Shotlock,
    [Character.Terra],
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

  new Command(CommandName.PhotonCharge, CommandType.Shotlock, [
    Character.Terra,
  ]),

  new Command(CommandName.AbsoluteZero, CommandType.Shotlock, [
    Character.Terra,
  ]),

  new Command(
    CommandName.LightningRay,
    CommandType.Shotlock,
    [Character.Terra],
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

  new Command(CommandName.SonicShadow, CommandType.Shotlock, [Character.Terra]),

  new Command(CommandName.UltimaCannon, CommandType.Shotlock, [
    Character.Terra,
  ]),
];

export { CommandName, CommandType, commands };
