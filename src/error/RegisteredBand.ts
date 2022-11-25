import { CustomError } from "./CustomError";

export class RegisteredBand extends CustomError{
    constructor(){
        super(200, "Band already registered")
    }
}