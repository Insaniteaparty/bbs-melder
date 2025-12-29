import { CommandType } from "../model/Commands.model";

export const getGradientByCommandType = (type) => {
  switch (type) {
    case CommandType.Attack:
      return "linear-gradient(rgb(83, 37, 14), rgb(225, 126, 76))";
    case CommandType.Magic:
      return "linear-gradient(rgb(47, 25, 63), rgb(153, 99, 193))";
    case CommandType.Movement:
      return "linear-gradient(rgb(0, 0, 0), rgb(187, 143, 0))";
    case CommandType.Defense:
      return "linear-gradient(rgb(0, 0, 0), rgb(0, 0, 165))";
    case CommandType.Reprisal:
      return "linear-gradient(rgb(0, 0, 0), rgb(155, 0, 0))";
    case CommandType.Shotlock:
      return "linear-gradient(rgb(0, 0, 0), rgb(0, 165, 0))";
    default:
      return "";
  }
};
