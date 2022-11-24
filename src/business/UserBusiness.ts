import { UserDataBase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { InvalidEmail } from "../error/InvalidEmail";
import { InvalidRequest } from "../error/InvalidReq";
import { InvalidRole } from "../error/InvalidRole";
import { RegisteredEmail } from "../error/RegisteredEmail";
import { ShortPassword } from "../error/ShortPassword";
import { User, UserInputDTO, USER_ROLE } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { generateId } from "../services/IdGenerator";
import { ValidateEmail } from "../services/ValidateEmail";

const hashManager = new HashManager();
const userDataBase = new UserDataBase();
const authenticator = new Authenticator();

export class UserBusiness {
  public signUp = async (input: UserInputDTO) => {
    try {
      const { name, email, password, role } = input;

      if (!name || !email || !password || !role) {
        throw new InvalidRequest();
        
      }
      if (password.length < 6) {
        throw new ShortPassword();
      }
      if (!ValidateEmail.test(email)) {
        throw new InvalidEmail();
      }
      if (role !== USER_ROLE.ADMIN && role !== USER_ROLE.NORMAL) {
        throw new InvalidRole();
      }
      const verifyEmail = await userDataBase.findUserByEmail(email);
      if (verifyEmail) {
        throw new RegisteredEmail();
      }

      const id: string = generateId();
      const hashPassword: string = await hashManager.hash(password)

      const user: User ={
        id,
        name,
        email,
        password: hashPassword,
        role
      };

      await userDataBase.signUp(user)
      const token = await authenticator.generateToken({id, role})
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
