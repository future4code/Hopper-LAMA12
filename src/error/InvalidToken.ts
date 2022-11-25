import { CustomError } from "./CustomError";

export class InvalidToken extends CustomError{
    constructor(){
        super(401, "Ivalid Token.")
    }
}