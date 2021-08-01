/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { StatusCodes, ReasonPhrases } from 'http-status-codes';
// import { clientRequestHelper } from '../../helpers/http.helper';
// import userRepository from '../../domain/repositories/user.repository';

const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value: any, helpers: any) => {
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

  if (!value.match(strongRegex)) {
    return helpers.message(
      'password is weak, must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, at least one special character and eight characters or longer'
    );
  }
  return value;
};

export { objectId, password };
