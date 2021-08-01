import Joi from 'joi';
import { rolesTypes } from '../../domain/plugins/roles.enum';
import { password, objectId } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    role: Joi.string()
      .required()
      .valid(...Object.values(rolesTypes))
      .messages({
        'any.only': '{#label} is invalid!',
      }),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    from: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
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
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
