import { errorResponse } from '../utils/response';
import Validation from '../validation';

export default class ValidateMiddleware {
  static forgotPasswordCheck(req, res, next) {
    const { errors, isValid } = Validation.validateEmail(req.body);
    // Check validation
    if (!isValid) {
        return errorResponse(res, 400, errors);
    }
    next();
  }

  static resetPasswordCheck(req, res, next) {
    const { errors, isValid } = Validation.validatePassword(req.body);
    // Check validation
    if (!isValid) {
        if (errors.password && errors.password === 'Passwords must match') {
            return errorResponse(res, 401, errors);
        }
        return errorResponse(res, 400, errors);
    }
    next();
  }
}
