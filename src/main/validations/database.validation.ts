// import { tokenTypes } from './token.enum.js';
// import { Roles, Users } from '../models/index.js';
// import httpStatus from 'http-status';
// import { StatusCodes, ReasonPhrases } from 'http-status-codes';
// import { clientRequestHelper } from '../../helpers/http.helper';
// import userRepository from '../../domain/repositories/user.repository';

// import { verifyToken } from '../services/token.service.js';

// // check rol
// const isValidRol = async (role = '') => {
//   const isValidRole = await Roles.findOne({ role });
//   if (!isValidRole) {
//     throw new Error(`Role is invalid`);
//   }
// };

// // check valid id
// const existsID = async (id = '') => {
//   const exists = await Users.findById(id);
//   if (!exists) {
//     throw new Error(`User with doesn't exists in db`);
//   }
// };

// // check valid id
// const weakPassword = async (password = '') => {
//   const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
//   if (!password.match(strongRegex)) {
//     throw new Error(
//       'password is weak, must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, at least one special character and eight characters or longer'
//     );
//   }

//   return password;
// };

// // check valid token
// const isValidEmailToken = async (token = '') => {
//   const payload = await verifyToken(token, tokenTypes.VERIFY_EMAIL);

//   if (!payload) {
//     throw new Error(`Invalid token`);
//   }

//   return true;
// };

// // check valid token
// const isValidResetToken = async (token = '') => {
//   const payload = await verifyToken(token, tokenTypes.RESET_PASSWORD);

//   if (!payload) {
//     throw new Error(`Invalid token`);
//   }

//   return true;
// };

// export { isValidRol, isEmailUnique, existsID, weakPassword, isValidEmailToken, isValidResetToken };
// export { isEmailUnique };
