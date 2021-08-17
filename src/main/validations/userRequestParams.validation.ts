/* eslint-disable prettier/prettier */
import Joi from 'joi';
import { rolesTypes } from '../../domain/enums/roles.enum';
import { password, objectId, acceptedLanguage } from './customRequestParams.validation';

const createUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().alphanum().optional(),
    lastName: Joi.string().alphanum().optional(),
    role: Joi.string()
      .required()
      .valid(...Object.values(rolesTypes))
      .messages({
        'any.only': '{#label} is invalid!',
      }),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const getUsers = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    from: Joi.number().integer(),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const getUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const updateUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().optional(),
      password: Joi.string().custom(password).optional(),
      firstName: Joi.string().alphanum().optional(),
      lastName: Joi.string().alphanum().optional(),
      image: Joi.string().optional(),
      isActive: Joi.boolean().optional(),
      role: Joi.string()
        .required()
        .valid(...Object.values(rolesTypes))
        .messages({
          'any.only': '{#label} is invalid!',
        })
        .optional(),
    })
    .min(1),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const deleteUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const loginUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    deletePreviousTokens: Joi.boolean().default(false).optional(),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const reauthenticateUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  body: Joi.object().keys({
    deletePreviousTokens: Joi.boolean().default(true).optional(),
    option: Joi.string().default('reauthenticate').optional(),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const verifyUserEmail = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  query: Joi.object().keys({
    key: Joi.string().required(),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const logoutUser = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  body: Joi.object().keys({
    deletePreviousTokens: Joi.boolean().default(false).optional(),
  }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const requestResetUserPassword = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
    }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

const runResetUserPassword = {
  headers: Joi.object().keys({
    'accept-language': Joi.required().custom(acceptedLanguage),
  }),
  params: Joi.object().keys({
    key: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      password: Joi.string().custom(password).optional(),
    }),
  options: {
    cache: false,
    allowUnknown: true,
  },
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  reauthenticateUser,
  verifyUserEmail,
  logoutUser,
  requestResetUserPassword,
  runResetUserPassword
};
