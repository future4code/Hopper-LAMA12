import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

const bandBusiness = new BandBusiness();

export class BandController {
  public registerBand = async (req: Request, res: Response) => {
    try {
      const { name, music_genre, responsible } = req.body;
      const token = req.headers.authorization as string;

      const input: BandInputDTO = {
        name,
        music_genre,
        responsible,
      };
      await bandBusiness.registeredBand(input, token);
      res.status(201).send("Band successfully registered!")
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
