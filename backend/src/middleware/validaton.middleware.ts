import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";
import HttpException from "../exceptions/HttpException";
function validateMiddleware<T>(
  type: any,
  skipMissingProperties = false
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
       
        if (errors.length > 0) {
          let message = "";
          errors.map((error: ValidationError) => {
            Object.values(error.constraints!).map((val) => {
              message = `${val}`;
            });
          });
        
          
          next(new HttpException(400, message));
        } else {
         
          next();
        }
      }
    );
  };
}
export default validateMiddleware;
