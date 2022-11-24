import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO } from "../model/User";

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
}
