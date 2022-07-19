import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(400, `Invalid token`);
  }
}
export default WrongAuthenticationTokenException;
