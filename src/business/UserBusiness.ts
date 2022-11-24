import { UserInputDTO, LoginInputDTO, User, UserRole, Login } from '../model/User';
import { UserDatabase } from '../data/UserDatabase';
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { CustomError, invalidAuthenticatorData, invalidEmail, InvalidEmail, invalidPassword, invalidPasswordCreate, invalidToken, invalidUser, invalidUserEmail, MissingFieldsToComplete } from '../erros/CustomError';
import { UserRepository } from './UserRepository';

export class UserBusiness {

    constructor (private userDatabase: UserRepository){}
    async createUser(signup: UserInputDTO) {
        try {
            let{name, email, password, role} = signup;

            if(!name || !email || !password || !role){
                throw new MissingFieldsToComplete();
                
            }

            if (role !== "NORMAL" && role !== "ADMIN"){
                role = "NORMAL"
              } 
      
              if (!email.includes("@")) {
                throw new InvalidEmail();
              }
      
              if (password.length < 6) {
                throw new invalidPasswordCreate();
              }
      
              const findEmail = await this.userDatabase.findUserEmail(email);
      
              if (findEmail) {
                throw new invalidUserEmail();
              }
      
              const hashManager = new HashManager();
              const hashPassword = await hashManager.hash(password);
      
              const id = new IdGenerator().generateId();
      
      
              const newsignup: User = {
                id,
                name,
                email,
                password: hashPassword,
                role
              };
      
              await this.userDatabase.signup(newsignup);
      
              const authenticator = new Authenticator();
              const acessToken = authenticator.generateToken({ id, role });
      
              return acessToken;
      
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
            
        }

        
    }

    async loginBusiness(login: Login) {
     
        const { email, password } = login;
  
        if (!email || !password) {
          throw new MissingFieldsToComplete();
        }
  
        const user = await this.userDatabase.findUserEmail(email);
  
        if (!user) {
          throw new invalidUser();
        }
  
        if (!email.includes("@")) {
          throw new invalidEmail();
        }
  
        
        const hashManager = new HashManager();
        const passwordIsCorrect = await hashManager.compare(
          password,user.password
        ); 
  
        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ id:  user.id, role: user.role });
  
        if (!passwordIsCorrect) {
          throw new invalidPassword();
        }
        return token;

    }

    async findUserBusiness(token: string) {
        try {
          if (!token) {
            throw new invalidToken();
          }
    
          const authenticatorData = new Authenticator().getData(token);
    
          if (!authenticatorData.id) {
            throw new invalidAuthenticatorData();
          }
    
          const user = await this.userDatabase.selectByUser(authenticatorData.id);
    
    
          return user;
        } catch (error: any) {
          throw new CustomError(error.statusCode, error.sqlMessage || error.message);
        }
      }

    async getUserByBusiness(id: string, token: string) {

        try {
            if (!token) {
              throw new invalidToken();
            }
      
            const authenticatorData = new Authenticator().getData(token);
      
            if (!authenticatorData.id) {
              throw new invalidAuthenticatorData();
            }
      
            const user = await this.userDatabase.selectUserById(id);
      
            return user;
          } catch (error: any) {
            throw new CustomError(error.statusCode, error.sqlMessage || error.message);
          }
        }

}