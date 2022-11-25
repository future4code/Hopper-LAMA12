import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { InputLoginDTO, UserInputDTO } from "../model/User";

const userBusiness = new UserBusiness();

export class UserController {
  public signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const input: UserInputDTO = {
        name,
        email,
        password,
        role,
      };

      const token = await userBusiness.signUp(input);
      res.status(201).send({ message: "User created sucessfullty!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const input: InputLoginDTO = {
        email,
        password
      };

      const token = await userBusiness.login(input);
      res.status(202).send({ message: "Login successfully!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
