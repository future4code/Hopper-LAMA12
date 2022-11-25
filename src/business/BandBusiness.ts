import { BandDataBase } from "../data/BandDataBase";
import { CustomError } from "../error/CustomError";
import { InvalidRequest } from "../error/InvalidReq";
import { InvalidToken } from "../error/InvalidToken";
import { RegisteredBand } from "../error/RegisteredBand";
import { Unathorized } from "../error/Unauthorized";
import { Band, BandInputDTO } from "../model/Band";
import { USER_ROLE } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/IdGenerator";

const authenticator = new Authenticator();
const bandDataBase = new BandDataBase();

export class BandBusiness {
  public registeredBand = async (input: BandInputDTO, token: string) => {
    try {
      const user = await authenticator.getTokenData(token);
      const { name, music_genre, responsible } = input;
      const verifyBand = await bandDataBase.getBandByName(name);
      const id: string = generateId();

      if (!token) {
        throw new InvalidToken();
      }
      if (user.role !== USER_ROLE.ADMIN) {
        throw new Unathorized();
      }

      if (!name || !music_genre || !responsible) {
        throw new InvalidRequest();
      }

      if (verifyBand) {
        throw new RegisteredBand();
      }

      const newBand: Band = {
        id,
        name,
        music_genre,
        responsible,
      };

      await bandDataBase.registerBand(newBand);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
