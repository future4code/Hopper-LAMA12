import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    constructor (private userBusiness: UserBusiness) {}
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

           
            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ 
                message: "Conta criada.",
                token
             });

        } catch (error:any) {
            res.status(error.statusCode).send( error.message );
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            
            const token = await this.userBusiness.loginBusiness(loginData);

            res.status(200).send({ token });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}