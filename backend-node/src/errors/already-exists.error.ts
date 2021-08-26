import { CustomError } from "./custom.error";

export class ResourceAlreadyExistsError extends CustomError {
    message: string;
    name: string;
    data?: any;
    statusCode: number;

    constructor(message: string, data?: any) {
        super(message);
        this.name = 'Resource already exists';
        this.statusCode = 409;
        this.message = message;
        this.data = data;
    }

}