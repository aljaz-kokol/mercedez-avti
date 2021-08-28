export interface ApiResponseError {
  name: string;
  message: string;
  statusCode: number;
  data?: {[p: string]: any; message: string}[];
}

