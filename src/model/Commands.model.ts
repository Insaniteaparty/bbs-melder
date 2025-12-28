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
  FlameBurst,
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
    this.recipes = recipes;
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
        [CommandName.QuickBlitz, CommandName.SlotEdge],
        FamilyType.O,
        90
      ),
      new Recipe(
        [CommandName.StunEdge, CommandName.SlotEdge],
        FamilyType.K,
        90
      ),
    ]
  ),
  new Command(
    CommandName.MeteorCrash,
    CommandType.Attack,
    [Character.Terra],
    [
      new Recipe([CommandName.Blitz, CommandName.Quake], FamilyType.N),
      new Recipe(
        [CommandName.FireStrike, CommandName.BrutalBlast],
        FamilyType.D
      ),
    ]
  ),
  new Command(CommandName.SlidingDash, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.FireDash, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.DarkHaze, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.SonicBlade, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.ChaosBlade, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.Zantetsuken, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.StrikeRaid, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.FreezeRaid, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.FireSurge, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.ThunderSurge, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.AerialSlam, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.ArsSolum, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.PoisonEdge, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.BlizzardEdge, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.StunEdge, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.SlotEdge, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.FireStrike, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.ConfusionStrike, CommandType.Attack, [
    Character.Terra,
  ]),
  new Command(CommandName.BindingStrike, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.BrutalBlast, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.MagnetSpiral, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.Windcutter, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.LimitStorm, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.CollisionMagnet, CommandType.Attack, [
    Character.Terra,
  ]),
  new Command(CommandName.GeoImpact, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.Sacrifice, CommandType.Attack, [Character.Terra]),
  new Command(CommandName.BreakTime, CommandType.Attack, [Character.Terra]),

  // Magic Commands
  new Command(CommandName.Fire, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Fira, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Firaga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.DarkFiraga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.FissionFiraga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.CrawlingFire, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Blizzard, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Blizzara, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Blizzaga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Thunder, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Thundara, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Thundaga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Cure, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Cura, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Curaga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Esuna, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.MineShield, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.MineSquare, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.ZeroGravity, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.ZeroGravira, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.ZeroGraviga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Magnet, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Magnera, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Magnega, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Aero, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Aerora, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Aeroga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Warp, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.DeepFreeze, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.MegaFlare, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Quake, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Meteor, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Transcendence, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Mini, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Blackout, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Ignite, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Confuse, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Bind, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Poison, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Slow, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Stop, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Stopra, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Stopga, CommandType.Magic, [Character.Terra]),
  new Command(CommandName.Sleep, CommandType.Magic, [Character.Terra]),

  // Movement Commands
  new Command(CommandName.Jump, CommandType.Movement, [Character.Terra]),
  new Command(CommandName.HighJump, CommandType.Movement, [Character.Terra]),
  new Command(CommandName.AirSlide, CommandType.Movement, [Character.Terra]),
  new Command(CommandName.IceSlide, CommandType.Movement, [Character.Terra]),
  new Command(CommandName.SonicImpact, CommandType.Movement, [Character.Terra]),
  new Command(CommandName.Slide, CommandType.Movement, [Character.Terra]),

  // Defense Commands
  new Command(CommandName.Block, CommandType.Defense, [Character.Terra]),
  new Command(CommandName.RenewalBlock, CommandType.Defense, [Character.Terra]),
  new Command(CommandName.FocusBlock, CommandType.Defense, [Character.Terra]),
  new Command(CommandName.StunBlock, CommandType.Defense, [Character.Terra]),
  new Command(CommandName.PoisonBlock, CommandType.Defense, [Character.Terra]),

  // Reprisal Commands
  new Command(CommandName.CounterHammer, CommandType.Reprisal, [
    Character.Terra,
  ]),
  new Command(CommandName.PaybackFang, CommandType.Reprisal, [Character.Terra]),
  new Command(CommandName.AerialRecovery, CommandType.Reprisal, [
    Character.Terra,
  ]),

  // Shotlock Commands
  new Command(CommandName.MeteorShower, CommandType.Shotlock, [
    Character.Terra,
  ]),
  new Command(CommandName.FlameBurst, CommandType.Shotlock, [Character.Terra]),
  new Command(CommandName.ChaosSnake, CommandType.Shotlock, [Character.Terra]),
  new Command(CommandName.DarkVolley, CommandType.Shotlock, [Character.Terra]),
  new Command(CommandName.Ragnarok, CommandType.Shotlock, [Character.Terra]),
  new Command(CommandName.Thunderstorm, CommandType.Shotlock, [
    Character.Terra,
  ]),
  new Command(CommandName.BioBarrage, CommandType.Shotlock, [Character.Terra]),
  new Command(CommandName.PhotonCharge, CommandType.Shotlock, [
    Character.Terra,
  ]),
  new Command(CommandName.AbsoluteZero, CommandType.Shotlock, [
    Character.Terra,
  ]),
  new Command(CommandName.LightningRay, CommandType.Shotlock, [
    Character.Terra,
  ]),
  new Command(CommandName.SonicShadow, CommandType.Shotlock, [Character.Terra]),
  new Command(CommandName.UltimaCannon, CommandType.Shotlock, [
    Character.Terra,
  ]),
];

export { CommandName, CommandType, commands };
