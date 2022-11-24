export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Senha inválida")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}

export class UnathorizedUser extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}

export class invalidEmail extends CustomError {
    constructor() {
        super(415, "invalid email is required to have '@'")
    }
}

export class invalidPassword extends CustomError {
    constructor() {
        super(400, "Invalid password!")
    }
}

export class invalidUserEmail extends CustomError {
    constructor() {
        super(404, "This email is already registered")
    }
}

export class invalidUser extends CustomError {
    constructor() {
        super(404, "User is not registered")
    }
}

export class invalidPasswordCreate extends CustomError {
    constructor() {
        super(415, "Invalid password must be longer than 6 characters")
    }
}

export class invalidAuthenticatorData extends CustomError {
    constructor() {
        super(400, "Unauthorized user")
    }
}

export class invalidToken extends CustomError {
    constructor() {
        super(400, "Tokem needs to be passed in headers")
    }
}

export class MissingFieldsToComplete extends CustomError {
    constructor() {
        super(401, "Missing fields to complet")
    }
} 

export class Unauthorized extends CustomError { 
    constructor(){
        super(401, 'Unauthorized user')
    }
} 

export class InvalidTime extends CustomError {
    constructor() {
        super(401, 'Invalid Time')
    }
}

export class InvalidDay extends CustomError {
    constructor() {
        super(401, 'Invalid Day')
    }
}


export class invalidBand extends CustomError {
    constructor() {
        super(404, "Has no bands")
    }
}

export class InvalidShow extends CustomError {
    constructor() {
        super(401, "There's a show at this moment")
    }
}