import { CommandType } from "../model/Commands.model";

import attackIcon from "../assets/attack.webp";
import magicIcon from "../assets/magic.webp";
import movementIcon from "../assets/movement.webp";
import defenseIcon from "../assets/defense.webp";
import reprisalIcon from "../assets/reprisal.webp";
import shotlockIcon from "../assets/shotlock.webp";

export const getCommandTypeIcon = (type) => {
  switch (type) {
    case CommandType.Attack:
      return attackIcon;
    case CommandType.Magic:
      return magicIcon;
    case CommandType.Movement:
      return movementIcon;
    case CommandType.Defense:
      return defenseIcon;
    case CommandType.Reprisal:
      return reprisalIcon;
    case CommandType.Shotlock:
      return shotlockIcon;
    default:
      return null;
  }
};
