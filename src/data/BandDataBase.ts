import { CustomError } from "../error/CustomError";
import { Band } from "../model/Band";
import { BaseDataBase } from "./BaseDataBase";

const TABLE_BANDS = "LAMA_TABLE_BANDS";
export class BandDataBase extends BaseDataBase {
  public registerBand = async (band: Band) => {
    try {
      await BandDataBase.connection
        .insert({
          id: band.id,
          name: band.name,
          music_genre: band.music_genre,
          responsible: band.responsible,
        })
        .into(TABLE_BANDS);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getBandByName = async (name: string) =>{
    try {
        const result = await BandDataBase.connection(TABLE_BANDS)
        .select()
        .where({name})
        return result[0];
    } catch (error:any) {
        throw new CustomError(400, error.message);
        
        
    }
  }
}
