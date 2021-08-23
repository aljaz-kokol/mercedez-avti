export class CustomError implements Error {
    message: string;
    name: string;
    data?: any[];
    statusCode?: Number;

    constructor(message: string, data?: any[], statusCode?: Number, name: string = 'Custom error') {
        this.name = name;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}