import HttpException from "./HttpException";

class AuthenticationTokenMissing extends HttpException {
  constructor() {
    super(400, `Authentication token required`);
  }
}
export default AuthenticationTokenMissing;
