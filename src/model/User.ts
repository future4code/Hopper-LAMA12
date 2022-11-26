import { InvalidName } from '../erros/CustomError';
export class User{
    constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string
    ){}

    
   static stringToUserRole(input: string): UserRole{
        switch (input) {
            case "NORMAL":
              return UserRole.NORMAL;
            case "ADMIN":
              return UserRole.ADMIN;
            default:
              throw new Error("Invalid user role");
          }
    }

    static toUserModel(user: any): User {
        return new User(user.id, user.name, user.email, user.password, User.stringToUserRole(user.role));
      }


}

export interface Signup{
    id:string,
    name: string,
    email: string,
    password: string,
    role: string 
}

export interface AuthenticationData{
    id: string,
    role: string
}

export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface LoginInputDTO{
    email: string;
    password: string;
}

export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface Login{
    email: string,
    password:string
}