export interface SuccessResponse<Data> {
  statusCode: number;
  message: string;
  data: Data;
  author: string;
}
export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}
