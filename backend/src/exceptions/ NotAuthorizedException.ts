import HttpException from "./HttpException";

class NotAuthorizedException extends HttpException {
  constructor() {
    super(401, "User Not Authorized");
  }
}
export default NotAuthorizedException;
