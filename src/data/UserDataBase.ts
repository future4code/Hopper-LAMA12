import { CustomError } from "../error/CustomError";
import { Unathorized } from "../error/Unauthorized";
import { User } from "../model/User";
import { BaseDataBase } from "./BaseDataBase";

const TABLE_USERS = "LAMA_TABLE_USERS";

export class UserDataBase extends BaseDataBase {
  public signUp = async (user: User) => {
    try {
      await UserDataBase.connection
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        })
        .into(TABLE_USERS);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public findUserByEmail = async (email: string) => {
    try {
      const result = await UserDataBase.connection(TABLE_USERS)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(200, "E-mail already registered.");
    }
  };

  public login = async (email: string) => {
    try {
      const result = await UserDataBase.connection(TABLE_USERS)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new Unathorized();
    }
  };
}
