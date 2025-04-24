export class BaseError extends Error {
  constructor(code, message, data = undefined) {
    super(message);
    this.name = new.target.name; // ES6 way to get the subclass name
    this.code = code;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends BaseError {}

export class ForbiddenError extends BaseError {}

export class AuthFailureError extends BaseError {}

export class InternalError extends BaseError {}

export class NotFoundError extends BaseError {}
